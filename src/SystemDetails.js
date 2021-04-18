import React, { Component } from 'react';
import './Projects.css';
import { withRouter } from "react-router";
import Header from './components/Header';
const $ = require('jquery');
$.DataTable = require('datatables.net');
var moment = require('moment');

class SystemDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
        system: [],
        notes: []
    }
  }

  addNote(event){

    event.preventDefault();

    fetch(`https://eqcpd-api.jordyvanzeeland.nl/system/${this.props.match.params.id}/note/new`, { 
        method: 'POST', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded',
            'systemid': this.props.match.params.id,
            'content': event.target.content.value,
            'datecreated': moment().format("YYYY-MM-DD HH:mm:ss")
        })
      })
      .then(response => response.json())
      .then(system => {
        window.location.reload();
      })

  }

  deleteNote(event, noteid){

    event.preventDefault();

    fetch(`https://eqcpd-api.jordyvanzeeland.nl/system/${this.props.match.params.id}/note/${noteid}/delete`, { 
        method: 'DELETE', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(system => {
        window.location.reload();
      })

  }

  componentDidMount(){
    fetch(`https://eqcpd-api.jordyvanzeeland.nl/system/${this.props.match.params.id}`, { 
        method: 'GET', 
        headers: new Headers({
            'Authorization': 'bearer' + localStorage.getItem('token'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(system => {
        this.setState({
          system: system.data,
          notes: system.notes
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
                <h1>{this.state.system.system_name}</h1>
                <span>{this.state.system.system_url}</span>

                <a style={{ width: '100%', display: 'block', fontSize: '13px', fontWeight: '300' }} href={`/system/${this.props.match.params.id}/edit`}><i class="fas fa-edit"></i> Gegevens wijzigen</a>
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
                        <td>Host</td>
                        <td>{this.state.system.system_url}</td>
                    </tr>
                    <tr>
                        <td>Gebruikersnaam</td>
                        <td>{this.state.system.system_username}</td>
                    </tr>
                    <tr>
                        <td>Wachtwoord</td>
                        <td>{this.state.system.system_password}</td>
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

export default withRouter(SystemDetails);
