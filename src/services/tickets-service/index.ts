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

const ticketService = { getTicketTypes, getTicketByUserId };
export default ticketService;
