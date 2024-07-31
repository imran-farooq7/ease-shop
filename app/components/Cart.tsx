"use client";

import { useCartStore } from "@/store/CartProvider";

const Cart = () => {
	const { isOpen } = useCartStore();
	return <div>Cart</div>;
};
export default Cart;
