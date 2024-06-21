import React, { useState, useEffect } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
import "./ContactStyle.css"
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OrderPage = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1500
    });
    fetchData();
  }, []);
  const [data, setData] = useState([])
  const [data1, setData1] = useState({
    productId: "", productName: "", quantity: "", userId: "", status: "", name: "", email: "", city: "", mnumber: "", pincode: "", address: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || name.trim() === '' || mnumber.trim() === '' || city.trim() === '' || address.trim() === '' || pincode.trim() === '') {
      alert("Please fill all the required field");
      return;
    }
    const allProductsData = data.map(product => ({
      productId: product?.productId,
      productName: product?.productId?.productName,
      quantity: product?.quantity,
      userId: product.userId,
      status: "Pending",
      name: name,
      email: email,
      city: city,
      mnumber: mnumber,
      pincode: pincode,
      address: address,
    }));


    try {
      let allProductsOrdered = 0; // Initialize the flag
      let count = allProductsData.length
      for (const productData of allProductsData) {
        const id1 = (productData.productId?._id);
        const response1 = await fetch(`${SummaryApi.getOne.url}?productId=${id1}`, {
          method: SummaryApi.getOne.method,
          headers: {
            "content-type": "application/json"
          }
        });
        const dataResponse1 = await response1.json();
        const productData1 = dataResponse1.data;
        const currentQuantity = productData1.currentQuantity;

        if (currentQuantity >= productData.quantity) {
          const dataResponse = await fetch(SummaryApi.order.url, {
            method: SummaryApi.order.method,
            credentials: 'include',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(productData)
          });

          const dataApi = await dataResponse.json();

          if (dataApi.success) {
            console.log("44")
            allProductsOrdered++; // Set the flag to false if any product fails to order
            const response2 = await fetch(SummaryApi.updateCount.url, {
              method: SummaryApi.updateCount.method,
              credentials: 'include',
              headers: {
                "content-type": 'application/json'
              },
              body: JSON.stringify(
                {
                  _id: id1,
                  quantity: currentQuantity - productData.quantity
                }
              )
            })
          }

        }
      }
      console.log(count + " " + allProductsOrdered)

      if (count == allProductsOrdered) {
        toast.success("All products successfully ordered.");
      } else if (count === 1) {
        toast.error("Products could not be ordered.");
        navigate("/");
      } else {
        toast.error("Some products could not be ordered.");
        navigate("/history");
      }

      navigate("/");
      setData([]);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };



  const fetchData = async () => {

    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })


    const responseData = await response.json()
    console.log(responseData)
    if (responseData.success) {
      setData(responseData.data)
    }
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [mnumber, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const handleSubmit1 = (event) => {
    if (email.trim() === '' || name.trim() === '' || mnumber.trim() === '' || city.trim() === '' || address.trim() === '' || pincode.trim() === '') {
      alert("Please fill all the required field");
    }
    alert(`The name you entered was: ${name} ${email}`);
  }
  const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
  const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
  const [total, setTotal] = useState(100);

  return (
    <div>
      <div className="contact">
        <div className="left" data-aos="fade-left">
          <h1>Order INFO</h1>
          {
            data.map((product, index) => {
              return (
                <div key={product?._id + "Add To Cart Loading"} className='mt-5w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                  <div className='w-32 h-32 bg-slate-200'>
                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                  </div>
                  <div className='px-4 py-2 relative'>

                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                    <div className='flex items-center justify-between'>
                      <p className='text-red-600 font-medium text-lg'>{product?.productId?.sellingPrice}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-1'>
                      <span>{product?.quantity}</span>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="right" data-aos="fade-right">
          <h1 className='mx-9'>Payment INFO</h1>
          <div className="bg-white rounded-lg p-6 mx-9 mt-5 shadow-lg">
            <div className='flex items-center justify-between'>
              <p className='text-red-600 font-medium text-lg'>Total Items</p>
              <p className='text-slate-600 font-semibold text-lg'>{totalQty}</p>
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <p className='text-red-600 font-medium text-lg'>Total Amount</p>
              <p className='text-slate-600 font-semibold text-lg'>{totalPrice}</p>
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <p className='text-red-600 font-medium text-lg'>Tax</p>
              <p className='text-slate-600 font-semibold text-lg'>100</p>
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <p className='text-red-600 font-medium text-lg'>Total</p>
              <p className='text-slate-600 font-semibold text-lg'>{total + totalPrice}</p>
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <p className='text-red-600 font-medium text-lg'>Delivered By</p>
              <p className='text-slate-600 font-semibold text-lg'>14-06-2024</p>
            </div>
          </div>

        </div>
      </div>
      <div className="contact">
        <div className="left" data-aos="fade-left">
          <h1>CONTACT INFO</h1>
          <p className="para">
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu
            feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit
            augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet
            doming id quod mazim placerat facer possim assum
          </p><br></br>
          <h3>
            ADDRESS</h3>
          <p>
            795 Fake Ave, Door 6<br />
            Wonderland, CA 94107, USA<br />
            info@yourdomain.com
          </p>
          <h3>
            PHONE
          </h3>
          <p>
            +440 875369208<br />
            +440 353363114
          </p>
        </div>
        <div className="right" data-aos="fade-right">
          <h1 className='mx-9'>Shipping INFO</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
            <input type="email" placeholder="E-mail address" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
            <input type="number" placeholder="Mobile Number" value={mnumber} onChange={(e) => { setNumber(e.target.value) }} required />
            <input type="text" placeholder="Address" value={address} onChange={(e) => { setAddress(e.target.value) }} required />
            <input type="number" placeholder="Pincode" value={pincode} onChange={(e) => { setPincode(e.target.value) }} required />
            <input type="text" placeholder="City" value={city} onChange={(e) => { setCity(e.target.value) }} required />
            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </div>
      <br />
    </div>

  )

}

export default OrderPage

// for (const product of data) {
//   setData1({
//     productId: product?._id,
//     productName: product?.productId?.productName,
//     quantity: product?.quantity,
//     userId: product.userId,
//   });
//   console.log(data1)
// }