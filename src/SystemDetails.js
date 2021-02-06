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
        system: [],
        passwords: []
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
        console.log(system);
        this.setState({
          system: system.data,
          passwords: system.passwords
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

        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300'}} href="#"><i class="fas fa-edit"></i> Gegevens wijzigen</a>
        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href="#"><i class="fas fa-trash-alt"></i> Verwijder project</a>
        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href="#"><i class="fas fa-external-link-alt"></i> Bezoek website</a>
        </div>

        </div>

        </div>

            <div class="col-md-7">

        <div class="project">

                    {this.state.passwords.map((password, i) =>{

                        return(
                            <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                            <i class="fas fa-server"></i> {password.type} Gegevens
                            <table width="100%">
                            <tr>
                                <td>{password.type} Host</td>
                                <td>{password.host}</td>
                            </tr>
                            <tr>
                                <td>{password.type} Gebruikersnaam</td>
                                <td>{password.username}</td>
                            </tr>
                            <tr>
                                <td>{password.type} Wachtwoord</td>
                                <td>{password.password}</td>
                            </tr>
                            </table>
                            </div>
                        );

                    })}
            </div>
          
        </div>
        </div>
        
        
        </div>
        
      </div>
    );
  }
}

export default withRouter(SystemDetails);
