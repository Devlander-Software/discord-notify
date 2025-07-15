---
layout: page
title: Discord Notify Documentation
description: A Discord API-compliant notification service for Node.js applications
---

# Discord Notify Documentation

Welcome to the Discord Notify documentation! This package provides a comprehensive Discord webhook notification service for Node.js applications, designed specifically for Discord's rich API capabilities.

## Quick Navigation

- **[API Documentation](API.md)** - Complete API reference with TypeScript interfaces
- **[TypeDoc Reference](api/)** - Automatically generated TypeDoc documentation
- **[GitHub Repository](https://github.com/Devlander-Software/discord-notify)** - Source code and issues
- **[NPM Package](https://www.npmjs.com/package/discord-notify)** - Install and use

## Quick Start

```typescript
import DiscordNotifyFactory from 'discord-notify';

const notifier = DiscordNotifyFactory({
  webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL'
});

await notifier.success('Hello from Discord Notify!');
```

## Key Features

- **Zero Dependencies** - Built with native Node.js fetch API
- **Rich Discord Features** - Embeds, file attachments, thread support
- **Full TypeScript Support** - Complete type definitions and IntelliSense
- **Simple API** - Get started in minutes with intuitive methods
- **Discord API Compliant** - Full webhook payload support

## Installation

```bash
npm install discord-notify
```

## Community

- [Discord Server](https://bit.ly/devlander-discord-invite)
- [GitHub Discussions](https://github.com/orgs/Devlander-Software/discussions)
- [Twitter](https://bit.ly/landonwjohnson-on-twitter) 