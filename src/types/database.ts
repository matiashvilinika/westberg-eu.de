export type ListingStatus = 'draft' | 'published' | 'sold' | 'archived';

export interface Car {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  color: string;
  description: string;
  images: string[];
  status: ListingStatus;
  featured: boolean;
}

export interface RealEstate {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  property_type: string;
  location: string;
  address: string;
  price: number;
  area_sqm: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  images: string[];
  status: ListingStatus;
  featured: boolean;
}

export interface Yacht {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  length_m: number;
  cabins: number;
  engine_type: string;
  description: string;
  images: string[];
  status: ListingStatus;
  featured: boolean;
}

export interface Motorcycle {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine_cc: number;
  color: string;
  description: string;
  images: string[];
  status: ListingStatus;
  featured: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  created_at: string;
}

