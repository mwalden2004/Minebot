import fetch from 'node-fetch';

export async function UsernameToUUID(username: string): Promise<string|Error> {
    const req = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (req.status == 204){
        return new Error(`Unable to find information about ${username}`)
    }
    const resp = await req.json() as {name: string; id: string};
    if (!resp.id){
        return new Error(`Unable to find information about ${username}`)
    }
    return resp.id;
}
export async function UUIDtoUsername(uuid: string): Promise<string|Error> {
    const req = await fetch(`https://api.mojang.com/user/profile/${uuid}`);
    if (req.status == 204){
        return new Error(`Unable to find information about ${uuid}`)
    }
    const resp = await req.json() as {name: string; id: string};
    if (!resp.id){
        return new Error(`Unable to find information about ${uuid}`)
    }
    return resp.name;
}