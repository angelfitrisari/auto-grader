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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
        <div className="main-content-container">
          <h3 className="i-name">Dashboard</h3>
          <div className="content-values">
            <div className="value-field">
              <i className="bi bi-code-square"></i>
                <div>
                  <h3>Assignments</h3>
                  <span>Current Codes</span>
                </div>
              </div>
              <div className="value-field">
              <i className="bi bi-code-square"></i>
              <div>
                <h3>Performances</h3>
                <span>History</span>
              </div>
              </div>
            </div>

            <button className="adding-button">
              <i className="bi bi-plus-square-fill">Add Assignment</i>
            </button>

            <div className="board-container">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Assignment Name</td>
                      <td>Checked</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                    <td className="date-column">
                      <div className="date-value">
                        <h5>2022/09/25</h5>
                      </div>
                    </td>

                    <td className="assignment-column">
                      <div className="assignment-value">
                        <h5>Assignment 1</h5>
                        <p>Introduction to Computer Engineering</p>
                      </div>
                    </td>

                    <td className="checked-column">
                      <p>Yes</p>
                    </td>

                    <td className="View"><a href="/assignment1">View</a></td>

                    </tr>

                    <tr>

                    <td className="date-column">
                      <div className="date-value">
                        <h5>2022/09/26</h5>
                      </div>
                    </td>

                    <td className="assignment-column">
                      <div className="assignment-value">
                        <h5>Assignment 2</h5>
                        <p>Basis and Practice in Programming</p>
                      </div>
                    </td>

                    <td className="checked-column">
                      <p>No</p>
                    </td>

                    <td className="View"><a href="/assignment2">View</a></td>

                    </tr>

                    <tr>

                    <td className="date-column">
                      <div className="date-value">
                        <h5>2022/09/26</h5>
                      </div>
                    </td>

                    <td className="assignment-column">
                      <div className="assignment-value">
                        <h5>Assignment 3</h5>
                        <p>Computer Programming for Engineers</p>
                      </div>
                    </td>

                    <td className="checked-column">
                      <p>No</p>
                    </td>

                    <td className="View"><a href="/assignment3">View</a></td>

                    </tr>

                    <tr>

                    <td className="date-column">
                      <div className="date-value">
                        <h5>2022/09/30</h5>
                      </div>
                    </td>

                    <td className="assignment-column">
                      <div className="assignment-value">
                        <h5>Assignment 4</h5>
                        <p>Problem Solving and Techniques</p>
                      </div>
                    </td>

                    <td className="checked-column">
                      <p>Yes</p>
                    </td>

                    <td className="View"><a href="/assignment4">View</a></td>

                    </tr>

                    
                  </tbody>
                </table>
            </div>
          </div>
        
      </Layout>
    )
      
/*
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
    );*/
}