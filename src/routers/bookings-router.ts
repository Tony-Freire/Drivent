import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getBooking, postBooking, putBooking } from "@/controllers/bookings-controller";

const bookingsRouter = Router();
bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", postBooking)
  .put("/:bookingId", putBooking);

export { bookingsRouter };
