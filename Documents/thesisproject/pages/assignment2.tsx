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
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProgressBar from 'react-bootstrap/ProgressBar';

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
        <div className='p-4 flex flex-row justify-center'>
            <div className='w-1/5'>
                <div className='p-2 mb-40'>
                    <p className='font-serif text-4xl'>
                        Introduction of CS
                    </p>
                    <p className='text-xl'>
                    Chef's phone shows a Battery Low notification if the battery level is 15% or less. Given that the battery level of Chef's phone is X%, determine whether it would show a Battery low notification.
                    </p>
                </div>

                <div className='p-2 mb-40'>
                    <p className='font-serif text-3xl'>
                        Test Case
                    </p>
                    <div className='p-2'>
                        <table className='w-11/12 '>
                            <thead className='bg-black text-white'>
                                <tr>
                                    <th>
                                        <p className='p-2 text-center font-xl font-serif tracking-wider'>
                                            Input
                                        </p>
                                    </th>
                                    <th>
                                        <p className='p-2 text-center font-xl font-serif tracking-wider'>
                                            Output
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-t border-black'>
                                    <th>
                                        <p className='p-2 text-center font-xl'>
                                            3
                                        </p>
                                    </th>
                                    <th>
                                        <p className='p-2 text-center font-xl'>
                                            Yes
                                        </p>
                                    </th>
                                </tr>
                                <tr className='border-t border-black bg-slate-100'>
                                    <th>
                                    <p className='p-2 text-center font-xl'>
                                            15
                                        </p>
                                    </th>
                                    <th>
                                        <p className='p-2 text-center font-xl'>
                                            Yes
                                        </p>
                                    </th>
                                </tr>
                                <tr className='border-t border-black'>
                                    <th>
                                    <p className='p-2 text-center font-xl'>
                                            3
                                        </p>
                                    </th>
                                    <th>
                                        <p className='p-2 text-center font-xl'>
                                            No
                                        </p>
                                    </th>
                                </tr>
                                <tr className='border-t border-black bg-slate-100'>
                                    <th>
                                    <p className='p-2 text-center font-xl'>
                                            65
                                        </p>
                                    </th>
                                    <th>
                                    <p className='p-2 text-center font-xl'>
                                            
                                        </p>
                                    </th>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='px-20 w-1/2'>
                <div className='content-center mb-10'>
                    <p className='font-serif text-4xl'>
                        Your Code
                    </p>
                </div>
                <div className="coding-field h-4/6 mb-10 flex justify-center">
                    <textarea ref={ref} id="message" placeholder="please start your code with 'def func():'" className="editing w-full h-full" onKeyDown={handleKeyDown}></textarea>
                    <pre id="highlighting" aria-hidden="true">
                        <code className="language-html" id="highlighting-content"></code>
                    </pre>
                </div>
                <div className='flex justify-end'>
                    <button className="rounded-full bg-blue-700 py-1 px-4 font-serif text-white text-xl hover:bg-blue-800" type="submit" onClick={submit}>Submit</button>
                </div>
            </div>
            <div className='px-10 w-1/5'>
                <div className='mb-10'>
                    <p className='font-serif text-4xl'>
                        Result
                    </p>
                </div>
                <div>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    >
                    <Tab eventKey="score" title="Score">
                        <div className='p-2'>
                            <p>{props.studentResult1[0]}</p>
                        </div>
                    </Tab>
                    <Tab eventKey="detail" title="Detail">
                        <div className='p-2'>
                            <p>Cognitive Complexity: <ProgressBar now={props.studentResult1[1]}/></p><p> LOC: <ProgressBar now={props.studentResult1[2]}/></p><p>Halstead Volume: <ProgressBar now={props.studentResult1[3]}/></p><p>Cyclomatic Complexity: <ProgressBar now={props.studentResult1[4]}/></p><p>{props.studentResult1[5]}</p>
                        </div>
                    </Tab>

                </Tabs>
                </div>
            </div>
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