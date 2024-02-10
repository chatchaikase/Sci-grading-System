"use client"
import Image from "next/image";
import React from "react";

export default function LoginImage() {
  return (
    <div className="mx-auto mb-5">
      <Image
        src={"/logo/Logo.png"}
        width={300}
        height={40}
        className="object-cover "
        alt="Logo"
      />
    </div>
  );
}
