import React, { Component } from 'react';
import './Projects.css';
import AuthService from './components/AuthService';
import { withRouter } from "react-router";
import Header from './components/Header';
import withAuth from './components/withAuth';
const $ = require('jquery');
const Auth = new AuthService();
$.DataTable = require('datatables.net');

class SystemEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
        system: []
    }
  }

  editSystem(event, system){

    event.preventDefault();

    var systemname = system.system_name;
    var systemurl = system.system_url;
    var systemuser = event.target.systemuser.value;
    var systempass = event.target.systempass.value;

    fetch(`http://api.ldeq.local/system/${this.props.match.params.id}/update`, { 
        method: 'PUT', 
        headers: new Headers({
          'Authorization': 'bearer' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'systemname': systemname,
          'systemurl': systemurl,
          'systemuser': systemuser,
          'systempass': systempass
        })
      })
      .then(response => response.json())
      .then(data => {
        window.location.href=`/system/${this.props.match.params.id}`;
      })

  }

  componentDidMount(){

    console.log(this.props.match);
    fetch(`http://api.ldeq.local/system/${this.props.match.params.id}`, { 
        method: 'GET', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(system => {
        this.setState({
          system: system
        })
      })
  }

  render() {

    var system = this.state.system;

    return (
      <div className="App">
        <Header />
        
        <div class="container">
          <div class="row">
            <div class="col-md-12">
            <form onSubmit={(event) => this.editSystem(event, system)}>
            <button style={{ float:'right', background: '#4f7273', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: '200' }} type="submit" class="btn btn-primary">Opslaan</button>
            <h1 style={{ marginTop: '35px' }}>{this.state.system.system_name}</h1>

                <div class="project">
                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> Gegevens
                    <table width="100%">
                    <tr>
                        <td>URL</td>
                        <td><input type="text" className="form-control" name="systemurl" defaultValue={this.state.system.system_url} /></td>
                    </tr>
                    <tr>
                        <td>Gebruikersnaam</td>
                        <td><input type="text" className="form-control" name="systemuser" defaultValue={this.state.system.system_username} /></td>
                    </tr>
                    <tr>
                        <td>Wachtwoord</td>
                        <td><input type="text" className="form-control" name="systempass" defaultValue={this.state.system.system_password} /></td>
                    </tr>
                    </table>
                  </div>
                </div> 
                </form>
            </div>
            
          </div>
        </div>    
      </div>
    );
  }
}

export default withRouter(SystemEdit);
