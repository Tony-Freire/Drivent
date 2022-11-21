import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTypes(req: AuthenticatedRequest, res: Response) 
{
  try {
    const ticketType = await ticketService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketType);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
