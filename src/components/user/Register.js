import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import './style.css'

class Login extends Component {
	state = {
		username: '',
		email: '',
		password: ''
	}

	register = () => {
		const {username, email, password} = this.state;
		axios.post('/api/register', {username, email, password})
			.then(res => {
				if (res.data.status !== 201) {
					this.setState({error: true, errMessage: res.data.message})
				} else {
					localStorage.setItem('logged', true);
					localStorage.setItem('token', res.data.token);
					localStorage.setItem('username', res.data.data.username);
					localStorage.setItem('email', res.data.data.email);
					this.forceUpdate()
				}
			})
			.catch(err => console.log(err))
	}

	editData = e => {
		this.setState({ [e.target.name]: e.target.value})
		console.log(this.state)
	}

	render() {
		const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DXcMqpPAqu2Pm_7LxNpbD4it1EyYUGZHjjKNLFXp6o_LJD51"
		const dis = this.state.error ? 'block' : 'none';		
		const logged = 	localStorage.getItem('logged');
		if (logged) {
			return <Redirect to="/products" />
		} else {
			return (
				<div className="container-fluid centering bgImg">
					<form className="user-form" autoComplete="off">
						<div className="img-center">
							<img src={imgSrc} className="img-fluid img-height" alt="Guest Face"/>
							<h3>Register User </h3>

						<h6 id="errorMessage" className="form-text text-center" style={{display: dis, color: 'red'}}>{this.state.errMessage}</h6>

						</div>
						<div className="form-group">
					    <label>Username</label>
					    <input type="text" className="form-control" id="Username" placeholder="Enter username" name="username" onChange={this.editData} autoComplete="off" />
					  </div>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={this.editData} autoComplete="off" />
					  </div>
					  <div className="form-group">
					    <label>Password</label>
					    <input type="text" className="form-control" id="Password" placeholder="Password" onChange={this.editData} name="password" autoComplete="off" />
					  </div>
					  <div className="row">
					  	<div className="col-6"><Link to="/login" style={{color: 'white', textDecoration: 'none'}}><button type="button" className="btn btn-primary px-4 py-2 float-left">Login</button></Link></div>
					  	<div className="col-6"><button type="button" className="btn btn-success px-4 py-2 float-right" onClick={this.register}>Register</button></div>
					  </div>
					</form>
				</div>
			)
		}
	}
} 

export default Login;