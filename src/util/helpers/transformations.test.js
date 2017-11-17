import {
  arrayToMap,
  mapTo2DArray,
  stringDemiltedToArray,
} from './transformations';

describe('Util Transformations', () => {
  describe('arrayToMap function', () => {
    it('should map an array to a key value pair', () => {
      const array = [{ name: 'luke skywalker', value: 'awesome' }];

      expect(arrayToMap(array)).to.deep.equal({ 'luke skywalker': 'awesome' });
    });

    it('should map an array to a key value with custom key value names', () => {
      const array = [{ fname: 'luke', lname: 'skywalker', address: 'tatooine' }];

      expect(arrayToMap(array, 'fname', 'address')).to.deep.equal({ luke: 'tatooine' });
    });
  });

  describe('mapTo2DArray function', () => {
    it('should create an array from a map', () => {
      const obj = { 'luke skywalker': 'awesome' };

      expect(mapTo2DArray(obj)).to.deep.equal([{ name: 'luke skywalker', value: 'awesome' }]);
    });

    it('should create an array from a map with custom key value names', () => {
      const obj = { 'luke skywalker': 'awesome' };

      expect(mapTo2DArray(obj, 'fullname', 'status')).to.deep.equal([{ fullname: 'luke skywalker', status: 'awesome' }]);
    });
  });

  describe('stringDemiltedToArray function', () => {
    it('should create convert string delimited to an array', () => {
      const string = 'luke,skywalker,is,awesome';

      expect(stringDemiltedToArray(string)).to.deep.equal(['luke', 'skywalker', 'is', 'awesome']);
    });

    it('should create convert string delimited to an array and remove/compact blank elements', () => {
      const string = 'luke,skywalker,is,,awesome';

      expect(stringDemiltedToArray(string)).to.deep.equal(['luke', 'skywalker', 'is', 'awesome']);
    });
  });
});