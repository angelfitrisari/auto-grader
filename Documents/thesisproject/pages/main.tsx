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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
        <div className="dashboard-title">
          <h1>Auto Grader Dashboard</h1>
        </div>
            <div className="grid-layout">
              <div className="box-style" onClick={handleClick}>
                <div className="box-color">
                </div>
                This is the first assignment.
                <i className="bi bi-trash-fill"></i>
              </div>
              <div className="box-style" onClick={handleClick}>
                <div className="box-color">
                </div>
                This is the second assignment.
                <i className="bi bi-trash-fill"></i>
              </div>
              <div className="box-style" onClick={handleClick}>
                <div className="box-color">
                </div>
                This is the third assignment.
                <i className="bi bi-trash-fill"></i>
              </div>
              <div className="box-style" onClick={handleClick}>
                <div className="box-color">
                </div>
                This is the fourth assignment.
                <i className="bi bi-trash-fill"></i>
              </div>
              <div className="box-style" onClick={handleClick}>
                <div className="box-color">
                </div>
                This is the fifth assignment.
                <i className="bi bi-trash-fill"></i>
              </div>
              <div className="box-style">
                <div className="box-color">
                </div>
                This is the sixth assignment.
                <i className="bi bi-trash-fill"></i>
              </div>
            </div>
      </Layout>
    );
}