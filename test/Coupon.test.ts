import Coupon from "../src/Coupon";

test("Deve testar o cupom", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2023-04-04T10:00:00"));
    expect(coupon.isExpired()).toBeFalsy();
    expect(coupon.getDiscount(1000)).toBe(200);
})