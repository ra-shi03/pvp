import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DeliveryMapModal from "@food/components/user/DeliveryMapModal"
import DeliveryOrCollectionModal from "@food/components/user/DeliveryOrCollectionModal"
import TakeawayMapModal from "@food/components/user/TakeawayMapModal"
import DeliverOnTrainModal from "@food/components/user/DeliverOnTrainModal"
import OrderDetailsFlow from "@food/pages/user/orders/OrderDetailsFlow"
import { useLocationStore } from "@food/store/locationStore"
import { useLocationGuard } from "@food/hooks/useLocationGuard"
import logoNew from "@/assets/logo1.png"
const PRODUCTS = [
  {
    id: "margherita-supreme",
    title: "Margherita Supreme",
    price: 299,
    rating: 4.9,
    description: "Buffalo mozzarella, San Marzano tomatoes, fresh basil.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBluz4eCNAilJO6yR3_OFzJkONQMKo9XRScol5o2w_wqSUPMQDImok1wr4UrTbZd0tDM7eicy98AOUq9ORUm23pi_z6uJuyeKQ3_tMtGkycxVZqFNywk1nb7d0RmEboytoVC-L__LD3BvG4JNTz3ZyFOnr8AyX-1ztogKmbBa3797PAAs2KoxmP2fFsZ_kMnaS2D-lsv6J0g5sQojmKXNF9d470loeENjh89lAF_TJu4TG-lB2oxnC2s56TPYL6h1CjXGleROU_bDPc",
    category: "pizza"
  },
  {
    id: "farmhouse-delight",
    title: "Farmhouse Delight",
    price: 349,
    rating: 4.8,
    description: "Mushrooms, onions, peppers, and sweet corn.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Rib9mlrsig1haXvSfhY1zS2NGAIwUFig_-dDDTjQXBRJ_hdwzvKhvSs4X_KczL-USNdycC0vnIVox-Oyrmt5zbOdPneq43yDpJwEWYB3CSCU5gL7rFmEitcAS-QChuUXgeCi6WJcn32uqxZfLupJCZNO4YVg04lB8Y1JIsHt8L0bgON_2RuBMVL02rBMhN5haheBGgLGmqbDG4wUP7bqztn0gWQKQQedaHRRZ14BMbnbI7P9oZaCYPYkXEol9_8DJ3BLamRCaUpO",
    category: "pizza"
  }
]

const DEALS = [
  {
    id: "deal-bogo",
    badge: "Bestseller",
    title: "BOGO: Any Medium Pizza",
    description: "Buy 1 Get 1 Free on all medium signature pizzas.",
    badgeColor: "bg-primary text-on-primary"
  },
  {
    id: "deal-feast",
    badge: "Value",
    title: "Family Feast Combo",
    description: "2 Large Pizzas + Garlic Bread + 2L Coke.",
    badgeColor: "bg-tertiary text-on-tertiary"
  },
  {
    id: "deal-student",
    badge: "Hot",
    title: "Student Special",
    description: "Flat 25% Off on presenting valid student ID.",
    badgeColor: "bg-primary-container text-on-primary-container"
  }
]

export default function Home() {
  const navigate = useNavigate()
  const { isModalOpen, closeLocationModal, confirmLocation, locationConfirmed } = useLocationStore()
  const checkLocation = useLocationGuard()

  // App States
  const [activeService, setActiveService] = useState(localStorage.getItem("activeService") || "delivery")
  const [activeCategory, setActiveCategory] = useState("pizza")
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("userCart") || "{}")
    if (Object.keys(storedCart).length > 0) return storedCart
    return {
      "margherita-supreme": 1,
      "farmhouse-delight": 1
    }
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("appTheme")
    return savedTheme ? savedTheme === "dark" : true
  })
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
      localStorage.setItem("appTheme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("appTheme", "light")
    }
  }, [isDarkMode])

  const [activeSlide, setActiveSlide] = useState(0)

  // Map & Store Modal States
  const [showMapModal, setShowMapModal] = useState(false)
  const [showServiceSelector, setShowServiceSelector] = useState(false)
  const [showStoreModal, setShowStoreModal] = useState(false)
  const [showCarModal, setShowCarModal] = useState(false)
  const [showTrainModal, setShowTrainModal] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    return locationConfirmed ? (localStorage.getItem("deliveryAddress") || "") : ""
  })
  const [takeawayHut, setTakeawayHut] = useState(() => {
    return locationConfirmed ? (localStorage.getItem("takeawayHut") || "") : ""
  })
  const [carNumber, setCarNumber] = useState(() => {
    return locationConfirmed ? (localStorage.getItem("carNumber") || "") : ""
  })

  // Sync local location state with global location confirmation changes
  useEffect(() => {
    if (locationConfirmed) {
      setDeliveryAddress(localStorage.getItem("deliveryAddress") || "")
      setTakeawayHut(localStorage.getItem("takeawayHut") || "")
      setCarNumber(localStorage.getItem("carNumber") || "")
    } else {
      setDeliveryAddress("")
      setTakeawayHut("")
      setCarNumber("")
    }
  }, [locationConfirmed])

  // Redirect to welcome screen if not visited yet and guest
  useEffect(() => {
    const welcomeShown = localStorage.getItem("papa_veg_welcome_shown")
    const isAuthenticated = localStorage.getItem("user_authenticated") === "true" || !!localStorage.getItem("user_accessToken")
    if (!welcomeShown && !isAuthenticated) {
      navigate("/welcome")
    }
  }, [navigate])

  // Sync global location modal open state with local modal trigger
  useEffect(() => {
    if (isModalOpen) {
      setShowServiceSelector(true)
    } else {
      setShowServiceSelector(false)
    }
  }, [isModalOpen])

  // Save and Restore Scroll Position
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("homeScrollPosition")
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: "auto" })
      }, 100)
    }

    const handleScroll = () => {
      sessionStorage.setItem("homeScrollPosition", window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sync cart from localStorage dynamically
  useEffect(() => {
    const handleCartSync = () => {
      const storedCart = JSON.parse(localStorage.getItem("userCart") || "{}")
      if (Object.keys(storedCart).length > 0) {
        setCart(storedCart)
      }
    }
    window.addEventListener("cartUpdated", handleCartSync)
    return () => window.removeEventListener("cartUpdated", handleCartSync)
  }, [])

  // Custom Toast State
  const [toast, setToast] = useState({ visible: false, message: "" })

  const triggerToast = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => {
      setToast({ visible: false, message: "" })
    }, 2500)
  }

  // Load Google Fonts and Material Icons dynamically
  useEffect(() => {
    const linkFonts = document.createElement("link")
    linkFonts.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap"
    linkFonts.rel = "stylesheet"
    document.head.appendChild(linkFonts)

    const linkIcons = document.createElement("link")
    linkIcons.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    linkIcons.rel = "stylesheet"
    document.head.appendChild(linkIcons)

    return () => {
      document.head.removeChild(linkFonts)
      document.head.removeChild(linkIcons)
    }
  }, [])

  // Auto-play Slide loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Handle active states
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id))
      triggerToast("Removed from favorites")
    } else {
      setFavorites([...favorites, id])
      triggerToast("Added to favorites!")
    }
  }

  // Cart operations
  const addToCart = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
    triggerToast("Added to basket!")
  }

  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className={`min-h-screen flex justify-center transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-gray-100"}`}>
      <div className={`page-wrapper w-full max-w-md min-h-screen font-body-md text-body-md overflow-x-hidden pb-32 relative shadow-2xl border-x ${isDarkMode ? "border-zinc-800/40" : "border-gray-200/50"
        }`}>
        {/* Dynamic CSS Styling Injector to guarantee exact alignment */}
        <style dangerouslySetInnerHTML={{
          __html: `
        .page-wrapper {
          background: ${isDarkMode ? "#111111" : "radial-gradient(circle at top left, #FFF4F3 0%, #FFFDFD 40%, #FFF9F7 80%, #FFFFFF 100%)"} !important;
          color: ${isDarkMode ? "#e5e2e1" : "#1c1b1b"} !important;
        }
        .glass-card {
          background: ${isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.75)"} !important;
          backdrop-filter: blur(24px) !important;
          border: 1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(229, 57, 53, 0.08)"} !important;
          box-shadow: ${isDarkMode ? "none" : "0 10px 30px -4px rgba(229, 57, 53, 0.04), 0 4px 12px -2px rgba(0, 0, 0, 0.01)"} !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .glass-card:hover {
          box-shadow: ${isDarkMode ? "0 4px 20px rgba(0,0,0,0.4)" : "0 16px 35px -4px rgba(229, 57, 53, 0.08), 0 8px 16px -2px rgba(0, 0, 0, 0.02)"} !important;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none !important; }
        .hide-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .active-nav-glow { box-shadow: 0 0 15px rgba(229, 57, 53, 0.3) !important; }
        .carousel-track { transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important; }
        
        /* Font Families */
        .font-headline-lg-mobile, .font-headline-lg, .font-display-lg {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        .font-body-md, .font-label-sm, .font-price-xl {
          font-family: 'Inter', sans-serif !important;
        }
        
        /* Font Sizes & Sizing Styles */
        .text-headline-lg-mobile {
          font-size: 28px !important;
          line-height: 34px !important;
          font-weight: 800 !important;
          letter-spacing: -0.02em !important;
        }
        .text-headline-lg {
          font-size: 32px !important;
          line-height: 40px !important;
          letter-spacing: -0.01em !important;
          font-weight: 800 !important;
        }
        .text-display-lg {
          font-size: 40px !important;
          line-height: 48px !important;
          letter-spacing: -0.02em !important;
          font-weight: 800 !important;
        }
        .text-body-md {
          font-size: 16px !important;
          line-height: 24px !important;
          font-weight: 400 !important;
        }
        .text-label-sm {
          font-size: 12px !important;
          line-height: 16px !important;
          letter-spacing: 0.05em !important;
          font-weight: 600 !important;
        }
        .text-price-xl {
          font-size: 24px !important;
          line-height: 24px !important;
          letter-spacing: -0.01em !important;
          font-weight: 700 !important;
        }
        .px-margin-mobile {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        .p-margin-mobile {
          padding: 20px !important;
        }
        .right-margin-mobile {
          right: 20px !important;
        }
        .gap-gutter {
          gap: 16px !important;
        }
        .space-y-lg > :not([hidden]) ~ :not([hidden]) {
          margin-top: 24px !important;
        }
        .p-md {
          padding: 16px !important;
        }
        .p-lg {
          padding: 24px !important;
        }
        .gap-xs {
          gap: 8px !important;
        }
        .gap-sm {
          gap: 12px !important;
        }
        .mb-xs {
          margin-bottom: 8px !important;
        }
        .mb-md {
          margin-bottom: 16px !important;
        }
        .bg-surface\/80 {
          background-color: ${isDarkMode ? "rgba(19, 19, 19, 0.8)" : "rgba(255, 255, 255, 0.82)"} !important;
          backdrop-filter: blur(20px) !important;
        }
        .bg-surface {
          background-color: ${isDarkMode ? "#131313" : "#ffffff"} !important;
        }
        .text-primary {
          color: #E53935 !important;
        }
        .bg-primary {
          background-color: #E53935 !important;
        }
        .text-secondary {
          color: #FF6B35 !important;
        }
        .bg-secondary {
          background-color: #FF6B35 !important;
        }
        .bg-tertiary {
          background-color: #3ce36a !important;
        }
        .text-tertiary {
          color: #3ce36a !important;
        }
        .text-on-primary {
          color: #ffffff !important;
        }
        .text-on-secondary {
          color: #ffffff !important;
        }
        .text-on-tertiary {
          color: #000000 !important;
        }
        .bg-primary-container {
          background-color: #ff544c !important;
        }
        .text-on-primary-container {
          color: #5c0005 !important;
        }
        .text-on-surface-variant {
          color: ${isDarkMode ? "#e4beb9" : "#4b5563"} !important;
        }
        .border-primary\/20 {
          border-color: ${isDarkMode ? "rgba(229, 57, 53, 0.2)" : "rgba(229, 57, 53, 0.1)"} !important;
        }
        .border-primary {
          border-color: #E53935 !important;
        }
        .border-white\/10 {
          border-color: ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(229, 57, 53, 0.08)"} !important;
        }
        .border-white\/12 {
          border-color: ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(229, 57, 53, 0.1)"} !important;
        }
        .bg-white\/5 {
          background-color: ${isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(229, 57, 53, 0.03)"} !important;
        }
        .text-white\/70 {
          color: ${isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(19, 19, 19, 0.7)"} !important;
        }
        .text-white\/50 {
          color: ${isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(19, 19, 19, 0.5)"} !important;
        }
        .bg-black\/40 {
          background-color: ${isDarkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.5)"} !important;
        }
        `
        }} />

        {/* Custom Toast Alert */}
        {toast.visible && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-55 bg-[#E53935] text-white px-6 py-3 rounded-full shadow-2xl glass-card font-label-sm text-xs border border-white/20 animate-bounce">
            {toast.message}
          </div>
        )}

        {/* TopAppBar */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-surface/80 backdrop-blur-xl dark:bg-surface/80 border-b border-white/10 shadow-sm h-16 flex items-center justify-between px-margin-mobile">
          <div className="w-10"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <img
              src={logoNew}
              alt="Papa Veg Pizza Logo"
              className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode)
              triggerToast(isDarkMode ? "Switched to Light mode" : "Switched to Dark mode")
            }}
            className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity active:scale-95 cursor-pointer bg-transparent border-0 outline-none"
          >
            {isDarkMode ? "light_mode" : "dark_mode"}
          </button>
        </header>

        {/* Main Content */}
        <main className="mt-16 space-y-lg">
          {/* Hero Banner Carousel */}
          <section className="relative w-full h-[240px] overflow-hidden">
            <div className="carousel-track flex h-full" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {/* Slide 1: Paneer Volcano */}
              <div className="min-w-full h-full relative group">
                <img className="w-full h-full object-cover" alt="A macro close-up of a Paneer Volcano pizza" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAJ1H7kfpIOVMST01cGdHOPK9zctqfPYuepo56-9Xt8VrjDotL945EWt6kVO8vNRM6ZK05zTPtpbInlC7BZrM6lBerNPa7UpA5DOzn1haf6-X4-TAanChNFzPI_Z6swWdt8jQnNq15ghwIv45L3x3XQnOvikSqpnRcI0TTf4czhHBPzZ-TfCC56kA2jx9m7t4XshJq08a_j1JyJAAyLP-ZS-8LGBejGgSyxcu3_N-t3KtKJjAOXBRaK9jKvwOU8KYa0JFB0wV1eQk2" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-margin-mobile">
                  <span className="text-secondary font-label-sm uppercase tracking-widest mb-1">New Arrival</span>
                  <h2 className="font-headline-lg-mobile text-white">Paneer Volcano</h2>
                </div>
              </div>
              {/* Slide 2: BOGO */}
              <div className="min-w-full h-full relative group">
                <img className="w-full h-full object-cover" alt="Two premium pizzas side-by-side" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhuBxF93NgpKNex48f17LImalRGfdBdZZqdLlNVab_K797rBPt0Qh41WKGhgBUY6BX_bguMlz7KB3zhPf89Rb5oW64QUft3d_e82SxwKnTaFUsozTWPHo6vjRJCZN72RrObT3u1FDquXmxIKDfadJDBh5XbyhXZ_DIZSk9oFll3KyAH08_2eo65-hOmzFFodulfl8DgB-vAiO7mZrjtsLHVOxzjYiVoALoG-MuCzQKaQPFXhiXSdpE_9bap7jwEFN7pqFbEtDXGEui" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-margin-mobile">
                  <span className="text-primary font-label-sm uppercase tracking-widest mb-1">Limited Offer</span>
                  <h2 className="font-headline-lg-mobile text-white">BOGO: Double Joy</h2>
                </div>
              </div>
            </div>
            {/* Indicators */}
            <div className="absolute bottom-4 right-margin-mobile flex gap-2">
              <div className={`h-1 rounded-full transition-all duration-300 ${activeSlide === 0 ? "w-8 bg-primary" : "w-2 bg-white/30"}`}></div>
              <div className={`h-1 rounded-full transition-all duration-300 ${activeSlide === 1 ? "w-8 bg-primary" : "w-2 bg-white/30"}`}></div>
            </div>
          </section>

          {/* Order Details Flow (Confirmation Bar) */}
          {locationConfirmed && activeService === "delivery" && (
            <OrderDetailsFlow
              confirmedAddress={deliveryAddress}
              onOpenMap={() => setShowMapModal(true)}
              onClearCart={() => setCart({})}
              isDarkMode={isDarkMode}
              triggerToast={triggerToast}
            />
          )}

          {/* Delivery/Takeaway Toggle */}
          <section className="px-margin-mobile grid grid-cols-2 gap-gutter">
            {[
              { id: "delivery", label: "Delivery", icon: "moped" },
              { id: "takeaway", label: "Takeaway", icon: "store" },
              { id: "incar", label: "In-Car", icon: "directions_car" },
              { id: "train", label: "Delivery on Train", icon: "train" }
            ].map((service) => {
              const isSelected = activeService === service.id
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    if (service.id === "delivery") {
                      setShowMapModal(true)
                    } else if (service.id === "takeaway") {
                      setShowStoreModal(true)
                    } else if (service.id === "incar") {
                      setShowCarModal(true)
                    } else if (service.id === "train") {
                      setShowTrainModal(true)
                    } else {
                      setActiveService(service.id)
                      localStorage.setItem("activeService", service.id)
                      triggerToast(`Switched to ${service.label}`)
                    }
                  }}
                  className={`glass-card rounded-2xl p-md flex flex-col items-center justify-center gap-xs active:scale-95 transition-all duration-300 cursor-pointer border ${isSelected
                    ? "border-[#E53935]/40 shadow-lg shadow-[#E53935]/8 scale-[1.03]"
                    : "border-black/5 dark:border-white/5 hover:border-primary/20 dark:hover:border-white/10"
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isSelected
                    ? "bg-[#E53935] text-white shadow-md shadow-[#E53935]/20"
                    : "bg-[#131313]/5 dark:bg-white/5 text-on-surface-variant"
                    }`}>
                    <span className="material-symbols-outlined text-[32px]">{service.icon}</span>
                  </div>
                  <span className={`font-label-sm uppercase tracking-wider text-xs ${isSelected ? "text-[#E53935] font-extrabold" : "opacity-70 font-semibold"
                    }`}>{service.label}</span>
                  {service.id === "delivery" && (
                    <span className={`text-[10px] opacity-60 line-clamp-1 max-w-[120px] text-center mt-0.5 font-medium ${isSelected ? "text-primary/95" : ""}`}>
                      {locationConfirmed ? (deliveryAddress || "Let us know your location") : "Let us know your location"}
                    </span>
                  )}
                  {service.id === "takeaway" && takeawayHut && (
                    <span className={`text-[10px] opacity-60 line-clamp-1 max-w-[120px] text-center mt-0.5 font-medium ${isSelected ? "text-primary/95" : ""}`}>{takeawayHut}</span>
                  )}
                  {service.id === "incar" && carNumber && (
                    <span className={`text-[10px] opacity-60 line-clamp-1 max-w-[120px] text-center mt-0.5 font-medium ${isSelected ? "text-primary/95" : ""}`}>{carNumber}</span>
                  )}
                </div>
              )
            })}
          </section>

          {/* Hot Deals Section */}
          <section>
            <div className="px-margin-mobile flex justify-between items-end mb-md">
              <h3 className={`font-headline-lg-mobile ${isDarkMode ? "text-white" : "text-[#131313]"}`}>Hot Deals</h3>
              <button
                onClick={() => {
                  checkLocation(() => {
                    navigate("/user/deals");
                    triggerToast("Opening hot deals...");
                  });
                }}
                className="text-primary font-label-sm flex items-center gap-1 cursor-pointer hover:opacity-80 bg-transparent border-0 outline-none"
              >
                View Deals
              </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-gutter px-margin-mobile">
              {DEALS.map((deal) => (
                <div key={deal.id} className="min-w-[240px] glass-card rounded-xl overflow-hidden relative">
                  <div className={`absolute top-3 left-3 px-2 rounded-full text-[10px] font-bold uppercase z-10 text-white ${deal.badgeColor}`}>
                    {deal.badge}
                  </div>
                  <div className="px-[16px] pb-[16px] pt-[40px] flex flex-col justify-between h-full">
                    <div className="space-y-1 mb-md">
                      <h4 className={`font-headline-lg-mobile text-lg leading-tight mb-xs ${isDarkMode ? "text-white" : "text-[#131313]"}`}>{deal.title}</h4>
                      <p className="text-sm opacity-60 leading-snug">{deal.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        checkLocation(() => {
                          triggerToast("Deal claimed successfully!");
                        });
                      }}
                      className="w-full h-12 bg-primary text-on-primary rounded-lg font-bold text-xs tracking-wider uppercase cursor-pointer hover:bg-red-700 transition-colors"
                    >
                      Claim Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Menu Categories */}
          <section>
            <div className="px-margin-mobile flex justify-between items-end mb-md">
              <h3 className={`font-headline-lg-mobile ${isDarkMode ? "text-white" : "text-[#131313]"}`}>Menus</h3>
              <button
                onClick={() => {
                  navigate("/user/menu")
                  triggerToast("Opening Menu List...")
                }}
                className="text-primary font-label-sm flex items-center gap-1 cursor-pointer hover:opacity-80 bg-transparent border-0 outline-none"
              >
                View Menu
              </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-sm px-margin-mobile">
              {[
                { id: "pizza", label: "Pizza", icon: "local_pizza" },
                { id: "burger", label: "Burger", icon: "lunch_dining" },
                { id: "bread", label: "Bread", icon: "bakery_dining" },
                { id: "pasta", label: "Pasta", icon: "dinner_dining" },
                { id: "desserts", label: "Desserts", icon: "icecream" },
                { id: "drinks", label: "Drinks", icon: "local_drink" }
              ].map((cat) => {
                const isSelected = activeCategory === cat.id
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      navigate("/user/menu", { state: { category: cat.id } })
                      triggerToast(`Opening Menu - ${cat.label}`)
                    }}
                    className="flex flex-col items-center gap-xs min-w-[70px] cursor-pointer group"
                  >
                    <div className={`w-16 h-16 rounded-full glass-card flex items-center justify-center transition-all duration-300 ${isSelected
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105 border-transparent"
                      : "text-on-surface-variant hover:border-primary/30 hover:scale-105"
                      }`}>
                      <span className="material-symbols-outlined">{cat.icon}</span>
                    </div>
                    <span className={`font-label-sm transition-colors duration-300 ${isSelected ? "text-primary font-bold" : "opacity-60 group-hover:text-primary"}`}>{cat.label}</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Most Loved Pizzas */}
          <section>
            <div className="px-margin-mobile mb-md">
              <h3 className={`font-headline-lg-mobile ${isDarkMode ? "text-white" : "text-[#131313]"}`}>Most Loved</h3>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-gutter px-margin-mobile pb-4">
              {PRODUCTS.map((product) => {
                const isFav = favorites.includes(product.id)
                return (
                  <div key={product.id} className="min-w-[280px] glass-card rounded-2xl overflow-hidden group relative">
                    <div className="relative h-48 overflow-hidden bg-zinc-900">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={product.title}
                        src={product.image}
                      />
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2 text-primary cursor-pointer active:scale-90 transition-transform"
                      >
                        <span className="material-symbols-outlined fill" style={{ fontVariationSettings: ` 'FILL' ${isFav ? 1 : 0} ` }}>
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="p-md">
                      <div className="flex justify-between items-start mb-xs">
                        <h4 className={`font-headline-lg-mobile text-xl ${isDarkMode ? "text-white" : "text-[#131313]"}`}>{product.title}</h4>
                        <div className="flex items-center gap-1 text-secondary">
                          <span className="material-symbols-outlined text-sm fill" style={{ fontVariationSettings: " 'FILL' 1 " }}>star</span>
                          <span className="font-label-sm">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-60 line-clamp-1 mb-md leading-relaxed">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-price-xl text-primary">₹{product.price}</span>
                        <button
                          onClick={() => checkLocation(() => addToCart(product.id))}
                          className="h-10 px-6 bg-primary text-on-primary rounded-full font-bold active:scale-95 hover:bg-red-700 transition-all cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Fresh Ingredients */}
          <section className="px-margin-mobile">
            <div className={`rounded-3xl p-lg flex items-center justify-between overflow-hidden relative border ${isDarkMode
              ? "glass-card"
              : "bg-gradient-to-br from-[#FFF5F4] to-[#FFF0EF] border-[#E53935]/15 shadow-md shadow-[#E53935]/4"
              }`}>
              <div className="z-10 relative">
                <h3 className={`font-headline-lg-mobile mb-xs ${isDarkMode ? "text-white" : "text-[#131313]"}`}>Fresh Every Day</h3>
                <p className={`text-sm opacity-70 max-w-[180px] leading-relaxed ${isDarkMode ? "text-white" : "text-[#131313]"}`}>We use only organic, farm-fresh ingredients for every slice.</p>
              </div>
              <img
                className="w-24 h-24 object-contain absolute -right-2 top-1/2 -translate-y-1/2 rotate-12 opacity-80"
                alt="Artistic composition of fresh pizza ingredients"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1OEevU-AMD-LJYtmmUO8f5cPZOOwP27nnnprt609tr-eBMiasAVzva-eAXdhfwQY7tK7Xgg5R0BHy0w-eGZW9kVqF3dGZDXkS_2vyUl8J6qH8acyu16XScqO6ZrPCmGXSfO6c_8ekCjNHuv7n4dGgaCqasfj8IGqDCofCk882RgeDO5By7o4YueW5s1bJXaOjmYQ9JscQ9bIlNkTfdR0xZz2KfAENhcrnWxlgDy9acrKF6ZMgVxRZJqeZOUz2NJRDxMhXqdJ7nJOk"
              />
            </div>
          </section>
        </main>

        {/* Floating Action Button */}
        {totalCartCount > 0 && locationConfirmed && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md pointer-events-none z-45">
            <button
              onClick={() => {
                navigate("/user/cart")
                triggerToast("Opening your cart...")
              }}
              className="absolute right-4 pointer-events-auto w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_0_20px_rgba(229,57,53,0.4)] flex items-center justify-center active:scale-95 transition-transform cursor-pointer relative"
            >
              <span className="material-symbols-outlined text-[28px]">shopping_basket</span>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white text-on-primary-container rounded-full text-[10px] font-bold flex items-center justify-center border border-primary animate-bounce">
                {totalCartCount}
              </div>
            </button>
          </div>
        )}

        {/* BottomNavBar */}
        <nav className="fixed -bottom-[2px] left-1/2 -translate-x-1/2 w-full max-w-md z-50 rounded-t-xl bg-surface/80 backdrop-blur-xl dark:bg-surface/80 border-t border-white/10 shadow-lg flex justify-around items-center h-[82px] pb-[2px] m-0">
          <button
            onClick={() => {
              if (window.location.pathname === "/user" || window.location.pathname === "/user/") {
                window.scrollTo({ top: 0, behavior: "smooth" })
              } else {
                navigate("/user")
              }
              triggerToast("Opening Home")
            }}
            className="flex flex-col items-center justify-center text-primary dark:text-primary transition-all duration-300 active:scale-90 font-label-sm text-label-sm cursor-pointer bg-transparent border-0 outline-none"
          >
            <span className="material-symbols-outlined fill" style={{ fontVariationSettings: " 'FILL' 1 " }}>home</span>
            <span className="">Home</span>
          </button>
          <button
            onClick={() => {
              navigate("/user/menu")
              triggerToast("Opening Menu")
            }}
            className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 font-label-sm text-label-sm cursor-pointer bg-transparent border-0 outline-none ${isDarkMode
              ? "text-on-surface-variant opacity-60"
              : "text-[#1c1b1b] opacity-60 hover:text-primary hover:opacity-100"
              }`}
          >
            <span className="material-symbols-outlined">restaurant_menu</span>
            <span className="">Menu</span>
          </button>
          <button
            onClick={() => {
              navigate("/user/account")
              triggerToast("Opening Account")
            }}
            className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 font-label-sm text-label-sm active:scale-90 transition-transform cursor-pointer bg-transparent border-0 outline-none ${isDarkMode
              ? "text-on-surface-variant opacity-60 animate-none"
              : "text-[#1c1b1b] opacity-60 hover:text-primary hover:opacity-100"
              }`}
          >
            <span className="material-symbols-outlined">person</span>
            <span className="">Account</span>
          </button>
        </nav>

        {/* Delivery Map Modal Selector */}
        <DeliveryMapModal
          show={showMapModal}
          onClose={() => setShowMapModal(false)}
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          setActiveService={setActiveService}
          triggerToast={triggerToast}
          isDarkMode={isDarkMode}
        />

        {/* Delivery or Collection Selection Modal */}
        <DeliveryOrCollectionModal
          show={showServiceSelector}
          onClose={() => {
            setShowServiceSelector(false)
            if (isModalOpen) closeLocationModal()
          }}
          onSelect={(id) => {
            if (id === "delivery") {
              if (!deliveryAddress) {
                setDeliveryAddress("Joshi Colony, Bk Sindhi Colony, Indore, Indore")
              }
              setShowMapModal(true)
            } else if (id === "takeaway") {
              setShowStoreModal(true)
            } else if (id === "incar") {
              setShowCarModal(true)
            } else if (id === "train") {
              setShowTrainModal(true)
            }
          }}
          isDarkMode={isDarkMode}
        />
        {/* Takeaway Map Modal Selector */}
        <TakeawayMapModal
          show={showStoreModal}
          onClose={() => setShowStoreModal(false)}
          takeawayHut={takeawayHut}
          setTakeawayHut={setTakeawayHut}
          setActiveService={setActiveService}
          triggerToast={triggerToast}
          isDarkMode={isDarkMode}
          confirmedAddress={deliveryAddress}
        />

        {/* In-Car Details Modal */}
        {showCarModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm dark">
            <div className="w-full max-w-sm glass-card rounded-3xl p-6 space-y-4 text-left">
              <div className="flex justify-between items-center">
                <h3 className="font-headline-lg-mobile text-lg text-white">In-Car Dining</h3>
                <button
                  onClick={() => setShowCarModal(false)}
                  className="material-symbols-outlined text-white/50 hover:text-white cursor-pointer bg-transparent border-0 outline-none"
                >
                  close
                </button>
              </div>
              <p className="text-xs opacity-60 leading-relaxed text-white">
                Please enter your car number or vehicle registration details so we can deliver your hot pizza straight to your window:
              </p>

              {/* Input field */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-white">Car Number</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. DL 3C AB 1234"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                    className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-bold text-white outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">
                    directions_car
                  </span>
                </div>
              </div>

              {/* Confirm button */}
              <button
                onClick={() => {
                  const cleanCar = carNumber.trim()
                  if (!cleanCar) {
                    triggerToast("Please enter a valid car number")
                    return
                  }
                  setCarNumber(cleanCar)
                  confirmLocation({
                    address: cleanCar,
                    serviceType: "incar"
                  })
                  setShowCarModal(false)
                  triggerToast("Car details confirmed!")
                }}
                className="w-full h-11 bg-primary text-on-primary font-bold rounded-xl text-xs uppercase cursor-pointer border-0 shadow-lg active:scale-95 transition-all"
              >
                Confirm Vehicle
              </button>
            </div>
          </div>
        )}

        {/* Deliver on Train Modal */}
        <DeliverOnTrainModal
          show={showTrainModal}
          onClose={() => setShowTrainModal(false)}
        />
      </div>
    </div>
  )
}
