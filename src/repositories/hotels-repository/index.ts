import { prisma } from "@/config";

async function findHotels() {
  return await prisma.hotel.findMany({});
}async function findHotelRooms(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}
const hotelsRepository = { findHotels, findHotelRooms };

export default hotelsRepository;
