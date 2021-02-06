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

    var table = $('#DataTable').DataTable();
    var projectname = event.target.projectname.value;
    var projecturl = event.target.projecturl.value;

    fetch(`http://api.ldeq.local/projects/new`, { 
        method: 'POST', 
        headers: new Headers({
          'Authorization': 'bearer' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'projectname': projectname,
          'projecturl': projecturl
        })
      })
      .then(response => response.json())
      .then(data => {
        //$('.modal').hide();
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
          },
          "aaSorting":[],
          "order": []
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
                    <td onClick={() => window.location.href = `/project/${project.id}`}>
                      {project.projectname}
                      <span class="projectSubtitle">{project.projecturl}</span>
                    </td>
                    <td>
        
                    </td>
                    <td style={{ textAlign:'right' }}>
                    {/* <div class="notes"><i class="far fa-sticky-note"></i> 5</div> */}
                    <i onClick={(event) => { this.deleteProject(event, project.id) }} class="btn-delete fas fa-trash-alt"></i>
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
            <button style={{ background: '#4f7273', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: '200' }} type="submit" class="btn btn-primary">Toevoegen</button>
            </form>
            </div>
        </div>
        
      </div>
    );
  }
}

export default withAuth(Projects);
