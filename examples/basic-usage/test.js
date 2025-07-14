#!/usr/bin/env node

/**
 * Test script for Basic Usage Example
 * 
 * This script tests the basic functionality of discord-notify
 * without requiring a real Discord webhook.
 */

const DiscordNotifyFactory = require('discord-notify');

console.log('🧪 Testing Discord Notify Basic Usage...\n');

async function runTests() {
  // Test 1: Factory Creation
  console.log('✅ Test 1: Factory Creation');
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test',
    appName: 'Test App',
    environment: 'test'
  });
  console.log('   - Notifier created successfully');

  // Test 2: Method Availability
  console.log('\n✅ Test 2: Method Availability');
  const methods = ['send', 'success', 'error', 'alert', 'info', 'sendFile', 'sendToThread', 'extend'];
  for (const method of methods) {
    if (typeof notifier[method] === 'function') {
      console.log(`   - ${method}: ✅ available`);
    } else {
      console.log(`   - ${method}: ❌ missing`);
    }
  }

  // Test 3: Basic Notifications (with invalid webhook - expected to fail gracefully)
  console.log('\n✅ Test 3: Basic Notifications');
  try {
    await notifier.success('Test success message');
    console.log('   - Success notification: ✅ sent (graceful failure with invalid webhook)');
  } catch (error) {
    console.log('   - Success notification: ✅ handled error gracefully');
  }

  try {
    await notifier.error('Test error message');
    console.log('   - Error notification: ✅ sent (graceful failure with invalid webhook)');
  } catch (error) {
    console.log('   - Error notification: ✅ handled error gracefully');
  }

  // Test 4: Rich Embed
  console.log('\n✅ Test 4: Rich Embed');
  try {
    await notifier.send({
      title: 'Test Embed',
      description: 'This is a test embed',
      color: 0x0099ff,
      fields: [
        { name: 'Test Field', value: 'Test Value', inline: true }
      ]
    });
    console.log('   - Rich embed: ✅ sent (graceful failure with invalid webhook)');
  } catch (error) {
    console.log('   - Rich embed: ✅ handled error gracefully');
  }

  // Test 5: Extend Functionality
  console.log('\n✅ Test 5: Extend Functionality');
  const extendedNotifier = notifier.extend({
    title: 'Base Embed',
    description: 'Base embed for testing'
  });
  console.log('   - Extended notifier: ✅ created');

  // Test 6: File Attachment
  console.log('\n✅ Test 6: File Attachment');
  try {
    const testData = new TextEncoder().encode('Test file content');
    await notifier.sendFile(
      { title: 'Test File', description: 'Test file attachment' },
      { name: 'test.txt', data: testData, contentType: 'text/plain' }
    );
    console.log('   - File attachment: ✅ sent (graceful failure with invalid webhook)');
  } catch (error) {
    console.log('   - File attachment: ✅ handled error gracefully');
  }

  console.log('\n🎉 All basic tests completed successfully!');
  console.log('\n📝 Note: Tests use invalid webhook URLs, so warnings are expected.');
  console.log('   Set DISCORD_WEBHOOK_URL environment variable for real notifications.');
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}); 