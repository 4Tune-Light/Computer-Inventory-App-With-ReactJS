import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

class EditProducts extends Component {
	state = {
		categories: [],
		edited: false
	}

	componentDidMount() {
		const {id} = this.props.match.params;

		axios.get('/api/products/' + id, )
			.then(res => {
				for (var key in res.data.data[0]) {
					this.setState({ [key]: res.data.data[0][key]})
				}
			})
			.catch(err => console.log(err))

		axios.get('/api/categories')
			.then(res => this.setState({categories: res.data.data}))
			.catch(err => console.log(err))
	}

	editData = e => {
		this.setState({ [e.target.name]: e.target.value})
	}

	editSelect = e => {
		this.setState({id_category: Number(e.target.options[e.target.selectedIndex].value)})

	}

	editSubmit = () => {
		const {id} = this.props.match.params;
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');
		const email = localStorage.getItem('email');

		const {name, image, id_category, quantity, description} = this.state;

		if (!name || !image || !id_category || !quantity || !description) {
			alert('All fields required')
		} else {
			axios.put('/api/products/' + id, {name, image, id_category, quantity, description}, {headers: {auth: token, username, email}})
			.then(this.setState({edited: true}))
		}
	}

	render() {
		const {name, image, quantity, description, edited} = this.state;
		const path = '/products/' + this.props.match.params.id;
		const logged = 	localStorage.getItem('logged');
		if (!logged) {
			return (<Redirect to="/login" />)
		} else if (edited === true) {
			return <div><Redirect push to={path} /></div>
		} else {
			return (
				<div>
				<NavigationBar />
				<div className="container-fluid">
					<div className="user-form my-5">
						<h3>Edit Products</h3><hr/>
						<form>
						  <div className="form-group">
						    <label>Product Name</label>
						    <input type="text" className="form-control" value={name} name="name" id="Name" placeholder="Product Name" onChange={this.editData} />
						  </div>
						  <div className="form-group">
						    <label>Image (URL)</label>
						    <input type="text" className="form-control" value={image} name="image" id="Image" placeholder="Image (URL)" onChange={this.editData} />
						  </div>
						  <div className="form-group">
						    <label>Select Category</label>
						    <select className="form-control" id="Category" name="id_category" onChange={this.editSelect}>
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
						  <div className="form-group">
						    <label>Quantity</label>
						    <input type="number" className="form-control" value={quantity} name="quantity" id="Quantity" placeholder="Quantity" onChange={this.editData} />
						  </div>
						  <div className="form-group">
						    <label>Description</label>
						    <textarea className="form-control" value={description} name="description" id="Description" rows="5" onChange={this.editData}></textarea>
						  </div>
						  <div className="form-group">
						  	<button type="button" onClick={this.editSubmit} className="btn btn-primary form-control py-2"><b>Edit</b></button>
						  </div>
						</form>
					</div>
				</div>
				</div>
			)
		}
	}
}

export default EditProducts;