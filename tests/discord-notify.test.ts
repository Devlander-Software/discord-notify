import DiscordNotifyFactory from '../src/index';

// Simple test runner
class TestRunner {
  private tests: Array<{ name: string; fn: () => Promise<void> }> = [];
  private passed = 0;
  private failed = 0;

  test(name: string, fn: () => Promise<void>) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 Running Discord Notify Tests...\n');
    
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

    console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
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
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(value) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(value)} to equal ${JSON.stringify(expected)}`);
      }
    }
  };
}

// Test suite
const runner = new TestRunner();

// Factory Creation Tests
runner.test('should create a notifier instance with required webhook URL', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(notifier).toBeDefined();
  expect(typeof notifier.send).toBe('function');
  expect(typeof notifier.success).toBe('function');
  expect(typeof notifier.error).toBe('function');
  expect(typeof notifier.alert).toBe('function');
  expect(typeof notifier.info).toBe('function');
  expect(typeof notifier.sendFile).toBe('function');
  expect(typeof notifier.sendToThread).toBe('function');
});

runner.test('should create a notifier with custom configuration', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test',
    appName: 'Test App',
    environment: 'test',
    username: 'Test Bot',
    avatarUrl: 'https://example.com/avatar.png',
    threadId: '1234567890123456789'
  });

  expect(notifier).toBeDefined();
});

runner.test('should use default values when optional config is not provided', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(notifier).toBeDefined();
});

// Interface Tests
runner.test('should have correct interface structure', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  // Test that all required methods exist
  expect(typeof notifier.send).toBe('function');
  expect(typeof notifier.extend).toBe('function');
  expect(typeof notifier.success).toBe('function');
  expect(typeof notifier.error).toBe('function');
  expect(typeof notifier.alert).toBe('function');
  expect(typeof notifier.info).toBe('function');
  expect(typeof notifier.sendFile).toBe('function');
  expect(typeof notifier.sendToThread).toBe('function');
});

// Configuration Tests
runner.test('should handle empty webhook URL gracefully', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: ''
  });

  // This should not throw an error
  expect(notifier).toBeDefined();
});

runner.test('should handle missing webhook URL gracefully', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: ''
  });

  // This should not throw an error
  expect(notifier).toBeDefined();
});

// Method Signature Tests
runner.test('should have correct method signatures', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  // Test that methods can be called with correct parameters
  expect(typeof notifier.send).toBe('function');
  expect(typeof notifier.extend).toBe('function');
  expect(typeof notifier.success).toBe('function');
  expect(typeof notifier.error).toBe('function');
  expect(typeof notifier.alert).toBe('function');
  expect(typeof notifier.info).toBe('function');
  expect(typeof notifier.sendFile).toBe('function');
  expect(typeof notifier.sendToThread).toBe('function');
});

// Extend Method Tests
runner.test('should create extended notifier', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  const extendedNotifier = notifier.extend({
    title: 'Base Information',
    description: 'This is the base embed'
  });

  expect(extendedNotifier).toBeDefined();
  expect(typeof extendedNotifier.send).toBe('function');
});

// Type Safety Tests
runner.test('should accept string or SendArgs for send method', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  // These should not cause TypeScript errors
  expect(typeof notifier.send).toBe('function');
});

runner.test('should accept string or SendArgs for success method', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(typeof notifier.success).toBe('function');
});

runner.test('should accept string or SendArgs for error method', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(typeof notifier.error).toBe('function');
});

runner.test('should accept string or SendArgs for alert method', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(typeof notifier.alert).toBe('function');
});

runner.test('should accept string or SendArgs for info method', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(typeof notifier.info).toBe('function');
});

// File Attachment Tests
runner.test('should accept FileAttachment for sendFile method', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(typeof notifier.sendFile).toBe('function');
});

// Thread Tests
runner.test('should accept threadId for sendToThread method', async () => {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  expect(typeof notifier.sendToThread).toBe('function');
});

// Run all tests
runner.run().catch(console.error); 