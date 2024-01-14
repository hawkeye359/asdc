import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function generateUniqueId() {
  const lastOrder = await prisma.order.findFirst({
    orderBy: { id: "desc" },
  });
  console.log("lastOrder", lastOrder);
  let lastIdNumber = 0;
  if (lastOrder) {
    const lastId = lastOrder.id; // Assuming the id is a string like "ZHA240100001"
    lastIdNumber = parseInt(lastId.slice(6), 10);
    console.log(lastId);
  }

  const newIdNumber = lastIdNumber + 1;
  const paddedNumber = String(newIdNumber).padStart(6, "0");
  const newId = `ZHA2401${paddedNumber}`;

  return newId;
}

type Order = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  fatherName: string;
  motherName: string;
  course: number;
  email: string;
  orderId: string;
};

export async function createOrderInDatabase(data: Order, orderId: string) {
  const order = await prisma.order.create({
    data: {
      id: orderId,
      ...data,
    },
  });
  return order;
}
