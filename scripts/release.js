#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Configuration
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');
const RELEASE_TEMPLATE_PATH = path.join(__dirname, '..', '.github', 'release-template.md');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility functions
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

function getPackageSize() {
  try {
    const stats = fs.statSync(path.join(__dirname, '..', 'dist'));
    const sizeInBytes = stats.size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    return `${sizeInKB} KB`;
  } catch (error) {
    return 'Unknown';
  }
}

function getPreviousVersion() {
  try {
    const tags = execSync('git tag --sort=-version:refname', { encoding: 'utf8' });
    const tagLines = tags.trim().split('\n');
    return tagLines[0] ? tagLines[0].replace('v', '') : '0.0.0';
  } catch (error) {
    return '0.0.0';
  }
}

function getCommitsSinceLastTag() {
  try {
    const commits = execSync('git log --oneline --no-merges $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD', { encoding: 'utf8' });
    return commits.trim().split('\n').filter(line => line.length > 0);
  } catch (error) {
    return [];
  }
}

function generateMigrationGuide(version, previousVersion) {
  const majorCurrent = parseInt(version.split('.')[0]);
  const majorPrevious = parseInt(previousVersion.split('.')[0]);
  
  if (majorCurrent > majorPrevious) {
    return `
### Breaking Changes in v${version}

This is a major version release with breaking changes. Please review the following:

1. **Check your imports** - Ensure all imports are working correctly
2. **Review configuration** - Some configuration options may have changed
3. **Test thoroughly** - Run your tests to ensure compatibility
4. **Update dependencies** - Ensure all related packages are compatible

For detailed migration information, see the [CHANGELOG.md](CHANGELOG.md) file.
    `;
  }
  
  return `
### No Breaking Changes

This release is backward compatible with v${previousVersion}. No migration steps required.
  `;
}

function createReleaseNotes(version, changelogEntry) {
  const template = fs.readFileSync(RELEASE_TEMPLATE_PATH, 'utf8');
  const previousVersion = getPreviousVersion();
  const packageSize = getPackageSize();
  const migrationGuide = generateMigrationGuide(version, previousVersion);
  
  return template
    .replace(/\{\{version\}\}/g, version)
    .replace(/\{\{changelog_entry\}\}/g, changelogEntry)
    .replace(/\{\{repo\}\}/g, 'Devlander-Software/discord-notify')
    .replace(/\{\{package_size\}\}/g, packageSize)
    .replace(/\{\{migration_guide\}\}/g, migrationGuide)
    .replace(/\{\{previous_version\}\}/g, previousVersion);
}

function validateRelease() {
  console.log('🔍 Validating release...');
  
  // Check if dist folder exists
  if (!fs.existsSync(path.join(__dirname, '..', 'dist'))) {
    console.error('❌ Build folder not found. Run "npm run build" first.');
    return false;
  }
  
  // Check if tests pass
  try {
    console.log('🧪 Running tests...');
    execSync('npm run test:all', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Tests failed. Fix issues before releasing.');
    return false;
  }
  
  // Check if changelog is up to date
  const commits = getCommitsSinceLastTag();
  if (commits.length === 0) {
    console.warn('⚠️  No new commits since last tag. Are you sure you want to release?');
  }
  
  console.log('✅ Release validation passed!');
  return true;
}

async function interactiveRelease() {
  console.log('🚀 Discord Notify Release Manager');
  console.log('================================\n');
  
  const currentVersion = getCurrentVersion();
  const commits = getCommitsSinceLastTag();
  
  console.log(`📦 Current version: ${currentVersion}`);
  console.log(`📝 Commits since last tag: ${commits.length}`);
  
  if (commits.length > 0) {
    console.log('\n📋 Recent commits:');
    commits.slice(0, 5).forEach(commit => {
      console.log(`  - ${commit}`);
    });
    if (commits.length > 5) {
      console.log(`  ... and ${commits.length - 5} more`);
    }
  }
  
  console.log('\n🎯 Release Options:');
  console.log('1. Patch release (1.0.0 → 1.0.1)');
  console.log('2. Minor release (1.0.1 → 1.1.0)');
  console.log('3. Major release (1.1.0 → 2.0.0)');
  console.log('4. Custom version');
  console.log('5. Exit');
  
  const choice = await question('\nSelect option (1-5): ');
  
  let newVersion;
  switch (choice) {
    case '1':
      newVersion = execSync('npm version patch --no-git-tag-version', { encoding: 'utf8' }).trim();
      break;
    case '2':
      newVersion = execSync('npm version minor --no-git-tag-version', { encoding: 'utf8' }).trim();
      break;
    case '3':
      newVersion = execSync('npm version major --no-git-tag-version', { encoding: 'utf8' }).trim();
      break;
    case '4':
      newVersion = await question('Enter custom version (e.g., 1.2.3): ');
      if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
        console.error('❌ Invalid version format. Use semantic versioning (e.g., 1.2.3)');
        rl.close();
        return;
      }
      break;
    case '5':
      console.log('👋 Release cancelled.');
      rl.close();
      return;
    default:
      console.error('❌ Invalid option.');
      rl.close();
      return;
  }
  
  console.log(`\n🎯 Preparing release v${newVersion}...`);
  
  // Validate release
  if (!validateRelease()) {
    rl.close();
    return;
  }
  
  // Generate changelog
  console.log('📝 Generating changelog...');
  try {
    execSync('npm run changelog:generate', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to generate changelog.');
    rl.close();
    return;
  }
  
  // Read changelog entry
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const start = changelog.indexOf(`## [${newVersion}]`);
  const nextVersion = changelog.indexOf('## [', start + 1);
  const end = nextVersion !== -1 ? nextVersion : changelog.length;
  const changelogEntry = changelog.substring(start, end).trim();
  
  // Create release notes
  console.log('📋 Creating release notes...');
  const releaseNotes = createReleaseNotes(newVersion, changelogEntry);
  const releaseNotesPath = path.join(__dirname, '..', 'RELEASE_NOTES.md');
  fs.writeFileSync(releaseNotesPath, releaseNotes);
  
  // Show preview
  console.log('\n📄 Release Notes Preview:');
  console.log('=' .repeat(50));
  console.log(releaseNotes);
  console.log('=' .repeat(50));
  
  const confirm = await question('\n🤔 Proceed with release? (y/N): ');
  
  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('👋 Release cancelled.');
    rl.close();
    return;
  }
  
  // Commit changes
  console.log('💾 Committing changes...');
  try {
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "chore: prepare release v${newVersion}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to commit changes.');
    rl.close();
    return;
  }
  
  // Create tag
  console.log('🏷️  Creating git tag...');
  try {
    execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to create tag.');
    rl.close();
    return;
  }
  
  // Push changes
  const pushConfirm = await question('\n🚀 Push changes and trigger release? (y/N): ');
  
  if (pushConfirm.toLowerCase() === 'y' || pushConfirm.toLowerCase() === 'yes') {
    console.log('📤 Pushing changes...');
    try {
      execSync('git push origin main --tags', { stdio: 'inherit' });
      console.log('\n🎉 Release pushed successfully!');
      console.log('📋 GitHub Actions will now:');
      console.log('  - Run tests');
      console.log('  - Create GitHub release');
      console.log('  - Deploy to NPM');
      console.log('\n🔗 Monitor progress:');
      console.log(`  - GitHub Actions: https://github.com/Devlander-Software/discord-notify/actions`);
      console.log(`  - Releases: https://github.com/Devlander-Software/discord-notify/releases`);
    } catch (error) {
      console.error('❌ Failed to push changes.');
    }
  } else {
    console.log('\n📋 Manual steps to complete release:');
    console.log(`1. git push origin main --tags`);
    console.log('2. Monitor GitHub Actions');
    console.log('3. Verify NPM deployment');
  }
  
  rl.close();
}

// Main execution
if (require.main === module) {
  interactiveRelease().catch(error => {
    console.error('❌ Release failed:', error.message);
    process.exit(1);
  });
}

module.exports = {
  getCurrentVersion,
  getPackageSize,
  getPreviousVersion,
  getCommitsSinceLastTag,
  generateMigrationGuide,
  createReleaseNotes,
  validateRelease
}; 