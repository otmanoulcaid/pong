import getDefaultAvatar from '../utils/getDefaultAvatar.js';
import uploadFile from '../utils/uploadFile.js';
import AppError  from '../utils/AppError.js';
import bcrypt from 'bcrypt';
import sendMessage from '../mq/user.producer.js';
class UserService 
{
    constructor (userRepo, fastify)
    {
        this.fastify = fastify;
        this.userRepo = userRepo;
    }

    async getUserProfile ({username})
    {
        const user =  this.userRepo.findUserByUsername (username);
        const userProfile = 
        {
            username : user.username,
            email: user.email,
            bio : user.bio,
            created_at : user.created_at,
            avatar : user.avatar_url
        };
        return userProfile;
    }

    async updateUsernameBio ({username} , newusername , bio)
    {
        let user = this.userRepo.findUserByUsername (username); // tmp
        if (!user)
            throw new AppError ('this username not found', 404);
        if (!newusername && !bio)
            return {success : true, message : 'No changes were made to your profile.'};
        if (newusername)
        {
            let user = this.userRepo.findUserByUsername (newusername);
            if (user)
                throw new AppError ('this username already exists', 409);
            this.userRepo.setUsername (username, newusername);
            await sendMessage (this.fastify.mq.channel, 
            {
                type : 'UPDATE_USERNAME',
                username,
                newusername,
            })
            username = newusername;
        }
        if (bio)
        {
                const toAdd = bio.trim(); 
                if (toAdd.length > 200)
                    throw new AppError ('this bio is too long', 400);
                this.userRepo.setBio (username,toAdd);
        }
        return {success : true, message : 'User profile updated successfully.'};
    }
    
    async updataPassword ({username}, {newpassword})
    {
        const hashedPassword =  await bcrypt.hash(newpassword, 10);
        this.userRepo.setPasswordByUsername (username, hashedPassword);
        return {success : true, message : 'user profile updated'};
    }
    
    async updateAvatar ({username}, {avatar})
    {
        const avatar_url = await uploadFile (username, avatar);
        this.userRepo.setAvatarurl (username, avatar_url);
        await sendMessage (this.fastify.mq.channel, 
        {
            type : 'UPDATE_AVATAR' ,
            username,
            avatar_url
        })
        return {success : true, message : 'your avatar updated'};
    }
    
    // ------------------------------ this internal endpoint ----------------------------
    async createUser ({email, username, hashedPassword})
    {
        try 
        {
            this.userRepo.createUser (email, username, hashedPassword);
            return {success : true, message : 'this user has been created'};
        }
        catch (err)
        {
            throw new AppError ('this user already Exist', 409);
        }
    }

    async  verifyUser ({username})
    {
        this.userRepo.verifyUser (username);
        const user = this.userRepo.findUserByUsername(username);
        await sendMessage (this.fastify.mq.channel, 
            {type : 'CREATE_USER' , username : user.username, avatar_url : user.avatar_url}
        )
        return {success : true, message : 'this user is verified successfully'};
    }

    async   setAvatarurl ({username, avatar_url})
    {
        this.userRepo. setAvatarurl (username, avatar_url);
        
        return {success : true, message : 'this user set avatar_url'};
    }
    
    async findUserByUsername ({username})
    {
        const user =  this.userRepo.findUserByUsername (username);
        return user;
    }
    async findUserByEmail ({email})
    {
        const user =  this.userRepo.findUserByEmail (email);
        return user;
    }

    // ----------------------------- added ------------

    async resetPassword ({email, verificationCode, newpassword})
    {
        const record = await this.cache.get (`reset-code:${email}`);
        if (record !== verificationCode.toString())
            throw new AppError ("Verification code is incorrect", 400);
        const hashedPassword = await bcrypt.hash (newpassword, 10);
        this.userRepo.setPasswordByEmail (email, hashedPassword);
        await this.cache.del (`reset-code:${email}`);
        return ({success : true, massage : "the user is update password successfully"});
    }

    async completeProfile (bio, avatar, username)
    {
        const user = this.userRepo.findUserByUsername(username);
        if (!user)
            throw new  AppError ("user doesnt exists", 404);
        if (!user.is_verified)
            throw new  AppError('Please verify your email before complite profile', 401);
        const updatedFields = [];
        if (avatar)
        {
            const avatar_url = await  uploadFile (username, avatar);
            updatedFields.push('avatar');
            await this.userRepo.setAvatarurl (username, avatar_url);
            await sendMessage (this.fastify.mq.channel, 
            {   
                type : 'UPDATE_AVATAR',
                username,
                avatar_url,
            })
        }
        else
        {
            const avatar_url = getDefaultAvatar ();
            await this.userRepo.setAvatarurl (username, avatar_url);
            await sendMessage (this.fastify.mq.channel, 
            {   
                type : 'UPDATE_AVATAR' ,
                username,
                avatar_url,
            })
        }
        if (bio)
        {
            if (bio.trim().length > 200)
                throw new AppError ('Bio is too long (max 200 characters)', 400);
            this.userRepo.setBio (username, bio.trim());
            updatedFields.push('bio');
        }
        const message = `User updated ${updatedFields.join(' and ')} successfully`;
        return {success : true , message : message};
    }

};

export default UserService;