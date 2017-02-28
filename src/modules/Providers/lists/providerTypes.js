export default[
  {
    name: 'DCOS',
    value: 'Gestalt::Configuration::Provider::Marathon',
    type: 'CAAS',
    networking: true,
    extraConfig: true,
    uploadConfig: false,
  },
  {
    name: 'Kubernetes',
    value: 'Gestalt::Configuration::Provider::CaaS',
    type: 'CAAS',
    networking: false,
    extraConfig: false,
    uploadConfig: true,
  },
  {
    name: 'Kong',
    value: 'Gestalt::Configuration::Provider::Kong',
    type: 'KONG',
    networking: false,
    extraConfig: true,
    uploadConfig: false,
  },
  {
    name: 'GatewayManager',
    value: 'Gestalt::Configuration::Provider::GatewayManager',
    type: 'GATEWAYMANAGER',
    networking: false,
    extraConfig: true,
    uploadConfig: false,
  },
];
