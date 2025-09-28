/**
 * Demo script to show what the output looks like with sample data
 */

function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function getKeyName(key, mode) {
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const keyName = keys[key] || 'Unknown';
  const modeName = mode === 1 ? 'Major' : 'Minor';
  return `${keyName} ${modeName}`;
}

function runDemo() {
  // Sample data based on a typical track response
  const sampleTrackData = {
    id: '3fzYU4CkE4pT5oo9GjMlTU',
    name: 'Example Track',
    artists: ['Sample Artist', 'Featured Artist'],
    album: 'Sample Album',
    duration_ms: 234567,
    explicit: false,
    popularity: 78,
    preview_url: 'https://p.scdn.co/mp3-preview/sample',
    external_urls: {
      spotify: 'https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU'
    },
    bpm: 128,
    key: 0,
    mode: 1,
    time_signature: 4,
    danceability: 0.756,
    energy: 0.845,
    speechiness: 0.045,
    acousticness: 0.123,
    instrumentalness: 0.000,
    liveness: 0.234,
    valence: 0.678,
    loudness: -5.2
  };

  console.log('🎵 Demo: Kyle\'s Spotify API Output\n');
  console.log('Processing URL: https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=efae5ddf0408479b\n');
  
  console.log('=== TRACK INFORMATION ===');
  console.log(`Song: ${sampleTrackData.name}`);
  console.log(`Artist(s): ${sampleTrackData.artists.join(', ')}`);
  console.log(`Album: ${sampleTrackData.album}`);
  console.log(`Duration: ${formatDuration(sampleTrackData.duration_ms)}`);
  console.log(`Popularity: ${sampleTrackData.popularity}/100`);
  console.log(`Explicit: ${sampleTrackData.explicit ? 'Yes' : 'No'}`);
  
  console.log('\n=== AUDIO FEATURES ===');
  console.log(`🎵 BPM (Tempo): ${sampleTrackData.bpm}`);
  console.log(`🎹 Key: ${getKeyName(sampleTrackData.key, sampleTrackData.mode)}`);
  console.log(`🎼 Time Signature: ${sampleTrackData.time_signature}/4`);
  
  console.log('\n=== AUDIO CHARACTERISTICS (0.0 - 1.0) ===');
  console.log(`💃 Danceability: ${sampleTrackData.danceability.toFixed(3)}`);
  console.log(`⚡ Energy: ${sampleTrackData.energy.toFixed(3)}`);
  console.log(`🎤 Speechiness: ${sampleTrackData.speechiness.toFixed(3)}`);
  console.log(`🎸 Acousticness: ${sampleTrackData.acousticness.toFixed(3)}`);
  console.log(`🎼 Instrumentalness: ${sampleTrackData.instrumentalness.toFixed(3)}`);
  console.log(`🎪 Liveness: ${sampleTrackData.liveness.toFixed(3)}`);
  console.log(`😊 Valence (Positivity): ${sampleTrackData.valence.toFixed(3)}`);
  console.log(`🔊 Loudness: ${sampleTrackData.loudness.toFixed(1)} dB`);
  
  if (sampleTrackData.preview_url) {
    console.log(`\n🎧 Preview: ${sampleTrackData.preview_url}`);
  }
  
  console.log(`\n🔗 Spotify Link: ${sampleTrackData.external_urls.spotify}`);
  
  console.log('\n💡 This is demo output with sample data.');
  console.log('   Configure your Spotify API credentials to get real data!');
}

if (require.main === module) {
  runDemo();
}

module.exports = { runDemo };