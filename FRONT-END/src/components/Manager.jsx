import React, { useState, useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import DataDisplay from "./DataDisplay";
import { v4 as uuidv4 } from 'uuid';


function Manager() {
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const ref = useRef()
  const passwordRef = useRef()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const getPasswords = async (params) => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords);
    console.log(passwords)
  }

  useEffect(() => {
    getPasswords()

  }, [])

  const showPassword = () => {

  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // If any such id exists in the db, delete it
      await fetch("http://localhost:3000/", { method: "DELETE", headers: {"content-Type":"application/json"},
        body: JSON.stringify({id: form.id})})

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: {"content-Type":"application/json"},
      body: JSON.stringify({id: form.id})})
      // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form]);
    }
    else {
      window.alert("Message Not Saved!")
    }
  }

  return (
    <>
      <div className="bg-green-50">
        <div className="p-2 md:px-0 md:mycontainer ">
          <h1 className="text-4xl font-bold text-center">
            <span className='text-green-500'> &lt; / </span>
            Password
            <span className='text-green-500'> Store /&gt;</span>
          </h1>
          <p className="text-green-900 text-lg text-center mt-3">Your Personal Password Manager</p>

          <div className="flex flex-col items-center gap-5 text-black p-4 py-1">
            <input className="border border-green-500 w-full rounded-full placeholder:p-2"
              onChange={handleChange}
              type="text" value={form.site} name="site" id="" placeholder="Enter Website URL" />
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
              <input className="border border-green-500 w-full rounded-full placeholder:p-2"
                onChange={handleChange}
                type="text" value={form.username} name="username" id="" placeholder="Enter User Name" />
              <div className="relative">
                <input className="border border-green-500 w-full rounded-full placeholder:p-2"
                  ref={passwordRef}
                  onChange={handleChange}
                  type="password" value={form.password} name="password" id="" placeholder="Enter Password" />
                <span className="absolute right-0 size-1">Show</span>
              </div>
            </div>
            <button className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full w-fit gap-2 px-2 py-1 font-semibold border ring-red-700 ring-1"
              onClick={savePassword}
            >

              <IoMdAdd />
              Save password
            </button>

          </div>
        </div>
      </div>

      {/* DataDisplay Components conditionally*/}
      {/* {passwordArray.length === 0 && <div>No Data to Show</div>}
      {passwordArray.length != 0 && <DataDisplay passwordArray={passwordArray} />} */}
      <DataDisplay passwordArray={passwordArray} setPasswordArray={setPasswordArray} form={form} setForm = {setForm} />
    </>
  );
}

export default Manager;
