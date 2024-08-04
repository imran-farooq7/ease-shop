"use client";
import { useCartStore } from "@/store/CartProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { BiSolidShoppingBag } from "react-icons/bi";

const OrderConfirmed = () => {
	const { setCheckout, toggleCart, setPaymentIntent, emptyCart } =
		useCartStore();
	useEffect(() => {
		setPaymentIntent("");
		emptyCart();
	}, []);
	return (
		<motion.div
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
		>
			<div className="flex text-center mb-4 gap-3 justify-center flex-col items-center">
				<h1 className="text-2xl font-medium">Your order has been placed</h1>
				<h2 className="text-sm">Check your email inbox for receipt</h2>
				<BiSolidShoppingBag size={100} />
			</div>
			<div>
				<Link href={"/dashboard"}>
					<button
						className="bg-sky-400 px-4 text-white rounded-lg py-2 w-full mx-auto hover:opacity-75"
						onClick={() => {
							setCheckout("cart");
							toggleCart();
						}}
					>
						Check your order
					</button>
				</Link>
			</div>
		</motion.div>
	);
};

export default OrderConfirmed;
