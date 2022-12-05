import { notFoundError, paymentRequired } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import bookingsRepository from "@/repositories/bookings-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function findBooking(userId: number) {
  const booking = await bookingsRepository.findBookingByUserId(userId);

  if (!booking) {
    throw notFoundError();
  }
  
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  const userHaveBooking = await bookingsRepository.findBookingByUserId(userId);
  const room = await bookingsRepository.findRoomWithBooking(roomId);
    
  if (!enrollment) {
    throw notFoundError();
  }
  if (!ticket) {
    throw notFoundError();
  }
  if(ticket.status!=="PAID")
  {
    throw forbiddenError();
  }
  if(ticket.TicketType.isRemote ||!ticket.TicketType.includesHotel)
  {
    throw forbiddenError();
  }
  if(userHaveBooking)
  {
    throw forbiddenError();   
  }
  if(!room)
  {
    throw notFoundError();
  }
  if(room.capacity<=room.Booking.length)
  {
    throw forbiddenError();
  }
  const booking = await bookingsRepository.createBooking(userId, roomId);

  return booking;
}
  
const bookingsService = { findBooking, createBooking };
export default bookingsService;
