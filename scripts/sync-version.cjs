const fs = require('fs');
const path = require('path');

// Read version from package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log(`Syncing version ${version} from package.json to Cargo.toml...`);

// Update Cargo.toml
const cargoTomlPath = path.join(__dirname, '..', 'Cargo.toml');
let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8');
cargoToml = cargoToml.replace(/^version = ".*"/m, `version = "${version}"`);
fs.writeFileSync(cargoTomlPath, cargoToml, 'utf8');

console.log(`Cargo.toml updated to version ${version}`);
