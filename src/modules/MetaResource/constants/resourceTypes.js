// Key names should match the providerTypes list value

export const KONG = '25acb32c-6635-49d1-ba19-4cf317003ff6';
export const GATEWAYMANAGER = 'a695c8ca-b429-4127-80bb-688583880257';
export const KUBERNETES = '79075694-6510-49d3-8bd5-a8dce581bd48';
export const DCOS = '26a2694e-ddc7-4a34-a910-f794cc2417e4';
export const SECURITY = '152cbb67-444e-4787-9c13-d3a9cc385e3e';
export const DATA_POSTGRESQL = '5cdb00e9-2861-4a02-a4ab-c926d7200490';
export const LAMBDA = 'e04778bd-2504-4635-85a9-1b2b293a2d41';
export const LAMBDA_NODEJS = '06584400-e3ba-449f-bb16-7113e1ff5d84';
export const LAMBDA_SCALA = '8e9263b4-55e4-4762-beac-81393458a274';
export const LAMBDA_JAVA = 'd6197e9c-7096-48c3-b645-b0e3cd52adcf';
export const LAMBDA_RUBY = '790e9ae3-093a-426d-a570-bb7739c98850';
export const LAMBDA_PYTHON = '950db9eb-ea5a-4c65-a445-8d0a85af1bdd';
export const LAMBDA_CSHARP = '421d0798-1e93-433c-a103-3b48fe578dbf';
export const LAMBDA_GO = '019ea97a-d2c5-4891-b197-c23b3a7d3112';
export const MESSAGING = '80d48917-7e05-47c6-a5b6-613a2d55b58a';
export const RABBITMQ = '39cb96f1-0dc8-4ce6-9d88-863988fa1e16';
export const POLICY = '9b6f7ec6-2e75-4b95-90dc-0e17935f8d4b';

export default {
  KONG,
  GATEWAYMANAGER,
  KUBERNETES,
  DCOS,
  SECURITY,
  'DATA::POSTGRESQL': DATA_POSTGRESQL,
  MESSAGING,
  'MESSAGING::RABBITMQ': RABBITMQ,
  POLICY,
  LAMBDA,
  'LAMBDA::NODEJS': LAMBDA_NODEJS,
  'LAMBDA::SCALA': LAMBDA_SCALA,
  'LAMBDA::JAVA': LAMBDA_JAVA,
  'LAMBDA::RUBY': LAMBDA_RUBY,
  'LAMBDA::PYTHON': LAMBDA_PYTHON,
  'LAMBDA::CSHARP': LAMBDA_CSHARP,
  'LAMBDA::GO': LAMBDA_GO,
};