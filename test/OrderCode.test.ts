import OrderCode from "../src/OrderCode";

test("Deve criar um código para o pedido", function () {
    const orderCode = new OrderCode(new Date("2023-04-04T10:00:00"), 1);
    expect(orderCode.getValue()).toBe("202300000001");
});

test("Não Deve criar um código para o pedido se a sequence for negativa", function () {
    expect(() => new OrderCode(new Date("2023-04-04T10:00:00"), -1)).toThrow (new Error("Invalid sequence"));
    
}) ;

test("Deve criar um código com tamanho 12 (4 + 8)", function () {
    const orderCode = new OrderCode(new Date("2023-04-04T10:00:00"), 1);
    expect(orderCode.getValue()).toHaveLength(12);
});