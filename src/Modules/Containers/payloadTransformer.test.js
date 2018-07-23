import { metaModels } from 'Modules/MetaResource';
import { generatePayload } from './payloadTransformer';

describe('(Container Payload Transformer) generatePayload', () => {
  describe('generatePayload', () => {
    describe('properties.env', () => {
      it('should convert properties.env array to a map', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            env: [{ name: 'test', value: 'this' }, { name: 'this', value: 'test' }],
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.env).toEqual({ test: 'this', this: 'test' });
      });
    });

    describe('properties.labels', () => {
      it('should convert properties.labels array to a map', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            labels: [{ name: 'test', value: 'this' }, { name: 'this', value: 'test' }],
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.labels).toEqual({ test: 'this', this: 'test' });
      });
    });

    describe('properties.num_instances', () => {
      it('should set properties.num_instances to 1 if it is \'\'', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            num_instances: ''
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.num_instances).toBe(1);
      });
    });

    describe('properties.cmd', () => {
      it('should set trim cmd if it is present and there are spaces to trim at the end', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            cmd: 'echo hello      '
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.cmd).toBe('echo hello');
      });

      it('should set remove cmd if it is \'\'', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            cmd: ''
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties).not.toHaveProperty('cmd');
      });
    });

    describe('properties.constraints', () => {
      it('should handle constraints if it is an Array', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            constraints: ['testrole', 'roletest']
          }
        });
        const payload = generatePayload(sourcePayload);
        expect(payload.properties.constraints).toEqual(['testrole', 'roletest']);
      });

      it('should handle constraints if it is a comma delimited string', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            constraints: 'testrole, roletest'
          }
        });
        const payload = generatePayload(sourcePayload);
        expect(payload.properties.constraints).toEqual(['testrole', 'roletest']);
      });

      it('should set remove constraints if it is \'\'', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            constraints: ''
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties).not.toHaveProperty('contraints');
      });
    });

    describe('properties.volumes', () => {
      it('should correctly format a volume if it is persistent', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            volumes: [{ type: 'persistent', host_path: '/lalala' }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.volumes).toEqual([{ type: 'persistent' }]);
      });

      it('should correctly format a volume if it is not persistent', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            volumes: [{ type: 'RO', host_path: '/lalala' }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.volumes).toEqual([{ type: 'RO', host_path: '/lalala' }]);
      });
    });

    describe('properties.health_checks', () => {
      it('should remove port it the port_type = index', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            health_checks: [{ protocol: 'HTTP', port_type: 'index', port: 1 }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.health_checks).toEqual([{ protocol: 'HTTP', port_type: 'index' }]);
      });

      it('should remove port_index it the port_type = number', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            health_checks: [{ protocol: 'HTTP', port_type: 'number', port_index: 1 }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.health_checks).toEqual([{ protocol: 'HTTP', port_type: 'number' }]);
      });

      it('should remove the correct properties it the protocol is TCP', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            health_checks: [{ protocol: 'TCP', path: '/wahoo', command: 'oxford comma', ignore_http_1xx: true }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.health_checks).toEqual([{ protocol: 'TCP' }]);
      });

      it('should remove the correct properties it the protocol is HTTP', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            health_checks: [{ protocol: 'HTTP', path: '/wahoo', command: 'oxford comma', ignore_http_1xx: true }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.health_checks).toEqual([{ protocol: 'HTTP', path: '/wahoo', ignore_http_1xx: true }]);
      });

      it('should remove the correct properties it the protocol is HTTPS', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            health_checks: [{ protocol: 'HTTPS', path: '/wahoo', command: 'oxford comma', ignore_http_1xx: true }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.health_checks).toEqual([{ protocol: 'HTTPS', path: '/wahoo', ignore_http_1xx: true }]);
      });


      it('should remove the correct properties it the protocol is COMMAND', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            health_checks: [{ protocol: 'COMMAND', path: '/wahoo', command: 'oxford comma', ignore_http_1xx: true, port_type: 'index', port_index: 1, port: 1 }]
          }
        });
        const payload = generatePayload(sourcePayload);

        expect(payload.properties.health_checks).toEqual([{ protocol: 'COMMAND', command: 'oxford comma' }]);
      });
    });

    describe('properties.provider', () => {
      it('should delete provider in updateMode so it is not PATCHED', () => {
        const sourcePayload = metaModels.container.get({
          properties: {
            provider: { id: '1' }
          }
        });
        const payload = generatePayload(sourcePayload, [], true);

        expect(payload.properties).not.toHaveProperty('provider');
      });
    });
  });
});
