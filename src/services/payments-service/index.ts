import { notFoundError, unauthorizedError } from "@/errors";
import { Payment } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(ticketId: number, enrollmentId: number): Promise<Payment>
{
  const ticket = await ticketsRepository.findTicketById(ticketId);
    
  if (!ticket) {
    throw notFoundError();
  }
  if(ticket.enrollmentId!=enrollmentId)
  { 
    throw unauthorizedError();  
  }
  const payment = await paymentRepository.findPaymentByTicketId(ticketId);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

const paymentService = { getPaymentByTicketId };

export default paymentService;
