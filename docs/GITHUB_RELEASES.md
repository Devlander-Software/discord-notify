# GitHub Releases Guide

This guide covers the comprehensive GitHub release system for Discord Notify, including automated releases, manual releases, and release management.

## 🚀 Overview

The Discord Notify package uses a sophisticated release system that includes:

- **Automated Releases** - Triggered by version bumps
- **Manual Releases** - Interactive release management
- **Release Templates** - Professional release notes
- **Asset Management** - Automatic file uploads
- **Changelog Integration** - Automatic changelog generation

## 📋 Release Types

### 1. Automated Releases
Triggered automatically when you bump the version and push to main:

```bash
# These commands trigger automated releases
npm run release:patch  # 1.0.0 → 1.0.1
npm run release:minor  # 1.0.1 → 1.1.0
npm run release:major  # 1.1.0 → 2.0.0
```

### 2. Interactive Releases
Use the interactive release manager for more control:

```bash
npm run release:interactive
```

### 3. Manual Releases
Create releases manually through GitHub's web interface using the release template.

## 🔄 Automated Release Process

### What Happens Automatically

1. **Version Detection** - GitHub Actions detects version changes
2. **Testing** - Runs full test suite
3. **Building** - Compiles TypeScript to JavaScript
4. **Changelog Generation** - Creates changelog from git commits
5. **Release Creation** - Creates GitHub release with notes
6. **Asset Upload** - Uploads compiled files as release assets
7. **NPM Deployment** - Triggers NPM package publication

### GitHub Actions Workflow

The `.github/workflows/release.yml` workflow:

```yaml
name: Release
on:
  push:
    branches: [ main ]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
    - name: Use Node.js
    - name: Install dependencies
    - name: Run tests
    - name: Build package
    - name: Check for version bump
    - name: Generate changelog
    - name: Generate release assets
    - name: Create Release
    - name: Upload Release Assets
    - name: Upload TypeScript Definitions
    - name: Trigger NPM Deploy
```

## 🎯 Interactive Release Manager

### Features

The interactive release manager (`scripts/release.js`) provides:

- **Version Selection** - Choose patch, minor, major, or custom version
- **Validation** - Ensures tests pass and build is ready
- **Preview** - Shows release notes before publishing
- **Confirmation** - Multiple confirmation steps
- **Integration** - Works with existing workflows

### Usage

```bash
npm run release:interactive
```

### Interactive Flow

1. **Current Status** - Shows current version and recent commits
2. **Release Options** - Choose release type
3. **Validation** - Runs tests and checks
4. **Changelog Generation** - Creates changelog entry
5. **Release Notes** - Generates professional release notes
6. **Preview** - Shows final release notes
7. **Confirmation** - Confirm before proceeding
8. **Git Operations** - Commit, tag, and push
9. **Deployment** - Trigger automated deployment

### Example Session

```bash
$ npm run release:interactive

🚀 Discord Notify Release Manager
================================

📦 Current version: 1.0.0
📝 Commits since last tag: 3

📋 Recent commits:
  - feat: add file attachment support
  - fix: handle empty webhook URL gracefully
  - docs: update installation guide

🎯 Release Options:
1. Patch release (1.0.0 → 1.0.1)
2. Minor release (1.0.1 → 1.1.0)
3. Major release (1.1.0 → 2.0.0)
4. Custom version
5. Exit

Select option (1-5): 2

🎯 Preparing release v1.1.0...

🔍 Validating release...
🧪 Running tests...
✅ Release validation passed!

📝 Generating changelog...
📋 Creating release notes...

📄 Release Notes Preview:
==================================================
# Discord Notify v1.1.0

## 🚀 What's New

## [1.1.0] - 2024-01-15

### Added
- File attachment support (abc1234)
- Enhanced error handling (def5678)

### Fixed
- Empty webhook URL handling (ghi9012)

## 📦 Installation

```bash
npm install discord-notify@1.1.0
```
...
==================================================

🤔 Proceed with release? (y/N): y

💾 Committing changes...
🏷️  Creating git tag...
🚀 Push changes and trigger release? (y/N): y

📤 Pushing changes...
🎉 Release pushed successfully!

📋 GitHub Actions will now:
  - Run tests
  - Create GitHub release
  - Deploy to NPM

🔗 Monitor progress:
  - GitHub Actions: https://github.com/yourusername/discord-notify/actions
  - Releases: https://github.com/yourusername/discord-notify/releases
```

## 📄 Release Templates

### Template Structure

The `.github/release-template.md` template includes:

- **Version Information** - Current version and package stats
- **Changelog Entry** - Generated from git commits
- **Installation Instructions** - NPM install command
- **Quick Start** - Code example
- **Key Features** - Feature highlights
- **Links** - Documentation and community links
- **Migration Guide** - Breaking changes information
- **Testing Status** - Test results
- **Release Checklist** - Manual verification steps

### Template Variables

The template uses variables that are automatically replaced:

- `{{version}}` - Current version
- `{{changelog_entry}}` - Generated changelog
- `{{repo}}` - Repository name
- `{{package_size}}` - Compiled package size
- `{{migration_guide}}` - Migration instructions
- `{{previous_version}}` - Previous version

## 📦 Release Assets

### Automatic Assets

Each release automatically includes:

1. **JavaScript Bundle** - `discord-notify-{version}.js`
2. **TypeScript Definitions** - `discord-notify-{version}.d.ts`
3. **Release Notes** - Professional markdown notes
4. **Changelog Entry** - Detailed change log

### Asset Management

Assets are uploaded using GitHub's release asset API:

```yaml
- name: Upload Release Assets
  uses: actions/upload-release-asset@v1
  with:
    upload_url: ${{ steps.create_release.outputs.upload_url }}
    asset_path: ./dist/index.js
    asset_name: discord-notify-${{ version }}.js
    asset_content_type: application/javascript
```

## 🔧 Release Management Scripts

### Available Scripts

```bash
# Interactive release manager
npm run release:interactive

# Validate release readiness
npm run release:validate

# Preview release notes
npm run release:preview

# Quick releases
npm run release:patch
npm run release:minor
npm run release:major

# Changelog generation
npm run changelog:generate
```

### Script Functions

The `scripts/release.js` module exports:

- `getCurrentVersion()` - Get package.json version
- `getPackageSize()` - Calculate compiled package size
- `getPreviousVersion()` - Get last git tag version
- `getCommitsSinceLastTag()` - Get recent commits
- `generateMigrationGuide()` - Create migration instructions
- `createReleaseNotes()` - Generate release notes
- `validateRelease()` - Validate release readiness

## 🎯 Best Practices

### Before Releasing

1. **Test Thoroughly** - Ensure all tests pass
2. **Update Documentation** - Keep docs current
3. **Check Dependencies** - Verify no security issues
4. **Review Changes** - Ensure changelog is accurate
5. **Validate Build** - Test compiled output

### Release Process

1. **Choose Version** - Use semantic versioning
2. **Generate Changelog** - Document all changes
3. **Create Release Notes** - Professional presentation
4. **Test Release** - Validate release assets
5. **Deploy** - Push to trigger automation
6. **Monitor** - Watch deployment progress
7. **Verify** - Check NPM and GitHub

### Post-Release

1. **Announce** - Share with community
2. **Monitor** - Watch for issues
3. **Document** - Update any missing docs
4. **Plan Next** - Start next development cycle

## 🔍 Troubleshooting

### Common Issues

#### 1. **Release Not Triggered**
```bash
# Check if version changed
git diff HEAD~1 package.json | grep version

# Check if tag exists
git tag -l | grep v$(node -p "require('./package.json').version")
```

#### 2. **Tests Failing**
```bash
# Run tests locally
npm run test:all

# Check for linting issues
npm run lint
```

#### 3. **Changelog Not Generated**
```bash
# Check commit format
git log --oneline -5

# Generate manually
npm run changelog:generate
```

#### 4. **Assets Not Uploaded**
- Check GitHub Actions logs
- Verify file paths in workflow
- Ensure sufficient permissions

### Debug Commands

```bash
# Check release readiness
npm run release:validate

# Preview release notes
npm run release:preview

# Check git status
git status
git log --oneline -5

# Verify build
npm run build
ls -la dist/
```

## 📚 Resources

- [GitHub Releases API](https://docs.github.com/en/rest/releases)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🤝 Support

For release-related issues:

1. Check this guide
2. Review GitHub Actions logs
3. Test release process locally
4. Open an issue in the repository
5. Join our [Discord community](https://bit.ly/devlander-discord-invite) 