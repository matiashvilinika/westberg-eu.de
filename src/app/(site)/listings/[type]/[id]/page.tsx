"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type ListingDetail = {
  id: string;
  title: string;
  brand?: string;
  model?: string;
  year?: number;
  price: number;
  description?: string;
  images: string[];
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  color?: string;
  // Real estate specific
  property_type?: string;
  location?: string;
  address?: string;
  area_sqm?: number;
  bedrooms?: number;
  bathrooms?: number;
  // Yacht specific
  length_m?: number;
  cabins?: number;
  engine_type?: string;
  // Motorcycle specific
  engine_cc?: number;
};

const tableMap: Record<string, string> = {
  cars: "cars",
  "real-estate": "real_estate",
  yachts: "yachts",
  motorcycles: "motorcycles",
};

export default function ListingDetailPage() {
  const params = useParams();
  const type = params.type as string;
  const id = params.id as string;
  
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    mobile: "",
    customerType: "individual",
    address: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchListing = async () => {
      const tableName = tableMap[type];
      if (!tableName) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (data && !error) {
        setListing(data);
      }
      setLoading(false);
    };

    fetchListing();
  }, [type, id, supabase]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submitted!', formData);
    
    if (!listing) {
      alert('Listing data not available. Please try again.');
      return;
    }
    
    setSubmitting(true);
    
    try {
      console.log('📤 Calling /api/contact...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          listingTitle: listing.title,
          listingType: type,
          listingId: id,
        }),
      });

      console.log('📨 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API error:', errorData);
        throw new Error('Failed to send message');
      }

      const result = await response.json();
      console.log('✅ Success:', result);
      
      setSubmitted(true);
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      alert('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[120px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[120px]">
        <h1 className="text-2xl font-heading text-dark dark:text-white mb-4">Listing not found</h1>
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const getCategoryLabel = () => {
    switch (type) {
      case "cars": return "Premium Auto";
      case "real-estate": return "Immobilie";
      case "yachts": return "Yacht";
      case "motorcycles": return "Motorrad";
      default: return "Listing";
    }
  };

  return (
    <div className="pt-[120px] pb-20">
      <div className="px-4 xl:container">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Contact Form */}
          <div className="w-full lg:w-5/12">
            <div className="lg:sticky lg:top-[120px] rounded-2xl p-6 lg:p-8 border border-white/10">
              <h2 className="font-heading text-2xl font-semibold text-dark dark:text-white mb-2">
                Interesse an diesem {getCategoryLabel()}?
              </h2>
              <p className="text-dark-text mb-6">
                Füllen Sie das Formular aus und wir werden uns in Kürze bei Ihnen melden.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl text-dark dark:text-white mb-2">Vielen Dank!</h3>
                  <p className="text-dark-text">Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns bald bei Ihnen melden.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-dark dark:text-white placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="Max"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-dark dark:text-white placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Mobilnummer *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-dark dark:text-white placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      placeholder="+49 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Kundentyp *
                    </label>
                    <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full px-4 py-3 bg-dark-2 border border-white/20 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition flex items-center justify-between"
                      >
                        <span>{formData.customerType === "individual" ? "Privatperson" : "Geschäftskunde"}</span>
                        <svg 
                          className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {dropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-dark rounded-lg border border-white/20 shadow-2xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, customerType: "individual" }));
                              setDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white bg-dark hover:bg-primary/20 transition block"
                          >
                            Privatperson
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, customerType: "business" }));
                              setDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white bg-dark hover:bg-primary/20 transition block"
                          >
                            Geschäftskunde
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-dark dark:text-white placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      placeholder="Straße, PLZ Stadt"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-dark dark:text-white placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                      placeholder="Ihre Nachricht an uns..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-heading font-medium rounded-lg transition duration-300 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        Anfrage senden
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="w-full lg:w-7/12">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-3 mb-4">
                {listing.images && listing.images.length > 0 ? (
                  <Image
                    src={listing.images[currentImageIndex]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dark-text">
                    <svg className="w-24 h-24 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {listing.images && listing.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-24 h-24 flex-shrink-0 rounded-xl transition-all duration-300 ${
                        currentImageIndex === idx 
                          ? "shadow-2xl scale-110 brightness-100 opacity-100" 
                          : "opacity-50 hover:opacity-80 hover:scale-105 shadow-md"
                      }`}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <Image src={img} alt={`${listing.title} ${idx + 1}`} fill className="object-cover" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Price */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                {getCategoryLabel()}
              </span>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-3">
                {listing.title}
              </h1>
              {listing.brand && listing.model && (
                <p className="text-xl text-dark-text">
                  {listing.brand} {listing.model} {listing.year && `• ${listing.year}`}
                </p>
              )}
            </div>

            {/* Specifications */}
            <div className="rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="font-heading text-lg font-semibold text-dark dark:text-white mb-4">
                Spezifikationen
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {listing.year && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Baujahr</p>
                      <p className="font-medium text-dark dark:text-white">{listing.year}</p>
                    </div>
                  </div>
                )}
                {listing.mileage && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Kilometerstand</p>
                      <p className="font-medium text-dark dark:text-white">{listing.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                )}
                {listing.fuel_type && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Kraftstoff</p>
                      <p className="font-medium text-dark dark:text-white">{listing.fuel_type}</p>
                    </div>
                  </div>
                )}
                {listing.transmission && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Getriebe</p>
                      <p className="font-medium text-dark dark:text-white">{listing.transmission}</p>
                    </div>
                  </div>
                )}
                {listing.color && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Farbe</p>
                      <p className="font-medium text-dark dark:text-white">{listing.color}</p>
                    </div>
                  </div>
                )}
                {/* Real Estate specific */}
                {listing.area_sqm && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Fläche</p>
                      <p className="font-medium text-dark dark:text-white">{listing.area_sqm} m²</p>
                    </div>
                  </div>
                )}
                {listing.bedrooms && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Schlafzimmer</p>
                      <p className="font-medium text-dark dark:text-white">{listing.bedrooms}</p>
                    </div>
                  </div>
                )}
                {listing.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Standort</p>
                      <p className="font-medium text-dark dark:text-white">{listing.location}</p>
                    </div>
                  </div>
                )}
                {/* Yacht specific */}
                {listing.length_m && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Länge</p>
                      <p className="font-medium text-dark dark:text-white">{listing.length_m} m</p>
                    </div>
                  </div>
                )}
                {listing.cabins && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Kabinen</p>
                      <p className="font-medium text-dark dark:text-white">{listing.cabins}</p>
                    </div>
                  </div>
                )}
                {/* Motorcycle specific */}
                {listing.engine_cc && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text">Hubraum</p>
                      <p className="font-medium text-dark dark:text-white">{listing.engine_cc} cc</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="rounded-2xl p-6 border border-white/10">
                <h3 className="font-heading text-lg font-semibold text-dark dark:text-white mb-4">
                  Beschreibung
                </h3>
                <p className="text-dark-text leading-relaxed">
                  {listing.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

