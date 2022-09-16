import { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useState } from 'react';
import Layout from "../layouts/layout";
import Link from 'node_modules/next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        await router.push('/');
    }

    return (
        <Layout>
            <style>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
                {'body { background-color: #F5F9FA; }'}
            </style>
            <div className="half-color">
            <h1 className="title-account-text">Log In to Your Account</h1>
            </div>
            <div className="form-container">
                <form onSubmit={submit}>
                    <input type="email" className="form-control" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Log In</button>
                </form> 
            </div> 
            <div className="back-button">
                <Link href="/"><i className="bi bi-arrow-left"></i></Link>
            </div> 
        </Layout>
    );
};

export default Login;