"use client";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { registerUser } from "@/services/auth.service";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const submit = async e => {
    e.preventDefault();
    const payload = { name, email, password };
    console.log(payload);
    try {
      setLoading(true);
      await registerUser(payload);
      setTimeout(() => {
        setLoading(false);
        showToast("User registered successfully!", "success");
        console.log("user register successfully");
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      showToast("Registration failed. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-slide-in ${
            toast.type === "success"
              ? "bg-white border-green-200"
              : "bg-white border-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="text-green-600" size={24} />
          ) : (
            <XCircle className="text-red-600" size={24} />
          )}
          <span className="text-gray-800 font-medium">{toast.message}</span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome</h2>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          <div className="space-y-5">
            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  focusedField === "name"
                    ? "text-blue-600 scale-110"
                    : "text-gray-400"
                }`}
              >
                <User size={20} />
              </div>
              <input
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:shadow-md"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  focusedField === "email"
                    ? "text-blue-600 scale-110"
                    : "text-gray-400"
                }`}
              >
                <Mail size={20} />
              </div>
              <input
                type="email"
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:shadow-md"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  focusedField === "password"
                    ? "text-blue-600 scale-110"
                    : "text-gray-400"
                }`}
              >
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-4 pl-12 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:shadow-md"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 hover:scale-110 transition-all duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6 animate-fade-in">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline transition-colors duration-300"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
