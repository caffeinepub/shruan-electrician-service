import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type Booking = {
    id : Nat;
    customerName : Text;
    phone : Text;
    address : Text;
    service : Text;
    dateTime : Text;
    notes : Text;
    status : Text;
    createdAt : Int;
  };

  let bookings = Map.empty<Nat, Booking>();
  var nextId = 1;

  public shared ({ caller }) func createBooking(customerName : Text, phone : Text, address : Text, service : Text, dateTime : Text, notes : Text) : async Nat {
    let booking : Booking = {
      id = nextId;
      customerName;
      phone;
      address;
      service;
      dateTime;
      notes;
      status = "Pending";
      createdAt = Time.now();
    };
    bookings.add(nextId, booking);
    nextId += 1;
    booking.id;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray();
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };
    switch (bookings.get(id)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) {
        let updatedBooking = {
          id = booking.id;
          customerName = booking.customerName;
          phone = booking.phone;
          address = booking.address;
          service = booking.service;
          dateTime = booking.dateTime;
          notes = booking.notes;
          status;
          createdAt = booking.createdAt;
        };
        bookings.add(id, updatedBooking);
      };
    };
  };

  public shared ({ caller }) func deleteBooking(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete bookings");
    };
    if (not bookings.containsKey(id)) {
      Runtime.trap("Booking not found");
    };
    bookings.remove(id);
  };

  public query ({ caller }) func getBookingCount() : async Nat {
    bookings.size();
  };
};
