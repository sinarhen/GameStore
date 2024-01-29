import * as z from "zod";
import Input from "../components/Input";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import axios from "axios";
import toast from "react-hot-toast";
import {setCookie} from "../lib/auth";
import InputError from "./InputError";
import {Label} from "./Label";

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

export default function RegisterForm({
                                       setVariant,
                                       setDialogOpen
                                     }: {
  setVariant: (variant: 'login' | 'register') => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: ""
    },
    resolver: zodResolver(RegisterSchema)
  });

  function renderError(fieldName: keyof typeof form.formState.errors) {
    return form.formState.errors[fieldName]?.message &&
        <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
  }


  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post('/auth/register', data);
      const token = response.data.token;
      setCookie(token)
      window.location.reload();
      toast.success("Успішна реєстрація")

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


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-lg font-bold leading-6 tracking-tight text-white">
            Реєстрація
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <Label>Name</Label>
              <Input
                {...form.register("name")}
              />
              {renderError('name')}
            </div>
            <div>
              <Label>Email</Label>
              <Input
                {...form.register("email")}
              />
              {renderError('email')}

            </div>
            <div>
              <Label>Password</Label>
              <Input
                {...form.register("password")}
                type='password'
              />
              {renderError('password')}
            </div>
            <div>
              <Label>Repeat Password</Label>
              <Input
                {...form.register("repeatPassword")}
                type='password'
              />
              {renderError('repeatPassword')}
            </div>

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
            Вже зареєстровані?
            <button onClick={() => setVariant("login")}
                    className="font-semibold leading-5 text-indigo-400 hover:text-indigo-300">
              Увійти
            </button>
          </p>
        </div>
      </div>
    </>
  );
}