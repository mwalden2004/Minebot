import fetch from 'node-fetch';

export async function UsernameToUUID(username: string): Promise<string|Error> {
    const req = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    const resp = await req.json() as {name: string; id: string};
    if (!resp.id){
        return new Error(`Unable to find information about ${username}`)
    }
    return resp.id;
}
export async function UUIDtoUsername(uuid: string): Promise<string|Error> {
    const req = await fetch(`https://api.mojang.com/user/profile/${uuid}`);
    const resp = await req.json() as {name: string; id: string};
    if (!resp.id){
        return new Error(`Unable to find information about ${uuid}`)
    }
    return resp.name;
}