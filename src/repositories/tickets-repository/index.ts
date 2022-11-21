import { prisma } from "@/config";

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

const ticketsRepository ={ findTypes, findTicketsByUserId };

export default ticketsRepository;
