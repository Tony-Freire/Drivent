import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { Payment } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentRepository from "@/repositories/payments-repository";
import { CardData } from "@/protocols";

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

async function postNewPayment(cardData: CardData, ticketId: number, enrollmentId: number)
{
  const  checkTicket = await ticketsRepository.findTicketById(ticketId); 
  if (!checkTicket) throw notFoundError();
  if(checkTicket.enrollmentId!=enrollmentId)
  {
    throw unauthorizedError();
  }
  const payment = paymentRepository.createPayment(ticketId, cardData.issuer, String(cardData.number).slice(-4), checkTicket.TicketType.price);
  await ticketsRepository.updateStatus(ticketId);
  return payment;
}

const paymentService = { getPaymentByTicketId, postNewPayment };

export default paymentService;
