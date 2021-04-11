import React, { Component } from 'react';
import './Projects.css';
import Header from './components/Header';
import withAuth from './components/withAuth';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class Systems extends Component {

  constructor(props){
    super(props);
    this.state = {
        systems: []
    }
  }

  addSystem(event){

    event.preventDefault();

    var table = $('#DataTable').DataTable();
    var systemname = event.target.systemname.value;
    var systemurl = event.target.systemurl.value;

    fetch(`http://api.ldeq.local/systems/new`, { 
        method: 'POST', 
        headers: new Headers({
          'Authorization': 'bearer' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'systemname': systemname,
          'systemurl': systemurl
        })
      })
      .then(response => response.json())
      .then(data => {
        window.location.reload();
      })

  }

  deleteSystem(event, systemid){

    var table = $('#DataTable').DataTable();
    var Row = $(event.target).closest('tr');

    fetch(`http://api.ldeq.local/system/${systemid}/delete`, { 
        method: 'DELETE', 
        headers: new Headers({
          'Authorization': 'bearer' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(data => {
        table.row( Row ).remove().draw();
      })

  }

  componentDidMount(){
    fetch('http://api.ldeq.local/systems', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': 'bearer' + localStorage.getItem('token'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          systems: data
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
          <h1>Systemen</h1>
          <table id="DataTable" class="table nowrap">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Acties</th>
                </tr>
            </thead>
            <tbody>
              {this.state.systems.map((system, i) => {
                return(
                <tr valign="middle">
                    <td onClick={() => window.location.href = `/system/${system.id}`}>
                      {system.system_name}
                      <span class="projectSubtitle">{system.system_url}</span>
                    </td>
                    <td style={{ textAlign:'right' }}>
                    <i onClick={(event) => { this.deleteSystem(event, system.id) }} class="btn-delete fas fa-trash-alt"></i>
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
            <form onSubmit={(event) => this.addSystem(event)}>
            <div class="form-group">
                <label for="systemname">Systeem naam</label>
                <input type="text" name="systemname" class="form-control" id="systemname" />
            </div>
            <div class="form-group">
                <label for="systemurl">Systeem url</label>
                <input type="text" name="systemurl" class="form-control" id="systemurl" />
            </div>
            <button style={{ background: '#4f7273', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: '200' }} type="submit" class="btn btn-primary">Toevoegen</button>
            </form>
            </div>
        </div>
        
      </div>
    );
  }
}

export default withAuth(Systems);
