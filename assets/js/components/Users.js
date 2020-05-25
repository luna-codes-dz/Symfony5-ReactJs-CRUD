import React, {useState} from 'react';
import axios from 'axios';
import {Link, Redirect, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import User from './User'

const Users = props => {
    const initialModalState = { value: false, data: '' }
    const [modalShow, setModalShow] = React.useState(initialModalState);

    const onClickEditFunction = (user) => {
        let formElem = document.getElementById("addEditForm")
        formElem.scrollIntoView()

        props.editUser(user)
    }

    const onClickModalFunction = (user) => {
        setModalShow({ value: true, data: user })
    }

    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>

            <tbody>
                { props.users.length > 0 ? (
                    props.users.map(user => {
                        const {id, firstname, lastname, avatar, email} = user;
                        return (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{firstname + " " + lastname}</td>
                                <td>{email}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => onClickModalFunction(user)}>Show</button>
                                    <button className="btn btn-info" onClick={() => onClickEditFunction(user)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => props.deleteUser(id, user)}>Delete</button>
                                </td>

                                <User
                                    user={modalShow.data}
                                    show={modalShow.value}
                                    onHide={() => setModalShow(initialModalState)}
                                />
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No users found</td>
                    </tr>
                )
                }
            </tbody>
        </table>
    )
}
export default Users;