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
3. Note your **Client ID** and **Client Secret**

### 3. Store Credentials in Proton Pass

This project uses the [Proton Pass CLI](https://protonpass.github.io/pass-cli/) (`pass-cli`) to
inject secrets at runtime. The committed `.env` file holds vault *references* — not real values —
so it is safe to commit.

#### a. Install the Proton Pass CLI

Follow the official guide: <https://protonpass.github.io/pass-cli/>

```bash
# macOS (Homebrew)
brew install pass-cli

# Linux — download the binary for your architecture from the releases page, e.g.:
# https://github.com/protonpass/pass-cli/releases

# Verify
pass-cli --version
```

#### b. Sign in

```bash
pass-cli auth login
```

#### c. Create the Proton Pass item

Store your Spotify credentials as a new item in Proton Pass. The vault reference format is:

```
pass://<vault-name>/<item-name>/<field-name>
```

Example (using the Proton Pass app or CLI):

| Field | Value |
|---|---|
| Vault | `Personal` |
| Item name | `Spotify API` |
| Field `client_id` | `<your Spotify Client ID>` |
| Field `client_secret` | `<your Spotify Client Secret>` |

#### d. Configure `.env`

The `.env` file is already committed with default vault references:

```dotenv
SPOTIFY_CLIENT_ID=pass://Personal/Spotify API/client_id
SPOTIFY_CLIENT_SECRET=pass://Personal/Spotify API/client_secret
```

If your vault or item has a different name, update those references to match.
Real credentials are **never** stored in `.env` — `pass-cli run` resolves them at runtime.

## Usage

### Command Line (with Proton Pass CLI — recommended)

```bash
npm run start:op "https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=efae5ddf0408479b"
```

`pass-cli run` reads `.env`, resolves each `pass://` reference against your vault, and injects the
real values as environment variables for the duration of the process.

### Command Line (manual credentials)

If you prefer not to use the Proton Pass CLI you can still run the tool by exporting credentials
directly in your shell:

```bash
SPOTIFY_CLIENT_ID=<id> SPOTIFY_CLIENT_SECRET=<secret> npm start "https://open.spotify.com/track/..."
```

### Demo Mode

To see example output without any credentials:

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

Run the test suite (URL parsing / error-handling tests — no credentials required):

```bash
npm test
```

Run with live Spotify API calls via Proton Pass credential injection:

```bash
npm run test:op
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
