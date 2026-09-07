"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface AdminLoginProps {
  onLoginSuccess: (adminData: any) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Default master admins for home portal
  const VALID_ADMINS = [
    {
      id: "admin-1",
      email: "vaishnavkubade@gmail.com",
      password: "Admin@123",
      name: "Vaishnav Kubade",
      role: "Super Admin",
      designation: "CTO & Co-Founder"
    },
    {
      id: "admin-2",
      email: "avishkar@avpfuturetech.com",
      password: "Admin@123",
      name: "Avishkar Kamble",
      role: "Super Admin",
      designation: "Co-Founder & CEO"
    }
  ];

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const found = VALID_ADMINS.find(
      (a) => a.email.toLowerCase() === cleanEmail && a.password === password
    );

    setTimeout(() => {
      setLoading(false);
      if (found) {
        // Generate random 6-digit OTP
        const code = String(Math.floor(100000 + Math.random() * 900000));
        setGeneratedOtp(code);
        setStep("otp");
      } else {
        setError("Invalid email address or password. Please verify your credentials.");
      }
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const found = VALID_ADMINS.find((a) => a.email.toLowerCase() === cleanEmail);

    setTimeout(() => {
      setLoading(false);
      if (otp.trim() === generatedOtp || otp.trim() === "123456") {
        const session = {
          ...found,
          loginTime: new Date().toISOString()
        };
        try {
          localStorage.setItem("avp_home_admin_session", JSON.stringify(session));
        } catch {}
        onLoginSuccess(session);
      } else {
        setError("Invalid 2FA security code. Please check the OTP code shown below.");
      }
    }, 500);
  };

  const handleQuickDemoFill = () => {
    setEmail("vaishnavkubade@gmail.com");
    setPassword("Admin@123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#07152B] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#1E63D6] selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E63D6]/15 rounded-full blur-3xl pointer-events-none -mt-40 -mr-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none -mb-40 -ml-40" />
      <div className="absolute inset-0 bg-circuit-lines opacity-20 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center px-4">
        {/* Brand Logo */}
        <div className="relative h-12 w-48 mx-auto mb-4">
          <Image
            src={SITE_CONFIG.logos.white}
            alt="AVP FutureTech Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#38BDF8] border border-white/15 mb-3 backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Main Website Management Console</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
          {step === "credentials" ? "Admin Authentication" : "2FA Security Verification"}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          {step === "credentials"
            ? "Sign in to manage inquiries, leads, and photo gallery"
            : `Enter the 6-digit verification code sent to ${email}`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#0B1E3D]/80 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-2xl border border-white/15 shadow-2xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vaishnavkubade@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Access Password
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-lg shadow-[#1E63D6]/30 hover:shadow-[#1E63D6]/50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Proceed to 2FA</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Fill Helper */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-[#38BDF8] hover:text-[#93C5FD] transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autofill Master Admin</span>
                </button>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Back to Site</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              {/* OTP Simulation Alert */}
              <div className="p-3.5 rounded-xl bg-[#1E63D6]/20 border border-[#1E63D6]/40 text-xs text-blue-200 text-center">
                <span className="block text-slate-400 mb-1">Your 2FA Security Passcode:</span>
                <span className="text-xl font-mono font-extrabold text-[#38BDF8] tracking-widest">
                  {generatedOtp || "123456"}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Enter 6-Digit OTP Code
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 123456"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-transparent transition-all text-center text-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Verifying Session...</span>
                ) : (
                  <>
                    <span>Confirm & Enter Console</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setOtp(generatedOtp);
                  }}
                  className="text-[#38BDF8] hover:underline font-semibold"
                >
                  Fill Code Automatically
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setError("");
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
