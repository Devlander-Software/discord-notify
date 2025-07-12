# GitHub Actions Setup Guide

This guide explains how to set up GitHub Actions for automated testing, building, and deploying the Discord Notify package to npm.

## 📋 Workflows Overview

### 1. **CI Workflow** (`ci.yml`)
- **Triggers**: Push to main/develop, Pull Requests
- **Purpose**: Run tests, build package, security audit
- **Runs on**: Multiple Node.js versions (16.x, 18.x, 20.x)

### 2. **Release Workflow** (`release.yml`)
- **Triggers**: Push to main branch
- **Purpose**: Auto-detect version changes, create GitHub releases
- **Runs on**: Node.js 20.x

### 3. **Deploy Workflow** (`deploy.yml`)
- **Triggers**: GitHub releases, manual dispatch
- **Purpose**: Publish package to npm
- **Runs on**: Node.js 20.x

## 🔧 Setup Instructions

### Step 1: Create NPM Token

1. **Login to npm:**
   ```bash
   npm login
   ```

2. **Create Access Token:**
   - Go to [npmjs.com](https://www.npmjs.com)
   - Click your profile → Access Tokens
   - Click "Generate New Token"
   - Select "Automation" token type
   - Copy the token (you won't see it again!)

### Step 2: Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `NPM_TOKEN` | `npm_xxxxxxxxxxxx` | Your npm automation token |
| `DISCORD_WEBHOOK_URL` | `https://discord.com/api/webhooks/...` | Discord webhook for notifications (optional) |

### Step 3: Configure Package.json

Make sure your `package.json` has the correct configuration:

```json
{
  "name": "discord-notify",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public"
  },
  "files": ["dist"],
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

### Step 4: Test the Setup

1. **Push to main branch:**
   ```bash
   git add .
   git commit -m "feat: initial release"
   git push origin main
   ```

2. **Check GitHub Actions:**
   - Go to Actions tab in your repository
   - You should see the CI workflow running

## 🚀 Deployment Process

### Automatic Deployment

1. **Update version in package.json:**
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.1 → 1.1.0
   npm version major  # 1.1.0 → 2.0.0
   ```

2. **Push to main:**
   ```bash
   git push origin main --tags
   ```

3. **What happens automatically:**
   - CI workflow runs tests
   - Release workflow detects version change
   - Creates GitHub release
   - Triggers deploy workflow
   - Publishes to npm

### Manual Deployment

1. **Go to Actions tab**
2. **Select "Deploy to NPM" workflow**
3. **Click "Run workflow"**
4. **Enter version number**
5. **Click "Run workflow"**

## 📊 Workflow Details

### CI Workflow Jobs

#### Test Job
- Runs on Node.js 16.x, 18.x, 20.x
- Installs dependencies
- Runs linting (`npm run lint`)
- Runs all tests (`npm run test:all`)
- Builds package (`npm run build`)
- Validates build output

#### Integration Test Job
- Runs only on main branch pushes
- Uses Discord webhook from secrets
- Runs integration tests
- Continues on error (optional)

#### Security Job
- Runs npm audit
- Checks for high severity vulnerabilities
- Fails if high severity issues found

### Release Workflow Jobs

#### Release Job
- Detects version changes in package.json
- Creates GitHub release with changelog
- Triggers deploy workflow
- Skips if version already exists

### Deploy Workflow Jobs

#### Deploy Job
- Runs tests and builds package
- Validates package with `npm pack --dry-run`
- Publishes to npm using NPM_TOKEN
- Creates GitHub release (if manual trigger)

## 🔍 Troubleshooting

### Common Issues

#### 1. **NPM Token Issues**
```
Error: npm ERR! 401 Unauthorized
```
**Solution:**
- Verify NPM_TOKEN secret is set correctly
- Ensure token has publish permissions
- Check if package name is available on npm

#### 2. **Build Failures**
```
Error: TypeScript compilation failed
```
**Solution:**
- Run `npm run build` locally to check for errors
- Fix TypeScript errors
- Ensure all dependencies are installed

#### 3. **Test Failures**
```
Error: Tests are failing
```
**Solution:**
- Run `npm test` locally
- Fix failing tests
- Check if all test dependencies are installed

#### 4. **Version Conflicts**
```
Error: Version already exists
```
**Solution:**
- Update version in package.json
- Use `npm version` to bump version
- Push with tags: `git push --tags`

### Debug Commands

```bash
# Test locally
npm run test:all
npm run build
npm pack --dry-run

# Check npm token
npm whoami

# Test publish (dry run)
npm publish --dry-run
```

## 📈 Monitoring

### GitHub Actions Dashboard
- Go to Actions tab to monitor workflow runs
- Check logs for detailed error information
- Set up notifications for workflow failures

### NPM Package Page
- Monitor downloads: https://www.npmjs.com/package/discord-notify
- Check for issues or feedback
- Monitor package health

### Discord Notifications
If you set up DISCORD_WEBHOOK_URL, you'll get notifications for:
- Successful deployments
- Failed workflows
- New releases

## 🔄 Workflow Customization

### Add More Tests
```yaml
- name: Run additional tests
  run: npm run test:custom
```

### Add Code Coverage
```yaml
- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
```

### Add Slack Notifications
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🎯 Best Practices

1. **Always test locally** before pushing
2. **Use semantic versioning** (patch/minor/major)
3. **Write meaningful commit messages**
4. **Monitor workflow runs** regularly
5. **Keep dependencies updated**
6. **Use descriptive release notes**

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Test locally with the debug commands
4. Open an issue in the repository
5. Join our [Discord community](https://bit.ly/devlander-discord-invite) for help 