import { getProducts } from "@/utils/helpers";
import Product from "./components/Product";

const Home = async () => {
	const products = await getProducts();
	return (
		<div>
			{products.map((product) => (
				<Product key={product.id} />
			))}
		</div>
	);
};
export default Home;
