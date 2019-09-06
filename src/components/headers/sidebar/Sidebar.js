import React from 'react';
import './style.css';

const SideBar = props => {
	return (
		<div>
			<div id="mySidebar" className="sidebar">
			  <button type="button" className="closebtn" onClick={closeNav}>&times;</button>
			  <h3>Computer Inventory App</h3>
			  <a href="">About</a>
			  <a href="">Services</a>
			  <a href="">Clients</a>
			  <a href="">Contact</a>
			</div>
		</div>
	)
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("navbar").style.marginLeft = "0";

}

export default SideBar;