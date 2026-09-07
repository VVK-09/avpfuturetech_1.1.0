"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Phone, 
  AlertCircle, 
  Edit3, 
  X, 
  FileSpreadsheet, 
  MessageCircle, 
  Building2, 
  ExternalLink,
  Filter,
  Check,
  RefreshCw,
  Send
} from "lucide-react";
import { db } from "@/lib/firebaseClient";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { initialInquiries } from "@/internship-portal/data/initialInquiries";

interface HomeInquiriesDeskProps {
  onShowToast: (msg: string, type: "success" | "info" | "error") => void;
}

export default function HomeInquiriesDesk({ onShowToast }: HomeInquiriesDeskProps) {
  const [inquiries, setInquiries] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("avp_inquiries");
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return initialInquiries;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // 'All' | 'Pending' | 'Contacted' | 'Resolved'
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [deletingInquiry, setDeletingInquiry] = useState<any | null>(null);

  // Counselor reply / notes modal state
  const [notesForm, setNotesForm] = useState({
    status: "Contacted",
    notes: "",
    replyDraft: ""
  });

  // Real-time Firestore sync
  useEffect(() => {
    const firestore = db as any;
    if (!firestore) return;
    try {
      const unsub = onSnapshot(
        collection(firestore, "inquiries"),
        (snapshot) => {
          if (!snapshot.empty) {
            const cloudInquiries = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setInquiries(cloudInquiries);
            try {
              localStorage.setItem("avp_inquiries", JSON.stringify(cloudInquiries));
            } catch {}
          } else {
            // Seed initial inquiries if empty
            initialInquiries.forEach((inq) => {
              const docRef = doc(firestore, "inquiries", String(inq.id));
              setDoc(docRef, JSON.parse(JSON.stringify(inq)), { merge: true }).catch(() => {});
            });
          }
        },
        (err) => {
          console.warn("Home Inquiries Firestore listener notice:", err);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn("Home Inquiries init notice:", e);
    }
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = inquiries ? inquiries.length : 0;
    const pending = inquiries ? inquiries.filter((i) => i.status === "Pending").length : 0;
    const contacted = inquiries ? inquiries.filter((i) => i.status === "Contacted").length : 0;
    const resolved = inquiries ? inquiries.filter((i) => i.status === "Resolved").length : 0;
    return { total, pending, contacted, resolved };
  }, [inquiries]);

  // Filter inquiries
  const filteredInquiries = useMemo(() => {
    if (!inquiries) return [];
    return inquiries.filter((inq) => {
      const matchStatus = statusFilter === "All" || inq.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        (inq.name && inq.name.toLowerCase().includes(q)) ||
        (inq.email && inq.email.toLowerCase().includes(q)) ||
        (inq.phone && inq.phone.includes(q)) ||
        (inq.organization && inq.organization.toLowerCase().includes(q)) ||
        (inq.inquiryType && inq.inquiryType.toLowerCase().includes(q)) ||
        (inq.message && inq.message.toLowerCase().includes(q)) ||
        (inq.id && inq.id.toLowerCase().includes(q));
      return matchStatus && matchQuery;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const updateInquiryStatus = async (inquiryId: string, newStatus: string, counselorNotes?: string) => {
    const updatedInquiries = inquiries.map((inq) => {
      if (inq.id === inquiryId) {
        return {
          ...inq,
          status: newStatus,
          counselorNotes: counselorNotes !== undefined ? counselorNotes : (inq.counselorNotes || ""),
          updatedAt: new Date().toISOString().replace("T", " ").slice(0, 16)
        };
      }
      return inq;
    });

    setInquiries(updatedInquiries);
    try {
      localStorage.setItem("avp_inquiries", JSON.stringify(updatedInquiries));
    } catch {}

    const firestore = db as any;
    if (firestore) {
      try {
        const docRef = doc(firestore, "inquiries", inquiryId);
        const target = updatedInquiries.find((i) => i.id === inquiryId);
        if (target) {
          await setDoc(docRef, JSON.parse(JSON.stringify(target)), { merge: true });
        }
      } catch (err) {
        console.warn("Error updating inquiry in Firestore:", err);
      }
    }

    onShowToast(`Inquiry #${inquiryId} updated to ${newStatus}.`, "success");
  };

  const deleteInquiry = async (inquiryId: string) => {
    const updatedInquiries = inquiries.filter((i) => i.id !== inquiryId);
    setInquiries(updatedInquiries);
    try {
      localStorage.setItem("avp_inquiries", JSON.stringify(updatedInquiries));
    } catch {}

    const firestore = db as any;
    if (firestore) {
      try {
        await deleteDoc(doc(firestore, "inquiries", inquiryId));
      } catch (err) {
        console.warn("Error deleting inquiry from Firestore:", err);
      }
    }

    onShowToast(`Inquiry #${inquiryId} removed.`, "info");
  };

  const handleOpenNotesModal = (inq: any) => {
    setSelectedInquiry(inq);
    setNotesForm({
      status: inq.status || "Pending",
      notes: inq.counselorNotes || "",
      replyDraft: `Hi ${inq.name},\n\nThank you for contacting AVP FutureTech regarding "${inq.inquiryType || 'our institutional programs'}".\n\nRegarding your requirements:\n\n\nBest regards,\nExecutive Desk\nAVP FutureTech LLP\nPh: +91 7517238914`
    });
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, notesForm.status, notesForm.notes);
    setSelectedInquiry(null);
  };

  const handleExportCSV = () => {
    if (!inquiries || inquiries.length === 0) {
      onShowToast("No inquiries available to export.", "info");
      return;
    }
    const headers = [
      "Inquiry ID",
      "Date & Time",
      "Full Name",
      "Organization / School",
      "Program",
      "Email Address",
      "Phone Number",
      "Status",
      "Message",
      "Counselor Notes"
    ];
    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt,
      `"${(i.name || "").replace(/"/g, '""')}"`,
      `"${(i.organization || "Direct").replace(/"/g, '""')}"`,
      `"${(i.inquiryType || "General").replace(/"/g, '""')}"`,
      i.email,
      `"${i.phone || ""}"`,
      i.status,
      `"${(i.message || "").replace(/"/g, '""')}"`,
      `"${(i.counselorNotes || "").replace(/"/g, '""')}"`
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AVP_Website_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast("Inquiries CSV exported successfully!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCEBFF] text-[#1E63D6]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiries & Institutional Leads</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({stats.total} Total Queries Received)
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0B1E3D] font-heading">
            Lead Management & Resolution Desk
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Review, call, WhatsApp, and manage inquiries submitted by schools, colleges, and students from the main website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-green-600" />
          <span>Export Leads (CSV)</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Inquiries</span>
            <span className="text-2xl font-extrabold text-[#0B1E3D] mt-1 block">{stats.total}</span>
            <span className="text-[11px] text-slate-400">All submissions recorded</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E63D6] flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-700 block">Pending Review</span>
            <span className="text-2xl font-extrabold text-amber-600 mt-1 block">{stats.pending}</span>
            <span className="text-[11px] text-amber-700/80">Requires immediate callback</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-700 block">Contacted / Discussion</span>
            <span className="text-2xl font-extrabold text-blue-600 mt-1 block">{stats.contacted}</span>
            <span className="text-[11px] text-blue-600/80">Active follow-up in progress</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-green-700 block">Resolved / Converted</span>
            <span className="text-2xl font-extrabold text-green-600 mt-1 block">{stats.resolved}</span>
            <span className="text-[11px] text-green-600/80">Successful closure</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "All", label: `All (${stats.total})` },
            { id: "Pending", label: `Pending (${stats.pending})` },
            { id: "Contacted", label: `Contacted (${stats.contacted})` },
            { id: "Resolved", label: `Resolved (${stats.resolved})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[#1E63D6] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, school, or query..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E63D6] focus:border-transparent bg-slate-50/50"
          />
        </div>
      </div>

      {/* Inquiry Cards List */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <MessageSquare className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-[#0B1E3D]">No inquiries found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No inquiries match your search "${searchQuery}".`
              : "No inquiry records currently exist in this filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => {
            const isPending = inq.status === "Pending";
            const isContacted = inq.status === "Contacted";
            const cleanPhone = inq.phone ? inq.phone.replace(/\D/g, "") : "";

            const waText = encodeURIComponent(
              `Hi ${inq.name}, greetings from AVP FutureTech regarding your inquiry (#${inq.id}) about "${inq.inquiryType || 'our programs'}". How can we assist you?`
            );
            const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${waText}`;

            return (
              <div
                key={inq.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Top Row: Lead Header & Action Buttons */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#DCEBFF] text-[#1E63D6] flex items-center justify-center font-extrabold text-base shrink-0">
                      {(inq.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-[#0B1E3D]">{inq.name}</h4>
                        <span className="text-xs text-slate-400 font-mono font-medium">
                          #{inq.id}
                        </span>

                        {inq.organization && inq.organization !== "Direct Inquiry" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700">
                            <Building2 className="w-3 h-3 text-slate-500" />
                            <span>{inq.organization}</span>
                          </span>
                        )}

                        {inq.inquiryType && (
                          <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-blue-50 text-[#1E63D6]">
                            {inq.inquiryType}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-500">
                        {inq.email && (
                          <a
                            href={`mailto:${inq.email}?subject=AVP FutureTech Response - #${inq.id}`}
                            className="inline-flex items-center gap-1 text-[#1E63D6] hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{inq.email}</span>
                          </a>
                        )}

                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone}`}
                            className="inline-flex items-center gap-1 text-slate-700 hover:text-[#1E63D6]"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>+91 {inq.phone}</span>
                          </a>
                        )}

                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{inq.createdAt}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Contact & Status Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* 1-Click WhatsApp Button */}
                    {cleanPhone && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-xs flex items-center gap-1.5 transition-all"
                        title="Chat immediately on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {/* Status Select */}
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isPending
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : isContacted
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : "bg-green-50 text-green-800 border-green-200"
                      }`}
                    >
                      <option value="Pending">🟡 Pending</option>
                      <option value="Contacted">🔵 Contacted</option>
                      <option value="Resolved">🟢 Resolved</option>
                    </select>

                    {/* Counselor Notes */}
                    <button
                      type="button"
                      onClick={() => handleOpenNotesModal(inq)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#1E63D6] bg-[#DCEBFF] hover:bg-[#c6dfff] transition-colors flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Notes</span>
                    </button>

                    {/* Delete Inquiry */}
                    <button
                      type="button"
                      onClick={() => setDeletingInquiry(inq)}
                      className="p-1.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Requirements / Inquirer Message:
                  </span>
                  "{inq.message || "No specific requirement message was entered."}"
                </div>

                {/* Internal Counselor Notes Log */}
                {inq.counselorNotes && (
                  <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Follow-Up Note:</span> {inq.counselorNotes}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Notes / Follow-Up Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#0B1E3D]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#1E63D6]">
                  #{selectedInquiry.id}
                </span>
                <h3 className="text-lg font-bold text-[#0B1E3D]">
                  Follow-Up & Counselor Notes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lead Status
                </label>
                <select
                  value={notesForm.status}
                  onChange={(e) => setNotesForm({ ...notesForm, status: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#1E63D6] focus:outline-hidden"
                >
                  <option value="Pending">🟡 Pending</option>
                  <option value="Contacted">🔵 Contacted / In Discussion</option>
                  <option value="Resolved">🟢 Resolved / Converted</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internal Team Notes / Action Taken
                </label>
                <textarea
                  rows={3}
                  value={notesForm.notes}
                  onChange={(e) => setNotesForm({ ...notesForm, notes: e.target.value })}
                  placeholder="e.g. Discussed workshop requirements on phone. Sent quotation PDF for 80 students."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#1E63D6] focus:outline-hidden resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Draft Email / WhatsApp Template
                </label>
                <textarea
                  rows={4}
                  value={notesForm.replyDraft}
                  onChange={(e) => setNotesForm({ ...notesForm, replyDraft: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono bg-slate-50 focus:ring-2 focus:ring-[#1E63D6] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1E63D6] hover:bg-[#1551B5] transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Notes & Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingInquiry && (
        <div className="fixed inset-0 z-50 bg-[#0B1E3D]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1E3D]">
                Delete Inquiry #{deletingInquiry.id}?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove the inquiry from{" "}
                <span className="font-semibold text-slate-700">{deletingInquiry.name}</span>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteInquiry(deletingInquiry.id);
                  setDeletingInquiry(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
