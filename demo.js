/**
 * Demo script to show what the output looks like with sample data
 */

function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
