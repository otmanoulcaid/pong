export class UserService
{
    constructor(userRepository)
    {
        this.userRepository = userRepository;
    }

    getAll()
    {
        return this.userRepository.findAll();
    }

    getUserById(id)
    {
        return this.userRepository.findOne({ id });
    }

    getUserByUsername(username)
    {
        return this.userRepository.findOne({ username });
    }

    addUser(data)
    {
        const user = {
            username: data.username,
            avatar: data.avatar
        };
        this.userRepository.insert(user);
    }

    async updateUser(username, data)
    {
        await this.userRepository.update({ username }, newUser);
    }
}
