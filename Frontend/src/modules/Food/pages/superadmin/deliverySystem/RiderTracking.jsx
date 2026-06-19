import React, { useState } from 'react';
import { Layers, LocateFixed, Navigation } from 'lucide-react';
import RiderTrackingData from './RiderTrackingData';
import RiderDetails from './RiderDetails';
import RiderPerformance from './RiderPerformance';

export default function RiderTracking() {
    const [selectedRider, setSelectedRider] = useState(null);
    const [performanceRider, setPerformanceRider] = useState(null);

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-zinc-900 relative">
            
            {/* Live Map Canvas */}
            <div className="flex-1 relative h-[40vh] lg:h-full w-full">
                {/* Live Map Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        alt="Geospatial Map Canvas" 
                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity brightness-75 dark:brightness-50" 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80&fm=webp"
                    />
                    {/* Map Overlay Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900/50 pointer-events-none"></div>
                </div>

                {/* Floating UI Elements */}
                <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-2.5 items-end">
                    {/* Live Indicator */}
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-lg">
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-500">Live Monitor</span>
                    </div>

                    {/* Map Controls */}
                    <div className="flex flex-col gap-1.5">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 active:scale-95 transition-all shadow-lg">
                            <Layers size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 active:scale-95 transition-all shadow-lg">
                            <LocateFixed size={16} />
                        </button>
                    </div>
                </div>

                {/* Rider Markers (Simulated) */}
                {/* Green: Available */}
                <div 
                    className="absolute top-1/3 left-1/4 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    onClick={() => setSelectedRider({ id: '3', name: 'James Bond', order: 'STATION_04', status: 'AVAILABLE' })}
                >
                    <div className="relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-extrabold uppercase shadow-xl">
                            RIDER_088: AVAILABLE
                        </div>
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <Navigation size={12} className="transform rotate-45" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-20"></div>
                    </div>
                </div>

                {/* Blue: Delivering */}
                <div 
                    className="absolute top-1/2 right-1/3 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    onClick={() => setSelectedRider({ id: '2', name: 'Sarah Connor', order: 'ORD-9925', status: 'DELIVERING' })}
                >
                    <div className="relative">
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-[var(--primary)] flex items-center justify-center text-white shadow-lg">
                            <Navigation size={12} className="transform rotate-45" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-[var(--primary)] animate-ping opacity-20"></div>
                    </div>
                </div>

                {/* Orange: Delayed */}
                <div 
                    className="absolute bottom-1/3 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    onClick={() => setSelectedRider({ id: '1', name: 'Marco Polo', order: 'ORD-9921', status: 'DELAYED' })}
                >
                    <div className="relative">
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-rose-500 flex items-center justify-center text-white shadow-lg">
                            <Navigation size={12} className="transform rotate-45" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-rose-500 animate-ping opacity-20"></div>
                    </div>
                </div>
            </div>

            {/* Right Panel / Bottom Sheet (Rider Data) */}
            <RiderTrackingData onSelectRider={setSelectedRider} />

            <RiderDetails 
                rider={selectedRider} 
                onClose={() => setSelectedRider(null)} 
                onViewPerformance={() => {
                    setPerformanceRider(selectedRider);
                    setSelectedRider(null); // Optional: close telemetry when opening analytics
                }} 
            />

            <RiderPerformance 
                rider={performanceRider} 
                onClose={() => setPerformanceRider(null)} 
            />
        </div>
    );
}
