import React from 'react';
import Balance from '../src/components/Balance';
import { shallow } from 'enzyme';
import Loader from '../src/components/Loader';

test('render Balance', () => {
    const balance = shallow(
        <Balance/>
    );
    expect(balance).toMatchSnapshot();
});

test('Render balance con props', () => {
    const balance = shallow(
        <Balance pesos="5000" bitcoin="1.34"/>
    );
     expect(balance).toMatchSnapshot();
});

test('Render balance loading', () => {
    const balance = shallow(
        <Balance pesos="5000" bitcoin=""/>
    );
    expect(balance.find(Loader).length).toBe(1);
});