import { Link } from "react-router-dom";
import * as z from "zod";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";

const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters").max(50, "Password must be less than 50 characters"),
    repeatPassword: z.string().min(5, "Password must be at least 5 characters").max(50, "Password must be less than 50 characters")
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function Register() {
  const { register, handleSubmit, formState, getValues } = useForm<RegisterFormData>({
      defaultValues:{
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
      },
      resolver: zodResolver(RegisterSchema)
  });
  const onSubmit = (data: RegisterFormData) => {
      console.log(data);
  }

  useEffect(() => {
    console.log(formState.errors);
  }, [formState.errors]);

  console.log(getValues("name"));
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-lg font-bold leading-6 tracking-tight text-white">
            Register for an account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            <Input 
              label="Name"
              error={formState.errors.name?.message}
              {...register("name")} 


            />

            <Input 
              {...register("email")}

              label="Email address" 
              error={formState.errors.email?.message}
            />
            <Input 
              {...register("password")}
              label="Password" 
              type='password'
              error={formState.errors.password?.message}
            />

            <Input 
              {...register('repeatPassword')}

              label="Repeat Password"
              type="password" 
              error={formState.errors.repeatPassword?.message}
            
            />

            <div>
              <button
                type="submit"
                className="flex mt-5 w-full justify-center rounded-md bg-indigo-600 px-2 py-1  text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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