const SpotifyAPI = require('./spotify-api');

/**
 * Format track duration from milliseconds to MM:SS
 */
function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get musical key name from Spotify's key notation
 */
function getKeyName(key, mode) {
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const keyName = keys[key] || 'Unknown';
  const modeName = mode === 1 ? 'Major' : 'Minor';
  return `${keyName} ${modeName}`;
}

/**
 * Main function to process a Spotify track URL
 */
async function processSpotifyTrack(url) {
  const spotify = new SpotifyAPI();
  
  try {
    console.log('🎵 Processing Spotify track...\n');
    
    const trackData = await spotify.getTrackData(url);
    
    console.log('=== TRACK INFORMATION ===');
    console.log(`Song: ${trackData.name}`);
    console.log(`Artist(s): ${trackData.artists.join(', ')}`);
    console.log(`Album: ${trackData.album}`);
    console.log(`Duration: ${formatDuration(trackData.duration_ms)}`);
    console.log(`Popularity: ${trackData.popularity}/100`);
    console.log(`Explicit: ${trackData.explicit ? 'Yes' : 'No'}`);
    
    console.log('\n=== AUDIO FEATURES ===');
    console.log(`🎵 BPM (Tempo): ${trackData.bpm}`);
    console.log(`🎹 Key: ${getKeyName(trackData.key, trackData.mode)}`);
    console.log(`🎼 Time Signature: ${trackData.time_signature}/4`);
    
    console.log('\n=== AUDIO CHARACTERISTICS (0.0 - 1.0) ===');
    console.log(`💃 Danceability: ${trackData.danceability.toFixed(3)}`);
    console.log(`⚡ Energy: ${trackData.energy.toFixed(3)}`);
    console.log(`🎤 Speechiness: ${trackData.speechiness.toFixed(3)}`);
    console.log(`🎸 Acousticness: ${trackData.acousticness.toFixed(3)}`);
    console.log(`🎼 Instrumentalness: ${trackData.instrumentalness.toFixed(3)}`);
    console.log(`🎪 Liveness: ${trackData.liveness.toFixed(3)}`);
    console.log(`😊 Valence (Positivity): ${trackData.valence.toFixed(3)}`);
    console.log(`🔊 Loudness: ${trackData.loudness.toFixed(1)} dB`);
    
    if (trackData.preview_url) {
      console.log(`\n🎧 Preview: ${trackData.preview_url}`);
    }
    
    console.log(`\n🔗 Spotify Link: ${trackData.external_urls.spotify}`);
    
    return trackData;
    
  } catch (error) {
    console.error('❌ Error:', error.message);

    const clientId = process.env.SPOTIFY_CLIENT_ID || '';
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';

    if (!clientId || !clientSecret) {
      console.log('\n💡 Setup Instructions:');
      console.log('1. Go to https://developer.spotify.com/dashboard/ and create an app');
      console.log('2. Store the Client ID and Client Secret in your Proton Pass vault');
      console.log('3. Update .env with the correct pass:// vault references');
      console.log('4. Run:  npm run start:op');
    } else if (clientId.startsWith('pass://') || clientSecret.startsWith('pass://')) {
      console.log('\n💡 Credentials are unresolved Proton Pass vault references.');
      console.log('   Run the tool via the Proton Pass CLI so secrets are injected at startup:');
      console.log('   npm run start:op');
    }

    throw error;
  }
}

// Main execution
async function main() {
  // Get URL from command line arguments or use the example
  const url = process.argv[2] || 'https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=efae5ddf0408479b';
  
  console.log(`Processing URL: ${url}\n`);
  
  try {
    await processSpotifyTrack(url);
  } catch (error) {
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { processSpotifyTrack, SpotifyAPI };