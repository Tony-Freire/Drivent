import { requestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) 
{
  const { ticketId } = req.query; 
  const { userId } = req;
  try {
    if(!ticketId)
    {
      throw requestError(400, "BadRequestError");
    }
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const payment = await paymentService.getPaymentByTicketId(Number(ticketId), enrollment.id);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
export async function postPayment(req: AuthenticatedRequest, res: Response) 
{
  const { userId } = req;
  const { ticketId, cardData } = req.body;
  try {
    if(!cardData||!ticketId)
    {
      throw requestError(400, "BadRequestError");  
    }
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const payment = await paymentService.postNewPayment(cardData, ticketId, enrollment.id);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) 
  {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
