import React from 'react'
import { FaCopy } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";


function DataDisplay({ passwordArray, setPasswordArray,form, setForm }) {

  const copyPassword = (password) => {
    // This function displays toast 
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // This is how we copy something from clipboard when we click there
    navigator.clipboard.writeText(password)
  }

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE", headers: { "content-Type": "application/json" },
        body: JSON.stringify({id})
      })
    }
    toast('Password Deleted Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("deleting passwrod with id", id);
  }

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setForm({...passwordArray.filter(item => item.id == id)[0], id:id})
    setPasswordArray(passwordArray.filter(item => item.id !== id))

  }

  return (
    <>
      {/* Toast from react-toast library  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className='p-2 md:px-0 md:mycontainer bg-gray-50'>
        <h2 className='font-bold text-2xl py-4'> Your Passwords</h2>

        <table className="table-auto w-full rounded-md overflow-hidden">
          <thead className='bg-green-800 text-white'>
            <tr>
              <th className='py-2'>WebSite</th>
              <th className='py-2'>Username</th>
              <th className='py-2'>Password</th>
              <th className='py-2'>Copy Password</th>
              <th className='py-2'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-green-100'>
            {passwordArray.map((item, index) => {
              return (
                <tr key={index}>
                  <td className='text-center py-2 w-12 border border-white '><a href={item.site} target='_blank'>{item.site}</a></td>

                  <td className='text-center py-2 w-12 border border-white '>{item.username}</td>
                  <td className='text-center py-2 w-12 border border-white '>{item.password}</td>
                  <td className='text-center py-2 w-4 border border-white flex-1'>
                    <button onClick={() => { copyPassword(item.password) }}>
                      <FaCopy className='' />
                    </button>
                  </td>
                  <td className='text-center py-2 w-4 border border-white flex-1'>
                    <button className='mr-9' onClick={() => { editPassword(item.id) }}>
                      <CiEdit />
                    </button>
                    <button onClick={() => { deletePassword(item.id) }}>
                      <MdDeleteForever />
                    </button>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default DataDisplay
