import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType, Ticket } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]>
{
  return await ticketsRepository.findTypes();
}

async function getTicketByUserId(userId: number): Promise<
Ticket & 
{TicketType: TicketType;}>
{
  const ticket = await ticketsRepository.findTicketsByUserId(userId);
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}
async function postNewTicket(enrollmentId: number, ticketTypeId: number): Promise<Ticket & 
{TicketType: TicketType;}> {
  const ticket = await ticketsRepository.createNewTicket(enrollmentId, ticketTypeId);
  return ticket;
}

const ticketService = { getTicketTypes, getTicketByUserId, postNewTicket };
export default ticketService;
