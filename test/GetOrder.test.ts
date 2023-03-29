import Checkout from "../src/Checkout";
import CouponDataDatabase from "../src/CouponDataDatabase";
import GetOrderByCPF from "../src/GetOrderByCpf";
import OrderDataDatabase from "../src/OrderDataDatabase";
import ProductDataDatabase from "../src/ProductDataDatabase"

test.skip("Deve consultar um pedido", async function () {
    const productData = new ProductDataDatabase();
    const couponData = new CouponDataDatabase();
    const orderData = new OrderDataDatabase();
    const checkout = new Checkout(productData, couponData, orderData);
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	}
    await checkout.execute(input);
    const getOrderByCpf = new GetOrderByCPF(orderData);
    const output = await getOrderByCpf.execute("987.654.321-00");
    expect(output.total).toBe(6350);
})