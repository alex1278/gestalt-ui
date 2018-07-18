import React from 'react';
import { Notifications } from './Notifications';

describe('(Notificationss) Notifications', () => {
  it('renders component without exploding', () => {
    const wrapper = shallow(
      <Notifications queue={[]} removeNotification={jest.fn()} />
    );

    expect(wrapper.dive()).to.have.length(1);
  });

  it('renders to correct snapshot with no items in the queue', () => {
    const wrapper = shallow(
      <Notifications queue={[]} removeNotification={jest.fn()} />
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders to correct snapshot with items in the queue', () => {
    const wrapper = shallow(
      <Notifications queue={[{ id: 1, message: 'hi ho' }]} removeNotification={jest.fn()} />
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });
});
