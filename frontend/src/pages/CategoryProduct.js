// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import productCategory from "../helpers/productCategory";
// import VerticalCard from "../components/VerticalCard";
// import SummaryApi from "../common";
// import { FaBars, FaTimes } from "react-icons/fa";

// const CategoryProduct = () => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar toggle
//   const location = useLocation();
//   const urlSearch = new URLSearchParams(location.search);
//   const urlCategoryListinArray = urlSearch.getAll("category");

//   const urlCategoryListObject = {};
//   urlCategoryListinArray.forEach((el) => {
//     urlCategoryListObject[el] = true;
//   });

//   const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
//   const [filterCategoryList, setFilterCategoryList] = useState([]);
//   const [sortBy, setSortBy] = useState("");

//   const fetchData = async () => {
//     setLoading(true);
//     const response = await fetch(SummaryApi.filterProduct.url, {
//       method: SummaryApi.filterProduct.method,
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         category: filterCategoryList,
//       }),
//     });

//     const dataResponse = await response.json();
//     setData(dataResponse?.data || []);
//     setLoading(false);
//   };

//   const handleSelectCategory = (e) => {
//     const { name, value, checked } = e.target;

//     setSelectCategory((prev) => ({
//       ...prev,
//       [value]: checked,
//     }));
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filterCategoryList]);

//   useEffect(() => {
//     const arrayOfCategory = Object.keys(selectCategory)
//       .map((categoryKeyName) => {
//         if (selectCategory[categoryKeyName]) {
//           return categoryKeyName;
//         }
//         return null;
//       })
//       .filter((el) => el);

//     setFilterCategoryList(arrayOfCategory);

//     // Format for URL change when change on the checkbox
//     const urlFormat = arrayOfCategory.map((el, index) => {
//       if (arrayOfCategory.length - 1 === index) {
//         return `category=${el}`;
//       }
//       return `category=${el}&&`;
//     });

//     navigate("/product-category?" + urlFormat.join(""));
//   }, [selectCategory]);

//   const handleOnChangeSortBy = (e) => {
//     const { value } = e.target;

//     setSortBy(value);

//     if (value === "asc") {
//       setData((prev) =>
//         [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice)
//       );
//     }

//     if (value === "dsc") {
//       setData((prev) =>
//         [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice)
//       );
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="mx-auto py-4">
//       <div className="lg:hidden flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Categories</h2>
//         <button onClick={toggleSidebar} className="text-2xl">
//           <FaBars />
//         </button>
//       </div>

//       <div className="lg:flex">
//         {/* Sidebar Section */}
//         <div className="w-72">
//           {/* Sidebar Overlay for Small Screens */}
//           <div
//             className={`fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-opacity ${
//               isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//             }`}
//             onClick={toggleSidebar}
//           ></div>

//           {/* Sidebar Content */}
//           <div
//             className={`fixed top-4 left-0 h-full  p-4 w-72 z-20 transform bg-white transition-transform ${
//               isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//             } lg:transform-none lg:relative lg:block lg:translate-x-0`}
//           >
//             <div className="flex justify-between items-center mb-4 lg:hidden">
//               <h2 className="text-xl font-bold">Categories</h2>
//               <button onClick={toggleSidebar} className="text-2xl">
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Sort by */}
//             <div className="mb-4">
//               <h3 className="text-base uppercase font-medium text-gray-500 border-b pb-1 border-gray-300">
//                 Sort by
//               </h3>
//               <form className="text-sm flex flex-col gap-2 mt-2">
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="radio"
//                     name="sortBy"
//                     id="sortByAsc"
//                     value="asc"
//                     checked={sortBy === "asc"}
//                     onChange={handleOnChangeSortBy}
//                     className="form-radio text-blue-500"
//                   />
//                   <label htmlFor="sortByAsc">Price - Low to High</label>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="radio"
//                     name="sortBy"
//                     id="sortByDsc"
//                     value="dsc"
//                     checked={sortBy === "dsc"}
//                     onChange={handleOnChangeSortBy}
//                     className="form-radio text-blue-500"
//                   />
//                   <label htmlFor="sortByDsc">Price - High to Low</label>
//                 </div>
//               </form>
//             </div>

//             {/* Filter by */}
//             <div>
//               <h3 className="text-base uppercase font-medium text-gray-500 border-b pb-1 border-gray-300">
//                 Category
//               </h3>
//               <form className="text-sm flex flex-col gap-2 mt-2">
//                 {productCategory.map((categoryName, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       name="category"
//                       id={categoryName?.value}
//                       value={categoryName?.value}
//                       checked={selectCategory[categoryName?.value]}
//                       onChange={handleSelectCategory}
//                       className="form-checkbox text-blue-500"
//                     />
//                     <label htmlFor={categoryName?.value}>
//                       {categoryName?.label}
//                     </label>
//                   </div>
//                 ))}
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Product Display Section */}
//         <div className="lg:ml-4 flex-1">
//           <div className="px-4">
//             <p className="font-medium text-gray-800 text-lg my-2">
//               Search Results: {data.length}
//             </p>

//             <div className="min-h-[calc(100vh-120px)] overflow-y-auto">
//               {data.length !== 0 && !loading && (
//                 <VerticalCard data={data} loading={loading} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryProduct;

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])


    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])
    
  return (
    <div className='container mx-auto p-4'>

       {/***desktop version */}
       <div className='hidden lg:grid grid-cols-[200px,1fr]'>
           {/***left side */}
           <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                {/**sort by */}
                <div className=''>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                    <form className='text-sm flex flex-col gap-2 py-2'>
                        <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                          <label>Price - Low to High</label>
                        </div>

                        <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                          <label>Price - High to Low</label>
                        </div>
                    </form>
                </div>


                {/**filter by */}
                <div className=''>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                    <form className='text-sm flex flex-col gap-2 py-2'>
                        {
                          productCategory.map((categoryName,index)=>{
                            return(
                              <div className='flex items-center gap-3'>
                                 <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                 <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                              </div>
                            )
                          })
                        }
                    </form>
                </div>


           </div>


            {/***right side ( product ) */}
            <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              }
             </div>
            </div>
       </div>
       
    </div>
  )
}

export default CategoryProduct