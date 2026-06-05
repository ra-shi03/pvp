import React from "react"
import { useNavigate } from "react-router-dom"
import AccountMenuCard from "./AccountMenuCard"

export default function AccountMenuList() {
  const navigate = useNavigate()

  const MENU_ITEMS = [
    {
      title: "Exclusive Offers",
      icon: "local_offer",
      route: "/user/auth/login",
    },
    {
      title: "Track Order",
      icon: "local_shipping",
      route: "/user/account/track-order",
    },
    {
      title: "Terms & Conditions",
      icon: "gavel",
      route: "/user/account/terms",
    },
    {
      title: "Privacy Policy",
      icon: "shield",
      route: "/user/account/privacy",
    },
    {
      title: "FAQs",
      icon: "help",
      route: "/user/account/faqs",
    },
    {
      title: "Nutrition Information",
      icon: "restaurant",
      route: "/user/account/nutrition",
    },
    {
      title: "Give Feedback",
      icon: "rate_review",
      route: "/user/account/feedback",
    },
    {
      title: "Rate Us",
      icon: "star",
      route: "/rate-us",
    },
  ]

  return (
    <div className="flex flex-col gap-sm w-full">
      {MENU_ITEMS.map((item, index) => (
        <AccountMenuCard
          key={index}
          title={item.title}
          iconName={item.icon}
          onClick={() => {
            const state = item.route === "/user/auth/login" ? { from: "/account" } : undefined
            navigate(item.route, { state })
          }}
        />
      ))}
    </div>
  )
}
