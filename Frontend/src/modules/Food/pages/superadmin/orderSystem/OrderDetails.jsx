import React, { useState, useEffect } from 'react';
import { 
  X, Utensils, Phone, MapPin, ChevronDown, 
  CheckCircle, Printer, Truck, ArrowRight 
} from 'lucide-react';

export default function OrderDetails({ isOpen, onClose, order, onUpdateStatus, onAssignRider }) {
  const [expandedRow, setExpandedRow] = useState(false);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsRendered(false), 300); // Wait for transition
    }
  }, [isOpen]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - Order \${order?.id || '#PV-8842'}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #111827; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
            .header h1 { margin: 0 0 10px 0; color: #af101a; font-size: 28px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 0; color: #6b7280; }
            .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .details-box { flex: 1; }
            .details-box h3 { font-size: 14px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            th, td { padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: left; }
            th { background-color: #f9fafb; font-weight: 600; text-transform: uppercase; font-size: 12px; color: #6b7280; letter-spacing: 0.05em; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .summary { width: 300px; margin-left: auto; background: #f9fafb; padding: 20px; border-radius: 8px; }
            .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; color: #4b5563; font-size: 14px; }
            .summary-row.total { font-weight: bold; font-size: 18px; border-top: 1px solid #d1d5db; padding-top: 12px; margin-top: 12px; color: #111827; }
            .footer { text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; }
            @media print {
              body { padding: 0; max-width: 100%; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Papa Veg Pizza</h1>
            <p>Tax Invoice / Bill of Supply</p>
          </div>
          
          <div class="details">
            <div class="details-box">
              <h3>Order Info</h3>
              <strong>Order ID:</strong> \${order?.id || '#PV-8842'}<br/>
              <strong>Date:</strong> \${new Date().toLocaleDateString()} \${new Date().toLocaleTimeString()}<br/>
              <strong>Status:</strong> \${order?.status || 'Active'}<br/>
              <strong>Store:</strong> \${order?.store || 'Downtown Outlet'}
            </div>
            <div class="details-box" style="text-align: right;">
              <h3>Customer Info</h3>
              <strong>\${order?.customerName || 'Rahul Sharma'}</strong><br/>
              \${order?.customerPhone || '+91 98765-43210'}<br/>
              123 Pizza Lane, Green Valley<br/>
              Sector 4, Bangalore 560001
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th class="text-center">Qty</th>
                <th class="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Margherita Large</strong><br/><span style="color: #6b7280; font-size: 13px;">Extra Cheese, Thin Crust</span></td>
                <td class="text-center">1</td>
                <td class="text-right">₹18.00</td>
              </tr>
              <tr>
                <td><strong>Garlic Bread</strong></td>
                <td class="text-center">2</td>
                <td class="text-right">₹10.00</td>
              </tr>
              <tr>
                <td><strong>Coke 500ml</strong></td>
                <td class="text-center">2</td>
                <td class="text-right">₹5.00</td>
              </tr>
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>₹33.00</span>
            </div>
            <div class="summary-row">
              <span>Add-ons:</span>
              <span>₹2.00</span>
            </div>
            <div class="summary-row">
              <span>Tax (GST 5%):</span>
              <span>₹2.50</span>
            </div>
            <div class="summary-row">
              <span>Delivery Fee:</span>
              <span>₹5.00</span>
            </div>
            <div class="summary-row total">
              <span>Grand Total:</span>
              <span>\${order?.amount || '₹42.50'}</span>
            </div>
            <div style="margin-top: 15px; text-align: center; font-size: 12px; color: #059669; font-weight: bold;">
              PAID VIA CREDIT CARD
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for ordering from Papa Veg Pizza!</p>
            <p>FSSAI License: 12345678901234 | GSTIN: 29XXXXX1234X1ZX</p>
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                // window.close(); // Optional: close window after print
              }, 300);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
  };

  if (!isRendered) return null;

  return (
    <>
      {/* Drawer Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Right Side Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[420px] lg:w-[450px] bg-white dark:bg-zinc-900 shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="px-3.5 h-12 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Order {order?.id || '#PV-8842'}</h2>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-semibold text-[10px] flex items-center gap-1">
                <Utensils size={10} className="fill-current" /> PREPARING
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] mt-0.5">Today, 10:10 AM from Downtown Outlet</p>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
          
          {/* Customer Information Section */}
          <section className="space-y-2">
            <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.1em]">Customer Details</h3>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-start gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                {order?.customerName?.substring(0, 2).toUpperCase() || 'RS'}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{order?.customerName || 'Rahul Sharma'}</p>
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
                  <Phone size={12} />
                  {order?.customerPhone || '+91 98765-43210'}
                </div>
                <div className="flex items-start gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
                  <MapPin size={12} className="shrink-0 mt-0.5" />
                  <span>123 Pizza Lane, Green Valley, Sector 4, Bangalore 560001</span>
                </div>
              </div>
            </div>
          </section>

          {/* Order Items Section */}
          <section className="space-y-2">
            <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.1em]">Order Items</h3>
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
                  <tr>
                    <th className="px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300">Item</th>
                    <th className="px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300 text-center">Qty</th>
                    <th className="px-3 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
                  {/* Margherita Row (Expandable) */}
                  <tr 
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer group" 
                    onClick={() => setExpandedRow(!expandedRow)}
                  >
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <ChevronDown 
                          size={14} 
                          className={`text-zinc-400 transition-transform ${expandedRow ? 'rotate-180' : ''}`} 
                        />
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">Margherita Large</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center text-zinc-600 dark:text-zinc-400">1</td>
                    <td className="px-3 py-2 text-right text-zinc-800 dark:text-zinc-200 font-medium">₹18.00</td>
                  </tr>
                  
                  {expandedRow && (
                    <tr className="bg-zinc-50/50 dark:bg-zinc-800/20">
                      <td className="px-7 py-1.5" colSpan="3">
                        <ul className="text-zinc-500 dark:text-zinc-400 text-[10px] space-y-1">
                          <li className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-full"></span>
                            Extra Cheese (+₹2.00)
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-full"></span>
                            Thin Crust
                          </li>
                        </ul>
                      </td>
                    </tr>
                  )}

                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-3 py-2 pl-7 text-zinc-800 dark:text-zinc-200 font-medium">Garlic Bread</td>
                    <td className="px-3 py-2 text-center text-zinc-600 dark:text-zinc-400">2</td>
                    <td className="px-3 py-2 text-right text-zinc-800 dark:text-zinc-200 font-medium">₹10.00</td>
                  </tr>
                  
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-3 py-2 pl-7 text-zinc-800 dark:text-zinc-200 font-medium">Coke 500ml</td>
                    <td className="px-3 py-2 text-center text-zinc-600 dark:text-zinc-400">2</td>
                    <td className="px-3 py-2 text-right text-zinc-800 dark:text-zinc-200 font-medium">₹5.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Order Timeline Section */}
          <section className="space-y-2">
            <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.1em]">Tracking Timeline</h3>
            <div className="relative pl-7 space-y-4">
              <div className="absolute w-[2px] h-[calc(100%-2rem)] bg-zinc-200 dark:bg-zinc-700 left-[7px] top-4 z-0"></div>
              
              {/* Timeline Point 1 */}
              <div className="relative z-10">
                <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-zinc-900"></div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Order Placed</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">10:00 AM • Web App</p>
                </div>
              </div>
              
              {/* Timeline Point 2 */}
              <div className="relative z-10">
                <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-zinc-900"></div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Accepted by Store</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">10:05 AM • Store ID: 402</p>
                </div>
              </div>
              
              {/* Timeline Point 3 (Active) */}
              <div className="relative z-10">
                <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white dark:ring-zinc-900 animate-pulse"></div>
                <div>
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-500">Preparing</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">10:10 AM • Kitchen Station 2</p>
                </div>
              </div>
            </div>
          </section>

          {/* Billing Summary */}
          <section className="space-y-2 pb-4">
            <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.1em]">Payment Summary</h3>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 space-y-1.5 border border-zinc-200 dark:border-zinc-700">
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>₹33.00</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Add-ons</span>
                <span>₹2.00</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Tax (GST 5%)</span>
                <span>₹2.50</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Delivery Fee</span>
                <span>₹5.00</span>
              </div>
              
              <div className="pt-2.5 mt-2.5 border-t border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Grand Total</span>
                <span className="text-sm font-bold text-[var(--primary)]">₹42.50</span>
              </div>
              
              <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded w-max">
                <CheckCircle size={12} className="fill-emerald-100 dark:fill-emerald-900/30" />
                PAID VIA CREDIT CARD
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 h-9 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            >
              <Printer size={14} />
              Print Invoice
            </button>
            <button 
              className="flex items-center justify-center gap-1.5 h-9 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={onAssignRider}
            >
              <Truck size={14} />
              Assign Rider
            </button>
          </div>
          <button 
            className="w-full bg-[var(--primary)] text-white text-xs h-9 font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            onClick={onUpdateStatus}
          >
            Update Status
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
