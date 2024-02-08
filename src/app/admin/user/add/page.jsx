import Link from "next/link";
import React from "react";

export default function AdminPage() {
  return (
    <div className="bg-gray-100 p-[20px] rounded-lg mt-5 shadow overflow-auto">
        <span className="text-2xl font-semibold text-green-600">เพิ่มผู้ใช้งาน</span>
        <form className="flex flex-wrap justify-between mt-4">
          <input
            type="text"
            name="username"
            placeholder="ชื่อผู้ใช้งาน"
            className="input input-bordered w-[45%] mb-7"
            // onChange={(e) => setUsername(e.target.value)}
            // value={username}
          />

          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered w-[45%] mb-7"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
          />

          <input
            type="text"
            name="firstname"
            placeholder="ชื่อจริง"
            className="input input-bordered w-[45%] mb-7"
            // onChange={(e) => setFirstname(e.target.value)}
            // value={firstname}
          />

          <input
            type="text"
            name="lastname"
            placeholder="นามสกุล"
            className="input input-bordered w-[45%] mb-7"
            // onChange={(e) => setLastname(e.target.value)}
            // value={lastname}
          />

          <input
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            className="input input-bordered w-[45%] mb-7"
            // onChange={(e) => setPassword(e.target.value)}
            // value={password}
          />

          <input
            type="password"
            name="passwordRepeat"
            placeholder="ยืนยันรหัสผ่าน"
            className="input input-bordered w-[45%] mb-7"
            // onChange={(e) =>
            //   setPaswordRepeat(e.target.value)
            // }
            // value={passwordRepeat}
          />

          <select
            className="select select-bordered w-[100%] mb-7"
            name="isAdmin"
            defaultValue={"0"}
            // onChange={(e) => setIsAdmin(e.target.value)}
            // value={isAdmin}
          >
            <option value={"0"}>user</option>
            <option value={"1"}>admin</option>
          </select>
          <button type="submit" className="btn bg-green-600 text-white w-full">
            เพิ่มผู้ใช้งาน
          </button>
          <Link href={"/admin"} className="w-full">
            <span className="btn w-full mt-2">ยกเลิก</span>
          </Link>
        </form>
    </div>
  );
}
