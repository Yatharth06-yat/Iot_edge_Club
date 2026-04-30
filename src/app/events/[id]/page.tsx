

import { eventsData } from "@/lib/eventsData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetails({ params }: PageProps) {
  const { id } = await params;
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0e17] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/#events" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Events
        </Link>
        
        {/* Event Banner */}
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200"
            alt={event.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block ${
              event.category === 'Upcoming' ? 'bg-blue-600' : 'bg-green-600'
            }`}>
              {event.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{event.title}</h1>
          </div>
        </div>

        {/* Event Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About the Event</h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
              {event.longDescription || event.description}
            </div>
          </div>

          {/* Event Details Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Event Details</h3>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.date || "4 April 2026"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.time || "11 AM Onwards"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.location || "College Campus"}</p>
                </div>
              </div>
              
              {/* Register Button */}
              {event.category === 'Upcoming' && (
                <button className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/30">
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Past Event Image Gallery */}
        {event.category === "Previous" && (
          <div className="mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                📸
              </span>
              Event Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['IMG_6505.jpg', 'IMG_6496.jpg', 'IMG_6497.jpg', 'IMG_6499.jpg', 'IMG_6500.jpg', 'IMG_6502.jpg'].map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-white/10 group cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 transition-all">
                  <img
                    src={`/assets/past-img/${img}`}
                    alt="Event moment"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View Moment
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}