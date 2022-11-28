import { prisma } from "@/config";

async function findHotels() {
  return await prisma.hotel.findMany({});
}

const hotelsRepository = { findHotels };

export default hotelsRepository;
