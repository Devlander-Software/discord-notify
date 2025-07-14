#!/usr/bin/env node

/**
 * TypeScript Discord Notify Example
 * 
 * This example demonstrates how to use discord-notify with full TypeScript
 * type safety and modern TypeScript features.
 */

import DiscordNotifyFactory, { 
  DiscordNotifyConfig, 
  SendArgs, 
  DiscordField, 
  FileAttachment 
} from 'discord-notify';

// Type-safe configuration
const config: DiscordNotifyConfig = {
  webhookUrl: process.env['DISCORD_WEBHOOK_URL'] || 'https://discord.com/api/webhooks/test',
  appName: 'TypeScript Example App',
  environment: (process.env['NODE_ENV'] as 'development' | 'production' | 'test') || 'development',
  username: 'TypeScript Bot',
  avatarUrl: 'https://via.placeholder.com/64x64/3178c6/ffffff?text=TS'
};

// Create notifier instance with full type safety
const notifier = DiscordNotifyFactory(config);

// Type-safe notification functions
class NotificationService {
  private notifier = notifier;

  async sendUserRegistration(user: { username: string; email: string; plan: string }): Promise<void> {
    const fields: DiscordField[] = [
      { name: 'Username', value: user.username, inline: true },
      { name: 'Email', value: user.email, inline: true },
      { name: 'Plan', value: user.plan, inline: true },
      { name: 'Registration Time', value: new Date().toLocaleString(), inline: false }
    ];

    const notification: SendArgs = {
      title: 'New User Registration',
      description: `User ${user.username} has registered successfully`,
      color: 0x00ff00,
      fields,
      thumbnail: {
        url: 'https://via.placeholder.com/150x150/00ff00/ffffff?text=👤'
      }
    };

    await this.notifier.success(notification);
  }

  async sendSystemAlert(alert: { type: 'warning' | 'error' | 'info'; message: string; details?: string }): Promise<void> {
    const fields: DiscordField[] = [
      { name: 'Alert Type', value: alert.type.toUpperCase(), inline: true },
      { name: 'Timestamp', value: new Date().toISOString(), inline: true }
    ];

    if (alert.details) {
      fields.push({ name: 'Details', value: alert.details, inline: false });
    }

    const notification: SendArgs = {
      title: 'System Alert',
      description: alert.message,
      fields,
      color: this.getAlertColor(alert.type)
    };

    switch (alert.type) {
      case 'warning':
        await this.notifier.alert(notification);
        break;
      case 'error':
        await this.notifier.error(notification);
        break;
      case 'info':
        await this.notifier.info(notification);
        break;
    }
  }

  async sendDeploymentStatus(deployment: {
    version: string;
    environment: string;
    status: 'success' | 'failed' | 'in-progress';
    duration?: string;
    commitHash?: string;
  }): Promise<void> {
    const fields: DiscordField[] = [
      { name: 'Version', value: deployment.version, inline: true },
      { name: 'Environment', value: deployment.environment, inline: true },
      { name: 'Status', value: deployment.status.toUpperCase(), inline: true }
    ];

    if (deployment.duration) {
      fields.push({ name: 'Duration', value: deployment.duration, inline: true });
    }

    if (deployment.commitHash) {
      fields.push({ name: 'Commit', value: deployment.commitHash.substring(0, 8), inline: true });
    }

    const notification: SendArgs = {
      title: 'Deployment Status',
      description: `Deployment ${deployment.status === 'success' ? 'completed' : deployment.status === 'failed' ? 'failed' : 'in progress'}`,
      fields,
      color: this.getDeploymentColor(deployment.status),
      author: {
        name: 'CI/CD Pipeline',
        url: 'https://github.com/example/repo',
        icon_url: 'https://via.placeholder.com/32x32/0099ff/ffffff?text=🚀'
      }
    };

    switch (deployment.status) {
      case 'success':
        await this.notifier.success(notification);
        break;
      case 'failed':
        await this.notifier.error(notification);
        break;
      case 'in-progress':
        await this.notifier.info(notification);
        break;
    }
  }

  async sendLogFile(logs: string[], filename: string): Promise<void> {
    const logContent = logs.join('\n');
    const logBuffer = new TextEncoder().encode(logContent);

    const file: FileAttachment = {
      name: filename,
      data: logBuffer,
      contentType: 'text/plain'
    };

    const notification: SendArgs = {
      title: 'Log Report',
      description: `Log file for ${new Date().toLocaleDateString()}`,
      color: 0x0099ff,
      fields: [
        { name: 'Log Entries', value: logs.length.toString(), inline: true },
        { name: 'File Size', value: `${(logBuffer.length / 1024).toFixed(2)} KB`, inline: true }
      ]
    };

    await this.notifier.sendFile(notification, file);
  }

  async sendThreadUpdate(threadId: string, update: { title: string; message: string; priority: 'low' | 'medium' | 'high' }): Promise<void> {
    const notification: SendArgs = {
      title: update.title,
      description: update.message,
      color: this.getPriorityColor(update.priority),
      fields: [
        { name: 'Priority', value: update.priority.toUpperCase(), inline: true },
        { name: 'Thread ID', value: threadId, inline: true }
      ]
    };

    await this.notifier.sendToThread(notification, threadId);
  }

  private getAlertColor(type: 'warning' | 'error' | 'info'): number {
    switch (type) {
      case 'warning': return 0xffa500;
      case 'error': return 0xff0000;
      case 'info': return 0x00ccff;
    }
  }

  private getDeploymentColor(status: 'success' | 'failed' | 'in-progress'): number {
    switch (status) {
      case 'success': return 0x00ff00;
      case 'failed': return 0xff0000;
      case 'in-progress': return 0xffff00;
    }
  }

  private getPriorityColor(priority: 'low' | 'medium' | 'high'): number {
    switch (priority) {
      case 'low': return 0x00ff00;
      case 'medium': return 0xffa500;
      case 'high': return 0xff0000;
    }
  }
}

// Example usage with type safety
async function demonstrateTypeScriptFeatures(): Promise<void> {
  console.log('🚀 Discord Notify TypeScript Example');
  console.log('=====================================\n');

  const notificationService = new NotificationService();

  try {
    // Test user registration
    console.log('👤 Testing user registration...');
    await notificationService.sendUserRegistration({
      username: 'typescript_user',
      email: 'user@example.com',
      plan: 'Premium'
    });

    // Test system alerts
    console.log('\n⚠️  Testing system alerts...');
    await notificationService.sendSystemAlert({
      type: 'warning',
      message: 'High memory usage detected',
      details: 'Memory usage is at 85%'
    });

    await notificationService.sendSystemAlert({
      type: 'error',
      message: 'Database connection failed',
      details: 'Connection timeout after 30 seconds'
    });

    // Test deployment status
    console.log('\n🚀 Testing deployment status...');
    await notificationService.sendDeploymentStatus({
      version: 'v2.1.0',
      environment: 'production',
      status: 'success',
      duration: '2m 34s',
      commitHash: 'abc123def456'
    });

    // Test log file sending
    console.log('\n📄 Testing log file sending...');
    const sampleLogs = [
      '[2024-01-15T10:00:00Z] INFO: Application started',
      '[2024-01-15T10:00:01Z] INFO: Database connected',
      '[2024-01-15T10:00:02Z] WARN: High CPU usage',
      '[2024-01-15T10:00:03Z] ERROR: Network timeout'
    ];
    await notificationService.sendLogFile(sampleLogs, 'app-logs.txt');

    // Test thread updates
    console.log('\n🧵 Testing thread updates...');
    const threadId = process.env['DISCORD_THREAD_ID'] || '1234567890123456789';
    await notificationService.sendThreadUpdate(threadId, {
      title: 'Bug Fix Update',
      message: 'Fixed authentication issue in login flow',
      priority: 'high'
    });

    console.log('\n🎉 All TypeScript examples completed successfully!');
    console.log('\n📝 Note: If you see warnings about invalid webhook URLs,');
    console.log('   that\'s expected behavior. Set DISCORD_WEBHOOK_URL');
    console.log('   environment variable to see real notifications.');

  } catch (error) {
    console.error('❌ TypeScript example failed:', error);
    throw error;
  }
}

// Main execution
if (require.main === module) {
  demonstrateTypeScriptFeatures().catch((error) => {
    console.error('❌ Example failed:', error.message);
    process.exit(1);
  });
}

export { NotificationService, demonstrateTypeScriptFeatures }; 