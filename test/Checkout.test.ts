import Checkout from "../src/Checkout";
import CouponData from "../src/CouponData";
import CouponDataDatabase from "../src/CouponDataDatabase";
import ProductData from "../src/ProductData";
import ProductDataDatabase from "../src/ProductDataDatabase";
import sinon from "sinon";
import CurrencyGateway from "../src/CurrencyGatewayRandom";
import MailerConsole from "../src/MailerConsole";
import Mailer from "../src/Mailer";
import OrderDataDatabase from "../src/OrderDataDatabase";
import OrderData from "../src/OrderData";

test("Deve fazer um pedido com 3 produtos", async function () {
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
    // const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
// 	const productData: ProductData = {
// 		async getProduct (idProduct: number): Promise<any>{
// 			const products: { [idProducs : number] : any }= {
// 				1: {idProduct: 1, description: "A", price: 1000, width: 100, heigth: 30, length: 10, weigth: 3},
// 				2: {idProduct: 2, description: "B", price: 5000, width: 50, heigth: 50, length: 50, weigth: 22},
// 				3: {idProduct: 3, description: "C", price: 30, width: 10, heigth:10, length: 10, weigth: 0.9}
// 			}
// 			return products[idProduct];
// 	}
// }
// 	const couponData: CouponData = {
// 		async getCoupon (code: string): Promise<any> {
// 			const coupons: any = {
// 				VALE20: { code: 'VALE20', percentage: 20, expire_date: new Date("2023-04-04T12:00:00") },
// 				VALE20_EXPIRED: { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date("2022-04-04T12:00:00") }
// 			}
// 			return coupons[code];
// 		}
// 	}
	const productData = new ProductDataDatabase();
    const couponData = new CouponDataDatabase();
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
    const checkout = new Checkout(productData, couponData, orderData);
    const output = await checkout.execute(input); 
	expect(output.total).toBe(6350);
});          
test("Deve fazer um pedido com 4 produtos com moedas diferentes", async function () {
	const currencyGatewayStub = sinon.stub(CurrencyGateway.prototype, "getCurrencies").resolves({
			"USD" : 2 ,
			"BRL" : 1

		});
	//const mailerStub = sinon.stub(Mailer.prototype, "send").resolves();
	const mailerSpy = sinon.spy(MailerConsole.prototype, "send");
	const input = {
		cpf: "987.654.321-00",
		email: "guilhermebilbao@gmail.com",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 },
			{ idProduct: 4, quantity: 1 }
		]
	};
    const productData = new ProductDataDatabase();
    const couponData = new CouponDataDatabase();
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
    const checkout = new Checkout(productData, couponData, orderData);
    const output = await checkout.execute(input); 
	expect(output.total).toBe(6580);
	expect(mailerSpy.calledOnce).toBeTruthy();
	expect(mailerSpy.calledWith("guilhermebilbao@gmail.com", "Checkout Success", "ABCDEF")).toBeTruthy();
	currencyGatewayStub.restore();
	//mailerStub.restore();
	mailerSpy.restore();
});   

test("Deve fazer um pedido com 4 produtos com moedas diferentes com mock", async function () {
	const currencyGatewayMock = sinon.mock(CurrencyGateway.prototype)
	currencyGatewayMock.expects("getCurrencies")
		.once()
		.resolves({
			"USD" : 2 ,
			"BRL" : 1

		});
	const mailerMock = sinon.mock(MailerConsole.prototype);
	mailerMock.expects("send")
		.once()
		.withArgs("guilhermebilbao@gmail.com", "Checkout Success")
	const input = {
		cpf: "987.654.321-00",
		email: "guilhermebilbao@gmail.com",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 },
			{ idProduct: 4, quantity: 1 }
		]
	};
    const productData = new ProductDataDatabase();
    const couponData = new CouponDataDatabase();
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
    const checkout = new Checkout(productData, couponData, orderData);
    const output = await checkout.execute(input); 
	expect(output.total).toBe(6580);
	mailerMock.verify();
	mailerMock.restore();
	currencyGatewayMock.verify();
	currencyGatewayMock.restore();

});   

test("Deve fazer um pedido com 4 produtos com moedas diferentes com fake", async function () {;
	//const mailerStub = sinon.stub(Mailer.prototype, "send").resolves();
	const input = {
		cpf: "987.654.321-00",
		email: "guilhermebilbao@gmail.com",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 },
			{ idProduct: 4, quantity: 1 }
		]
	};
    const productData = new ProductDataDatabase();
    const couponData = new CouponDataDatabase();
	const currencyGateway : CurrencyGateway = {
		async getCurrencies(): Promise<any> {
			return {
				'USD' :2,
				'BRL' :1
			}
		}
	}
	const log: {to: string, subject: string, message: string} [] = [];
	const mailer: Mailer ={
		async send  (to: string, subject: string, message: string): Promise<any> {
			log.push({to, subject, message});
		}
	}
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 1;
		}
	}
    const checkout = new Checkout(productData, couponData, orderData, currencyGateway, mailer);
    const output = await checkout.execute(input); 
	expect(output.total).toBe(6580);
	expect(log).toHaveLength(1);
	expect(log[0].to).toBe("guilhermebilbao@gmail.com");
});   
test("Deve fazer um pedido com 3 produtos com o código do produto", async function () {
	const input = {
		cpf: "987.654.321-00",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const productData: ProductData = {
		async getProduct (idProduct: number): Promise<any>{
			const products: { [idProducs : number] : any }= {
				1: {idProduct: 1, description: "A", price: 1000, width: 100, heigth: 30, length: 10, weigth: 3},
				2: {idProduct: 2, description: "B", price: 5000, width: 50, heigth: 50, length: 50, weigth: 22},
				3: {idProduct: 3, description: "C", price: 30, width: 10, heigth:10, length: 10, weigth: 0.9}
			}
			return products[idProduct];
	}
}
	const couponData: CouponData = {
		async getCoupon (code: string): Promise<any> {
			const coupons: any = {
				VALE20: { code: 'VALE20', percentage: 20, expire_date: new Date("2023-04-04T12:00:00") },
				VALE20_EXPIRED: { code: 'VALE20_EXPIRED', percentage: 20, expire_date: new Date("2022-04-04T12:00:00") }
			}
			return coupons[code];
		}
	}
	// const productData = new ProductDataDatabase();
    // const couponData = new CouponDataDatabase();
	const orderData: OrderData = {
		async save(order: any): Promise<void> {
		},
		async getByCpf(cpf: string): Promise<any> {
		},
		async count (): Promise<number> {
			return 0;
		}
	}
    const checkout = new Checkout(productData, couponData, orderData);
    const output = await checkout.execute(input); 
	expect(output.code).toBe("202300000001");
});