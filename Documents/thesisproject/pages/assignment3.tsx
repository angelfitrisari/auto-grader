import Router, { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useRef, useState } from 'react';
import Layout from "../layouts/layout";
import CodeMirror from 'node_modules/@uiw/react-codemirror/cjs/index'; 
import Link from 'node_modules/next/link';
import {join} from 'path';
import {GetServerSideProps} from 'next'
import { propTypes } from 'react-bootstrap/esm/Image';
import { sendStatusCode } from 'next/dist/server/api-utils';

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
        <div className="container-white"></div>
        <div className="assignment-field">
            <h2 className= "assignment-text">Assignment</h2>
            <div className="content-wrapper">
                <p className="paragraph-task">Chef has to travel to another place. For this, he can avail any one of two cab services. The first cab service charges X rupees. The second cab service charges Y rupees. Chef wants to spend the minimum amount of money. Which cab service should Chef take?</p>
            </div>
            <h2 className= "test-case-text">Test Case</h2>
            <div className="content-wrapper-two">
                <p className="test-case-task">
                    <strong>Input:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Output:</strong>
                    <p>3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST</p>
                    <p>30 65&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ANY</p>
                    <p>42 42&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SECOND</p>
                    <p>90 50</p>
                </p>
            </div>
        </div>
        <div className="result-field">
            <h2 className="result-text">Result</h2>
            <div className="content-wrapper-result">
                Result of your code: 
                <div className="result-code-container"><p>{props.studentResult1[0]}</p><p>{props.studentResult1[1]}</p><p>{props.studentResult1[2]}</p><p>{props.studentResult1[3]}</p><p>{props.studentResult1[4]}</p><p>{props.studentResult1[5]}</p></div>
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