import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketTypes() {
  return await ticketsRepository.findTypes();
}
const ticketService = { getTicketTypes };

export default ticketService;
