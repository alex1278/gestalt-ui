import { metaModels } from 'Modules/MetaResource';
import { generatePayload, generatePatches } from './payloadTransformer';

describe('(Secret Payload Transformer) generatePayload', () => {
  describe('generatePayload', () => {
    describe('properties.name', () => {
      it('should be the same as properties.resource', () => {
        const sourcePayload = metaModels.secret.create({
          properties: {
            provider: { id: '123' },
            items: [{ key: 'k', value: 'a' }]
          }
        });
        const payload = generatePayload(sourcePayload);
        const expectedPayload = { ...sourcePayload, properties: { ...sourcePayload.properties, items: [{ key: 'k', value: 'YQ==' }] } };

        expect(payload).toEqual(expectedPayload);
      });
    });

    describe('when item is file', () => {
      it('should not base64 encode', () => {
        const sourcePayload = metaModels.secret.create({
          properties: {
            provider: { id: '123' },
            items: [{ key: 'k', value: 'apple', isFile: true }]
          }
        });
        const payload = generatePayload(sourcePayload);
        const expectedPayload = { ...sourcePayload, properties: { ...sourcePayload.properties, items: [{ key: 'k', value: 'apple' }] } };

        expect(payload).toEqual(expectedPayload);
      });
    });
  });

  describe('generatePatches', () => {
    it('should generate patch ops if there is a change but ignore secret.properties', () => {
      const originalPayload = metaModels.secret.get();
      const updatedPayload = metaModels.secret.get({
        name: 'change me',
        properties: {
          items: [{ key: 'dont', value: 'update' }]
        }
      });
      const payload = generatePatches(originalPayload, updatedPayload);
      const expectedPatches = [
        { op: 'replace', path: '/name', value: 'change me' }
      ];

      expect(payload).toEqual(expectedPatches);
    });
  });
});
