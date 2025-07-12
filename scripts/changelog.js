#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

// Get current version from package.json
function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

// Get git commits since last tag
function getCommitsSinceLastTag() {
  try {
    const commits = execSync('git log --oneline --no-merges $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD', { encoding: 'utf8' });
    return commits.trim().split('\n').filter(line => line.length > 0);
  } catch (error) {
    console.log('No previous tags found, getting all commits...');
    const commits = execSync('git log --oneline --no-merges', { encoding: 'utf8' });
    return commits.trim().split('\n').filter(line => line.length > 0);
  }
}

// Categorize commits
function categorizeCommits(commits) {
  const categories = {
    'feat': 'Added',
    'fix': 'Fixed',
    'docs': 'Documentation',
    'style': 'Style',
    'refactor': 'Refactored',
    'test': 'Tests',
    'chore': 'Chore',
    'perf': 'Performance',
    'ci': 'CI/CD',
    'build': 'Build',
    'revert': 'Reverted'
  };

  const categorized = {
    'Added': [],
    'Changed': [],
    'Deprecated': [],
    'Removed': [],
    'Fixed': [],
    'Security': [],
    'Documentation': [],
    'Tests': [],
    'CI/CD': [],
    'Build': [],
    'Chore': [],
    'Performance': [],
    'Style': [],
    'Refactored': [],
    'Reverted': []
  };

  commits.forEach(commit => {
    const [hash, ...messageParts] = commit.split(' ');
    const message = messageParts.join(' ');
    
    // Extract conventional commit type
    const match = message.match(/^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?:\s*(.+)/i);
    
    if (match) {
      const [, type, scope, description] = match;
      const category = categories[type] || 'Chore';
      
      if (categorized[category]) {
        categorized[category].push({
          hash: hash.substring(0, 7),
          description: description.trim()
        });
      }
    } else {
      // Uncategorized commits go to Changed
      categorized['Changed'].push({
        hash: hash.substring(0, 7),
        description: message.trim()
      });
    }
  });

  return categorized;
}

// Generate changelog entry
function generateChangelogEntry(version, categorizedCommits) {
  const date = new Date().toISOString().split('T')[0];
  
  let entry = `## [${version}] - ${date}\n\n`;
  
  // Add categorized changes
  Object.entries(categorizedCommits).forEach(([category, commits]) => {
    if (commits.length > 0) {
      entry += `### ${category}\n`;
      commits.forEach(commit => {
        entry += `- ${commit.description} (${commit.hash})\n`;
      });
      entry += '\n';
    }
  });
  
  return entry;
}

// Update changelog file
function updateChangelog(newEntry) {
  let changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  
  // Find the [Unreleased] section
  const unreleasedIndex = changelog.indexOf('## [Unreleased]');
  if (unreleasedIndex === -1) {
    console.error('Could not find [Unreleased] section in CHANGELOG.md');
    return false;
  }
  
  // Find the end of the [Unreleased] section
  const nextSectionIndex = changelog.indexOf('## [', unreleasedIndex + 1);
  const endOfUnreleased = nextSectionIndex !== -1 ? nextSectionIndex : changelog.length;
  
  // Replace [Unreleased] with the new version entry
  const beforeUnreleased = changelog.substring(0, unreleasedIndex);
  const afterUnreleased = changelog.substring(endOfUnreleased);
  
  const updatedChangelog = beforeUnreleased + newEntry + afterUnreleased;
  
  fs.writeFileSync(CHANGELOG_PATH, updatedChangelog);
  return true;
}

// Main function
function main() {
  try {
    console.log('🔄 Generating changelog...');
    
    const version = getCurrentVersion();
    console.log(`📦 Current version: ${version}`);
    
    const commits = getCommitsSinceLastTag();
    console.log(`📝 Found ${commits.length} commits since last tag`);
    
    if (commits.length === 0) {
      console.log('✅ No new commits found, changelog is up to date');
      return;
    }
    
    const categorizedCommits = categorizeCommits(commits);
    const newEntry = generateChangelogEntry(version, categorizedCommits);
    
    if (updateChangelog(newEntry)) {
      console.log('✅ Changelog updated successfully');
      console.log('\n📋 Generated entry:');
      console.log(newEntry);
    } else {
      console.error('❌ Failed to update changelog');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error generating changelog:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  getCurrentVersion,
  getCommitsSinceLastTag,
  categorizeCommits,
  generateChangelogEntry,
  updateChangelog
}; 