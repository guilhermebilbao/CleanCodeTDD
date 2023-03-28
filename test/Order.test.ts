import Coupon from "../src/Coupon";
import Order from "../src/Order";
import Product from "../src/Product";
 
test("Deve criar um pedido vazio com CPF válido", function () {
    const order = new Order("987.654.321-00");
    expect(order.getTotal()).toBe(0);
});

test("Não deve criar um pedido com CPF inválido", function () {
    expect(() => new Order("111.111.111-11")).toThrow("Invalid cpf");
});

test("Deve criar um pedido com 3 items", function () {
    const order = new Order("987.654.321-00");
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
    order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
    expect(order.getTotal()).toBe(6090);
});

test("Deve criar um pedido com 3 items com cupom", function () {
    const order = new Order("987.654.321-00");
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
    order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2023-04-04T10:00:00")));
    expect(order.getTotal()).toBe(4872);
});