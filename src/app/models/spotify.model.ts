export interface User {
    display_name: string;
    images: Image[];
    country: string;
    email: string;
    followers: {
        total: number;
    };
}

export interface Image {
    url: string;
    width: number;
    height: number;
}

export interface TopArtists {
    items: Artist[];
}

export interface Artist {
    followers: {
        total: number;
    };
    genres: string[];
    images: Image[];
    name: string;
    popularity: number;
    external_urls: {
        spotify: string;
    };
}

export interface TopTracks {
    items: Track[];
}

export interface Track {
    album: Album;
    artists: Artist[];
    duration_ms: number;
    popularity: number;
    name: string;
    external_urls: {
        spotify: string;
    };
    uri: string;
}

export interface Album {
    album_type: string;
    artist: Artist[];
    genres: string[];
    images: Image[];
    label: string;
    name: string;
    external_urls: {
        spotify: string;
    };
    popularity: number;
    release_date: string;
    tracks: Track[];
}
