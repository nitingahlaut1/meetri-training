// import axios from 'axios';
// import React, { useState } from 'react'

// const Signup = () => {

//     interface SignUpFormState{
//         firstname: string;
//         lastname: string;
//         email: string;
//         password: string;
//         type?: string;
//     }

//     const [formData, setFormData] = useState<SignUpFormState>({
//         firstname:'',
//         lastname:'',
//         email: '',
//         password:'',
//         type:'',
//     })
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const {name, value} = e.target;
//         setFormData(prevData => ({...prevData, [name]: value}))
//       }

//       const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//           const response = await axios.post('http://localhost:3000/auth/signup', formData);
//           console.log(response);
//         }catch (error) {
//           console.error(error);
//         }
//       }
//   return (
//     <div className='py-8'>
//       <form onSubmit={handleSubmit} className='flex flex-col max-w-lg mx-auto space-y-6' >
//         <div >
//             <label htmlFor="firstname">First Name: </label>
//             <br/>
//             <input className='border border-red-950 w-full' type='text' name='firstname' id='fname' onChange={handleChange} value={formData.firstname} required maxLength={20} />
//             <br/>
//         </div>

//         <div>
//             <label htmlFor="lastname">Last Name: </label>
//             <br/>
//             <input className='border border-red-950 w-full' type='text' name='lastname' id='lname' onChange={handleChange} value={formData.lastname} required maxLength={20}/>
//             <br/>
//         </div>

//         <div>
//             <label htmlFor='email'>Email: </label>
//             <br/>
//             <input className='border border-red-950 w-full' type='email' name='email' id='email' onChange={handleChange} value={formData.email} required maxLength={40}/>
//             <br/>
//         </div>

//         <div>
//             <label htmlFor='password'>Password: </label>
//             <br/>
//             <input className='border border-red-950 w-full' type='password' name='password' id='pass' onChange={handleChange} value={formData.password} required maxLength={15}/>
//         </div>

//         <div>
//             <label htmlFor='usertype'>User Type: </label>
//             <br/>
//             <input className='border border-red-950 w-full' type='text' name='usertype' id='usertype' onChange={handleChange} value={formData.type} />
//             <br/>
//         </div>

//         <button className='text-sm font-semibold px-4 py-2 rounded-md bg-zinc-900 text-white'>Sign Up</button>
//       </form>
//     </div>
//   )
// }

// export default Signup
import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface signUpFormState {
  firstname: string;
  lastname?: string;
  email: string;
  password: string
}

const Signup = () => {
  const{ register, handleSubmit, formState: {errors}} = useForm<signUpFormState>({
    mode: "onChange",
  });
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<signUpFormState>= async (data)=>{
    // console.log(data);
    
    try {
      const response: AxiosResponse = await axios.post("http://localhost:8000/auth/signup", data,{
        withCredentials: true,
      });
    console.log(response)
    if (response.data.access_token) {
      console.log("Respone Token: ", response.data.access_token);
      navigate("/signin");
    }
    } catch (error:any) {
      console.log("error in sign up",error);
      setErr(true);
    }
  };
  return (
    <div className='py-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-lg mx-auto space-y-6'>
        <label>First Name:</label>
        
        <input placeholder=' Enter your first name...' {...register("firstname",{
          required: true,
        })} className='border border-red-950 w-full'/>
        {errors.firstname && <span className='text-red-500'>*This field is required</span>}
       
        <label>Last Name:</label>
                
        <input placeholder=' Enter your last name'{...register("lastname")} className='border border-red-950 w-full'/>
        
        <label>Email: </label>
     
      {/* <input placeholder=' Enter your email'{...register("email",{
        required: true,
      })} className='border border-red-950 w-full'/>
      {errors.email && <span className='text-red-500'>*This field is required</span>} */}


<input 
  type="email" 
  placeholder="Enter your email" 
  {...register("email", {
    required: "*This field is required", 
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
      message: "Please enter a valid email (e.g. example@example.com)"
    }
  })} 
  className="border border-red-950 w-full" 
/>

{errors.email && <span className="text-red-500">{errors.email.message}</span>}



     
      <label>Password: </label>
      
      {/* <input type="password" placeholder=' Enter your password'{...register("password",{
        required: true
      })} className='border border-red-950 w-full'/>
      {errors.password && <span className='text-red-500'>*This field is required</span>} */}
      
      <input 
  type="password" 
  placeholder="Enter your password" 
  {...register("password", {
    required: "*This field is required",
    minLength: {
      value: 3,
      message: "Password must be at least 3 characters long"
    },
    maxLength: {
      value: 8,
      message: "Password cannot exceed 8 characters"
    },
    pattern: {
      value: /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{3,8}$/, 
      message: "Password must contain at least one special character and one number"
    }
  })} 
  className="border border-red-950 w-full" 
/>

{errors.password && <span className="text-red-500">{errors.password.message}</span>}


      <br />
      <button type="submit" className='text-sm font-semibold px-4 py-2 rounded-md bg-zinc-900 text-white'>Sign Up</button>
      </form>

      <div>{err && <p className="text-red-600 py-2 px-4">Enter correct details</p>}</div>

      <div className='ml-[20px] mt-[10px]'>
      <Link to="/signin" className='text-blue-700'>Already registered</Link>
    </div>


    </div>
  )
}

export default Signup
