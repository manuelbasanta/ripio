import React from 'react';
import Input from '../src/components/Input';
import { shallow, mount } from 'enzyme';

test('Render Input, si es invalido mostrar error', () => {
    const input = mount(
        <Input content={{value: '',valid: false}} handleChange={function(){}} placeholder="Precio en pesos" name="pesosPrice" icon="$"/>
    );

    expect(input).toMatchSnapshot();
    expect(input.find('span[className="error-msg"]').length).toBe(1);
    input.setProps({content: {value: '12',valid: true}});
    expect(input).toMatchSnapshot();
    expect(input.find('span[className="error-msg"]').length).toBe(0);
   
});

