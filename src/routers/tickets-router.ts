import { getTickets, getTypes, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken)
  .get("/types", getTypes).get("/", getTickets).post("/", validateBody(createTicketSchema), postTicket);

export { ticketsRouter };
