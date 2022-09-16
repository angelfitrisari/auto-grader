import Layout from 'layouts/layout'
import { useRouter } from 'node_modules/next/router';
import { useEffect, useState } from 'react' 
import Logo from "pictures/logo.png"
import Link from 'node_modules/next/link';

export default function Home() {
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect( () => {
    (
        async () => {
          try {
            const response = await fetch('http://localhost:8000/api/user',  {
              credentials: 'include',
            });
            const content = await response.json();
            
            setMessage('Welcome, you are logged in.');
            setAuth(true);
            router.push('/main');

          } catch (e) {
            setMessage('Please log in to your account.');
            setAuth(false);
          }
        }
    )();
  });

  return (
    <Layout auth={auth}>
      <div className="row">
      </div>
      <style>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
          {'body { background-color: #4974FA; }'}
      </style>
      <div>
        <i className="bi bi-display"></i>
        <p className="title-text">SE Auto Grader</p>
      </div>
        <Link href="/login"><button className="button-style-login">Log In</button></Link>
        <Link href="/register"><button className="button-style-register">Register</button></Link>
    </Layout>
  )
}
