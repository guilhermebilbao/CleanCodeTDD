import Product from "../../domain/Product";
import CheckoutGateway from "./CheckoutGateway";
import axios from "axios";

export default class CheckoutGatewayHttp implements CheckoutGateway {

	// constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	// }

	async getProducts(): Promise<Product[]> {
        const response = await axios.get("http://localhost:3000/products");
		const productsData = response.data;
		const products: Product[] = [];
		for (const productData of productsData) {
			products.push(new Product(productData.idProduct, productData.description, productData.price));
		}
		return products;
	}

	async checkout(input: any): Promise<any> {
		const response = await axios.post("http://localhost:3000/checkout", input);
        const output = response.data;
		return output;
	}

}