import {UserRepository} from '../repositories/user.repository.js'

async function  generateUniqueUserName(given, family, fastify)
{
    const userRepo = new UserRepository (fastify.db);
    let user = userRepo.findUserByUsername (given);
    let index = 0;

    while (await userRepo.findUserByUsername (given))
    {
        if (index < family.length)
            given += family[index];
        else
        given += '_';
    }
    return given;
}

export default generateUniqueUserName;