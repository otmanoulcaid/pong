const specification = {type: 'string', minLength : 4, maxLength: 20};

export const friendSchema = {
    body : {
        type: 'object',
        required : ['from', 'to'],
        properties : {
            from: specification,
            to: specification
        },
        additionalProperties: false
    }
};
