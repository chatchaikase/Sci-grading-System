"use client";
import React from "react";
import { useFormState } from "react-dom";
import { login, logout } from "../../function/loginSystem";
export default function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <div>
      <form action={formAction} className="px-10 py-5 flex flex-col gap-5">
        <h1 className="text-3xl text-success font-bold text-center">
          ระบบจัดเก็บคะเเนนนิสิต
        </h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="input input-bordered w-full max-w-xs mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="input input-bordered w-full max-w-xs mb-4"
        />
        <button className="btn btn-success text-white w-full">
          เข้าสู่ระบบ
        </button>
        {state?.error}
      </form>
    </div>
  );
}
