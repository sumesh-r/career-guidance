"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UseFetch from "@/utils/useFetch";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signup = async (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/add`;
    const body = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email,
      password: password,
    };

    let response = await UseFetch("POST", url, body).then(async function ({
      data,
      status,
    }) {
      if (status != 200) {
        console.log(data.eMessage);
        return data;
      }
      if (status === 200) {
        router.push("/");
      }
      return data;
    });

    setEmail("");
    setFirstName("");
    setLastName("");
    setDob("");
    setPassword("");
  };
  useEffect(() => {
    let log = localStorage.getItem("log");
    if (log) {
      router.push("/");
    }
  }, []);

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form
              onSubmit={signup}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Akash"
                  value={firstName}
                  required={true}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="S"
                  value={lastName}
                  required={true}
                />
              </div>

              <div>
                <label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Date of Birth
                </label>
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="01/01/2001"
                  value={dob}
                  required={true}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  required={true}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                have an account yet?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
