// // import React from 'react';
// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.tsx</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState } from "react";
// import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

// interface FormValues {
//   sections: {
//     value: string;
//   }[];
// }

// const App = () => {
//   const { register, handleSubmit, control } = useForm<FormValues>({
//     defaultValues: {
//       sections: [{ value: "" }],
//     },
//   });

 
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "sections",
//   });

 
//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log("Submitted Data:", data);
//   };

//   return (
//     <div className="App">
//       <h2>Dynamic Form with React Hook Form</h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((field, index) => (
//           <div key={field.id}>
//             <label>Section {index + 1}</label>
//             <input
//               {...register(`sections.${index}.value` as const, { required: true })}
//               placeholder="Enter value"
//             />
          
//             <button type="button" onClick={() => remove(index)}>
//               Remove Section
//             </button>
//           </div>
//         ))}

       
//         <button type="button" onClick={() => append({ value: "" })}>
//           Add Section
//         </button>

//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  firstname: string;
  lastname: string;
  age: number;
  address: string;
  gender: string;
}

const App = () => {
  const [submittedForms, setSubmittedForms] = useState<FormData[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();

  
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSubmittedForms((prevForms) => [...prevForms, data]);
    console.log(data);
    reset(); 
  };

  return (
    <div className="App ">
      
     
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label>First Name:</label>
          <input
            {...register("firstname", { required: true })}
            placeholder="Enter First Name"
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            {...register("lastname",{ required: true})}
            placeholder="Enter Last Name"
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            {...register("age", { required: true })}
            type="number"
            placeholder="Enter Age"
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            {...register("address", { required: true })}
            placeholder="Enter Address"
          />
        </div>

        <div>
          <label>Gender:</label>
          <select {...register("gender", { required: true })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <br />
        <button type="submit">Submit</button>
      </form>

    
      <div>
        {submittedForms.length > 0 && <h3>Submitted Data:</h3>}
        {submittedForms.map((form, index) => (
          <div key={index}>
            <p>
              <strong>Form {index + 1}:</strong>
            </p>
            <p>First Name: {form.firstname}</p>
            <p>Last Name: {form.lastname}</p>
            <p>Age: {form.age}</p>
            <p>Address: {form.address}</p>
            <p>Gender: {form.gender}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
