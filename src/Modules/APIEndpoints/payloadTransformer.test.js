import apiEndpointModel from './models/apiEndpoint';
import { generatePayload, generatePatches } from './payloadTransformer';

describe('APIEndpoint Payload Transformer', () => {
  describe('generatePayload', () => {
    describe('properties.methods', () => {
      it('should convert properties.methods to an Array if there are methods defined', () => {
        const sourcePayload = apiEndpointModel.get({
          properties: {
            methods: 'GET,POST'
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.methods).toEqual(['GET', 'POST']);
      });

      it('should convert properties.methods to [] if there no methods defined', () => {
        const sourcePayload = apiEndpointModel.get({
          properties: {
            methods: ''
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.methods).toEqual([]);
      });
    });

    describe('updateMode', () => {
      it('should remove container related properties if the implementation_type = lambda', () => {
        const sourcePayload = apiEndpointModel.get({
          properties: {
            implementation_type: 'lambda',
          }
        });
        const payload = generatePayload(sourcePayload, true);

        expect(payload.properties).not.toHaveProperty('container_port_name');
      });

      it('should remove container related properties if the implementation_type = container', () => {
        const sourcePayload = apiEndpointModel.get({
          properties: {
            implementation_type: 'container',
            container_port_name: 'web'
          }
        });
        const payload = generatePayload(sourcePayload, true);

        expect(payload.properties).toHaveProperty('container_port_name');
      });
    });
  });

  describe('generatePatches', () => {
    it('should generate the correct patch when hosts is present on the original payload', () => {
      const originalPayload = apiEndpointModel.get();
      const updatedPayload = apiEndpointModel.get({
        properties: {
          hosts: ['wahoo']
        }
      });
      const payload = generatePatches(originalPayload, updatedPayload);

      expect(payload).toContainEqual({ op: 'add', path: '/properties/hosts/0', value: 'wahoo' });
    });

    it('should generate the correct patch when hosts is NOT present on the original payload', () => {
      const originalPayload = apiEndpointModel.get();
      delete originalPayload.properties.hosts;
      const updatedPayload = apiEndpointModel.get({
        properties: {
          hosts: ['wahoo']
        }
      });
      const payload = generatePatches(originalPayload, updatedPayload);

      expect(payload).toContainEqual({ op: 'add', path: '/properties/hosts', value: ['wahoo'] });
    });
  });
});
