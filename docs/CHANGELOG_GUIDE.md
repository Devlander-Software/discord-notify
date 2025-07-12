# Changelog Guide

This guide explains how to maintain the changelog for the Discord Notify package and use the automated changelog generation tools.

## 📋 Overview

The changelog follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for version numbers.

## 🚀 Quick Start

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

## 📝 Commit Message Format

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

## 🔧 Manual Changelog Management

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

## 🤖 Automated Changelog Generation

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

## 📊 Changelog Structure

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

## 🔄 Release Process

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
   npm version patch
   ```
2. **Generate changelog:**
   ```bash
   npm run changelog:generate
   ```
3. **Review and commit:**
   ```bash
   git add CHANGELOG.md
   git commit -m "docs: update changelog for v1.0.1"
   git tag v1.0.1
   git push --tags
   ```

## 🎯 Best Practices

### Commit Messages

- **Use conventional commit format**
- **Be descriptive** but concise
- **Include scope** when relevant
- **Use imperative mood** ("add" not "added")

### Changelog Entries

- **Group related changes** together
- **Use consistent formatting**
- **Include breaking changes** prominently
- **Add migration guides** for major versions

### Version Management

- **Use semantic versioning**
- **Bump version before releasing**
- **Tag releases** in git
- **Update changelog** with each release

## 🔍 Troubleshooting

### Common Issues

#### 1. **No commits found**
```bash
# Check if you have commits
git log --oneline

# Check if you have tags
git tag -l
```

#### 2. **Changelog not updating**
```bash
# Check if [Unreleased] section exists
grep -n "Unreleased" CHANGELOG.md

# Regenerate manually
npm run changelog:generate
```

#### 3. **Wrong categorization**
- Check commit message format
- Use conventional commit types
- Review categorization logic in script

### Debug Commands

```bash
# Check current version
node -p "require('./package.json').version"

# List commits since last tag
git log --oneline $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD

# Test changelog generation
node scripts/changelog.js
```

## 📚 Resources

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

## 🤝 Contributing

When contributing to the changelog:

1. **Follow conventional commit format**
2. **Update [Unreleased] section** for new changes
3. **Test changelog generation** locally
4. **Review generated entries** before committing

## 📞 Support

For changelog-related issues:

1. Check this guide
2. Review the changelog script
3. Test with debug commands
4. Open an issue in the repository
5. Join our [Discord community](https://bit.ly/devlander-discord-invite) 