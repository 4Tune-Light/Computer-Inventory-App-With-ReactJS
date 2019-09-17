import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

class CreateProducts extends Component {
	state = {
		categories: [],
		id_category: 1,
		created: false
	}

	componentDidMount() {
		axios.get('/api/categories')
			.then(res => this.setState({categories: res.data.data}))
			.catch(err => console.log(err))
	}

	createData = e => {
		this.setState({ [e.target.name]: e.target.value})
		console.log(this.state)
	}

	createSelect = e => {
		this.setState({id_category: Number(e.target.options[e.target.selectedIndex].value)})

	}

	createSubmit = () => {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');
		const email = localStorage.getItem('email');

		const {name, image, id_category, quantity, description} = this.state;

		if (!name || !image || !id_category || !quantity || !description) {
			alert('All fields required')
		} else {
			axios.post('/api/products', {name, image, id_category, quantity, description}, {headers: {auth: token, username, email}})
			.then(this.postTimer.bind(this))
		}
	}

	postTimer = () => {
		setTimeout(() => this.setState({created: true}), 500);
	}

	render() {
		const path = '/products';
		const {created} = this.state;
		const logged = 	localStorage.getItem('logged');
		if (!logged) {
			return (<Redirect to="/login" />)
		} else if (created) {
			return (<Redirect push to={path} />)
		} else {
			return (
				<div>
				<NavigationBar />
				<div className="container-fluid">
					<div className="user-form my-5">
						<h3>Create Products</h3><hr/>
						<form>
						  <div class="form-group">
						    <label for="Name">Product Name</label>
						    <input type="text" class="form-control" name="name" id="Name" placeholder="Product Name" onChange={this.createData} />
						  </div>
						  <div class="form-group">
						    <label for="Image">Image (URL)</label>
						    <input type="text" class="form-control" name="image" id="Image" placeholder="Image (URL)" onChange={this.createData} />
						  </div>
						  <div class="form-group">
						    <label for="Category">Select Category</label>
						    <select class="form-control" id="Category" name="id_category" onChange={this.createSelect}>
						      {
										this.state.categories.map(category => {
											if (category.id === this.state.id_category) {
												return <option value={category.id} key={category.id} selected>{category.name}</option>
											} else {
												return <option value={category.id} key={category.id}>{category.name}</option>
											}
										})
									}
						    </select>
						  </div>
						  <div class="form-group">
						    <label for="Qauntity">Quantity</label>
						    <input type="number" class="form-control" name="quantity" id="Quantity" placeholder="Quantity" onChange={this.createData} />
						  </div>
						  <div class="form-group">
						    <label for="Description">Description</label>
						    <textarea class="form-control" name="description" id="Description" rows="5" placeholder="Product Description" onChange={this.createData}></textarea>
						  </div>
						  <div class="form-group">
						  	<button type="button" onClick={this.createSubmit} className="btn btn-primary form-control py-2"><b>Create</b></button>
						  </div>
						</form>
					</div>
				</div>
				</div>
			)
		}
	}
}

export default CreateProducts;