import React, { Component } from 'react';
import './Projects.css';
import AuthService from './components/AuthService';
import Header from './components/Header';
import withAuth from './components/withAuth';
const $ = require('jquery');
const Auth = new AuthService();
$.DataTable = require('datatables.net');

class Projects extends Component {

  constructor(props){
    super(props);
    this.state = {
        projects: []
    }
  }

  addProject(event){

    event.preventDefault();

    var projectname = event.target.projectname.value;
    var projecturl = event.target.projecturl.value;

    var projectftphost = event.target.ftphost.value;
    var projectftpuser = event.target.ftpuser.value;
    var projectftppass = event.target.ftppass.value;

    var projectdbhost = event.target.dbhost.value;
    var projectdbuser = event.target.dbuser.value;
    var projectdbpass = event.target.dbpass.value;

    var projectwpuser = event.target.wpuser.value;
    var projectwppass = event.target.wppass.value;

    fetch(`http://api.ldeq.local/projects/new`, { 
        method: 'POST', 
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
        window.location.reload();
      })

  }

  deleteProject(event, projectID){

    var table = $('#DataTable').DataTable();
    var Row = $(event.target).closest('tr');

    fetch(`http://api.ldeq.local/project/${projectID}/delete`, { 
        method: 'DELETE', 
        headers: new Headers({
          'Authorization': 'bearer' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        table.row( Row ).remove().draw();
      })

  }

  componentDidMount(){
    fetch('http://api.ldeq.local/projects', { 
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
          projects: data
        })

        $('#DataTable').DataTable({
          "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json"
          }
        });
      })
  }

  render() {

    $('.btn-add').on('click', function(){
      $('.modal').show();
    })

    $('.modal .close').on('click', function(){
      $('.modal').hide();
    })

    return (
      <div className="App">
        <Header />
        
        <div class="container">
          <div class="btn btn-add" style={{ float: 'right', background: '#4f7273', color: '#ffffff', fontSize: '14px', fontWeight: '200' }}>Toevoegen</div>
          <h1>Projecten</h1>
          <table id="DataTable" class="table nowrap">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Notes</th>
                    <th>Acties</th>
                </tr>
            </thead>
            <tbody>
              {this.state.projects.map((project, i) => {
                return(
                <tr valign="middle">
                    <td style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/project/${project.Id}`}>
                      {project.ProjectName}
                      <span class="projectSubtitle">{project.ProjectUrl}</span>
                    </td>
                    <td>
        
                    </td>
                    <td style={{ textAlign:'right' }}>
                    {/* <div class="notes"><i class="far fa-sticky-note"></i> 5</div> */}
                    <i onClick={(event) => { this.deleteProject(event, project.Id) }} class="btn-delete fas fa-trash-alt"></i>
                    </td>
                </tr>
                )
              })}
                
            </tbody>
          </table>
        </div>

        <div class="modal">
              <div class="modal_content">
              <i class="close fas fa-times-circle"></i>
            <form onSubmit={(event) => this.addProject(event)}>
            <div class="form-group">
                <label for="projectname">Project naam</label>
                <input type="text" name="projectname" class="form-control" id="projectname" aria-describedby="emailHelp" />
            </div>
            <div class="form-group">
                <label for="projecturl">Project url</label>
                <input type="text" name="projecturl" class="form-control" id="projecturl" />
            </div>

            <div class="form-group">
                <label for="ftphost">FTP Host</label>
                <input type="text" name="ftphost" class="form-control" id="ftphost" />
            </div>

            <div class="form-group">
                <label for="ftpuser">FTP Gebruikernaam</label>
                <input type="text" name="ftpuser" class="form-control" id="ftpuser" />
            </div>

            <div class="form-group">
                <label for="ftppass">FTP Wachtwoord</label>
                <input type="text" name="ftppass" class="form-control" id="ftppass" />
            </div>

            <div class="form-group">
                <label for="dbhost">Database Host</label>
                <input type="text" name="dbhost" class="form-control" id="dbhost" />
            </div>

            <div class="form-group">
                <label for="dbuser">Database Gebruikersnaam</label>
                <input type="text" name="dbuser" class="form-control" id="dbuser" />
            </div>

            <div class="form-group">
                <label for="dbpass">Database Wachtwoord</label>
                <input type="text" name="dbpass" class="form-control" id="dbpass" />
            </div>

            <div class="form-group">
                <label for="wpuser">Wordpress Gebruikersnaam</label>
                <input type="text" name="wpuser" class="form-control" id="wpuser" />
            </div>

            <div class="form-group">
                <label for="wppass">Wordpress Wachtwoord</label>
                <input type="text" name="wppass" class="form-control" id="wppass" />
            </div>
            <button style={{ background: '#4f7273', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: '200' }} type="submit" class="btn btn-primary">Toevoegen</button>
            </form>
            </div>
        </div>
        
      </div>
    );
  }
}

export default withAuth(Projects);
