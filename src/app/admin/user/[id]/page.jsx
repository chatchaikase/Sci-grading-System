import Link from "next/link";
import React from "react";

export default function EditUserPage() {
  return (
    <div className="bg-gray-100 p-[20px] rounded-lg mt-5 shadow overflow-auto">
      <span className="text-2xl font-semibold text-primary">
        เเก้ไขผู้ใช้งาน
      </span>
      <div className="flex flex-col items-center  h-screen ">
        <form className="flex flex-col w-[80%] mt-4">
          <p className="text-md mb-1">ชื่อผู้ใช้งาน</p>
          <input
            type="text"
            name="username"
            placeholder="ชื่อผู้ใช้งาน"
            className="input input-bordered w-full mb-5"
            // onChange={(e) => setUsername(e.target.value)}
            // value={username}
          />
          <p className="text-md mb-1">email</p>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered w-full mb-5"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
          />
          <p className="text-md mb-1">ชื่อจริง</p>
          <input
            type="text"
            name="firstname"
            placeholder="ชื่อจริง"
            className="input input-bordered w-full mb-5"
            // onChange={(e) => setFirstname(e.target.value)}
            // value={firstname}
          />
          <p className="text-md mb-1">นามสกุล</p>
          <input
            type="text"
            name="lastname"
            placeholder="นามสกุล"
            className="input input-bordered w-full mb-5"
            // onChange={(e) => setLastname(e.target.value)}
            // value={lastname}
          />
          <p className="text-md mb-1">password</p>
          <div className="flex w-full mb-7">
            <input
              type="password"
              name="newPassword"
              placeholder="รหัสผ่าน"
              // disabled={!checkPassword}
              // value={newPassword}
              // onChange={(e) =>
              //   setNewPassword(e.target.value)
              // }
              className="input input-bordered w-full"
            />
            <label className="cursor-pointer label">
              <input
                name="checkPassword"
                type="checkbox"
                // checked={checkPassword}
                // value={checkPassword}
                className="checkbox checkbox-success"
                // onChange={() =>
                //   setCheckPassword(!checkPassword)
                // }
              />
            </label>
          </div>
          <p className="text-md mb-1">สถานะ</p>
          <select
            className="select select-bordered w-[100%] mb-5"
            name="isAdmin"
            defaultValue={"0"}
            // onChange={(e) => setIsAdmin(e.target.value)}
            // value={isAdmin}
          >
            <option value={"0"}>user</option>
            <option value={"1"}>admin</option>
          </select>
          <button type="submit" className="btn bg-primary text-white">
            เเก้ไข
          </button>
          <Link href={"/admin"}>
            <span className="btn w-full mt-2">ยกเลิก</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
