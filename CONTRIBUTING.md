# Contributing to Discord Notify

Thank you for your interest in contributing to Discord Notify! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Questions or Problems?](#questions-or-problems)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** or **yarn** or **pnpm**
- **Git**

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/discord-notify.git
   cd discord-notify
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/Devlander-Software/discord-notify.git
   ```

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Package

```bash
npm run build
```

### 3. Run Tests

```bash
# Run all tests
npm run test:full

# Run unit tests only
npm run test:unit

# Run integration tests (requires Discord webhook URL)
export DISCORD_WEBHOOK_URL="your_webhook_url"
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### 4. Check Code Quality

```bash
# Run linting
npm run lint

# Check TypeScript
npm run type-check
```

## Coding Standards

### TypeScript

- Use **strict TypeScript** configuration
- Provide **full type definitions** for all interfaces
- Use **proper error handling** with typed responses
- Maintain **zero dependencies** policy

### Code Style

- Follow **conventional commits** format (see below)
- Use **descriptive variable names**
- Add **JSDoc comments** for public APIs
- Keep **functions small and focused**
- Use **async/await** for asynchronous operations

### File Structure

```
src/
├── index.ts          # Main entry point
├── types/            # TypeScript interfaces
├── utils/            # Utility functions
└── constants/        # Constants and defaults

tests/
├── unit/             # Unit tests
├── integration/      # Integration tests
└── e2e/              # End-to-end tests

docs/
├── api/              # API documentation
├── examples/         # Usage examples
└── guides/           # How-to guides
```

## Testing

### Writing Tests

- **Unit tests** for individual functions
- **Integration tests** for Discord API interactions
- **E2E tests** for complete workflows
- **Test coverage** should be > 90%

### Test Structure

```typescript
describe('DiscordNotifyFactory', () => {
  describe('when creating a notifier', () => {
    it('should create a valid notifier instance', () => {
      // Test implementation
    });

    it('should throw error for invalid webhook URL', () => {
      // Test implementation
    });
  });
});
```

### Running Tests

```bash
# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/discord-notify.test.ts
```

## Documentation

### API Documentation

- Update **TypeDoc comments** for any API changes
- Add **usage examples** for new features
- Update **README.md** for significant changes
- Generate **API documentation**:
  ```bash
  npm run docs:generate
  ```

### Code Comments

```typescript
/**
 * Creates a Discord notifier instance with the specified configuration.
 * 
 * @param config - Configuration options for the notifier
 * @returns A DiscordNotifier instance with configured methods
 * 
 * @example
 * ```typescript
 * const notifier = DiscordNotifyFactory({
 *   webhookUrl: 'https://discord.com/api/webhooks/...',
 *   appName: 'My App'
 * });
 * ```
 */
export function DiscordNotifyFactory(config: DiscordNotifyConfig): DiscordNotifier {
  // Implementation
}
```

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write **clean, well-documented code**
- Add **comprehensive tests**
- Update **documentation** as needed
- Follow **conventional commits** format

### 3. Commit Your Changes

Use conventional commit format:

```bash
# Format: <type>(<scope>): <description>
git commit -m "feat: add file attachment support"
git commit -m "fix(webhook): handle rate limiting gracefully"
git commit -m "docs: update installation guide"
```

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:

- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Screenshots** for UI changes (if applicable)
- **Test results** showing all tests pass

### 5. PR Review Process

- **Automated checks** must pass (tests, linting, build)
- **Code review** from maintainers
- **Address feedback** and make requested changes
- **Squash commits** if requested

## Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic changelog generation.

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New features | `feat: add thread support` |
| `fix` | Bug fixes | `fix: handle empty webhook URL` |
| `docs` | Documentation | `docs: update API examples` |
| `style` | Code style | `style: format code with prettier` |
| `refactor` | Code refactoring | `refactor: simplify webhook logic` |
| `test` | Test changes | `test: add integration tests` |
| `chore` | Maintenance | `chore: update dependencies` |
| `perf` | Performance | `perf: optimize file upload` |
| `ci` | CI/CD | `ci: add GitHub Actions workflow` |
| `build` | Build system | `build: update TypeScript config` |

### Commit Scopes

Use scopes to specify what part of the codebase is affected:

```bash
feat(webhook): add rate limiting support
fix(types): correct SendArgs interface
docs(api): add file attachment examples
test(integration): add Discord API tests
```

### Breaking Changes

Use `!` to indicate breaking changes:

```bash
feat!: change webhook URL parameter to config object
fix!: remove deprecated sendText method
```

## Release Process

### Automated Releases

Releases are automated when you:

1. **Bump version** in package.json
2. **Push to production** branch
3. **GitHub Actions** handles the rest

```bash
# Patch release (1.0.0 → 1.0.1)
npm run release:patch

# Minor release (1.0.1 → 1.1.0)
npm run release:minor

# Major release (1.1.0 → 2.0.0)
npm run release:major
```

### Manual Releases

For more control, use the interactive release manager:

```bash
npm run release:interactive
```

### What Happens Automatically

1. **Tests run** to ensure everything works
2. **Changelog generated** from conventional commits
3. **GitHub release created** with release notes
4. **NPM package published** with new version
5. **Documentation updated** and deployed

## Questions or Problems?

### Getting Help

- **GitHub Issues** - Report bugs or request features
- **GitHub Discussions** - Ask questions and get help
- **Discord Community** - Join our Discord server
- **Documentation** - Check the docs first

### Community Links

- [Discord Server](https://bit.ly/devlander-discord-invite)
- [GitHub Discussions](https://github.com/orgs/Devlander-Software/discussions)
- [GitHub Issues](https://github.com/Devlander-Software/discord-notify/issues)
- [Documentation](https://devlander-software.github.io/discord-notify/)

### Before Submitting

- **Search existing issues** to avoid duplicates
- **Check documentation** for existing solutions
- **Provide minimal reproduction** for bugs
- **Include environment details** (Node.js version, OS, etc.)

## Thank You!

Thank you for contributing to Discord Notify! Your contributions help make this package better for everyone in the Discord development community.

---

**Remember**: This is a zero-dependency package, so all contributions must maintain this requirement and work with native Node.js APIs only. 