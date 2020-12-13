import React, { Component } from 'react';
import './Projects.css';
import AuthService from './components/AuthService';
import Header from './components/Header';
import withAuth from './components/withAuth';
const $ = require('jquery');
const Auth = new AuthService();
$.DataTable = require('datatables.net');

class Systems extends Component {

  constructor(props){
    super(props);
    this.state = {
        projects: []
    }
  }

  componentDidMount(){
    fetch('http://api.ldeq.local/systems', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': 'Basic '+btoa('username:password'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(data => {
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

    console.log(this.getToken);
    return (
      <div className="App">
        <Header />
        
        <div class="container">
          <h1>Systemen</h1>
          <table id="DataTable" class="table nowrap">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Acties</th>
                </tr>
            </thead>
            <tbody>
              {this.state.projects.map((project, i) => {
                return(
                <tr valign="middle">
                    <td>
                      {project.system_name}
                      <span class="projectSubtitle">{project.system_url}</span>
                    </td>
                    <td style={{ textAlign:'right' }}>
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

export default withAuth(Systems);
