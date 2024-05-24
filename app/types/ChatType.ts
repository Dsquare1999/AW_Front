import { UserType } from './UserType';

export type MessageType = {
    content: string;
    room: string;
    user : UserType;
    read_by : number[];
    created_at ?: string;
    isPrompted ?: boolean;
}

export const DefaultALMUser : UserType = {
    email : 'alm@algoway.com',
    first_name : 'Algo',
    last_name : 'Friend',
    id : 0,
    is_staff : true
}

export type RoomType = {
    id : string;
    name: string;
    messages : MessageType[];
    participants : UserType[];
    avatar ?: string;
    variant ?: 'secondary' | 'ghost';
}