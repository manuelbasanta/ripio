import React from 'react';
import './styles/orders.css'
const Orders = (props) => {
    let rows;
    if(props.orders.length === 0) {
        rows = <tr><td colSpan="3" style={{paddingLeft: '5px'}}>No hay ordenes creadas</td></tr>
    } else {
        rows = props.orders.map((element, i ) => {                
            return (
                <tr key={'tr_' + i}>
                    <td style={{paddingLeft: '5px'}}>{element.type === 'sell' ? 'Venta' : 'Compra'}</td>
                    <td>&#8383; {element.btc}</td>
                    <td>$ {element.ars}</td>
                </tr>
            )
        });
    }


    return (
        <div>
            <div className="block-title">Ordenes</div>
            <div className="block-content">
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>BTC</th>
                            <th>ARS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;