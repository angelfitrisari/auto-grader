import Router, { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useRef, useState } from 'react';
import Layout from "../layouts/layout";
import CodeMirror from 'node_modules/@uiw/react-codemirror/cjs/index'; 
import Link from 'node_modules/next/link';
import * as fs from 'fs';
import {join} from 'path';
// import { exec, execFile, fork, spawn } from "child_process";
import { execSync } from 'child_process';

export default function Coding() {

    const [auth] = useState(true);
    const [message, setMessage] = useState('');
    const ref = useRef(null);
    const [inputCode, setCode] = useState('');
    // var execSync = require('child_process').execSync;
    function syncWriteFile(filename: string, data: any) {
        /**
         * flags:
         *  - w = Open file for reading and writing. File is created if not exists
         *  - a+ = Open file for reading and appending. The file is created if not exists
         */
        fs.writeFileSync(join(__dirname, filename), data, {
          flag: 'w',
        });
      
        const contents = fs.readFileSync(join(__dirname, filename), 'utf-8');
        console.log(contents); // 👉️ "One Two Three Four"
      
        return contents;
    }
    // let {PythonShell} = require('python-shell')

    

    const submit = event => {
        /*fs.writeFile('angel.py', 'hello~', 'utf8', (err) => {
            if(err) {
                console.log(err);
            }
        });

        fs.writeFile('angel.py', 'hello~',  function(err) {
            if (err) {
                return console.error(err);
            }
        })

        console.log(ref.current.value);*/
        // setCode(ref.current.value);
        // syncWriteFile('./angel.py', 'hello~');
        
        // const execProcess = exec('echo helloworld', { 'encoding': 'utf8' }, (error, stdout) => {
        //     console.log(`exec stdout: ${stdout} error: ${error}`);
        // });
        // console.log('---exec spawn---');
        // console.log(execProcess.spawnfile);
        
        const output = execSync('echo helloworld', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log(output);
        setCode(output);
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
                <div className="result-code-container">{inputCode}</div>
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



