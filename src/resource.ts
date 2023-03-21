import pgp from "pg-promise";

export async function getProduct (idProduct: number) {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [product] = await connection.query("select * from cccat9.product where id_product = $1", [idProduct]);
    await connection.$pool.end();
    return product;
}

export async function getCoupon (code: string) {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [coupon] = await connection.query("select * from cccat9.coupon where code = $1", [code]);
    await connection.$pool.end();
    return coupon;
}