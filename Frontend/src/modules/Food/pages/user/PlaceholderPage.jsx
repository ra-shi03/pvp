import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "@food/components/user/Header"

export default function PlaceholderPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Map route pathnames to descriptive page titles
  const getPageDetails = (pathname) => {
    switch (pathname) {
      case "/track-order":
        return { title: "Track Order", icon: "local_shipping", description: "Real-time pizza tracking is cooking up! Soon you will be able to trace your order live on the map." }
      case "/faqs":
        return { title: "FAQs", icon: "help", description: "Got questions? We're assembling answers to frequently asked questions about delivery, refunds, and ordering." }
      case "/nutrition":
        return { title: "Nutrition Information", icon: "restaurant", description: "Full nutritional facts, calorie counts, and organic ingredient details will be listed here soon." }
      case "/feedback":
        return { title: "Give Feedback", icon: "rate_review", description: "Your opinion matters! Soon you will be able to submit detailed reviews of our food and service." }
      case "/rate-us":
        return { title: "Rate Us", icon: "star", description: "If you love Papa Veg Pizza, you can soon rate us directly on the store. We appreciate your support!" }
      default:
        return { title: "Feature Coming Soon", icon: "construction", description: "We are working hard to build this screen. Check back soon for updates!" }
    }
  }

  const details = getPageDetails(location.pathname)

  // Sync theme with document element or local storage
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || localStorage.getItem("appTheme") === "dark"
    setIsDarkMode(isDark)
  }, [])

  return (
    <div
      className={`font-body-md text-body-md min-h-screen pb-20 overflow-x-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
      style={{ backgroundColor: isDarkMode ? "#111111" : "#fbf9f8", color: isDarkMode ? "#e5e2e1" : "#1c1b1b" }}
    >
      {/* Dynamic CSS Styling Injector */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .glass-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
        }
        .font-headline-lg-mobile {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        .font-body-md {
          font-family: 'Inter', sans-serif !important;
        }
        .text-primary {
          color: #E53935 !important;
        }
        .bg-primary {
          background-color: #E53935 !important;
        }
        .bg-surface\\/80 {
          background-color: rgba(19, 19, 19, 0.8) !important;
        }
        .bg-surface {
          background-color: #131313 !important;
        }
      ` }} />

      {/* Header */}
      <Header
        showBack={true}
        onBack={() => navigate("/account")}
        title={details.title}
        showThemeToggle={false}
      />

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-16 max-w-md mx-auto space-y-6">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-primary text-[54px] select-none">
            {details.icon}
          </span>
        </div>

        <h2 className="font-headline-lg-mobile text-2xl font-black text-slate-900 dark:text-white mt-4">
          {details.title}
        </h2>

        <p className="text-sm opacity-70 leading-relaxed text-slate-600 dark:text-[#e4beb9] max-w-sm">
          {details.description}
        </p>

        <button
          onClick={() => navigate("/account")}
          className="px-8 h-12 bg-primary hover:bg-red-700 text-white font-bold rounded-full text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow-[0_0_12px_rgba(229,57,53,0.3)] border-0"
        >
          Back to Account
        </button>
      </main>
    </div>
  )
}
