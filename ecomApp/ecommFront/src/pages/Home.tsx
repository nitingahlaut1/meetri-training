import { useState, useEffect, ChangeEvent} from "react";
import { TailSpin } from "react-loader-spinner";
import Product from "../components/Product";
// import axios from 'axios';
// import {API_URL} from "../const/Const";
import Pagination from "../components/Pagination";
import API from "../assets/axios";
import { AxiosResponse } from "axios";
import { len } from "../const/Const";
import Navbar from "../components/Navbar"

// const API_URL = "https://fakestoreapi.com/products";

export interface ProductType {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category?:string;
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<ProductType[]>([]);
  const [tempPost, setTempPost] = useState<ProductType[]>([]);  // for filtering data
  const [serchPost, setSearchPost] = useState<ProductType[]>([]); // for searching data
  const [value, setValue] = useState<string>("");  // for Searching
  // const [pagepost, setPagePost] = useState<ProductType[]>([]); //for pagination
  // const [selectvalue, setSelectvalue] = useState<string>("");
  const [length, setLength] = useState(0);
  const [currpage, setCurrpage] = useState(1);
  const [currItem, setCurrItem] = useState<ProductType[]>([]);
  const [crcategory, setCrCategory] = useState<string>("All");
  const [show, setShow] = useState<boolean>(false);
  
  async function fetchProductData() {
    // setSelectvalue("");
    setLoading(true);
    try {
      const res = await API.get("");
      const data = res.data;
      // console.log("api data is:", data);
     
      setLength(data.length);
      setPosts(data);
      setCurrItem(data);
      // setTempPost(data);   // creating temporary post to apply filter
      setSearchPost(data);  //creating for searchbar
      // setPagePost(data); //for pagination
    } catch (error) {
      console.log("Error aagya h");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  // for category data
  useEffect(()=>{
    async function getCatData(){
      const res:AxiosResponse = await API.get("/");
      const data = res.data;
      console.log("All data", data)
      // setSelectvalue(data[0].category);////
    
      setSearchPost(data)
      setPosts(data);
      setCurrItem(data);
      setLength(data.length)
    }
    if(crcategory === "All"){
      // setSelectvalue("");
      getCatData();
    }else{
      categoryData();
    }

  },[crcategory])

  useEffect(()=>{

    const filtered = posts?.filter(product => product?.title.toLowerCase().includes(value.toLowerCase()))
    setSearchPost(filtered);
    console.log(filtered)
    if(len*currpage> filtered.length){
      setCurrpage(1);
    }

  },[value])

  //  function clothData(tempPost:ProductType[]){
  //   setSelectvalue(1);
  //   const men = tempPost.filter((post)=>post.category === "men's clothing");
  //   console.log("cloth:", men.length);
  //   setPosts(men);  
  //  }
  //  function Jwellary(tempPost:ProductType[]){
  //   setSelectvalue(2);
  //   const jwl = tempPost.filter((post)=>post.category === "jewelery");
  //   console.log("jwellery: ",jwl.length);
  //   setPosts(jwl);  
  //  }
  //  function ElecData(tempPost:ProductType[]){
  //   setSelectvalue(3);
  //   const ele = tempPost.filter((post)=>post.category === "electronics");
  //   console.log("electronics: ", ele.length);
  //   setPosts(ele.slice(0,4));  
  //  }
  //  function allData(posts:ProductType[]){
  //   return setPosts(posts);
  //  }


async function categoryData(){

  try {
    const res: AxiosResponse = await API.get(`/category?category=${crcategory}`, {
      withCredentials: true,
    });
    const data:ProductType[]= res.data;
    setLength(data.length);
    // setTempPost(data)
    // setSelectvalue(data[0].category ?? "");
    setPosts(data);
    setCurrItem(data)
    setSearchPost(data)
   
  } catch (error) {
    console.log("Error aagya h");
  }

}

  const onChange = (event: ChangeEvent<HTMLInputElement>)=> {
    setValue(event.target.value);
    const data = serchPost?.filter((post)=>post?.title?.toLowerCase().includes(event.target.value.toLowerCase()));
    setPosts(data.slice(0,5));
  }
  
  const onSearch = (searchTerm: string)=> {
    console.log("seacrh term",searchTerm )
    setValue(searchTerm);
    const data = serchPost.filter((post)=>post.title.toLowerCase().includes(value.toLowerCase()));
    setPosts(data.slice(0,4));
    
  }

  const itemsToDisplay = serchPost ? serchPost.slice((currpage - 1)*len, len*currpage) : currItem.slice((currpage - 1)*len, len*currpage);
  console.log("Hello", itemsToDisplay)
  return (
    
    <div>

      <div className="bg-slate-900">
        <Navbar />
      </div>

      <div>
      <button onClick = {()=>setCrCategory("")} className={`bg-blue-700 rounded-lg text-white   mt-5 border-2 ${crcategory===""? "bg-yellow-700":""}  font-bold p-3 hover:bg-yellow-700`}>All</button>
      <button onClick = {()=>setCrCategory("men's clothing")} className={`bg-blue-700 rounded-lg text-white   mt-5 border-2 ${crcategory==="men's clothing"? "bg-yellow-700":""}  font-bold p-3 hover:bg-yellow-700`}>Men's Cloth</button>
      <button onClick={()=>setCrCategory("jewelery")} className={`bg-blue-700 rounded-lg text-white   mt-5 border-2 ${crcategory==="jewelery"? "bg-yellow-700":""}  font-bold p-3 hover:bg-yellow-700`}>Jwellery</button>
      <button onClick={()=>setCrCategory("electronics")} className={`bg-blue-700 rounded-lg text-white   mt-5 border-2 ${crcategory==="electronics"? "bg-yellow-700":""}  font-bold p-3 hover:bg-yellow-700`}>Electronics</button>
      <button onClick={()=>setCrCategory("women's clothing")} className={`bg-blue-700 rounded-lg text-white   mt-5 border-2 ${crcategory==="women's clothing"? "bg-yellow-700":""}  font-bold p-3 hover:bg-yellow-700`}>Women's clothing</button>
      </div>


       <div className="bg-yellow-700 rounded-lg text-black mt-5 border-2  font-bold p-3 ">
            <input  className={`rounded-lg p-1 mr-2`}  type="text" value={value.slice(0,10)} onChange={(e) => setValue(e.target.value) } placeholder="Search Product" />
            <button onClick={()=>onSearch(value)} className="bg-blue-700 rounded-lg text-white p-1">Search</button>
       </div>
       
       <div>
        {
          itemsToDisplay
          .map((item)=>
          <div onClick={()=>onSearch(item.title)} className={`cursor-pointer ${(value) ? "block" : "hidden"} hover:bg-gray-200`}>
            {item.title}
          </div>
          )
        }
       </div>



      {loading ? (
        <TailSpin color="red" radius={"8px"} />
      ) : posts.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {itemsToDisplay.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )}
      
      <div>
        <Pagination length = {value ? serchPost.length : length}  setPosts={setPosts} currpage={currpage} setCurrpage={setCurrpage}/>
      </div>
    </div>
  );
};

export default Home;
