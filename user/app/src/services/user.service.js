import getDefaultAvatar from '../utils/getDefaultAvatar.js';
import uploadFile from '../utils/uploadFile.js';
import AppError  from '../utils/AppError.js';
import bcrypt from 'bcrypt';

class UserService 
{
    constructor (userRepo, fastify)
    {
        this.fastify = fastify;
        this.userRepo = userRepo;
    }

    async getUserProfile ({username})
    {
        // if (username !== loggerUsername)
        //     throw new AppError ('You are not authorized to access this profile', 403);
        const user =  this.userRepo.findUserByUsername (username);
        if (user.avatar_url === 'image unavailable')
        {
                const avatar_url = getDefaultAvatar ();
                this.userRepo.setAvatarurl (username, avatar_url);
        }
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
        // if (username !== loggerUsername)
        //     throw new AppError ('You are not authorized to access this profile', 403);
        if (!newusername && !bio)
            return {success : true, message : 'No changes were made to your profile.'};
        if (newusername)
        {
            if (this.userRepo.findUserByUsername (newusername))
                throw new AppError ('this username already exists', 409);
            this.userRepo.setUsername (username, newusername);
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
        // if (username !== loggerUsername)
        //     throw new AppError ('You are not authorized to access this profile', 403);
        const hashedPassword =  await bcrypt.hash(newpassword, 10);
        this.userRepo.setPasswordByUsername (username, hashedPassword);
        return {success : true, message : 'user profile updated'};
    }
    
    async updateAvatar ({username}, {avatar})
    {
        // if (username !== loggerUsername)
        //     throw new AppError ('You are not authorized to access this profile', 403);
        const avatar_url = await uploadFile (username, avatar);
        this.userRepo.setAvatarurl (username, avatar_url);
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
    
    async  setPasswordByEmail ({email, newpassword})
    {
        this.userRepo.setPasswordByEmail (email, newpassword);
        
        return {success : true, message : 'this user setPassword'};
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

};

export default UserService;