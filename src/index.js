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

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Projects} />
            <Route exact path="/project/:id" component={ProjectDetails} />
            <Route exact path="/systems" component={Systems} />
            <Route exact path="/login" component={Login} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
