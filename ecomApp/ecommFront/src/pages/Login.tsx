import axios, { AxiosResponse } from "axios";
import { error } from "console";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface loginFormState {
  email: string;
  password: string;
}

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormState>({
    mode: "onChange",
  });
  
  const onSubmit: SubmitHandler<loginFormState> = async (data) => {
    try {
      const res: AxiosResponse = await axios.post(
        "http://localhost:8000/auth/signin",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.access_token) {
        console.log("Respone Token: ", res.data.access_token);
        navigate("/home");
      }
    } catch (error) {
      console.log("in catch block")
      console.log(error);
      setErr(true);
    }
  };
  // const [formData, setFormData] = useState<loginFormState>({
  //     email: '',
  //     password:'',
  // })
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const {name, value} = e.target;
  //     setFormData(prevData => ({...prevData, [name]: value}))

  //   }

  // const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3000/auth/signin', formData);
  //     console.log(response);
  //   }catch (error) {
  //     console.error(error);
  //   }
  // }
  return (
    // <div className='py-8'>
    //   <form onSubmit={handleSubmit} className='flex flex-col max-w-lg mx-auto space-y-6'>
    //     <div>
    //         <label htmlFor='email'>Email Id: </label>
    //         <br/>
    //         <input className='border border-red-950 w-full' type='email' name='email' id='email' value={formData.email} required onChange={handleChange}/>
    //         <br/>
    //     </div>

    //     <div>
    //         <label htmlFor='password'>Password: </label>
    //         <br/>
    //         <input className='border border-red-950 w-full' type='password' name='password' id='pass' value={formData.password} onChange={handleChange} required/>
    //         <br/>
    //     </div>

    //     <button className='text-sm font-semibold px-4 py-2 rounded-md bg-zinc-900 text-white'>Log In</button>
    //   </form>
    // </div>
    <div className="py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-lg mx-auto space-y-6"
      >
        <label>Email: </label>

        {/* <input type="email" placeholder=" abc@gmail.com"
          {...register("email", {
            required: true,
          })}
          className="border border-red-950 w-full"
        /> */}

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

{errors.email && <span className='text-red-500'>*Required (eg: example@example.com)</span>}

        <label>Password: </label>

        <input
        type="password" placeholder=" Enter password"
          {...register("password", {
            required: "*this field is required", 
          })}
          className="border border-red-950 w-full"
        />
        {errors.password && <span className='text-red-500'>*This field is required</span>}

        <br />
        <button
          type="submit"
          className="text-sm font-semibold px-4 py-2 rounded-md bg-zinc-900 text-white"
        >
          Log IN
        </button>
      </form>
      <div>{err && <p className="text-red-600 py-2 px-4">Email or password is incorrect</p>}</div>
      <div className="ml-[80px] mt-[20px]">
        <Link to="/signup" className="text-blue-700 ">Click here to register</Link>
      </div>
    </div>
  );
};

export default Login;
