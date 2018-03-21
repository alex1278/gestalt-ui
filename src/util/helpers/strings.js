import { startCase, toLower } from 'lodash';

/**
 * getParentFQON
 * Extracts the fqon from an meta resource
 * @param {string} - meta resource
 */
export function getParentFQON(organization) {
  const urlParser = document.createElement('a');
  urlParser.href = organization.org.href;

  return urlParser.pathname.replace('/', '').split('/')[0];
}

/**
 * getLastFromSplit
 * Parses and returns the last item in a structure like GrandPareng::Parent::Child
 * @param {String} string
 */
export function getLastFromSplit(string, delimiter = '::') {
  if (string) {
    const split = string.split(delimiter);

    return split[split.length - 1];
  }
  return string;
}

/**
 * truncate
 * @param {String} string
 * @param {Number} at
 * @param {String} trailing
 */
export function truncate(string, at, trailing = '...') {
  if (string && string.length > at) {
    return `${string.substring(0, at).trim()}${trailing}`;
  }

  return string;
}

/**
 * toTitleCase
 * @param {String} string
 */
export function toTitleCase(string) {
  return startCase(toLower(string));
}


// TODO: Will be rmeoved when we have security config
export const checkIfPassword = field =>
  field && field.length && (field.toUpperCase().includes('PASSWORD') || field.toUpperCase().includes('SECRET') || field.toUpperCase().includes('KEY'));

export default {
  getParentFQON,
  getLastFromSplit,
  truncate,
  toTitleCase,
  checkIfPassword
};

export const removeHostFromURL = url => url.replace(/^.*\/\/[^/]+:?[0-9]?\//i, '');
