export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expire_date: Date) {		
	}

	isExpired () {
		const today = new Date();
		return this.expire_date.getTime() < today.getTime();
	}

	getDiscount (total: number) {
		return (total * this.percentage)/100;
	}
}