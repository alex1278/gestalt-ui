import { cloneDeep, pick, merge } from 'lodash';

/**
 * get
 * @param {Object} model - override the model
 */
const get = (model = {}) => {
  const safeModel = cloneDeep(model);

  return merge({
    org: {
      properties: {},
    },
    created: {},
    modified: {},
    name: null,
    description: null,
    properties: {
      kind: null,
      credentials: {},
      data: {},
    }
  }, safeModel);
};

/**
 * create - only allow mutable props
 * @param {Object} model - override the model
 */
const create = (model = {}) => {
  const safeModel = cloneDeep(model);

  return pick(merge({
    name: null,
    description: null,
    properties: {
      kind: null,
      credentials: {},
      data: {
        format: null,
        data: null,
        group: null,
        target: null,
      },
    }
  }, safeModel), [
    'name',
    'description',
    'properties.kind',
    'properties.credentials',
    'properties.data',
  ]);
};

export default {
  get,
  create
};