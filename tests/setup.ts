// Test utilities for Discord Notify
export const mockDiscordResponse = (success: boolean = true, data?: any) => {
  if (success) {
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({ id: '123456789012345678', ...data }),
      text: () => Promise.resolve(JSON.stringify({ id: '123456789012345678', ...data }))
    });
  } else {
    return Promise.resolve({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: () => Promise.resolve({ error: 'Invalid webhook' }),
      text: () => Promise.resolve('Invalid webhook')
    });
  }
};

export const mockFetchError = (error: Error) => {
  return Promise.reject(error);
};

// Mock webhook URL for testing
export const TEST_WEBHOOK_URL = 'https://discord.com/api/webhooks/123456789/test'; 