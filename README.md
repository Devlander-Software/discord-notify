# Discord Notify

A Discord API-compliant notification service for Node.js applications. Send beautiful, formatted notifications to Discord channels using webhooks with full Discord API compliance. Perfect for logging, monitoring, alerts, and bot notifications.

> **Inspired by Slack Notify** - This package was inspired by popular Slack notification libraries like `@slack/webhook`, `node-slack-notify`, and `slack-notify`, but designed specifically for Discord's rich webhook capabilities and API features. While Slack focuses on simple text messages, Discord Notify leverages Discord's powerful embed system for richer, more engaging notifications.

## Hits
[![npm downloads](https://img.shields.io/npm/dm/discord-notify.svg)](https://www.npmjs.com/package/discord-notify)  
[![wakatime](https://wakatime.com/badge/user/bd50b6c5-e0ca-4937-83b3-ab2d13adbc73/project/02037e5a-4e97-4cd5-872c-df41ad2d6b67.svg)](https://wakatime.com/badge/user/bd50b6c5-e0ca-4937-83b3-ab2d13adbc73/project/02037e5a-4e97-4cd5-872c-df41ad2d6b67)

## Join My Dev Community
[![Join Devlander on Discord](https://img.shields.io/badge/Discord-Devlander-%235865F2)](https://bit.ly/devlander-discord-invite)  
[![Join Devlander on Twitch](https://img.shields.io/twitch/status/devlander)](https://bit.ly/devlander-twitch)  
[![Reddit](https://img.shields.io/badge/Reddit-r%2Fsoftwareengineersutah-orange?logo=reddit)](https://www.reddit.com/r/softwareengineersutah/)
[![Follow Landon Johnson On Twitter](https://img.shields.io/twitter/follow/landonwjohnson.svg?style=social&label=Follow)](https://bit.ly/landonwjohnson-on-twitter)  
[![Join the discussion on Github](https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue)](https://github.com/orgs/Devlander-Software/discussions)

## 📋 Changelog
[![Keep a Changelog](https://img.shields.io/badge/Keep%20a%20Changelog-1.0.0-brightgreen.svg)](https://keepachangelog.com/)
[![Semantic Versioning](https://img.shields.io/badge/Semantic%20Versioning-2.0.0-brightgreen.svg)](https://semver.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg)](https://conventionalcommits.org/)  

## Features

### 🚀 Core Features
- **Simple and easy to use** - Get started in minutes, just like Slack libraries
- **Pre-built notification types** - Success, error, alert, info with custom colors
- **TypeScript support** - Full type definitions and IntelliSense
- **Zero dependencies** - Lightweight and fast, uses native Node.js fetch

### 🎨 Discord-Specific Features
- **Rich embed support** - Fields, thumbnails, images, and authors (Discord exclusive)
- **File attachment support** - Direct file uploads without external hosting
- **Thread support** - Native Discord thread integration for organized conversations
- **Username and avatar overrides** - Full webhook customization for brand consistency
- **16-bit color support** - Rich color palette for better visual hierarchy
- **Discord API compliant** - Full webhook payload support with error handling

### 🔧 Advanced Features
- **Configurable app name and environment** - Professional notifications with context
- **Extensible architecture** - Create custom notification workflows
- **Monitoring ready** - Perfect for application monitoring and alerts
- **CI/CD integration** - Works seamlessly with GitHub Actions, Jenkins, and more

## Installation

### Quick Install
```bash
npm install discord-notify
```

## 🎯 Use Cases

Discord Notify is perfect for:

- **Application Monitoring** - Send alerts when your app goes down or encounters errors
- **Log Management** - Forward important logs to Discord for team visibility
- **Deployment Notifications** - Notify your team when deployments succeed or fail
- **Error Reporting** - Send detailed error reports with stack traces
- **Bot Development** - Create Discord bots that send rich notifications
- **CI/CD Integration** - Integrate with GitHub Actions, Jenkins, or other CI tools
- **System Monitoring** - Monitor server health, disk space, and performance
- **User Activity** - Track user registrations, logins, and important actions
- **File Sharing** - Send reports, logs, and files directly to Discord channels
- **Team Collaboration** - Keep your team informed with organized notifications

## 🔄 Discord vs Slack: Why Discord Notify?

While both Discord and Slack offer webhook capabilities, Discord Notify takes advantage of Discord's superior features:

| Feature | Discord Notify | Slack Notify |
|---------|---------------|--------------|
| **Rich Embeds** | ✅ Full support with fields, thumbnails, images | ❌ Limited formatting |
| **File Attachments** | ✅ Direct file uploads | ❌ Requires external hosting |
| **Thread Support** | ✅ Native thread integration | ❌ Limited threading |
| **Custom Colors** | ✅ 16-bit color support | ❌ Basic color options |
| **Username/Avatar** | ✅ Full override support | ❌ Limited customization |
| **Message Structure** | ✅ Structured embeds | ❌ Plain text with basic formatting |
| **API Compliance** | ✅ Full Discord API support | ❌ Basic webhook support |
| **Performance** | ✅ Zero dependencies | ❌ Often requires external libs |

**Discord Notify** provides a more modern, feature-rich notification experience compared to traditional Slack notification libraries.

## 🚀 Evolution from Slack Notify

### The Inspiration
Discord Notify was born from the need for better notification capabilities in modern development workflows. While Slack notification libraries like `@slack/webhook` and `node-slack-notify` served their purpose, they were limited by Slack's basic webhook capabilities.

### The Evolution
Discord Notify takes the simplicity and ease-of-use of Slack notification libraries and enhances them with Discord's powerful features:

- **From Simple Text** → **Rich Embeds** with structured data
- **From Basic Colors** → **16-bit Color Support** for better visual hierarchy
- **From External Files** → **Direct File Attachments** for seamless sharing
- **From Limited Threading** → **Native Thread Support** for organized conversations
- **From Basic Customization** → **Full Username/Avatar Override** for brand consistency

### The Result
A notification service that's as easy to use as Slack libraries but with the power and flexibility of Discord's modern API.

### Manual Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/discord-notify.git
   cd discord-notify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the package:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## Discord Webhook Setup

Before using Discord Notify, you need to create a Discord webhook:

### Step 1: Create a Discord Webhook
1. Go to your Discord server settings
2. Navigate to **Integrations** > **Webhooks**
3. Click **"New Webhook"**
4. Choose a channel and give it a name (e.g., "Notifications")
5. Copy the webhook URL (it looks like: `https://discord.com/api/webhooks/123456789/abcdef...`)

### Step 2: Test Your Webhook
```typescript
import DiscordNotifyFactory from 'discord-notify';

const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_WEBHOOK_URL_HERE'
});

// Test the connection
await notifier.success('🎉 Webhook is working!');
```

## Quick Start

### Basic Usage
```typescript
import DiscordNotifyFactory from 'discord-notify';

// Create a notifier instance
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL',
  appName: 'My Awesome App',
  environment: 'production',
  username: 'My Bot', // Optional: Override webhook username
  avatarUrl: 'https://example.com/bot-avatar.png' // Optional: Override webhook avatar
});

// Send a simple message
await notifier.send('Hello from my app!');

// Send a success notification
await notifier.success('User registration completed successfully');

// Send an error notification
await notifier.error('Database connection failed');

// Send an alert
await notifier.alert('High memory usage detected');

// Send an info message
await notifier.info('Scheduled backup completed');

// Send to a specific thread
await notifier.sendToThread('Thread message', '1234567890123456789');

// Send with file attachment
await notifier.sendFile(
  { title: 'Log Report', description: 'Application logs for today' },
  { name: 'app.log', data: 'log content here', contentType: 'text/plain' }
);
```

### Advanced Usage Examples

#### Rich Embed with All Features
```typescript
await notifier.send({
  content: 'Check out this detailed report!',
  title: 'Server Status Report',
  description: 'Current server metrics and health status',
  color: 0x0099ff,
  url: 'https://example.com/dashboard',
  fields: [
    { name: 'CPU Usage', value: '45%', inline: true },
    { name: 'Memory Usage', value: '67%', inline: true },
    { name: 'Disk Usage', value: '23%', inline: true },
    { name: 'Active Users', value: '1,234', inline: false },
    { name: 'Uptime', value: '99.9%', inline: false }
  ],
  thumbnail: {
    url: 'https://example.com/server-icon.png'
  },
  image: {
    url: 'https://example.com/server-graph.png'
  },
  author: {
    name: 'System Monitor',
    url: 'https://example.com/monitor',
    icon_url: 'https://example.com/monitor-icon.png'
  },
  footer: {
    text: 'Generated by System Monitor',
    icon_url: 'https://example.com/footer-icon.png'
  }
});
```

#### Error Notification with Stack Trace
```typescript
try {
  // Some operation that might fail
  throw new Error('Something went wrong');
} catch (error) {
  await notifier.error({
    title: 'Application Error',
    description: error.message,
    fields: [
      { name: 'Stack Trace', value: error.stack || 'No stack trace available', inline: false },
      { name: 'Timestamp', value: new Date().toISOString(), inline: true },
      { name: 'Environment', value: process.env.NODE_ENV || 'unknown', inline: true }
    ]
  });
}
```

#### File Upload with Logs
```typescript
import { readFileSync } from 'fs';

// Read log file and send as attachment
const logContent = readFileSync('/var/log/app.log', 'utf8');
const logBuffer = new TextEncoder().encode(logContent);

await notifier.sendFile(
  {
    title: 'Daily Log Report',
    description: 'Application logs for ' + new Date().toLocaleDateString(),
    color: 0x00ff00
  },
  {
    name: `app-${new Date().toISOString().split('T')[0]}.log`,
    data: logBuffer,
    contentType: 'text/plain'
  }
);
```

#### Thread-based Notifications
```typescript
// Send to a specific thread for organized conversations
const threadId = '1234567890123456789';

await notifier.sendToThread(
  {
    title: 'Deployment Started',
    description: 'New version deployment initiated',
    color: 0xffff00,
    fields: [
      { name: 'Version', value: 'v2.1.0', inline: true },
      { name: 'Environment', value: 'production', inline: true }
    ]
  },
  threadId
);

// Later, send deployment status to the same thread
await notifier.sendToThread(
  {
    title: 'Deployment Completed',
    description: 'New version successfully deployed',
    color: 0x00ff00,
    fields: [
      { name: 'Duration', value: '2m 34s', inline: true },
      { name: 'Status', value: 'Success', inline: true }
    ]
  },
  threadId
);
```

#### Monitoring Integration with Threads
```typescript
// Create a monitoring system that uses threads for organization
const monitoringThreadId = '1234567890123456789';

setInterval(async () => {
  const dbStatus = await checkDatabaseConnection();
  const serverStatus = await checkServerHealth();
  
  if (dbStatus.connected && serverStatus.healthy) {
    await notifier.sendToThread({
      title: 'Health Check Passed',
      description: 'All systems operational',
      color: 0x00ff00,
      fields: [
        { name: 'Database', value: '✅ Connected', inline: true },
        { name: 'Server', value: '✅ Healthy', inline: true },
        { name: 'Response Time', value: `${dbStatus.responseTime}ms`, inline: true }
      ]
    }, monitoringThreadId);
  } else {
    await notifier.sendToThread({
      title: 'Health Check Failed',
      description: 'Issues detected in system',
      color: 0xff0000,
      fields: [
        { name: 'Database', value: dbStatus.connected ? '✅ Connected' : '❌ Failed', inline: true },
        { name: 'Server', value: serverStatus.healthy ? '✅ Healthy' : '❌ Issues', inline: true },
        { name: 'Error', value: dbStatus.error || serverStatus.error || 'Unknown error', inline: false }
      ]
    }, monitoringThreadId);
  }
}, 300000); // Check every 5 minutes
```

## API Reference

### DiscordNotifyFactory(config)

Creates a new Discord notifier instance.

#### Parameters

- `config` (DiscordNotifyConfig):
  - `webhookUrl` (string, required): Your Discord webhook URL
  - `appName` (string, optional): Name of your application (default: 'Discord Notify')
  - `environment` (string, optional): Environment name (default: 'development')
  - `username` (string, optional): Override webhook username
  - `avatarUrl` (string, optional): Override webhook avatar URL
  - `threadId` (string, optional): Default thread ID for all messages

#### Returns

A `DiscordNotify` instance with the following methods:

### Methods

#### `send(args: string | SendArgs): Promise<void>`

Sends a basic notification.

```typescript
// Simple string message
await notifier.send('Hello World!');

// Rich embed with content
await notifier.send({
  content: 'Plain text message outside embed',
  title: 'User Action',
  description: 'A user performed an action',
  color: 0x00ff00,
  fields: [
    { name: 'User', value: 'john_doe', inline: true },
    { name: 'Action', value: 'login', inline: true }
  ],
  image: {
    url: 'https://example.com/image.png'
  },
  url: 'https://example.com/link'
});
```

#### `success(args: string | SendArgs): Promise<void>`

Sends a success notification with green color and ✅ emoji.

#### `error(args: string | SendArgs): Promise<void>`

Sends an error notification with red color and 🚨 emoji.

#### `alert(args: string | SendArgs): Promise<void>`

Sends an alert notification with orange color and ⚠️ emoji.

#### `info(args: string | SendArgs): Promise<void>`

Sends an info notification with light blue color and ℹ️ emoji.

#### `extend(args: string | SendArgs): DiscordNotifier`

Creates a new notifier that sends multiple embeds in a single message.

```typescript
const extendedNotifier = notifier.extend({
  title: 'Base Information',
  description: 'This is the base embed'
});

await extendedNotifier.send({
  title: 'Additional Information',
  description: 'This will be sent as a second embed'
});
```

#### `sendFile(args: string | SendArgs, file: FileAttachment): Promise<void>`

Sends a notification with a file attachment.

```typescript
await notifier.sendFile(
  { title: 'Error Log', description: 'Application error details' },
  {
    name: 'error.log',
    data: 'Error details here...',
    contentType: 'text/plain'
  }
);
```

#### `sendToThread(args: string | SendArgs, threadId: string): Promise<void>`

Sends a notification to a specific Discord thread.

```typescript
await notifier.sendToThread(
  { title: 'Thread Update', description: 'New information' },
  '1234567890123456789'
);
```

### Types

#### SendArgs

```typescript
interface SendArgs {
  content?: string; // Plain text message (outside of embed)
  text?: string; // Legacy alias for content
  title?: string;
  description?: string;
  color?: number;
  fields?: DiscordField[];
  timestamp?: string;
  footer?: {
    text: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  url?: string; // URL for the embed title
}
```

#### DiscordField

```typescript
interface DiscordField {
  name: string;
  value: string;
  inline?: boolean;
}
```

#### FileAttachment

```typescript
interface FileAttachment {
  name: string;
  data: Uint8Array | string;
  contentType?: string;
}
```

## Testing

### Run Tests
```bash
# Basic functionality tests
npm test

# Unit tests
npm run test:unit

# Integration tests (requires Discord webhook URL)
export DISCORD_WEBHOOK_URL="your_webhook_url"
npm run test:integration

# All tests
npm run test:all
```

### Test Coverage
The test suite covers:
- ✅ Core functionality
- ✅ Error handling
- ✅ Type safety
- ✅ Integration with Discord API
- ✅ Performance testing

See [tests/README.md](tests/README.md) for detailed testing information.

## 📋 Changelog Management

### Automated Changelog Generation
This project uses automated changelog generation based on [Conventional Commits](https://conventionalcommits.org/):

```bash
# Generate changelog from git commits
npm run changelog:generate

# View current changelog
cat CHANGELOG.md
```

### Release Process
```bash
# Patch release (1.0.0 → 1.0.1)
npm run release:patch

# Minor release (1.0.1 → 1.1.0)
npm run release:minor

# Major release (1.1.0 → 2.0.0)
npm run release:major
```

### Commit Message Format
Use conventional commit format for automatic categorization:

```bash
# New feature
git commit -m "feat: add file attachment support"

# Bug fix
git commit -m "fix: handle empty webhook URL gracefully"

# Documentation
git commit -m "docs: update installation guide"

# Breaking change
git commit -m "feat!: change webhook URL parameter to config object"
```

### Changelog Features
- 📝 **Automatic categorization** by commit type
- 🏷️ **Semantic versioning** support
- 🔄 **GitHub integration** with releases
- 📊 **Detailed change tracking** with commit hashes
- 🎯 **Migration guides** for breaking changes

### GitHub Releases
- 🚀 **Automated releases** triggered by version bumps
- 🎯 **Interactive release manager** for manual control
- 📄 **Professional release templates** with comprehensive notes
- 📦 **Asset management** with automatic file uploads
- 🔄 **Full CI/CD integration** with testing and deployment

See [docs/CHANGELOG_GUIDE.md](docs/CHANGELOG_GUIDE.md) for comprehensive changelog management documentation.
See [docs/GITHUB_RELEASES.md](docs/GITHUB_RELEASES.md) for detailed GitHub release information.
See [docs/API.md](docs/API.md) for complete API documentation and TypeScript interfaces.

## 📚 Documentation

- **[📖 API Documentation](docs/API.md)** - Complete API reference with TypeScript interfaces
- **[📋 Changelog Guide](docs/CHANGELOG_GUIDE.md)** - How to manage changelog and releases
- **[🚀 GitHub Releases](docs/GITHUB_RELEASES.md)** - Automated release process guide
- **[📦 NPM Package](https://www.npmjs.com/package/discord-notify)** - Package on npm registry

## 🔄 Migrating from Slack Libraries

If you're currently using Slack notification libraries, migrating to Discord Notify is straightforward:

### From `@slack/webhook`
```javascript
// Before (Slack)
const { IncomingWebhook } = require('@slack/webhook');
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
await webhook.send('Hello from Slack!');

// After (Discord)
import DiscordNotifyFactory from 'discord-notify';
const notifier = DiscordNotifyFactory({ webhookUrl: process.env.DISCORD_WEBHOOK_URL });
await notifier.send('Hello from Discord!');
```

### From `node-slack-notify`
```javascript
// Before (Slack)
const slack = require('slack-notify')(process.env.SLACK_WEBHOOK_URL);
slack.alert('Server is down!');

// After (Discord)
import DiscordNotifyFactory from 'discord-notify';
const notifier = DiscordNotifyFactory({ webhookUrl: process.env.DISCORD_WEBHOOK_URL });
await notifier.alert('Server is down!');
```

### Key Differences
- **Async/Await** - Discord Notify uses modern async patterns
- **Rich Embeds** - Take advantage of Discord's embed system
- **File Attachments** - Direct file uploads without external hosting
- **Thread Support** - Organize notifications in Discord threads

## Error Handling

The package includes comprehensive error handling that returns detailed information about webhook failures:

```typescript
// The webhook methods return response information
const response = await notifier.send('Test message');
// Response includes success status, error details, and message ID
```

## Thread Support

To use thread functionality:
1. Create a thread in your Discord channel
2. Right-click the thread and copy its ID
3. Use the thread ID in `sendToThread()` or set it as default in config

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Join Our Discord Community! 🎉

**Need help? Want to share your projects? Join our growing developer community!**

[![Join Devlander on Discord](https://img.shields.io/badge/Discord-Devlander-%235865F2?style=for-the-badge&logo=discord)](https://bit.ly/devlander-discord-invite)

**What you'll find in our Discord:**
- 🚀 **Project Showcases** - Share what you're building with Discord Notify
- 💡 **Code Reviews** - Get feedback on your implementations
- 🐛 **Bug Reports** - Report issues and get help
- 📚 **Tutorials** - Learn advanced usage patterns
- 🤝 **Networking** - Connect with other developers
- 🎯 **Feature Requests** - Suggest new features for Discord Notify

**Quick Links:**
- [Discord Server](https://bit.ly/devlander-discord-invite) - Main community hub
- [GitHub Discussions](https://github.com/orgs/Devlander-Software/discussions) - Technical discussions
- [Twitch Streams](https://bit.ly/devlander-twitch) - Live coding sessions
- [Twitter](https://bit.ly/landonwjohnson-on-twitter) - Updates and announcements

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/discord-notify/issues) on GitHub or join our Discord community for real-time support! 