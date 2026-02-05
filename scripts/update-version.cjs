const fs = require('fs');
const path = require('path');

const version = process.argv[2];

if (!version) {
  console.log('No version specified, skipping version sync');
  process.exit(0);
}

// Validate version format (semver)
const semverRegex = /^(\d+\.\d+\.\d+)(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;
if (!semverRegex.test(version)) {
  console.error(`Invalid version format: ${version}`);
  process.exit(1);
}

console.log(`Setting version to ${version}...`);

// Update package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.version = version;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
console.log('Updated package.json');

// Update Cargo.toml
const cargoTomlPath = path.join(__dirname, '..', 'Cargo.toml');
let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8');
cargoToml = cargoToml.replace(/^version = ".*"/m, `version = "${version}"`);
fs.writeFileSync(cargoTomlPath, cargoToml, 'utf8');
console.log('Updated Cargo.toml');

console.log(`Version ${version} set successfully`);
