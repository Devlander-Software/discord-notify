---
name: Bug Report
about: Create a report to help us improve Discord Notify
title: 'fix: '
labels: ['bug', 'needs-triage']
assignees: ''
---

## 🐛 Bug Report

### Describe the bug
<!-- A clear and concise description of what the bug is. -->

### To Reproduce
<!-- Steps to reproduce the behavior: -->

1. **Environment Setup**
   ```bash
   # Node.js version
   node --version
   
   # Package version
   npm list discord-notify
   ```

2. **Code Example**
   ```typescript
   import DiscordNotifyFactory from 'discord-notify';
   
   const notifier = DiscordNotifyFactory({
     webhookUrl: 'YOUR_WEBHOOK_URL'
   });
   
   // The problematic code
   await notifier.send('This causes the bug');
   ```

3. **Expected vs Actual Behavior**
   - **Expected**: What should happen
   - **Actual**: What actually happens

### Error Messages
<!-- If applicable, add error messages, stack traces, or logs. -->

```
Error: [Paste the full error message here]
    at [Stack trace if available]
```

### Environment Information

#### System Details
- **OS**: [e.g., macOS 14.0, Ubuntu 22.04, Windows 11]
- **Node.js Version**: [e.g., v18.17.0]
- **Package Manager**: [e.g., npm 9.6.0, yarn 1.22.19, pnpm 8.6.0]

#### Package Information
```bash
# Discord Notify version
npm list discord-notify

# All dependencies
npm list --depth=0
```

#### Discord Setup
- **Webhook URL**: [Is it valid? Does it work in Discord?]
- **Channel Permissions**: [Does the webhook have proper permissions?]
- **Discord Server**: [Any specific Discord settings that might affect this?]

### Additional Context
<!-- Add any other context about the problem here. -->

---

## 🔍 Debugging Information

### Minimal Reproduction
<!-- Can you create a minimal example that reproduces the issue? -->

```typescript
// Minimal reproduction code
// Remove all unnecessary code and keep only what's needed to reproduce the bug
```

### Workaround
<!-- Is there a workaround that allows you to achieve the desired result? -->

### Related Issues
<!-- Have you found any similar issues in the repository? -->

---

## 📊 Impact Assessment

### Severity
- [ ] **Critical** - Breaks core functionality
- [ ] **High** - Major feature doesn't work
- [ ] **Medium** - Feature works but with issues
- [ ] **Low** - Minor inconvenience

### Frequency
- [ ] **Always** - Happens every time
- [ ] **Often** - Happens most of the time
- [ ] **Sometimes** - Happens occasionally
- [ ] **Rarely** - Happens infrequently

### Affected Features
<!-- Which Discord Notify features are affected? -->
- [ ] Basic notifications (`send()`)
- [ ] Pre-built notifications (`success()`, `error()`, etc.)
- [ ] Rich embeds
- [ ] File attachments
- [ ] Thread support
- [ ] TypeScript types
- [ ] Error handling

---

## 🧪 Testing

### Test Cases
<!-- What test cases would help reproduce this issue? -->

### Integration Tests
<!-- Does this issue occur in integration tests with Discord's API? -->

---

## 🔧 Technical Details

### Code Analysis
<!-- Any insights about what might be causing the issue? -->

### Network Issues
<!-- Are there any network-related problems? -->
- [ ] Discord API rate limiting
- [ ] Network connectivity issues
- [ ] Firewall/proxy issues
- [ ] DNS resolution problems

### Browser/Environment Issues
<!-- Are there any environment-specific issues? -->
- [ ] Specific Node.js version
- [ ] Specific OS
- [ ] Specific Discord server settings
- [ ] Specific webhook configuration

---

## 📝 Checklist

Before submitting this bug report, please ensure:

- [ ] I have searched existing issues to avoid duplicates
- [ ] I have provided a minimal reproduction example
- [ ] I have included all relevant environment information
- [ ] I have tested with the latest version of Discord Notify
- [ ] I have verified the Discord webhook URL is valid
- [ ] I have checked Discord server permissions
- [ ] I have provided clear error messages and stack traces

---

## 🚀 Quick Fix Attempts

### Common Solutions
<!-- Try these common solutions before reporting: -->

1. **Update to Latest Version**
   ```bash
   npm update discord-notify
   ```

2. **Check Webhook URL**
   ```bash
   # Test webhook manually
   curl -X POST -H "Content-Type: application/json" \
     -d '{"content":"test"}' \
     YOUR_WEBHOOK_URL
   ```

3. **Verify Discord Permissions**
   - Ensure webhook has "Send Messages" permission
   - Check if webhook is still active in Discord

4. **Check Network Connectivity**
   ```bash
   # Test Discord API connectivity
   curl -I https://discord.com/api/webhooks/
   ```

---

**Thank you for your bug report!** 🐛

This detailed information helps us quickly identify and fix issues to improve Discord Notify for everyone. 