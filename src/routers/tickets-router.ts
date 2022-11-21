import { getTickets, getTypes } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken)
  .get("/types", getTypes).get("/", getTickets);

export { ticketsRouter };
