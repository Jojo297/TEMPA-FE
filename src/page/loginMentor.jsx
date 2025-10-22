import React, { useState } from "react";
import logo2 from "@/assets/logo-text.png";
import { useNavigate } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginMentor() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const DARK_GREEN = "bg-[#10403D]";
  const LIGHT_BLUE = "text-[#5BC0EB]";
  const PROGRESS_BLUE = "bg-[#5BC0EB]";

  // validating form using zod
  const validateLoginMentor = z.object({
    username: z.string().min(2, "Masukkan Username!"),
    password: z.string().min(2, "Masukkan Password!"),
  });

  // handle form state and validation for mentor login
  const formLoginMentor = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(validateLoginMentor),
  });

  // handle submit login
  const onSubmitLoginMentor = async (data) => {
    // console.table(data);
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/mentor-login`, {
        username: data.username,
        password: data.password,
      });
      if (response.status == 200) {
        // const token = response.data.data.token;
        const token = response.data.data;
        // localStorage.setItem("token", token);
        toast.success("Anda berhasil Masuk!");
        // redirect to dashboard
        navigate("/dashboard-mentor");
      }
    } catch (error) {
      console.log(error);
      const statusCode = error.response.status;
      // Unauthorized
      if (statusCode === 401) {
        toast.error("Username atau Password salah!");
        // url not found
      } else if (statusCode === 404) {
        const axiosMessage = error.message;
        toast.error(`${axiosMessage}`);
        // internal server error
      } else if (statusCode >= 500) {
        toast.error("Server sedang bermasalah. Coba lagi nanti.");
      } else {
        // get all error stautus HTTP
        const serverMsg =
          error.response.data.message ||
          "Terjadi kesalahan yang tidak terduga.";
        toast.error(serverMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div
        className={`flex w-[900px] h-[600px] shadow-2xl rounded-xl overflow-hidden`}
      >
        <div
          className={`w-2/5 p-10 ${DARK_GREEN} text-white flex flex-col justify-start`}
        >
          <div className="mb-20">
            <img
              src={logo2}
              alt="Logo TEMPA"
              className="w-30 h-30 object-contain"
            />
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome <br />
            Mentor!
          </h1>
        </div>

        {/* Bagian Kanan (Form Login/Signup) */}
        <div className="w-3/5 bg-white p-16 flex flex-col">
          {/* Form Utama */}
          <Form {...formLoginMentor}>
            <form
              onSubmit={formLoginMentor.handleSubmit(onSubmitLoginMentor)}
              className="flex flex-col"
            >
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">Login</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Enter the name and password you used to sign up before
                </p>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`${PROGRESS_BLUE} h-full transition-all duration-300 ease-in-out `}
                  ></div>
                </div>
              </div>
              <div className="mb-6">
                {/* input product username */}
                <FormField
                  control={formLoginMentor.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Username"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* end input product name */}
              </div>

              <div className="mb-6">
                {/* input product password */}
                <FormField
                  control={formLoginMentor.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Password"
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* end input passsword */}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-3 ${DARK_GREEN} text-white font-semibold text-center flex justify-center rounded-lg mt-4 hover:bg-opacity-90 transition duration-300`}
              >
                {isLoading ? <Spinner /> : "Masuk"}
              </button>
            </form>
            <button
              type="submit"
              onClick={() => navigate("/")}
              className={`w-full p-3 bg-white border border-green-900 text-[#10403D] font-semibold rounded-lg mt-4 hover:bg-opacity-100 transition duration-300`}
            >
              Kembali
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
