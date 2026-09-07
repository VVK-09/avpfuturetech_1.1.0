"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { db } from "@/lib/firebaseClient";
import { doc, setDoc } from "firebase/firestore";

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
  const [submittedInquiry, setSubmittedInquiry] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Client-side validation check
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your full name and contact phone number.");
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    const inquiryId = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const inquiryRecord = {
      id: inquiryId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      organization: formData.organization.trim() || "Direct Inquiry",
      inquiryType: formData.inquiryType,
      message: formData.message.trim(),
      status: "Pending",
      source: "Main Website Contact Form",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      counselorNotes: ""
    };

    try {
      // 1. Save to Cloud Firestore
      if (db) {
        try {
          const docRef = doc(db, "inquiries", inquiryId);
          await setDoc(docRef, inquiryRecord, { merge: true });
        } catch (cloudErr) {
          console.warn("Firestore inquiry sync fallback:", cloudErr);
        }
      }

      // 2. Local fallback sync for immediate local admin reactivity
      if (typeof window !== "undefined") {
        try {
          const local = JSON.parse(localStorage.getItem("avp_inquiries") || "[]");
          localStorage.setItem("avp_inquiries", JSON.stringify([inquiryRecord, ...local]));
        } catch {}
      }

      // 3. Trigger backend API endpoint for notifications
      try {
        await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inquiryRecord)
        });
      } catch {}

      setSubmittedInquiry(inquiryRecord);
      setStatus("success");
    } catch (err: any) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Failed to send inquiry. Please call us directly at 9307076962.");
    }
  };

  const waMessage = submittedInquiry 
    ? encodeURIComponent(`Hi AVP FutureTech Team, my name is ${submittedInquiry.name} (${submittedInquiry.organization || 'Institution'}). I have submitted Inquiry #${submittedInquiry.id} regarding "${submittedInquiry.inquiryType}".\n\nRequirements: ${submittedInquiry.message || 'General consultation'}`)
    : "";
  const whatsappUrl = `https://wa.me/919307076962?text=${waMessage}`;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl p-6 sm:p-8">
      {status === "success" && submittedInquiry ? (
        <div className="py-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#DCEBFF] text-[#1E63D6] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 mb-2">
              Ticket #{submittedInquiry.id} Created
            </span>
            <h3 className="text-2xl font-bold text-[#0B1E3D] font-heading">
              Inquiry Received Successfully!
            </h3>
            <p className="text-[#64748B] text-sm max-w-md mx-auto leading-relaxed mt-2">
              Thank you, <span className="font-semibold text-[#0B1E3D]">{submittedInquiry.name}</span>. Our founders will review your requirements and reach out via phone/WhatsApp within 24 hours.
            </p>
          </div>

          {/* Direct Instant Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Immediately on WhatsApp</span>
            </a>

            <a
              href="tel:9307076962"
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-[#0B1E3D] bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#1E63D6]" />
              <span>Call Founder: +91 9307076962</span>
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100">
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
                setSubmittedInquiry(null);
                setStatus("idle");
              }}
              className="text-xs font-semibold text-[#1E63D6] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Send Another Inquiry</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
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
              className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0B1E3D] focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-[#1E63D6] transition-all bg-white cursor-pointer"
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
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#1E63D6] hover:bg-[#1551B5] shadow-md shadow-[#1E63D6]/25 hover:shadow-lg hover:shadow-[#1E63D6]/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {status === "submitting" ? (
              <span>Submitting to Admissions Desk...</span>
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
