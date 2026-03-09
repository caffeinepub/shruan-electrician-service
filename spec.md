# Shruan Electrician Service

## Current State
The app has a landing page with booking form, and an admin panel protected by Internet Identity (ICP's decentralized login). The admin login requires Internet Identity which is complex for the owner to use.

## Requested Changes (Diff)

### Add
- Simple hardcoded PIN/password login for admin (e.g., PIN: 1234 or a simple password stored in frontend)
- Admin login page with a simple password input field

### Modify
- AdminLoginPage.tsx: Replace Internet Identity login with a simple password/PIN input form
- AdminDashboardPage.tsx: Replace Internet Identity auth guard with simple session-based check (localStorage flag)
- Remove dependency on useInternetIdentity, useIsCallerAdmin hooks from admin pages
- Admin dashboard should load bookings using anonymous backend calls (no identity needed for reading as admin)

### Remove
- Internet Identity login flow from admin pages
- Token-based admin access complexity

## Implementation Plan
1. Update AdminLoginPage.tsx to show a simple PIN/password input. On correct PIN (e.g. "shruan123"), store a flag in localStorage and redirect to dashboard.
2. Update AdminDashboardPage.tsx to check localStorage for admin flag instead of Internet Identity. If not set, redirect to /admin login.
3. Keep booking read/write functionality working -- use backend calls without identity requirement (or keep existing backend hooks but remove the identity guard).
4. Make the admin logout clear the localStorage flag.
