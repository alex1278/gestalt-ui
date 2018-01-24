import React from 'react';
import RemoveButton from './RemoveButton';
import { shallowWithTheme } from '../../../test/helpers';

describe('(ResourceTypes) RemoveButton', () => {
  it('mounts with basic mountWithTheme', () => {
    const wrapper = shallowWithTheme(<RemoveButton onRemove={sinon.spy()} index={1} />);

    expect(wrapper.dive().dive().dive()).toMatchSnapshot();
  });
});