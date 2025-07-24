export class ChatService
{
    constructor(chatRepository)
    {
        this.chatRepository = chatRepository
    }

    insertMessage(message)
    {
        this.chatRepository.insertMessage(message);
    }

    getMessage(from)
    {
        return this.getMessage(from);
    }

    getNoneReadMessages(from)
    {
        return this.chatRepository.findNoneReadMessages(from);
    }

    changeMessageStat(user)
    {
        this.chatRepository.update(user, {stat: 'd'})
    }
}
