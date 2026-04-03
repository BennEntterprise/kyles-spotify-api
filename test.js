const SpotifyAPI = require('./spotify-api');

/**
 * Simple test runner
 */
async function runTests() {
  console.log('🧪 Running tests for Kyle\'s Spotify API\n');
  
  const spotify = new SpotifyAPI();
  let passed = 0;
  let failed = 0;
  
  // Test 1: Track ID extraction
  console.log('Test 1: Track ID extraction');
  try {
    const testUrl = 'https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=efae5ddf0408479b';
    const trackId = spotify.extractTrackId(testUrl);
    const expectedId = '3fzYU4CkE4pT5oo9GjMlTU';
    
    if (trackId === expectedId) {
      console.log('✅ PASS: Track ID extracted correctly');
      passed++;
    } else {
      console.log(`❌ FAIL: Expected ${expectedId}, got ${trackId}`);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAIL: Error extracting track ID:', error.message);
    failed++;
  }
  
  // Test 2: Invalid URL handling
  console.log('\nTest 2: Invalid URL handling');
  try {
    spotify.extractTrackId('https://invalid-url.com');
    console.log('❌ FAIL: Should have thrown error for invalid URL');
    failed++;
  } catch (error) {
    console.log('✅ PASS: Correctly handled invalid URL');
    passed++;
  }
  
  // Test 3: Different URL formats
  console.log('\nTest 3: Different URL formats');
  try {
    const urls = [
      'https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU',
      'https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=something',
      'https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=efae5ddf0408479b&utm_source=copy-link'
    ];
    
    let allPassed = true;
    for (const url of urls) {
      const trackId = spotify.extractTrackId(url);
      if (trackId !== '3fzYU4CkE4pT5oo9GjMlTU') {
        allPassed = false;
        break;
      }
    }
    
    if (allPassed) {
      console.log('✅ PASS: All URL formats handled correctly');
      passed++;
    } else {
      console.log('❌ FAIL: Some URL formats not handled correctly');
      failed++;
    }
  } catch (error) {
    console.log('❌ FAIL: Error with URL formats:', error.message);
    failed++;
  }
  
  // Test 4: Environment variables check
  console.log('\nTest 4: Environment variables check');
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const isVaultRef = (v) => v && v.startsWith('pass://');

  if (!clientId || !clientSecret) {
    console.log('⚠️  SKIP: Spotify credentials not configured');
    console.log('   Run `npm run test:op` to inject credentials via Proton Pass CLI');
  } else if (isVaultRef(clientId) || isVaultRef(clientSecret)) {
    console.log('⚠️  SKIP: Credentials are unresolved Proton Pass vault references');
    console.log('   Run `npm run test:op` so that `pass-cli run` resolves them before the process starts');
  } else {
    console.log('✅ PASS: Spotify credentials are configured');
    passed++;
    
    // Test 5: API call (only if credentials are available)
    console.log('\nTest 5: API functionality');
    try {
      const testUrl = 'https://open.spotify.com/track/3fzYU4CkE4pT5oo9GjMlTU?si=efae5ddf0408479b';
      const trackData = await spotify.getTrackData(testUrl);
      
      if (trackData && trackData.name && trackData.artists) {
        console.log('✅ PASS: API call successful, got track data');
        console.log(`   Song: ${trackData.name} by ${trackData.artists.join(', ')}`);
        passed++;
      } else {
        console.log('❌ FAIL: API call returned incomplete data');
        failed++;
      }
    } catch (error) {
      console.log('❌ FAIL: API call failed:', error.message);
      failed++;
    }
  }
  
  // Summary
  console.log(`\n=== TEST SUMMARY ===`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('🔧 Some tests failed. Please check the implementation.');
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = { runTests };