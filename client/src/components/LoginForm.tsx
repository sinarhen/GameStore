import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import Input from "./Input";
import axios from "axios";
import toast from "react-hot-toast";
import {setCookie} from "../lib/auth";
import InputError from "./InputError";
import {Label} from "./Label";


const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters").max(50, "Password must be less than 50 characters"),
})

type LoginFormData = z.infer<typeof LoginSchema>;
export default function LoginForm({
                                    setVariant,
                                    setDialogOpen
                                  }: {
  setVariant: (variant: 'login' | 'register') => void;
  setDialogOpen: (open: boolean) => void;
}) {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('/auth/login', data);
      setCookie(response.data.token);
      setDialogOpen(false)
      window.location.reload();
      toast.success("Успішний вхід")


    } catch (error: any) {
      if (error.response.data.field) {
        form.setError(error.response.data.field, {
          type: "manual",
          message: error.response.data.message
        })
      } else {
        toast.error(error?.message)
      }
    }
  };


  function renderError(fieldName: keyof typeof form.formState.errors) {
    return form.formState.errors[fieldName]?.message &&
        <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-lg font-bold leading-6 tracking-tight text-white">
            Вхід
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>


            <div>
              <Label>Email</Label>
              <Input
                {...form.register("email")}
              />
              {renderError('email')}


            </div>
            <Label>Password</Label>
            <Input
              {...form.register("password")}
              type='password'
            />
            {renderError('password')}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-white">
            Не маєте облікового запису?
            <button onClick={() => setVariant('register')}
                    className="font-semibold leading-5 text-indigo-400 hover:text-indigo-300">
              Зареєструватися
            </button>
          </p>
        </div>
      </div>
    </>
  );
}