import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { NewsItem } from "@/lib/constants";

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="card-hover bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col h-full group">
      {/* Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#DCEBFF]/95 backdrop-blur-sm text-[#1E63D6] border border-[#BFDBFE] shadow-xs">
            <Tag className="w-3 h-3" />
            {news.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#1E63D6]" />
            <time dateTime={news.date}>{news.date}</time>
          </div>
          <h3 className="text-lg font-bold text-[#0B1E3D] leading-snug group-hover:text-[#1E63D6] transition-colors font-heading">
            {news.title}
          </h3>
          <p className="text-sm text-[#64748B] line-clamp-3 leading-relaxed">
            {news.excerpt}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <Link
            href={news.href}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1E63D6] hover:text-[#1551B5] transition-colors group/link"
          >
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
