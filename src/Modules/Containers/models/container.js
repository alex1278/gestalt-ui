import { object, array, boolean, string, number } from 'yup';
import pick from 'lodash/pick';
import { mapTo2DArray, arrayToMap, convertFromMaps } from 'util/helpers/transformations';

const reformatHealthChecks = healthChecks => (
  healthChecks.map((healthCheck) => {
    const healthCheckPayload = { ...healthCheck };

    if (healthCheckPayload.port_type === 'index') {
      delete healthCheckPayload.port;
    }

    if (healthCheckPayload.port_type === 'number') {
      delete healthCheckPayload.port_index;
    }

    if (healthCheckPayload.protocol === 'TCP') {
      delete healthCheckPayload.path;
      delete healthCheckPayload.command;
      delete healthCheckPayload.ignore_http_1xx;
    }

    if (healthCheckPayload.protocol === 'HTTP' || healthCheckPayload.protocol === 'HTTPS') {
      delete healthCheckPayload.command;
    }

    if (healthCheckPayload.protocol === 'COMMAND') {
      delete healthCheckPayload.path;
      delete healthCheckPayload.ignore_http_1xx;
      delete healthCheckPayload.port_type;
      delete healthCheckPayload.port_index;
      delete healthCheckPayload.port;
    }

    return healthCheckPayload;
  })
);

const fixHealthChecks = (healthChecks = []) => healthChecks.map((check) => {
  const newcheck = { ...check };

  if (check.protocol !== 'COMMAND') {
    if ('port_index' in newcheck) {
      newcheck.port_type = 'index';
    } else {
      newcheck.port_type = 'number';
    }
  }

  return newcheck;
});

const fixPortMappings = (portMappings = []) => portMappings.map((port) => {
  let newPort = { ...port };

  if (!port.type && port.expose_endpoint) {
    newPort = { ...newPort, type: 'internal' };
  }

  if (port.expose_endpoint && !port.lb_port) {
    newPort = { ...newPort, lb_port: port.container_port };
  }

  return newPort;
});

function transformIn(model, envToMerge = {}) {
  return {
    ...model,
    properties: {
      ...model.properties,
      env: Array.isArray(model.properties.env)
        ? model.properties.env
        : convertFromMaps(model.properties.env, envToMerge),
      labels: Array.isArray(model.properties.labels)
        ? model.properties.labels
        : mapTo2DArray(model.properties.labels),
      port_mappings: fixPortMappings(model.properties.port_mappings),
      health_checks: fixHealthChecks(model.properties.health_checks),
    },
  };
}

function transformOut(model, mergeVolumes = []) {
  const newModel = {
    ...model,
    properties: {
      ...model.properties,
      // eslint-disable-next-line no-restricted-globals
      num_instances: isNaN(model.properties.num_instances) || !model.properties.num_instances
        ? 1
        : model.properties.num_instances,
      env: arrayToMap(model.properties.env, 'name', 'value'),
      labels: arrayToMap(model.properties.labels, 'name', 'value'),
      health_checks: reformatHealthChecks(model.properties.health_checks),
      volumes: [...model.properties.volumes, ...mergeVolumes],
    },
  };

  // remove cmd if null otherwise, the container is unhappy
  if (!model.properties.cmd) {
    delete newModel.properties.cmd;
  } else {
    // Trim the cmd of leading/trailng spaces to prevent container errors
    newModel.properties.cmd = model.properties.cmd && (model.properties.cmd.trim() !== model.properties.cmd)
      ? model.properties.cmd.trim()
      : model.properties.cmd;
  }

  return newModel;
}

const schema = object().shape({
  id: string(),
  name: string().default(''),
  description: string(),
  resource_type: string(),
  resource_state: string(),
  created: object().shape({}).default({}),
  modified: object().shape({}).default({}),
  owner: object().shape({}).default({}),
  org: object().shape({
    properties: object().shape({}).default({}),
  }),
  properties: object().shape({
    parent: object().shape({
      id: string(),
    }),
    provider: object().shape({
      id: string(),
      properties: object().shape({
        config: object().shape({
          networks: array().default([]),
        }),
      }),
    }).required(),
    network: string(),
    cpus: number().default(0.5),
    memory: number().default(128),
    // env: array().default([]), // comment out for now until vars are converted to arrays
    // labels: array().default([]), // comment out for now until vars are converted to arrays
    container_type: string().default('DOCKER'),
    accepted_resource_roles: array().default([]),
    constraints: array().default([]),
    instances: array().default([]),
    port_mappings: array().default([]),
    volumes: array().default([]),
    secrets: array().default([]),
    health_checks: array().default([]),
    force_pull: boolean().default(false),
    num_instances: number().default(1),
    apiendpoints: array().default([]),
    status: string(),
    status_detail: object().default({}),
    events: array().default([]),
    gpu_support: object().shape({
      enabled: boolean().default(false),
      count: number().default(1),
      type: string().default(''),
    }),
  }),
});

/**
 * get
 * @param {Object} model
 */
const get = (model = {}, envToMerge = {}) => transformIn(schema.cast(model), envToMerge);

/**
 * create
 * @param {Object} model
 */
const create = (model = {}, mergeVolumes) =>
  pick(transformOut(schema.cast(model), mergeVolumes), [
    'name',
    'description',
    'properties.provider.id',
    'properties.provider.name',
    'properties.provider.resource_type',
    'properties.env',
    'properties.labels',
    'properties.port_mappings',
    'properties.volumes',
    'properties.secrets',
    'properties.health_checks',
    'properties.force_pull',
    'properties.container_type',
    'properties.cpus',
    'properties.memory',
    'properties.num_instances',
    'properties.cmd',
    'properties.image',
    'properties.network',
    'properties.user',
    'properties.accepted_resource_roles',
    'properties.constraints',
    'properties.gpu_support',
  ]);

/**
* get
* @param {Object} model
*/
const put = (model = {}, mergeVolumes) =>
  pick(transformOut(schema.cast(model), mergeVolumes), [
    'name',
    'description',
    'properties.env',
    'properties.labels',
    'properties.port_mappings',
    'properties.volumes',
    'properties.secrets',
    'properties.health_checks',
    'properties.force_pull',
    'properties.container_type',
    'properties.cpus',
    'properties.memory',
    'properties.num_instances',
    'properties.cmd',
    'properties.image',
    'properties.network',
    'properties.user',
    'properties.accepted_resource_roles',
    'properties.constraints',
    'properties.provider.id',
    'properties.provider.name',
    'properties.provider.resource_type',
    'properties.gpu_support',
  ]);

/**
 * getForm
 * Format the model specifically for Initializing Forms
 * @param {Object} model
 */
const initForm = (model = {}) => {
  const pickList = [
    'name',
    'description',
    'properties.provider',
    'properties.provider.properties',
    'properties.env',
    'properties.labels',
    'properties.port_mappings',
    'properties.volumes',
    'properties.secrets',
    'properties.health_checks',
    'properties.force_pull',
    'properties.container_type',
    'properties.cpus',
    'properties.memory',
    'properties.num_instances',
    'properties.cmd',
    'properties.image',
    'properties.network',
    'properties.user',
    'properties.accepted_resource_roles',
    'properties.constraints',
    'properties.gpu_support',
  ];

  return pick(get(model), pickList);
};

/**
 * rawGet
 * @param {Object} model
 */
const rawGet = (model = {}) => transformOut(schema.cast(model));

export default {
  schema,
  get,
  create,
  put,
  initForm,
  rawGet,
};
