"use client";
import UseFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [haveSubmitted, setHaveSubmitted] = useState(false);

  const [userData, setUserData] = useState({
    gender: "",
    phoneNumber: "",
    religion: "",
    community: "",
    caste: "",
    bloodGroup: "",
    goals: "",
    sslcSchool: "",
    sslcPercentage: "",
    hscSchool: "",
    hscPercentage: "",
    ugSchool: "",
    ugPercentage: "",
    fatherName: "",
    fatherOccupation: "",
    fatherQualification: "",
    motherName: "",
    motherOccupation: "",
    motherQualification: "",
    familyIncome: "",
    brotherName: "",
    sisterName: "",
  });

  const logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/logout`;
    const body = {};

    let response = await UseFetch("POST", url, body).then(async function ({
      data,
      status,
    }) {
      if (status != 200) {
        console.log(data.eMessage);
        return data;
      }
      if (status === 200) {
        localStorage.removeItem("log");
        localStorage.removeItem("email");
        router.push("/login");
      }
      return data;
    });
  };

  const uploadNewData = async () => {
    localStorage.removeItem("hassub");
    setHaveSubmitted(false);
  };

  const submitUserData = async (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update`;

    let body = {
      email: localStorage.getItem("email"),
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      religion: userData.religion,
      community: userData.community,
      caste: userData.caste,
      bloodGroup: userData.bloodGroup,
      goals: userData.goals,
      academics: {
        sslcSchool: userData.sslcSchool,
        sslcPercentage: userData.sslcPercentage,
        hscSchool: userData.hscSchool,
        hscPercentage: userData.hscPercentage,
        ugSchool: userData.ugSchool,
        ugPercentage: userData.ugPercentage,
      },
      family: {
        fatherName: userData.fatherName,
        fatherOccupation: userData.fatherOccupation,
        fatherQualification: userData.fatherQualification,
        motherName: userData.motherName,
        motherOccupation: userData.motherOccupation,
        motherQualification: userData.motherQualification,
        familyIncome: userData.familyIncome,
        brotherName: userData.brotherName,
        sisterName: userData.sisterName,
      },
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
        localStorage.setItem("hassub", "1");
        setHaveSubmitted(true);
      }
      return data;
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    setUserData({ ...userData, [input.name]: input.value });
  };

  useEffect(() => {
    let log = localStorage.getItem("log");
    let hassub = localStorage.getItem("hassub");
    if (!log) {
      router.push("/login");
    }
    if (!hassub) {
      setHaveSubmitted(false);
    } else {
      setHaveSubmitted(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-300 mb-10 items-center">
      <div className="flex flex-row w-full">
        <div className="flex w-full  justify-end text-white my-5">
          <div
            onClick={uploadNewData}
            className="flex justify-end py-2 px-4 cursor-pointer rounded-xl bg-cyan-500 mr-10"
          >
            upload new data
          </div>
        </div>
        <div className="flex  justify-end text-white my-5">
          <div
            onClick={logout}
            className="flex justify-end py-2 px-4 cursor-pointer rounded-xl bg-cyan-500 mr-10"
          >
            Logout
          </div>
        </div>
      </div>
      {haveSubmitted ? (
        <div className="text-black flex items-center h-full  text-2xl font-bold">
          You have Submitted the Data
        </div>
      ) : (
        <form onSubmit={submitUserData} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-gender"
              >
                Gender<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-gender"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                type="text"
                placeholder="gender"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phoneNumber"
              >
                Phone Number<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-phoneNumber"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                type="text"
                placeholder="9846444444"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-religion"
              >
                Religion<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-religion"
                name="religion"
                value={userData.religion}
                onChange={handleChange}
                type="text"
                placeholder="religion"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-community"
              >
                Community<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-community"
                name="community"
                value={userData.community}
                onChange={handleChange}
                type="text"
                placeholder="community"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-caste"
              >
                Caste<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-caste"
                name="caste"
                value={userData.caste}
                onChange={handleChange}
                type="text"
                placeholder="caste"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-bloodGroup"
              >
                Blood Group<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-bloodGroup"
                name="bloodGroup"
                value={userData.bloodGroup}
                onChange={handleChange}
                type="text"
                placeholder="bloodGroup"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-goals"
              >
                Goals
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-goals"
                name="goals"
                value={userData.goals}
                onChange={handleChange}
                type="text"
                placeholder="goals"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 font-bold text-2xl">
            ACADEMICS
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-sslcSchool"
              >
                SSLC SCHOOL NAME<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-sslcSchool"
                name="sslcSchool"
                value={userData.sslcSchool}
                onChange={handleChange}
                type="text"
                placeholder="SCHOOL NAME"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-sslcPercentage"
              >
                SSLC PERCENTAGE<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-sslcPercentage"
                name="sslcPercentage"
                value={userData.sslcPercentage}
                onChange={handleChange}
                type="text"
                placeholder="SSLC PERCENTAGE"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-hscSchool"
              >
                HSC SCHOOL NAME<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-hscSchool"
                name="hscSchool"
                value={userData.hscSchool}
                onChange={handleChange}
                type="text"
                placeholder="SCHOOL NAME"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-hscPercentage"
              >
                HSC PERCENTAGE<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-hscPercentage"
                name="hscPercentage"
                value={userData.hscPercentage}
                onChange={handleChange}
                type="text"
                placeholder="HSC PERCENTAGE"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-ugSchool"
              >
                UG SCHOOL NAME<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-ugSchool"
                name="ugSchool"
                value={userData.ugSchool}
                onChange={handleChange}
                type="text"
                placeholder="SCHOOL NAME"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-ugPercentage"
              >
                UG PERCENTAGE<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-ugPercentage"
                name="ugPercentage"
                value={userData.ugPercentage}
                onChange={handleChange}
                type="text"
                placeholder="UG PERCENTAGE"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 font-bold text-2xl">
            Family
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-fatherName"
              >
                FATHER NAME<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-fatherName"
                name="fatherName"
                value={userData.fatherName}
                onChange={handleChange}
                type="text"
                placeholder="FATHER NAME"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-fatherOccupation"
              >
                FATHER OCCUPATION<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-fatherOccupation"
                name="fatherOccupation"
                value={userData.fatherOccupation}
                onChange={handleChange}
                type="text"
                placeholder="FATHER OCCUPATION"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-fatherQualification"
              >
                FATHER HIGHEST QUALIFICATION
                <span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-fatherQualification"
                name="fatherQualification"
                value={userData.fatherQualification}
                onChange={handleChange}
                type="text"
                placeholder="FATHER QUALIFICATION"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-motherName"
              >
                MOTHER NAME<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-motherName"
                name="motherName"
                value={userData.motherName}
                onChange={handleChange}
                type="text"
                placeholder="MOTHER NAME"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-motherOccupation"
              >
                MOTHER OCCUPATION<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-motherOccupation"
                name="motherOccupation"
                value={userData.motherOccupation}
                onChange={handleChange}
                type="text"
                placeholder="MOTHER OCCUPATION"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-motherQualification"
              >
                MOTHER HIGHEST QUALIFICATION
                <span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-motherQualification"
                name="motherQualification"
                value={userData.motherQualification}
                onChange={handleChange}
                type="text"
                placeholder="MOTHER QUALIFICATION"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-familyIncome"
              >
                FAMILY INCOME<span className="text-red-600">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-familyIncome"
                name="familyIncome"
                value={userData.familyIncome}
                onChange={handleChange}
                type="text"
                placeholder="FAMILY INCOME"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-brotherName"
              >
                BROTHER NAME if any
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-brotherName"
                name="brotherName"
                value={userData.brotherName}
                onChange={handleChange}
                type="text"
                placeholder="BROTHER NAME"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-sisterName"
              >
                SISTER NAME if any
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-sisterName"
                name="sisterName"
                value={userData.sisterName}
                onChange={handleChange}
                type="text"
                placeholder="SISTER NAME"
              />
            </div>
          </div>
          <div className="flex  justify-end text-white my-5">
            <button
              type="submit"
              className="flex justify-end py-2 px-4 cursor-pointer rounded-xl bg-cyan-500 "
            >
              SUBMIT
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
