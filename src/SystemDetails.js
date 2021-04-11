import React, { Component } from 'react';
import './Projects.css';
import { withRouter } from "react-router";
import Header from './components/Header';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class SystemDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
        system: []
    }
  }

  componentDidMount(){
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

    console.log(this.state);

    return (
      <div className="App">
        <Header />
        
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div class="notes">
                <div class="note">
                <h1>{this.state.system.system_name}</h1>
                <span>{this.state.system.system_url}</span>

                <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href={`/system/${this.props.match.params.id}/edit`}><i class="fas fa-edit"></i> Gegevens wijzigen</a>
                </div>
              </div>
            </div>
            <div class="col-md-7">
                <div class="project">
                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> FTP Gegevens
                    <table width="100%">
                    <tr>
                        <td>Host</td>
                        <td>{this.state.system.system_url}</td>
                    </tr>
                    <tr>
                        <td>Gebruikersnaam</td>
                        <td>{this.state.system.system_username}</td>
                    </tr>
                    <tr>
                        <td>Wachtwoord</td>
                        <td>{this.state.system.system_password}</td>
                    </tr>
                    </table>
                  </div>
                </div> 
            </div>
          </div>
        </div>    
      </div>
    );
  }
}

export default withRouter(SystemDetails);
