import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from 'zod';
import Input from "../components/Input";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters").max(50, "Password must be less than 50 characters"),
})

type LoginFormData = z.infer<typeof LoginSchema>;
export default function Login() {
  const { register, handleSubmit, formState, getValues } = useForm<LoginFormData>({
    defaultValues:{
      email: "",
      password: ""
    },
    resolver: zodResolver(LoginSchema)
});

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
    }
  return (
        <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6"> 
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-lg font-bold leading-6 tracking-tight text-white"> 
            Sign in to your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}> 
            
            
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-white"> 
            Don't have an account? 
            <Link to="/register" className="font-semibold leading-5 text-indigo-400 hover:text-indigo-300"> 
                Registration
            </Link>
          </p>
        </div>
      </div>
    </>
    );
}