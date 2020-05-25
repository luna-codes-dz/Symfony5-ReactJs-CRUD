import React from 'react';
import {Modal, Container, Row, Col} from 'react-bootstrap';

const User = (props) => {
    const avatar = localStorage.getItem('avatar-' + props.user.id)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <img className={avatar ? "avatar" : "d-none"} src={avatar} />
                        </Col>

                        <Col xs="8">
                            <p><b>Email :</b> {props.user.email}</p>
                            <p><b>Firstname :</b> {props.user.firstname}</p>
                            <p><b>Lastname :</b> {props.user.lastname}</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default User
