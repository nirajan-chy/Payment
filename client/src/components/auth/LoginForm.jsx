"use client";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const submitRegister = e => {
    e.preventDefault();
    console.log({ name, email, password });
    // Handle registration
  };

  const submitLogin = e => {
    e.preventDefault();
    console.log({ email, password });
    // Handle login
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back" : "Welcome"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to your account"
                : "Create your account to get started"}
            </p>
          </div>

          <div className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    focusedField === "name" ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <User size={20} />
                </div>
                <input
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            )}

            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === "email" ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <Mail size={20} />
              </div>
              <input
                type="email"
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  focusedField === "password"
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 pl-12 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              onClick={isLogin ? submitLogin : submitRegister}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors duration-200"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
