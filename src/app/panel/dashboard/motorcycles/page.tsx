"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Motorcycle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  engine_cc: number;
  color: string;
  images: string[];
  status: string;
  featured: boolean;
}

export default function MotorcyclesPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  const fetchMotorcycles = async () => {
    const { data, error } = await supabase
      .from("motorcycles")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setMotorcycles(data);
    setLoading(false);
  };

  const deleteMotorcycle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this motorcycle?")) return;

    await supabase.from("motorcycles").delete().eq("id", id);
    fetchMotorcycles();
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    await supabase.from("motorcycles").update({ status: newStatus }).eq("id", id);
    fetchMotorcycles();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Motorcycles</h1>
          <p className="text-slate-400 mt-1">Manage your motorcycle listings</p>
        </div>
        <Link
          href="/panel/dashboard/motorcycles/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Motorcycle
        </Link>
      </div>

      {loading ? (
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : motorcycles.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h3 className="text-xl font-medium text-white mb-2">No motorcycles yet</h3>
          <p className="text-slate-400 mb-6">Get started by adding your first motorcycle listing.</p>
          <Link
            href="/panel/dashboard/motorcycles/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your First Motorcycle
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Motorcycle</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {motorcycles.map((motorcycle) => (
                <tr key={motorcycle.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-slate-700 rounded-lg overflow-hidden">
                        {motorcycle.images?.[0] && (
                          <img src={motorcycle.images[0]} alt={motorcycle.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{motorcycle.title}</p>
                        <p className="text-sm text-slate-400">{motorcycle.brand} {motorcycle.model} • {motorcycle.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(motorcycle.id, motorcycle.status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        motorcycle.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : motorcycle.status === "sold"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {motorcycle.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/panel/dashboard/motorcycles/${motorcycle.id}`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => deleteMotorcycle(motorcycle.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
