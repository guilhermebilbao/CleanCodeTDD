import orderData from "./OrderData";

export default class GetOrderByCPF{

  constructor (readonly orderData: orderData){
  }

  async execute (cpf: string ): Promise<Output>{
    const order = await this.orderData.getByCpf(cpf);
    return{
        total: parseFloat(order.total)
    }
  }
}
type Output = {
    total : number
}