"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, Tag, Camera } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import { GALLERY_ITEMS } from "@/lib/constants";
import { db } from "@/lib/firebaseClient";
import { collection, onSnapshot } from "firebase/firestore";

const CATEGORIES = ["All", "Workshops", "Smart Labs", "Student Projects", "Exhibitions"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryList, setGalleryList] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("avp_gallery_items");
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return GALLERY_ITEMS;
  });

  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Real-time Firestore sync
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, "gallery_items"),
        (snapshot) => {
          if (!snapshot.empty) {
            const cloudItems = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setGalleryList(cloudItems);
            try {
              localStorage.setItem("avp_gallery_items", JSON.stringify(cloudItems));
            } catch {}
          }
        },
        (err) => {
          console.warn("Public gallery Firestore notice:", err);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn("Public gallery init notice:", e);
    }
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? galleryList
      : galleryList.filter((item: any) => item.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-linear-to-b from-[#F7F9FC] to-white border-b border-[#E2E8F0] relative overflow-hidden">
        {/* Pattern 1: Tech Blueprint Grid */}
        <div className="absolute inset-0 pattern-tech-grid pointer-events-none opacity-60" />

        {/* Decorative ambient background glows */}
        <div
          className="pointer-events-none absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30, 99, 214, 0.08) 0%, rgba(247, 249, 252, 0) 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1E3D] tracking-tight font-heading">
            Innovation in Action:{" "}
            <span className="text-[#1E63D6]">Photo Gallery</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed">
            Witness our rural school students and college innovators building, coding, assembling hardware, and showcasing working prototypes.
          </p>

          {/* Category Filter Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#1E63D6] text-white shadow-md shadow-[#1E63D6]/25"
                    : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F0F4FA] hover:text-[#0B1E3D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        {/* Pattern 2: Precision Dot Matrix Texture */}
        <div className="absolute inset-0 pattern-dot-matrix pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-dashed border-slate-300">
              <Camera className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No photos found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredItems.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100 aspect-4/3 card-hover"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/images/hero_robotics_ai.jpg";
                    }}
                  />

                  {/* Gradient Shade on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1E3D]/90 via-[#0B1E3D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                    <div className="flex justify-end">
                      <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </span>
                    </div>
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold leading-tight font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Persistent Category Badge */}
                  <div className="absolute top-3 left-3 group-hover:opacity-0 transition-opacity">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm text-[#0B1E3D] shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
    </div>
  );
}
