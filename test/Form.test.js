import React from 'react';
import Form from '../src/components/Form';
import { shallow, mount } from 'enzyme';

test('Render Form, si la Form es invalida mostrar mensaje de error', () => {
    const form = mount(
        <Form className="block" pesos="25000" bitcoin="1.34" isLoading={false}/>
    );

    expect(form).toMatchSnapshot();
    //form.setState({bitcoinAmount: {value: '',valid: true},pesosPrice: {value: '',valid: true},type: 'buy',valid: false});
    form.setState({valid: false});
    expect(form.find('span[className="error-msg"]').length).toBe(1);
});

test('On click "vender" cambiar estilos', () => {
    const form = mount(
        <Form className="block" pesos="25000" bitcoin="1.34" isLoading={false}/>
    );

    form.setState({type: 'buy'});
    form.find('button[name="sell"]').simulate('click');
    expect(form.find('button[name="sell"]').hasClass('selected')).toEqual(true);
});

