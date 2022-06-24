import { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useState } from 'react';
import Layout from "../layouts/layout";

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
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Log In to Your Account</h1>
                <input type="email" className="form-control" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Log In</button>
            </form>
      </Layout>
    );
};

export default Login;