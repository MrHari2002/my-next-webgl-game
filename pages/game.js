import Head from 'next/head'

export default function Game() {
  return (
    <>
      <Head>
        <title>My WebGL Game</title>
      </Head>
      <div style={{ height: '100vh', width: '100%' }}>
        <iframe src="/UnityGame/index.html" style={{ border: 'none', width: '100%', height: '100%' }}></iframe>
      </div>
    </>
  );
}
