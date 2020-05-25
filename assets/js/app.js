import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/app.css';
import Base from './base';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<Router><Base /></Router>, document.getElementById('root'));