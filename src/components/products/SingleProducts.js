import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

class SingleProducts extends Component {
	state = {
		item: {},
		deleted: false
	}

	componentDidMount() {
		const {id} = this.props.match.params;
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');
		const email = localStorage.getItem('email');

		axios.get('/api/products/' + id, {headers: {auth: token, username, email}})
			.then(res => this.setState({item: res.data.data[0]}))
			.catch(err => console.log(err))
	}

	delete = (id) => {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');
		const email = localStorage.getItem('email');

		axios.delete(`/api/products/${id}`, {headers: {auth: token, username, email}})
			.catch(err => this.setState({deleted: true}));
	}

	render() {
		const {id, name, image, quantity, description, category} = this.state.item;
		const {deleted} = this.state;
		const logged = 	localStorage.getItem('logged') || false;
		if (!logged) {
			return (<Redirect to="/login" />)
		} else if (deleted === true) {
			return (<Redirect push to="/products" />)
		} else {
			return (
				<div>
				<NavigationBar />
				<div className="container-fluid">
				<div id="singleProducts" className="p-4">
					<div className="row">
						<div className="col-4 border-right"><img src={image} className="img-fluid img-h" onError={() => {this.state.item.image = 'https://images.vexels.com/media/users/3/127491/isolated/preview/8cb9767b47a1f58908a132a8df10b748-computer-set-flat-icon-by-vexels.png'; this.forceUpdate()}} alt="Something that you would like to buy :)"/></div>
						<div className="col-7 m-auto">
							<h3 className="border-bottom pb-3">{name}</h3>
							<p>Category: {category}</p>
							<p> Quantity: {quantity}</p>
							<p>Description: <br/>{description}</p>
							<Link to={'/products/edit/' + id } style={{color: 'white'}}>  
								<button type="button" className="btn btn-primary mr-2">Edit							</button>
							</Link>
							<Link to={'/products'} style={{color: 'white'}}>
								<button type="button" onClick={this.delete.bind(this, id)} className="btn btn-danger"> Delete </button>
							</Link>
						</div>
					</div>
				</div>	
				</div>
				</div>
			)
		}
	}
} 

export default SingleProducts;