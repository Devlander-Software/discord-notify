#!/usr/bin/env ts-node

import DiscordNotifyFactory from '../src/index';

(async () => {
console.log('🧪 Testing Discord Notify Package...\n');

// Test 1: Factory Creation
console.log('✅ Test 1: Factory Creation');
try {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });
  
  console.log('   - Notifier created successfully');
  console.log('   - All methods present:', {
    send: typeof notifier.send,
    extend: typeof notifier.extend,
    success: typeof notifier.success,
    error: typeof notifier.error,
    alert: typeof notifier.alert,
    info: typeof notifier.info,
    sendFile: typeof notifier.sendFile,
    sendToThread: typeof notifier.sendToThread
  });
} catch (error) {
  console.log('   ❌ Failed:', error);
}

// Test 2: Configuration Options
console.log('\n✅ Test 2: Configuration Options');
try {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test',
    appName: 'Test App',
    environment: 'test',
    username: 'Test Bot',
    avatarUrl: 'https://example.com/avatar.png',
    threadId: '1234567890123456789'
  });
  
  console.log('   - Custom configuration applied successfully');
} catch (error) {
  console.log('   ❌ Failed:', error);
}

// Test 3: Interface Structure
console.log('\n✅ Test 3: Interface Structure');
try {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  const methods = ['send', 'extend', 'success', 'error', 'alert', 'info', 'sendFile', 'sendToThread'];
  const missingMethods = methods.filter(method => typeof (notifier as any)[method] !== 'function');
  
  if (missingMethods.length === 0) {
    console.log('   - All required methods present');
  } else {
    console.log('   ❌ Missing methods:', missingMethods);
  }
} catch (error) {
  console.log('   ❌ Failed:', error);
}

// Test 4: Extend Functionality
console.log('\n✅ Test 4: Extend Functionality');
try {
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  const extendedNotifier = notifier.extend({
    title: 'Base Information',
    description: 'This is the base embed'
  });

  if (typeof extendedNotifier.send === 'function') {
    console.log('   - Extended notifier created successfully');
  } else {
    console.log('   ❌ Extended notifier missing send method');
  }
} catch (error) {
  console.log('   ❌ Failed:', error);
}

// Test 5: Error Handling
console.log('\n✅ Test 5: Error Handling');
try {
  const notifier = DiscordNotifyFactory({
    webhookUrl: ''
  });

  // This should not throw an error
  await notifier.send('Test message');
  console.log('   - Empty webhook URL handled gracefully');
} catch (error) {
  console.log('   ❌ Failed:', error);
}

console.log('\n🎉 All tests completed!');
console.log('\n📝 Note: These are basic functionality tests.');
console.log('   For full integration testing, set DISCORD_WEBHOOK_URL environment variable');
console.log('   and run: npm run test:integration');
})(); 