import Stripe from "stripe";
import {stripe} from "@/utils/Constants"
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { totalPrice } from "@/utils/helpers";
export async function POST(req: NextRequest) {
	const session = await auth();
	const body = await req.json();
	const { cart, payment_intent_id } = body;

	if (!session?.user) {
		return NextResponse.json(
			{ message: "Not logged in" },
			{
				status: 403,
			}
		);
	}

	const orderData = {
		userId: session.user.id!,
		amount: totalPrice(cart),
		currency: "usd",
		status: "pending",
		paymentIntentId: payment_intent_id,
		products: {
			create: cart?.map((item: any) => ({
				name: item.name,
				description: item.description,
				price: parseFloat(item.price),
				quantity: item.quantity,
				image: item.image,
			})),
		},
	};
    return NextResponse.json(orderData,{
        status:200
    })

	// try {
	// 	if (payment_intent_id) {
	// 		console.log("Existing payment intent:", payment_intent_id);
	// 		const currentIntent = await stripe.paymentIntents.retrieve(
	// 			payment_intent_id
	// 		);
	// 		if (currentIntent) {
	// 			const updatePaymentIntent = await stripe.paymentIntents.update(
	// 				payment_intent_id,
	// 				{
	// 					amount: orderTotalAmount(cart) * 100,
	// 				}
	// 			);
	// 			const existingOrder = await prisma.order.findFirst({
	// 				where: { paymentIntentId: updatePaymentIntent.id },
	// 				include: { products: true },
	// 			});
	// 			if (!existingOrder) {
	// 				console.log("Invalid payment intent");
	// 				return NextResponse.json(
	// 					{ message: "Invalid payment intent" },
	// 					{ status: 400 }
	// 				);
	// 			}
	// 			const updatedOrder = await prisma.order.update({
	// 				where: { id: existingOrder.id },
	// 				data: {
	// 					amount: orderTotalAmount(cart),
	// 					products: {
	// 						deleteMany: {},
	// 						create: cart.map((item: any) => ({
	// 							name: item.name,
	// 							description: item.description,
	// 							price: parseFloat(item.price),
	// 							quantity: item.quantity,
	// 							image: item.image,
	// 						})),
	// 					},
	// 				},
	// 			});
	// 			return NextResponse.json(
	// 				{ paymentIntent: updatePaymentIntent },
	// 				{ status: 200 }
	// 			);
	// 		}
	// 	} else {
	// 		console.log("Creating new payment intent");
	// 		const paymentIntent = await stripe.paymentIntents.create({
	// 			amount: orderTotalAmount(cart) * 100,
	// 			currency: "usd",
	// 			automatic_payment_methods: { enabled: true },
	// 		});
	// 		const newOrder = await prisma.order.create({
	// 			data: {
	// 				amount: orderData.amount,
	// 				paymentIntentId: paymentIntent.id,
	// 				status: orderData.status,
	// 				userId: orderData.userId,
	// 				products: orderData.products,
	// 			},
	// 		});
	// 		return NextResponse.json({ paymentIntent }, { status: 200 });
	// 	}
	// } catch (error) {
	// 	console.error("Error processing request:", error);
	// 	return NextResponse.json(
	// 		{ message: "Internal server error" },
	// 		{ status: 500 }
	// 	);
	// }
}