import React, { Component } from 'react';
import './Header.css';
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class Header extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
      
    var getUser = localStorage.getItem('user');
    var token = localStorage.getItem('token');

    return (
      <div className="App">
        <div class="header">
        <div class="container">
            <div class="container-fluid">
                <div class="row">
                    <img className="app_logo" src="/logo.png" />
                </div>
            </div>
            </div>
        </div>
        <div class="bottom-navbar">
            <div class="container">
            <ul>
                <li><a href="/">Projecten</a></li>
                <li><a href="/systems">Systemen</a></li>
                <li style={{ float: 'right' }} onClick={this.handleLogout.bind(this)}>Uitloggen</li>
            </ul>
            </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Header);



