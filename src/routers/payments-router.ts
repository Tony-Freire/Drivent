import { getPayment } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRoutes = Router();

paymentsRoutes.all("/*", authenticateToken).get("/", getPayment);

export { paymentsRoutes };
