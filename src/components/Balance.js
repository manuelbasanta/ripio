import React from 'react';
import Loader from './Loader';

const Balance = (props) => {
        let content = '';
        if(props.bitcoin === '') {
            content =  <Loader/>
        } else {
            content = (
                <div className="block-content">
                    <div style={{padding: '5px 0', fontWeight: '100'}}><strong>ARS:</strong> $ {props.pesos}</div>
                    <div style={{padding: '5px 0', fontWeight: '100'}}><strong>BTC:</strong> &#8383; {props.bitcoin}</div>
                </div>
            )
        }
		return (
			<div>
                <div className="block-title">Balance</div>
                {content}
            </div>
		);

}

export default Balance;