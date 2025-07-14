# Discord Notify - Testing Guide

This document explains how to run tests for the Discord Notify package.

## Test Types

### 1. Basic Functionality Tests (`npm test`)
Quick tests that verify the package structure and basic functionality without making actual Discord API calls.

```bash
npm test
```

**What it tests:**
- Factory creation
- Configuration options
- Interface structure
- Extend functionality
- Error handling

### 2. Unit Tests (`npm run test:unit`)
Comprehensive unit tests that verify all methods and edge cases.

```bash
npm run test:unit
```

**What it tests:**
- All public methods
- Type safety
- Configuration validation
- Error scenarios

### 3. Integration Tests (`npm run test:integration`)
Real Discord webhook tests that require a valid webhook URL.

```bash
# Set your Discord webhook URL
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"

# Run integration tests
npm run test:integration
```

**What it tests:**
- Actual Discord webhook calls
- Rich embed functionality
- File attachments
- Thread support
- Custom username/avatar
- Error handling with real API

### 4. E2E Installation Tests (`npm run test:e2e`)
Comprehensive end-to-end tests that create temporary projects, install the package from NPM, and test real functionality.

```bash
npm run test:e2e
```

**What it tests:**
- Package installation from NPM registry
- CommonJS project compatibility
- TypeScript project compatibility
- ES Modules compatibility
- Yarn package manager support
- Node.js version compatibility
- Production environment testing
- Package.json dependencies validation

### 5. All Tests (`npm run test:all`)
Runs both basic and unit tests.

```bash
npm run test:all
```

### 6. Full Test Suite (`npm run test:full`)
Runs all tests including E2E installation tests.

```bash
npm run test:full
```

## Setting Up Integration Tests

### 1. Create a Discord Webhook

1. Go to your Discord server settings
2. Navigate to Integrations > Webhooks
3. Click "New Webhook"
4. Choose a test channel
5. Copy the webhook URL

### 2. Set Environment Variable

```bash
# Unix/Linux/macOS
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"

# Windows (Command Prompt)
set DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL

# Windows (PowerShell)
$env:DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"
```

### 3. Run Integration Tests

```bash
npm run test:integration
```

## Test Coverage

The test suite covers:

### ✅ Core Functionality
- [x] Factory creation
- [x] Configuration validation
- [x] All notification methods (send, success, error, alert, info)
- [x] Extend functionality
- [x] File attachments
- [x] Thread support

### ✅ Error Handling
- [x] Invalid webhook URLs
- [x] Empty webhook URLs
- [x] Network errors
- [x] API errors

### ✅ Type Safety
- [x] Interface compliance
- [x] Method signatures
- [x] Configuration types

### ✅ Integration
- [x] Real Discord API calls
- [x] Rich embed functionality
- [x] Custom configurations
- [x] Performance testing

### ✅ E2E Installation Testing
- [x] Package installation from NPM
- [x] CommonJS project compatibility
- [x] TypeScript project compatibility
- [x] ES Modules compatibility
- [x] Yarn package manager support
- [x] Node.js version compatibility
- [x] Production environment testing
- [x] Package.json dependencies validation

## Test Output Examples

### Basic Tests
```
🧪 Testing Discord Notify Package...

✅ Test 1: Factory Creation
   - Notifier created successfully
   - All methods present: { send: 'function', extend: 'function', ... }

✅ Test 2: Configuration Options
   - Custom configuration applied successfully

✅ Test 3: Interface Structure
   - All required methods present

✅ Test 4: Extend Functionality
   - Extended notifier created successfully

✅ Test 5: Error Handling
   - Empty webhook URL handled gracefully

🎉 All tests completed!
```

### Integration Tests
```
🔗 Running Discord Notify Integration Tests...

⚠️  Note: These tests require a valid Discord webhook URL
   Set DISCORD_WEBHOOK_URL environment variable to run integration tests

✅ should send a simple message to Discord
✅ should send a success message to Discord
✅ should send an error message to Discord
✅ should send an alert message to Discord
✅ should send an info message to Discord
✅ should send a rich embed message to Discord
✅ should send multiple embeds using extend
✅ should send message with custom username and avatar
✅ should send message with content outside embed
✅ should handle invalid webhook URL gracefully
✅ should handle empty webhook URL gracefully
✅ should handle rapid message sending

📊 Integration Test Results: 12 passed, 0 failed
```

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   ```bash
   npm install
   ```

2. **TypeScript compilation errors**
   ```bash
   npm run build
   ```

3. **Integration tests failing**
   - Verify your webhook URL is correct
   - Check that the webhook has proper permissions
   - Ensure the Discord server is accessible

4. **Rate limiting**
   - Discord has rate limits on webhooks
   - Integration tests may fail if too many requests are made
   - Wait a few minutes and try again

### Debug Mode

To see detailed test output, you can modify the test files to include more logging:

```typescript
// Add this to any test file for detailed logging
console.log('Debug info:', { webhookUrl, config, result });
```

## Continuous Integration

For CI/CD pipelines, you can run tests without integration tests:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: |
    npm install
    npm run test:all
    npm run build
```

Integration tests should be run separately with proper webhook URLs configured. 