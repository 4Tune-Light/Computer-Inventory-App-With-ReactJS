import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class ProductsItem extends Component {
	state = {
		quantity: 0
	}

	addOrReduceQty = e => {
		const {id} = this.props.item;
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');
		const email = localStorage.getItem('email');

		e.preventDefault();
		const action = e.target.value;
		axios.patch(`/api/products/${id}`, {action}, {headers: {auth: token, username, email}})
			.then(res => {
				if (action === 'add') {
					this.props.item.quantity += 1;
					this.setState({quantity: this.props.item.quantity})
					alert('dah ke tambah');
				} else {
					this.props.item.quantity -= 1;
					this.setState({quantity: this.props.item.quantity})
					alert('dah ke kurang');
				}
			})
			.catch(err => console.log(err));
	}

	render() {
		const {id, name, image, category, quantity} =  this.props.item;
		return (
			<div id="productsItem" className="border col-3 mx-4 mt-5 mb-3 p-0">
				<div className="text-center">
					<img src={image} onError={() => {this.props.item.image = 'https://images.vexels.com/media/users/3/127491/isolated/preview/8cb9767b47a1f58908a132a8df10b748-computer-set-flat-icon-by-vexels.png'; this.forceUpdate()}} className="img-fluid d-inline-block img-h" alt="Something that you like to buy :)"/>
				</div>
				<div className="p-3">
					<h5><Link to={'/products/' + id } style={{textDecoration: 'none'}}>{name}</Link></h5>
					<p>Category: {category}<br/>
					   Quantity: {quantity}</p>
					<form>
						<button onClick={this.addOrReduceQty} className="btn btn-primary mr-2" value="add"> Add </button>
						<button onClick={this.addOrReduceQty} className="btn btn-warning mr-2" value="reduce"> Reduce </button>
						<button type="button" onClick={this.props.delete.bind(this, id)} className="btn btn-danger"> Delete </button>
					</form>
				</div>

			</div>
		)
	}
}


export default ProductsItem;
