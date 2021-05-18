import { stringify } from 'querystring'
import { QueryFunctionContext } from 'react-query'

import {
  AccessTokenResponse,
  CurrentEpisode,
  CurrentEpisodeResponse,
  CurrentTrack,
  CurrentTrackResponse,
  RecentTrack,
  RecentTrackResponse,
  TopArtist,
  TopArtistsResponse,
} from '@interfaces/spotify'

const spotify = {
  CURRENT_TRACK: 'https://api.spotify.com/v1/me/player/currently-playing',
  RECENT_TRACK: 'https://api.spotify.com/v1/me/player/recently-played',
  TOKEN: 'https://accounts.spotify.com/api/token',
  TOP_ARTISTS: 'https://api.spotify.com/v1/me/top/artists',
}

/**
 * CLIENT-SIDE QUERIES
 */

export async function fetchNowPlaying(
  _context: QueryFunctionContext
): Promise<CurrentEpisode | CurrentTrack | RecentTrack> {
  try {
    const response = await fetch('/api/spotify/now-playing')
    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}

export async function fetchTopArtists(
  _context: QueryFunctionContext
): Promise<CurrentEpisode | CurrentTrack | RecentTrack> {
  try {
    const response = await fetch('/api/spotify/top-artists')
    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * SERVER-SIDE QUERIES
 */

async function getAccessToken(): Promise<AccessTokenResponse> {
  const response = await fetch(spotify.TOKEN, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: stringify({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  })

  return await response.json()
}

export async function getNowPlaying(): Promise<
  CurrentEpisode | CurrentTrack | RecentTrack
> {
  try {
    // Authenticate with Spotify.
    const { access_token } = await getAccessToken()

    // Fetch data if I am currently listening to Spotify.
    const res = await fetch(
      `${spotify.CURRENT_TRACK}?additional_types=episode,track`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    // If the request fails...
    if (res.status === 204 || res.status > 400) {
      // Fetch data for the last track played.
      const res = await fetch(`${spotify.RECENT_TRACK}?limit=1`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      // If the request fails...
      if (res.status === 204 || res.status > 400) {
        // Reject with the appropriate data envelope.
        return Promise.reject<RecentTrack>({
          artist: null,
          isLastPlayed: false,
          name: null,
          url: null,
        })
      }

      // Parse the recent track data.
      const r = (await res.json()) as RecentTrackResponse

      // Resolve with the recently played track.
      return Promise.resolve<RecentTrack>({
        artist: r.items[0].track.artists
          .map(a => a.name)
          .join(', ')
          .trim(),
        isLastPlayed: true,
        name: r.items[0].track.name,
        url: r.items[0].track.external_urls.spotify,
      })
    }

    // Parse the currently playing track data.
    const r = (await res.json()) as
      | CurrentTrackResponse
      | CurrentEpisodeResponse

    let response

    if (r.currently_playing_type === 'episode') {
      r as CurrentEpisodeResponse
      response = {
        isPlaying: true,
        name: r.item.name,
        podcast: r.item.show.name,
        url: r.item.show.external_urls.spotify,
      } as CurrentEpisode
    } else {
      r as CurrentTrackResponse
      response = {
        artist: r.item.artists
          .map(a => a.name)
          .join(', ')
          .trim(),
        isPlaying: true,
        name: r.item.name,
        url: r.item.external_urls.spotify,
      } as CurrentTrack
    }

    // Resolve with the currently playing track.
    return Promise.resolve<CurrentEpisode | CurrentTrack>(response)
  } catch (error) {
    throw new Error(error)
  }
}

export async function getTopArtists(): Promise<Array<TopArtist>> {
  try {
    // Authenticate with Spotify.
    const { access_token } = await getAccessToken()

    // Fetch top 10 artists from Spotify.
    const res = await fetch(`${spotify.TOP_ARTISTS}?limit=10`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // If the request fails...
    if (res.status === 204 || res.status > 400) {
      // Reject with the appropriate data envelope.
      return Promise.reject([])
    }

    const artists = (await res.json()) as TopArtistsResponse

    // Resolve with the top 10 artists list.
    return Promise.resolve<Array<TopArtist>>(
      artists.items.map(({ external_urls, images, name }) => ({
        image: images[2],
        name,
        url: external_urls.spotify,
      }))
    )
  } catch (error) {
    throw new Error(error)
  }
}
