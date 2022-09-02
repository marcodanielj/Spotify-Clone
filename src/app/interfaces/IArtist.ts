import { ITrack } from "./ITrack";

export interface IArtist {
    id: string,
    name: string,
    imageURL: string,
    tracks?: ITrack[]
}