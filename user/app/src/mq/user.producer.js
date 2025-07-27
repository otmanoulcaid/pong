async function   sendMessage (channel, user)
{
    console.log ("=================print messsage sendMessage=========================");
    console.log (user);
    console.log ("=================print messsage sendMessage=========================");
    await channel.publish ('user.events', '', Buffer.from (JSON.stringify (user)));
}

export default sendMessage;