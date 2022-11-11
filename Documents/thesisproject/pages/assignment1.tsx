import Router, { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useRef, useState } from 'react';
import Layout from "../layouts/layout";
import CodeMirror from 'node_modules/@uiw/react-codemirror/cjs/index'; 
import Link from 'node_modules/next/link';
import {join} from 'path';
import {GetServerSideProps} from 'next'
import { propTypes } from 'react-bootstrap/esm/Image';
import { sendStatusCode } from 'next/dist/server/api-utils';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

export async function getServerSideProps(context) {
    var originalStudentCode : string | undefined;
    originalStudentCode = context.query.studentCode;

    // return the grading result
    // var studentResult = originalStudentCode;

    // var studentResult = "mytest";
    if (originalStudentCode) {
        console.log('student_code:' + originalStudentCode);
        syncWriteFile(originalStudentCode);
        var studentResult = await FileHandling();
        console.log('grading result: \n' + studentResult)
        return {
            props: {
                studentResult1: studentResult ?? {},
            },
        };
    }
    // var studentResult = ''
    return {
        props: {
            studentResult1: '' ?? {},
        },
    };
}
function Coding(props) {
    const [auth] = useState(true);
    const [message, setMessage] = useState('');
    const ref = useRef(null);
    const [inputCode, setCode] = useState('');
    const router = useRouter();
    console.log('js_get_data:'+ (typeof props.studentResult1))
    const submit = event => {
        const studentCode = ref.current.value;
 
        console.log('studentCode:' + studentCode)
        router.push({
            query: {studentCode: studentCode},
        }, '/coding');
    }
    const handleKeyDown = ev => {
        if(ev.key == 'Tab') {
            ev.preventDefault();
            var start = ev.target.selectionStart;
            var end = ev.target.selectionEnd;
            ev.target.value = ev.target.value.substring(0, start) + '\t' + ev.target.value.substring(end);
            ev.target.selectionStart = ev.target.selectionEnd = start + 1;
        }
    }
    return (
      <Layout auth={auth}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
        <div className="container-white"></div>
        <div className="assignment-field">
            <h2 className= "assignment-text">Assignment</h2>
            <div className="content-wrapper">
                <p className="paragraph-task">There is a group of N friends who wish to enroll in a course together. The course has a maximum capacity of M students that can register for it. If there are K other students who have already enrolled in the course, determine if it will still be possible for all the N friends to do so or not.</p>
            </div>
            <h2 className= "test-case-text">Test Case</h2>
            <div className="content-wrapper-two">
                <p className="test-case-task">
                    <strong>Input:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Output:</strong>
                    <p>3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes</p>
                    <p>2 50 27&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No</p>
                    <p>5 40 38&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes</p>
                    <p>100 100 0</p>
                </p>
            </div>
        </div>
        <div className="result-field">
            <h2 className="result-text">Result</h2>
            <div className="content-wrapper-result">
                Result of your code:
                <p>
                <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Link with href
                </a>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Button with data-bs-target
                </button>
                </p>
                <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
                </div>          
            </div>
        </div>
        <div className="coding-field">
            <h1>Insert your code</h1>
            <textarea ref={ref} id="message" placeholder="please start your code with 'def func():'" className="editing" onKeyDown={handleKeyDown}></textarea>
            <pre id="highlighting" aria-hidden="true">
                <code className="language-html" id="highlighting-content"></code>
            </pre>
            <button className="coding-button" type="submit" onClick={submit}>Submit</button>
            </div>
            <div className="back-button">
                <Link href="/main"><i className="bi bi-arrow-left"></i></Link>
            </div> 
      
        
      </Layout>)
}
function syncWriteFile(data: any) {
    const fse = require('fs-extra');
    fse.outputFile('tmp/submission.py', data)
    .then((    ) => {
        console.log('File has been saved');
    })
    .catch(err => {
        console.log('File has not been saved')
        console.error(err)
    });
}
async function FileHandling(){
    const PythonShell = require('python-shell').PythonShell;

    const options = {
        mode: 'text',
        pythonPath: '',
        scriptPath: './tmp'
    }
    
    // wrap it in a promise, and `await` the result
    const { success , err = '', results } = await new Promise((resolve, reject) => {
        PythonShell.run('grading_code.py', options, function (err, results) {
            if(err) {
                reject({ success: false, err});
            }   
            //console.log('shell result:', results[0]);
            console.log('shell result:', results);
            resolve({success: true, results});
        });
        // return results[0]
    });
    //console.log('is it work?');
    if (!success) {
        console.log('fail')
        return;
    }
    //console.log('filehandling_result:' + results[0]);
    console.log('filehandling_result: ' + "\n");
    for(let i = 0; i < results.length; i++){
        console.log(results[i] + "\n")
    }
    //return results[0]

    var res_array = results;

    return results
}
export default Coding;