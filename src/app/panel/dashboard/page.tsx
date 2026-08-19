"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { isSectionEnabled } from "@/config/sections";

interface Stats {
  cars: number;
  realEstate: number;
  yachts: number;
  motorcycles: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ cars: 0, realEstate: 0, yachts: 0, motorcycles: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [carsRes, realEstateRes, yachtsRes, motorcyclesRes] = await Promise.all([
          supabase.from("cars").select("id", { count: "exact", head: true }),
          supabase.from("real_estate").select("id", { count: "exact", head: true }),
          supabase.from("yachts").select("id", { count: "exact", head: true }),
          supabase.from("motorcycles").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          cars: carsRes.count || 0,
          realEstate: realEstateRes.count || 0,
          yachts: yachtsRes.count || 0,
          motorcycles: motorcyclesRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [supabase]);

  const allStatCards = [
    {
      name: "Real Estate",
      section: "realEstate",
      count: stats.realEstate,
      href: "/panel/dashboard/real-estate",
      color: "from-emerald-500 to-emerald-600",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      name: "Cars",
      section: "cars",
      count: stats.cars,
      href: "/panel/dashboard/cars",
      color: "from-blue-500 to-blue-600",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
    },
    {
      name: "Yachts",
      section: "yachts",
      count: stats.yachts,
      href: "/panel/dashboard/yachts",
      color: "from-cyan-500 to-cyan-600",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      name: "Motorcycles",
      section: "motorcycles",
      count: stats.motorcycles,
      href: "/panel/dashboard/motorcycles",
      color: "from-orange-500 to-orange-600",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
  ];

  // Categories switched off in src/config/sections.ts are hidden from the panel
  const statCards = allStatCards.filter((card) => isSectionEnabled(card.section));

  const quickActions = [
    { section: "cars", href: "/panel/dashboard/cars/new", label: "Add New Car", color: "text-blue-400" },
    { section: "realEstate", href: "/panel/dashboard/real-estate/new", label: "Add New Property", color: "text-emerald-400" },
    { section: "yachts", href: "/panel/dashboard/yachts/new", label: "Add New Yacht", color: "text-cyan-400" },
    { section: "motorcycles", href: "/panel/dashboard/motorcycles/new", label: "Add New Motorcycle", color: "text-orange-400" },
  ].filter((action) => isSectionEnabled(action.section));

  const gettingStarted = [
    { section: "realEstate", name: "Real Estate", description: "Properties for sale" },
    { section: "cars", name: "Cars", description: "Premium vehicles" },
    { section: "yachts", name: "Yachts", description: "Luxury boats" },
    { section: "motorcycles", name: "Motorcycles", description: "Premium bikes" },
  ].filter((entry) => isSectionEnabled(entry.section));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome to West Berg Europe Admin Panel</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <div key={card.name} className="bg-slate-800 rounded-xl p-6 animate-pulse">
              <div className="h-8 w-8 bg-slate-700 rounded mb-4"></div>
              <div className="h-6 w-20 bg-slate-700 rounded mb-2"></div>
              <div className="h-10 w-16 bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className="group bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl p-6 transition"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${card.color} text-white mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{card.name}</h3>
              <p className="text-3xl font-bold text-white mt-1">{card.count}</p>
              <p className="text-sm text-slate-500 mt-2 group-hover:text-blue-400 transition">
                Manage →
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition"
              >
                <span className={action.color}>+</span>
                <span className="text-slate-300">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
          <div className="space-y-4 text-slate-400">
            <p>Welcome to your admin panel! Here you can manage:</p>
            <ul className="list-disc list-inside space-y-2">
              {gettingStarted.map((entry) => (
                <li key={entry.section}>
                  <strong className="text-white">{entry.name}</strong> - {entry.description}
                </li>
              ))}
            </ul>
            <p className="text-sm">
              All published listings will appear on the main website automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

