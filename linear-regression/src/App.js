import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const x = xValues.split(",").map(Number);
    const y = yValues.split(",").map(Number);

    try {
      const response = await axios.post("http://127.0.0.1:5000/linear-regression", { x, y });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Linear Regression Solver</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-purple-700 mb-2">
              X Values (comma-separated):
              <input
                type="text"
                value={xValues}
                onChange={(e) => setXValues(e.target.value)}
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label className="block text-purple-700 mb-2">
              Y Values (comma-separated):
              <input
                type="text"
                value={yValues}
                onChange={(e) => setYValues(e.target.value)}
                className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Calculate
          </button>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {result && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Results</h2>
            <p className="text-purple-600">Slope (m): {result.slope.toFixed(4)}</p>
            <p className="text-purple-600">Intercept (c): {result.intercept.toFixed(4)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

