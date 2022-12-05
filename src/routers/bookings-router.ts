import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getBooking, postBooking } from "@/controllers/bookings-controller";

const bookingsRouter = Router();
bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", postBooking);

export { bookingsRouter };
