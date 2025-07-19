"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface OperationalProps {
  lang: string;
}

export default function Operational({ lang }: OperationalProps) {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const isOpen = () => {
    const day = currentTime.getDay();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const time = hour + minute / 60;
    if (day === 6) return time >= 8 && time <= 15;
    return day >= 1 && day <= 5 && time >= 8 && time <= 17;
  };

  const localizedHref = (path: string) => `/${lang}${path}`;

  // Fungsi untuk mengambil jam operasional berdasarkan hari
  const getScheduleHours = (dayKey: string) => {
    switch (dayKey) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
        return t("common:operational.schedule.hours.weekday");
      case "saturday":
        return t("common:operational.schedule.hours.saturday");
      case "sunday":
        return t("common:operational.schedule.hours.closed");
      default:
        return t("common:operational.schedule.hours.closed");
    }
  };

  // Fungsi untuk mendapatkan index hari
  const getDayIndex = (dayKey: string) => {
    const dayMap: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
    return dayMap[dayKey];
  };

  // Dapatkan semua hari dalam urutan yang benar
  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <section
      id="Operasional"
      className="relative w-full py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <i className="ri-time-line mr-2"></i>
            {t("common:operational.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t("common:operational.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("common:operational.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Current Status Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${
                isOpen() ? "border-green-200" : "border-orange-200"
              } overflow-hidden`}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Status indicator glow */}
              <div
                className={`absolute top-0 left-0 w-full h-1 ${
                  isOpen()
                    ? "bg-gradient-to-r from-green-400 to-emerald-500"
                    : "bg-gradient-to-r from-orange-400 to-red-500"
                }`}
              />

              {/* Status icon and text */}
              <div className="text-center mb-6">
                <motion.h3
                  className={`text-2xl font-bold mb-2 ${
                    isOpen() ? "text-green-600" : "text-orange-600"
                  }`}
                  key={isOpen().toString()}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {isOpen()
                    ? t("common:operational.status.open.title")
                    : t("common:operational.status.closed.title")}
                </motion.h3>

                <p className="text-gray-600">
                  {isOpen()
                    ? t("common:operational.status.open.description")
                    : t("common:operational.status.closed.description")}
                </p>
              </div>

              {/* Live clock */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center bg-gray-50 rounded-xl px-4 py-2">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-mono text-lg font-semibold text-gray-700">
                    {currentTime.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "Asia/Jakarta",
                    })}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {t("common:operational.clock.timezone")}
                  </span>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Link
                    href={isOpen() ? localizedHref("/contact") : "#"}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isOpen()
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={
                      !isOpen() ? (e) => e.preventDefault() : undefined
                    }
                  >
                    <i className="ri-phone-line mr-2"></i>
                    {isOpen()
                      ? t("common:operational.actions.contactNow")
                      : t("common:operational.actions.outsideHours")}
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Link
                    href={localizedHref("/contact")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                  >
                    <i className="ri-mail-send-line mr-2"></i>
                    {t("common:operational.actions.sendMessage")}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Schedule Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t("common:operational.schedule.title")}
            </h3>

            {/* Weekly schedule */}
            <div className="space-y-4">
              {daysOrder.map((dayKey, index) => {
                const dayName = t(`common:operational.schedule.days.${dayKey}`);
                const hours = getScheduleHours(dayKey);
                const dayIndex = getDayIndex(dayKey);
                const isToday = dayIndex === currentTime.getDay();
                const isCurrentlyOpen = isToday && isOpen();

                return (
                  <motion.div
                    key={dayKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                      isToday
                        ? isCurrentlyOpen
                          ? "bg-green-50 border-green-200 shadow-md"
                          : "bg-orange-50 border-orange-200 shadow-md"
                        : "bg-white border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          isToday
                            ? isCurrentlyOpen
                              ? "bg-green-500 animate-pulse"
                              : "bg-orange-500"
                            : hours === t("common:operational.schedule.hours.closed")
                            ? "bg-gray-300"
                            : "bg-blue-500"
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          isToday ? "text-gray-800" : "text-gray-600"
                        }`}
                      >
                        {dayName}
                        {isToday && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {t("common:operational.schedule.today")}
                          </span>
                        )}
                      </span>
                    </div>
                    <span
                      className={`font-mono ${
                        hours === t("common:operational.schedule.hours.closed")
                          ? "text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {hours}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}