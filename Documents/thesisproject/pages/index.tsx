import Layout from 'layouts/layout'
import { useRouter } from 'node_modules/next/router';
import { useEffect, useState } from 'react'
import Logo from "pictures/logo.png"
import Link from 'node_modules/next/link';
import Image from "next/image";
import efficnecyImg from "../pictures/main_efficiency.png";
import readabilityImg from "../pictures/main_read.jpg";
import mainImage from "../pictures/main_img1.jpg";
import locImg from "../pictures/loc.png";
import wordImg from "../pictures/word.png";
import dataImg from "../pictures/dataflow.png";
import controlImg from "../pictures/controlflow.png";
import pylintImg from "../pictures/pylint.png";


export default function Home() {
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:8000/api/user', {
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
      <div className='px-40'>
        <div className='my-32 flex flex-row justify-center'>
          <div className='flex flex-col grid content-center'>
            <div className='mb-4'>
              <div className='text-6xl font-bold font-serif tracking-widest pb-8'>Easy,</div>
              <div className='text-6xl font-bold font-serif tracking-widest pb-8'>Effective,</div>
              <div className='text-6xl font-bold font-serif tracking-widest pb-8'>Efficient.</div>
            </div>
            <div className='text-2xl font-serif pb-4 pr-10'> Auto-Grader is designed for grading student source code efficiency and readability.</div>
            <div className=''>
              <Link href="/register">
                <button className="rounded-full px-8 py-2 bg-black text-white hover:bg-slate-600">
                  <div className="font-serif text-xl tracking-wide">
                    Register
                  </div>
                </button>
              </Link>
            </div>
          </div>
          <div className=''>
            <Image src={mainImage}
              alt="main image"
              width={700}
              height={700}></Image>
          </div>
        </div>
        <div className='flex flex-row justify-center bg-slate-50'>
          <div className='my-32 flex flex-col'>
            <div className='px-4 mb-20 text-6xl font-bold font-serif tracking-wide'>
              Code Efficiency
            </div>
            <div className='flex flex-row mb-32'>
              <div className='mr-10'>
                <Image src={efficnecyImg} alt="efficiency" width={800} height={533} />
              </div>
              <div className='text-2xl align-baseline font-serif grid content-center'>
                Code efficiency is directly related to computation cost and is as important as performance.<br />
                Auto-Grader examines four basic efficiency aspects that must be adhered to.
              </div>
            </div>
            <div className='px-10 flex flex-row justify-between'>
              <div className='flex flex-row justify-center'>
                <div className='mr-6'>
                  <Image src={locImg} alt="loc" width={60} height={60} />
                </div>
                <div className='text-2xl font-mono tracking-tight grid content-center'>
                  Line of Codes
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                <div className='mr-6'>
                  <Image src={wordImg} alt="loc" width={60} height={60} />
                </div>
                <div className='text-2xl font-mono tracking-tight grid content-center'>
                  Reservation Words
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                <div className='mr-6'>
                  <Image src={dataImg} alt="loc" width={60} height={60} />
                </div>
                <div className='text-2xl font-mono tracking-tight grid content-center'>
                  Data Flow Complexity
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                <div className='mr-6'>
                  <Image src={controlImg} alt="loc" width={60} height={60} />
                </div>
                <div className='text-2xl font-mono tracking-tight grid content-center'>
                  Control Flow Complexity
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-center'>
          <div className='my-32 flex flex-col'>
            <div className='px-4 mb-20 text-6xl font-bold font-serif tracking-wide flex justify-end'>
              Code Readability
            </div>
            <div className='flex flex-row mb-24'>
              <div className='text-2xl align-baseline font-serif grid content-center'>
                The readable code makes maintenance and collaboration easier.<br/>
                Auto-Grader grades students' code readability from multiple angles through lint-based tools.
              </div>
              <div className='mr-10'>
                <Image src={readabilityImg} alt="readability" width={500} height={500} />
              </div>
            </div>
            <div className='flex flex-row justify-center'>
                <div className='text-2xl font-serif text-slate-600/50 tracking-tight grid content-center'>
                  Powered By
                </div>
                <div className='mr-6'>
                  <Image src={pylintImg} alt="loc" width={200} height={80} />
                </div>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
