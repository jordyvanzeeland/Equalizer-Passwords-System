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
        project: []
    }
  }

  componentDidMount(){

    console.log(this.props.match);
    fetch(`http://api.ldeq.local/projects/${this.props.match.params.id}`, { 
        method: 'GET', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          project: data
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

            <div class="col-md-8">

        <div class="project">

        <h1>{this.state.project.ProjectName}</h1>
        <span>{this.state.project.ProjectUrl}</span>

                <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> FTP Gegevens
                    <table width="100%">
                        <tr>
                            <td>FTP Host</td>
                            <td>{this.state.project.FtpHost}</td>
                        </tr>
                        <tr>
                            <td>FTP Gebruiker</td>
                            <td>{this.state.project.FtpUser}</td>
                        </tr>
                        <tr>
                            <td>FTP Wachtwoord</td>
                            <td>{this.state.project.FtpPass}</td>
                        </tr>
                    </table>
                </div>

                <div class="data_block db_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-database"></i> Database gegevens

                    <table width="100%">
                        <tr>
                            <td>Database Host</td>
                            <td>{this.state.project.DbHost}</td>
                        </tr>
                        <tr>
                            <td>Database Gebruiker</td>
                            <td>{this.state.project.DbUser}</td>
                        </tr>
                        <tr>
                            <td>Database Wachtwoord</td>
                            <td>{this.state.project.DbPass}</td>
                        </tr>
                    </table>
                </div>

                <div class="data_block wp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fab fa-wordpress"></i> Wordpress gegevens

                    <table width="100%">
                        <tr>
                            <td>Wordpress Gebruiker</td>
                            <td>{this.state.project.WpUser}</td>
                        </tr>
                        <tr>
                            <td>Wordpress Wachtwoord</td>
                            <td>{this.state.project.WpPass}</td>
                        </tr>
                    </table>
                </div>
            </div>
          
        </div>
        </div>
        
        <div class="col-md-4"></div>
        </div>
        
      </div>
    );
  }
}

export default withRouter(ProjectDetails);
