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

  checkPasswordStrength(password, meter){

    console.log(password, meter);

    if (typeof password == 'undefined') {
        password = '';
    }

    var ftpbar = $("#" + meter);

    var ftpstrength = 0;

    if (password.match(/[a-z]+/)){
        ftpstrength+=1;
    }
    if (password.match(/[A-Z]+/)){
        ftpstrength+=1;
    }
    if (password.match(/[0-9]+/)){
        ftpstrength+=1;
    }
    if (password.match(/[$@#&!]+/)){
        ftpstrength+=1;
    }

    console.log(ftpbar);

    switch(ftpstrength){
    case 0:
        ftpbar.val(0);
        ftpbar.addClass('passSecureRed');
        break;

    case 1:
        ftpbar.val(25);
        ftpbar.addClass('passSecureRed');
        break;

    case 2:
        ftpbar.val(50);
        ftpbar.addClass('passSecureOrange');
        break;

    case 3:
        ftpbar.val(75);
        ftpbar.addClass('passSecureYellow');
        break;

    case 4:
        ftpbar.val(100);
        ftpbar.addClass('passSecureGreen');
        break; 
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
      .then(data => {
        console.log(data);
        this.setState({
          project: data
        })
      })
  }

  render() {

    this.checkPasswordStrength(this.state.project.FtpPass, 'ftpmeter');
    this.checkPasswordStrength(this.state.project.DbPass, 'dbmeter');
    this.checkPasswordStrength(this.state.project.WpPass, 'wpmeter');

    return (
      <div className="App">
        <Header />
        
        <div class="container">
        
        <div class="row">

        <div class="col-md-4">

        <div class="notes">

        <div class="note">

        <h1>{this.state.project.ProjectName}</h1>
        <span>{this.state.project.ProjectUrl}</span>

        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300'}} href="#"><i class="fas fa-edit"></i> Gegevens wijzigen</a>
        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href="#"><i class="fas fa-trash-alt"></i> Verwijder project</a>
        <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href="#"><i class="fas fa-external-link-alt"></i> Bezoek website</a>
        </div>

        </div>

        </div>

            <div class="col-md-8">

        <div class="project">

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
                            <td>{this.state.project.FtpPass} <progress class="progressBar" max="100" value="0" id="ftpmeter"></progress></td>
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
                            <td>{this.state.project.DbPass} <progress class="progressBar" max="100" value="0" id="dbmeter"></progress></td>
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
                            <td>{this.state.project.WpPass} <progress class="progressBar" max="100" value="0" id="wpmeter"></progress></td>
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
