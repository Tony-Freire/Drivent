import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getBooking } from "@/controllers/bookings-controller";

const bookingsRouter = Router();
bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking);

export { bookingsRouter };
