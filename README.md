# Kyle's Spotify API

A Node.js tool to extract detailed track information including BPM from Spotify track links.

## Features

- 🎵 Extract track information from Spotify URLs
- 🎶 Get BPM (tempo) and audio features
- 🎹 Musical key and time signature
- 📊 Audio characteristics (danceability, energy, etc.)
- 🔗 Support for various Spotify URL formats

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new app
3. Copy your Client ID and Client Secret

### 3. Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

## Usage

### Command Line

Process a Spotify track URL:

```bash
npm start "https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=efae5ddf0408479b"
```

Or run with the default example URL:

```bash
npm start
```

### Demo Mode

To see example output without API credentials:

```bash
npm run demo
```

### Example Output

```
🎵 Processing Spotify track...

=== TRACK INFORMATION ===
Song: Example Song Name
Artist(s): Artist Name
Album: Album Name
Duration: 3:45
Popularity: 75/100
Explicit: No

=== AUDIO FEATURES ===
🎵 BPM (Tempo): 128
🎹 Key: C Major
🎼 Time Signature: 4/4

=== AUDIO CHARACTERISTICS (0.0 - 1.0) ===
💃 Danceability: 0.756
⚡ Energy: 0.845
🎤 Speechiness: 0.045
🎸 Acousticness: 0.123
🎼 Instrumentalness: 0.000
🎪 Liveness: 0.234
😊 Valence (Positivity): 0.678
🔊 Loudness: -5.2 dB

🔗 Spotify Link: https://open.spotify.com/track/...
```

### Programmatic Usage

```javascript
const { processSpotifyTrack, SpotifyAPI } = require('./index');

// Process a track URL
const trackData = await processSpotifyTrack('https://open.spotify.com/track/...');

// Or use the API class directly
const spotify = new SpotifyAPI();
const trackData = await spotify.getTrackData('https://open.spotify.com/track/...');
```

## Supported URL Formats

The tool supports various Spotify track URL formats:

- `https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU`
- `https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=...`
- `https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=...&utm_source=...`

## API Reference

### SpotifyAPI Class

#### `getTrackData(url)`
Returns comprehensive track information including BPM.

**Parameters:**
- `url` (string): Spotify track URL

**Returns:**
Object with track information and audio features:

```javascript
{
  id: "3fzYU4CkE4pT5oo9GjMlTU",
  name: "Song Name",
  artists: ["Artist Name"],
  album: "Album Name",
  duration_ms: 225000,
  bpm: 128,
  key: 0,
  mode: 1,
  danceability: 0.756,
  energy: 0.845,
  // ... more properties
}
```

#### `extractTrackId(url)`
Extracts the track ID from a Spotify URL.

#### `getTrackInfo(trackId)`
Gets basic track information.

#### `getAudioFeatures(trackId)`
Gets audio features including BPM.

## Testing

Run the test suite:

```bash
npm test
```

## Audio Features Explained

- **BPM (Tempo)**: Beats per minute
- **Key**: Musical key (0=C, 1=C#, etc.)
- **Mode**: Major (1) or Minor (0)
- **Danceability**: How suitable the track is for dancing
- **Energy**: Perceptual measure of intensity and power
- **Speechiness**: Presence of spoken words
- **Acousticness**: Confidence the track is acoustic
- **Instrumentalness**: Predicts if track contains no vocals
- **Liveness**: Detects presence of audience
- **Valence**: Musical positivity/happiness
- **Loudness**: Overall loudness in decibels

## Error Handling

The tool handles various error cases:

- Invalid Spotify URLs
- Network connectivity issues
- Invalid API credentials
- Rate limiting
- Track not found

## License

MIT
