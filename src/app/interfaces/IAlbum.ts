import { ITrack } from "./ITrack";

export interface IAlbum {
    id: string,
    name: string,
    imageURL: string,
    tracks?: ITrack[]
} 