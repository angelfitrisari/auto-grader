import Router, { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useState } from 'react';
import Layout from "../layouts/layout";

export default function Main() {

    const [auth] = useState(true);

    const handleClick = e => {
        e.preventDefault()
        Router.push('/coding');
    }

    return (
      <Layout auth={auth}>
            <h1>Auto Grader Dashboard</h1>
            <button onClick={handleClick} className="w-100 btn btn-primary">Code 1</button>
            <button onClick={handleClick} className="w-100 btn btn-primary">Code 2</button>
            <button onClick={handleClick} className="w-100 btn btn-primary">Code 3</button>
      </Layout>
    );
}