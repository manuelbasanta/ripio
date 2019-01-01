import React, { Component } from 'react';
import Form from './components/Form';
import Balance from './components/Balance';
import OrderStatus from './components/OrderStatus';
import Orders from './components/Orders';
import logo from './media/logo.png'
import './App.css';

// Cotización bitcoin
const BITCOIN_API = 'https://api.coindesk.com/v1/bpi/currentprice.json';
// Respuestas servidor
const RESPONSES = [504, 500, 400, 200];

class App extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
			bitcoin: '',
			pesos: 25000,
            isLoading: false,
			showOrderStatus: false,
			orderStatus: '',
			createdOrders: []
    	};

		this.createOrder = this.createOrder.bind(this);
		this.toggleShowOrderStatus = this.toggleShowOrderStatus.bind(this);
	}

	componentDidMount () {
		this.fetchBitcoinInfo();
	}

	fetchBitcoinInfo () {
		// Cotización bitcoin	
		fetch(BITCOIN_API)
			.then(response => response.json())
			.then(data => {
                    const cotizacionARS = Number((data.bpi.USD.rate_float * 37.70).toFixed(2));
                    this.setState({bitcoin: this.state.pesos / cotizacionARS});
                }   
            )
	}

	createOrder(params) {
		// Respuesta servidor
		this.setState({ isLoading: true });
		fetch('')
			.then(x => new Promise(resolve => setTimeout(() => this.orderService(params), 2000)))
	}

	toggleShowOrderStatus() {
		// Mostrar la respuesta después de crear la orden
		this.setState({showOrderStatus: !this.state.showOrderStatus});
	}

	orderService(params) {

		// Posibles respuestas a crear la orden
		const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];


		switch(response) {
			case 200:
				let pesos = params.type === 'buy' ? this.state.pesos - Number(params.pesosPrice) : this.state.pesos + Number(params.pesosPrice);
				let bitcoin = params.type === 'buy' ? this.state.bitcoin + Number(params.bitcoinAmount) : this.state.bitcoin - Number(params.bitcoinAmount);
				this.setState({
					pesos,
					bitcoin,
					createdOrders: [...this.state.createdOrders, {type: params.type, btc: params.bitcoinAmount, ars: params.pesosPrice }],
					isLoading: false,
					showOrderStatus: true,
					orderStatus: 'La orden se creó correctamente.'
				});
				break;
			case 500:
				this.setState({
					isLoading: false,
					showOrderStatus: true,
					orderStatus: 'Hubo un problema con la creación, intente más tarde.'
				});
				break;
			case 400:
				this.setState({
					isLoading: false,
					showOrderStatus: true,
					orderStatus: 'Los valores ingresados no son válidos.'
				});			
				break;
			default:
				this.setState({
					isLoading: false,
					showOrderStatus: true,
					orderStatus: 'La orden tomó demasiado tiempo, intente de nuevo.'
				});		
		}
		this.setState({isLoading: false});
	}

	render() {
		return (
			<div>
				{this.state.showOrderStatus && <OrderStatus status={this.state.orderStatus} toggleShowOrderStatus={this.toggleShowOrderStatus}/>}
				<img className="logo" src={logo} alt="Logo ripio"/>
				<div className="app-wrapper">
					
					<div className="block" >
						<Balance pesos={this.state.pesos} bitcoin={this.state.bitcoin}/>
					</div>
					<div className="block" >
						<Form className="block" pesos={this.state.pesos} bitcoin={this.state.bitcoin} createOrder={this.createOrder} isLoading={this.state.isLoading}/>
					</div>
					<div className="block" >
						<Orders className="block" orders={this.state.createdOrders}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
