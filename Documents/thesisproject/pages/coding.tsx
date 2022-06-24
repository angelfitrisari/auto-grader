import Router, { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useState } from 'react';
import Layout from "../layouts/layout";
import CodeMirror from 'node_modules/@uiw/react-codemirror/cjs/index'; 



export default function Coding() {

    const [auth] = useState(true);

    const submitClick = e => {
        e.preventDefault()
        Router.push('/result');
    }

    return (
      <Layout auth={auth}>
        <h1>Insert your code</h1>
        <div className="absolute top-20 bottom-40 left-10 right-10 text-left">
            <CodeMirror
                //value={code}
                options={{
                    theme: 'dracula',
                    keyMap: 'sublime',
                    mode: 'jsx',
                }}
                onChange={(editor, change) => {
                  
                   
                }}
            />
        </div>


        <button onClick={submitClick} className="w-100 btn btn-primary" type="submit">Submit</button>
        
      </Layout>)
}



