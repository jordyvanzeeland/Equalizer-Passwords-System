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
          project: project.data
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
                <h1>{this.state.project.ProjectName}</h1>
                <span>{this.state.project.ProjectUrl}</span>

                <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300'}} href={`/project/${this.props.match.params.id}/edit`}><i class="fas fa-edit"></i> Gegevens wijzigen</a>
                </div>
              </div>
            </div>
            <div class="col-md-7">
                <div class="project">
                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> FTP Gegevens
                    <table width="100%">
                    <tr>
                        <td>FTP Host</td>
                        <td>{this.state.project.FtpHost}</td>
                    </tr>
                    <tr>
                        <td>FTP Gebruikersnaam</td>
                        <td>{this.state.project.FtpUser}</td>
                    </tr>
                    <tr>
                        <td>FTP Wachtwoord</td>
                        <td>{this.state.project.FtpPass}</td>
                    </tr>
                    </table>
                  </div>

                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> Database Gegevens
                    <table width="100%">
                    <tr>
                        <td>Database Host</td>
                        <td>{this.state.project.DbHost}</td>
                    </tr>
                    <tr>
                        <td>Database Gebruikersnaam</td>
                        <td>{this.state.project.DbUser}</td>
                    </tr>
                    <tr>
                        <td>Database Wachtwoord</td>
                        <td>{this.state.project.DbPass}</td>
                    </tr>
                    </table>
                  </div>

                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> Wordpress Gegevens
                    <table width="100%">
                    <tr>
                        <td>Database Gebruikersnaam</td>
                        <td>{this.state.project.WpUser}</td>
                    </tr>
                    <tr>
                        <td>Database Wachtwoord</td>
                        <td>{this.state.project.WpPass}</td>
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

export default withRouter(ProjectDetails);
