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
    var originalStudentCode = context.query.studentCode;
    
    // return the grading result
    // var studentResult = originalStudentCode;
    
    
    console.log('student_code:' + originalStudentCode);
    syncWriteFile(originalStudentCode);
    // var studentResult = "mytest";
    var studentResult = FileHandling();
    console.log('grading result:' + studentResult)
    return {
        props: {
            studentResult1: studentResult ?? {},
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
                <p className="paragraph-task">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut est hendrerit, scelerisque neque ut, mattis nulla. Sed ut aliquam tellus, eu accumsan orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec non urna vel tellus vestibulum malesuada. Etiam nisl dui, laoreet nec erat ut, consequat sagittis odio. Sed commodo gravida dignissim.</p>
            </div>
            <h2 className= "test-case-text">Test Case</h2>
            <div className="content-wrapper-two">
                <p className="test-case-task">
                    Input your student ID: 2019313897
                </p>
                <p className="test-case-task">
                    Output: Welcome, Student 2019313897!
                </p>
            </div>
        </div>
        <div className="result-field">
            <h2 className="result-text">Result</h2>
            <div className="content-wrapper-result">
                Result of your code: 
                <div className="result-code-container">{props.studentResult1}</div>
            </div>
        </div>
        <div className="coding-field">
            <h1>Insert your code</h1>
            <textarea ref={ref} id="message" className="editing" onKeyDown={handleKeyDown}></textarea>
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
        console.error(err)
    });
}

function FileHandling(){
    const PythonShell = require('python-shell').PythonShell;

    // var options = {
    //     mode: 'text',
    //     pythonPath: '',
    //     pythonOptions: ['pylint'],
    //     scriptPath: '/tmp',
    //     args: ['value1']
    // };
    // var options = {
    //     mode: 'text',
    //     pythonPath: '',
    //     scriptPath: './tmp'
    // }


    const runPy = async (code) => {
        const options = {
            mode: 'text',
            pythonPath: '',
            scriptPath: './tmp'
        }
     
        // wrap it in a promise, and `await` the result
        const result = await new Promise((resolve, reject) => {
            var gradingResult = PythonShell.run('grading_student_code.py', options, function (err, results){
                if(err){
                    throw err;
                }
                console.log('results:', results[0]);
                return results[0]
            });
        });
        return result;
     };

    console.log('is it work?')
    return runPy
}

export default Coding;