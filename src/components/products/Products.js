import React, { Component } from 'react';
import axios from 'axios';
import ProductsItem from './ProductsItem';
import Title from './Title';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

import './style.css';

class Products extends Component {
	state = {
		items: [],
		query: {
			search: '%%',
			sortBy: 'name',
			sort: 'asc',
			limit: '6',
			page: '1'
		},
		total: 0,
	}

	componentDidMount() {
		const {search, sortBy, sort, limit, page} = this.state.query;
		axios.get(`/api/products?search=${search}&sortBy=${sortBy}&sort=${sort}&limit=${limit}&page=${page}`)
		.then(res => this.setState({items: res.data.data, total: res.data.total[0].total}))
		.catch(err => console.log(err))
	}

	delete = (id) => {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');
		const email = localStorage.getItem('email');

		axios.delete(`/api/products/${id}`, {headers: {auth: token, username, email}})
			.catch(err => this.setState({success: true}));
			
		this.setState({items: this.state.items.filter(item => item.id !== id)})
	}

	queryString = (data) => {
		this.setState({query: data})
		const {search, sortBy, sort, limit, page} = this.state.query;
		axios.get(`/api/products?search=${search}&sortBy=${sortBy}&sort=${sort}&limit=${limit}&page=${page}`)
			.then(res => this.setState({items: res.data.data, loading: true}))
			.catch(err => console.log(err))
	}

	pageNumber = () => {
		var data = [];
		const counter =  Math.ceil(this.state.total / this.state.query.limit);
		for (let i = 1; i <= counter; i++) {
			data.push(i);
		}
		return data
	}


	render() {
		const pageNum = this.pageNumber();
		const logged = 	localStorage.getItem('logged') || false;
		const disErr = this.state.error ? 'block' : 'none';	
		const disSuc = this.state.success ? 'block' : 'none';	
		if (!logged) {
			return (<Redirect to="/login" />)
		} else {
			return (
				<div>
				<h6 id="errorMessage" className="form-text text-center" style={{display: disErr, color: 'red'}}>{this.state.errMessage}</h6>
				<h6 id="successMessage" className="form-text text-center" style={{display: disSuc, color: 'green'}}>{this.state.errMessage}</h6>
				<NavigationBar />
				<div id="products" className="row justify-content-md-center">
					<Title callBack={this.queryString} pagination={pageNum}/>
					

					{
						this.state.items.map( item => {
							return <ProductsItem item={item} key={item.id} delete={this.delete}/>
						})
					}
				
				</div>
				</div>
			)
		}
	}
}
export default Products;