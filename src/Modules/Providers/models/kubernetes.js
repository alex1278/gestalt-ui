import { object, array, string, boolean } from 'yup';
import { pick, omit } from 'lodash';
import base64 from 'base-64';
import jsonPatch from 'fast-json-patch';

function transformIn(model) {
  const { properties } = model;

  const newModel = {
    ...model,
    properties: {
      ...properties,
      config: {
        ...properties.config,
      },
    },
  };

  return newModel;
}

function transformOut(model) {
  const { properties } = model;

  const newModel = {
    ...model,
    properties: {
      ...properties,
      config: {
        ...properties.config,
      },
    },
  };

  if (properties.data) {
    newModel.properties.data = base64.encode(newModel.properties.data);
  }

  if (properties.tempData) {
    newModel.properties.data = base64.encode(newModel.properties.tempData);
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
    config: object().shape({
      external_protocol: string().default('https'),
      endpoints: array().default([]),
      storage_classes: array().default([]),
      gpu_support: object().shape({
        enabled: boolean().default(false),
        default_type: string().default(''),
        types: array().default(['nvidia-tesla-p100', 'nvidia-tesla-p4', 'nvidia-tesla-v100', 'nvidia-tesla-t4']),
      }),
    }),
    linked_providers: array().default([]),
    environment_types: array().default([]),
    provider_subtype: string().default('Default'),
    data: string(),
  }),
});

/**
 * get
 * @param {Object} model
 */
const get = (model = {}) => {
  const omitList = [];

  return omit(transformIn(schema.cast(model)), omitList);
};

/**
 * create
 * @param {Object} model
 */
const create = (model = {}) => {
  const pickList = [
    'name',
    'description',
    'resource_type',
    'properties.config.external_protocol',
    'properties.config.endpoints',
    'properties.config.storage_classes',
    'properties.config.gpu_support',
    'properties.linked_providers',
    'properties.environment_types',
    'properties.provider_subtype',
    'properties.data',
  ];

  return pick(transformOut(schema.cast(model)), pickList);
};

/**
 * patch - only allow mutable props
 * @param {Object} model - override the model
 * @param {Object} updatedModel - override the model
 */
const patch = (model = {}, updatedModel = {}) => {
  // force patch on arrays
  const omitList = [
    'properties.linked_providers',
    'properties.config.gpu_support.types',
  ];

  return jsonPatch.compare(
    omit(create(model), omitList),
    create(updatedModel),
  );
};

/**
 * initForm
 * Format the model specifically for Initializing Forms
 * @param {Object} model
 */
const initForm = (model = {}) => {
  const pickList = [
    'name',
    'description',
    'resource_type',
    'properties.config.external_protocol',
    'properties.config.endpoints',
    'properties.config.storage_classes',
    'properties.config.gpu_support',
    'properties.linked_providers',
    'properties.environment_types',
    'properties.provider_subtype',
    'properties.data',
  ];

  return pick(get(model), pickList);
};

/**
 * rawGet
 * Format the as the original GET
 * @param {Object} model
 */
const rawGet = (model = {}) => {
  const omitList = [];

  return omit(transformOut(schema.cast(model)), omitList);
};

export default {
  schema,
  get,
  create,
  patch,
  initForm,
  rawGet,
};
