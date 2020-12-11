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

  componentDidMount(){
    fetch('http://api.ldeq.local/projects', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': 'Basic '+btoa('username:password'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          projects: data
        })

        $('#DataTable').DataTable();
      })
  }

  render() {

    console.log(this.getToken);
    return (
      <div className="App">
        <Header />
        
        <div class="container">
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
                    <td>
                      {project.ProjectName}
                      <span class="projectSubtitle">{project.ProjectUrl}</span>
                    </td>
                    <td>
        
                    </td>
                    <td style={{ textAlign:'right' }}>
                    <div class="notes"><i class="far fa-sticky-note"></i> 5</div>
                    <i class="btn-delete fas fa-trash-alt"></i>
                    </td>
                </tr>
                )
              })}
                
            </tbody>
          </table>
        </div>
        
      </div>
    );
  }
}

export default withAuth(Projects);
