// import AddCart from "@/app/components/AddCart";
import { priceFormatter } from "@/utils/helpers";
import Image from "next/image";

interface Props {
	searchParams: {
		name: string;
		price: number;
		image: string;
		description: string;
		id: string;
		quantity?: number | 1;
	};
	params: {
		id: string;
	};
}
const ProductDetails = ({ searchParams, params }: Props) => {
	const { image, name, price, description } = searchParams;
	return (
		<div className="flex flex-col md:flex-row justify-between gap-12 p-12 text-gray-700">
			<Image src={image} alt={name} width={400} height={400} />
			<div>
				<h1 className="font-bold text-3xl text-emerald-400">{name}</h1>
				<p className="my-4">{description}</p>

				<div className="flex gap-4">
					<p className="font-bold text-teal-700 text-2xl">
						{priceFormatter(price)}
					</p>
				</div>
				<button className="w-full text-white my-12 font-medium px-7 py-3 rounded-xl bg-sky-500 self-start hover:opacity-70">
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductDetails;
