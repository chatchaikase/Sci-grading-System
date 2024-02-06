import React from 'react'

export default function HeaderStep2({
    importHeaderInDB
}) {
    const importHeaderNumber = importHeaderInDB;
    
  return (
    <div className="text-center text-2xl font-semibold">
    <ul className="steps">
      <li className="step step-neutral text-neutral">
        {importHeaderNumber} ข้อมูลเก่า
      </li>
      <li className="step step-neutral">ตรวจสอบข้อมูลใหม่</li>
      <li className="step">เสร็จสิ้น</li>
    </ul>
  </div>
  )
}
