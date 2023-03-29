import Currencies from "./Currencies";
import CuurrencyGateway from "./CurrencyGateway";

export default class CurrencyGatewayRandom implements CuurrencyGateway{
    async getCurrencies () {
        const currencies = new Currencies();
        currencies.addCurrency("USD", 3);
        currencies.addCurrency("BRL", 1);
        return currencies;
    }
}