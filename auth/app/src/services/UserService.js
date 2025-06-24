export class UserService
{
    async userExist(username)
    {
        return await this.getFetch(`/api/user/${username}`);
    }

    async getUser(username)
    {

    }

    async createUser( payload )
    {
        return await this.postFetch('/api/user/add', payload)
    }

    async updateUser( payload )
    {

    }

    async deleteUser()
    {

    }


    async getFetch(uri, host = 'localhost', port = 3000)
    {
        let response = await fetch(`http://${host}:${port}${uri}`)
        return await response.json();
    }

    async postFetch(uri, payload, host = 'localhost', port = 3000)
    {
        let result = await fetch(`http://${host}:${port}${uri}`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return await result.json();
    }
}