# Discord Notify API Documentation - Complete Guide

## Overview

Discord Notify is a comprehensive Discord webhook notification service for Node.js applications. Built with TypeScript and zero dependencies, it provides a modern alternative to Slack notification libraries, specifically designed for Discord's rich API capabilities and webhook features.

### Key Features

- **Discord API Compliant** - Full webhook payload support with error handling
- **Rich Embed Support** - Fields, thumbnails, images, and authors
- **File Attachments** - Direct file uploads without external hosting
- **Thread Support** - Organized conversations in Discord threads
- **TypeScript Support** - Full type definitions and IntelliSense
- **Zero Dependencies** - Lightweight and fast using native Node.js fetch
- **Error Handling** - Comprehensive error management and reporting

### Discord vs Slack Webhooks

This package was inspired by popular Slack notification libraries like:
- `@slack/webhook`
- `node-slack-notify`
- `slack-notify`

However, Discord Notify is specifically designed for Discord's superior webhook capabilities, including:
- Rich embeds with fields and formatting
- Direct file attachments
- Native thread support
- Username and avatar overrides
- Discord-specific API features
- 16-bit color support

## Quick Start

```typescript
import DiscordNotifyFactory from 'discord-notify';

const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL'
});

await notifier.success('Hello from Discord Notify!');
```

## Core Concepts

### Factory Pattern
The package uses a factory pattern to create notifier instances with specific configurations, allowing for multiple webhook configurations in a single application.

### Discord Webhooks
Discord webhooks allow you to send messages to channels without needing a full bot. They're perfect for:
- Application monitoring and alerts
- Log forwarding and error reporting
- Deployment notifications
- System monitoring
- Team collaboration
- CI/CD integration

### Rich Embeds
Discord's rich embeds provide structured, visually appealing messages with:
- Titles and descriptions
- Fields with inline support
- Thumbnails and images
- Authors and footers
- Custom colors and timestamps
- URL linking

## API Structure

The main export is `DiscordNotifyFactory`, which creates a `DiscordNotifier` instance with the following methods:

- `send()` - Send custom messages with rich embeds
- `success()` - Send success notifications with green styling
- `error()` - Send error notifications with red styling
- `alert()` - Send alert notifications with orange styling
- `info()` - Send info notifications with blue styling
- `extend()` - Create extended notifiers for multiple embeds
- `sendFile()` - Send files with notifications
- `sendToThread()` - Send to specific Discord threads

## Configuration

The factory accepts a configuration object with:
- `webhookUrl` (required) - Discord webhook URL
- `appName` (optional) - Application name for footer
- `environment` (optional) - Environment for footer
- `username` (optional) - Override webhook username
- `avatarUrl` (optional) - Override webhook avatar
- `threadId` (optional) - Default thread ID for all messages

## Examples

### Basic Usage
```typescript
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/...'
});

await notifier.success('Deployment completed successfully!');
```

### Rich Embeds
```typescript
await notifier.send({
  title: 'Server Status Report',
  description: 'Current server metrics and health status',
  fields: [
    { name: 'CPU Usage', value: '45%', inline: true },
    { name: 'Memory Usage', value: '67%', inline: true },
    { name: 'Disk Usage', value: '23%', inline: true },
    { name: 'Active Users', value: '1,234', inline: false }
  ],
  color: 0x00ff00,
  thumbnail: {
    url: 'https://example.com/server-icon.png'
  }
});
```

### File Attachments
```typescript
await notifier.sendFile(
  { title: 'Error Log Report', description: 'Application errors for today' },
  {
    name: 'errors.log',
    data: 'Error details...',
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

## Error Handling

The package includes comprehensive error handling:
- Invalid webhook URLs
- Network failures and timeouts
- Discord API errors and rate limiting
- File upload errors
- Malformed payload errors

All methods return detailed error information when available, making debugging easier.

## TypeScript Support

Full TypeScript support with:
- Complete type definitions for all interfaces
- IntelliSense support in modern IDEs
- Compile-time error checking
- Interface documentation and examples
- Generic type support for custom configurations

## Performance and Dependencies

- Zero external dependencies
- Uses native Node.js fetch API
- Lightweight and fast execution
- Minimal memory footprint
- Optimized for production use

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

## Contributing

Contributions are welcome! Please see the main README for contribution guidelines and development setup.

## License

MIT License - see LICENSE file for details. 