import React, {Component, useState, useEffect, Fragment} from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import Users from './Users';
import EditUserForm from '../forms/EditUserForm';
import AddUserForm from '../forms/AddUserForm';

const Home = () => {
    const [hasError, setErrors] = useState(false);

    const [users, setUsers] = useState({});
    const [editing, setEditing] = useState(false);

    const initialUser = {id: null, firstname: '', lastname: '', avatar: '', email: ''};
    const [currentUser, setCurrentUser] = useState(initialUser);

    const addUser = user => {
        setUsers([ ...users, user ])
    }

    const editUser = user => {
        setEditing(true)
        setCurrentUser(user)
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)
        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    }

    const deleteUser = (id, user) => {
        axios.delete('http://localhost:8001/api/delete/' + user.id, user, {
            data: user
        })
        .then(response => {
            if(response.data.message.level === 'error') {

            } else {
                setEditing(false)
                setUsers(users.filter(user => user.id !== id))
            }
        }).catch(error => {
            console.error(error);
        });
    }

    async function fetchData() {
        const res = await fetch("http://localhost:8001/api/users");
        res
            .json()
            .then(res => setUsers(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="col">
                <Users users={users} editUser={editUser} deleteUser={deleteUser} />
            </div>

            <div className="col" id="addEditForm">
                {editing ? (
                    <Fragment>
                        <h2>Edit user</h2>
                        <EditUserForm
                            editing={editing}
                            setEditing={setEditing}
                            currentUser={currentUser}
                            updateUser={updateUser}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <h2>Add user</h2>
                        <AddUserForm addUser={addUser} />
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default Home
