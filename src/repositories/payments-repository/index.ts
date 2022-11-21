import { prisma } from "@/config";

async function findPaymentByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      Ticket: {
        id: ticketId,
      },
    },
  });
}

const paymentRepository = { findPaymentByTicketId };

export default paymentRepository;
