"use client"
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchUser({placeholder}) {
  const serchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter();


  const handleSearch = (e) => {
    const params = new URLSearchParams(serchParams);
    params.set("q",e.target.value)
    replace(`${pathname}?${params}`)
  }
  return (
    <div className="relative ml-2">
    <Icon
      icon="material-symbols:search"
      width={25}
      height={25}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder={placeholder}
      className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
      onChange={(e) =>handleSearch(e)}
    />
  </div>
  );
}
