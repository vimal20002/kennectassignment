'use client'
import { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import Input from "./Input";
import Button from "./Button";
import { UidContext } from "@app/globalContext";

const Auth = ({isLogedIn, setIsLoggedIn}) => {
    const [name, setName]= useState('');
    const [user,setUser]=useState("")
    const {setUid} = useContext(UidContext);

    useEffect(()=>{
        const checkLogin=async()=>{
          var token;
          if (typeof window !== 'undefined') {
          token = JSON.parse(localStorage.getItem('token'))
          }
            if(token !== undefined &&  token !== null)
            {
                try {
                    const res = await fetch(`/api/auth/${token}`,{
                        method:'GET'
                    })
                    const data = await res.json();
                    console.log(data)
                    if(data)setIsLoggedIn(true);
                    setName(data?.name)
                    if (typeof window !== 'undefined') {
                    sessionStorage.setItem('name',JSON.stringify(data?.name))
                    sessionStorage.setItem('uid',JSON.stringify(data?.uid))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        checkLogin()
    },[])
    useEffect(()=>{
      var dt;
      if (typeof window !== 'undefined') {
       dt = JSON.parse(sessionStorage.getItem('name'))
      }
      if(dt !== null){
      setName(dt)
      setIsLoggedIn(true)
      }
    })
    const logOut = ()=>{
      setIsLoggedIn(false);
      if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
      }
    }
    const continueUser = async(e)=>{
      e.preventDefault();
        const res = await fetch('/api/auth/login', {
          method:'POST',
          body:JSON.stringify({name:user})
        })
        const data = await res.json();
        console.log(data)
        if (typeof window !== 'undefined') {
        localStorage.setItem('token', JSON.stringify(data?.token));
        sessionStorage.setItem('name',JSON.stringify(data?.nuser?.name))
        sessionStorage.setItem('uid',JSON.stringify(data?.uid))
        }
        setUid(data?.uid)
        setIsLoggedIn(true)
    }
  return (
    <div className="auth-op">
    {
      isLogedIn?
      <div className="auth"> <div className="auth-op op"> {name.toLocaleUpperCase()}</div>
      <div className="auth-op op" onClick={logOut}> Logout</div>
      </div>:
      <div className="auth">
       <Link href="/register"> <div className="auth-op op">Register</div></Link>
       <h4>or</h4>
        <Link href="/login"><div className="auth-op op">LogIn</div></Link>
        <h4>or</h4>
        <Input type="text" name="username" placeValue="Userame" onChangeFun={setUser}/>
        <Button value={"Continue"} handleSubmit={continueUser}/>
      </div>
    }
  </div>
  )
}

export default Auth