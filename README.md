# Discord Notify - Discord Webhook Notification Service for Node.js

A powerful Discord API-compliant notification service for Node.js applications. Send beautiful, formatted notifications to Discord channels using webhooks with full Discord API compliance. Perfect for logging, monitoring, alerts, bot notifications, and team collaboration.

**Discord Notify** provides a modern, feature-rich Discord webhook notification service with zero dependencies and full TypeScript support.

## Package Statistics

[![npm downloads](https://img.shields.io/npm/dm/discord-notify.svg)](https://www.npmjs.com/package/discord-notify)  
[![npm version](https://img.shields.io/npm/v/discord-notify.svg)](https://www.npmjs.com/package/discord-notify)
[![Node.js version](https://img.shields.io/node/v/discord-notify.svg)](https://nodejs.org/)
[![License](https://img.shields.io/npm/l/discord-notify.svg)](https://opensource.org/licenses/MIT)

## Community and Support

[![Join Devlander on Discord](https://img.shields.io/badge/Discord-Devlander-%235865F2)](https://bit.ly/devlander-discord-invite)  
[![Join Devlander on Twitch](https://img.shields.io/twitch/status/devlander)](https://bit.ly/devlander-twitch)  
[![Reddit](https://img.shields.io/badge/Reddit-r%2Fsoftwareengineersutah-orange?logo=reddit)](https://www.reddit.com/r/softwareengineersutah/)
[![Follow Landon Johnson On Twitter](https://img.shields.io/twitter/follow/landonwjohnson.svg?style=social&label=Follow)](https://bit.ly/landonwjohnson-on-twitter)  
[![Join the discussion on Github](https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue)](https://github.com/orgs/Devlander-Software/discussions)

## Development Standards

[![Keep a Changelog](https://img.shields.io/badge/Keep%20a%20Changelog-1.0.0-brightgreen.svg)](https://keepachangelog.com/)
[![Semantic Versioning](https://img.shields.io/badge/Semantic%20Versioning-2.0.0-brightgreen.svg)](https://semver.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg)](https://conventionalcommits.org/)  

## Key Features

### Core Features
- **Simple and easy to use** - Get started in minutes with clean, intuitive API
- **Pre-built notification types** - Success, error, alert, info with custom colors
- **TypeScript support** - Full type definitions and IntelliSense
- **Zero dependencies** - Lightweight and fast, uses native Node.js fetch

### Discord-Specific Features
- **Rich embed support** - Fields, thumbnails, images, and authors (Discord exclusive)
- **File attachment support** - Direct file uploads without external hosting
- **Thread support** - Native Discord thread integration for organized conversations
- **Username and avatar overrides** - Full webhook customization for brand consistency
- **16-bit color support** - Rich color palette for better visual hierarchy
- **Discord API compliant** - Full webhook payload support with error handling

### Advanced Features
- **Configurable app name and environment** - Professional notifications with context
- **Extensible architecture** - Create custom notification workflows
- **Monitoring ready** - Perfect for application monitoring and alerts
- **CI/CD integration** - Works seamlessly with GitHub Actions, Jenkins, and more

## Installation

### Quick Install
```bash
npm install discord-notify
```

### Yarn Install
```bash
yarn add discord-notify
```

### PNPM Install
```bash
pnpm add discord-notify
```

## Use Cases

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

## Why Discord Notify?

Discord Notify is designed specifically for Discord's powerful webhook capabilities, providing features that make Discord notifications superior:

| Feature | Discord Notify |
|---------|---------------|
| **Rich Embeds** | Full support with fields, thumbnails, images |
| **File Attachments** | Direct file uploads without external hosting |
| **Thread Support** | Native thread integration for organized conversations |
| **Custom Colors** | 16-bit color support for better visual hierarchy |
| **Username/Avatar** | Full override support for brand consistency |
| **Message Structure** | Structured embeds with rich formatting |
| **API Compliance** | Full Discord API support with error handling |
| **Performance** | Zero dependencies using native Node.js fetch |

**Discord Notify** provides a modern, feature-rich notification experience designed specifically for Discord's capabilities.

## Modern Discord Notifications

### Built for Discord
Discord Notify was designed from the ground up to leverage Discord's powerful webhook capabilities, providing features that make Discord notifications superior to traditional notification systems.

### Key Advantages
Discord Notify takes full advantage of Discord's modern features:

- **Rich Embeds** with structured data and formatting
- **16-bit Color Support** for better visual hierarchy
- **Direct File Attachments** for seamless sharing
- **Native Thread Support** for organized conversations
- **Full Username/Avatar Override** for brand consistency
- **Zero Dependencies** for lightweight, fast performance

### The Result
A notification service that's specifically designed for Discord's capabilities, providing rich, engaging notifications with modern development practices.

## Manual Setup
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
await notifier.success('Webhook is working!');
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
        { name: 'Database', value: 'Connected', inline: true },
        { name: 'Server', value: 'Healthy', inline: true },
        { name: 'Response Time', value: `${dbStatus.responseTime}ms`, inline: true }
      ]
    }, monitoringThreadId);
  } else {
    await notifier.sendToThread({
      title: 'Health Check Failed',
      description: 'Issues detected in system',
      color: 0xff0000,
      fields: [
        { name: 'Database', value: dbStatus.connected ? 'Connected' : 'Failed', inline: true },
        { name: 'Server', value: serverStatus.healthy ? 'Healthy' : 'Issues', inline: true },
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

Sends a success notification with green color and success emoji.

#### `error(args: string | SendArgs): Promise<void>`

Sends an error notification with red color and error emoji.

#### `alert(args: string | SendArgs): Promise<void>`

Sends an alert notification with orange color and warning emoji.

#### `info(args: string | SendArgs): Promise<void>`

Sends an info notification with light blue color and info emoji.

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

# E2E installation tests
npm run test:e2e

# All tests
npm run test:full
```

## Examples

Check out the [examples directory](./examples/) for complete working examples:

- [Basic Usage Example](./examples/basic-usage/) - CommonJS example with comprehensive features
- [TypeScript Usage Example](./examples/typescript-usage/) - Full TypeScript example with type safety

## Contributing

Contributions are welcome! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/discord-notify.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes and add tests
6. Run tests: `npm run test:full`
7. Commit your changes: `git commit -m 'feat: add amazing feature'`
8. Push to your fork: `git push origin feature/amazing-feature`
9. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

- **Documentation**: [API Reference](./docs/API.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/discord-notify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/orgs/Devlander-Software/discussions)
- **Discord Community**: [Join our Discord](https://bit.ly/devlander-discord-invite)

## Related Projects

- [Discord.js](https://discord.js.org/) - Full Discord bot framework
- [Discord Webhooks](https://discord.com/developers/docs/resources/webhook) - Official Discord webhook documentation
- [Node.js Fetch API](https://nodejs.org/api/globals.html#fetch) - Native fetch implementation

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a complete list of changes and version history.

---

**Discord Notify** - Modern Discord notifications for Node.js applications. Built with TypeScript, zero dependencies, and full Discord API compliance. 