import hotelsRepository from "@/repositories/hotels-repository";
import { notFoundError, paymentRequired, unauthorizedError, forbiddenError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function verifyTicketAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if (!ticket) throw notFoundError();
  if(ticket.status==="RESERVED")
  {
    throw paymentRequired();
  }
  if(ticket.TicketType.isRemote && !ticket.TicketType.includesHotel)
  {
    throw forbiddenError();
  }
  
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}
  
async function getHotels(userId: number) {
  await verifyTicketAndEnrollment(userId);
  const hotels = await hotelsRepository.findHotels();
  
  return hotels;
}

const hotelsService ={ getHotels };
export default hotelsService;
  
