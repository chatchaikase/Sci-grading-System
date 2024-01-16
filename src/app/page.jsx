import Link from "next/link";
import { logout } from "../function/loginSystem";
import { auth } from "../lib/auth";

export default function Home() {
  return (
    <>
    <Link href={'/login'}>
      <button className="btn btn-primary">login</button>
    </Link>
    <form action={logout}>
        <button className="btn">Logout</button>
      </form>
      <Link href={'/admin'}>
      <button className="btn btn-secondary">admin</button>
    </Link>
      <span className="font-bold text-4xl">Home</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      
    </>
  );
}