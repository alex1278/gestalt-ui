import { buildAllURL, buildOneURL } from './urlmapper';

describe('urlmapper: buildAllURL', () => {
  test('it builds a base url correctly when no fqon is specified', () => {
    expect(buildAllURL('tests', {})).toBe('tests');
  });

  test('it builds a url correctly when a fqon is passed', () => {
    expect(buildAllURL('tests', { fqon: 'iamafqon' })).toBe('iamafqon/tests');
  });

  test('it builds a url correctly when expand is specified', () => {
    expect(buildAllURL('tests', { fqon: 'iamafqon' }, true)).toBe('iamafqon/tests?expand=true');
  });

  test('it builds a url correctly when only a fqon and entities are passed', () => {
    expect(buildAllURL('tests', { fqon: 'iamafqon', entityId: '123', entityKey: 'iamaparent' })).toBe('iamafqon/iamaparent/123/tests');
  });

  test('it falls back to /fqon when only a fqon and partial entities are passed', () => {
    expect(buildAllURL('tests', { fqon: 'iamafqon', entityId: '123' })).toBe('iamafqon/tests');
    expect(buildAllURL('tests', { fqon: 'iamafqon', entityKey: 'nope' })).toBe('iamafqon/tests');
  });

  test('it builds a url when query params are passed', () => {
    const url = buildAllURL('tests', { fqon: 'iamafqon', entityId: '123', entityKey: 'iamaparent', params: { cheeseburger: 'pepsi' } });

    expect(url).toBe('iamafqon/iamaparent/123/tests?cheeseburger=pepsi');
  });
});

describe('urlmapper: buildOneURL', () => {
  test('it builds a base url correctly when there is an fqon but no entity', () => {
    expect(buildOneURL(null, { fqon: 'iamafqon' })).toBe('iamafqon');
  });

  test('it builds a base url correctly when no fqon is specified', () => {
    expect(buildOneURL('tests', {})).toBe('tests');
  });

  test('it builds a url correctly when a fqon is passed', () => {
    expect(buildOneURL('tests', { fqon: 'iamafqon', id: '123' })).toBe('iamafqon/tests/123');
  });

  test('it builds a url correctly when an action is passed', () => {
    expect(buildOneURL('tests', { fqon: 'iamafqon', id: '123' }, 'poop')).toBe('iamafqon/tests/123/poop');
  });

  test('it builds a url when query params are passed', () => {
    const url = buildOneURL('tests', { fqon: 'iamafqon', id: '123', params: { cheeseburger: 'pepsi' } });

    expect(url).toBe('iamafqon/tests/123?cheeseburger=pepsi');
  });

  test('it builds a url when an action is passed with just a fqon and no entity', () => {
    const url = buildOneURL(null, { fqon: 'iamafqon' }, 'gettodachoppa');

    expect(url).toBe('iamafqon/gettodachoppa');
  });

  test('it builds a url when an action is passed', () => {
    const url = buildOneURL('tests', { fqon: 'iamafqon', id: '123' }, 'gettodachoppa');

    expect(url).toBe('iamafqon/tests/123/gettodachoppa');
  });

  test('it builds a url when an action is passed with params', () => {
    const url = buildOneURL('tests', { fqon: 'iamafqon', id: '123', params: { cheeseburger: 'pepsi' } }, 'gettodachoppa');

    expect(url).toBe('iamafqon/tests/123/gettodachoppa?cheeseburger=pepsi');
  });
});