import React, { Component } from 'react';
import './Projects.css';
import AuthService from './components/AuthService';
import { withRouter } from "react-router";
import Header from './components/Header';
import withAuth from './components/withAuth';
const $ = require('jquery');
const Auth = new AuthService();
var moment = require('moment');
$.DataTable = require('datatables.net');

class ProjectDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
        project: [],
        notes: []
    }
  }

  addNote(event){

    event.preventDefault();

    fetch(`http://api.ldeq.local/project/${this.props.match.params.id}/note/new`, { 
        method: 'POST', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded',
            'projectid': this.props.match.params.id,
            'content': event.target.content.value,
            'datecreated': moment().format("YYYY-MM-DD HH:mm:ss")
        })
      })
      .then(response => response.json())
      .then(project => {
        window.location.reload();
      })

  }

  deleteNote(event, noteid){

    event.preventDefault();

    fetch(`http://api.ldeq.local/project/${this.props.match.params.id}/note/${noteid}/delete`, { 
        method: 'DELETE', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(project => {
        window.location.reload();
      })

  }

  componentDidMount(){

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
          notes: project.notes
        })
      })
  }

  render() {

    $('.btn-add-note').on('click', function(){
      $('.modal').show();
    })

    $('.modal .close').on('click', function(){
      $('.modal').hide();
    })

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
                <a className="btn-add-note" style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300'}} href="#"><i class="fas fa-edit"></i> Notitie toevoegen</a>
                </div>
              </div>

              <h2 style={{ fontSize: '20px' }}>Notities</h2>

              {this.state.notes.length == 0 ? <div class="note"><p>Er zijn geen notities</p></div> : ''}

              {this.state.notes.map((note, i) => {

                return(
                    <div class="note">
                      <p style={{ color: '#000000' }}>{note.content}</p>
                      <span style={{ marginBottom: '0' }}>{moment(note.datecreated).format("DD-MM-YYYY HH:mm")} | <div style={{ cursor: 'pointer', display: 'inline-block', color: '#ff0000' }} onClick={(event) => this.deleteNote(event, note.id)}>Verwijderen</div></span>
                    </div>
                )

              })}
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

        <div class="modal">
              <div class="modal_content" style={{ height: 'auto' }}>
              <i class="close fas fa-times-circle"></i>
            <form onSubmit={(event) => this.addNote(event)}>
            <div class="form-group">
                <label for="content">Notitie</label>
                <textarea style={{ height: '200px' }} name="content" class="form-control" />
            </div>
            
            <button style={{ background: '#4f7273', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: '200' }} type="submit" class="btn btn-primary">Toevoegen</button>
            </form>
            </div>
        </div> 
      </div>
    );
  }
}

export default withRouter(ProjectDetails);
