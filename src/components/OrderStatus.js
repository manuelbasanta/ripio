import React from 'react';
import check from '../media/check.png';
import cross from '../media/cross.png'
import './styles/order-status.css';

const OrderStatus = (props) => {
    const src = props.status === 'La orden se creó correctamente.' ? check : cross;
    return (
        <div onClick={(e) => {e.target === e.currentTarget && props.toggleShowOrderStatus()}} className="order-status">
            <div className="order-status-content">
                <img alt="status" src={src}/>
                <div>{props.status}</div>
                <button onClick={props.toggleShowOrderStatus}>Aceptar</button>
            </div>
        </div>
    );
}

export default OrderStatus;