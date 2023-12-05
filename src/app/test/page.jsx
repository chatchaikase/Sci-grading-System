'use client';
import { useState, useEffect } from 'react';

const TableComponent = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // async function fetchData() {
    //   const updatedRows = await resetRowNumbers();
    //   if (updatedRows) {
    //     setRows(updatedRows);
    //   }
    // }
    // fetchData();
  }, []);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      content: `Row ${rows.length + 1}`,
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = async (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    await resetRowNumbers();
    await setRows(updatedRows);
  };

  const resetRowNumbers = async () => {
    const updatedRows = rows.map((row, index) => ({ ...row, id: index + 1 }));
    await setRows(updatedRows);
  };

  return (
    <div className='overflow-x-auto'>
      <button className='btn btn-primary' onClick={addRow}>Add Row</button>
      <table className='table max-w-max sm:max-w-md'>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Content</th>
            <th>InputData</th>
            <th>DropdownList</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row,index) => (
            <tr key={row.id}>
              <th>{index + 1}</th>
              <td>{row.id}</td>
              <td>{row.content}</td>
              <td>
                <span>DataNAme:</span><input type="text" />
              </td>
              <td>
                <select name="test">
                  <option value="0" >--select--</option>
                  <option value="1">a</option>
                </select>
              </td>
              <td>
                <button className='btn btn-warning' onClick={() => deleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;