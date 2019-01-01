import React from 'react';
import OrderStatus from '../src/components/OrderStatus';
import { shallow } from 'enzyme';

test('render OrderStatus', () => {
    const wrapper = shallow(
        <OrderStatus status="true" />
    );

    expect(wrapper).toMatchSnapshot();

});