import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Our Components
import Login from './components/Login';
import Systems from './Systems';
import SystemDetails from './SystemDetails';
import ProjectEdit from './ProjectEdit';
import SystemEdit from './SystemEdit';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Projects} />
            <Route exact path="/project/:id" component={ProjectDetails} />
            <Route exact path="/project/:id/edit" component={ProjectEdit} />
            <Route exact path="/systems" component={Systems} />
            <Route exact path="/system/:id" component={SystemDetails} />
            <Route exact path="/system/:id/edit" component={SystemEdit} />
            <Route exact path="/login" component={Login} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
