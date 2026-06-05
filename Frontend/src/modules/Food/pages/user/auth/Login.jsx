import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "@food/components/user/Header"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [toast, setToast] = useState({ visible: false, message: "" })

  const triggerToast = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => {
      setToast({ visible: false, message: "" })
    }, 2500)
  }

  // Sync theme with local storage/document class
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || localStorage.getItem("appTheme") === "dark"
    setIsDarkMode(isDark)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (phoneNumber.trim().length < 10) {
      triggerToast("Please enter a valid 10-digit phone number")
      return
    }
    triggerToast("Sending OTP to " + phoneNumber + "...")
    // Simulate successful login after 1s
    setTimeout(() => {
      localStorage.setItem("user_authenticated", "true")
      localStorage.setItem("user_phone", phoneNumber)
      triggerToast("Login successful!")
      navigate("/account")
    }, 1500)
  }

  return (
    <div
      className={`font-body-md text-body-md min-h-screen pb-20 overflow-x-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
      style={{ backgroundColor: isDarkMode ? "#111111" : "#fbf9f8", color: isDarkMode ? "#e5e2e1" : "#1c1b1b" }}
    >
      {/* Dynamic CSS Injector */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
          background-color: ${isDarkMode ? "rgba(19, 19, 19, 0.8)" : "rgba(255, 255, 255, 0.8)"} !important;
        }
        .bg-surface {
          background-color: ${isDarkMode ? "#131313" : "#ffffff"} !important;
        }
        .glass-card {
          background: ${isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.9)"} !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.06)"} !important;
        }
      ` }} />

      {/* Custom Toast Alert */}
      {toast.visible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-55 bg-[#E53935] text-white px-6 py-3 rounded-full shadow-2xl glass-card font-label-sm text-xs border border-white/20 animate-bounce">
          {toast.message}
        </div>
      )}

      {/* Header */}
      <Header
        showBack={true}
        onBack={() => navigate(location.state?.from || "/welcome")}
        showThemeToggle={false}
        showCart={false}
      />

      {/* Login Screen UX Content */}
      <main className="flex-1 flex flex-col justify-start p-8 mt-20 max-w-md mx-auto w-full space-y-6">

        {/* Title */}
        <h2 className="font-headline-lg-mobile text-3xl font-black text-slate-900 dark:text-white text-left tracking-tight">
          Login
        </h2>

        {/* Subtitle */}
        <p className="text-sm opacity-70 text-left leading-relaxed text-slate-600 dark:text-[#e4beb9]">
          To complete your order, see prices and exclusive deals, you'll need to Log in or Sign up here
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Phone Input Box Container */}
          <div className="flex items-center border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 bg-white dark:bg-white/5 transition-all focus-within:border-primary">
            {/* Country Flag Flag (India +91) */}
            <div className="flex items-center gap-2 pr-3 border-r border-slate-300 dark:border-white/10 select-none">
              {/* SVG representation of Indian Flag */}
              <svg className="w-6 h-4.5 rounded-sm object-cover" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                <rect width="640" height="160" fill="#f4c430" />
                <rect y="160" width="640" height="160" fill="#fff" />
                <rect y="320" width="640" height="160" fill="#090" />
                <circle cx="320" cy="240" r="40" fill="#008" />
              </svg>
              <span className="text-sm font-semibold text-slate-800 dark:text-white">+91</span>
            </div>

            {/* Input field */}
            <input
              type="tel"
              maxLength="10"
              placeholder="Enter mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              className="flex-1 pl-3 bg-transparent text-sm font-semibold outline-none border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 bg-[#E53935] hover:bg-red-700 text-white font-bold rounded-xl text-xs tracking-wider uppercase cursor-pointer active:scale-95 transition-all shadow-[0_0_15px_rgba(229,57,53,0.3)] border-0"
          >
            Login with OTP
          </button>
        </form>
      </main>
    </div>
  )
}
