"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConstituencyPage() {
  const router = useRouter();

  // Sample constituency data (replace with actual data fetching logic)
  const [constituencies, setConstituencies] = useState([
    { id: 1, no: 1, name: "Sangamne", active: "Yes" },
    { id: 2, no: 23232, name: "test", active: "Yes" },
    { id: 3, no: 3, name: "test2", active: "Yes" },
  ]);

  const handleEdit = (id) => {
    // Navigate to edit page or open a modal for editing
    console.log(`Edit constituency with id: ${id}`);
    // Example: router.push(`/constituency/edit/${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete constituency
    setConstituencies(constituencies.filter((constituency) => constituency.id !== id));
    console.log(`Deleted constituency with id: ${id}`);
  };

  const handleAddNew = () => {
    // Navigate to add new constituency page
    console.log("Add new constituency");
    // Example: router.push("/constituency/add-new");
  };

  return (
    <div className="text-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="mb-6 border-b border-gray-700 pb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Constituency</h1>
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={handleAddNew}
              suppressHydrationWarning={true}
            >
              Add New
            </button>
          </div>

          {/* Tabs (optional, matching the style from VoterRegistrationForm) */}
          <div className="mb-6">
            <div className="flex border-b border-gray-700">
              <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-500">
                Tehsil
              </button>
              <button className="py-2 px-4 text-gray-400">Zp Gat</button>
              <button className="py-2 px-4 text-gray-400">Panchayat Samiti Gan</button>
              <button className="py-2 px-4 text-gray-400">Village</button>
              <button className="py-2 px-4 text-gray-400">Ward</button>
              <button className="py-2 px-4 text-gray-400">Booth</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">Constituency No</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">Constituency Name</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">Active</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {constituencies.map((constituency) => (
                  <tr key={constituency.id} className="border-b border-gray-700">
                    <td className="py-3 px-4 text-sm">{constituency.no}</td>
                    <td className="py-3 px-4 text-sm">{constituency.name}</td>
                    <td className="py-3 px-4 text-sm">{constituency.active}</td>
                    <td className="py-3 px-4 text-sm flex space-x-2">
                      <button
                        onClick={() => handleEdit(constituency.id)}
                        className="p-1 bg-green-500 hover:bg-green-600 rounded-full"
                        suppressHydrationWarning={true}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(constituency.id)}
                        className="p-1 bg-red-500 hover:bg-red-600 rounded-full"
                        suppressHydrationWarning={true}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1H5v-1a1 1 0 011-1h4zm-4 4h12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}