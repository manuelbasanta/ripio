import React from 'react';
import Orders from '../src/components/Orders';
import { shallow } from 'enzyme';

test('Render Orders, si la no tiene ordenes mostrar texto, si entra una cambiar por <tr> de orden', () => {
    const orders = mount(
        <Orders className="block" orders={[]}/>
    );

    expect(orders).toMatchSnapshot();
    expect(orders.find('td').text()).toEqual('No hay ordenes creadas');
    
    orders.setProps({orders: [{ars:"3244",btc:"432",type:"buy"}]});
    expect(orders.find('td:first-child').text()).toEqual('Compra');
});

