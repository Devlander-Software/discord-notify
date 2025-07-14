# Discord Notify Examples

This directory contains example projects that demonstrate how to use `discord-notify` in real-world scenarios.

## 📁 Example Projects

### 1. Basic Usage (`basic-usage/`)
A simple CommonJS example showing basic notification functionality.

**Features:**
- Basic notification types (success, error, alert, info)
- Rich embeds with fields and thumbnails
- Error handling demonstrations
- File attachments
- Thread support
- Extended notifier usage

**Quick Start:**
```bash
cd examples/basic-usage
npm install
npm start
```

### 2. TypeScript Usage (`typescript-usage/`)
A comprehensive TypeScript example with full type safety.

**Features:**
- Full TypeScript type safety
- Class-based notification service
- Type-safe configuration
- Modern TypeScript features
- Comprehensive error handling
- Real-world use cases

**Quick Start:**
```bash
cd examples/typescript-usage
npm install
npm run build
npm start
```

## 🚀 Running Examples

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Discord webhook URL (optional, for real notifications)

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/discord-notify.git
   cd discord-notify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Discord webhook (optional):**
   ```bash
   export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"
   ```

### Running Examples

#### Basic Example
```bash
cd examples/basic-usage
npm install
npm start
```

#### TypeScript Example
```bash
cd examples/typescript-usage
npm install
npm run build
npm start
```

## 📋 What Each Example Demonstrates

### Basic Usage Example
- ✅ Simple string notifications
- ✅ Rich embed notifications
- ✅ Error handling with try/catch
- ✅ File attachments
- ✅ Thread support
- ✅ Extended notifier functionality

### TypeScript Example
- ✅ Full type safety
- ✅ Class-based architecture
- ✅ Type-safe configuration
- ✅ Union types for status/environment
- ✅ Comprehensive error handling
- ✅ Real-world notification patterns

## 🎯 Use Cases Demonstrated

### Application Monitoring
- System health checks
- Error reporting
- Performance alerts
- Resource usage monitoring

### User Activity Tracking
- User registrations
- Login events
- Account changes
- Activity summaries

### Deployment Notifications
- Build status updates
- Deployment progress
- Success/failure notifications
- Environment-specific alerts

### File Management
- Log file uploads
- Report generation
- Error log sharing
- Data exports

## 🔧 Customization

Each example can be customized by:

1. **Modifying the configuration:**
   ```javascript
   const config = {
     webhookUrl: 'YOUR_WEBHOOK_URL',
     appName: 'Your App Name',
     environment: 'production',
     username: 'Your Bot Name',
     avatarUrl: 'https://example.com/avatar.png'
   };
   ```

2. **Adding new notification types:**
   ```javascript
   // Custom notification function
   async function sendCustomNotification(data) {
     await notifier.send({
       title: 'Custom Event',
       description: data.message,
       color: 0x0099ff,
       fields: data.fields
     });
   }
   ```

3. **Integrating with your application:**
   ```javascript
   // In your Express.js app
   app.post('/webhook', async (req, res) => {
     try {
       await notifier.success('Webhook received successfully');
       res.json({ success: true });
     } catch (error) {
       await notifier.error('Webhook processing failed');
       res.status(500).json({ error: error.message });
     }
   });
   ```

## 🧪 Testing Examples

### Run E2E Tests
The main project includes comprehensive E2E tests that verify the examples work correctly:

```bash
# From the project root
npm run test:e2e
```

### Test Individual Examples
```bash
# Test basic example
cd examples/basic-usage
npm test

# Test TypeScript example
cd examples/typescript-usage
npm test
```

## 📚 Next Steps

After running the examples:

1. **Create your own webhook** in your Discord server
2. **Customize the configuration** for your application
3. **Integrate with your codebase** using the patterns shown
4. **Add error handling** specific to your needs
5. **Set up monitoring** for your notifications

## 🤝 Contributing

Want to add more examples? Here's how:

1. Create a new directory in `examples/`
2. Include a `package.json` with `discord-notify` dependency
3. Add comprehensive example code
4. Include a README explaining the example
5. Test the example works correctly

## 📖 Documentation

For more information, see:
- [Main README](../README.md)
- [API Documentation](../docs/API.md)
- [TypeScript Types](../src/index.ts)

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module 'discord-notify'"**
   - Run `npm install` in the example directory
   - Ensure you're in the correct directory

2. **"Invalid webhook URL"**
   - Set `DISCORD_WEBHOOK_URL` environment variable
   - Or use a valid Discord webhook URL

3. **TypeScript compilation errors**
   - Run `npm run build` in TypeScript examples
   - Check TypeScript version compatibility

4. **Permission errors**
   - Ensure Discord webhook has proper permissions
   - Check channel access for the webhook

### Getting Help

- [GitHub Issues](https://github.com/yourusername/discord-notify/issues)
- [Discord Community](https://bit.ly/devlander-discord-invite)
- [Documentation](../README.md) 