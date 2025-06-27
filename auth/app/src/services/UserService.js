export class UserService
{   
    async getUser(username, ...fields)
    {
        return await this.postFetch(`/api/user/filter`, {
            filter: { username },
            fields
        });
    }

    async createUser( payload )
    {
        return await this.postFetch('/api/user/add', payload)
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