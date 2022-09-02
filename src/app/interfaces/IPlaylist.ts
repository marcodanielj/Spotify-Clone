import { ITrack } from "./ITrack"

export interface IPlaylist {
    id: string,
    name: string,
    imageURL: string,
    tracks?: ITrack[]
}