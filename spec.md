# Shruan Electrician Service

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- **Customer Landing Page**: Hero section with company name "Shruan Electrician Service", Mumbai location, WhatsApp button (9628469060)
- **Services Section**: List of electrician services - Wiring, Fan/AC Installation, MCB Repair, Switchboard Repair, Generator Setup, Light Fitting, etc.
- **Online Booking Form**: Fields - customer name, phone number, address, service type (dropdown), preferred date & time, additional notes. Submits booking to backend.
- **Admin Panel**: Secure login for admin. View all bookings in a table (name, phone, address, service, date/time, status). Update booking status (Pending / Confirmed / Completed / Cancelled). Delete bookings.
- **WhatsApp Integration**: Floating WhatsApp button linking to wa.me/919628469060

### Modify
- None

### Remove
- None

## Implementation Plan
1. Backend: Booking data model (id, customerName, phone, address, service, dateTime, notes, status, createdAt). CRUD operations for bookings. Admin authentication using authorization component.
2. Frontend: 
   - Public pages: Landing page with hero, services section, booking form
   - Admin pages: Login page, bookings dashboard with status management
   - Blue color theme throughout
   - Mobile-responsive design
   - Floating WhatsApp button on all public pages
