"use client";
import { useState, useEffect } from "react";

const tagColors: Record<string, string> = {
  Tutorial: "bg-[#0CAFFF]/10 text-[#0CAFFF] border-[#0CAFFF]/40",
  Concept: "bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/40",
  Project: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
  Guide: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/40",
  News: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/40",
};

type Blog = {
  id: number;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
};

function getTodayKey() {
  return new Date().toISOString().split("T")[0]; // "2026-03-15"
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem("iot_blogs_cache");
    if (cached) {
      const { key, data } = JSON.parse(cached);
      if (key === getTodayKey()) {
        setBlogs(data);
        setLoading(false);
        return;
      }
    }
    generateBlogs();
  }, []);

  async function generateBlogs() {
    setLoading(true);
    setError(false);
    try {
      const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Mocked data to replace the broken Anthropic API call without an API key
      const parsed: Blog[] = [
        {
          id: 2,
          tag: "Concept",
          title: "Understanding MQTT for IoT",
          excerpt: "A deep dive into the MQTT protocol, why it is lightweight, and how it powers smart devices.",
          author: "IoT Edge Team",
          date: today,
          readTime: "6 min read",
        },
        {
          id: 3,
          tag: "Project",
          title: "Build a Smart Plant Monitor",
          excerpt: "Use soil moisture sensors and an Arduino to create a system that alerts you when your plant needs water.",
          author: "Club Member",
          date: today,
          readTime: "8 min read",
        },
        {
          id: 4,
          tag: "Guide",
          title: "Edge Computing Explained",
          excerpt: "What is edge computing and why is it becoming essential for real-time IoT applications?",
          author: "IoT Edge Team",
          date: today,
          readTime: "7 min read",
        },
        {
          id: 6,
          tag: "Tutorial",
          title: "Interfacing I2C OLED Displays",
          excerpt: "Step-by-step guide on wiring and coding a 0.96 inch OLED display with your Arduino.",
          author: "Club Member",
          date: today,
          readTime: "4 min read",
        },
      ];

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      localStorage.setItem(
        "iot_blogs_cache",
        JSON.stringify({ key: getTodayKey(), data: parsed })
      );
      setBlogs(parsed);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="blog"
      className="py-20 bg-white dark:bg-black relative overflow-hidden"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0CAFFF 1px, transparent 1px), linear-gradient(90deg, #0CAFFF 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0CAFFF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0EA5E9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-[#0CAFFF]" />
            <span className="text-[#0CAFFF] text-xs font-semibold uppercase tracking-widest">
              Knowledge Base
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Blog &amp;{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #0CAFFF, #0EA5E9)",
                  }}
                >
                  Resources
                </span>
              </h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400 text-base max-w-xl">
                Fresh IoT articles generated every day — tutorials, concepts,
                and project ideas for the community.
              </p>
            </div>
            {/* Today badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#0CAFFF]/30 bg-[#0CAFFF]/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#0CAFFF] animate-pulse" />
              <span className="text-[#0CAFFF] text-xs font-semibold">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a] p-6 space-y-4 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between">
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Could not load today's articles.
            </p>
            <button
              onClick={generateBlogs}
              className="px-5 py-2 rounded-full border border-[#0CAFFF]/40 text-[#0CAFFF] text-sm font-semibold hover:bg-[#0CAFFF]/10 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post) => (
              <article
                key={post.id}
                onMouseEnter={() => setHovered(post.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelectedBlog(post)}
                className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#0CAFFF]/50 hover:shadow-lg hover:shadow-[#0CAFFF]/10 hover:-translate-y-1"
              >
                {/* Top accent bar */}
                <div
                  className="h-[3px] w-full transition-all duration-500"
                  style={{
                    background:
                      hovered === post.id
                        ? "linear-gradient(90deg, #0CAFFF, transparent)"
                        : "transparent",
                  }}
                />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagColors[post.tag] ?? tagColors["Concept"]
                        }`}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#0CAFFF] transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-800 dark:text-white font-medium">
                        {post.author}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {post.date}
                      </span>
                    </div>
                    <span className="text-[#0CAFFF] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Read
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && !error && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={generateBlogs}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm font-semibold hover:border-[#0CAFFF]/50 hover:text-[#0CAFFF] transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Articles
            </button>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedBlog && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedBlog(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-white dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tagColors[selectedBlog.tag]}`}>
                  {selectedBlog.tag}
                </span>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {selectedBlog.title}
              </h2>

              <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-gray-300">{selectedBlog.author}</span>
                  <span>{selectedBlog.date} • {selectedBlog.readTime}</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none space-y-6">
                <p className="text-xl text-gray-600 dark:text-gray-300 italic font-medium border-l-4 border-[#0CAFFF] pl-4">
                  {selectedBlog.excerpt}
                </p>
                <div className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed text-lg">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    In the world of IoT, communication protocols like {selectedBlog.tag === "Concept" ? "MQTT" : "I2C"} are essential. They allow devices to talk to each other efficiently over restricted networks. This ensures that data flows seamlessly from sensors to the cloud.
                  </p>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-8">Key Takeaways</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Efficiency and low latency are critical in embedded systems.</li>
                    <li>Always validate sensor data before processing it in the cloud.</li>
                    <li>Security should be integrated from the hardware level up.</li>
                  </ul>
                  <p>
                    As we continue to build more connected devices, understanding these core principles will help in creating scalable and robust IoT ecosystems. Stay tuned for more deep dives into specific hardware and software implementations!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-200 dark:border-gray-800 text-center">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="px-8 py-3 bg-[#0CAFFF] text-black font-bold rounded-full hover:bg-[#38BDF8] transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}