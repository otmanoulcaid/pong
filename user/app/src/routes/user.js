// import schema from '../schemas/response.js'

import * as userController from '../controllers/user-controller.js'

export default (fastify) => {

    /**
     * middelwares will be implemented later
     */
    
    fastify.post('/update', userController.updateUser);

    fastify.get('/', userController.getUsers);

    fastify.get('/:username', userController.userExist);
    
    fastify.post('/filter',userController.filterUser);
    
    fastify.post('/delete', userController.deleteUser);

    fastify.post('/graphql', userController.graphqlUser);
}
