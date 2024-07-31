import { stripe } from "./Constants";

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
