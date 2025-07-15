---
layout: page
title: Changelog Guide
description: Guide for managing changelog and automated release process
---

# Discord Notify Changelog Management Guide

This guide explains how to maintain the changelog for the Discord Notify package and use the automated changelog generation tools for effective version management and release tracking.

## Overview

The changelog follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for version numbers. This ensures consistent, professional changelog management for the Discord Notify package.

## Quick Start

### Generate Changelog
```bash
# Generate changelog from git commits
npm run changelog:generate

# View changelog
cat CHANGELOG.md
```

### Release with Changelog
```bash
# Patch release (1.0.0 → 1.0.1)
npm run release:patch

# Minor release (1.0.1 → 1.1.0)
npm run release:minor

# Major release (1.1.0 → 2.0.0)
npm run release:major
```

## Commit Message Format

The changelog generator uses [Conventional Commits](https://www.conventionalcommits.org/) to categorize changes:

### Commit Types

| Type | Description | Changelog Category |
|------|-------------|-------------------|
| `feat` | New features | Added |
| `fix` | Bug fixes | Fixed |
| `docs` | Documentation changes | Documentation |
| `style` | Code style changes | Style |
| `refactor` | Code refactoring | Refactored |
| `test` | Test changes | Tests |
| `chore` | Maintenance tasks | Chore |
| `perf` | Performance improvements | Performance |
| `ci` | CI/CD changes | CI/CD |
| `build` | Build system changes | Build |
| `revert` | Reverted changes | Reverted |

### Examples

```bash
# New feature
git commit -m "feat: add file attachment support"

# Bug fix
git commit -m "fix: handle empty webhook URL gracefully"

# Documentation
git commit -m "docs: update installation guide"

# Breaking change
git commit -m "feat!: change webhook URL parameter to config object"

# With scope
git commit -m "feat(webhook): add thread support"
git commit -m "fix(types): correct SendArgs interface"
```

## Manual Changelog Management

### Adding Entries Manually

1. **Edit CHANGELOG.md**
2. **Add entries under [Unreleased] section:**

```markdown
## [Unreleased]

### Added
- New feature description

### Changed
- Change description

### Fixed
- Bug fix description

### Security
- Security fix description
```

### Moving to Release

When releasing a version:

1. **Replace [Unreleased] with version number:**
   ```markdown
   ## [1.0.0] - 2024-01-15
   
   ### Added
   - New feature description
   ```

2. **Add new [Unreleased] section:**
   ```markdown
   ## [Unreleased]
   
   ## [1.0.0] - 2024-01-15
   ```

## Automated Changelog Generation

### How It Works

The changelog generator:

1. **Reads package.json** for current version
2. **Gets git commits** since last tag
3. **Categorizes commits** by conventional commit type
4. **Generates changelog entry** with categorized changes
5. **Updates CHANGELOG.md** automatically

### Script Usage

```bash
# Generate changelog
node scripts/changelog.js

# Or use npm script
npm run changelog:generate
```

### Customization

Edit `scripts/changelog.js` to customize:

- **Categories**: Add new commit types
- **Format**: Change output format
- **Filtering**: Exclude certain commits
- **Grouping**: Custom grouping logic

## Changelog Structure

### File Organization

```markdown
# Changelog

## [Unreleased]
### Added
- New features

## [1.0.0] - 2024-01-15
### Added
- Feature 1
- Feature 2

### Fixed
- Bug fix 1

## [0.1.0] - 2024-01-01
### Added
- Initial release
```

### Entry Format

Each version entry includes:

- **Version number** with date
- **Categorized changes** (Added, Changed, Fixed, etc.)
- **Descriptive messages** with commit hashes
- **Breaking changes** clearly marked

## Release Process

### Automated Release

1. **Make changes** with conventional commits
2. **Bump version:**
   ```bash
   npm run release:patch  # or minor/major
   ```
3. **Push to main:**
   ```bash
   git push origin main --tags
   ```
4. **GitHub Actions:**
   - Runs tests
   - Generates changelog
   - Creates GitHub release
   - Deploys to npm

### Manual Release

1. **Update version:**
   ```bash
   npm version patch  # or minor/major
   ```

2. **Generate changelog:**
   ```bash
   npm run changelog:generate
   ```

3. **Commit changes:**
   ```bash
   git add .
   git commit -m "chore: release v1.0.1"
   git tag v1.0.1
   ```

4. **Push and publish:**
   ```bash
   git push origin main --tags
   npm publish
   ```

## Changelog Features

### Automatic Categorization
- **Commit type detection** using conventional commits
- **Smart categorization** into Added, Changed, Fixed, etc.
- **Scope support** for detailed organization
- **Breaking change detection** with clear marking

### Semantic Versioning
- **Patch releases** for bug fixes (1.0.0 → 1.0.1)
- **Minor releases** for new features (1.0.1 → 1.1.0)
- **Major releases** for breaking changes (1.1.0 → 2.0.0)
- **Pre-release support** for alpha/beta versions

### GitHub Integration
- **Automated releases** triggered by version bumps
- **Interactive release manager** for manual control
- **Professional release templates** with comprehensive notes
- **Asset management** with automatic file uploads
- **Full CI/CD integration** with testing and deployment

### Detailed Change Tracking
- **Commit hashes** for traceability
- **Author information** for attribution
- **Date tracking** for timeline management
- **Migration guides** for breaking changes
- **Performance metrics** for optimization tracking

## Best Practices

### Commit Messages
- **Use conventional commits** for automatic categorization
- **Be descriptive** but concise
- **Include scope** when relevant
- **Mark breaking changes** with `!`
- **Use present tense** ("add" not "added")

### Changelog Entries
- **Write for users** not developers
- **Include context** for changes
- **Link to issues** when relevant
- **Group related changes** together
- **Use consistent formatting**

### Release Management
- **Test before releasing** to ensure quality
- **Update documentation** with new features
- **Communicate breaking changes** clearly
- **Monitor release feedback** for improvements
- **Maintain release cadence** for consistency

## Troubleshooting

### Common Issues

**Changelog not generating:**
- Check commit message format
- Verify git tags exist
- Ensure package.json version is correct

**Wrong categorization:**
- Review commit type usage
- Check conventional commit format
- Verify scope usage

**Missing entries:**
- Check commit history since last tag
- Verify conventional commit format
- Ensure commits are on main branch

### Debug Commands

```bash
# Check commit history
git log --oneline --since="1 month ago"

# Verify tags
git tag -l

# Test changelog generation
npm run changelog:generate -- --dry-run

# Check package version
npm version
```

## Integration with Other Tools

### GitHub Actions
- **Automated testing** before release
- **Changelog generation** on version bump
- **GitHub release creation** with assets
- **NPM package publishing** with verification

### CI/CD Pipelines
- **Jenkins integration** for enterprise environments
- **GitLab CI** for GitLab repositories
- **Azure DevOps** for Microsoft environments
- **CircleCI** for cloud-based CI/CD

### Documentation Tools
- **TypeDoc integration** for API documentation
- **GitBook compatibility** for external docs
- **ReadTheDocs** for hosted documentation
- **GitHub Pages** for project websites

## Advanced Features

### Custom Categories
Add custom commit types for specialized categorization:

```javascript
// In scripts/changelog.js
const customTypes = {
  'security': 'Security',
  'performance': 'Performance',
  'accessibility': 'Accessibility'
};
```

### Filtering Options
Exclude certain commits from changelog:

```javascript
const excludePatterns = [
  /^chore\(deps\):/,  // Dependency updates
  /^docs\(readme\):/, // README changes
  /^ci:/              // CI/CD changes
];
```

### Format Customization
Customize changelog output format:

```javascript
const formatOptions = {
  includeCommitHash: true,
  includeAuthor: false,
  groupByScope: true,
  sortByDate: true
};
```

## Conclusion

Effective changelog management is crucial for maintaining a professional, user-friendly Discord Notify package. By following this guide and using the automated tools provided, you can ensure consistent, informative changelogs that help users understand and track changes across versions.

For more information on changelog best practices, see:
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/) 