import { IArtist } from "../interfaces/IArtist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { ITrack } from "../interfaces/ITrack";

export function newArtist(): IArtist {
    return {
        id: '',
        name: '',
        imageURL: '',
        tracks: []
    }
}

export function newTrack(): ITrack {
    return {
        id: '',
        uri: '',
        name: '',
        album: {
            id: '',
            imageURL: '',
            name: '',
        },
        artists: [],
        duration: ''
    }
}

export function newPlaylist(): IPlaylist {
    return {
        id: '',
        name: '',
        imageURL: '',
        tracks: []
    }
}