import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

import './style.css'

class Login extends Component {
	state = {
		email: '',
		password: '',
	}

	loging = () => {
		const {email, password} = this.state;
		axios.post('/api/login', {email, password})
			.then(res => {
				if (res.data.status !== 200) {
					this.setState({error: true, errMessage: res.data.message})
				} else {
					localStorage.setItem('logged', true);				
					localStorage.setItem('token', res.data.token);
					localStorage.setItem('username', res.data.user.username);
					localStorage.setItem('email', res.data.user.email);
					this.props.history.push('/products')
				}
			})
		

			
	}

	editData = e => {
		this.setState({ [e.target.name]: e.target.value})
	}

	render() {
		const logged = 	localStorage.getItem('logged');
		const dis = this.state.error ? 'block' : 'none';
		const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DXcMqpPAqu2Pm_7LxNpbD4it1EyYUGZHjjKNLFXp6o_LJD51"
		if (logged) {
			return <Redirect to="/products" />
		} else {
			return (
				<div className="container-fluid centering bgImg">
					<form className="user-form">
						<div className="img-center">
							<img src={imgSrc} className="img-fluid img-height" alt="Guest Face"/>
							<h3>Login User </h3>
						</div>

						<h6 id="errorMessage" className="form-text text-center" style={{display: dis, color: 'red'}}>{this.state.errMessage}</h6>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={this.editData} autoComplete="off" />
					    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					  </div>
					  <div className="form-group">
					    <label>Password</label>
					    <input type="password" className="form-control" id="Password" placeholder="Password" onChange={this.editData} name="password" autoComplete="off" />
					  </div>
					  <div className="row">
					  	<div className="col-6"><Link to="/register" style={{color: 'white', textDecoration: 'none'}}><button type="button" className="btn btn-success px-4 py-2 float-left">Register</button></Link></div>
					  	<div className="col-6"><button type="button" className="btn btn-primary px-4 py-2 float-right" onClick={this.loging}>Login</button></div>
					  </div>
					</form>
				</div>
			)
		}
	}
} 

export default Login;