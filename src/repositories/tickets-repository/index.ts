import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findTypes() {
  return await prisma.ticketType.findMany();
}

async function findTicketsByUserId(userId: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId
      },
    },
    include: {
      TicketType: true,
    },
  });
}
async function createNewTicket(enrollmentId: number, ticketTypeId: number) 
{
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
    include: { TicketType: true }
  });
}
async function findTicketById(id: number) 
{
  return await prisma.ticket.findFirst(
    {
      where:
      {
        id,
      },
      include: {
        TicketType: true,
      },
    });
}
async function updateStatus(id: number) 
{
  return prisma.ticket.update({
    where:
    {
      id
    },
    data: {
      status: TicketStatus.PAID
    }
  });
}
const ticketsRepository ={ findTypes, findTicketsByUserId, createNewTicket, findTicketById, updateStatus };

export default ticketsRepository;   
