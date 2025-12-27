---
layout: page
title: Discord Notify - Discord Webhook Notification Service for Node.js
description: A powerful, zero-dependency Discord webhook notification service for Node.js applications. Send beautiful, formatted notifications with rich embeds, file attachments, thread support, and full TypeScript support.
---

# Discord Notify

A powerful, zero-dependency Discord webhook notification service for Node.js applications. Send beautiful, formatted notifications to Discord channels with rich embeds, file attachments, thread support, and full TypeScript support.

## Why Discord Notify?

**Discord Notify** is the most comprehensive Discord webhook library for Node.js, designed specifically to leverage Discord's powerful features:

> **Looking for GitHub Actions?** Check out [discord-webhook-notifier-action](https://github.com/Devlander-Software/discord-webhook-notifier-action) for CI/CD notifications with automatic GitHub context integration. Both tools complement each other - use the action for GitHub Actions workflows and this package for your Node.js applications!

### Zero Dependencies
- Built with native Node.js fetch API
- No external dependencies to bloat your project
- Lightning-fast performance and smaller bundle sizes

### Rich Discord Features
- **Rich Embeds** with fields, thumbnails, images, and authors
- **File Attachments** - Direct file uploads without external hosting (up to 8MB)
- **Thread Support** - Native Discord thread integration for organized conversations
- **Forum Tag Auto-Creation** - Automatically create and apply forum tags (with bot token)
- **16-bit Color Support** - Beautiful visual hierarchy with custom colors
- **Username/Avatar Overrides** - Full webhook customization for brand consistency

### Developer Experience
- **Full TypeScript Support** - Complete type definitions and IntelliSense
- **Simple API** - Get started in minutes with intuitive methods
- **Pre-built Notification Types** - Success, error, alert, and info with automatic styling
- **Extensible Architecture** - Create custom notification workflows
- **Tag Name Resolution** - Use tag names instead of IDs; automatically resolved to IDs

## Package Statistics

[![npm downloads](https://img.shields.io/npm/dm/discord-notify.svg)](https://www.npmjs.com/package/discord-notify)  
[![npm version](https://img.shields.io/npm/v/discord-notify.svg)](https://www.npmjs.com/package/discord-notify)
[![Node.js version](https://img.shields.io/node/v/discord-notify.svg)](https://nodejs.org/)
[![License](https://img.shields.io/npm/l/discord-notify.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install discord-notify
```

> **Looking for secure installation instructions?** See [SECURE_INSTALLATION.md](https://github.com/Devlander-Software/discord-notify/blob/main/SECURE_INSTALLATION.md) for best practices on handling secrets, environment variables, and production deployments.

## Quick Start

```typescript
import DiscordNotifyFactory from 'discord-notify';

// Create your notifier
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL',
  appName: 'My Awesome App',
  environment: 'production'
});

// Send notifications instantly
await notifier.success('User registration completed!');
await notifier.error('Database connection failed');
await notifier.alert('High memory usage detected');
await notifier.info('Scheduled backup completed');
```

## Core Features & Methods

### Basic Notifications
Send simple messages with automatic styling:

```typescript
// Simple text message
await notifier.send('Hello from my app!');

// Rich embed with all Discord features
await notifier.send({
  title: 'Server Status Report',
  description: 'Current server metrics and health status',
  color: 0x0099ff,
  fields: [
    { name: 'CPU Usage', value: '45%', inline: true },
    { name: 'Memory Usage', value: '67%', inline: true },
    { name: 'Active Users', value: '1,234', inline: false }
  ],
  thumbnail: { url: 'https://example.com/server-icon.png' },
  image: { url: 'https://example.com/server-graph.png' }
});
```

### Pre-built Notification Types
Four specialized methods with automatic colors and styling:

```typescript
// Success notifications (green)
await notifier.success('Deployment completed successfully');

// Error notifications (red)
await notifier.error('Application crashed with error details');

// Alert notifications (orange)
await notifier.alert('High CPU usage detected on server');

// Info notifications (blue)
await notifier.info('New user registered: john_doe');
```

### File Attachments
Send files directly to Discord without external hosting:

```typescript
import { readFileSync } from 'fs';

// Send log files, reports, or any file type
const logContent = readFileSync('/var/log/app.log', 'utf8');
const logBuffer = new TextEncoder().encode(logContent);

await notifier.sendFile(
  {
    title: 'Daily Log Report',
    description: 'Application logs for today',
    color: 0x00ff00
  },
  {
    name: `app-${new Date().toISOString().split('T')[0]}.log`,
    data: logBuffer,
    contentType: 'text/plain'
  }
);
```

### Thread Support
Organize conversations with Discord's native thread system:

```typescript
const threadId = '1234567890123456789';

// Send to specific thread for organized conversations
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
```

### Forum Tags with Auto-Creation (Bot-Enhanced)
Create forum posts with tags that are automatically created if they don't exist:

```typescript
// With bot token - tags are auto-created and applied
const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_WEBHOOK_URL',
  botToken: 'YOUR_BOT_TOKEN',
  forum: {
    defaultForumChannelId: 'YOUR_FORUM_CHANNEL_ID',
    autoCreateTags: true // Default: true when botToken exists
  }
});

// Create forum post with tags (tags auto-created if missing)
if (notifier.forum) {
  const threadId = await notifier.forum.post({
    title: 'Bug Report: Database Connection',
    message: {
      title: 'Error Details',
      description: 'Database connection failed at 3:45 PM',
      color: 0xff0000
    },
    tags: ['bug', 'database', 'critical'] // Tag names - auto-resolved to IDs
  });
}

// Or ensure tags exist first
if (notifier.forum) {
  const tagIds = await notifier.forum.ensureTags('channel-id', ['bug', 'feature']);
  // Returns tag IDs in same order as input
}
```

### Webhook-Only Tags (Fallback Mode)
When bot token is not available, tags are included as metadata:

```typescript
// Without bot token - tags shown as embed field/footer
const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_WEBHOOK_URL',
  forum: {
    onMissingBot: 'fallbackToWebhook', // Default
    tagsFieldMode: 'field' // 'field' | 'footer' | 'none'
  }
});

// Tags will appear as a field in the embed
await notifier.send({
  title: 'Bug Report',
  description: 'Database connection issue',
  tags: ['bug', 'database'] // Shown as "Tags: bug, database" field
});
```

### Multi-Embed Messages
Send multiple embeds in a single message:

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

## Use Cases

**Discord Notify** is perfect for:

### Application Monitoring
```typescript
// Monitor your app health
setInterval(async () => {
  const status = await checkAppHealth();
  if (!status.healthy) {
    await notifier.error({
      title: 'Application Health Check Failed',
      description: 'Issues detected in system',
      fields: [
        { name: 'Database', value: status.db ? 'Connected' : 'Failed', inline: true },
        { name: 'API', value: status.api ? 'Healthy' : 'Issues', inline: true },
        { name: 'Error', value: status.error || 'Unknown error', inline: false }
      ]
    });
  }
}, 300000); // Check every 5 minutes
```

### Deployment Notifications
```typescript
// Notify team about deployments
await notifier.success({
  title: 'Deployment Successful',
  description: 'New version deployed to production',
  fields: [
    { name: 'Version', value: 'v2.1.0', inline: true },
    { name: 'Duration', value: '2m 34s', inline: true },
    { name: 'Environment', value: 'production', inline: true }
  ]
});
```

### Error Reporting
```typescript
try {
  // Some operation that might fail
  throw new Error('Something went wrong');
} catch (error) {
  await notifier.error({
    title: 'Application Error',
    description: error.message,
    fields: [
      { name: 'Stack Trace', value: error.stack || 'No stack trace', inline: false },
      { name: 'Timestamp', value: new Date().toISOString(), inline: true },
      { name: 'Environment', value: process.env.NODE_ENV || 'unknown', inline: true }
    ]
  });
}
```

### Bot Development
```typescript
// Create Discord bots with rich notifications
await notifier.send({
  title: 'Bot Command Executed',
  description: 'User performed an action',
  fields: [
    { name: 'User', value: 'john_doe', inline: true },
    { name: 'Command', value: '/status', inline: true },
    { name: 'Channel', value: '#general', inline: true }
  ],
  color: 0x00ff00
});
```

## API Reference

### DiscordNotifyFactory(config)

Creates a new Discord notifier instance.

**Parameters:**
- `webhookUrl` (string, required): Your Discord webhook URL
- `appName` (string, optional): Name of your application
- `environment` (string, optional): Environment name
- `username` (string, optional): Override webhook username
- `avatarUrl` (string, optional): Override webhook avatar URL
- `threadId` (string, optional): Default thread ID for all messages
- `botToken` (string, optional): Bot token for advanced features (forum tags, deduplication, message editing)
- `forumChannelId` (string, optional): Forum channel ID (legacy - use `forum.defaultForumChannelId`)
- `forum` (object, optional): Forum configuration
  - `defaultForumChannelId` (string, optional): Default forum channel ID
  - `autoCreateTags` (boolean, optional): Auto-create missing tags (default: `true` when `botToken` exists)
  - `onMissingBot` ('fallbackToWebhook' | 'ignoreTags' | 'throw', optional): Behavior when tags provided but no bot token (default: `'fallbackToWebhook'`)
  - `tagsFieldMode` ('field' | 'footer' | 'none', optional): How to display tags in webhook fallback (default: `'field'`)
  - `tagCacheTtlMs` (number, optional): Tag cache TTL in milliseconds (default: `900000` = 15 minutes)

**Returns:** A `DiscordNotify` instance with the following methods:

### Methods

| Method | Description | Example |
|--------|-------------|---------|
| `send(args)` | Send basic notification | `notifier.send('Hello!')` |
| `success(args)` | Send success notification (green) | `notifier.success('Task completed!')` |
| `error(args)` | Send error notification (red) | `notifier.error('Something failed')` |
| `alert(args)` | Send alert notification (orange) | `notifier.alert('Warning detected')` |
| `info(args)` | Send info notification (blue) | `notifier.info('Information message')` |
| `sendFile(args, file)` | Send with file attachment | `notifier.sendFile(args, fileData)` |
| `sendToThread(args, threadId)` | Send to specific thread | `notifier.sendToThread(args, '123456789')` |
| `extend(args)` | Create multi-embed notifier | `notifier.extend(baseEmbed)` |
| `forum.ensureTags(channelId, tags)` | Resolve tag names to IDs, auto-create if missing | `await notifier.forum?.ensureTags('channel-id', ['bug'])` |
| `forum.post({ title, message, tags })` | Create forum post with tags | `await notifier.forum?.post({ title: 'Bug', tags: ['bug'] })` |

## Discord Webhook Setup

1. **Create a Discord Webhook:**
   - Go to your Discord server settings
   - Navigate to **Integrations** > **Webhooks**
   - Click **"New Webhook"**
   - Choose a channel and give it a name
   - Copy the webhook URL

2. **Test Your Webhook:**
```typescript
import DiscordNotifyFactory from 'discord-notify';

const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_WEBHOOK_URL_HERE'
});

await notifier.success('Webhook is working!');
```

## Documentation

- **[Complete API Documentation](API.md)** - Full API reference with TypeScript interfaces
- **[TypeDoc Reference](api/)** - Automatically generated TypeDoc documentation
- **[Bot Permissions Guide](https://github.com/Devlander-Software/discord-notify/blob/main/BOT_PERMISSIONS.md)** - Complete guide to required Discord bot permissions
- **[Forum Thread Testing Guide](https://github.com/Devlander-Software/discord-notify/blob/main/FORUM_THREAD_TESTING.md)** - Guide to forum thread features
- **[Secure Installation Guide](https://github.com/Devlander-Software/discord-notify/blob/main/SECURE_INSTALLATION.md)** - Best practices for production deployments

## Examples

Check out complete working examples:

- [Basic Usage Example](https://github.com/Devlander-Software/discord-notify/tree/main/examples/basic-usage/) - CommonJS example with comprehensive features
- [TypeScript Usage Example](https://github.com/Devlander-Software/discord-notify/tree/main/examples/typescript-usage/) - Full TypeScript example with type safety
- [Forum Thread Examples](https://github.com/Devlander-Software/discord-notify/tree/main/examples/) - Forum thread creation and tag management

## Testing

```bash
# Run all tests
npm run test:full

# Unit tests only
npm run test:unit

# Integration tests (requires Discord webhook URL)
export DISCORD_WEBHOOK_URL="your_webhook_url"
npm run test:integration
```

## Contributing

Contributions are welcome! We love contributions from the community. Please see our [Contributing Guide](https://github.com/Devlander-Software/discord-notify/blob/main/CONTRIBUTING.md) for:

- **Development Setup** - How to get started
- **Coding Standards** - TypeScript and code style guidelines  
- **Testing** - How to write and run tests
- **Documentation** - Keeping docs up to date
- **Pull Request Process** - How to submit changes
- **Conventional Commits** - For automatic changelog generation

### Quick Start for Contributors

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/discord-notify.git
cd discord-notify

# Install and setup
npm install
npm run build
npm run test:full

# Make your changes and submit a PR!
```

## Related Projects

### Discord Webhook Notifier Action

If you're using **GitHub Actions** for CI/CD, check out our companion project:

**[discord-webhook-notifier-action](https://github.com/Devlander-Software/discord-webhook-notifier-action)** - A specialized GitHub Action for Discord notifications with:
- Automatic GitHub context integration (workflow, job, commit, actor)
- Smart workflow type detection (deployment, test, build, release)
- Organization-wide reusable workflows
- Zero Node.js dependencies (pure bash)

**When to use which:**
- **Use `discord-notify` (this package)**: For Node.js applications, file attachments, forum tag auto-creation, TypeScript support, and programmatic control
- **Use `discord-webhook-notifier-action`**: For GitHub Actions workflows with automatic GitHub context and CI/CD-specific features

**You can use both!** Use the action for CI/CD notifications and this package for application-level notifications.

## Community and Support

[![Join Devlander on Discord](https://img.shields.io/badge/Discord-Devlander-%235865F2)](https://bit.ly/devlander-discord-invite)  
[![Join Devlander on Twitch](https://img.shields.io/twitch/status/devlander)](https://bit.ly/devlander-twitch)  
[![Reddit](https://img.shields.io/badge/Reddit-r%2Fsoftwareengineersutah-orange?logo=reddit)](https://www.reddit.com/r/softwareengineersutah/)
[![Follow Landon Johnson On Twitter](https://img.shields.io/twitter/follow/landonwjohnson.svg?style=social&label=Follow)](https://bit.ly/landonwjohnson-on-twitter)  
[![Join the discussion on Github](https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue)](https://github.com/orgs/Devlander-Software/discussions)

- **Documentation**: [API Reference](API.md)
- **Issues**: [GitHub Issues](https://github.com/Devlander-Software/discord-notify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/orgs/Devlander-Software/discussions)
- **Discord Community**: [Join our Discord](https://bit.ly/devlander-discord-invite)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Devlander-Software/discord-notify/blob/main/LICENSE) file for details.

## Changelog

See [CHANGELOG.md](https://github.com/Devlander-Software/discord-notify/blob/main/CHANGELOG.md) for a complete list of changes and version history.

---

**Discord Notify** - Modern Discord notifications for Node.js applications. Built with TypeScript, zero dependencies, and full Discord API compliance. 