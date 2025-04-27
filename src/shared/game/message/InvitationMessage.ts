class InvitationMessage {
	message: string = 'invitation';
	data: string;
	constructor(invitations: string) {
		this.data = JSON.stringify(invitations);
	}
}

export default InvitationMessage;
