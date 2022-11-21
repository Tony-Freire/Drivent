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
async function createPayment(ticketId: number, cardIssuer: string, cardLastDigits: string, value: number) 
{
  return await prisma.payment.create({
    data:
    {
      ticketId,
      cardIssuer,
      cardLastDigits,
      value
    },
  });
}

const paymentRepository = { findPaymentByTicketId, createPayment };

export default paymentRepository; 
