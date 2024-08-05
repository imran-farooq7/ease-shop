"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
export const getOrders = async () => {
	const session = await auth();
	if (!session?.user) {
		return {
			error: "User not logged in",
		};
	} else {
		const orders = await prisma.order.findMany({
			where: {
				userId: session.user.id,
			},
			include: {
				products: true,
			},
		});
		if (orders) {
			revalidatePath("/dashboard");
			return {
				orders,
			};
		}
	}
};
