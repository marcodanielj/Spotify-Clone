import { IArtist } from "./IArtist";

export interface ITrack {
    id: string,
    uri: string,
    name: string,
    artists: {
        id: string,
        name: string
    }[],
    album?: {
        id: string,
        name: string,
        imageURL?: string
    },
    duration: string
}