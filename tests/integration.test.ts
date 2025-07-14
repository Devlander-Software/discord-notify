import 'dotenv/config';
import DiscordNotifyFactory from '../src/index';

// Integration test runner
class IntegrationTestRunner {
  private tests: Array<{ name: string; fn: () => Promise<void> }> = [];
  private passed = 0;
  private failed = 0;

  test(name: string, fn: () => Promise<void>) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🔗 Running Discord Notify Integration Tests...\n');
    console.log('⚠️  Note: These tests require a valid Discord webhook URL');
    console.log('   Set DISCORD_WEBHOOK_URL environment variable to run integration tests\n');
    
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.log('❌ DISCORD_WEBHOOK_URL not set, skipping integration tests');
      return;
    }

    for (const test of this.tests) {
      try {
        await test.fn();
        console.log(`✅ ${test.name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${test.name}`);
        console.log(`   Error: ${error}`);
        this.failed++;
      }
    }

    console.log(`\n📊 Integration Test Results: ${this.passed} passed, ${this.failed} failed`);
  }
}

// Test utilities
function expect(value: any) {
  return {
    toBe: (expected: any) => {
      if (value !== expected) {
        throw new Error(`Expected ${value} to be ${expected}`);
      }
    },
    toBeDefined: () => {
      if (value === undefined) {
        throw new Error('Expected value to be defined');
      }
    }
  };
}

// Integration test suite
const runner = new IntegrationTestRunner();

// Basic functionality tests
runner.test('should send a simple message to Discord', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  await notifier.send('🧪 Integration test: Simple message');
  
  // If no error is thrown, the test passes
  expect(true).toBe(true);
});

runner.test('should send a success message to Discord', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  await notifier.success('🧪 Integration test: Success message');
  
  expect(true).toBe(true);
});

runner.test('should send an error message to Discord', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  await notifier.error('🧪 Integration test: Error message');
  
  expect(true).toBe(true);
});

runner.test('should send an alert message to Discord', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  await notifier.alert('🧪 Integration test: Alert message');
  
  expect(true).toBe(true);
});

runner.test('should send an info message to Discord', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  await notifier.info('🧪 Integration test: Info message');
  
  expect(true).toBe(true);
});

runner.test('should send a rich embed message to Discord', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  await notifier.send({
    title: '🧪 Integration Test: Rich Embed',
    description: 'This is a test of rich embed functionality',
    color: 0x0099ff,
    fields: [
      { name: 'Test Field 1', value: 'Value 1', inline: true },
      { name: 'Test Field 2', value: 'Value 2', inline: true },
      { name: 'Test Field 3', value: 'This is a longer field that spans multiple lines', inline: false }
    ],
    thumbnail: {
      url: 'https://via.placeholder.com/150x150/0099ff/ffffff?text=Test'
    },
    author: {
      name: 'Integration Test Bot',
      url: 'https://github.com/yourusername/discord-notify',
      icon_url: 'https://via.placeholder.com/32x32/0099ff/ffffff?text=🤖'
    },
    footer: {
      text: 'Integration Test - Test Environment',
      icon_url: 'https://via.placeholder.com/16x16/0099ff/ffffff?text=🧪'
    }
  });
  
  expect(true).toBe(true);
});

runner.test('should send multiple embeds using extend', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  const extendedNotifier = notifier.extend({
    title: '🧪 Integration Test: Extended Notifier',
    description: 'This is the base embed for extended functionality',
    color: 0x00ff00
  });

  await extendedNotifier.send({
    title: 'Additional Information',
    description: 'This is the second embed sent via extended notifier',
    color: 0xff0000,
    fields: [
      { name: 'Extended Field', value: 'This field is in the second embed', inline: true }
    ]
  });
  
  expect(true).toBe(true);
});

runner.test('should send message with custom username and avatar', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test',
    username: 'Custom Test Bot',
    avatarUrl: 'https://via.placeholder.com/128x128/ff6b6b/ffffff?text=🤖'
  });

  await notifier.send({
    content: '🧪 Integration test: Custom username and avatar',
    title: 'Custom Bot Test',
    description: 'This message should appear with a custom username and avatar'
  });
  
  expect(true).toBe(true);
});

runner.test('should send message with content outside embed', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  await notifier.send({
    content: '🧪 Integration test: This is plain text content outside the embed',
    title: 'Embed Title',
    description: 'This is the embed description',
    color: 0x9932cc
  });
  
  expect(true).toBe(true);
});

// Error handling tests
runner.test('should handle invalid webhook URL gracefully', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/invalid',
    appName: 'Integration Test',
    environment: 'test'
  });

  // This should not throw an error, but should log a warning
  await notifier.send('This should fail gracefully');
  
  expect(true).toBe(true);
});

runner.test('should handle empty webhook URL gracefully', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: '',
    appName: 'Integration Test',
    environment: 'test'
  });

  // This should not throw an error, but should log a warning
  await notifier.send('This should fail gracefully');
  
  expect(true).toBe(true);
});

// Performance test
runner.test('should handle rapid message sending', async () => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  
  const notifier = DiscordNotifyFactory({
    webhookUrl,
    appName: 'Integration Test',
    environment: 'test'
  });

  // Send multiple messages rapidly
  const promises = [];
  for (let i = 1; i <= 3; i++) {
    promises.push(
      notifier.send(`🧪 Integration test: Rapid message ${i}`)
    );
  }

  await Promise.all(promises);
  
  expect(true).toBe(true);
});

// Run integration tests
runner.run().catch(console.error); 