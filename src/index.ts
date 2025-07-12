export interface DiscordNotifier {
  send(args: string | SendArgs): Promise<void>;
}

export interface DiscordNotify extends DiscordNotifier {
  extend(args: string | SendArgs): DiscordNotifier;
  success(args: string | SendArgs): Promise<void>;
  error(args: string | SendArgs): Promise<void>;
  alert(args: string | SendArgs): Promise<void>;
  info(args: string | SendArgs): Promise<void>;
  sendFile(args: string | SendArgs, file: FileAttachment): Promise<void>;
  sendToThread(args: string | SendArgs, threadId: string): Promise<void>;
}

export interface SendArgs {
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

export interface DiscordField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
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
  url?: string;
}

export interface FileAttachment {
  name: string;
  data: Uint8Array | string;
  contentType?: string;
}

export interface DiscordWebhookPayload {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: DiscordEmbed[];
  thread_id?: string;
  files?: FileAttachment[];
}

export interface DiscordNotifyConfig {
  webhookUrl: string;
  appName?: string;
  environment?: string;
  username?: string; // Override webhook username
  avatarUrl?: string; // Override webhook avatar
  threadId?: string; // Default thread ID for all messages
}

export interface DiscordWebhookResponse {
  success: boolean;
  status?: number;
  statusText?: string;
  error?: string;
  messageId?: string;
}

function DiscordNotifyFactory(config: DiscordNotifyConfig): DiscordNotify {
  const { 
    webhookUrl, 
    appName = 'Discord Notify', 
    environment = 'development',
    username,
    avatarUrl,
    threadId
  } = config;
  
  const defaultColor = 0x3180c6; // Blue
  const successColor = 0x36a64f; // Green
  const errorColor = 0xff0000;   // Red
  const warningColor = 0xffa500; // Orange
  const infoColor = 0x00ccff;    // Light Blue

  const sendWebhook = async (payload: DiscordWebhookPayload): Promise<DiscordWebhookResponse> => {
    if (!webhookUrl) {
      console.warn('Discord webhook URL not provided');
      return { success: false, error: 'Webhook URL not provided' };
    }

    try {
      const webhookPayload: DiscordWebhookPayload = {
        ...payload,
        username: payload.username || username,
        avatar_url: payload.avatar_url || avatarUrl,
        thread_id: payload.thread_id || threadId
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Discord webhook failed: ${response.status} ${response.statusText} - ${errorText}`);
        return {
          success: false,
          status: response.status,
          statusText: response.statusText,
          error: errorText
        };
      }

      // Discord returns the message object on success
      const messageData = await response.json();
      return {
        success: true,
        status: response.status,
        messageId: messageData.id
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending Discord webhook:', error);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const createEmbed = (args: string | SendArgs, color: number = defaultColor): DiscordEmbed => {
    if (typeof args === 'string') {
      return {
        description: args,
        color: color,
        timestamp: new Date().toISOString(),
        footer: {
          text: `${appName} - ${environment}`
        }
      };
    }

    return {
      title: args.title,
      description: args.description || args.text,
      color: args.color || color,
      fields: args.fields,
      timestamp: args.timestamp || new Date().toISOString(),
      footer: args.footer || {
        text: `${appName} - ${environment}`
      },
      thumbnail: args.thumbnail,
      image: args.image,
      author: args.author,
      url: args.url
    };
  };

  const notifier: DiscordNotify = {
    async send(args: string | SendArgs): Promise<void> {
      const embed = createEmbed(args);
      const content = typeof args === 'string' ? undefined : args.content;
      
      await sendWebhook({
        content,
        embeds: [embed]
      });
    },

    extend(args: string | SendArgs): DiscordNotifier {
      return {
        async send(extendArgs: string | SendArgs): Promise<void> {
          const baseEmbed = createEmbed(args);
          const extendEmbed = createEmbed(extendArgs);
          const content = typeof extendArgs === 'string' ? undefined : extendArgs.content;
          
          await sendWebhook({
            content,
            embeds: [baseEmbed, extendEmbed]
          });
        }
      };
    },

    async success(args: string | SendArgs): Promise<void> {
      const embed = createEmbed(args, successColor);
      embed.title = embed.title ? `✅ ${embed.title}` : '✅ Success';
      const content = typeof args === 'string' ? undefined : args.content;
      
      await sendWebhook({
        content,
        embeds: [embed]
      });
    },

    async error(args: string | SendArgs): Promise<void> {
      const embed = createEmbed(args, errorColor);
      embed.title = embed.title ? `🚨 ${embed.title}` : '🚨 Error';
      const content = typeof args === 'string' ? undefined : args.content;
      
      await sendWebhook({
        content,
        embeds: [embed]
      });
    },

    async alert(args: string | SendArgs): Promise<void> {
      const embed = createEmbed(args, warningColor);
      embed.title = embed.title ? `⚠️ ${embed.title}` : '⚠️ Alert';
      const content = typeof args === 'string' ? undefined : args.content;
      
      await sendWebhook({
        content,
        embeds: [embed]
      });
    },

    async info(args: string | SendArgs): Promise<void> {
      const embed = createEmbed(args, infoColor);
      embed.title = embed.title ? `ℹ️ ${embed.title}` : 'ℹ️ Info';
      const content = typeof args === 'string' ? undefined : args.content;
      
      await sendWebhook({
        content,
        embeds: [embed]
      });
    },

    async sendFile(args: string | SendArgs, file: FileAttachment): Promise<void> {
      const embed = createEmbed(args);
      const content = typeof args === 'string' ? undefined : args.content;
      
      await sendWebhook({
        content,
        embeds: [embed],
        files: [file]
      });
    },

    async sendToThread(args: string | SendArgs, threadId: string): Promise<void> {
      const embed = createEmbed(args);
      const content = typeof args === 'string' ? undefined : args.content;
      
      await sendWebhook({
        content,
        embeds: [embed],
        thread_id: threadId
      });
    }
  };

  return notifier;
}

export default DiscordNotifyFactory; 