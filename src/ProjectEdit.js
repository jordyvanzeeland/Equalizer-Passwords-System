import React, { Component } from 'react';
import './Projects.css';
import AuthService from './components/AuthService';
import { withRouter } from "react-router";
import Header from './components/Header';
import withAuth from './components/withAuth';
const $ = require('jquery');
const Auth = new AuthService();
$.DataTable = require('datatables.net');

class ProjectEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
        project: []
    }
  }

  editProject(event, project){

    event.preventDefault();

    var projectname = project.ProjectName;
    var projecturl = project.ProjectUrl;

    var projectftphost = event.target.ftphost.value;
    var projectftpuser = event.target.ftpuser.value;
    var projectftppass = event.target.ftppass.value;

    var projectdbhost = event.target.dbhost.value;
    var projectdbuser = event.target.dbuser.value;
    var projectdbpass = event.target.dbpass.value;

    var projectwpuser = event.target.wpuser.value;
    var projectwppass = event.target.wppass.value;

    fetch(`https://eqcpd-api.jordyvanzeeland.nl/project/${this.props.match.params.id}/update`, { 
        method: 'PUT', 
        headers: new Headers({
          'Authorization': 'bearer' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'projectname': projectname,
          'projecturl': projecturl,
          'projectftphost': projectftphost,
          'projectftpuser': projectftpuser,
          'projectftppass': projectftppass,
          'projectdbhost': projectdbhost,
          'projectdbuser': projectdbuser,
          'projectdbpass': projectdbpass,
          'projectwpuser': projectwpuser,
          'projectwppass': projectwppass
        })
      })
      .then(response => response.json())
      .then(data => {
        window.location.href=`/project/${this.props.match.params.id}`;
      })

  }

  componentDidMount(){

    console.log(this.props.match);
    fetch(`https://eqcpd-api.jordyvanzeeland.nl/project/${this.props.match.params.id}`, { 
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

    var project = this.state.project;

    return (
      <div className="App">
        <Header />
        
        <div class="container">
          <div class="row">
            <div class="col-md-12">
            <form onSubmit={(event) => this.editProject(event, project)}>
            <button style={{ float:'right', marginTop: '35px', background: '#4f7273', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: '200' }} type="submit" class="btn btn-primary">Opslaan</button>
            <h1 style={{ marginTop: '35px' }}>{this.state.project.ProjectName}</h1>

                <div class="project">
                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> FTP Gegevens
                    <table width="100%">
                    <tr>
                        <td>FTP Host</td>
                        <td><input type="text" className="form-control" name="ftphost" defaultValue={this.state.project.FtpHost} /></td>
                    </tr>
                    <tr>
                        <td>FTP Gebruikersnaam</td>
                        <td><input type="text" className="form-control" name="ftpuser" defaultValue={this.state.project.FtpUser} /></td>
                    </tr>
                    <tr>
                        <td>FTP Wachtwoord</td>
                        <td><input type="text" className="form-control" name="ftppass" defaultValue={this.state.project.FtpPass} /></td>
                    </tr>
                    </table>
                  </div>

                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> Database Gegevens
                    <table width="100%">
                    <tr>
                        <td>Database Host</td>
                        <td><input type="text" className="form-control" name="dbhost" defaultValue={this.state.project.DbHost} /></td>
                    </tr>
                    <tr>
                        <td>Database Gebruikersnaam</td>
                        <td><input type="text" className="form-control" name="dbuser" defaultValue={this.state.project.DbUser} /></td>
                    </tr>
                    <tr>
                        <td>Database Wachtwoord</td>
                        <td><input type="text" className="form-control" name="dbpass" defaultValue={this.state.project.DbPass} /></td>
                    </tr>
                    </table>
                  </div>

                  <div class="data_block ftp_info" style={{ background: '#ffffff', marginBottom: '20px'}}>
                    <i class="fas fa-server"></i> Wordpress Gegevens
                    <table width="100%">
                    <tr>
                        <td>Database Gebruikersnaam</td>
                        <td><input type="text" className="form-control" name="wpuser" defaultValue={this.state.project.WpUser} /></td>
                    </tr>
                    <tr>
                        <td>Database Wachtwoord</td>
                        <td><input type="text" className="form-control" name="wppass" defaultValue={this.state.project.WpPass} /></td>
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

export default withRouter(ProjectEdit);
