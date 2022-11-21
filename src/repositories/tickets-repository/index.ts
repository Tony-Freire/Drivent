import { prisma } from "@/config";
import { TicketType } from "@prisma/client";

async function findTypes(): Promise<TicketType[]>
{
  return await prisma.ticketType.findMany();
}

const ticketsRepository ={ findTypes };

export default ticketsRepository;
