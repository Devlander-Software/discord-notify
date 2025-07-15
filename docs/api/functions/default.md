---
layout: page
title: DiscordNotifyFactory
description: Main factory function for creating Discord notifier instances
---

# DiscordNotifyFactory

The main factory function for creating Discord notifier instances with the specified configuration.

## Signature

```typescript
function DiscordNotifyFactory(config: DiscordNotifyConfig): DiscordNotifier
```

## Parameters

### config: DiscordNotifyConfig

Configuration options for the notifier instance.

**Required:**
- `webhookUrl` (string) - Your Discord webhook URL

**Optional:**
- `appName` (string) - Name of your application (default: 'Discord Notify')
- `environment` (string) - Environment name (default: 'development')
- `username` (string) - Override webhook username
- `avatarUrl` (string) - Override webhook avatar URL
- `threadId` (string) - Default thread ID for all messages

## Returns

A `DiscordNotifier` instance with the following methods:

- `send(args)` - Send basic notifications
- `success(args)` - Send success notifications (green)
- `error(args)` - Send error notifications (red)
- `alert(args)` - Send alert notifications (orange)
- `info(args)` - Send info notifications (blue)
- `sendFile(args, file)` - Send with file attachments
- `sendToThread(args, threadId)` - Send to specific threads
- `extend(args)` - Create multi-embed notifiers

## Examples

### Basic Usage

```typescript
import DiscordNotifyFactory from 'discord-notify';

const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL'
});

await notifier.success('Hello from Discord Notify!');
```

### With Custom Configuration

```typescript
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL',
  appName: 'My Awesome App',
  environment: 'production',
  username: 'My Bot',
  avatarUrl: 'https://example.com/bot-avatar.png'
});
```

### With Default Thread

```typescript
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL',
  threadId: '1234567890123456789'
});

// All messages will be sent to the specified thread
await notifier.send('This goes to the default thread');
```

## Error Handling

The factory function will throw errors for:

- **Invalid webhook URL** - Malformed or empty webhook URLs
- **Missing webhook URL** - No webhook URL provided
- **Invalid configuration** - Malformed configuration objects

```typescript
try {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'invalid-url'
  });
} catch (error) {
  console.error('Failed to create notifier:', error.message);
}
```

## TypeScript Support

Full TypeScript support with complete type definitions:

```typescript
import DiscordNotifyFactory, { 
  DiscordNotifyConfig, 
  DiscordNotifier 
} from 'discord-notify';

const config: DiscordNotifyConfig = {
  webhookUrl: 'https://discord.com/api/webhooks/...',
  appName: 'My App'
};

const notifier: DiscordNotifier = DiscordNotifyFactory(config);
```

## Related

- [DiscordNotifyConfig](../interfaces/DiscordNotifyConfig.md)
- [DiscordNotifier](../interfaces/DiscordNotifier.md)
- [API Documentation](../../API.md) 