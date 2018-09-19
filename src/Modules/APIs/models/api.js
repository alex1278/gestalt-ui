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
    name: '',
    description: '',
    properties: {
      provider: {
        locations: [],
      },
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
    name: '',
    description: '',
    properties: {
      provider: {
        locations: [],
      }
    }
  }, safeModel), [
    'name',
    'description',
    'properties.provider',
  ]);
};

export default {
  get,
  create
};
