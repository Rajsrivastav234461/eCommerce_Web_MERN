import React, { useState } from "react";
// import loginIcons from "../assets/signin.gif";
import loginIcons from "../assest/authicons1.gif";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section
      id="signup"
      className="min-h-[calc(100vh-65px)] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 flex items-center justify-center"
    >
      <div className="mx-auto container p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto animate-fadeIn">
          <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-cyan-500 mb-4">
            <img
              src={data.profilePic || loginIcons}
              alt="Profile"
              className="object-none w-full h-full"
            />
            <label className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs">
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
              Upload Photo
            </label>
          </div>
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Password:
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 w-full"
                />
                <div
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="grid">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password:
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 w-full"
                />
                <div
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-full mt-6 transition-transform transform hover:scale-105">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

// import React, { useState } from 'react'
// import loginIcons from '../assest/signin.gif'
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import imageTobase64 from '../helpers/imageTobase64';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';

// const SignUp = () => {
//   const [showPassword,setShowPassword] = useState(false)
//   const [showConfirmPassword,setShowConfirmPassword] = useState(false)
//   const [data,setData] = useState({
//       email : "",
//       password : "",
//       name : "",
//       confirmPassword : "",
//       profilePic : "",
//   })
//   const navigate = useNavigate()

//   const handleOnChange = (e) =>{
//       const { name , value } = e.target

//       setData((preve)=>{
//           return{
//               ...preve,
//               [name] : value
//           }
//       })
//   }

//   const handleUploadPic = async(e) =>{
//     const file = e.target.files[0]
    
//     const imagePic = await imageTobase64(file)
    
//     setData((preve)=>{
//       return{
//         ...preve,
//         profilePic : imagePic
//       }
//     })

//   }


//   const handleSubmit = async(e) =>{
//       e.preventDefault()

//       if(data.password === data.confirmPassword){

//         const dataResponse = await fetch(SummaryApi.signUP.url,{
//             method : SummaryApi.signUP.method,
//             headers : {
//                 "content-type" : "application/json"
//             },
//             body : JSON.stringify(data)
//           })
    
//           const dataApi = await dataResponse.json()

//           if(dataApi.success){
//             toast.success(dataApi.message)
//             navigate("/login")
//           }

//           if(dataApi.error){
//             toast.error(dataApi.message)
//           }
    
//       }else{
//         toast.error("Please check password and confirm password")
//       }

//   }

//   return (
//     <section id='signup'>
//         <div className='mx-auto container p-4'>

//             <div className='bg-white p-5 w-full max-w-sm mx-auto'>

//                     <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
//                         <div>
//                             <img src={data.profilePic || loginIcons} alt='login icons'/>
//                         </div>
//                         <form>
//                           <label>
//                             <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
//                               Upload  Photo
//                             </div>
//                             <input type='file' className='hidden' onChange={handleUploadPic}/>
//                           </label>
//                         </form>
//                     </div>

//                     <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
//                       <div className='grid'>
//                               <label>Name : </label>
//                               <div className='bg-slate-100 p-2'>
//                                   <input 
//                                       type='text' 
//                                       placeholder='enter your name' 
//                                       name='name'
//                                       value={data.name}
//                                       onChange={handleOnChange}
//                                       required
//                                       className='w-full h-full outline-none bg-transparent'/>
//                               </div>
//                           </div>
//                         <div className='grid'>
//                             <label>Email : </label>
//                             <div className='bg-slate-100 p-2'>
//                                 <input 
//                                     type='email' 
//                                     placeholder='enter email' 
//                                     name='email'
//                                     value={data.email}
//                                     onChange={handleOnChange}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent'/>
//                             </div>
//                         </div>

//                         <div>
//                             <label>Password : </label>
//                             <div className='bg-slate-100 p-2 flex'>
//                                 <input 
//                                     type={showPassword ? "text" : "password"} 
//                                     placeholder='enter password'
//                                     value={data.password}
//                                     name='password' 
//                                     onChange={handleOnChange}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent'/>
//                                 <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
//                                     <span>
//                                         {
//                                             showPassword ? (
//                                                 <FaEyeSlash/>
//                                             )
//                                             :
//                                             (
//                                                 <FaEye/>
//                                             )
//                                         }
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <label>Confirm Password : </label>
//                             <div className='bg-slate-100 p-2 flex'>
//                                 <input 
//                                     type={showConfirmPassword ? "text" : "password"} 
//                                     placeholder='enter confirm password'
//                                     value={data.confirmPassword}
//                                     name='confirmPassword' 
//                                     onChange={handleOnChange}
//                                     required
//                                     className='w-full h-full outline-none bg-transparent'/>

//                                 <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
//                                     <span>
//                                         {
//                                             showConfirmPassword ? (
//                                                 <FaEyeSlash/>
//                                             )
//                                             :
//                                             (
//                                                 <FaEye/>
//                                             )
//                                         }
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

//                     </form>

//                     <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
//             </div>


//         </div>
//     </section>
//   )
// }

// export default SignUp