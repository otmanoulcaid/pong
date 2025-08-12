const emailHandler = {type: 'string', format:'email', maxLength : 320};
const passwordHandler = {type: 'string', minLength : 8, maxLength: 20};
const verificationCodeHandler = {type: 'string', pattern : '^\\d{6}$' , minLength : 6, maxLength: 6};

export const signupSchema = {
    body : 
    {
        type: 'object',
        required : ['email', 'username' ,'password'],
        properties :
        {
            email : emailHandler,
            username: {type: 'string', pattern : '^[a-zA-Z0-9_]+$', minLength : 4, maxLength: 20},
            password: passwordHandler
        },
        additionalProperties: false,
        errorMessage : 
        {
            required : 
            {
                email: 'Email is required',
                username: 'username is required',
                password : 'password is required',
            },
            properties :
            {
                email : 'Email is invalid or too long',
                username : 'Username must be 4-20 characters and contain only letters, numbers, or underscores',
                password :  'Password must be 8-20 characters long',
            },
            additionalProperties: 'Unexpected field in request body',
        }
    },
};

export const loginSchema = {
    body :
    {
        type: 'object',
        required : ['username', 'password'],
        properties :
        {
            username: {type: 'string', pattern : '^[a-zA-Z0-9_]+$', minLength : 4, maxLength: 20},
            password: passwordHandler
        },
        additionalProperties: false,
        errorMessage : 
        {
            required : 
            {
                username : 'username is required',
                password : 'password is required',
            },
            properties : 
            {
                username : 'Username must be 4-20 characters and contain only letters, numbers, or underscores',
                password :  'Password must be 8-20 characters long',  
            },
            additionalProperties: 'Unexpected field in request body',
        }
    },
};

export const resetPasswordSchema = 
{
    body :
    {
        type: 'object',
        required : ['email', 'newpassword', 'verificationCode'],
        properties : 
        {
            email : emailHandler,
            newpassword: passwordHandler,
            verificationCode: verificationCodeHandler
        },
        additionalProperties: false,
        errorMessage : 
        {
            required : 
            {
                email : 'email is required',
                newpassword : 'newpassword is required',
                verificationCode : 'verificationCode is required',
            },
            properties : 
            {
                email : 'Email is invalid or too long',
                newpassword :  'Password must be 8-20 characters long',
                verificationCode : 'Verification code must be exactly 6 digits'
            },
            additionalProperties: 'Unexpected field in request body',
        }
    },
}

export const emailSchema = {
    body : 
    {
        type : 'object',
        required : ['email'],
        properties : 
        {
            email : emailHandler,
        },
        errorMessage : 
        {
            required : 
            {
                email : 'email is required',   
            },
            properties : 
            {
                email : 'Email is invalid or too long',
            }
        }
    },
}

export const codeSchema = {
    body : 
    {
        type : 'object',
        required : ['email', 'verificationCode'],
        properties : 
        {
            email : emailHandler,
            verificationCode : verificationCodeHandler
        },
        errorMessage : 
        {
            required : 
            {
                email : 'email is required',
                verificationCode : 'verificationCode is required',
            },
            properties : 
            {
                email : 'Email is invalid or too long',
                verificationCode : 'Verification code must be exactly 6 digits'
            }
        }
    },
}

export const complitProfileSchema = 
{
    body :
    {
        type : 'object',
        properties :
        {
                bio : 
                {
                    type : 'object',
                    required : ['value'],
                    properties :
                    {
                        value : 
                        {
                            type : 'string',
                            minLength : 1,
                            maxLength : 200,
                            pattern : '.*\\S.*$'
                        },
                    },
                    errorMessage: 'Invalid bio: must be non-empty and max 200 characters.',
                },
                
                avatar :
                {
                    type : 'object',
                    required : ['filename', 'mimetype'],
                    properties : 
                    {
                        filename : {type : 'string'},
                        mimetype : {type : 'string', pattern : '^image/'},
                    },
                    errorMessage: 'Avatar must be a valid image file.',
                }
        }
    }
}
