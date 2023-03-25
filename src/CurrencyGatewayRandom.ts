import CuurrencyGateway from "./CurrencyGateway";

export default class CurrencyGatewayRandom implements CuurrencyGateway{
    async getCurrencies () {
        return {
            "USD" : 3 + Math.random(),
            "BRL" : 1
        };
    }
}