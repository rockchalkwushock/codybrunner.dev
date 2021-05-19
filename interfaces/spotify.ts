import { Maybe } from './helpers'

/**
 * Spotify Internal Typings
 */

type Album = {
  album_type: 'album' | 'single'
  artists: Array<Artist>
  available_markets: Array<string>
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: Array<Image>
  name: string
  release_date: string
  release_date_precision: 'day'
  total_tracks: number
  type: 'album'
  uri: string
}

type Artist = {
  external_urls: {
    spotify: string
  }
  followers: {
    href: Maybe<string>
    total: number
  }
  genres: Array<string>
  href: string
  id: string
  images: Array<Image>
  name: string
  popularity: number
  type: 'artist'
  uri: string
}

type Image = {
  height: number
  url: string
  width: number
}

type Track = {
  album: Album
  artists: Array<Artist>
  available_markets: Array<string>
  disc_number: number
  duration_ms: number
  explicit: true
  external_ids: { isrc: string }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: Array<Image>
  is_local: false
  name: string
  popularity: number
  preview_url: string
  release_date: string
  release_date_precision: 'day'
  total_tracks: number
  track_number: number
  type: 'album' | 'track'
  uri: string
}

/**
 * Spotify API Responses
 */

export interface AccessTokenResponse {
  access_token: string
  expires_in: number
  scope: string
  token_type: 'Basic' | 'Bearer'
}

export interface CurrentEpisodeResponse {
  actions: {
    disallows: {
      resuming: boolean
      skipping_prev: boolean
      toggling_repeat_context: boolean
      toggling_repeat_track: boolean
      toggling_shuffle: boolean
    }
  }
  context: {
    external_urls: {
      spotify: string
    }
    href: string
    type: 'show'
    uri: string
  }
  currently_playing_type: 'episode'
  is_playing: boolean
  item: {
    audio_preview_url: string
    description: string
    duration_ms: number
    explicit: boolean
    external_urls: {
      spotify: string
    }
    href: string
    html_description: string
    id: string
    images: Array<Image>
    is_externally_hosted: boolean
    is_playable: boolean
    language: string
    languages: Array<string>
    name: string
    release_date: string
    release_date_precision: 'day'
    show: {
      available_markets: Array<string>
      copyrights: Array<string>
      description: string
      explicit: boolean
      external_urls: { spotify: string }
      href: string
      id: string
      images: Array<Image>
      is_externally_hosted: boolean
      languages: Array<string>
      media_types: 'mixed'
      name: string
      publisher: string
      total_episodes: number
      type: 'show'
      uri: string
    }
    type: 'episode'
    uri: string
  }
  progress_ms: number
  timestamp: number
}

export interface CurrentTrackResponse {
  timestamp: number
  context: {
    external_urls: {
      spotify: string
    }
    href: string
    type: 'album'
    uri: string
  }
  progress_ms: number
  item: Track
  currently_playing_type: 'track'
  actions: { disallows: { resuming: boolean } }
  is_playing: true
}

export interface RecentTrackResponse {
  items: Array<{
    track: Track
    played_at: string
    context: {
      uri: string
      external_urls: {
        spotify: string
      }
      href: string
      type: 'artist'
    }
  }>
  next: string
  cursors: { after: string; before: string }
  limit: number
  href: string
}

export interface TopArtistsResponse {
  items: Array<Track>
  total: number
  limit: number
  offset: number
  href: string
  previous: Maybe<string>
  next: Maybe<string>
}

export interface TopTracksResponse {
  items: Array<Track>
  total: number
  limit: number
  offset: number
  href: string
  previous: Maybe<string>
  next: Maybe<string>
}

/**
 * Parsed Typings
 */

export interface CurrentEpisode {
  isPlaying: boolean
  name: Maybe<string>
  podcast: Maybe<string>
  url: Maybe<string>
}

export interface CurrentTrack {
  artist: Maybe<string>
  isPlaying: boolean
  name: Maybe<string>
  url: Maybe<string>
}

export interface RecentTrack {
  artist: Maybe<string>
  isLastPlayed: boolean
  name: Maybe<string>
  url: Maybe<string>
}

export interface TopArtist {
  image: Image
  name: string
  url: string
}

export interface TopTrack {
  album: string
  artist: string
  image: Image
  name: string
  url: string
}
