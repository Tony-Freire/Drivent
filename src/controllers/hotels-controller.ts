import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) 
{
  try {
    const { userId } = req;
  
    const result = await hotelsService.getHotels(userId);
   
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
    if (error.name === "PaymentRequiredError") {
      return res.send(httpStatus.PAYMENT_REQUIRED);
    }
          
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const { userId } = req;

  try {
    if(isNaN(Number(hotelId)))
    {
      return res.send(httpStatus.BAD_REQUEST);
    }
    const rooms = await hotelsService.getHotelRooms(Number(hotelId), Number(userId));

    return res.status(httpStatus.OK).send(rooms);
  } 
  catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
    if (error.name === "PaymentRequiredError") {
      return res.send(httpStatus.PAYMENT_REQUIRED);
    }  
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
