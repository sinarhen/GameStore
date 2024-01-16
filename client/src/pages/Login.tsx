import { Link } from "react-router-dom";

import Input from "../components/Input";

export default function Login() {
    return (
        <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6"> 
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-lg font-bold leading-6 tracking-tight text-white"> 
            Sign in to your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" action="#" method="POST"> 
            
            <Input label="Email Address" name="email" type="email" id="email" autoComplete="email" />
            <Input label="Password" name="password" type="password" id="password" autoComplete="current-password" />

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