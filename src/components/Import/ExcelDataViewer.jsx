import React from 'react'

export default function ExcelDataViewer({excelData}) {
  return (
    <div className="viewer">
        {excelData ? (
          <div className="table=responsive">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th
                      className="text-center w-10 p-3 text-sm font-semibold tracking-wide"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {excelData.map((individualExcelData, index) => (
                  <tr className="bg-white" key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td
                        className="text-center p-3 text-sm text-gray-700 whitespace-nowrap"
                        key={key}
                      >
                        {key.toLowerCase().includes("date") &&
                        individualExcelData[key] instanceof Date
                          ? formatDateWithTimeZone(individualExcelData[key])
                          : individualExcelData[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>ไม่มีข้อมูลจากอัปโหลดไฟล์</div>
        )}
      </div>
  )
}