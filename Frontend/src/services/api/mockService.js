import { initialStores, initialManagers, initialStoreApprovals, initialStorePerformance, initialOperatingHours } from "../../modules/Food/pages/franchise-admin/storeManagement/mockStoresData.js";
import { storePricingService } from "../../modules/Food/pages/franchise-admin/products/services/storePricingService.js";
import { mockCampaigns, mockCampaignPerformance, mockBanners, mockProducts, mockCoupons, mockNotifications, mockNotificationLogs } from "../../modules/Food/pages/franchise-admin/marketing/mockData.js";
import {
  mockStoresList,
  mockProductsPerformance,
  mockStorePerformanceList,
  mockRevenueTrends,
  mockPaymentDistributionData,
  initialGeneratedReports,
  mockDashboardSummary,
  mockOrderDashboardSummary,
  mockOrderStatusDistribution,
  mockOrderTypeDistribution,
  mockOrderHourlyHeatmap,
  mockStorePerformanceOrders,
  mockDetailedOrderReportsList,
  mockSingleOrderDetail,
  initialGeneratedOrderReports,
  mockStaffDashboardSummary,
  mockStaffRoleDistribution,
  mockStaffAttendanceTrend,
  mockDeliveryPerformance,
  mockKitchenPerformance,
  mockManagerPerformance,
  mockStaffDetailedList,
  mockStaffShifts,
  initialGeneratedStaffReports,
  mockInventorySummary,
  mockConsumptionTrend,
  mockLowStockList,
  mockIngredientUsage,
  mockPurchaseRequestsAnalytics,
  mockPurchaseRequests,
  mockStockTransactions,
  mockSuppliersSummary,
  initialGeneratedInventoryReports
} from "../../modules/Food/pages/franchise-admin/reports/mockData.js";

// Helper to load/save mock data from LocalStorage
const getStorageItem = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(`mock_db_${key}`);
    if (val === null || val === undefined || val === "null" || val === "undefined") {
      return defaultVal;
    }
    return JSON.parse(val);
  } catch (_) {
    return defaultVal;
  }
};

const setStorageItem = (key, val) => {
  try {
    localStorage.setItem(`mock_db_${key}`, JSON.stringify(val));
  } catch (_) {}
};

// Initial Seed Data
const initialCategories = [
  { id: "cat-1", name: "Pizzas", status: "Active", description: "Freshly vegetarian pizzas", order: 1, isGlobal: true, isApproved: true },
  { id: "cat-2", name: "Beverages", status: "Active", description: "Soft drinks and milkshakes", order: 2, isGlobal: true, isApproved: true },
  { id: "cat-3", name: "Sides", status: "Active", description: "Garlic breads, dips and sides", order: 3, isGlobal: true, isApproved: true },
  { id: "cat-4", name: "Desserts", status: "Draft", description: "Choco lava cakes and ice creams", order: 4, isGlobal: false, isApproved: false }
];

const initialRestaurants = [
  { id: "rest-1", name: "Papa Veg Pizza - Central Outlet", email: "central@papaveg.com", phone: "9876543210", address: "Sector 15, Central Market, Noida", status: "approved", isActive: true, cuisines: ["Italian", "Fast Food"], commission: 15 },
  { id: "rest-2", name: "Papa Veg Pizza - East Delhi", email: "eastdelhi@papaveg.com", phone: "9876543211", address: "Preet Vihar, New Delhi", status: "approved", isActive: true, cuisines: ["Italian", "Desserts"], commission: 12 },
  { id: "rest-3", name: "Veg Hub Franchise", email: "veghub@example.com", phone: "9876543212", address: "Indiranagar, Bangalore", status: "pending", isActive: false, cuisines: ["Italian", "Beverages"], commission: 10 }
];

const initialFoods = [
  { id: "food-1", name: "Margherita Pizza", category: "cat-1", categoryName: "Pizzas", price: 249, description: "Classic cheese pizza with rich tomato sauce", status: "Active", image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143", isVeg: true, isApproved: true },
  { id: "food-2", name: "Veg Supreme Pizza", category: "cat-1", categoryName: "Pizzas", price: 399, description: "Loaded with onion, capsicum, tomato, mushroom & olives", status: "Active", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591", isVeg: true, isApproved: true },
  { id: "food-3", name: "Garlic Breadsticks", category: "cat-3", categoryName: "Sides", price: 129, description: "Baked garlic breadsticks served with creamy dip", status: "Active", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a", isVeg: true, isApproved: true },
  { id: "food-4", name: "Chocolate Lava Cake", category: "cat-4", categoryName: "Desserts", price: 99, description: "Warm chocolate cake with a gooey chocolate center", status: "Active", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c", isVeg: true, isApproved: false }
];

const initialOrders = [
  { id: "660c1d2eef20092c4820a011", orderNumber: "PVP-1092", customer: { name: "Rashi Kumar", phone: "9988776655" }, restaurant: { name: "Papa Veg Pizza - Central Outlet" }, items: [{ name: "Veg Supreme Pizza", quantity: 1, price: 399 }], total: 439, status: "delivered", paymentMethod: "Online", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "660c1d2eef20092c4820a012", orderNumber: "PVP-1093", customer: { name: "Amit Sharma", phone: "9988776654" }, restaurant: { name: "Papa Veg Pizza - East Delhi" }, items: [{ name: "Margherita Pizza", quantity: 2, price: 249 }], total: 548, status: "preparing", paymentMethod: "COD", createdAt: new Date().toISOString() }
];

const initialTickets = [
  { id: "ticket-1", subject: "Refund query", description: "Customer requesting refund for order PVP-1091", status: "open", priority: "high", user: { name: "Rashi Kumar", role: "customer" }, createdAt: new Date().toISOString() },
  { id: "ticket-2", subject: "Commission settlement", description: "Franchise owner asking about monthly payouts", status: "pending", priority: "medium", user: { name: "Rajesh Gupta", role: "franchise" }, createdAt: new Date(Date.now() - 86400000).toISOString() }
];

const initialEmergencyReports = [
  { id: "report-1", title: "Accident reported", description: "Rider reported a minor road incident near sector 62", status: "pending", priority: "high", createdAt: new Date().toISOString() }
];

// Initialize Database Collections
let db = {
  categories: getStorageItem("categories", initialCategories),
  restaurants: getStorageItem("restaurants", initialRestaurants),
  foods: getStorageItem("foods", initialFoods),
  orders: getStorageItem("orders", initialOrders),
  tickets: getStorageItem("tickets", initialTickets),
  emergencyReports: getStorageItem("emergencyReports", initialEmergencyReports),
  stores: getStorageItem("stores", initialStores),
  managers: getStorageItem("managers", initialManagers),
  storeApprovals: getStorageItem("storeApprovals", initialStoreApprovals),
  storePerformance: getStorageItem("storePerformance", initialStorePerformance),
  operatingHours: getStorageItem("operatingHours", initialOperatingHours),
  campaigns: getStorageItem("campaigns", mockCampaigns),
  campaignPerformance: getStorageItem("campaignPerformance", mockCampaignPerformance),
  banners: getStorageItem("banners", mockBanners),
  products: getStorageItem("products", mockProducts),
  coupons: getStorageItem("coupons", mockCoupons),
  notifications: getStorageItem("notifications", mockNotifications),
  notificationLogs: getStorageItem("notificationLogs", mockNotificationLogs),
  generated_reports: getStorageItem("generated_reports", initialGeneratedReports),
  generated_order_reports: getStorageItem("generated_order_reports", initialGeneratedOrderReports),
  generated_staff_reports: getStorageItem("generated_staff_reports", initialGeneratedStaffReports),
  generated_inventory_reports: getStorageItem("generated_inventory_reports", initialGeneratedInventoryReports)
};

// Sync stores and managers to ensure new approvals data is available in existing localStorage
initialStores.forEach(s => {
  if (!db.stores.some(ds => ds._id === s._id)) {
    db.stores.push(s);
  }
});
initialManagers.forEach(m => {
  const existingIdx = db.managers.findIndex(dm => dm.id === m.id);
  if (existingIdx === -1) {
    db.managers.push(m);
  } else if (db.managers[existingIdx].name !== m.name) {
    db.managers[existingIdx] = { ...db.managers[existingIdx], ...m };
  }
});
initialStorePerformance.forEach(p => {
  const existingIdx = db.storePerformance.findIndex(dp => dp._id === p._id);
  if (existingIdx === -1) {
    db.storePerformance.push(p);
  } else {
    // If the local record has 0 revenue/orders or missing storeId (which indicates placeholder data), overwrite with seeded data
    if ((db.storePerformance[existingIdx].revenue === 0 || !db.storePerformance[existingIdx].storeId) && p.revenue > 0) {
      db.storePerformance[existingIdx] = { ...db.storePerformance[existingIdx], ...p };
    } else {
      db.storePerformance[existingIdx] = { ...p, ...db.storePerformance[existingIdx] };
    }
  }
});
initialOperatingHours.forEach(oh => {
  const existingIdx = db.operatingHours.findIndex(doh => doh._id === oh._id);
  if (existingIdx === -1) {
    db.operatingHours.push(oh);
  } else {
    db.operatingHours[existingIdx] = { ...oh, ...db.operatingHours[existingIdx] };
  }
});

const saveDB = () => {
  Object.keys(db).forEach((key) => {
    setStorageItem(key, db[key]);
  });
};

saveDB();

// Request Processor
export function handleMockRequest(config) {
  const url = String(config.url || "").replace(/\\/g, "/");
  const method = String(config.method || "get").toLowerCase();
  const data = config.data ? (typeof config.data === "string" ? JSON.parse(config.data) : config.data) : null;

  console.log(`[Mock Server] [${method.toUpperCase()}] ${url}`, data);

  // Helper response builders
  const successRes = (payload) => ({ success: true, status: 200, data: { success: true, data: payload } });
  const successMsg = (msg, payload = null) => ({ success: true, status: 200, data: { success: true, message: msg, data: payload } });
  const errorRes = (msg, status = 400) => ({ success: false, status, data: { success: false, message: msg } });

  // --- ORDER REPORT ENDPOINTS ---
  if (url.includes("/reports/orders/dashboard") || url.includes("/reports/orders/summary")) {
    const storeId = config.params?.storeId;
    if (storeId && storeId !== "all") {
      return successRes({
        ...mockOrderDashboardSummary,
        totalOrders: Math.floor(mockOrderDashboardSummary.totalOrders / 3),
        completedOrders: Math.floor(mockOrderDashboardSummary.completedOrders / 3),
        cancelledOrders: Math.floor(mockOrderDashboardSummary.cancelledOrders / 3),
        refundedOrders: Math.floor(mockOrderDashboardSummary.refundedOrders / 3),
        averageOrderValue: 338.40
      });
    }
    return successRes(mockOrderDashboardSummary);
  }

  if (url.includes("/reports/orders/status-distribution")) {
    return successRes(mockOrderStatusDistribution);
  }

  if (url.includes("/reports/orders/hourly")) {
    return successRes(mockOrderHourlyHeatmap);
  }

  if (url.includes("/reports/orders/order-type")) {
    return successRes(mockOrderTypeDistribution);
  }

  if (url.includes("/reports/orders/store-performance")) {
    return successRes(mockStorePerformanceOrders);
  }

  if (url.includes("/reports/orders/list")) {
    const search = config.params?.search || "";
    let filtered = [...mockDetailedOrderReportsList];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(o => 
        o.orderNumber.toLowerCase().includes(q) || 
        o.customerName.toLowerCase().includes(q) || 
        o.storeName.toLowerCase().includes(q)
      );
    }
    const sortBy = config.params?.sortBy || "createdAt";
    const sortOrder = config.params?.sortOrder || "desc";
    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    const page = Number(config.params?.page) || 1;
    const limit = Number(config.params?.limit) || 10;
    const totalCount = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return successRes({
      orders: paginated,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    });
  }

  if (url.includes("/reports/orders/generate") && method === "post") {
    const newRep = {
      id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      reportType: data?.reportType || "Custom",
      startDate: data?.startDate || "2026-06-23",
      endDate: data?.endDate || "2026-06-23",
      revenue: Math.floor(500000 + Math.random() * 2000000),
      orders: Math.floor(1500 + Math.random() * 5000),
      refundAmount: data?.includeRefunds ? Math.floor(10000 + Math.random() * 50000) : 0,
      status: "Completed",
      generatedBy: "Rashi Kumar (Admin)",
      createdAt: new Date().toISOString(),
      fileUrl: "#"
    };
    db.generated_order_reports.unshift(newRep);
    saveDB();
    return successRes({
      reportId: newRep.id,
      fileUrl: newRep.fileUrl,
      status: newRep.status
    });
  }

  // Single Order API Match
  const singleOrderMatch = url.match(/\/orders\/([^/]+)$/);
  if (singleOrderMatch && method === "get" && !url.includes("/reports/")) {
    const id = singleOrderMatch[1];
    return successRes({
      ...mockSingleOrderDetail,
      orderId: id,
      orderNumber: id.startsWith("ord-") ? `PVP-${id.replace("ord-", "109")}` : id
    });
  }

  // Invoice API Match
  const invoiceMatch = url.match(/\/orders\/([^/]+)\/invoice$/);
  if (invoiceMatch && method === "get") {
    const id = invoiceMatch[1];
    return successRes({
      ...mockSingleOrderDetail,
      orderId: id,
      orderNumber: id.startsWith("ord-") ? `PVP-${id.replace("ord-", "109")}` : id
    });
  }

  // --- SALES REPORT ENDPOINTS ---
  if (url.includes("/reports/sales/dashboard") || url.includes("/reports/sales/summary")) {
    const storeId = config.params?.storeId;
    if (storeId && storeId !== "all") {
      return successRes({
        ...mockDashboardSummary,
        totalRevenue: Math.floor(mockDashboardSummary.totalRevenue / 3),
        totalOrders: Math.floor(mockDashboardSummary.totalOrders / 3),
        netRevenue: Math.floor(mockDashboardSummary.netRevenue / 3),
        growthPercentage: 5.4,
      });
    }
    return successRes(mockDashboardSummary);
  }

  if (url.includes("/reports/sales/revenue-trend")) {
    const mode = config.params?.mode || "daily";
    return successRes(mockRevenueTrends[mode] || mockRevenueTrends.daily);
  }

  if (url.includes("/reports/sales/store-performance")) {
    return successRes(mockStorePerformanceList);
  }

  if (url.includes("/reports/sales/payment-distribution")) {
    return successRes(mockPaymentDistributionData);
  }

  if (url.includes("/reports/sales/top-products")) {
    return successRes(mockProductsPerformance);
  }

  if (url.includes("/reports/sales/generate") && method === "post") {
    const newRep = {
      id: `REP-2026-${Math.floor(100 + Math.random() * 900)}`,
      reportType: data?.reportType || "Custom",
      startDate: data?.startDate || "2026-06-23",
      endDate: data?.endDate || "2026-06-23",
      revenue: Math.floor(500000 + Math.random() * 2000000),
      orders: Math.floor(1500 + Math.random() * 5000),
      refundAmount: data?.includeRefunds ? Math.floor(10000 + Math.random() * 50000) : 0,
      status: "Completed",
      generatedBy: "Rashi Kumar (Admin)",
      createdAt: new Date().toISOString(),
      fileUrl: "#"
    };
    db.generated_reports.unshift(newRep);
    saveDB();
    return successRes({
      reportId: newRep.id,
      fileUrl: newRep.fileUrl,
      status: newRep.status
    });
  }

  const reportsMatch = url.match(/\/generated-reports\/([^/]+)/);
  if (reportsMatch) {
    const id = reportsMatch[1];
    if (method === "delete") {
      db.generated_reports = db.generated_reports.filter(r => r.id !== id);
      saveDB();
      return successMsg("Report deleted successfully");
    }
    if (method === "get") {
      const report = db.generated_reports.find(r => r.id === id);
      if (report) {
        return successRes({
          report,
          summary: {
            revenue: report.revenue,
            orders: report.orders,
            refunds: report.refundAmount,
            taxes: Math.floor(report.revenue * 0.05),
            netRevenue: report.revenue - report.refundAmount - Math.floor(report.revenue * 0.05),
            growthPercentage: 8.5
          },
          trend: mockRevenueTrends.daily,
          paymentSplit: mockPaymentDistributionData,
          storePerformance: mockStorePerformanceList,
          topProducts: mockProductsPerformance
        });
      }
      return errorRes("Report not found", 404);
    }
  }

  if (url.includes("/generated-reports") && method === "get") {
    const search = config.params?.search || "";
    let filtered = [...db.generated_reports];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(r => 
        r.id.toLowerCase().includes(q) || 
        r.reportType.toLowerCase().includes(q) || 
        r.generatedBy.toLowerCase().includes(q)
      );
    }
    const sortBy = config.params?.sortBy || "createdAt";
    const sortOrder = config.params?.sortOrder || "desc";
    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    const page = Number(config.params?.page) || 1;
    const limit = Number(config.params?.limit) || 10;
    const totalCount = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return successRes({
      reports: paginated,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    });
  }

  if (url.includes("/stores/dropdown")) {
    return successRes(mockStoresList);
  }


  // 1. Authentication & Profile
  if (url.includes("/food/auth/admin/login") || url.includes("/auth/admin/login")) {
    const email = data?.email || "";
    if (email.includes("admin")) {
      return {
        success: true,
        status: 200,
        data: {
          success: true,
          data: {
            accessToken: "mockHeader.eyJleHAiOjk5OTk5OTk5OTksInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6ImFkbWluLTEifQ==.mockSignature",
            refreshToken: "mock-admin-refresh-token-12345",
            user: { id: "admin-1", name: "Papa Veg Admin", email: email || "admin@papavegpizza.com", role: "superadmin" }
          }
        }
      };
    }
    return errorRes("Invalid email or password");
  }

  if (url.includes("/food/auth/me") || url.includes("/auth/me")) {
    return {
      success: true,
      status: 200,
      data: {
        success: true,
        data: {
          id: "admin-1",
          name: "Papa Veg Admin",
          email: "admin@papavegpizza.com",
          role: "superadmin",
          profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
        }
      }
    };
  }

  if (url.includes("/food/auth/logout") || url.includes("/auth/logout")) {
    return successMsg("Logged out successfully");
  }

  // Restaurant Current & Profile Mocks
  if (url.includes("/food/restaurant/current") || url.includes("/restaurant/current")) {
    const currentRest = db.restaurants[0] || {
      id: "rest-1",
      name: "Papa Veg Pizza - Central Outlet",
      email: "central@papaveg.com",
      phone: "9876543210"
    };

    const populated = {
      id: currentRest.id,
      _id: currentRest.id,
      restaurantId: currentRest.restaurantId || "REST0001",
      name: currentRest.name,
      email: currentRest.email,
      phone: currentRest.phone,
      status: currentRest.status || "approved",
      isActive: currentRest.isActive !== false,
      isAcceptingOrders: currentRest.isAcceptingOrders !== false,
      rating: currentRest.rating || 4.8,
      totalRatings: currentRest.totalRatings || 142,
      cuisines: currentRest.cuisines || ["Italian", "Fast Food"],
      location: currentRest.location || {
        addressLine1: "Sector 15, Central Market",
        addressLine2: "",
        area: "Noida",
        city: "Delhi NCR",
        landmark: "Near Metro Station"
      },
      profileImage: currentRest.profileImage || {
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
        publicId: "profile-1"
      },
      coverImages: currentRest.coverImages || [
        { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop", publicId: "cover-1" }
      ],
      menuImages: currentRest.menuImages || [
        { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop", publicId: "cover-1" }
      ]
    };

    return successRes({ restaurant: populated });
  }

  if (url.includes("/food/restaurant/profile") && method === "patch") {
    if (db.restaurants && db.restaurants.length > 0) {
      db.restaurants[0] = { ...db.restaurants[0], ...data };
      saveDB();
    }
    return successMsg("Profile updated successfully", { restaurant: db.restaurants[0] });
  }

  if (url.includes("/food/restaurant/availability") && method === "patch") {
    if (db.restaurants && db.restaurants.length > 0) {
      db.restaurants[0].isAcceptingOrders = data?.isAcceptingOrders;
      saveDB();
    }
    return successMsg("Availability updated successfully", { restaurant: db.restaurants[0] });
  }

  if (url.includes("/food/restaurant/profile/profile-image") && method === "post") {
    return successRes({
      profileImage: {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        publicId: "profile-uploaded"
      }
    });
  }

  if (url.includes("/food/restaurant/profile/menu-image") && method === "post") {
    return successRes({
      menuImage: {
        url: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
        publicId: "menu-uploaded"
      }
    });
  }

  // 2. Sidebar Badges
  if (url.includes("/food/admin/sidebar-badges")) {
    const pendingRests = db.restaurants.filter(r => r.status === "pending").length;
    const pendingCats = db.categories.filter(c => c.status === "Draft").length;
    const pendingFds = db.foods.filter(f => !f.isApproved).length;
    const openTickets = db.tickets.filter(t => t.status === "open").length;
    return successRes({
      pendingRestaurants: pendingRests,
      pendingCategories: pendingCats,
      pendingFoods: pendingFds,
      supportTickets: openTickets
    });
  }

  // 3. Dashboard Stats
  if (url.includes("/food/admin/dashboard-stats") || url.match(/\/admin\/dashboard$/)) {
    return successRes({
      revenue: 52000,
      orders: 245,
      activeStores: 12,
      activeRiders: 34,
      lowStock: 5,
      refunds: 3,
      avgOrderValue: 212,
      customerSatisfaction: 4.7
    });
  }

  if (url.includes("/admin/dashboard/revenue")) {
    return successRes([
      { date: "Mon", revenue: 42000, orders: 198 },
      { date: "Tue", revenue: 48000, orders: 226 },
      { date: "Wed", revenue: 52000, orders: 245 },
      { date: "Thu", revenue: 50000, orders: 235 },
      { date: "Fri", revenue: 58000, orders: 270 },
      { date: "Sat", revenue: 72000, orders: 340 },
      { date: "Sun", revenue: 65000, orders: 310 }
    ]);
  }

  if (url.includes("/admin/dashboard/live-orders")) {
    return successRes([
      { id: "PVP-9042", store: "Papa Veg Pizza - Indore Central", customer: "Rohan Malhotra", status: "preparing", time: "08:24 PM", amount: 450, phone: "9826012345", address: "12, Palasia Square, Indore", items: [{ name: "Paneer Tikka Pizza", quantity: 1, price: 399 }, { name: "Pepsi", quantity: 1, price: 51 }], payment: "Online - Paid", assignedStaff: { kitchen: "Chef Anil", rider: "Karan Singh" }, notes: "Extra spicy, double cheese" },
      { id: "PVP-9041", store: "Papa Veg Pizza - Bhopal Zone", customer: "Isha Sharma", status: "confirmed", time: "08:28 PM", amount: 590, phone: "9893054321", address: "Plot 45, Maharana Pratap Nagar, Bhopal", items: [{ name: "Veg Supreme Pizza", quantity: 1, price: 499 }, { name: "Garlic Bread", quantity: 1, price: 91 }], payment: "COD - Unpaid", assignedStaff: { kitchen: "Chef Sunita", rider: "Pending Allocation" }, notes: "Awaiting preparation start" },
      { id: "PVP-9039", store: "Papa Veg Pizza - Ujjain Branch", customer: "Amit Verma", status: "baking", time: "08:15 PM", amount: 380, phone: "9752098765", address: "102, Freeganj, Ujjain", items: [{ name: "Margherita Pizza", quantity: 2, price: 190 }], payment: "Online - Paid", assignedStaff: { kitchen: "Chef Anil", rider: "Rahul Dev" }, notes: "No onions" },
      { id: "PVP-9038", store: "Papa Veg Pizza - Gwalior Hub", customer: "Pooja Patel", status: "packed", time: "08:10 PM", amount: 320, phone: "9977055443", address: "G-4, Deen Dayal Nagar, Gwalior", items: [{ name: "Farmhouse Delight Pizza", quantity: 1, price: 320 }], payment: "Online - Paid", assignedStaff: { kitchen: "Chef Manoj", rider: "Vikram Rathore" }, notes: "Delivery before 9 PM" },
      { id: "PVP-9036", store: "Papa Veg Pizza - Indore Central", customer: "Deepak Rawat", status: "out_for_delivery", time: "08:02 PM", amount: 520, phone: "9826099887", address: "Flat 304, Royal Palms, Indore", items: [{ name: "Tandoori Paneer Pizza", quantity: 1, price: 421 }, { name: "Choco Lava Cake", quantity: 1, price: 99 }], payment: "Online - Paid", assignedStaff: { kitchen: "Chef Anil", rider: "Rahul Dev" }, notes: "Leave at security gate" }
    ]);
  }

  if (url.includes("/admin/dashboard/store-performance")) {
    return successRes([
      { name: "Indore Central", orders: 120, revenue: 324000, rating: 4.8, completion: 98 },
      { name: "Bhopal Zone", orders: 95, revenue: 256000, rating: 4.6, completion: 96 },
      { name: "Ujjain Branch", orders: 60, revenue: 162000, rating: 4.4, completion: 94 },
      { name: "Gwalior Hub", orders: 50, revenue: 135000, rating: 4.5, completion: 95 },
      { name: "Jabalpur Outlet", orders: 40, revenue: 108000, rating: 4.2, completion: 92 },
      { name: "Dewas Hub", orders: 30, revenue: 81000, rating: 4.3, completion: 93 },
      { name: "Pithampur Point", orders: 25, revenue: 67000, rating: 4.1, completion: 90 },
      { name: "Ratlam Outlet", orders: 22, revenue: 59000, rating: 4.5, completion: 96 },
      { name: "Sagar Hub", orders: 18, revenue: 48000, rating: 4.0, completion: 89 },
      { name: "Rewa Branch", orders: 15, revenue: 40000, rating: 4.2, completion: 91 }
    ]);
  }

  if (url.includes("/admin/dashboard/inventory-alerts")) {
    return successRes([
      { ingredient: "Processed Pizza Cheese", store: "Indore Central", currentStock: 12, reorderLevel: 50, unit: "kg" },
      { ingredient: "Wheat Pizza Dough Base", store: "Ujjain Branch", currentStock: 14, reorderLevel: 80, unit: "units" },
      { ingredient: "Fresh Diced Paneer cubes", store: "Bhopal Zone", currentStock: 8, reorderLevel: 30, unit: "kg" },
      { ingredient: "Sweet Corn Kernels", store: "Gwalior Hub", currentStock: 25, reorderLevel: 20, unit: "kg" },
      { ingredient: "Chipotle & Jalapeno Dips", store: "Indore Central", currentStock: 35, reorderLevel: 100, unit: "tubes" }
    ]);
  }

  if (url.includes("/admin/dashboard/delivery-performance")) {
    return successRes({
      metrics: {
        activeRiders: 34,
        deliveredOrders: 215,
        avgDeliveryTime: 24,
        failedDeliveries: 2
      },
      hourlyChart: [
        { hour: "12 PM", deliveries: 25 },
        { hour: "2 PM", deliveries: 32 },
        { hour: "4 PM", deliveries: 18 },
        { hour: "6 PM", deliveries: 45 },
        { hour: "8 PM", deliveries: 65 },
        { hour: "10 PM", deliveries: 30 }
      ]
    });
  }

  if (url.includes("/admin/dashboard/customer-activity")) {
    return successRes({
      newCustomers: 45,
      repeatCustomers: 120,
      loyaltyMembers: 350,
      avgRating: 4.7
    });
  }

  if (url.includes("/search") || url.match(/\/search$/)) {
    const q = String(config.params?.q || "").toLowerCase().trim();
    if (!q) {
      return successRes({ orders: [], stores: [], products: [], customers: [], riders: [] });
    }

    // Filter local entities based on search query
    const filteredOrders = db.orders.filter(o => 
      o.id.toLowerCase().includes(q) || 
      o.orderNumber?.toLowerCase().includes(q) ||
      o.customer?.name?.toLowerCase().includes(q)
    );

    const filteredStores = db.restaurants.filter(r => 
      r.name.toLowerCase().includes(q) ||
      r.address.toLowerCase().includes(q)
    );

    const filteredProducts = db.foods.filter(f => 
      f.name.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q)
    );

    // Simulated customers from orders
    const allCustomers = [
      { name: "Rashi Kumar", phone: "9988776655", email: "rashi@example.com" },
      { name: "Amit Sharma", phone: "9988776654", email: "amit@example.com" },
      { name: "Rohan Malhotra", phone: "9826012345", email: "rohan@example.com" },
      { name: "Isha Sharma", phone: "9893054321", email: "isha@example.com" }
    ];
    const filteredCustomers = allCustomers.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.phone.includes(q)
    );

    const allRiders = [
      { name: "Ramesh Rider", phone: "9876543230" },
      { name: "Suresh Rider", phone: "9876543231" },
      { name: "Rahul Dev", phone: "9840212903" },
      { name: "Karan Singh", phone: "9752098765" }
    ];
    const filteredRiders = allRiders.filter(r => 
      r.name.toLowerCase().includes(q) ||
      r.phone.includes(q)
    );

    return successRes({
      orders: filteredOrders,
      stores: filteredStores,
      products: filteredProducts,
      customers: filteredCustomers,
      riders: filteredRiders
    });
  }

  // 4. Categories Management
  if (url.includes("/food/admin/categories")) {
    if (method === "get") {
      return successRes(db.categories);
    }
    if (method === "post") {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: data?.name || "New Category",
        status: data?.status || "Active",
        description: data?.description || "",
        order: db.categories.length + 1,
        isGlobal: Boolean(data?.isGlobal),
        isApproved: true
      };
      db.categories.push(newCat);
      saveDB();
      return successMsg("Category created successfully", newCat);
    }

    // Match id parameter e.g. /food/admin/categories/cat-1
    const match = url.match(/\/food\/admin\/categories\/([^/]+)/);
    if (match) {
      const id = match[1];
      if (method === "patch") {
        const catIdx = db.categories.findIndex(c => c.id === id);
        if (catIdx !== -1) {
          db.categories[catIdx] = { ...db.categories[catIdx], ...data };
          saveDB();
          return successMsg("Category updated successfully", db.categories[catIdx]);
        }
        return errorRes("Category not found", 404);
      }
      if (method === "delete") {
        db.categories = db.categories.filter(c => c.id !== id);
        saveDB();
        return successMsg("Category deleted successfully");
      }
    }
  }

  // Categories approval and toggles
  const catToggleMatch = url.match(/\/food\/admin\/categories\/([^/]+)\/toggle/);
  if (catToggleMatch) {
    const id = catToggleMatch[1];
    const catIdx = db.categories.findIndex(c => c.id === id);
    if (catIdx !== -1) {
      db.categories[catIdx].status = db.categories[catIdx].status === "Active" ? "Draft" : "Active";
      saveDB();
      return successMsg("Category status toggled successfully", db.categories[catIdx]);
    }
    return errorRes("Category not found", 404);
  }

  const catApproveMatch = url.match(/\/food\/admin\/categories\/([^/]+)\/approve/);
  if (catApproveMatch) {
    const id = catApproveMatch[1];
    const catIdx = db.categories.findIndex(c => c.id === id);
    if (catIdx !== -1) {
      db.categories[catIdx].status = "Active";
      db.categories[catIdx].isApproved = true;
      saveDB();
      return successMsg("Category approved successfully", db.categories[catIdx]);
    }
    return errorRes("Category not found", 404);
  }

  // 5. Restaurants Management
  if (url.includes("/food/admin/restaurants")) {
    if (method === "get") {
      if (url.includes("/pending")) {
        return successRes(db.restaurants.filter(r => r.status === "pending"));
      }
      return successRes(db.restaurants);
    }
    if (method === "post") {
      const newRest = {
        id: `rest-${Date.now()}`,
        name: data?.name || "New Outlet",
        email: data?.email || "",
        phone: data?.phone || "",
        address: data?.address || "",
        status: "approved",
        isActive: true,
        cuisines: data?.cuisines || [],
        commission: Number(data?.commission || 15)
      };
      db.restaurants.push(newRest);
      saveDB();
      return successMsg("Restaurant created successfully", newRest);
    }

    const match = url.match(/\/food\/admin\/restaurants\/([^/]+)/);
    if (match) {
      const id = match[1];
      if (method === "patch") {
        const restIdx = db.restaurants.findIndex(r => r.id === id);
        if (restIdx !== -1) {
          db.restaurants[restIdx] = { ...db.restaurants[restIdx], ...data };
          saveDB();
          return successMsg("Restaurant details updated", db.restaurants[restIdx]);
        }
        return errorRes("Restaurant not found", 404);
      }
      if (method === "delete") {
        db.restaurants = db.restaurants.filter(r => r.id !== id);
        saveDB();
        return successMsg("Restaurant deleted successfully");
      }
    }
  }

  // Restaurant approvals
  const restApproveMatch = url.match(/\/food\/admin\/restaurants\/([^/]+)\/approve/);
  if (restApproveMatch) {
    const id = restApproveMatch[1];
    const restIdx = db.restaurants.findIndex(r => r.id === id);
    if (restIdx !== -1) {
      db.restaurants[restIdx].status = "approved";
      db.restaurants[restIdx].isActive = true;
      saveDB();
      return successMsg("Restaurant approved successfully", db.restaurants[restIdx]);
    }
    return errorRes("Restaurant not found", 404);
  }

  const restRejectMatch = url.match(/\/food\/admin\/restaurants\/([^/]+)\/reject/);
  if (restRejectMatch) {
    const id = restRejectMatch[1];
    const restIdx = db.restaurants.findIndex(r => r.id === id);
    if (restIdx !== -1) {
      db.restaurants[restIdx].status = "rejected";
      db.restaurants[restIdx].isActive = false;
      saveDB();
      return successMsg("Restaurant application rejected", db.restaurants[restIdx]);
    }
    return errorRes("Restaurant not found", 404);
  }

  // 6. Food Catalog (Products)
  if (url.includes("/food/admin/foods")) {
    if (method === "get") {
      if (url.includes("/pending-approvals")) {
        return successRes(db.foods.filter(f => !f.isApproved));
      }
      return successRes(db.foods);
    }
    if (method === "post") {
      const categoryItem = db.categories.find(c => c.id === data?.category);
      const newFood = {
        id: `food-${Date.now()}`,
        name: data?.name || "New Food Item",
        category: data?.category || "",
        categoryName: categoryItem ? categoryItem.name : "Uncategorized",
        price: Number(data?.price || 0),
        description: data?.description || "",
        status: data?.status || "Active",
        image: data?.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        isVeg: data?.isVeg !== false,
        isApproved: true
      };
      db.foods.push(newFood);
      saveDB();
      return successMsg("Product created successfully", newFood);
    }

    const match = url.match(/\/food\/admin\/foods\/([^/]+)/);
    if (match) {
      const id = match[1];
      if (method === "patch") {
        const foodIdx = db.foods.findIndex(f => f.id === id);
        if (foodIdx !== -1) {
          db.foods[foodIdx] = { ...db.foods[foodIdx], ...data };
          saveDB();
          return successMsg("Product updated successfully", db.foods[foodIdx]);
        }
        return errorRes("Product not found", 404);
      }
      if (method === "delete") {
        db.foods = db.foods.filter(f => f.id !== id);
        saveDB();
        return successMsg("Product deleted successfully");
      }
    }
  }

  // Food approvals
  const foodApproveMatch = url.match(/\/food\/admin\/foods\/([^/]+)\/approve/);
  if (foodApproveMatch) {
    const id = foodApproveMatch[1];
    const foodIdx = db.foods.findIndex(f => f.id === id);
    if (foodIdx !== -1) {
      db.foods[foodIdx].isApproved = true;
      saveDB();
      return successMsg("Product approved successfully", db.foods[foodIdx]);
    }
    return errorRes("Product not found", 404);
  }

  const foodRejectMatch = url.match(/\/food\/admin\/foods\/([^/]+)\/reject/);
  if (foodRejectMatch) {
    const id = foodRejectMatch[1];
    const foodIdx = db.foods.findIndex(f => f.id === id);
    if (foodIdx !== -1) {
      db.foods = db.foods.filter(f => f.id !== id);
      saveDB();
      return successMsg("Product registration rejected & removed", null);
    }
    return errorRes("Product not found", 404);
  }

  // 7. Orders Management
  if (url.includes("/food/admin/orders")) {
    if (method === "get") {
      const match = url.match(/\/food\/admin\/orders\/([^/]+)/);
      if (match) {
        const id = match[1];
        const order = db.orders.find(o => o.id === id);
        if (order) return successRes(order);
        return errorRes("Order not found", 404);
      }
      return successRes(db.orders);
    }
  }

  // 8. Support tickets
  if (url.includes("/food/admin/support-tickets")) {
    if (method === "get") {
      return successRes(db.tickets);
    }
    const match = url.match(/\/food\/admin\/support-tickets\/([^/]+)/);
    if (match) {
      const id = match[1];
      if (method === "patch") {
        const ticketIdx = db.tickets.findIndex(t => t.id === id);
        if (ticketIdx !== -1) {
          db.tickets[ticketIdx] = { ...db.tickets[ticketIdx], ...data };
          saveDB();
          return successMsg("Ticket status updated", db.tickets[ticketIdx]);
        }
        return errorRes("Ticket not found", 404);
      }
    }
  }

  // 9. Delivery Partners and Emergencies
  if (url.includes("/food/admin/delivery/partners")) {
    return successRes([
      { id: "del-1", name: "Ramesh Rider", phone: "9876543230", status: "online", vehicleNumber: "DL-3S-AQ-1234", vehicleType: "Bike" },
      { id: "del-2", name: "Suresh Rider", phone: "9876543231", status: "offline", vehicleNumber: "DL-3S-AQ-1235", vehicleType: "Electric Scooter" }
    ]);
  }

  if (url.includes("/food/admin/delivery/join-requests")) {
    return successRes([
      { id: "del-req-1", name: "Vikram Singh", phone: "9876543232", vehicleType: "Bike", status: "pending" }
    ]);
  }

  if (url.includes("/food/admin/safety-emergency-reports")) {
    return successRes(db.emergencyReports);
  }

  // 10. Settings & Fallbacks
  if (url.includes("/food/admin/business-settings")) {
    return successRes({
      name: "Papa Veg Pizza",
      logo: "/assets/logo1.png",
      favicon: "/favicon.ico",
      contactEmail: "info@papavegpizza.com",
      contactPhone: "+91 9988776655",
      taxRate: 5,
      deliveryFeePerKm: 15,
      minimumOrderValue: 150
    });
  }

  if (url.includes("/food/admin/fee-settings") || url.includes("/food/admin/referral-settings")) {
    return successRes({ success: true });
  }

  // --- STORES MANAGEMENT MOCK ENDPOINTS ---

  // GET /users/:id
  const userIdMatch = url.match(/\/users\/([^/]+)$/);
  if (userIdMatch && method === "get") {
    const id = userIdMatch[1];
    const mgr = db.managers.find(m => m.id === id);
    if (mgr) return successRes(mgr);
    return errorRes("User not found", 404);
  }

  // GET /users (managers or staff)
  if (url.includes("/users")) {
    const role = config.params?.role || "";
    if (role === "store_manager") {
      return successRes(db.managers);
    }
    // Return staff for this store
    return successRes([
      { name: "Suresh Patel", role: "Kitchen Chef", phone: "9826011122", status: "On Duty" },
      { name: "Rahul Deshmukh", role: "Kitchen Helper", phone: "9752099988", status: "On Duty" },
      { name: "Amit Yadav", role: "Delivery Rider", phone: "9977088822", status: "Active" },
      { name: "Sunita Verma", role: "Cashier", phone: "9893044455", status: "On Duty" }
    ]);
  }

  // GET /orders?storeId=
  if (url.includes("/orders") && config.params?.storeId) {
    return successRes([
      { id: "PVP-9042", customer: "Rohan Malhotra", amount: 450, status: "delivered", createdAt: new Date(Date.now() - 10 * 60000).toISOString() },
      { id: "PVP-9041", customer: "Isha Sharma", amount: 590, status: "preparing", createdAt: new Date(Date.now() - 25 * 60000).toISOString() },
      { id: "PVP-9039", customer: "Amit Verma", amount: 380, status: "preparing", createdAt: new Date(Date.now() - 40 * 60000).toISOString() },
      { id: "PVP-9038", customer: "Pooja Patel", amount: 320, status: "delivered", createdAt: new Date(Date.now() - 75 * 60000).toISOString() },
      { id: "PVP-9036", customer: "Deepak Rawat", amount: 520, status: "cancelled", createdAt: new Date(Date.now() - 120 * 60000).toISOString() }
    ]);
  }

  // GET /inventory?storeId=
  if (url.includes("/inventory") && config.params?.storeId) {
    return successRes([
      { item: "Processed Pizza Cheese", quantity: "12 kg", threshold: "50 kg", status: "Low Stock" },
      { item: "Wheat Pizza Dough Base", quantity: "80 units", threshold: "100 units", status: "Low Stock" },
      { item: "Fresh Diced Paneer Cubes", quantity: "18 kg", threshold: "15 kg", status: "In Stock" },
      { item: "Sweet Corn Kernels", quantity: "25 kg", threshold: "20 kg", status: "In Stock" },
      { item: "Tomato Pizza Sauce", quantity: "35 litres", threshold: "40 litres", status: "Low Stock" }
    ]);
  }

  // GET /reviews?storeId=
  if (url.includes("/reviews") && config.params?.storeId) {
    return successRes([
      { rating: 5, comment: "Superb pizza! Extremely cheesy and hot. Highly recommended.", customer: "Rajesh Joshi", date: "2026-06-19" },
      { rating: 4, comment: "Good taste, garlic bread was also nice. Timely delivery.", customer: "Shweta Tiwari", date: "2026-06-18" },
      { rating: 5, comment: "Papa Veg Pizza Indore has the best Margherita in town!", customer: "Karan Johar", date: "2026-06-15" }
    ]);
  }

  // GET /stores/dashboard-kpis
  if (url.includes("/stores/dashboard-kpis")) {
    const unarchived = db.stores.filter(s => s.isArchived !== true);
    const activeStores = unarchived.filter(s => s.status === "Active");
    const openNow = activeStores.filter(s => s.isOpen === true).length;
    const closedStores = unarchived.filter(s => s.status === "Closed").length;
    const totalRating = unarchived.reduce((sum, s) => sum + (s.averageRating || 0), 0);
    const avgRating = unarchived.length > 0 ? (totalRating / unarchived.length).toFixed(1) : "0.0";
    
    return successRes({
      totalStores: unarchived.length,
      activeStoresCount: activeStores.length,
      openNowCount: openNow,
      closedStoresCount: closedStores,
      averageRating: parseFloat(avgRating),
      ordersToday: 1246
    });
  }

  // --- CAMPAIGNS MARKETING MOCKS ---
  if (url.includes("/campaign-performance/")) {
    const id = url.split("/").pop();
    const performance = db.campaignPerformance[id] || {
      _id: `perf-${id}`,
      campaignId: id,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ordersGenerated: 0,
      revenueGenerated: 0,
      roi: 0,
      updatedAt: new Date().toISOString(),
      dailyBreakdown: []
    };
    
    // Add calculated CTR & Conversion percentages
    const ctr = performance.impressions > 0 ? ((performance.clicks / performance.impressions) * 100).toFixed(2) : "0.00";
    const conversionRate = performance.clicks > 0 ? ((performance.conversions / performance.clicks) * 100).toFixed(2) : "0.00";

    const campaign = db.campaigns.find(c => c._id === id);
    return successRes({
      campaign,
      performance: {
        ...performance,
        ctr,
        conversionRate
      }
    });
  }

  if (url.includes("/campaigns")) {
    if (method === "get") {
      const idMatch = url.match(/\/campaigns\/([^/]+)$/);
      if (idMatch) {
        const id = idMatch[1];
        const campaign = db.campaigns.find(c => c._id === id);
        if (campaign) return successRes(campaign);
        return errorRes("Campaign not found", 404);
      }
      return successRes(db.campaigns);
    }
    if (method === "post") {
      const newCamp = {
        ...data,
        _id: `camp-${Date.now()}`,
        status: data?.status || "draft",
        createdBy: "Shubham Jamliya",
        createdAt: new Date().toISOString()
      };
      db.campaigns.unshift(newCamp);
      
      // Create empty performance entry
      db.campaignPerformance[newCamp._id] = {
        _id: `perf-${Date.now()}`,
        campaignId: newCamp._id,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ordersGenerated: 0,
        revenueGenerated: 0,
        roi: 0,
        updatedAt: new Date().toISOString(),
        dailyBreakdown: []
      };
      
      saveDB();
      return successMsg("Campaign created successfully", newCamp);
    }

    const match = url.match(/\/campaigns\/([^/]+)$/);
    if (match) {
      const id = match[1];
      if (method === "put" || method === "patch") {
        const idx = db.campaigns.findIndex(c => c._id === id);
        if (idx !== -1) {
          db.campaigns[idx] = { ...db.campaigns[idx], ...data };
          saveDB();
          return successMsg("Campaign updated successfully", db.campaigns[idx]);
        }
        return errorRes("Campaign not found", 404);
      }
      if (method === "delete") {
        const idx = db.campaigns.findIndex(c => c._id === id);
        if (idx !== -1) {
          const removed = db.campaigns[idx];
          db.campaigns = db.campaigns.filter(c => c._id !== id);
          delete db.campaignPerformance[id];
          saveDB();
          return successMsg(`Campaign "${removed.campaignName}" deleted successfully`);
        }
        return errorRes("Campaign not found", 404);
      }
    }
  }

  // --- BANNERS MARKETING MOCKS ---
  if (url.includes("/banners")) {
    if (method === "get") {
      const idMatch = url.match(/\/banners\/([^/]+)$/);
      if (idMatch) {
        const id = idMatch[1];
        const banner = db.banners.find(b => b._id === id);
        if (banner) return successRes(banner);
        return errorRes("Banner not found", 404);
      }
      
      let bannersList = [...db.banners];
      const params = config.params || {};
      const search = params.search || "";
      const status = params.status || "All";
      const redirectType = params.redirectType || "All";
      const storeId = params.storeId || "All";
      
      if (search) {
        const q = search.toLowerCase();
        bannersList = bannersList.filter(b => b.title?.toLowerCase().includes(q) || b.subtitle?.toLowerCase().includes(q));
      }
      
      if (status !== "All") {
        bannersList = bannersList.filter(b => {
          const now = new Date();
          if (status.toLowerCase() === "active") {
            const isNotExpired = new Date(b.endDate) >= now;
            const isStarted = new Date(b.startDate) <= now;
            return b.status === "active" && isNotExpired && isStarted;
          }
          if (status.toLowerCase() === "expired") {
            return new Date(b.endDate) < now;
          }
          if (status.toLowerCase() === "scheduled") {
            return new Date(b.startDate) > now;
          }
          return b.status === status.toLowerCase();
        });
      }
      
      if (redirectType !== "All") {
        bannersList = bannersList.filter(b => b.redirectType === redirectType.toLowerCase());
      }
      
      if (storeId !== "All" && storeId) {
        bannersList = bannersList.filter(b => !b.stores || b.stores.length === 0 || b.stores.includes(storeId));
      }
      
      return successRes(bannersList);
    }
    
    if (method === "post") {
      const newBanner = {
        ...data,
        _id: `banner-${Date.now()}`,
        status: data?.status || "inactive",
        createdBy: "Shubham Jamliya",
        createdAt: new Date().toISOString()
      };
      db.banners.unshift(newBanner);
      saveDB();
      return successMsg("Banner created successfully", newBanner);
    }

    const match = url.match(/\/banners\/([^/]+)$/);
    if (match) {
      const id = match[1];
      if (method === "put" || method === "patch") {
        const idx = db.banners.findIndex(b => b._id === id);
        if (idx !== -1) {
          db.banners[idx] = { ...db.banners[idx], ...data };
          saveDB();
          return successMsg("Banner updated successfully", db.banners[idx]);
        }
        return errorRes("Banner not found", 404);
      }
      if (method === "delete") {
        const idx = db.banners.findIndex(b => b._id === id);
        if (idx !== -1) {
          const removed = db.banners[idx];
          db.banners = db.banners.filter(b => b._id !== id);
          saveDB();
          return successMsg(`Banner "${removed.title}" deleted successfully`);
        }
        return errorRes("Banner not found", 404);
      }
    }
  }

  // --- IMAGE UPLOAD MOCK ---
  if (url.includes("/upload")) {
    if (method === "post") {
      const mockImageUrls = [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1200&q=80"
      ];
      const randomUrl = mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)];
      return successRes({ imageUrl: randomUrl });
    }
  }

  // --- ADDITIONAL MARKETING GETTERS ---
  if (url.includes("/products") && method === "get") {
    return successRes(db.products);
  }

  if (url.includes("/coupons") && method === "get") {
    return successRes(db.coupons);
  }

  // GET /stores/:id/performance
  if (url.match(/\/stores\/([^/]+)\/performance$/)) {
    const match = url.match(/\/stores\/([^/]+)\/performance$/);
    const id = match[1];
    const store = db.stores.find(s => s._id === id);
    if (!store) return errorRes("Store not found", 404);

    return successRes({
      ordersToday: Math.floor(Math.random() * 50) + 20,
      weeklyOrders: Math.floor(Math.random() * 300) + 150,
      monthlyRevenue: Math.floor(Math.random() * 200000) + 100000,
      averageRating: store.averageRating || 4.5,
      cancellationRate: "1.2%",
      completionRate: "98.8%",
      revenueTrend: [
        { name: "Mon", revenue: 12000 },
        { name: "Tue", revenue: 15000 },
        { name: "Wed", revenue: 18000 },
        { name: "Thu", revenue: 14000 },
        { name: "Fri", revenue: 22000 },
        { name: "Sat", revenue: 28000 },
        { name: "Sun", revenue: 25000 }
      ],
      ordersTrend: [
        { name: "Mon", orders: 40 },
        { name: "Tue", orders: 50 },
        { name: "Wed", orders: 60 },
        { name: "Thu", orders: 45 },
        { name: "Fri", orders: 75 },
        { name: "Sat", orders: 95 },
        { name: "Sun", orders: 85 }
      ],
      topProducts: [
        { name: "Veg Supreme Pizza", sales: 120 },
        { name: "Margherita Pizza", sales: 95 },
        { name: "Garlic Breadsticks", sales: 80 }
      ],
      customerRatings: [
        { rating: "5 Star", count: 140 },
        { rating: "4 Star", count: 45 },
        { rating: "3 Star", count: 12 },
        { rating: "2 Star", count: 3 },
        { rating: "1 Star", count: 1 }
      ]
    });
  }

  // GET /stores/:id/hours
  if (url.match(/\/stores\/([^/]+)\/hours$/)) {
    const match = url.match(/\/stores\/([^/]+)\/hours$/);
    const id = match[1];
    const store = db.stores.find(s => s._id === id);
    if (!store) return errorRes("Store not found", 404);

    const schedule = store.operatingHours || [
      { day: "Monday", openTime: "11:00", closeTime: "23:00", isHoliday: false },
      { day: "Tuesday", openTime: "11:00", closeTime: "23:00", isHoliday: false },
      { day: "Wednesday", openTime: "11:00", closeTime: "23:00", isHoliday: false },
      { day: "Thursday", openTime: "11:00", closeTime: "23:00", isHoliday: false },
      { day: "Friday", openTime: "11:00", closeTime: "23:00", isHoliday: false },
      { day: "Saturday", openTime: "11:00", closeTime: "23:30", isHoliday: false },
      { day: "Sunday", openTime: "11:00", closeTime: "23:30", isHoliday: false }
    ];
    return successRes(schedule);
  }

  // PATCH /stores/:id/status
  if (method === "patch" && url.match(/\/stores\/([^/]+)\/status$/)) {
    const match = url.match(/\/stores\/([^/]+)\/status$/);
    const id = match[1];
    const storeIdx = db.stores.findIndex(s => s._id === id);
    if (storeIdx !== -1) {
      db.stores[storeIdx].status = data.status;
      db.stores[storeIdx].isOpen = data.status === "Active";
      db.stores[storeIdx].statusChangeReason = data.reason || "";
      db.stores[storeIdx].updatedAt = new Date().toISOString();
      saveDB();
      return successMsg("Store status updated successfully", db.stores[storeIdx]);
    }
    return errorRes("Store not found", 404);
  }

  // PATCH /stores/:id/hours
  if (method === "patch" && url.match(/\/stores\/([^/]+)\/hours$/)) {
    const match = url.match(/\/stores\/([^/]+)\/hours$/);
    const id = match[1];
    const storeIdx = db.stores.findIndex(s => s._id === id);
    if (storeIdx !== -1) {
      db.stores[storeIdx].operatingHours = data.hours || data;
      db.stores[storeIdx].updatedAt = new Date().toISOString();
      saveDB();
      return successMsg("Operating hours updated successfully", db.stores[storeIdx]);
    }
    return errorRes("Store not found", 404);
  }

  // PATCH or DELETE or GET /stores/:id
  const storeIdMatch = url.match(/\/stores\/([^/]+)$/);
  if (storeIdMatch) {
    const id = storeIdMatch[1];
    const storeIdx = db.stores.findIndex(s => s._id === id);
    
    if (method === "get") {
      if (storeIdx !== -1) {
        return successRes(db.stores[storeIdx]);
      }
      return errorRes("Store not found", 404);
    }
    
    if (method === "patch") {
      if (storeIdx !== -1) {
        db.stores[storeIdx] = {
          ...db.stores[storeIdx],
          ...data,
          address: {
            ...db.stores[storeIdx].address,
            ...(data.address || {})
          },
          updatedAt: new Date().toISOString()
        };
        saveDB();
        return successMsg("Store details updated successfully", db.stores[storeIdx]);
      }
      return errorRes("Store not found", 404);
    }

    if (method === "delete") {
      if (storeIdx !== -1) {
        db.stores[storeIdx].isArchived = true;
        db.stores[storeIdx].status = "Closed";
        db.stores[storeIdx].isOpen = false;
        db.stores[storeIdx].updatedAt = new Date().toISOString();
        saveDB();
        return successMsg("Store archived successfully");
      }
      return errorRes("Store not found", 404);
    }
  }

  // 10. Store Approvals Dashboard endpoint
  if (url.includes("/store-approvals/dashboard")) {
    const pending = db.storeApprovals.filter(s => s.status === "Pending").length;
    const approved = db.storeApprovals.filter(s => s.status === "Approved").length;
    const rejected = db.storeApprovals.filter(s => s.status === "Rejected").length;
    return successRes({
      pendingApprovals: pending || 18,
      approvedToday: approved || 7,
      rejectedStores: rejected || 4,
      avgApprovalTime: 3.2
    });
  }

  // 11. Store Approvals Audit timeline
  const auditMatch = url.match(/\/store-approvals\/([^/]+)\/audit$/);
  if (auditMatch) {
    const id = auditMatch[1];
    const app = db.storeApprovals.find(s => s._id === id);
    if (!app) return errorRes("Approval record not found", 404);
    
    const logs = [
      { actor: app.submittedBy || "Franchise Manager", action: "Submitted", date: app.createdAt, remarks: app.remarks || "No remarks" }
    ];
    if (app.status === "Approved") {
      logs.push({ actor: app.approvedBy || "Super Admin", action: "Approved", date: app.approvedAt || new Date().toISOString(), remarks: "Store approved and configuration activated." });
    } else if (app.status === "Rejected") {
      logs.push({ actor: "Super Admin", action: "Rejected", date: app.approvedAt || new Date().toISOString(), remarks: `Rejected: ${app.rejectionReason}` });
    }
    return successRes(logs);
  }

  // 12. Store Approvals Documents Zip download
  if (url.match(/\/store-approvals\/([^/]+)\/documents$/)) {
    return successMsg("Document zip download simulation started.");
  }

  // 13. PATCH approve store approval
  if (method === "patch" && url.match(/\/store-approvals\/([^/]+)\/approve$/)) {
    const match = url.match(/\/store-approvals\/([^/]+)\/approve$/);
    const id = match[1];
    const appIdx = db.storeApprovals.findIndex(s => s._id === id);
    if (appIdx !== -1) {
      db.storeApprovals[appIdx].status = "Approved";
      db.storeApprovals[appIdx].approvedBy = "Super Admin";
      db.storeApprovals[appIdx].approvedAt = new Date().toISOString();
      
      // Also ensure corresponding store in db.stores is set to Active and isOpen is true
      const storeId = db.storeApprovals[appIdx].storeId;
      const storeIdx = db.stores.findIndex(s => s._id === storeId);
      if (storeIdx !== -1) {
        db.stores[storeIdx].status = "Active";
        db.stores[storeIdx].isOpen = true;
        db.stores[storeIdx].updatedAt = new Date().toISOString();
      } else {
        // Create new store if it doesn't exist
        const app = db.storeApprovals[appIdx];
        const newStore = {
          _id: storeId,
          franchiseId: app.franchiseId || "fran-1",
          storeCode: app.storeCode,
          storeName: app.storeName,
          managerId: app.managerId,
          phone: app.phone,
          email: app.email,
          address: app.address,
          status: "Active",
          storeType: app.storeType,
          openingDate: new Date().toISOString().split("T")[0],
          currentCapacity: 0,
          totalOrders: 0,
          averageRating: 5.0,
          isOpen: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        db.stores.unshift(newStore);
      }
      saveDB();
      return successMsg("Store approved successfully", db.storeApprovals[appIdx]);
    }
    return errorRes("Approval record not found", 404);
  }

  // 14. PATCH reject store approval
  if (method === "patch" && url.match(/\/store-approvals\/([^/]+)\/reject$/)) {
    const match = url.match(/\/store-approvals\/([^/]+)\/reject$/);
    const id = match[1];
    const appIdx = db.storeApprovals.findIndex(s => s._id === id);
    if (appIdx !== -1) {
      db.storeApprovals[appIdx].status = "Rejected";
      db.storeApprovals[appIdx].rejectionReason = data.reason || "Documents Incomplete";
      db.storeApprovals[appIdx].approvedBy = "Super Admin";
      db.storeApprovals[appIdx].approvedAt = new Date().toISOString();
      db.storeApprovals[appIdx].remarks = data.comments || "";
      
      // Update corresponding store in db.stores to Inactive / Closed
      const storeId = db.storeApprovals[appIdx].storeId;
      const storeIdx = db.stores.findIndex(s => s._id === storeId);
      if (storeIdx !== -1) {
        db.stores[storeIdx].status = "Closed";
        db.stores[storeIdx].isOpen = false;
        db.stores[storeIdx].updatedAt = new Date().toISOString();
      }
      saveDB();
      return successMsg("Store rejected successfully", db.storeApprovals[appIdx]);
    }
    return errorRes("Approval record not found", 404);
  }

  // 15. GET list of approvals
  if (url.includes("/store-approvals")) {
    if (method === "get") {
      let filtered = [...db.storeApprovals];
      const search = config.params?.search || "";
      const status = config.params?.status || "";
      const city = config.params?.city || "";
      const managerId = config.params?.managerId || "";
      const startDate = config.params?.startDate || "";
      const endDate = config.params?.endDate || "";
      const sort = config.params?.sort || "createdAt";
      const order = config.params?.order || "desc";

      if (search) {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(s => 
          s.storeName.toLowerCase().includes(q) ||
          s._id.toLowerCase().includes(q) ||
          (s.managerName || "").toLowerCase().includes(q)
        );
      }

      if (status && status !== "All") {
        filtered = filtered.filter(s => s.status === status);
      }

      if (city && city !== "All") {
        filtered = filtered.filter(s => s.address?.city === city);
      }

      if (managerId && managerId !== "All") {
        filtered = filtered.filter(s => s.managerId === managerId);
      }

      if (startDate) {
        filtered = filtered.filter(s => new Date(s.createdAt) >= new Date(startDate));
      }
      if (endDate) {
        filtered = filtered.filter(s => new Date(s.createdAt) <= new Date(endDate + "T23:59:59.999Z"));
      }

      // Sorting
      filtered.sort((a, b) => {
        let valA = a[sort];
        let valB = b[sort];
        if (typeof valA === "string") {
          return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return order === "asc" ? (valA || 0) - (valB || 0) : (valB || 0) - (valA || 0);
      });

      const page = parseInt(config.params?.page || "1", 10);
      const limit = parseInt(config.params?.limit || "10", 10);
      const totalCount = filtered.length;

      const startIndex = (page - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);

      return successRes({
        approvals: paginated,
        totalCount,
        page,
        limit
      });
    }
  }

  // 15b. Store Pricing Management Endpoints
  if (url.includes("/store-pricing")) {
    if (url.includes("/bulk-action")) {
      return successRes(storePricingService.applyBulkAction(data.pricingIds, data.action, data.payload || {}));
    }
    const idMatch = url.match(/\/store-pricing\/([^/?]+)/);
    if (idMatch && idMatch[1] !== "bulk-action") {
      const id = idMatch[1];
      if (method === "put" || method === "patch") {
        return successRes(storePricingService.updateStorePricing(id, data));
      }
      return successRes(storePricingService.getStorePricingById(id));
    }
    return successRes(storePricingService.getStorePricing(config.params || {}));
  }

  if (url.includes("/bulk-price-update") && method === "post") {
    return successRes(storePricingService.bulkPriceUpdate(data));
  }

  if (url.includes("/copy-pricing") && method === "post") {
    return successRes(storePricingService.copyPricing(data));
  }

  if (url.includes("/price-history/")) {
    const productIdMatch = url.match(/\/price-history\/([^/?]+)/);
    if (productIdMatch) {
      const productId = productIdMatch[1];
      return successRes(storePricingService.getPriceHistory(productId, config.params || {}));
    }
  }

  // GET or POST /stores
  if (url.includes("/stores")) {
    if (method === "get") {
      let filtered = db.stores.filter(s => s.isArchived !== true);
      
      const search = config.params?.search || "";
      const status = config.params?.status || "";
      const type = config.params?.type || "";
      const isOpen = config.params?.isOpen || "";
      const manager = config.params?.manager || "";
      const sort = config.params?.sort || "";
      const order = config.params?.order || "asc";
      
      if (search) {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(s => 
          s.storeName.toLowerCase().includes(q) ||
          s.storeCode.toLowerCase().includes(q) ||
          (s.address?.city || "").toLowerCase().includes(q)
        );
      }
      
      if (status && status !== "All") {
        filtered = filtered.filter(s => s.status === status);
      }
      
      if (type && type !== "All") {
        filtered = filtered.filter(s => s.storeType === type);
      }
      
      if (isOpen) {
        const openBool = isOpen === "true" || isOpen === true;
        filtered = filtered.filter(s => s.isOpen === openBool);
      }
      
      if (manager && manager !== "All") {
        filtered = filtered.filter(s => s.managerId === manager);
      }
      
      // Sorting
      if (sort) {
        filtered.sort((a, b) => {
          let valA = a[sort];
          let valB = b[sort];
          if (sort === "city") {
            valA = a.address?.city || "";
            valB = b.address?.city || "";
          }
          if (typeof valA === "string") {
            return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
          return order === "asc" ? (valA || 0) - (valB || 0) : (valB || 0) - (valA || 0);
        });
      }
      
      const page = parseInt(config.params?.page || "1", 10);
      const limit = parseInt(config.params?.limit || "10", 10);
      const totalCount = filtered.length;
      
      const startIndex = (page - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);
      
      return successRes({
        stores: paginated,
        totalCount,
        page,
        limit
      });
    }

    if (method === "post") {
      const newStore = {
        _id: `store-${Date.now()}`,
        franchiseId: "fran-1",
        storeCode: data.storeCode || `PVP-STR-${Date.now().toString().slice(-4)}`,
        storeName: data.storeName || "New Store Outlet",
        managerId: data.managerId || "",
        phone: data.phone || "",
        email: data.email || "",
        address: {
          line1: data.address?.line1 || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          pincode: data.address?.pincode || "",
          coordinates: data.address?.coordinates || [75.8763, 22.7196]
        },
        status: data.status || "Active",
        storeType: data.storeType || "Regular",
        openingDate: data.openingDate || new Date().toISOString().split("T")[0],
        currentCapacity: data.currentCapacity || 25,
        totalOrders: 0,
        averageRating: 5.0,
        isOpen: data.status === "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.stores.unshift(newStore);
      saveDB();
      return successMsg("Store created successfully", newStore);
    }
  }

  // --- STORE PERFORMANCE ANALYTICS MOCK ENDPOINTS ---

  // GET /store-performance/dashboard
  if (url.includes("/store-performance/dashboard")) {
    const activePerfs = db.storePerformance.filter(p => p.status === "Active");
    const totalRev = activePerfs.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const totalOrd = activePerfs.reduce((sum, p) => sum + (p.totalOrders || 0), 0);
    const avgPrep = activePerfs.length > 0 ? Math.round(activePerfs.reduce((sum, p) => sum + (p.avgPreparationTime || 0), 0) / activePerfs.length) : 14;
    const avgDel = activePerfs.length > 0 ? Math.round(activePerfs.reduce((sum, p) => sum + (p.avgDeliveryTime || 0), 0) / activePerfs.length) : 24;
    const avgRating = activePerfs.length > 0 ? (activePerfs.reduce((sum, p) => sum + (p.customerRating || 0), 0) / activePerfs.length).toFixed(1) : "4.8";
    
    // Best store is the one with the highest performanceScore
    let bestStoreName = "Papa Veg Pizza - Indore Central";
    if (activePerfs.length > 0) {
      const sortedByScore = [...activePerfs].sort((a, b) => b.performanceScore - a.performanceScore);
      bestStoreName = sortedByScore[0].storeName;
    }

    return successRes({
      revenueToday: totalRev || 185000,
      ordersToday: totalOrd || 1260,
      avgPreparationTime: avgPrep || 14,
      avgDeliveryTime: avgDel || 24,
      customerRating: parseFloat(avgRating) || 4.8,
      cancellationRate: 2.1,
      inventoryWaste: 3.0,
      bestStore: bestStoreName
    });
  }

  // GET /store-performance/revenue
  if (url.includes("/store-performance/revenue")) {
    return successRes({
      daily: [
        { time: "Mon", revenue: 85000 },
        { time: "Tue", revenue: 98000 },
        { time: "Wed", revenue: 112000 },
        { time: "Thu", revenue: 95000 },
        { time: "Fri", revenue: 142050 },
        { time: "Sat", revenue: 185000 },
        { time: "Sun", revenue: 165000 }
      ],
      weekly: [
        { time: "Week 1", revenue: 650000 },
        { time: "Week 2", revenue: 780000 },
        { time: "Week 3", revenue: 890000 },
        { time: "Week 4", revenue: 1120000 }
      ],
      monthly: [
        { time: "Jan", revenue: 2400000 },
        { time: "Feb", revenue: 2800000 },
        { time: "Mar", revenue: 3100000 },
        { time: "Apr", revenue: 2900000 },
        { time: "May", revenue: 3800000 },
        { time: "Jun", revenue: 4200000 }
      ]
    });
  }

  // GET /store-performance/orders
  if (url.includes("/store-performance/orders")) {
    return successRes([
      { time: "Mon", completed: 580, cancelled: 12 },
      { time: "Tue", completed: 620, cancelled: 15 },
      { time: "Wed", completed: 740, cancelled: 18 },
      { time: "Thu", completed: 690, cancelled: 10 },
      { time: "Fri", completed: 950, cancelled: 22 },
      { time: "Sat", completed: 1260, cancelled: 26 },
      { time: "Sun", completed: 1100, cancelled: 20 }
    ]);
  }

  // GET /store-performance/ratings
  if (url.includes("/store-performance/ratings")) {
    return successRes([
      { time: "Mon", rating: 4.6 },
      { time: "Tue", rating: 4.7 },
      { time: "Wed", rating: 4.8 },
      { time: "Thu", rating: 4.6 },
      { time: "Fri", rating: 4.7 },
      { time: "Sat", rating: 4.8 },
      { time: "Sun", rating: 4.9 }
    ]);
  }

  // GET /store-performance/comparison
  if (url.includes("/store-performance/comparison")) {
    const list = db.storePerformance.filter(p => p.status === "Active").slice(0, 5);
    return successRes(
      list.map(p => ({
        name: p.storeName.replace("Papa Veg Pizza - ", ""),
        revenue: p.revenue,
        orders: p.totalOrders,
        rating: p.customerRating,
        cancellation: parseFloat(((p.cancelledOrders / (p.totalOrders || 1)) * 100).toFixed(1))
      }))
    );
  }

  // GET /store-performance/busy-hours
  if (url.includes("/store-performance/busy-hours")) {
    return successRes([
      { hour: "11 AM", density: 30 },
      { hour: "12 PM", density: 55 },
      { hour: "1 PM", density: 85 },
      { hour: "2 PM", density: 60 },
      { hour: "3 PM", density: 40 },
      { hour: "4 PM", density: 35 },
      { hour: "5 PM", density: 45 },
      { hour: "6 PM", density: 70 },
      { hour: "7 PM", density: 90 },
      { hour: "8 PM", density: 100 },
      { hour: "9 PM", density: 95 },
      { hour: "10 PM", density: 75 },
      { hour: "11 PM", density: 40 }
    ]);
  }

  // GET /store-performance/compare
  if (url.includes("/store-performance/compare")) {
    let storeIdsStr = config.params?.storeIds || "";
    if (!storeIdsStr) {
      const match = url.match(/[?&]storeIds=([^&]+)/);
      if (match) storeIdsStr = decodeURIComponent(match[1]);
    }
    const storeIds = storeIdsStr ? storeIdsStr.split(",") : [];
    
    // Find matching performance records
    let perfs = db.storePerformance.filter(p => storeIds.includes(p.storeId) || storeIds.includes(p._id));
    
    // Fallback to seed data if localStorage db is out of sync or missing these records
    if (perfs.length === 0 && initialStorePerformance) {
      perfs = initialStorePerformance.filter(p => storeIds.includes(p.storeId) || storeIds.includes(p._id));
    }
    
    return successRes(perfs);
  }

  // GET /store-performance/export
  if (url.includes("/store-performance/export")) {
    return successMsg("Report export started. Your file will download automatically.");
  }

  // Single Store Analytics subroutes
  const singleStorePerfMatch = url.match(/\/store-performance\/([^/]+)\/([^/]+)$/);
  if (singleStorePerfMatch) {
    const storeId = singleStorePerfMatch[1];
    const subRoute = singleStorePerfMatch[2];
    const perf = db.storePerformance.find(p => p.storeId === storeId) || db.storePerformance[0];

    if (subRoute === "revenue") {
      return successRes({
        todayRevenue: perf.revenue || 56000,
        weeklyRevenue: (perf.revenue * 6.5) || 364000,
        monthlyRevenue: (perf.revenue * 27) || 1512000,
        avgOrderValue: perf.avgOrderValue || 200,
        trend: [
          { time: "Mon", revenue: perf.revenue * 0.7 },
          { time: "Tue", revenue: perf.revenue * 0.8 },
          { time: "Wed", revenue: perf.revenue * 0.9 },
          { time: "Thu", revenue: perf.revenue * 0.8 },
          { time: "Fri", revenue: perf.revenue * 1.1 },
          { time: "Sat", revenue: perf.revenue },
          { time: "Sun", revenue: perf.revenue * 0.95 }
        ],
        paymentMethods: [
          { name: "UPI / NetBanking", value: 65 },
          { name: "Credit / Debit Cards", value: 25 },
          { name: "Cash on Delivery", value: 10 }
        ],
        distribution: [
          { category: "Pizzas", value: 60 },
          { category: "Sides & Garlic Bread", value: 25 },
          { category: "Beverages", value: 10 },
          { category: "Desserts", value: 5 }
        ]
      });
    }

    if (subRoute === "orders") {
      return successRes({
        totalOrders: perf.totalOrders || 280,
        completedOrders: perf.completedOrders || 274,
        cancelledOrders: perf.cancelledOrders || 6,
        completionRate: parseFloat(((perf.completedOrders / (perf.totalOrders || 1)) * 100).toFixed(1)) || 97.9,
        avgOrdersPerHour: Math.round(perf.totalOrders / 12) || 23,
        dailyOrders: [
          { time: "Mon", completed: 180, cancelled: 4 },
          { time: "Tue", completed: 210, cancelled: 5 },
          { time: "Wed", completed: 230, cancelled: 6 },
          { time: "Thu", completed: 220, cancelled: 3 },
          { time: "Fri", completed: 260, cancelled: 8 },
          { time: "Sat", completed: perf.completedOrders, cancelled: perf.cancelledOrders },
          { time: "Sun", completed: 250, cancelled: 5 }
        ],
        statusDistribution: [
          { name: "Delivered", value: 92 },
          { name: "Cancelled", value: 2.1 },
          { name: "Returned / Failed", value: 5.9 }
        ],
        peakHours: [
          { hour: "12 PM - 2 PM", count: 85 },
          { hour: "2 PM - 6 PM", count: 45 },
          { hour: "6 PM - 9 PM", count: 120 },
          { hour: "9 PM - 11 PM", count: 70 }
        ]
      });
    }

    if (subRoute === "ratings") {
      return successRes({
        avgRating: perf.customerRating || 4.8,
        totalReviews: 840,
        positiveReviews: 790,
        negativeReviews: 50,
        distribution: [
          { rating: "5 Star", count: 680 },
          { rating: "4 Star", count: 110 },
          { rating: "3 Star", count: 35 },
          { rating: "2 Star", count: 10 },
          { rating: "1 Star", count: 5 }
        ],
        trend: [
          { time: "Jan", rating: 4.5 },
          { time: "Feb", rating: 4.6 },
          { time: "Mar", rating: 4.6 },
          { time: "Apr", rating: 4.7 },
          { time: "May", rating: 4.8 },
          { time: "Jun", rating: perf.customerRating || 4.8 }
        ],
        recentReviews: [
          { customer: "Rohan Malhotra", rating: 5, comment: "Double cheese margherita was extremely hot and loaded!", date: "2026-06-20" },
          { customer: "Isha Sharma", rating: 4, comment: "Quick delivery and nice service. Dips were super tasty.", date: "2026-06-20" },
          { customer: "Amit Patel", rating: 5, comment: "Perfect crust and amazing paneer tikka pizza!", date: "2026-06-19" },
          { customer: "Sneha Varma", rating: 3, comment: "Pizza was good but delivery took around 40 minutes.", date: "2026-06-18" },
          { customer: "Manoj Joshi", rating: 5, comment: "Fabulous, standard taste is maintained.", date: "2026-06-17" }
        ]
      });
    }

    if (subRoute === "inventory") {
      return successRes({
        wastePercent: perf.inventoryWaste || 2.2,
        outOfStockItems: 2,
        stockTurnover: 12.4,
        lowStockAlerts: 4,
        wasteTrend: [
          { time: "Mon", waste: perf.inventoryWaste * 0.9 },
          { time: "Tue", waste: perf.inventoryWaste * 1.1 },
          { time: "Wed", waste: perf.inventoryWaste * 0.8 },
          { time: "Thu", waste: perf.inventoryWaste },
          { time: "Fri", waste: perf.inventoryWaste * 1.2 },
          { time: "Sat", waste: perf.inventoryWaste },
          { time: "Sun", waste: perf.inventoryWaste * 0.95 }
        ],
        consumption: [
          { ingredient: "Processed Cheese", consumed: 85, reorder: false },
          { ingredient: "Pizza Sauce", consumed: 72, reorder: false },
          { ingredient: "Wheat Flour", consumed: 94, reorder: true },
          { ingredient: "Fresh Paneer", consumed: 60, reorder: false }
        ]
      });
    }

    if (subRoute === "products") {
      return successRes({
        list: [
          { product: "Double Cheese Margherita", sold: 1200, revenue: 298800, rating: 4.9, popularity: 98 },
          { product: "Paneer Tikka Pizza", sold: 950, revenue: 379050, rating: 4.8, popularity: 95 },
          { product: "Garlic Breadsticks", sold: 800, revenue: 103200, rating: 4.7, popularity: 89 },
          { product: "Veg Supreme Pizza", sold: 680, revenue: 271320, rating: 4.6, popularity: 85 },
          { product: "Choco Lava Cake", sold: 620, revenue: 61380, rating: 4.8, popularity: 82 }
        ],
        chart: [
          { name: "Margherita", sold: 1200 },
          { name: "Paneer Tikka", sold: 950 },
          { name: "Garlic Bread", sold: 800 },
          { name: "Veg Supreme", sold: 680 },
          { name: "Choco Lava", sold: 620 }
        ]
      });
    }

    if (subRoute === "staff") {
      return successRes({
        ordersProcessed: perf.completedOrders || 274,
        avgPrepTime: perf.avgPreparationTime || 12,
        efficiencyScore: 92,
        performance: [
          { name: "Chef Suresh (Kitchen)", orders: 120, rating: 4.9 },
          { name: "Chef Anil (Oven)", orders: 95, rating: 4.8 },
          { name: "Rider Karan (Delivery)", orders: 35, rating: 4.7 },
          { name: "Rider Rahul (Delivery)", orders: 24, rating: 4.6 }
        ],
        productivity: [
          { hour: "11 AM - 3 PM", speed: 90 },
          { hour: "3 PM - 7 PM", speed: 94 },
          { hour: "7 PM - 11 PM", speed: 92 }
        ]
      });
    }
  }

  // GET /store-performance
  if (url.includes("/store-performance")) {
    if (method === "get") {
      let filtered = [...db.storePerformance];
      
      const search = config.params?.search || "";
      const storeId = config.params?.storeId || "";
      const status = config.params?.status || "";
      const type = config.params?.type || "";
      const city = config.params?.city || "";
      const sort = config.params?.sort || "";
      const order = config.params?.order || "asc";

      if (search) {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(p => 
          p.storeName.toLowerCase().includes(q) ||
          p.storeId.toLowerCase().includes(q)
        );
      }

      if (storeId && storeId !== "All") {
        filtered = filtered.filter(p => p.storeId === storeId);
      }

      if (status && status !== "All") {
        filtered = filtered.filter(p => p.status === status);
      }

      if (type && type !== "All") {
        filtered = filtered.filter(p => p.storeType === type);
      }

      if (city && city !== "All") {
        filtered = filtered.filter(p => p.city === city);
      }

      // Sorting
      if (sort) {
        filtered.sort((a, b) => {
          let valA = a[sort];
          let valB = b[sort];
          if (typeof valA === "string") {
            return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
          return order === "asc" ? (valA || 0) - (valB || 0) : (valB || 0) - (valA || 0);
        });
      }

      const page = parseInt(config.params?.page || "1", 10);
      const limit = parseInt(config.params?.limit || "10", 10);
      const totalCount = filtered.length;

      const startIndex = (page - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);

      return successRes({
        list: paginated,
        totalCount,
        page,
        limit
      });
    }
  }

  // GET /operating-hours/dashboard
  if (url.includes("/operating-hours/dashboard")) {
    const activeStores = db.stores.filter(s => s.status === "Active" && s.isArchived !== true);
    const openNow = activeStores.filter(s => s.isOpen === true).length;
    const closedStores = db.stores.filter(s => s.isOpen === false || s.status === "Closed").length;
    
    // Count 24x7 stores
    const count24x7 = db.operatingHours.filter(oh => {
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      return days.every(d => oh[d] && oh[d].open === "12:00 AM" && oh[d].close === "12:00 AM" && !oh[d].isClosed);
    }).length;

    // Count holiday closures
    const holidayCount = db.operatingHours.filter(oh => oh.holidaySchedule && oh.holidaySchedule.length > 0).length;

    return successRes({
      storesOpenNow: openNow || 8,
      storesClosed: closedStores || 4,
      stores24x7: count24x7 || 2,
      holidayClosures: holidayCount || 5,
      upcomingChanges: 3
    });
  }

  // GET /operating-hours/export
  if (url.includes("/operating-hours/export")) {
    return successMsg("Report export started. Your file will download automatically.");
  }

  // POST /operating-hours/copy
  if (url.includes("/operating-hours/copy")) {
    const sourceStoreId = data?.sourceStoreId;
    const destStoreId = data?.destStoreId;
    
    const sourceOh = db.operatingHours.find(oh => oh.storeId === sourceStoreId);
    const destIdx = db.operatingHours.findIndex(oh => oh.storeId === destStoreId);
    
    if (sourceOh && destIdx !== -1) {
      db.operatingHours[destIdx] = {
        ...db.operatingHours[destIdx],
        monday: { ...sourceOh.monday },
        tuesday: { ...sourceOh.tuesday },
        wednesday: { ...sourceOh.wednesday },
        thursday: { ...sourceOh.thursday },
        friday: { ...sourceOh.friday },
        saturday: { ...sourceOh.saturday },
        sunday: { ...sourceOh.sunday },
        updatedBy: "Super Admin",
        updatedAt: new Date().toISOString()
      };
      if (!db.operatingHours[destIdx].auditLogs) db.operatingHours[destIdx].auditLogs = [];
      db.operatingHours[destIdx].auditLogs.unshift({
        updatedBy: "Super Admin",
        action: "Copied Timings",
        date: new Date().toISOString(),
        remarks: `Copied schedule from store ${sourceStoreId}`
      });
      saveDB();
      return successMsg("Schedule copied successfully.");
    }
    return errorRes("Source or destination store not found.", 404);
  }

  // PATCH /operating-hours/bulk-update
  if (url.includes("/operating-hours/bulk-update")) {
    const storeIds = data?.storeIds || [];
    const weekdays = data?.weekdays || [];
    const open = data?.open || "09:00 AM";
    const close = data?.close || "10:00 PM";
    const isClosed = data?.isClosed || false;

    db.operatingHours.forEach((oh) => {
      if (storeIds.includes(oh.storeId)) {
        weekdays.forEach(day => {
          const d = day.toLowerCase();
          if (oh[d]) {
            oh[d] = { open, close, isClosed };
          }
        });
        oh.updatedBy = "Super Admin";
        oh.updatedAt = new Date().toISOString();
        if (!oh.auditLogs) oh.auditLogs = [];
        oh.auditLogs.unshift({
          updatedBy: "Super Admin",
          action: "Bulk Updated Timings",
          date: new Date().toISOString(),
          remarks: `Bulk updated days: ${weekdays.join(", ")}`
        });
      }
    });
    saveDB();
    return successMsg("Bulk update completed successfully.");
  }

  // Store-specific operations
  const storeStatusMatch = url.match(/\/stores\/([^/]+)\/status$/);
  if (storeStatusMatch && method === "patch") {
    const storeId = storeStatusMatch[1];
    const storeIdx = db.stores.findIndex(s => s._id === storeId);
    
    if (storeIdx !== -1) {
      const newStatus = data?.status || "Closed";
      const newIsOpen = data?.isOpen !== undefined ? data.isOpen : false;
      
      db.stores[storeIdx].status = newStatus;
      db.stores[storeIdx].isOpen = newIsOpen;
      db.stores[storeIdx].updatedAt = new Date().toISOString();
      
      // Also add audit log
      const ohIdx = db.operatingHours.findIndex(oh => oh.storeId === storeId);
      if (ohIdx !== -1) {
        if (!db.operatingHours[ohIdx].auditLogs) db.operatingHours[ohIdx].auditLogs = [];
        db.operatingHours[ohIdx].auditLogs.unshift({
          updatedBy: "Super Admin",
          action: "Status Changed / Temporary Closure",
          date: new Date().toISOString(),
          remarks: `Status updated to ${newStatus}. Closure reason: ${data?.reason || "N/A"}`
        });
        db.operatingHours[ohIdx].updatedAt = new Date().toISOString();
      }
      
      saveDB();
      return successMsg("Store status updated successfully.");
    }
    return errorRes("Store not found.", 404);
  }

  const specificOhHolidaysMatch = url.match(/\/operating-hours\/([^/]+)\/holidays$/);
  if (specificOhHolidaysMatch && method === "patch") {
    const storeId = specificOhHolidaysMatch[1];
    const ohIdx = db.operatingHours.findIndex(oh => oh.storeId === storeId);
    
    if (ohIdx !== -1) {
      db.operatingHours[ohIdx].holidaySchedule = data?.holidaySchedule || [];
      db.operatingHours[ohIdx].updatedBy = "Super Admin";
      db.operatingHours[ohIdx].updatedAt = new Date().toISOString();
      
      if (!db.operatingHours[ohIdx].auditLogs) db.operatingHours[ohIdx].auditLogs = [];
      db.operatingHours[ohIdx].auditLogs.unshift({
        updatedBy: "Super Admin",
        action: "Updated Holiday Schedule",
        date: new Date().toISOString(),
        remarks: `Updated holidays. Total defined: ${data?.holidaySchedule?.length || 0}`
      });
      
      saveDB();
      return successRes(db.operatingHours[ohIdx]);
    }
    return errorRes("Operating hours not found.", 404);
  }

  const specificOhMatch = url.match(/\/operating-hours\/([^/]+)$/);
  if (specificOhMatch) {
    const storeId = specificOhMatch[1];
    const oh = db.operatingHours.find(o => o.storeId === storeId);
    
    if (method === "get") {
      if (oh) return successRes(oh);
      return errorRes("Operating hours not found.", 404);
    }
    
    if (method === "patch") {
      const ohIdx = db.operatingHours.findIndex(o => o.storeId === storeId);
      if (ohIdx !== -1) {
        db.operatingHours[ohIdx] = {
          ...db.operatingHours[ohIdx],
          ...data,
          updatedBy: "Super Admin",
          updatedAt: new Date().toISOString()
        };
        if (!db.operatingHours[ohIdx].auditLogs) db.operatingHours[ohIdx].auditLogs = [];
        db.operatingHours[ohIdx].auditLogs.unshift({
          updatedBy: "Super Admin",
          action: "Updated Weekly Hours",
          date: new Date().toISOString(),
          remarks: "Modified days of week timings"
        });
        
        saveDB();
        return successRes(db.operatingHours[ohIdx]);
      }
      return errorRes("Operating hours not found.", 404);
    }
  }

  // GET /operating-hours (Listing with search, pagination, sort, filter)
  if (url.includes("/operating-hours") && method === "get") {
    let list = db.operatingHours.map(oh => {
      const store = db.stores.find(s => s._id === oh.storeId) || { storeName: "Unknown Store", storeCode: "N/A", status: "Closed", isOpen: false, storeType: "Regular", address: { city: "Indore" } };
      return {
        _id: oh._id,
        storeId: oh.storeId,
        storeName: store.storeName,
        storeCode: store.storeCode,
        status: store.status,
        isOpen: store.isOpen,
        storeType: store.storeType,
        city: store.address?.city || "Indore",
        schedule: oh,
        lastUpdated: oh.updatedAt
      };
    });

    const search = config.params?.search || "";
    const status = config.params?.status || "";
    const type = config.params?.type || "";
    const city = config.params?.city || "";
    const sort = config.params?.sort || "storeName";
    const order = config.params?.order || "asc";

    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(item => 
        item.storeName.toLowerCase().includes(q) ||
        item.storeCode.toLowerCase().includes(q)
      );
    }

    if (status && status !== "All") {
      const isOpenVal = status === "Open";
      list = list.filter(item => item.isOpen === isOpenVal);
    }

    if (type && type !== "All") {
      list = list.filter(item => item.storeType === type);
    }

    if (city && city !== "All") {
      list = list.filter(item => item.city.toLowerCase() === city.toLowerCase());
    }

    // Sort
    list.sort((a, b) => {
      let valA = a[sort];
      let valB = b[sort];
      if (typeof valA === "string") {
        return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return order === "asc" ? (valA || 0) - (valB || 0) : (valB || 0) - (valA || 0);
    });

    const page = parseInt(config.params?.page || "1", 10);
    const limit = parseInt(config.params?.limit || "10", 10);
    const totalCount = list.length;

    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return successRes({
      list: paginated,
      totalCount,
      page,
      limit
    });
  }

  // === NOTIFICATIONS MANAGEMENT ENDPOINTS ===

  // 1. GET /stores - Get all outlets
  if (url.match(/\/stores$/) && method === "get") {
    return successRes(db.stores);
  }

  // 2. GET /notifications - Get filtered and paginated list
  if (url.includes("/notifications") && method === "get") {
    let list = [...db.notifications];

    const search = config.params?.search || "";
    const channel = config.params?.channel || "";
    const audience = config.params?.audience || "";
    const status = config.params?.status || "";
    const startDate = config.params?.startDate || "";
    const endDate = config.params?.endDate || "";

    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(n => n.title.toLowerCase().includes(q) || (n.message || "").toLowerCase().includes(q));
    }

    if (channel && channel !== "All") {
      list = list.filter(n => n.notificationType && n.notificationType.includes(channel.toLowerCase()));
    }

    if (audience && audience !== "All") {
      list = list.filter(n => n.targetAudience === audience.toLowerCase());
    }

    if (status && status !== "All") {
      list = list.filter(n => n.status === status.toLowerCase());
    }

    if (startDate) {
      list = list.filter(n => new Date(n.createdAt) >= new Date(startDate));
    }

    if (endDate) {
      // End of day
      const endLimit = new Date(endDate);
      endLimit.setHours(23, 59, 59, 999);
      list = list.filter(n => new Date(n.createdAt) <= endLimit);
    }

    // Dynamic calculations of sentCount and openRate from logs
    const resultList = list.map(n => {
      const logs = db.notificationLogs.filter(l => l.notificationId === n._id);
      const sentCount = logs.length;
      const openedCount = logs.filter(l => l.opened).length;
      const openRate = sentCount > 0 ? Math.round((openedCount / sentCount) * 100) : 0;
      
      return {
        ...n,
        sentCount: n.status === "sent" ? (sentCount || 1200) : 0, // mock high reach for list if logs small
        openRate: n.status === "sent" ? (openRate || 68) : 0
      };
    });

    // Sort by createdAt desc
    resultList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const page = parseInt(config.params?.page || "1", 10);
    const limit = parseInt(config.params?.limit || "10", 10);
    const totalCount = resultList.length;

    const startIndex = (page - 1) * limit;
    const paginated = resultList.slice(startIndex, startIndex + limit);

    return successRes({
      list: paginated,
      totalCount,
      page,
      limit
    });
  }

  // Helper to generate simulated logs
  const simulateLogs = (notificationId, targetAudience, channels, storeIds) => {
    const customerNames = [
      "Rohan Malhotra", "Aarav Sharma", "Pooja Patel", "Rashi Kumar", "Amit Verma", 
      "Siddharth Jain", "Neha Gupta", "Vikram Singh", "Preeti Mishra", "Deepak Rawat",
      "Priya Verma", "Aman Gupta", "Kunal Sen", "Kiran Joshi", "Aanchal Mehta",
      "Devendra Rajput", "Shalini Dwivedi", "Rajesh Tiwari", "Meera Nair", "Harsh Vardhan"
    ];
    const channelsList = channels && channels.length > 0 ? channels : ["push"];
    const storesList = storeIds && storeIds.length > 0 ? storeIds : db.stores.map(s => s._id);

    const generated = [];
    customerNames.forEach((name, idx) => {
      channelsList.forEach(chan => {
        const isDelivered = Math.random() < 0.96;
        const isOpened = isDelivered && Math.random() < 0.70;
        const isClicked = isOpened && Math.random() < 0.35;
        const storeId = storesList[Math.floor(Math.random() * storesList.length)];
        
        generated.push({
          _id: `log-${notificationId}-${idx}-${chan}`,
          notificationId,
          customerId: `cust-${idx + 10}`,
          customerName: name,
          channel: chan,
          sentStatus: isDelivered ? "delivered" : "failed",
          opened: isOpened,
          clicked: isClicked,
          deliveredAt: isDelivered ? new Date(Date.now() - 600000).toISOString() : null,
          storeId
        });
      });
    });
    return generated;
  };

  // 3. POST /notifications - Create notification
  if (url.includes("/notifications") && method === "post") {
    const newId = `notif-${Date.now()}`;
    const newNotification = {
      _id: newId,
      franchiseId: data?.franchiseId || "fran-central-1",
      title: data?.title || "",
      message: data?.message || "",
      notificationType: data?.notificationType || ["push"],
      targetAudience: data?.targetAudience || "all",
      stores: data?.stores || [],
      scheduleTime: data?.scheduleTime || new Date().toISOString(),
      status: data?.status || "draft",
      createdBy: "Shubham Jamliya",
      createdAt: new Date().toISOString()
    };

    db.notifications.push(newNotification);

    // If immediate send
    if (newNotification.status === "sent") {
      const generatedLogs = simulateLogs(
        newId, 
        newNotification.targetAudience, 
        newNotification.notificationType, 
        newNotification.stores
      );
      db.notificationLogs.push(...generatedLogs);
    }

    saveDB();
    return successMsg("Notification created successfully.", newNotification);
  }

  // 4. PUT /notifications/:id - Update notification
  const specificNotificationMatch = url.match(/\/notifications\/([^/]+)$/);
  if (specificNotificationMatch && method === "put") {
    const id = specificNotificationMatch[1];
    const idx = db.notifications.findIndex(n => n._id === id);

    if (idx !== -1) {
      const previousStatus = db.notifications[idx].status;
      const updated = {
        ...db.notifications[idx],
        ...data,
        updatedAt: new Date().toISOString()
      };

      db.notifications[idx] = updated;

      // If transitioning to sent
      if (updated.status === "sent" && previousStatus !== "sent") {
        // Clear any existing logs first just in case
        db.notificationLogs = db.notificationLogs.filter(l => l.notificationId !== id);
        const generatedLogs = simulateLogs(
          id, 
          updated.targetAudience, 
          updated.notificationType, 
          updated.stores
        );
        db.notificationLogs.push(...generatedLogs);
      }

      saveDB();
      return successMsg("Notification updated successfully.", updated);
    }
    return errorRes("Notification not found.", 404);
  }

  // 5. DELETE /notifications/:id - Delete notification
  if (specificNotificationMatch && method === "delete") {
    const id = specificNotificationMatch[1];
    const exists = db.notifications.some(n => n._id === id);
    if (exists) {
      db.notifications = db.notifications.filter(n => n._id !== id);
      db.notificationLogs = db.notificationLogs.filter(l => l.notificationId !== id);
      saveDB();
      return successMsg("Notification archived successfully.");
    }
    return errorRes("Notification not found.", 404);
  }

  // 6. GET /notification-logs/:id - Get analytics & detailed logs
  const specificLogsMatch = url.match(/\/notification-logs\/([^/]+)$/);
  if (specificLogsMatch && method === "get") {
    const notifId = specificLogsMatch[1];
    const notif = db.notifications.find(n => n._id === notifId);
    
    if (!notif) {
      return errorRes("Notification not found.", 404);
    }

    let logs = db.notificationLogs.filter(l => l.notificationId === notifId);

    // If notification is sent but logs are empty, auto-generate them
    if (notif.status === "sent" && logs.length === 0) {
      logs = simulateLogs(notifId, notif.targetAudience, notif.notificationType, notif.stores);
      db.notificationLogs.push(...logs);
      saveDB();
    }

    // Filter local logs for list search
    const logSearch = config.params?.search || "";
    let filteredLogs = [...logs];
    if (logSearch) {
      const q = logSearch.toLowerCase().trim();
      filteredLogs = filteredLogs.filter(l => 
        l.customerName.toLowerCase().includes(q) || 
        l.channel.toLowerCase().includes(q) ||
        l.sentStatus.toLowerCase().includes(q)
      );
    }

    // Pagination
    const page = parseInt(config.params?.page || "1", 10);
    const limit = parseInt(config.params?.limit || "10", 10);
    const startIndex = (page - 1) * limit;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + limit);

    // KPI Calculations
    const sent = logs.length;
    const delivered = logs.filter(l => l.sentStatus === "delivered").length;
    const failed = logs.filter(l => l.sentStatus === "failed").length;
    const opened = logs.filter(l => l.opened).length;
    const clicked = logs.filter(l => l.clicked).length;

    const openRate = delivered > 0 ? Math.round((opened / delivered) * 100) : 0;
    const ctr = delivered > 0 ? Math.round((clicked / delivered) * 100) : 0;

    // Deviceswise simulation
    const deviceData = [
      { device: "Android", count: Math.round(sent * 0.58), percentage: 58 },
      { device: "iOS", count: Math.round(sent * 0.30), percentage: 30 },
      { device: "Web Browser", count: Math.round(sent * 0.12), percentage: 12 }
    ];

    // Pie chart simulation
    const pieChartData = [
      { name: "Delivered", value: delivered, color: "#10b981" },
      { name: "Failed", value: failed, color: "#ef4444" },
      { name: "Pending", value: notif.status === "scheduled" ? sent : 0, color: "#3b82f6" }
    ];

    // Store breakdown simulation
    const storesList = notif.stores && notif.stores.length > 0 ? notif.stores : db.stores.map(s => s._id);
    const storeData = storesList.map(storeId => {
      const storeName = db.stores.find(s => s._id === storeId)?.name || "Unknown Store";
      const storeLogs = logs.filter(l => l.storeId === storeId);
      
      const sDelivered = storeLogs.filter(l => l.sentStatus === "delivered").length;
      const sOpened = storeLogs.filter(l => l.opened).length;
      const sClicked = storeLogs.filter(l => l.clicked).length;
      const sCtr = sDelivered > 0 ? parseFloat(((sClicked / sDelivered) * 100).toFixed(1)) : 0;

      return {
        store: storeName,
        delivered: sDelivered,
        opened: sOpened,
        clicked: sClicked,
        ctr: sCtr
      };
    });

    return successRes({
      aggregates: {
        sent: notif.status === "sent" ? (sent || 1200) : 0,
        delivered: notif.status === "sent" ? (delivered || 1160) : 0,
        failed: notif.status === "sent" ? (failed || 40) : 0,
        opened: notif.status === "sent" ? (opened || 780) : 0,
        clicked: notif.status === "sent" ? (clicked || 240) : 0,
        openRate: notif.status === "sent" ? (openRate || 67) : 0,
        ctr: notif.status === "sent" ? (ctr || 21) : 0
      },
      pieChartData,
      deviceData,
      storeData,
      logsList: {
        list: paginatedLogs,
        totalCount: filteredLogs.length,
        page,
        limit
      }
    });
  }

  // --- STAFF REPORT ENDPOINTS ---
  if (url.includes("/reports/staff/summary") || url.includes("/reports/staff/dashboard")) {
    return successRes(mockStaffDashboardSummary);
  }

  if (url.includes("/reports/staff/role-distribution")) {
    return successRes(mockStaffRoleDistribution);
  }

  if (url.includes("/reports/staff/attendance-trend")) {
    return successRes(mockStaffAttendanceTrend);
  }

  if (url.includes("/reports/staff/delivery-performance")) {
    return successRes(mockDeliveryPerformance);
  }

  if (url.includes("/reports/staff/kitchen-performance")) {
    return successRes(mockKitchenPerformance);
  }

  if (url.includes("/reports/staff/manager-performance")) {
    return successRes(mockManagerPerformance);
  }

  if (url.includes("/reports/staff/list")) {
    const search = config.params?.search || "";
    const role = config.params?.role || "All Roles";
    const status = config.params?.status || "All";
    const storeId = config.params?.storeId || "all";

    let filtered = [...mockStaffDetailedList];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.role.toLowerCase().includes(q) ||
        s.store.toLowerCase().includes(q)
      );
    }

    if (role && role !== "All Roles" && role !== "All") {
      filtered = filtered.filter(s => s.role === role);
    }

    if (status && status !== "All") {
      filtered = filtered.filter(s => s.status === status);
    }

    if (storeId && storeId !== "all") {
      const storeName = db.stores.find(st => st._id === storeId)?.name || storeId;
      filtered = filtered.filter(s => s.store.toLowerCase().includes(storeId.toLowerCase()) || s.store.includes(storeName));
    }

    const sortBy = config.params?.sortBy || "joiningDate";
    const sortOrder = config.params?.sortOrder || "desc";
    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    const page = Number(config.params?.page) || 1;
    const limit = Number(config.params?.limit) || 10;
    const totalCount = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return successRes({
      staff: paginated,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    });
  }

  // Get Shifts History
  const staffShiftsMatch = url.match(/\/staff\/([^/]+)\/shifts$/);
  if (staffShiftsMatch && method === "get") {
    const id = staffShiftsMatch[1];
    const shifts = mockStaffShifts[id] || [
      { date: "2026-06-22", startTime: "09:00", endTime: "17:00", breakTime: 45, hoursWorked: 7.25, status: "Completed" },
      { date: "2026-06-21", startTime: "09:00", endTime: "17:00", breakTime: 45, hoursWorked: 7.25, status: "Completed" }
    ];
    return successRes({ shifts });
  }

  // Get Single Staff Details
  const singleStaffMatch = url.match(/\/staff\/([^/]+)$/);
  if (singleStaffMatch && method === "get" && !url.includes("/reports/")) {
    const id = singleStaffMatch[1];
    const staffBase = mockStaffDetailedList.find(s => s.id === id) || mockStaffDetailedList[0];
    
    const staffDetail = {
      ...staffBase,
      phone: "+91 99887 76655",
      email: `${staffBase.name.toLowerCase().replace(" ", ".")}@papaveg.com`,
      emergencyContact: "+91 98765 43210",
      attendanceSummary: {
        presentDays: 24,
        absentDays: 2,
        lateEntries: 3,
        halfDays: 1,
        attendancePercentage: staffBase.attendancePercentage,
        workingHours: 185.5
      },
      performanceMetrics: {
        completedOrders: staffBase.role === "Kitchen Staff" ? 320 : 0,
        completedDeliveries: staffBase.role === "Delivery Partner" ? 540 : 0,
        customerRatings: staffBase.role === "Store Manager" ? 4.7 : (staffBase.role === "Delivery Partner" ? 4.8 : 4.6),
        revenueContribution: staffBase.role === "Store Manager" ? 1680000 : 250000,
        performanceScore: staffBase.performanceScore,
        averageShiftHours: 7.8
      },
      deliveryMetrics: staffBase.role === "Delivery Partner" ? {
        deliveriesCompleted: 540,
        distanceCovered: 1620,
        averageDeliveryTime: 22.4,
        rating: 4.8,
        totalEarnings: 16200
      } : null,
      kitchenMetrics: staffBase.role === "Kitchen Staff" ? {
        ordersPrepared: 320,
        averagePreparationTime: 12.8,
        efficiencyPercentage: 96.5,
        shiftHours: 180
      } : null,
      managerMetrics: staffBase.role === "Store Manager" ? {
        ordersManaged: 4890,
        revenueGenerated: 1680000,
        complaintsHandled: 12,
        customerSatisfactionScore: 94.5
      } : null
    };

    return successRes(staffDetail);
  }

  // Get Generated Staff Reports list
  if (url.includes("/staff-reports") && method === "get") {
    return successRes(db.generated_staff_reports);
  }

  // Generate Staff Report
  if (url.includes("/reports/staff/generate") && method === "post") {
    const newRep = {
      id: `STF-2026-${Math.floor(100 + Math.random() * 900)}`,
      role: data?.role || "All Roles",
      storeName: data?.storeId === "all" ? "All Stores (Franchise-wide)" : (db.stores.find(st => st._id === data.storeId)?.name || data.storeId),
      startDate: data?.startDate || "2026-06-23",
      endDate: data?.endDate || "2026-06-23",
      status: "Completed",
      generatedBy: "Rashi Kumar (Admin)",
      createdAt: new Date().toISOString(),
      fileUrl: "#"
    };
    db.generated_staff_reports.unshift(newRep);
    saveDB();
    return successRes({
      reportId: newRep.id,
      fileUrl: newRep.fileUrl,
      status: newRep.status
    });
  }

  // Delete Generated Staff Report
  const deleteStaffReportMatch = url.match(/\/staff-reports\/([^/]+)$/);
  if (deleteStaffReportMatch && method === "delete") {
    const id = deleteStaffReportMatch[1];
    db.generated_staff_reports = db.generated_staff_reports.filter(r => r.id !== id);
    saveDB();
    return successRes({ success: true, message: "Report deleted successfully" });
  }

  // Export Staff Report
  const exportStaffReportMatch = url.match(/\/staff-reports\/([^/]+)\/export$/);
  if (exportStaffReportMatch && method === "get") {
    const id = exportStaffReportMatch[1];
    const rep = db.generated_staff_reports.find(r => r.id === id) || db.generated_staff_reports[0];
    return successRes(rep);
  }

  // --- INVENTORY REPORT ENDPOINTS ---
  if (url.includes("/reports/inventory/summary") || url.includes("/reports/inventory/dashboard")) {
    return successRes(mockInventorySummary);
  }

  if (url.includes("/reports/inventory/consumption-trend")) {
    return successRes(mockConsumptionTrend);
  }

  if (url.includes("/reports/inventory/low-stock")) {
    return successRes(mockLowStockList);
  }

  if (url.includes("/reports/inventory/ingredient-usage")) {
    const search = config.params?.search || "";
    const category = config.params?.category || "All";
    const stockStatus = config.params?.stockStatus || "All";

    let filtered = [...mockIngredientUsage];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(i => 
        i && (
          (i.name || "").toLowerCase().includes(q) || 
          (i.category || "").toLowerCase().includes(q)
        )
      );
    }

    if (category && category !== "All") {
      filtered = filtered.filter(i => i && i.category === category);
    }

    if (stockStatus && stockStatus !== "All") {
      filtered = filtered.filter(i => {
        if (!i) return false;
        if (stockStatus === "Low Stock") return i.closingStock <= 30 && i.closingStock > 10;
        if (stockStatus === "Critical") return i.closingStock <= 10 && i.closingStock > 0;
        if (stockStatus === "Out Of Stock") return i.closingStock === 0;
        return i.closingStock > 30; // Normal
      });
    }

    return successRes(filtered);
  }

  if (url.includes("/reports/inventory/purchase-analytics")) {
    return successRes(mockPurchaseRequestsAnalytics);
  }

  if (url.includes("/purchase-requests")) {
    const search = config.params?.search || "";
    let filtered = [...mockPurchaseRequests];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(pr => pr.ingredient.toLowerCase().includes(q) || pr.supplier.toLowerCase().includes(q));
    }
    return successRes(filtered);
  }

  if (url.includes("/stock-transactions")) {
    const search = config.params?.search || "";
    let filtered = [...mockStockTransactions];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(tx => tx.ingredient.toLowerCase().includes(q) || tx.transactionType.toLowerCase().includes(q));
    }
    return successRes(filtered);
  }

  if (url.includes("/reports/inventory/suppliers")) {
    return successRes(mockSuppliersSummary);
  }

  if (url.includes("/reports/inventory/list")) {
    const search = config.params?.search || "";
    let filtered = [...db.generated_inventory_reports];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(r => r.storeName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }

    const sortBy = config.params?.sortBy || "createdAt";
    const sortOrder = config.params?.sortOrder || "desc";
    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    const page = Number(config.params?.page) || 1;
    const limit = Number(config.params?.limit) || 10;
    const totalCount = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return successRes({
      reports: paginated,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    });
  }

  // Get report detail
  const singleInventoryReportMatch = url.match(/\/reports\/inventory\/([^/]+)$/);
  if (singleInventoryReportMatch && method === "get" && !url.includes("/list") && !url.includes("/generate")) {
    const id = singleInventoryReportMatch[1];
    const reportBase = db.generated_inventory_reports.find(r => r.id === id) || db.generated_inventory_reports[0];
    
    const reportDetail = {
      ...reportBase,
      openingStock: 1540,
      purchasedQuantity: 1800,
      consumedQuantity: 1245,
      closingStock: 2095,
      wastage: 59.8,
      currentInventoryValue: reportBase.stockValue,
      ingredientsTrend: [
        { date: "Mon", consumption: 180, purchases: 150, wastage: 8 },
        { date: "Tue", consumption: 190, purchases: 200, wastage: 12 },
        { date: "Wed", consumption: 210, purchases: 300, wastage: 6 },
        { date: "Thu", consumption: 175, purchases: 150, wastage: 14 }
      ]
    };
    return successRes(reportDetail);
  }

  if (url.includes("/reports/inventory/generate") && method === "post") {
    const newRep = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      storeName: data?.storeId === "all" ? "All Stores (Franchise-wide)" : (db.stores.find(st => st._id === data.storeId)?.name || data.storeId),
      startDate: data?.startDate || "2026-06-23",
      endDate: data?.endDate || "2026-06-23",
      itemsConsumed: Math.floor(1000 + Math.random() * 2000),
      stockValue: Math.floor(500000 + Math.random() * 500000),
      generatedBy: "Rashi Kumar (Admin)",
      status: "Completed",
      createdAt: new Date().toISOString(),
      fileUrl: "#"
    };
    db.generated_inventory_reports.unshift(newRep);
    saveDB();
    return successRes({
      reportId: newRep.id,
      fileUrl: newRep.fileUrl,
      status: newRep.status
    });
  }

  // Delete inventory report log
  const deleteInventoryReportMatch = url.match(/\/reports\/inventory\/([^/]+)$/);
  if (deleteInventoryReportMatch && method === "delete") {
    const id = deleteInventoryReportMatch[1];
    db.generated_inventory_reports = db.generated_inventory_reports.filter(r => r.id !== id);
    saveDB();
    return successRes({ success: true, message: "Inventory report deleted successfully" });
  }

  // Default Fallback: Success for all operations so the admin panel continues working
  return successRes({ success: true, message: "Stubbed operational response" });
}
