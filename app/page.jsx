'use client'
import Head from 'next/head'
import Form from './components/Form'
import Auth from './components/Auth'
import { useContext } from "react";
import { LoginContext } from "@app/globalContext";
const page = () => {
  const { isLogedIn, setIsLoggedIn } = useContext(LoginContext)
  return (
    <section>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <div className='main'>
        {
          !isLogedIn ? 
          <Auth isLogedIn={isLogedIn} setIsLoggedIn={setIsLoggedIn}/> :
            <>
              <h2 className="main_heading">
                Hey There What's is on your mind share with us !
              </h2>
              <br />
              <Form />
            </>
        }
      </div>
    </section>
  )
}

export default page