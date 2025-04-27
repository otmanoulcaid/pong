class FrameMessage {
	message = 'frame';
	data: string;
	constructor(frame: string) {
		this.data = JSON.stringify(frame);
	}
}

export default FrameMessage;
