"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'test' && password === '12345') {
      setError('');
      router.push('/Dashboard');
    } else {
      setError('Username or password does not exist');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      {/* Left Side Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/elect.jpg"
          alt="Sign in background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-gray-800">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
          <p className="text-center text-gray-400 mb-6">Sign in to continue</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Image */}
      
    </div>
  );
}