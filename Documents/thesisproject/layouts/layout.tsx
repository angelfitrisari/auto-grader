import React from 'react';
import Head from "node_modules/next/head";
import Link from "node_modules/next/link";
import { useRouter } from 'node_modules/next/router';
import { cp } from 'fs';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from "next/image";
// import Image from 'react-bootstrap/Image'
import logoImg from "../pictures/logo.png";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Layout = (props) => {

    const router = useRouter();    

    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            credentials: 'include',
        })

        await router.push('/login');
    }
    let menu;

    if(!props.auth) {
        menu = (
            <div>
                <Navbar className="px-1" bg="light">
                    <Container>
                    <Navbar.Brand href="/">
                        <Row>
                            <Col>
                                <Image src={logoImg} alt="test" width={30} height={30}/>
                            </Col>
                            <Col>
                                Auto-Grader
                            </Col>
                        </Row>
                    </Navbar.Brand>
                    
                        <Nav className="py-2 px-4 justify-content-end">
                            <Nav.Link className="px-2 pe-4" href="/login">Log in</Nav.Link>
                            <Button variant="dark" href="/register">Register</Button>{' '}
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            )
        } else {
            menu = (
                <div>
                    <Navbar className="px-1" bg="light">
                        <Container>
                        <Navbar.Brand href="/">
                        <Row>
                            <Col>
                                <Image src={logoImg} alt="test" width={30} height={30}/>
                            </Col>
                            <Col>
                                Auto-Grader
                            </Col>
                        </Row>
                        </Navbar.Brand>
                            <Nav className="py-2 px-4 justify-content-end">
                                <Nav.Link className="px-2 pe-4" href="/main">Assignment</Nav.Link>
                                <Button variant="dark" href="#" onClick={logout}>Log out</Button>{' '}
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
            )
        }

    return (
            <>
                <nav className=''>
                    <div>
                        {menu}
                    </div>
                </nav>

                <main>
                   {props.children}
                </main>

                <div className='mt-20 p-20 flex flex-row justify-center bg-slate-100'>
                    <div className='w-5/6'>
                        <div className='mb-4 text-2xl text-slate-700'>
                            Auto-Grader
                        </div>
                        <div className='mb-4 text-xl text-slate-500'>
                            Project Owner: Angel Fitri Sari<br></br>
                            Advisor: Jinseok Heo
                        </div>
                        <div className='mb-4 text-xl text-slate-500'>
                            Powered By NEXT.JS / React Bootstrap / Tailwindcss / flaticon / freepik
                        </div>
                        <div className='text-xl text-slate-500'>
                            @Copyright 2022. Angel Fitri Sari. All rights reserved.
                        </div>
                    </div>
                </div>
            </> 
    );
};

export default Layout;