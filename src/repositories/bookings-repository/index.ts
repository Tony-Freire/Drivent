import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    select: 
      { id: true, Room: true 
      },
  });
}
async function findRoomWithBooking(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
    include: {
      Booking: true,
    },
  });
}
async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
    select: {
      id: true,
    },
  });
}

const bookingsRepository={ findBookingByUserId, findRoomWithBooking, createBooking };

export default bookingsRepository;
