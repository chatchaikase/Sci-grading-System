"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const TableComponent = () => {
  const [rows, setRows] = useState([]);  //เก็บค่า rows
  const [items, setItems] = useState([]); //เก็บค่า items จากข้อมูลใน database
  const [formData, setFormData] = useState([]); //เก็บค่า form สำหรับเพิ่มข้อมูลลง database
  const [editedRow, setEditedRow] = useState({ 
    id: 0,
    itemcode: "",
    itemname: "",
  });//เก็บค่าข้อมูลที่ user ต้องการเเก้ไข

  //เมื่อเข้าหน้าเว็บ ให้มีการเรียดึงข้อมูลจาก Table items มาเเสดง
  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setItems(data);
    }
    fetchData();
  }, []);

  //ฟังก์ชัน เพิ่ม row 
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      content: `Row ${rows.length + 1}`,
    };
    setRows([...rows, newRow]);
  };

  //ฟังก์ชัน ลบ row 
  const deleteRow = async (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    await resetRowNumbers();
    await setRows(updatedRows);
  };


  const resetRowNumbers = async () => {
    const updatedRows = rows.map((row, index) => ({ ...row, id: index + 1 }));
    await setRows(updatedRows);
  };

  //ฟังก์ชัน ดักจับข้อมูลใน input
  const handleInputChange = async (id, field, value) => {
    await setFormData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [field]: value,
      },
    }));
  };

   //ฟังก์ชัน เลือกข้อมูลที่ต้องการเเก้ไข
  const handleEditClick = async (row) => {
    await setEditedRow({
      id: row.id,
      itemcode: row.itemcode,
      itemname: row.itemname,
    });

    await document.getElementById("my_modal_1").showModal();
  };

  //ฟังก์ชัน ดักจับข้อมูลที่เปลี่ยนไปสำหรับการเเก้ไข
  const handleEditInputChange = async (field, value) => {
    await setEditedRow((prevRow) => ({
      ...prevRow,
      [field]: value,
    }));
  };

  //ฟังก์ชัน ส่งข้อมูลที่เปลี่ยนไปทำการบันทึกลงหลังบ้าน
  const handleEditSubmit = async()=>{
    const updateRows = rows.map((row)=>
      row.id === editedRow.id ? {...row,...editedRow} :row
    )

    await editData(editedRow.id,editedRow.itemcode,editedRow.itemname);
    await setRows(updateRows)
    document.getElementById("my_modal_1").close();
  }

   //เรียกข้อมูลจาก Table items
   async function getData() {
    try {
      const res = await axios.get("http://localhost:3000/api/items");
      const { items } = res.data;
      return items;
    } catch (error) {
      console.log("ไม่สามารถเรียกข้อมูลจาก database ได้",error)
    }
  }

  //ฟังก์ชัน บันทึกข้อมูล
  const saveData = async () => {
    if (Object.keys(formData).length === 0) {
      alert("กรุณาเพิ่มข้อมูล");
      return;
    }

    try{
      for (const [id, rowValues] of Object.entries(formData)) {
        const { itemcode, itemname } = rowValues;
        await axios.post("http://localhost:3000/api/items", {
          itemname,
          itemcode,
        });
      }
      
      const updatedData = await getData();
      await setItems(updatedData);
      await setFormData({});
      await setRows([]);
    }catch(error){
      alert('ไม่สามารถบันทึกข้อมูลได้');
      console.log("ไม่สามารถบันทึกข้อมูลได้",error)
    }
  };

  //ฟังก์ชัน บันทึกการเเก้ไขข้อมูล
  const editData = async(id,itemcode,itemname) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/items/${id}`,{
        itemcode,
        itemname
      })
      const updatedData = await getData();
      await setItems(updatedData);
    } catch (error) {
      alert('ไม่สามารถเเก้ไขข้อมูลได้');
      console.log("ไม่สามารถเเก้ไขข้อมูลได้",error);
    }
  }

  //ฟังก์ชัน ลบข้อมูล
  const deleteData = async (id) => {
    try {
      await axios.put("http://localhost:3000/api/items", {
      id,
    });
      const updatedData = await getData();
      await setItems(updatedData);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl text-primary font-bold">Information Table</h1>
      <table className="table max-w-max mb-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, index) => (
            <tr key={row.id}>
              <th>{index + 1}</th>
              <td>{row.itemcode}</td>
              <td>{row.itemname}</td>
              <td>
                {/* Open the modal using document.getElementById('ID').showModal() method */}

                
                <button className="btn" onClick={() => handleEditClick(row)}>
                  Edit
                </button>




                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit... </h3>
                    <div className="py-4 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                      <p>itemcode: </p>
                      <input
                        type="text"
                        placeholder="Itemcode"
                        value={editedRow.itemcode}
                        name="editItemCode"
                        required
                        onChange={(e) =>
                          handleEditInputChange("itemcode", e.target.value)
                        }
                        className="input input-bordered input-primary w-full max-w-xs"
                      />
                      </div>
                      <div className="flex items-center gap-2">
                      <p>itemname: </p>
                      <input
                        type="text"
                        placeholder="Itemname"
                        value={editedRow.itemname}
                        name="editItemName"
                        required
                        onChange={(e) =>
                          handleEditInputChange("itemname", e.target.value)
                        }
                        className="input input-bordered input-primary w-full max-w-xs"
                      />
                      </div>
                     
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                          className="btn btn-primary mr-2"
                          onClick={handleEditSubmit}
                        >
                          Submit
                        </button>
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </td>
              <td>
                <button
                  className="btn btn-dangle bg-red-600 text-white"
                  onClick={() => deleteData(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-2xl text-primary font-bold mb-3">Add Item</h1>
      <button className="btn btn-primary" onClick={addRow}>
        Add Row
      </button>
      <button className="btn btn-secondary" onClick={saveData}>
        Save
      </button>
      <table className="table max-w-max ">
        <thead>
          <tr>
            <th>No.</th>
            <th className="text-center">Item Code</th>
            <th className="text-center">Item Name</th>
            {/* <th>DropdownList</th> */}
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <th>{index + 1}</th>
              <td>
                <input
                  type="text"
                  name="itemcode"
                  value={formData[row.id]?.itemcode || ""}
                  placeholder="Item Code"
                  onChange={(e) =>
                    handleInputChange(row.id, "itemcode", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  name="itemname"
                  value={formData[row.id]?.itemname || ""}
                  placeholder="Item Name"
                  onChange={(e) =>
                    handleInputChange(row.id, "itemname", e.target.value)
                  }
                />
              </td>
              {/* <td>
                <select name="test">
                  <option value="0" >--select--</option>
                  <option value="1">a</option>
                </select>
              </td> */}
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteRow(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
