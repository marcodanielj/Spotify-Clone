import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../interfaces/IArtist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { ITrack } from "../interfaces/ITrack";
import { IUsuario } from "../interfaces/IUsuario";
import { newPlaylist, newTrack } from "./factories";

// Transforms the Spotify API data into local data

export function SpotifyUserToLocalUser(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        imagemURL: user.images.pop().url
    }
}

export function SpotifyPlaylistToLocalPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {

        // This one does NOT contains the tracks within and its used to feed the left menu with the user's playlists

        id: playlist.id,
        name: playlist.name,
        imageURL: playlist.images.pop().url
    };
}

export function SpotifyFullPlaylistToLocalFullPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {

    if (!playlist)
    return newPlaylist();

    return {

    // This one contains the tracks and its used to feed the playlist's tracks table
        
        id: playlist.id,
        name: playlist.name,
        imageURL: playlist.images.shift().url,
        tracks: []
    }
}

export function SpotifyArtistToLocalArtist(artist: SpotifyApi.ArtistObjectFull): IArtist {
    return {
        id: artist.id,
        imageURL: artist.images.sort((a,b) => a.width - b.width).pop().url,
        name: artist.name
    }
}

export function SpotifyTrackToLocalTrack(track: SpotifyApi.TrackObjectFull): ITrack {

    if (!track)
    return newTrack();
    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }

    return {
        id: track.id,
        uri: track.uri,
        name: track.name,
        album: {
            id: track.album.id,
            imageURL: track.album.images.shift().url,
            name: track.album.name
        },
        artists: track.artists.map(artist => ({
            id: artist.id,
            name: artist.name
        })),
        duration: msParaMinutos(track.duration_ms)
    }
}