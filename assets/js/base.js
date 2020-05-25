import React, {Component, useState, useEffect} from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";

function Base() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/users" className="navbar-brand">
                        Luna's Intranet
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/users"} className="nav-link">
                                Users
                            </Link>
                        </li>
                    </div>
                </nav>

                <Switch>
                    <Route exact path={["/", "/users"]} component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default Base;
