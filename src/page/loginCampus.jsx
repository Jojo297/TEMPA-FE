import React from "react";

export default function GoogleSignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fefefe] font-sans text-[#1f1f1f]">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm flex flex-col md:flex-row items-center md:items-start p-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
          <div className="flex items-center mb-8 w-full justify-start">
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            <p className="text-sm text-gray-700">Sign in with Google</p>
          </div>
          <div className="text-[#4185f4] text-6xl font-bold mb-4">T</div>
          <h2 className="text-lg font-medium mb-6">Sign in to TEMPA</h2>
          <div className="relative w-full max-w-sm">
            <input
              type="email"
              value="example@gmail.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-gray-50 focus:outline-none"
              readOnly
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-4 h-4 absolute right-3 top-2.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 md:pl-8 pt-6 md:pt-0 text-gray-800">
          <p className="mb-4">
            Google will allow <b>TEMPA</b> to access this info about you
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">example</p>
              <p className="text-xs text-gray-500">Name and profile picture</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 12H8m0 0l4-4m-4 4l4 4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">example@gmail.com</p>
              <p className="text-xs text-gray-500">Email address</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            Review TEMPA’s{" "}
            <a href="#" className="text-[#4185f4]">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#4185f4]">
              Terms of Service
            </a>{" "}
            to understand how TEMPA will process and store your data.
            <br />
            <br />
            You can remove access at any time in your{" "}
            <a href="#" className="text-[#4185f4]">
              Google Account
            </a>
            .
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button className="px-6 py-2 bg-[#064e3b] text-white rounded-md hover:bg-[#043d2f]">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
