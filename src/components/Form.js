import React from 'react';
import Loader from './Loader';
import Input from './Input';
import './styles/form.css';

class Form extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
			bitcoinAmount: {
				value: '',
				valid: true
			},
			pesosPrice: {
				value: '',
				valid: true
			},
			type: 'buy',
			valid: true
    	};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {

		// Permitir solo números con 1 punto
		const regexp = /^[0-9]*\.{0,1}[0-9]*$/;
		const target = event.target;
		
		if (regexp.test(target.value)) {
			this.setState({[target.name]: { value: target.value, valid: true}, valid: true});
		}

	}

	handleSubmit(event) {
		
		let validOrder;
		if(this.state.bitcoinAmount.value === '' || this.state.pesosPrice.value === '') {
			this.state.bitcoinAmount.value === '' && this.setState({bitcoinAmount: {value: '', valid: false}});
			this.state.pesosPrice.value === '' && this.setState({pesosPrice: {value: '', valid: false}});			
			validOrder = false;
		} else if (this.state.type === 'sell') {
			validOrder = this.props.bitcoin - this.state.bitcoinAmount.value >= 0;
			!validOrder && this.setState({valid: false});
		} else {
			validOrder = this.props.pesos - this.state.pesosPrice.value >= 0;
			!validOrder && this.setState({valid: false});
		}
		
		if (validOrder) {
			this.setState({valid: true})
			const params = {
				bitcoinAmount: this.state.bitcoinAmount.value,
				pesosPrice: this.state.pesosPrice.value,
				type: this.state.type
			}
			this.props.createOrder(params);
		}

		event.preventDefault();
	}

	handleClick(event) {
		// Cambiar entre comprar y vender
		this.setState({type: event.target.name});
	}

	render() {
		return (
			<div>
				<div className="block-title">Crear orden</div>
				<div className="block-content">
					<button name="buy" onClick={this.handleClick} className={this.state.type === 'buy' ? "btn selected" : "btn"}> Comprar </button>
					<button name="sell" onClick={this.handleClick} className={this.state.type === 'sell' ? "btn selected" : "btn"}> Vender </button>
					<form onSubmit={this.handleSubmit}>
						<Input content={this.state.bitcoinAmount} handleChange={this.handleChange} placeholder="Monto en bitcoin" name="bitcoinAmount" icon="&#8383;"/>
						<Input content={this.state.pesosPrice} handleChange={this.handleChange} placeholder="Precio en pesos" name="pesosPrice" icon="$"/>
						<button type="submit" value="Crear orden" disabled={this.props.isLoading}>{this.props.isLoading ? <Loader/> : 'Crear orden'}</button>
						{ !this.state.valid && <span className="error-msg">El saldo no es suficiente para crear la orden.</span>}
					</form>
				</div>
			</div>
		);
	}
}

export default Form;