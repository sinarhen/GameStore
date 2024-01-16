import { Link } from "react-router-dom";
import React from "react";

import { z } from "zod";

import Input from "../components/Input";

const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters").max(50, "Password must be less than 50 characters"),
    repeatPassword: z.string().min(5, "Password must be at least 5 characters").max(50, "Password must be less than 50 characters")
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
});

export default function Register() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [validationError, setValidationError] = React.useState(null);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    try {
      RegisterSchema.parse(formData);

      console.log("Form submitted:", formData);
      setValidationError(null);
    } catch (error: any) {
      setValidationError(error.errors);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-lg font-bold leading-6 tracking-tight text-white">
            Register for an account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-4" action="#" method="POST" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

            <Input label="Name" name="name" type="text" id="name" autoComplete="name" value={formData.name} onChange={handleInputChange} />
            <Input label="Email address" name="email" type="email" id="email" autoComplete="email" value={formData.email} onChange={handleInputChange} />
            <Input label="Password" name="password" type="password" id="password" autoComplete="new-password" value={formData.password} onChange={handleInputChange} />
            <Input label="Repeat Password" name="repeatPassword" type="password" id="repeatPassword" autoComplete="new-password" value={formData.repeatPassword} onChange={handleInputChange} />            

            {validationError && (
              <div className="text-red-500">{validationError}</div>
            )}

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex mt-5 w-full justify-center rounded-md bg-indigo-600 px-2 py-1 px-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-white"> 
            Already have an account? 
            <Link to="/login" className="font-semibold leading-5 text-indigo-400 hover:text-indigo-300"> 
                Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
