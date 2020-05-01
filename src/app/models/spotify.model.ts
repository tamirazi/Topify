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
    href: string;
    popularity: number;
    external_urls: {
        spotify: string;
    };
    id: string;
    artists?: Artist[];
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
    href: string;
    track?: Track;
    id: string;
}

export interface Album {
    id: string;
    href: string;
    album_type: string;
    artists: Artist[];
    genres: string[];
    images: Image[];
    label: string;
    name: string;
    external_urls: {
        spotify: string;
    };
    popularity: number;
    release_date: string;
    tracks: {
        items: Track[];
    };
}

export interface SpotifyError {
    error: {
        error: {
            status: number;
            message: string;
        }
    };
}
