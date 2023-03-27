import Order from "../src/Order";

test("Deve criar um pedido vazio com CPF válido", function () {
    const order = new Order("987.654.321-00");
    expect(order.getTotal()).toBe(0);
});

test("Não deve criar um pedido com CPF inválido", function () {
    expect(() => new Order("111.111.111-11")).toThrow("Invalid cpf");
});