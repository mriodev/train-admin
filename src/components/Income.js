import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './income.css';
import { Row, Col, ListGroup } from 'react-bootstrap';

export default function Income() {
    return (
        <div className='income scrollable'>
            <h1>Total Income</h1>
            <hr></hr>
            <Row className='mt-5'>
                <Col md={6}>

                    <div className='income-card'>
                        <h2 className='mb-4'>sfds</h2>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Ticket Price (per seat)</Col>
                                    <Col>asfsdf</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Bookings</Col>
                                    <Col>sdfd</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Income</Col>
                                    <Col>Rs. </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                    </div>
                    <hr></hr>



                </Col>
                <Col md={6}>
                    <ListGroup>
                        <ListGroup.Item><h2 className='text-center'>Overall Stats</h2></ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col><h4>Overall Bookings</h4></Col>
                                <Col><h4>sdfdf</h4></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col><h4>Overall Income</h4></Col>
                                <Col><h4>Rs. </h4></Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </div>
    )
}
