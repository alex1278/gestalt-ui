export function isFQON(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return /^[a-z0-9]+(-[a-z0-9]+)*[a-z0-9]*$/.test(string);
}

// export function isEnvironmentName(string) {
//   return /^(([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])\\.)*([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])|(\\.|\\.\\.)$/i.test(string);
// }

// export function isWorkspaceName(string) {
//   return /^(([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])\\.)*([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])|(\\.|\\.\\.)$/i.test(string);
// }

export function isPhoneNumber(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return /^\+\d([. -]?\d){9,14}$/.test(string);
}

export function isUsername(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return /^[a-z0-9]+([-._][a-z0-9]+)*[a-z0-9]*$/.test(string);
}

export function isLambdaName(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return /^\S*$/.test(string);
}

export function isContainerName(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return /^[a-z0-9]+(-[a-z0-9]+)*[a-z0-9]*$/.test(string);
}

export function isContainerServicePortName(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])*$/.test(string);
}

export function isCommaDelimited(string) {
  if (typeof string !== 'string') {
    return string;
  }

  const trimmedString = string.replace(/[\s,]+/g, ',');
  return /^((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))?(,((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])))*$/.test(trimmedString);
}

export function isCommaDelimitedConstraints(string) {
  if (typeof string !== 'string') {
    return string;
  }

  const trimmedString = string.replace(/[\s,]+/g, ',');
  return /^(([a-zA-Z0-9-_]+):(LIKE|UNLIKE|UNIQUE|CLUSTER|GROUP_BY|MAX_PER)(:[a-zA-Z0-9-_]+)?)(,[ ]*([a-zA-Z0-9-_]+):(LIKE|UNLIKE|UNIQUE|CLUSTER|GROUP_BY|MAX_PER)(:[a-zA-Z0-9-_]+)?)*$/.test(trimmedString);
}

export function isKubernetesVolumeName(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/.test(string);
}

export function isUnixVariable(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return /^[a-zA-Z_]+[a-zA-Z0-9_]*$/.test(string);
}

export default {
  isFQON,
  // isWorkspaceName,
  // isEnvironmentName,
  isPhoneNumber,
  isUsername,
  isLambdaName,
  isContainerName,
  isContainerServicePortName,
  isCommaDelimited,
  isKubernetesVolumeName,
  isUnixVariable,
};
