const axios = require('axios');
require('dotenv').config();

class SpotifyAPI {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiryTime = null;
  }

  /**
   * Get access token using Client Credentials flow
   */
  async getAccessToken() {
    // Check if token is still valid
    if (this.accessToken && this.tokenExpiryTime && Date.now() < this.tokenExpiryTime) {
      return this.accessToken;
    }

    try {
      const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.accessToken = response.data.access_token;
      // Set expiry time with 60 second buffer
      this.tokenExpiryTime = Date.now() + (response.data.expires_in - 60) * 1000;
      
      return this.accessToken;
    } catch (error) {
      throw new Error(`Failed to get access token: ${error.response?.data?.error_description || error.message}`);
    }
  }

  /**
   * Extract track ID from Spotify URL
   * @param {string} url - Spotify track URL
   * @returns {string} - Track ID
   */
  extractTrackId(url) {
    const regex = /track\/([a-zA-Z0-9]{22})/;
    const match = url.match(regex);
    
    if (!match) {
      throw new Error('Invalid Spotify track URL');
    }
    
    return match[1];
  }

  /**
   * Get track information
   * @param {string} trackId - Spotify track ID
   * @returns {Object} - Track information
   */
  async getTrackInfo(trackId) {
    const token = await this.getAccessToken();
    
    try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to get track info: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  /**
   * Get comprehensive track information
   * @param {string} url - Spotify track URL
   * @returns {Object} - Track information
   */
  async getTrackData(url) {
    const trackId = this.extractTrackId(url);
    const trackInfo = await this.getTrackInfo(trackId);

    return {
      id: trackInfo.id,
      name: trackInfo.name,
      artists: trackInfo.artists.map(artist => artist.name),
      album: trackInfo.album.name,
      duration_ms: trackInfo.duration_ms,
      explicit: trackInfo.explicit,
      popularity: trackInfo.popularity,
      preview_url: trackInfo.preview_url,
      external_urls: trackInfo.external_urls,
    };
  }
}

module.exports = SpotifyAPI;