import Router, { useRouter } from 'node_modules/next/router';
import React, { SyntheticEvent, useState } from 'react';
import Layout from "../layouts/layout";

export default function Result() {

    const [auth] = useState(true);

    return (
      <Layout auth={auth}>
            <h1>Result</h1>
      </Layout>
    );
}