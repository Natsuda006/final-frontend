import React from "react";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-6xl font-bold text-red-600 dark:text-red-500 mb-4">
          403
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Access Denied
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary w-full py-2 px-4 rounded-lg font-semibold transition-colors"
        >
          กลับไปหน้าแรก
        </button>
      </div>
    </div>
  );
};

export default NotAllowed;
