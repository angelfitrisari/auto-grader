import React, { SyntheticEvent, useState } from 'react';
import Layout from "../layouts/layout";
import { useRouter } from 'node_modules/next/router';
import Link from 'node_modules/next/link';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch('http://localhost:8000/api/register', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        await router.push('/login');
    }

    return (
        <Layout>
            <style>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
                {'body { background-color: #F5F9FA; }'}
            </style>
            <div className="half-color">
            <h1 className="title-account-text">Register Your Account</h1>
            </div>
            <div className="form-container">
                <form onSubmit={submit}>
                    <input className="form-control" placeholder="Full Name" required onChange={e => setName(e.target.value)}/>               
                    <input className="form-control" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                    <input type ="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                </form>
            </div>
            <div className="back-button">
                <Link href="/"><i className="bi bi-arrow-left"></i></Link>
            </div> 
            
        </Layout>
    );
};

export default Register;



