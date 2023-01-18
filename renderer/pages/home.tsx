import { styled } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/common/Layout';

const Root = styled('div')(() => ({
  textAlign: 'center',
}));

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>채팅앱 - 홈</title>
      </Head>
      <Layout>
        <Root>
          <h3>Welcome to Chat App</h3>
          <p>Start chatting with your friends</p>
          <Link href="/chat-room/1">단체 채팅방</Link>
        </Root>
      </Layout>
    </React.Fragment>
  );
}

export default Home;
