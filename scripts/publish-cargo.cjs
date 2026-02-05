const { execSync } = require('child_process');

console.log('Publishing to crates.io...');

try {
  execSync('cargo publish', { stdio: 'inherit' });
  console.log('Successfully published to crates.io!');
} catch (error) {
  console.error('Failed to publish to crates.io:', error.message);
  process.exit(1);
}
