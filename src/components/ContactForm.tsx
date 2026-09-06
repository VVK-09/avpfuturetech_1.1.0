"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "School Workshop (Grades 1-10)",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Client-side validation check
    if (!formData.name || !formData.phone) {
      setStatus("error");
      setErrorMessage("Please provide your name and contact phone number.");
      return;
    }

    // Simulate submission delay
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl p-6 sm:p-8">
      {status === "success" ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#DCEBFF] text-[#1E63D6] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold text-[#0B1E3D] font-heading">
            Inquiry Received!
          </h3>
          <p className="text-[#64748B] text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-[#0B1E3D]">{formData.name}</span>. Our founders will contact you within 24 hours to discuss your requirements.
          </p>
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                phone: "",
                organization: "",
                inquiryType: "School Workshop (Grades 1-10)",
                message: "",
              });
              setStatus("idle");
            }}
            className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-[#1E63D6] bg-[#DCEBFF] hover:bg-[#c6dfff] transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#0B1E3D] font-heading">
              Send Us an Inquiry
            </h3>
            <p className="text-xs text-[#64748B]">
              Fill out the details below and we will get back to you promptly.
            </p>
          </div>

          {status === "error" && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-[#0B1E3D] mb-1">
                Your Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Patil"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1E3D] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-[#1E63D6] transition-all bg-white"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-[#0B1E3D] mb-1">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1E3D] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-[#1E63D6] transition-all bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#0B1E3D] mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1E3D] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-[#1E63D6] transition-all bg-white"
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-xs font-bold text-[#0B1E3D] mb-1">
                School / College / Organization
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Vidyadeep High School"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1E3D] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-[#1E63D6] transition-all bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-xs font-bold text-[#0B1E3D] mb-1">
              Interested Program / Solution
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1E3D] focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-[#1E63D6] transition-all bg-white"
            >
              <option>School Workshop (Grades 1-10)</option>
              <option>Smart School Lab Setup</option>
              <option>Government / ATL Grants Support</option>
              <option>College Workshop & Bootcamps</option>
              <option>Project Internship Program</option>
              <option>Robotics & IoT Kits Supply</option>
              <option>General Partnership / Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-[#0B1E3D] mb-1">
              Your Message or Requirements
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your student strength, preferred workshop dates, or specific requirements..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1E3D] placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-[#1E63D6] transition-all resize-none bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 hover:shadow-lg hover:shadow-[#1E63D6]/35 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {status === "submitting" ? (
              <span>Sending Inquiry...</span>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
