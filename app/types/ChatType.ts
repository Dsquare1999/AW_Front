
export type MessageType = {
    content: string;
    room: string;
    user : UserType;
    read_by : number[];
    created_at ?: string;
}

export type UserType = {
    email : string;
    first_name : string;
    last_name : string;
    id : number;
}

export const DefaultALMUser : UserType = {
    email : 'alm@algoway.com',
    first_name : 'AlgoWay',
    last_name : 'Africa',
    id : 0
}


export type RoomType = {
    id : string;
    name: string;
    messages : MessageType[];
    participants : UserType[];
    avatar ?: string;
    variant ?: 'secondary' | 'ghost';
}