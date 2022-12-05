import { notFoundError } from "@/errors";
import bookingsRepository from "@/repositories/bookings-repository";
import { constants } from "buffer";

async function findBooking(userId: number) {
  const booking = await bookingsRepository.findBookingByUserId(userId);

  if (!booking) {
    throw notFoundError();
  }
  
  return booking;
}
  
const bookingsService = { findBooking };
export default bookingsService;
