import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTypes(req: AuthenticatedRequest, res: Response) 
{
  try {
    const ticketType = await ticketService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketType);
  } catch  {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
export async function getTickets(req: AuthenticatedRequest, res: Response)
{
  const { userId }=req;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error)
  {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId }=req; 
  const { ticketTypeId } = req.body;
  try {
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const newticket = await ticketService.postNewTicket(enrollment.id, ticketTypeId);
    return res.status(httpStatus.CREATED).send(newticket);
  } catch (error)
  {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
