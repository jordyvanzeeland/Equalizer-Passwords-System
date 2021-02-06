import React, { Component } from 'react';
import './Projects.css';
import AuthService from './components/AuthService';
import { withRouter } from "react-router";
import Header from './components/Header';
import withAuth from './components/withAuth';
const $ = require('jquery');
const Auth = new AuthService();
$.DataTable = require('datatables.net');

class ProjectDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
        project: [],
        passwords: []
    }
  }

  componentDidMount(){

    console.log(this.props.match);
    fetch(`http://api.ldeq.local/project/${this.props.match.params.id}`, { 
        method: 'GET', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(project => {
        this.setState({
          project: project.data,
          passwords: project.passwords
        })
      })
  }

  render() {

    return (
      <div className="App">
        <Header />
        
        <div class="container">
        
        <div class="row">

        <div class="col-md-5">

        <div class="notes">

        <div class="note">

        <h1>{this.state.project.projectname}</h1>
        <span>{this.state.project.projecturl}</span>

        {/* <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300'}} href="#"><i class="fas fa-edit"></i> Gegevens wijzigen</a>
        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href="#"><i class="fas fa-trash-alt"></i> Verwijder project</a>
        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href="#"><i class="fas fa-external-link-alt"></i> Bezoek website</a> */}
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

export default withRouter(ProjectDetails);
