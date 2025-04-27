class PoolMessage {
	message: string = 'pool';
	data: string;
	constructor(poolers: string) {
		this.data = JSON.stringify(poolers);
	}
}

export default PoolMessage;
