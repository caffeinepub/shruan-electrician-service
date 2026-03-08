import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    service: string;
    customerName: string;
    status: string;
    createdAt: bigint;
    address: string;
    notes: string;
    phone: string;
    dateTime: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(customerName: string, phone: string, address: string, service: string, dateTime: string, notes: string): Promise<bigint>;
    deleteBooking(id: bigint): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getBookingCount(): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBookingStatus(id: bigint, status: string): Promise<void>;
}
