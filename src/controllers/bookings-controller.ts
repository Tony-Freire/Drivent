import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookingsService from "@/services/bookings-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = await bookingsService.findBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) 
{
  const { userId } = req;
  const { roomId } = req.body;
  try {
    if(isNaN(Number(roomId))||!roomId)
    {
      return res.send(httpStatus.BAD_REQUEST);
    }
    const booking = await bookingsService.createBooking(userId, roomId);

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "ForbiddenError") return res.sendStatus(httpStatus.FORBIDDEN);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
