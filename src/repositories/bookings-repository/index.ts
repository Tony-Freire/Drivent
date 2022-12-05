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
const bookingsRepository={ findBookingByUserId };

export default bookingsRepository;
