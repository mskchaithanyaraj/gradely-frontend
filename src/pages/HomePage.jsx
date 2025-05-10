"use client";

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import PerformanceDashboard from "../components/PerformanceDashboard";
import { parseStudentData } from "../utils/htmlParser";
import Loader from "../components/ui/Loader";
import InternalMarksCalculator from "../components/InternalMarksCalculator";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    // Reset any previous data and errors first
    setData(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();

      if (json.status === "success" && json.tableHTML) {
        const parsedData = parseStudentData(json.tableHTML);
        console.log("Parsed Data:", parsedData);
        setData(parsedData);
      } else {
        setError(json.message || "Failed to fetch data");
      }
    } catch (err) {
      setError("An error occurred while logging in");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <header className="mb-6 md:mb-8 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-blue-800 mb-2">
          Gec Student Performance Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Track your academic progress and achievements
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:gap-6">
        <div className="w-full md:max-w-[30vw] mb-6 md:mb-0">
          <LoginForm onLogin={handleLogin} />
        </div>

        <div className="w-full md:w-[50vw] flex-1">
          {loading && <Loader />}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg shadow-sm">
              <p>{error}</p>
            </div>
          )}

          {data && (
            <>
              <PerformanceDashboard data={data} />
              {data.structuredMarks && (
                <div className="mt-6">
                  <InternalMarksCalculator
                    structuredMarks={data.structuredMarks}
                  />
                </div>
              )}
            </>
          )}

          {!loading && !error && !data && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 font-medium">
                Welcome to your performance dashboard
              </p>
              <p className="text-sm text-blue-600">
                Please login to view your academic records
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
