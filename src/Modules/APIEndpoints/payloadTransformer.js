import { cloneDeep } from 'lodash';
import jsonPatch from 'fast-json-patch';
import { stringDemiltedToArray } from 'util/helpers/transformations';

/**
 * generateAPIEndpointPayload
 * Handle Payload formatting/mutations to comply with meta api
 * @param {Object} sourcePayload
 */
export function generateAPIEndpointPayload(sourcePayload, updateMode = false) {
  const payload = cloneDeep(sourcePayload);

  payload.name = payload.properties.resource.split('/').join('-');

  if (updateMode) {
    // meta patch cannot currently handle array patching - so force a replace on /properties/methods
    delete payload.properties.methods;

    if (payload.properties.implementation_type === 'lambda') {
      delete payload.properties.container_port_name;
    } else {
      delete payload.properties.synchronous;
    }
  }

  if (sourcePayload.properties.methods) {
    payload.properties.methods = stringDemiltedToArray(sourcePayload.properties.methods);
  }

  return payload;
}

/**
 * Generates an array of patch operations
 * @param {Object} originalPayload
 * @param {Object} updatedPayload
 */
export function generateAPIEndpointPatches(originalPayload, updatedPayload) {
  const { name, description, properties } = cloneDeep(originalPayload);
  const model = cloneDeep({
    name,
    description,
    properties,
  });

  return jsonPatch.compare(model, generateAPIEndpointPayload(updatedPayload, true));
}

export default {
  generateAPIEndpointPayload,
  generateAPIEndpointPatches,
};