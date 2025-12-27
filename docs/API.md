---
layout: page
title: API Documentation
description: Complete API reference for Discord Notify with TypeScript interfaces and examples
---

# Discord Notify API Documentation - Complete Reference

## Overview

Welcome to the Discord Notify API documentation! This package provides a comprehensive Discord webhook notification service for Node.js applications, designed specifically for Discord's rich API capabilities and webhook features.

**Discord Notify** offers a modern Discord notification service, leveraging Discord's powerful webhook capabilities for rich, engaging notifications with zero dependencies.

## Quick Start

```typescript
import DiscordNotifyFactory from 'discord-notify';

const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL'
});

await notifier.success('Hello from Discord Notify!');
```

## API Reference

### Core Functions

- **[DiscordNotifyFactory](./api/functions/default.md)** - Main factory function to create notifier instances

### Interfaces

- **[DiscordNotifyConfig](./api/interfaces/DiscordNotifyConfig.md)** - Configuration options for the factory
- **[DiscordNotifier](./api/interfaces/DiscordNotifier.md)** - Main notifier interface with all methods
- **[SendArgs](./api/interfaces/SendArgs.md)** - Arguments for sending custom messages
- **[DiscordEmbed](./api/interfaces/DiscordEmbed.md)** - Discord embed structure
- **[DiscordField](./api/interfaces/DiscordField.md)** - Embed field structure
- **[FileAttachment](./api/interfaces/FileAttachment.md)** - File attachment options
- **[DiscordWebhookPayload](./api/interfaces/DiscordWebhookPayload.md)** - Webhook payload structure
- **[DiscordWebhookResponse](./api/interfaces/DiscordWebhookResponse.md)** - Webhook response structure

### Globals

- **[Globals](./api/globals.md)** - Global types and utilities

## Key Features

### Discord API Compliant
Full support for Discord's webhook API with all features:
- Rich embeds with fields, thumbnails, and images
- Direct file attachments without external hosting
- Native thread support for organized conversations
- Username and avatar overrides for brand consistency
- Custom colors and timestamps
- 16-bit color support for better visual hierarchy

### TypeScript Support
Complete type definitions with:
- IntelliSense support in modern IDEs
- Compile-time error checking
- Interface documentation and examples
- Type safety throughout the entire API
- Generic type support for custom configurations

### Zero Dependencies
Lightweight and fast:
- Uses native Node.js fetch API
- No external dependencies
- Minimal memory footprint
- Fast startup time
- Optimized for production use

## Usage Examples

### Basic Notifications
```typescript
// Success notification
await notifier.success('Deployment completed successfully!');

// Error notification
await notifier.error('Database connection failed');

// Alert notification
await notifier.alert('High memory usage detected');

// Info notification
await notifier.info('Scheduled backup completed');
```

### Rich Embeds
```typescript
await notifier.send({
  title: 'Server Status Report',
  description: 'Current server metrics and health status',
  color: 0x0099ff,
  fields: [
    { name: 'CPU Usage', value: '45%', inline: true },
    { name: 'Memory Usage', value: '67%', inline: true },
    { name: 'Disk Usage', value: '23%', inline: true },
    { name: 'Active Users', value: '1,234', inline: false }
  ],
  thumbnail: {
    url: 'https://example.com/server-icon.png'
  },
  author: {
    name: 'System Monitor',
    url: 'https://example.com/monitor',
    icon_url: 'https://example.com/monitor-icon.png'
  }
});
```

### File Attachments
```typescript
await notifier.sendFile(
  { title: 'Error Log Report', description: 'Application error details for today' },
  {
    name: 'error.log',
    data: 'Error details here...',
    contentType: 'text/plain'
  }
);
```

### Thread Support
```typescript
await notifier.sendToThread(
  { title: 'Thread Update', description: 'New information in thread' },
  '1234567890123456789'
);
```

### Extended Notifiers
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

### Forum Tags with Auto-Creation
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

### Monitoring Integration
```typescript
// Create a monitoring system
const monitoringNotifier = DiscordNotifyFactory({
  webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  appName: 'System Monitor',
  environment: 'production'
});

// Send health check results
await monitoringNotifier.send({
  title: 'Health Check Results',
  description: 'System health status',
  fields: [
    { name: 'Database', value: 'Connected', inline: true },
    { name: 'API Server', value: 'Healthy', inline: true },
    { name: 'Response Time', value: '45ms', inline: true }
  ],
  color: 0x00ff00
});
```

## Configuration

The factory accepts a configuration object:

```typescript
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/...', // Required
  appName: 'My Awesome App',                          // Optional
  environment: 'production',                          // Optional
  username: 'My Bot',                                 // Optional
  avatarUrl: 'https://example.com/bot-avatar.png',   // Optional
  threadId: '1234567890123456789',                    // Optional
  botToken: 'YOUR_BOT_TOKEN',                          // Optional - for forum tags, deduplication, message editing
  forum: {                                             // Optional - forum configuration
    defaultForumChannelId: 'YOUR_FORUM_CHANNEL_ID',   // Optional
    autoCreateTags: true,                              // Optional - default: true when botToken exists
    onMissingBot: 'fallbackToWebhook',                 // Optional - 'fallbackToWebhook' | 'ignoreTags' | 'throw'
    tagsFieldMode: 'field',                            // Optional - 'field' | 'footer' | 'none'
    tagCacheTtlMs: 900000                              // Optional - default: 15 minutes
  }
});
```

### Configuration Options

**Required:**
- `webhookUrl` (string): Your Discord webhook URL

**Optional:**
- `appName` (string): Name of your application
- `environment` (string): Environment name (e.g., 'production', 'staging')
- `username` (string): Override webhook username
- `avatarUrl` (string): Override webhook avatar URL
- `threadId` (string): Default thread ID for all messages
- `botToken` (string): Bot token for advanced features (forum tags, deduplication, message editing)
- `forum` (object): Forum configuration
  - `defaultForumChannelId` (string): Default forum channel ID
  - `autoCreateTags` (boolean): Auto-create missing tags (default: `true` when `botToken` exists)
  - `onMissingBot` ('fallbackToWebhook' | 'ignoreTags' | 'throw'): Behavior when tags provided but no bot token (default: `'fallbackToWebhook'`)
  - `tagsFieldMode` ('field' | 'footer' | 'none'): How to display tags in webhook fallback (default: `'field'`)
  - `tagCacheTtlMs` (number): Tag cache TTL in milliseconds (default: `900000` = 15 minutes)

## Error Handling

The package includes comprehensive error handling:

```typescript
try {
  await notifier.send('Test message');
} catch (error) {
  console.error('Discord notification failed:', error);
  // Error includes detailed information about the failure
}
```

## Performance and Optimization

- **Zero Dependencies** - No external packages required
- **Native Fetch** - Uses Node.js built-in fetch API
- **Lightweight** - Minimal memory footprint
- **Fast** - Optimized for performance
- **Production Ready** - Designed for high-traffic applications

## Use Cases

Discord Notify is ideal for:
- Application monitoring and alerting
- Deployment notifications
- Error reporting and logging
- System health monitoring
- Team collaboration tools
- CI/CD pipeline integration
- Bot development
- File sharing and reporting
- User activity tracking
- Server monitoring

## Contributing

Contributions are welcome! Please see the main README for contribution guidelines and development setup.

## License

MIT License - see LICENSE file for details.

---

## Type Definitions

### SendArgs Interface

```typescript
interface SendArgs {
  content?: string;        // Plain text message (outside embed)
  text?: string;           // Legacy alias for content
  title?: string;          // Embed title
  description?: string;     // Embed description
  color?: number;          // Embed color (hex)
  fields?: DiscordField[]; // Embed fields
  timestamp?: string;      // Embed timestamp
  thread_id?: string;       // Post to existing thread instead of creating new one
  footer?: { text: string; icon_url?: string; };
  thumbnail?: { url: string; };
  image?: { url: string; };
  author?: { name: string; url?: string; icon_url?: string; };
  url?: string;            // URL for embed title
  tags?: string[];         // Forum tag names (not IDs) - will be resolved to IDs if botToken is available
  forumChannelId?: string; // Override forum channel ID per call (optional)
}
```

### DiscordField Interface

```typescript
interface DiscordField {
  name: string;
  value: string;
  inline?: boolean;
}
```

### FileAttachment Interface

```typescript
interface FileAttachment {
  name: string;
  data: Uint8Array | string;
  contentType?: string;
}
```

### ForumConfig Interface

```typescript
interface ForumConfig {
  defaultForumChannelId?: string;
  autoCreateTags?: boolean;
  onMissingBot?: 'fallbackToWebhook' | 'ignoreTags' | 'throw';
  tagsFieldMode?: 'field' | 'footer' | 'none';
  tagCacheTtlMs?: number;
}
```

**Note:** The `tags` field in `SendArgs` accepts tag **names** (not IDs). When `botToken` is provided, these are automatically resolved to tag IDs. When `botToken` is missing, tags are displayed as metadata based on `tagsFieldMode`.

## Related Links

- [NPM Package](https://www.npmjs.com/package/discord-notify)
- [Main Documentation](index.html)
- [TypeDoc Reference](api/)
- [Changelog](https://github.com/Devlander-Software/discord-notify/blob/main/CHANGELOG.md)
- [GitHub Issues](https://github.com/Devlander-Software/discord-notify/issues)
- [Discord Community](https://bit.ly/devlander-discord-invite)
- [Bot Permissions Guide](https://github.com/Devlander-Software/discord-notify/blob/main/BOT_PERMISSIONS.md) 