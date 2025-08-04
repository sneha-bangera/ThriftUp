'use client';

import React, { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10 mb-20'>
      <h1 className="text-hot-pink font-bold text-3xl">{success ? success : "Welcome Back"}</h1>
      <h2>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className='w-2xs flex flex-col'>
        <input type="text" placeholder="Email" required className='input-field' />
        <input type="password" placeholder="Password" required className='input-field' />
        <button className='btn-primary m-2.5'>Login</button>
        {error && <p className='text-red-600'>{error}</p>}
      </form>

      <button onClick={() => signIn("google")} className='btn-secondary w-3xs m-2.5'>
        Login with Google
      </button>

      <span className='or'>- OR -</span>

      <Link className='link' href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
