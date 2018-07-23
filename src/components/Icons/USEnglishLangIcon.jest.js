import React from 'react';
import { shallow } from 'enzyme';
import USEnglishLangIcon from './USEnglishLangIcon';

const wrapper = shallow(<USEnglishLangIcon />);

describe('(Component) USEnglishLangIcon', () => {
  it('renders component without exploding', () => {
    expect(wrapper).toHaveLength(1);
  });
});
