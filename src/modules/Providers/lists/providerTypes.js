export default [
  {
    name: 'DCOS',
    value: 'Gestalt::Configuration::Provider::CaaS::DCOS',
    type: 'DCOS',
    config: true,
    networking: true,
    extraConfig: true,
    uploadConfig: false,
    allowContainer: false,
  },
  {
    name: 'Kubernetes',
    value: 'Gestalt::Configuration::Provider::CaaS::Kubernetes',
    type: 'KUBERNETES',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: true,
    allowContainer: false,
  },
  {
    name: 'APIGateway (Kong)',
    value: 'Gestalt::Configuration::Provider::Kong',
    type: 'KONG',
    config: false,
    networking: false,
    extraConfig: true,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'GatewayManager',
    value: 'Gestalt::Configuration::Provider::GatewayManager',
    type: 'GATEWAYMANAGER',
    config: false,
    networking: false,
    extraConfig: true,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Security',
    value: 'Gestalt::Configuration::Provider::Security',
    type: 'SECURITY',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: false,
  },
  {
    name: 'PostgreSQL',
    value: 'Gestalt::Configuration::Provider::Data::PostgreSQL',
    type: 'DATA::POSTGRESQL',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: false,
  },
  // {
  //   name: 'Messaging',
  //   value: 'Gestalt::Configuration::Provider::Messaging',
  //   type: 'MESSAGING',
  //   config: false,
  //   networking: false,
  //   extraConfig: false,
  //   uploadConfig: false,
  //   allowContainer: true,
  // },
  {
    name: 'RabbitMQ',
    value: 'Gestalt::Configuration::Provider::Messaging::RabbitMQ',
    type: 'MESSAGING::RABBITMQ',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Policy',
    value: 'Gestalt::Configuration::Provider::Policy',
    type: 'POLICY',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda',
    value: 'Gestalt::Configuration::Provider::Lambda',
    type: 'LAMBDA',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda Executor NodeJS',
    value: 'Gestalt::Configuration::Provider::Lambda::Executor::NodeJS',
    type: 'LAMBDA::NODEJS',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda Executor Scala',
    value: 'Gestalt::Configuration::Provider::Lambda::Executor::Scala',
    type: 'LAMBDA::SCALA',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda Executor Java',
    value: 'Gestalt::Configuration::Provider::Lambda::Executor::Java',
    type: 'LAMBDA::JAVA',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda Executor Ruby',
    value: 'Gestalt::Configuration::Provider::Lambda::Executor::Ruby',
    type: 'LAMBDA::RUBY',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda Executor Python',
    value: 'Gestalt::Configuration::Provider::Lambda::Executor::Python',
    type: 'LAMBDA::PYTHON',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda Executor C#',
    value: 'Gestalt::Configuration::Provider::Lambda::Executor::CSharp',
    type: 'LAMBDA::CSHARP',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
  {
    name: 'Lambda Executor Go',
    value: 'Gestalt::Configuration::Provider::Lambda::Executor::GoLang',
    type: 'LAMBDA::GO',
    config: false,
    networking: false,
    extraConfig: false,
    uploadConfig: false,
    allowContainer: true,
  },
];
