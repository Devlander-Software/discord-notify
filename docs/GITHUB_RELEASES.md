---
layout: page
title: GitHub Releases Guide
description: Guide for managing GitHub releases and automated deployment
---

# Discord Notify GitHub Releases Management Guide

This guide covers the comprehensive GitHub release system for Discord Notify, including automated releases, manual releases, and release management for professional package distribution.

## Overview

The Discord Notify package uses a sophisticated release system that includes:

- **Automated Releases** - Triggered by version bumps
- **Manual Releases** - Interactive release management
- **Release Templates** - Professional release notes
- **Asset Management** - Automatic file uploads
- **Changelog Integration** - Automatic changelog generation

## Release Types

### Automated Releases
Triggered automatically when you bump the version and push to main:

```bash
# These commands trigger automated releases
npm run release:patch  # 1.0.0 → 1.0.1
npm run release:minor  # 1.0.1 → 1.1.0
npm run release:major  # 1.1.0 → 2.0.0
```

### Interactive Releases
Use the interactive release manager for more control:

```bash
npm run release:interactive
```

### Manual Releases
Create releases manually through GitHub's web interface using the release template.

## Automated Release Process

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

## Interactive Release Manager

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

Discord Notify Release Manager
===============================

Current version: 1.0.0
Commits since last tag: 3

Recent commits:
  - feat: add file attachment support
  - fix: handle empty webhook URL gracefully
  - docs: update installation guide

Release Options:
1. Patch release (1.0.0 → 1.0.1)
2. Minor release (1.0.1 → 1.1.0)
3. Major release (1.1.0 → 2.0.0)
4. Custom version
5. Exit

Select option (1-5): 2

Preparing release v1.1.0...

Validating release...
Running tests...
Release validation passed!

Generating changelog...
Creating release notes...

Release Notes Preview:
==================================================
# Discord Notify v1.1.0

## What's New

## [1.1.0] - 2024-01-15

### Added
- File attachment support (abc1234)
- Enhanced error handling (def5678)

### Fixed
- Empty webhook URL handling (ghi9012)

## Installation

```bash
npm install discord-notify@1.1.0
```
...
==================================================

Proceed with release? (y/N): y

Committing changes...
Creating git tag...
Push changes and trigger release? (y/N): y

Pushing changes...
Release pushed successfully!

GitHub Actions will now:
  - Run tests
  - Create GitHub release
  - Deploy to NPM

Monitor progress:
  - GitHub Actions: https://github.com/yourusername/discord-notify/actions
  - Releases: https://github.com/yourusername/discord-notify/releases
```

## Release Templates

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

```markdown
# Discord Notify v{{version}}

## What's New

{{changelog}}

## Installation

```bash
npm install discord-notify@{{version}}
```

## Quick Start

```typescript
import DiscordNotifyFactory from 'discord-notify';

const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_WEBHOOK_URL'
});

await notifier.success('Hello from Discord Notify!');
```

## Key Features

- Discord API compliant webhook notifications
- Rich embed support with fields and formatting
- File attachment capabilities
- Thread support for organized conversations
- TypeScript support with full type definitions
- Zero dependencies for lightweight performance

## Documentation

- [API Documentation]({{docs_url}})
- [Installation Guide]({{readme_url}})
- [Changelog]({{changelog_url}})

## Community

- [Discord Community]({{discord_url}})
- [GitHub Discussions]({{discussions_url}})
- [Report Issues]({{issues_url}})

## Migration Guide

{{migration_guide}}

## Testing Status

- Unit Tests: {{unit_tests_status}}
- Integration Tests: {{integration_tests_status}}
- E2E Tests: {{e2e_tests_status}}

## Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog generated
- [ ] Version bumped
- [ ] Release notes reviewed
- [ ] Assets uploaded
- [ ] NPM package published
```

## Asset Management

### Automatic Assets

The release system automatically uploads:

- **Compiled JavaScript** - `dist/index.js`
- **TypeScript Definitions** - `dist/index.d.ts`
- **Source Maps** - `dist/index.js.map`
- **Package Files** - `package.json`, `README.md`, `LICENSE`
- **Documentation** - API documentation and guides

### Custom Assets

Add custom assets to releases:

```bash
# Add custom files to release
npm run release:assets -- --files "custom-asset.zip,logo.png"

# Include build artifacts
npm run release:assets -- --include-build
```

## Release Validation

### Pre-Release Checks

Before creating a release, the system validates:

- **Tests Passing** - All unit, integration, and E2E tests
- **Build Success** - TypeScript compilation
- **Linting** - Code quality checks
- **Version Consistency** - Package.json and git tags match
- **Changelog** - Valid changelog entry exists

### Post-Release Verification

After release creation:

- **Asset Upload** - Verify all assets uploaded
- **NPM Publication** - Confirm package published
- **Documentation** - Update documentation links
- **Community** - Announce in Discord and social media

## Release Management

### Version Strategy

- **Patch Releases** (1.0.0 → 1.0.1) - Bug fixes and minor improvements
- **Minor Releases** (1.0.1 → 1.1.0) - New features, backward compatible
- **Major Releases** (1.1.0 → 2.0.0) - Breaking changes, major features

### Release Cadence

- **Regular Releases** - Monthly minor releases
- **Hotfixes** - Patch releases as needed
- **Major Releases** - Quarterly or as needed for breaking changes

### Release Communication

- **GitHub Release** - Detailed release notes
- **NPM Registry** - Package description and keywords
- **Discord Community** - Announcement and discussion
- **Social Media** - Twitter and other platforms
- **Documentation** - Update guides and examples

## Troubleshooting

### Common Issues

**Release not triggered:**
- Check GitHub Actions workflow
- Verify version bump in package.json
- Ensure push to main branch
- Check workflow permissions

**Assets not uploaded:**
- Verify file paths in workflow
- Check file permissions
- Ensure files exist after build
- Review upload step configuration

**NPM publication failed:**
- Check NPM authentication
- Verify package name availability
- Review package.json configuration
- Check for duplicate versions

### Debug Commands

```bash
# Check current version
npm version

# Verify git tags
git tag -l

# Test release workflow
npm run release:test

# Check GitHub Actions status
gh run list --workflow=release.yml

# Verify NPM package
npm view discord-notify
```

## Advanced Features

### Custom Release Workflows

Create custom release workflows for specific needs:

```yaml
# .github/workflows/custom-release.yml
name: Custom Release
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Release version'
        required: true
        type: string

jobs:
  custom-release:
    runs-on: ubuntu-latest
    steps:
    - name: Custom Release Process
      run: |
        echo "Custom release for version ${{ github.event.inputs.version }}"
        # Custom release logic
```

### Release Notifications

Configure notifications for release events:

```yaml
# In release workflow
- name: Notify Discord
  run: |
    curl -X POST ${{ secrets.DISCORD_WEBHOOK_URL }} \
      -H "Content-Type: application/json" \
      -d '{"content":"New Discord Notify release: v${{ env.VERSION }}"}'
```

### Release Analytics

Track release metrics and analytics:

```yaml
- name: Release Analytics
  run: |
    # Track download statistics
    # Monitor adoption rates
    # Analyze user feedback
```

## Integration with Other Tools

### CI/CD Platforms

- **GitHub Actions** - Primary release automation
- **Jenkins** - Enterprise CI/CD integration
- **GitLab CI** - GitLab repository support
- **Azure DevOps** - Microsoft ecosystem integration
- **CircleCI** - Cloud-based CI/CD

### Package Managers

- **NPM** - Primary package registry
- **Yarn** - Alternative package manager support
- **PNPM** - Fast package manager integration
- **GitHub Packages** - GitHub package registry

### Documentation Platforms

- **GitHub Pages** - Project website hosting
- **ReadTheDocs** - Documentation hosting
- **GitBook** - External documentation
- **TypeDoc** - API documentation generation

## Best Practices

### Release Planning

- **Feature Freeze** - Stop new features before release
- **Testing Phase** - Comprehensive testing period
- **Documentation Review** - Update all documentation
- **Community Feedback** - Gather user feedback
- **Release Notes** - Write clear, comprehensive notes

### Quality Assurance

- **Automated Testing** - Comprehensive test suite
- **Manual Testing** - User acceptance testing
- **Performance Testing** - Load and stress testing
- **Security Review** - Security vulnerability assessment
- **Compatibility Testing** - Node.js version compatibility

### Communication

- **Release Announcements** - Clear, informative announcements
- **Migration Guides** - Help users upgrade smoothly
- **Breaking Changes** - Clear documentation of changes
- **Support Channels** - Provide help during transition
- **Feedback Collection** - Gather user feedback

## Conclusion

Effective GitHub release management is crucial for maintaining a professional, reliable Discord Notify package. By following this guide and using the automated tools provided, you can ensure consistent, high-quality releases that provide value to users and maintain the package's reputation.

For more information on release management best practices, see:
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/) 