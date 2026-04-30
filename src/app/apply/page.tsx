"use client";

import { useState } from "react";
import { ArrowLeft, Send, CheckCircle2, User, Mail, GraduationCap, Github, Trophy } from "lucide-react";
import Link from "next/link";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "1st Year",
    github: "",
    reason: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-iot-light dark:bg-iot-dark flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white dark:bg-iot-surface p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Application Received!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for applying to the IoT Edge Club. Our team will review your application and contact you via email soon.
          </p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 bg-iot-green text-white font-bold rounded-full hover:bg-iot-green-dark transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-iot-light dark:bg-iot-dark py-12 px-6">
      
      {/* ── NAVIGATION ── */}
      <div className="max-w-3xl mx-auto mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-iot-green transition-colors"
        >
          <ArrowLeft size={16} /> Back to Hub
        </Link>
      </div>

      {/* ── FORM CARD ── */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-iot-surface rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        
        {/* Header Overlay */}
        <div className="bg-gradient-to-r from-iot-green to-iot-green-dark p-10 md:p-14 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Join the Edge.</h1>
          <p className="text-blue-100 text-lg max-w-md">
            Be part of the most innovative IoT community at MITS. Build real systems, solve real problems.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Full Name
              </label>
              <input 
                required
                type="text"
                placeholder="Yatharth Gupta"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-iot-green focus:ring-2 focus:ring-iot-green/20 transition-all outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> Official Email
              </label>
              <input 
                required
                type="email"
                placeholder="example@mitsgwalior.in"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-iot-green focus:ring-2 focus:ring-iot-green/20 transition-all outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap size={14} /> Branch
              </label>
              <input 
                required
                type="text"
                placeholder="Internet of Things (IoT)"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-iot-green focus:ring-2 focus:ring-iot-green/20 transition-all outline-none"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Trophy size={14} /> Current Year
              </label>
              <select 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-iot-green focus:ring-2 focus:ring-iot-green/20 transition-all outline-none appearance-none"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>

          {/* GitHub Profile */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Github size={14} /> GitHub Profile URL
            </label>
            <input 
              type="url"
              placeholder="https://github.com/yourusername"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-iot-green focus:ring-2 focus:ring-iot-green/20 transition-all outline-none"
              value={formData.github}
              onChange={(e) => setFormData({...formData, github: e.target.value})}
            />
          </div>

          {/* Why join? */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Why do you want to join IoT Edge Club?
            </label>
            <textarea 
              required
              rows={4}
              placeholder="Tell us about your interests in IoT, Embedded Systems, or Web Dev..."
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-iot-green focus:ring-2 focus:ring-iot-green/20 transition-all outline-none resize-none"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-5 bg-iot-green text-white font-extrabold text-xl rounded-2xl shadow-xl hover:bg-iot-green-dark hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
          >
            Submit Application <Send size={20} />
          </button>

          <p className="text-center text-xs text-gray-400">
            By submitting, you agree to follow the club's code of conduct and participate actively in club events.
          </p>

        </form>
      </div>
    </div>
  );
}
