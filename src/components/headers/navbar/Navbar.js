import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';

const NavigationBar = props => {
	const user = localStorage.getItem('username');
	const logout = () => {
		localStorage.clear();
		window.location.replace('/login')
	}
	return (			
		<nav id="navbar" className="navbar">
		<div className="row w-100">
    		<div className="col-6"><Link to="/" className="navbar-brand ml-2" style={{color: 'white'}}><h2>Computer Inventory App</h2></Link></div>
    		<div className="col-6 pt-3">
    			<h4 className="float-right">Selamat Datang {user}, <button type="button" id="btnLogout" onClick={logout}>Logout</button></h4>
	    	</div>
    	</div>
	  	</nav>
	)
}


export default NavigationBar;