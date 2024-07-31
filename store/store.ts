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
}
export const createCartStore = () => {
	return createStore<cartStore>()(
		persist(
			(set) => ({
				cart: [],
				isOpen: true,
			}),

			{ name: "cart" }
		)
	);
};
