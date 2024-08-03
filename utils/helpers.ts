import { cartItem } from "@/store/store";
import { stripe } from "./Constants";
import { loadStripe } from "@stripe/stripe-js";

export const getProducts = async () => {
	const products = await stripe.products.list();
	const productsWithPrice = await Promise.all(
		products.data.map(async (product) => {
			const prices = await stripe.prices.list({ product: product.id });
			return {
				id: product.id,
				name: product.name,
				price: prices.data[0].unit_amount! / 100,
				image: product.images[0],
				currency: prices.data[0].currency,
				description: product.description,
			};
		})
	);
	return productsWithPrice;
};

export const priceFormatter = (price: number) => {
	const formatter = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	});
	return formatter.format(Number(price));
};
export const totalPrice = (cart:cartItem[]) => {
	return cart.reduce((acc, item) => {
		return acc + item.price * item.quantity!;
	}, 0);
}
export const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
