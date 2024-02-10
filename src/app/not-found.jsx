"use client"
import Link from "next/link";

export default function Notfound() {
  return (
    <div>
        <h2>ไม่พบเจอหน้าที่คุณต้องการ</h2>
        <p>กรุณาลองหน้าอื่น</p>
        <Link href={'/import/importlist'}>กลับไปหน้าเเรก</Link>
    </div>
  )
}
