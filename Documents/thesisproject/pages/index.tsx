import Layout from 'layouts/layout'
import { useRouter } from 'node_modules/next/router';
import { useEffect, useState } from 'react'

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
      {message}
    </Layout>
  )
}
