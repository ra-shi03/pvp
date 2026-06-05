import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import DeliveryMapModal from "@food/components/user/DeliveryMapModal"
import DeliveryOrCollectionModal from "@food/components/user/DeliveryOrCollectionModal"
import { useLocationStore } from "@food/store/locationStore"
import { useLocationGuard } from "@food/hooks/useLocationGuard"
import logoNew from "@/assets/logo1.png"

const MENU_ITEMS = {
  pizzas: [
    {
      id: "fiery-schezwan",
      title: "Fiery Schezwan Veggie",
      price: 299,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
      description: "Fiery schezwan sauce, dynamic mozzarella, onions, sweet bell peppers, and fresh greens.",
      sizes: ["Oval 10in Crafted Flatz", "Personal Pan", "Medium Hand Tossed", "Large Stuffed Crust"]
    },
    {
      id: "smokey-bbq",
      title: "Smokey BBQ Veggie",
      price: 299,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&auto=format&fit=crop&q=80",
      description: "Rich smokey BBQ base, melted mozzarella, loaded red onions, golden sweet corn, and BBQ drizzle.",
      sizes: ["Oval 10in Crafted Flatz", "Personal Pan", "Medium Hand Tossed", "Large Stuffed Crust"]
    },
    {
      id: "paneer-makhni",
      title: "Paneer Makhni Masala",
      price: 299,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80",
      description: "Indian style Makhni sauce, premium marinated paneer cubes, capsicum, red onions, and tomatoes.",
      sizes: ["Oval 10in Crafted Flatz", "Personal Pan", "Medium Hand Tossed", "Large Stuffed Crust"]
    },
    {
      id: "overloaded-veggies",
      title: "Overloaded Veggies",
      price: 299,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=80",
      description: "Black olives, mushrooms, sweet corn, red onions, tri-color bell peppers, and jalapeños.",
      sizes: ["Oval 10in Crafted Flatz", "Personal Pan", "Medium Hand Tossed", "Large Stuffed Crust"]
    }
  ],
  burgers: [
    {
      id: "crispy-veg-burger",
      title: "Crispy Veg Burger",
      price: 149,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
      description: "Crispy mixed vegetable patty, fresh lettuce, tomatoes, and creamy classic mayonnaise."
    },
    {
      id: "spicy-paneer-burger",
      title: "Spicy Paneer Burger",
      price: 189,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
      description: "Spicy marinated paneer patty, layered with spicy dressing, melted cheese, and sliced onions."
    }
  ],
  breads: [
    {
      id: "garlic-bread-stix",
      title: "Garlic Bread Stix",
      price: 119,
      image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=500&auto=format&fit=crop&q=80",
      description: "Freshly baked garlic bread sticks served warm with creamy dynamic dipping sauce."
    },
    {
      id: "cheese-garlic-bread",
      title: "Cheese Garlic Bread",
      price: 149,
      image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=500&auto=format&fit=crop&q=80",
      description: "Toasted thick bread slices loaded with garlic butter, fresh parsley, and gooey melted mozzarella."
    }
  ],
  pasta: [
    {
      id: "creamy-mushroom-penne",
      title: "Creamy Mushroom Penne",
      price: 249,
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop&q=80",
      description: "Penne tossed in a rich, creamy white parmesan sauce loaded with fresh button mushrooms and garlic herbs."
    },
    {
      id: "spiced-arrabbiata",
      title: "Spiced Arrabbiata Pasta",
      price: 229,
      image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&auto=format&fit=crop&q=80",
      description: "Penne pasta in a fiery, spiced San Marzano tomato sauce infused with fresh garlic, chili flakes, and basil leaves."
    }
  ],
  desserts: [
    {
      id: "warm-brownie",
      title: "Warm Chocolate Brownie",
      price: 129,
      image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&auto=format&fit=crop&q=80",
      description: "Rich, dense chocolate brownie served warm with a shiny, gooey dark chocolate glaze on top."
    },
    {
      id: "choco-volcano",
      title: "Choco Volcano Cake",
      price: 139,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80",
      description: "Freshly baked soft chocolate sponge cake with a molten, oozing chocolate lava core inside."
    }
  ],
  drinks: [
    {
      id: "water-bottle",
      title: "Purified Water Bottle",
      price: 40,
      image: "/food/bisleri_water_bottle.png",
      description: "Ice-cold premium mineral packaged drinking water for refreshment."
    },
    {
      id: "pepsi-cola",
      title: "Pepsi Cola (500ml)",
      price: 60,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80",
      description: "500ml bottle of cold, sparkling carbonated Pepsi cola beverage."
    }
  ]
}

export default function MenuList() {
  const navigate = useNavigate()
  const { isModalOpen, closeLocationModal, confirmLocation, locationConfirmed } = useLocationStore()
  const checkLocation = useLocationGuard()
  const location = useLocation()
  const [isDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("appTheme")
    return savedTheme ? savedTheme === "dark" : true
  })
  const [activeTab, setActiveTab] = useState("pizzas")
  const [isVegetarian, setIsVegetarian] = useState(true)
  const [showServiceSelector, setShowServiceSelector] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const [showStoreModal, setShowStoreModal] = useState(false)
  const [showCarModal, setShowCarModal] = useState(false)
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
  const [activeService, setActiveService] = useState(localStorage.getItem("activeService") || "delivery")
  const [toast, setToast] = useState({ visible: false, message: "" })

  // Sync global location modal open state with local modal trigger
  useEffect(() => {
    if (isModalOpen) {
      setShowServiceSelector(true)
    } else {
      setShowServiceSelector(false)
    }
  }, [isModalOpen])

  const triggerToast = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => {
      setToast({ visible: false, message: "" })
    }, 2500)
  }

  useEffect(() => {
    if (location.state?.category) {
      const cat = location.state.category
      if (cat === "pizza") setActiveTab("pizzas")
      else if (cat === "burger") setActiveTab("burgers")
      else if (cat === "bread") setActiveTab("breads")
      else if (cat === "pasta" || cat === "desserts" || cat === "drinks") {
        setActiveTab(cat)
      }
    }
  }, [location.state])
  const [locationName, setLocationName] = useState(localStorage.getItem("deliveryAddress") || "")
  const [cart, setCart] = useState({})

  // Custom Customize Modal States
  const [customizeItem, setCustomizeItem] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedToppings, setSelectedToppings] = useState([])
  const [selectedCheeseDip, setSelectedCheeseDip] = useState([])
  const [selectedKetchup, setSelectedKetchup] = useState([])
  const [selectedBreadDips, setSelectedBreadDips] = useState([])

  // Load fonts and icons
  useEffect(() => {
    const linkFonts = document.createElement("link")
    linkFonts.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap"
    linkFonts.rel = "stylesheet"
    document.head.appendChild(linkFonts)

    const linkIcons = document.createElement("link")
    linkIcons.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    linkIcons.rel = "stylesheet"
    document.head.appendChild(linkIcons)

    // Load active location
    const storedLoc = localStorage.getItem("deliveryAddress")
    if (storedLoc) {
      setLocationName(storedLoc)
      setDeliveryAddress(storedLoc)
    }

    return () => {
      document.head.removeChild(linkFonts)
      document.head.removeChild(linkIcons)
    }
  }, [])

  const addToCart = (item, size = "") => {
    const key = size ? `${item.id}-${size}` : item.id
    setCart(prev => {
      const existing = prev[key]
      const newQty = existing ? existing.quantity + 1 : 1
      return {
        ...prev,
        [key]: {
          ...item,
          selectedSize: size,
          quantity: newQty
        }
      }
    })

    // Save to global localStorage cart for sync
    const currentLocalCart = JSON.parse(localStorage.getItem("userCart") || "{}")
    currentLocalCart[key] = (currentLocalCart[key] || 0) + 1
    localStorage.setItem("userCart", JSON.stringify(currentLocalCart))

    // Dispatch event to trigger Home basket recalculation
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const totalCartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)
  const totalCartPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className={`min-h-screen flex justify-center transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-gray-100"}`}>
      <div className={`w-full max-w-md min-h-screen pb-32 font-body-md overflow-x-hidden relative shadow-2xl border-x ${
        isDarkMode ? "border-zinc-800/40" : "border-gray-200/50"
      }`} style={{ backgroundColor: isDarkMode ? "#111111" : "#fbf9f8", color: isDarkMode ? "#e5e2e1" : "#1c1b1b" }}>
      {/* CSS overrides to keep design exact */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .glass-card {
          background: ${isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.9)"} !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.06)"} !important;
          box-shadow: ${isDarkMode ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"} !important;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none !important; }
        .hide-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        
        .font-headline-lg-mobile {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 700 !important;
          font-size: 28px !important;
          line-height: 34px !important;
        }
        .font-body-md {
          font-family: 'Inter', sans-serif !important;
          font-size: 16px !important;
          line-height: 24px !important;
          font-weight: 400 !important;
        }
        .font-label-sm {
          font-family: 'Inter', sans-serif !important;
          font-size: 12px !important;
          line-height: 16px !important;
          font-weight: 600 !important;
          letter-spacing: 0.05em !important;
        }
        
        .veg-box {
          border: 2px solid #00C853;
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .veg-circle {
          background-color: #00C853;
          border-radius: 50%;
          width: 6px;
          height: 6px;
        }
        .text-primary {
          color: #E53935 !important;
        }
        .bg-primary {
          background-color: #E53935 !important;
        }
        .text-on-primary {
          color: #ffffff !important;
        }
        
        .bg-surface\/80 {
          background-color: ${isDarkMode ? "rgba(19, 19, 19, 0.8)" : "rgba(255, 255, 255, 0.8)"} !important;
        }
        .bg-surface\/85 {
          background-color: ${isDarkMode ? "rgba(19, 19, 19, 0.85)" : "rgba(255, 255, 255, 0.85)"} !important;
        }
        .bg-surface\/90 {
          background-color: ${isDarkMode ? "rgba(19, 19, 19, 0.9)" : "rgba(255, 255, 255, 0.9)"} !important;
        }
        .bg-surface {
          background-color: ${isDarkMode ? "#131313" : "#ffffff"} !important;
        }
        .border-white\/10 {
          border-color: ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"} !important;
        }
        .border-white\/12 {
          border-color: ${isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)"} !important;
        }
        .bg-white\/5 {
          background-color: ${isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)"} !important;
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

      {/* Top Header Navigation */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-45 bg-surface/90 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-5 transition-colors duration-300">
        <button
          onClick={() => navigate("/user")}
          className={`material-symbols-outlined hover:opacity-85 active:scale-95 cursor-pointer bg-transparent border-0 outline-none ${isDarkMode ? "text-white" : "text-[#131313]"}`}
        >
          arrow_back
        </button>
        {/* Brand logo design */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            src={logoNew}
            alt="Papa Veg Pizza Logo"
            className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="w-8"></div>
      </header>

      {/* Categories horizontal tabs */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-md z-45 bg-surface/85 backdrop-blur-md border-b border-white/10 px-5 flex overflow-x-auto hide-scrollbar py-3 gap-3">
        {[
          { id: "deals", label: "Deals", action: () => navigate("/user/deals") },
          { id: "pizzas", label: "Pizzas" },
          { id: "burgers", label: "Burgers" },
          { id: "breads", label: "Breads" },
          { id: "pasta", label: "Pasta" },
          { id: "desserts", label: "Desserts" },
          { id: "drinks", label: "Drinks" }
        ].map((tab) => {
          const isSelected = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.action) {
                  tab.action()
                } else {
                  setActiveTab(tab.id)
                }
              }}
              className={`px-5 py-2 rounded-lg font-label-sm text-xs uppercase font-extrabold cursor-pointer border transition-all ${isSelected
                ? "bg-[#E53935] border-[#E53935] text-white shadow-[0_0_12px_rgba(229,57,53,0.3)]"
                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main Categories Layout container */}
      <main className="mt-36 px-5 space-y-6 max-w-lg mx-auto pt-4">

        {/* Vegetarian Toggle Switch bar */}
        <section className="glass-card rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="veg-box"><span className="veg-circle"></span></span>
            <span className="font-label-sm uppercase text-xs tracking-wider font-bold">Vegetarian Only</span>
          </div>
          {/* Custom Toggle Switch */}
          <div
            onClick={() => setIsVegetarian(!isVegetarian)}
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all flex items-center ${isVegetarian ? "bg-[#00C853]" : "bg-white/15"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${isVegetarian ? "translate-x-6" : ""}`} />
          </div>
        </section>

        {/* Localized deals & location alert indicator */}
        <section
          onClick={() => setShowServiceSelector(true)}
          className="bg-white text-slate-800 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:opacity-90 shadow-lg border border-emerald-500/10"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#E53935] text-2xl font-bold">local_pizza</span>
            <div className="text-left">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wide">
                {locationName ? "Delivering to:" : "Add your location"}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 max-w-[200px] leading-tight">
                {locationName || "See your local deals and pizzas"}
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#E53935] text-lg font-bold">arrow_forward_ios</span>
        </section>

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h2 className={`font-headline-lg-mobile capitalize ${isDarkMode ? "text-white" : "text-[#131313]"}`}>{activeTab}</h2>
          <span className="text-xs opacity-50 font-bold">{MENU_ITEMS[activeTab]?.length || 0} Items</span>
        </div>

        {/* Menu list grid */}
        <section className="space-y-6">
          {MENU_ITEMS[activeTab] && MENU_ITEMS[activeTab].map((item) => (
            <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex flex-col border border-white/12">
              {/* Product Image */}
              <div className="relative h-48 bg-zinc-950">
                <img
                  className="w-full h-full object-cover"
                  alt={item.title}
                  src={item.image}
                />
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-[#E53935] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest">
                    {item.badge}
                  </span>
                )}
                <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2.5 flex items-center justify-center">
                  <span className="veg-box"><span className="veg-circle"></span></span>
                </span>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className={`font-headline-md-mobile text-lg leading-tight ${isDarkMode ? "text-white" : "text-[#131313]"}`}>{item.title}</h3>
                  <span className="text-[#E53935] font-black text-lg">₹{item.price}</span>
                </div>
                <p className="text-xs opacity-60 leading-relaxed">{item.description}</p>

                {/* Size Selection dropdown for pizzas */}
                {item.sizes && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Select size & crust</span>
                    <div className="relative w-full">
                      <select
                        defaultValue={item.sizes[0]}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className={`w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-xs font-bold select-none outline-none appearance-none cursor-pointer ${isDarkMode ? "text-white" : "text-[#131313]"}`}
                      >
                        {item.sizes.map((s) => (
                          <option key={s} value={s} className={`font-bold ${isDarkMode ? "bg-[#131313] text-white" : "bg-white text-[#131313]"}`}>{s}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>
                )}

                {/* Card CTA Actions */}
                <div className={`flex items-center pt-2 ${activeTab === "drinks" ? "justify-end" : "justify-between"}`}>
                  {(activeTab === "pizzas" || activeTab === "breads") && (
                    <button
                      onClick={() => checkLocation(() => setCustomizeItem(item))}
                      className="text-[#E53935] font-label-sm text-xs uppercase font-extrabold flex items-center cursor-pointer bg-transparent border-0 outline-none hover:opacity-80"
                    >
                      Customise
                    </button>
                  )}
                  <button
                    onClick={() => checkLocation(() => addToCart(item, selectedSize))}
                    className="h-10 px-6 bg-[#E53935] hover:bg-red-700 text-white rounded-full font-label-sm text-xs uppercase font-extrabold cursor-pointer border-0 active:scale-95 transition-all shadow-[0_0_12px_rgba(229,57,53,0.3)]"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          {(!MENU_ITEMS[activeTab] || MENU_ITEMS[activeTab].length === 0) && (
            <div className="text-center py-16 opacity-50 space-y-3">
              <span className="material-symbols-outlined text-4xl">local_pizza</span>
              <p className="font-bold text-xs uppercase tracking-wider">No items available in this category</p>
            </div>
          )}
        </section>
      </main>

      {/* Floating Customize Overlay Modal */}
      {customizeItem && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm dark">
          <div className="w-full max-w-sm glass-card rounded-3xl p-6 space-y-4">
            <h3 className="font-headline-lg-mobile text-lg text-white">Customize {customizeItem.title}</h3>
            <p className="text-xs opacity-60">Personalize your toppings and selection details for {customizeItem.title}:</p>

            {customizeItem.sizes && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Choose Crust size</span>
                <div className="flex flex-wrap gap-2">
                  {customizeItem.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-2 rounded-lg font-label-sm text-[10px] uppercase font-bold cursor-pointer border ${selectedSize === s
                        ? "bg-[#E53935] border-[#E53935] text-white"
                        : "bg-white/5 border-white/10 text-white/70"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1.5 pt-2">
              {activeTab === "pizzas" && (
                <>
                  {/* TOPPINGS */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase opacity-50 font-bold tracking-wider">TOPPINGS</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Fresh Tomatoes",
                        "Mushroom",
                        "Sweet Corn",
                        "Pineapples",
                        "Red Paprika",
                        "Jalapenos",
                        "Olives",
                        "Paneer",
                        "Capsicum",
                        "Onions"
                      ].map(opt => (
                        <label key={opt} className="flex items-center space-x-2 text-xs text-white/80">
                          <input type="checkbox" className="accent-[#E53935]" checked={selectedToppings.includes(opt)} onChange={() => {
                            setSelectedToppings(prev => prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]);
                          }} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Cheese & Dip */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Cheese & Dip</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Extra Cheese",
                        "Mozzarella",
                        "Cheese Dip",
                        "Jalapeno Dip",
                        "Hot & Garlic Dip",
                        "Peri Peri Dip",
                        "Korma Dip"
                      ].map(opt => (
                        <label key={opt} className="flex items-center space-x-2 text-xs text-white/80">
                          <input type="checkbox" className="accent-[#E53935]" checked={selectedCheeseDip.includes(opt)} onChange={() => {
                            setSelectedCheeseDip(prev => prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]);
                          }} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Choose Your ketchup */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Choose Your ketchup</span>
                    <label className="flex items-center space-x-2 text-xs text-white/80">
                      <input type="checkbox" className="accent-[#E53935]" checked={selectedKetchup.includes("Ketchup")} onChange={() => {
                        setSelectedKetchup(prev => prev.includes("Ketchup") ? [] : ["Ketchup"]);
                      }} />
                      <span>Ketchup</span>
                    </label>
                  </div>
                </>
              )}
              {activeTab === "breads" && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase opacity-50 font-bold tracking-wider">DIPS</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Jalapeno Dip",
                      "Peri Peri Dip",
                      "Cheese Dip"
                    ].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 text-xs text-white/80">
                        <input type="checkbox" className="accent-[#E53935]" checked={selectedBreadDips.includes(opt)} onChange={() => {
                          setSelectedBreadDips(prev => prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]);
                        }} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setCustomizeItem(null)}
                className="flex-1 h-11 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addToCart(customizeItem, selectedSize)
                  setCustomizeItem(null)
                }}
                className="flex-1 h-11 bg-[#E53935] hover:bg-red-700 text-white font-bold rounded-xl text-xs uppercase cursor-pointer border-0"
              >
                Confirm Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Map Modal Selector */}
      <DeliveryMapModal
        show={showMapModal}
        onClose={() => setShowMapModal(false)}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={(addr) => {
          setDeliveryAddress(addr)
          setLocationName(addr)
        }}
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
            navigate("/user/deliver-on-train")
          }
        }}
        isDarkMode={isDarkMode}
      />

      {/* Takeaway Store Finder Modal */}
      {showStoreModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm dark">
          <div className="w-full max-w-sm glass-card rounded-3xl p-6 space-y-4 text-left bg-[#131313] border border-white/10">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-lg-mobile text-lg text-white">Find your nearest hut</h3>
              <button
                onClick={() => setShowStoreModal(false)}
                className="material-symbols-outlined text-white/50 hover:text-white cursor-pointer bg-transparent border-0 outline-none"
              >
                close
              </button>
            </div>
            <p className="text-xs opacity-60 leading-relaxed text-white">
              We suggested the following Pizza Veg Huts near your coordinates:
            </p>

            {/* Store List Options */}
            <div className="space-y-3">
              {[
                { id: "hut-cp", name: "Pizza Veg Hut - Connaught Place", dist: "0.8 km", status: "Open Now", hours: "11 AM - 11 PM" },
                { id: "hut-kb", name: "Pizza Veg Hut - Karol Bagh", dist: "2.1 km", status: "Open Now", hours: "11 AM - 11 PM" },
                { id: "hut-sk", name: "Pizza Veg Hut - Saket Terminal", dist: "4.5 km", status: "Closed", hours: "Opens tomorrow" }
              ].map((store) => (
                <div
                  key={store.id}
                  onClick={() => {
                    setTakeawayHut(store.name)
                    setLocationName(store.name)
                    confirmLocation({
                      address: store.name,
                      serviceType: "takeaway"
                    })
                    setShowStoreModal(false)
                    triggerToast(`Selected outlet: ${store.name}`)
                  }}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all"
                >
                  <div className="text-left space-y-1">
                    <h4 className="text-xs font-bold text-white leading-tight">{store.name}</h4>
                    <div className="flex gap-2 text-[9px] font-bold">
                      <span className="text-[#00C853]">{store.status}</span>
                      <span className="opacity-50">•</span>
                      <span className="opacity-60">{store.hours}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-[10px] bg-[#E53935]/10 text-[#E53935] px-2 py-0.5 rounded font-black tracking-wide">{store.dist}</span>
                    <span className="material-symbols-outlined text-xs text-white/40">arrow_forward_ios</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* In-Car Details Modal */}
      {showCarModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm dark">
          <div className="w-full max-w-sm glass-card rounded-3xl p-6 space-y-4 text-left bg-[#131313] border border-white/10">
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
                setLocationName(cleanCar)
                confirmLocation({
                  address: cleanCar,
                  serviceType: "incar"
                })
                setShowCarModal(false)
                triggerToast("Car details confirmed!")
              }}
              className="w-full h-11 bg-[#E53935] text-on-primary font-bold rounded-xl text-xs uppercase cursor-pointer border-0 shadow-lg active:scale-95 transition-all"
            >
              Confirm Vehicle
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Cart basket FAB */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md pointer-events-none z-45">
          <button
            onClick={() => {
              navigate("/user/cart")
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
      </div>
    </div>
  )
}
