"use client"

// import styles from './page.module.css'
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {

  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };


  return (
    <div className='flex flex-col justify-center items-center align-middle content-center text-center mt-10'>
      <h1 className="text-hot-pink font-bold text-3xl">Create an Account</h1>
      <h2>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className='flex flex-col w-2xs'>
        <input
          type="text"
          placeholder="Username"
          required
          className='input-field'
        />
        <input
          type="text"
          placeholder="Email"
          required
          className='input-field'
        />
        <input
          type="password"
          placeholder="Password"
          required
          className='input-field'
        />
        <button className='btn-primary m-2.5'>Register</button>
        {error && "Something went wrong!"}
      </form>
      <span className="or">- OR -</span>
      <Link className="link" href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register