import { createStore } from "zustand";
import { persist } from "zustand/middleware";
export interface cartItem {
	name: string;
	id: string;
	image: string;
	description?: string;
	price: number;
	quantity?: number | 1;
}
interface cartStore {
	isOpen: boolean;
	cart: cartItem[];
	toggleCart: () => void;
	addCart: (cartItem: cartItem) => void;
	removeCart: (cartItem: cartItem) => void;
	paymentIntent: string;
	setPaymentIntent: (paymentIntent: string) => void;
	onCheckout: string;
	setCheckout: (checkout: string) => void;
	emptyCart: () => void;
}
export const createCartStore = () => {
	return createStore<cartStore>()(
		persist(
			(set) => ({
				cart: [],
				isOpen: true,
				onCheckout: "cart",
				toggleCart: () =>
					set((state) => ({
						...state,
						isOpen: !state.isOpen,
					})),
				addCart: (cartItem) =>
					set((state) => {
						const existingItem = state.cart.find(
							(item) => item.id === cartItem.id
						);
						if (existingItem) {
							const updateCart = state.cart.map((item) => {
								if (item.id === cartItem.id) {
									return {
										...item,
										quantity: item.quantity! + 1,
									};
								}
								return item;
							});
							return {
								cart: updateCart,
							};
						} else {
							return { cart: [...state.cart, { ...cartItem, quantity: 1 }] };
						}
					}),
				removeCart: (cartItem) => {
					set((state) => {
						const existingItem = state.cart.find(
							(item) => item.id === cartItem.id
						);
						if (existingItem && existingItem.quantity! > 1) {
							const updateCart = state.cart.map((item) => {
								if (item.id === cartItem.id) {
									return {
										...item,
										quantity: item.quantity! - 1,
									};
								}
								return item;
							});
							return { cart: updateCart };
						} else {
							const updateCart = state.cart.filter((item) => {
								return item.id !== cartItem.id;
							});
							return { cart: updateCart };
						}
					});
				},
				paymentIntent: "",
				setPaymentIntent: (val) =>
					set((state) => ({
						paymentIntent: val,
					})),
				setCheckout: (val) =>
					set((state) => ({
						onCheckout: val,
					})),
				emptyCart: () =>
					set((state) => {
						return {
							cart: [],
						};
					}),
			}),

			{ name: "cart" }
		)
	);
};
