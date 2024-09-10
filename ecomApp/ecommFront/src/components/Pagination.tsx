import React, { FC, useState } from 'react'
import { ProductType } from '../pages/Home'
import {len} from "../const/Const"
// import axios from 'axios';
import API from '../assets/axios';

interface page {
  length: number,
  // tempost: ProductType[],
  setPosts: (val: ProductType[]) => void,
  currpage: number,
  setCurrpage:(val: number)=>void
}

const Pagination: React.FC<page> = ({length, setPosts, currpage, setCurrpage}) => {

    const [select, setSelect] = useState(1);

    let pageCount: number;
    if(length%len) {
      pageCount = Math.floor(length/len) + 1;
    }else {
      pageCount = length/len;
    }
    let arr = [];
    for(let i=1;i<=pageCount;i++){
        arr.push(i);
    }

    async function Firstpage(pageno:number){
        setSelect(pageno);
        setCurrpage(pageno);
        const res = await API.get(`?limit=${pageno*len}`);
        const data = res.data;
        const fp = data.slice((pageno - 1) * pageCount,pageCount * pageno);
        // const tp = tempPost.slice((idx-1)*tempPost.length,len*idx);
        setPosts(fp);
    }
    
  return (
    <div>
      <div className='flex items-center justify-end mr-4 mb-1'>

        {
            arr.map((pageno)=> {
                return <button onClick={()=>Firstpage(pageno)} className={`bg-blue-700 rounded-lg ${select === pageno ? "bg-yellow-700":"" } text-white mr-2 w-8 p-1`}>{pageno}</button>
            })
        }
        
      </div>
    </div>
  )
}

export default Pagination
