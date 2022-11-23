import Router, { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useState } from 'react';
import Layout from "../layouts/layout";

export default function Main() {

    const [auth] = useState(true);

    const handleClick = e => {
        e.preventDefault()
        Router.push('/coding');
    }

    return(
      <Layout auth={auth}>
        <div className='px-52 py-20 flex flex-col justify-center'>
          <div className='px-10 mb-20 text-5xl font-serif tracking-wide'>
            Assignments
          </div>
          <div className='content-center'>
            <table className='border-collapse border-spacing-4 shadow-md w-11/12'>
              <thead className='w-screen'>
                <tr className='bg-black text-white border-separate text-middle'>
                  <th className='w-1/12 content-center'>
                    <p className='p-4 text-center text-2xl font-serif'>
                      ID
                    </p>
                  </th>
                  <th className='w-2/5'>
                    <p className='p-4 text-center text-2xl font-serif'>
                    Title
                    </p>
                  </th>
                  <th className='w-1/6'>
                    <p className='p-4 text-center text-2xl font-serif'>
                    Date
                    </p>
                  </th>
                  <th className='w-1/6'>
                    <p className='p-4 text-center text-2xl font-serif'>
                      Solved
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className='text-center text-xl'>
                      1
                    </p>
                  </td>
                  <td className='border-spacing-32'>
                    <p className='p-4 text-left text-xl'>
                      <a href="/assignment1" className='visited:text-black'>
                        Introduction to Computer Engineering
                      </a>
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                    2022/09/25
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                    Yes
                    </p>
                  </td>
                </tr>
                <tr className='bg-slate-100'>
                  <td>
                    <p className='text-center text-xl'>
                      2
                    </p>
                  </td>
                  <td>
                    <p className='p-4 text-left text-xl'>
                      <a href="/assignment2" className='visited:text-black'>
                        Basis and Practice in Programming
                      </a>
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                    2022/09/25
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                    Yes
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className='text-center text-xl'>
                      3
                    </p>
                  </td>
                  <td>
                    <p className='p-4 text-left text-xl'>
                      <a href="/assignment3" className='visited:text-black'>
                        Computer Programming for Engineers
                      </a>
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                      2022/09/25
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                      No
                    </p>
                  </td>
                </tr>
                <tr className='bg-slate-100'>
                  <td>
                    <p className='text-center text-xl'>
                      4
                    </p>
                  </td>
                  <td>
                    <p className='p-4 text-left text-xl text-black'>
                      <a href="/assignment4" className='visited:text-black'>
                        Problem Solving and Techniques
                      </a>
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                      2022/09/25
                    </p>
                  </td>
                  <td>
                    <p className='text-center text-xl'>
                      No
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    )
}