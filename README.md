# Kyle's Spotify API

A Node.js tool to extract track information from Spotify track links.

## Features

- Extract track information from Spotify URLs
- Support for various Spotify URL formats

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
Song: Example Track
Artist(s): Sample Artist, Featured Artist
Album: Sample Album
Duration: 3:54
Popularity: 78/100
Explicit: No

🎧 Preview: https://p.scdn.co/mp3-preview/sample

🔗 Spotify Link: https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU
```

### Programmatic Usage

```javascript
const { processSpotifyTrack } = require('./index');

const trackData = await processSpotifyTrack('https://open.spotify.com/track/...');
```

## Supported URL Formats

- `https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU`
- `https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=...`
- `https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=...&utm_source=...`

## API Reference

### `SpotifyAPI`

#### `getTrackData(url)`

**Parameters:**
- `url` (string): Spotify track URL

**Returns:**

```javascript
{
  id: "3fzYU4CkE4pT5oo9GjMlTU",
  name: "Song Name",
  artists: ["Artist Name"],
  album: "Album Name",
  duration_ms: 225000,
  explicit: false,
  popularity: 78,
  preview_url: "https://...",        // null if unavailable
  external_urls: { spotify: "https://..." }
}
```

#### `extractTrackId(url)`
Extracts the track ID from a Spotify URL.

#### `getTrackInfo(trackId)`
Gets track information from the Spotify `/v1/tracks/{id}` endpoint.

## Testing

Run the test suite (URL parsing / error-handling tests — no credentials required):

```bash
npm test
```

Run with live Spotify API calls via Proton Pass credential injection:

```bash
npm run test:op
```

## Error Handling

The tool handles various error cases:

- Invalid Spotify URLs
- Network connectivity issues
- Invalid API credentials
- Rate limiting
- Track not found

## License

MIT
