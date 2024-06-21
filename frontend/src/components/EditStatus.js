import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/updateCategory';
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const EditStatus = ({ productData, onClose }) => {
    console.log("prou", productData)

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        quantity: productData?.quantity,
        userId: productData?.userId,
        status: productData?.status,
        name: productData?.name,
        email: productData?.email,
        city: productData?.city,
        mnumber: productData?.mnumber,
        pincode: productData?.pincode,
        address: productData?.address,
    })


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
        console.log("final", data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.updateStatus.url, {
            method: SummaryApi.updateStatus.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log(responseData)
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
        }


        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-35'>
            <div className='bg-white p-4 rounded w-[500px] max-h-[80%] overflow-auto'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Status</h2>
                    <div className='w-fit text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid gap-2' onSubmit={handleSubmit}>
                    <label htmlFor='status' className='mt-3'>Category:</label>
                    <select required value={data.status} name='status' onChange={handleOnChange} className='p-1 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>{el.label}</option>
                            ))
                        }
                    </select>

                    <button type='submit' className='mt-3 bg-cyan-600 text-white hover:bg-cyan-700 mb-4 px-4 rounded'>Update Product</button>
                </form>
            </div>
        </div>
    )
}

export default EditStatus
