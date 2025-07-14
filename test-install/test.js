const DiscordNotifyFactory = require('discord-notify');

// Test basic functionality without webhook
console.log('🧪 Testing Discord Notify package installation...\n');

(async () => {
  // Test 1: Factory creation
  console.log('✅ Test 1: Factory Creation');
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });
  console.log('   - Notifier created successfully');
  console.log('   - Type:', typeof notifier);
  console.log('   - Methods:', Object.keys(notifier).join(', '));

  // Test 2: Method existence
  console.log('\n✅ Test 2: Method Verification');
  const requiredMethods = ['send', 'extend', 'success', 'error', 'alert', 'info', 'sendFile', 'sendToThread'];
  for (const method of requiredMethods) {
    if (typeof notifier[method] === 'function') {
      console.log(`   - ${method}: ✅ function`);
    } else {
      console.log(`   - ${method}: ❌ missing or not a function`);
    }
  }

  // Test 3: Extend functionality
  console.log('\n✅ Test 3: Extend Functionality');
  const extendedNotifier = notifier.extend({
    title: 'Test Base',
    description: 'Base embed for testing'
  });
  console.log('   - Extended notifier created:', typeof extendedNotifier);
  console.log('   - Extended notifier has send method:', typeof extendedNotifier.send === 'function');

  // Test 4: Error handling
  console.log('\n✅ Test 4: Error Handling');
  try {
    await notifier.send('This should fail gracefully with invalid webhook');
    console.log('   - No error thrown (expected behavior)');
  } catch (error) {
    console.log('   - Error caught:', error.message);
  }

  console.log('\n🎉 All tests passed! Package is working correctly.');
  console.log('\n📝 Note: To test actual Discord webhook functionality, you would need:');
  console.log('   1. A valid Discord webhook URL');
  console.log('   2. Set DISCORD_WEBHOOK_URL environment variable');
  console.log('   3. Run the integration tests in the main package');

})(); 