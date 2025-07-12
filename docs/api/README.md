**Discord Notify API Documentation v1.0.1**

***

# Discord Notify API Documentation

## Overview

Discord Notify is a comprehensive notification service for Discord webhooks, inspired by popular Slack notification libraries but designed specifically for Discord's rich API capabilities.

### Key Features

- **Discord API Compliant** - Full webhook payload support
- **Rich Embed Support** - Fields, thumbnails, images, and authors
- **File Attachments** - Send files with notifications
- **Thread Support** - Organized conversations in Discord threads
- **TypeScript Support** - Full type definitions and IntelliSense
- **Zero Dependencies** - Lightweight and fast
- **Error Handling** - Comprehensive error management

### Inspiration

This package was inspired by popular Slack notification libraries like:
- `@slack/webhook`
- `node-slack-notify`
- `slack-notify`

However, Discord Notify is specifically designed for Discord's rich webhook capabilities, including:
- Rich embeds with fields and formatting
- File attachments
- Thread support
- Username and avatar overrides
- Discord-specific API features

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
The package uses a factory pattern to create notifier instances with specific configurations.

### Discord Webhooks
Discord webhooks allow you to send messages to channels without needing a full bot. They're perfect for:
- Application monitoring
- Log forwarding
- Deployment notifications
- Error reporting

### Rich Embeds
Discord's rich embeds provide structured, visually appealing messages with:
- Titles and descriptions
- Fields with inline support
- Thumbnails and images
- Authors and footers
- Custom colors and timestamps

## API Structure

The main export is `DiscordNotifyFactory`, which creates a `DiscordNotifier` instance with the following methods:

- `send()` - Send custom messages
- `success()` - Send success notifications
- `error()` - Send error notifications
- `alert()` - Send alert notifications
- `info()` - Send info notifications
- `extend()` - Create extended notifiers
- `sendFile()` - Send files with notifications
- `sendToThread()` - Send to specific threads

## Configuration

The factory accepts a configuration object with:
- `webhookUrl` (required) - Discord webhook URL
- `appName` (optional) - Application name for footer
- `environment` (optional) - Environment for footer
- `username` (optional) - Override webhook username
- `avatarUrl` (optional) - Override webhook avatar
- `threadId` (optional) - Default thread ID

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
  title: 'Server Status',
  description: 'Current server metrics',
  fields: [
    { name: 'CPU', value: '45%', inline: true },
    { name: 'Memory', value: '67%', inline: true }
  ],
  color: 0x00ff00
});
```

### File Attachments
```typescript
await notifier.sendFile(
  { title: 'Error Log', description: 'Application errors' },
  {
    name: 'errors.log',
    data: 'Error details...',
    contentType: 'text/plain'
  }
);
```

## Error Handling

The package includes comprehensive error handling:
- Invalid webhook URLs
- Network failures
- Discord API errors
- Rate limiting
- File upload errors

All methods return detailed error information when available.

## TypeScript Support

Full TypeScript support with:
- Complete type definitions
- IntelliSense support
- Compile-time error checking
- Interface documentation

## Performance

- Zero external dependencies
- Uses native Node.js fetch
- Lightweight and fast
- Minimal memory footprint

## Contributing

Contributions are welcome! Please see the main README for contribution guidelines.

## License

MIT License - see LICENSE file for details.
