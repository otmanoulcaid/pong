import UserRepository from '../repository/user.repository.js'

function generateUniqueUserName(given, family, fastify)
{
    const userRepo = new UserRepository (fastify.db);
    let user = userRepo.findUserByUsername (given);
    let index = 0;

    while (user && !user.from_google)
    {
        if (index < family.length)
            given += family[index];
        else
        given += '_';
        user = userRepo.findUserByUsername (given);
    }
    return given;
}

export default generateUniqueUserName;