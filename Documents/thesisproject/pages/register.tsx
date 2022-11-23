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
            headers: { 'Content-Type': 'application/json' },
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
            <div className='py-60 bg-gradient-to-r from-cyan-500/70 to-sky-800/70 text-center'>
                <p className='text-4xl font-serif tracking-widest text-white'>
                    Register Your Account
                </p>
            </div>
            <div className="py-5 form-container flex justify-center">
                <form onSubmit={submit}>
                    <div className='m-8 flex justify-center'>
                        <input type="text" className="rounded-full" placeholder="Full Name" required onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='m-8 flex justify-center'>
                        <input type="email" className="rounded-full" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='m-8 flex justify-center'>
                        <input type="password" className="rounded-full" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='m-8 flex justify-center'>
                        <button className="px-6 py-2 rounded-full font-serif bg-black text-white tracking-widest hover:bg-slate-600" type="submit">Register</button>
                    </div>
                </form>
            </div>

        </Layout>
    );
};

export default Register;



