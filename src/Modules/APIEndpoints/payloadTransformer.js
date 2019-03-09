import shortid from 'shortid';
import jsonPatch from 'fast-json-patch';
import apiEndpointModel from './models/apiEndpoint';

/**
 * generatePayload
 * Handle Payload formatting/mutations to comply with meta api
 * @param {Object} sourcePayload
 */
export function generatePayload(sourcePayload, updateMode = false) {
  const payload = apiEndpointModel.create(sourcePayload);

  if (updateMode) {
    if (payload.properties.implementation_type === 'lambda') {
      delete payload.properties.container_port_name;
    }
  } else {
    payload.name = shortid.generate();
  }

  return payload;
}

/**
 * Generates an array of patch operations
 * @param {Object} originalPayload
 * @param {Object} updatedPayload
 */
export function generatePatches(originalPayload, updatedPayload) {
  const model = apiEndpointModel.create(originalPayload);

  // we need to remove hosts in cases where it does not exist so patch works correctly,
  // otherwise patch assumes hosts exists since the apiEndpointModel enforces it
  if (!originalPayload.properties.hosts) {
    delete model.properties.hosts;
  }

  return jsonPatch.compare(model, generatePayload(updatedPayload, true));
}

export default {
  generatePayload,
  generatePatches,
};
