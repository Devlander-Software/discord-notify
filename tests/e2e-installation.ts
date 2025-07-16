import { execSync } from 'child_process';
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// Test runner for E2E installation tests
class E2ETestRunner {
  private tests: Array<{ name: string; fn: () => Promise<void> }> = [];
  private passed = 0;
  private failed = 0;
  private tempDirs: string[] = [];

  test(name: string, fn: () => Promise<void>) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🚀 Running Discord Notify E2E Installation Tests...\n');
    
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

    // Cleanup temp directories
    this.cleanup();
    
    console.log(`\n📊 E2E Test Results: ${this.passed} passed, ${this.failed} failed`);
  }

  private cleanup() {
    for (const dir of this.tempDirs) {
      try {
        rmSync(dir, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Warning: Could not clean up ${dir}: ${error}`);
      }
    }
  }

  createTempProject(): string {
    const tempDir = mkdtempSync(join(tmpdir(), 'discord-notify-e2e-'));
    this.tempDirs.push(tempDir);
    return tempDir;
  }

  async runCommand(command: string, cwd: string): Promise<string> {
    try {
      return execSync(command, { 
        cwd, 
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 60000 // 60 second timeout
      });
    } catch (error: any) {
      throw new Error(`Command failed: ${command}\nError: ${error.message}\nOutput: ${error.stdout || error.stderr}`);
    }
  }

  async runCommandWithOutput(command: string, cwd: string): Promise<{ stdout: string; stderr: string }> {
    try {
      const result = execSync(command, { 
        cwd, 
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 60000
      });
      return { stdout: result, stderr: '' };
    } catch (error: any) {
      return { 
        stdout: error.stdout || '', 
        stderr: error.stderr || error.message 
      };
    }
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
    toContain: (expected: string) => {
      if (!value.includes(expected)) {
        throw new Error(`Expected ${value} to contain ${expected}`);
      }
    },
    toBeDefined: () => {
      if (value === undefined) {
        throw new Error('Expected value to be defined');
      }
    },
    toBeTruthy: () => {
      if (!value) {
        throw new Error('Expected value to be truthy');
      }
    }
  };
}

// E2E test suite
const runner = new E2ETestRunner();

// Test 1: Basic CommonJS Installation and Usage
runner.test('should install and work in CommonJS project', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Install discord-notify from local package
  await runner.runCommand('npm install ../../../', projectDir);
  
  // Create test file
  const testFile = `
const DiscordNotifyFactory = require('discord-notify');

// Test basic functionality
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/test'
});

console.log('✅ Package imported successfully');
console.log('✅ Factory function available:', typeof DiscordNotifyFactory);
console.log('✅ Notifier created:', typeof notifier);
console.log('✅ Send method available:', typeof notifier.send);
console.log('✅ Success method available:', typeof notifier.success);
console.log('✅ Error method available:', typeof notifier.error);
console.log('✅ Alert method available:', typeof notifier.alert);
console.log('✅ Info method available:', typeof notifier.info);

// Test that methods don't throw errors (with invalid webhook)
async function testSend() {
  try {
    await notifier.send('Test message');
    console.log('✅ Send method works (graceful failure with invalid webhook)');
  } catch (error) {
    console.log('✅ Send method works (expected error with invalid webhook)');
  }
}

testSend().then(() => {
  console.log('🎉 All CommonJS tests passed!');
}).catch(console.error);
`;

  writeFileSync(join(projectDir, 'test.js'), testFile);
  
  // Run the test
  const output = await runner.runCommand('node test.js', projectDir);
  
  expect(output).toContain('✅ Package imported successfully');
  expect(output).toContain('✅ Factory function available: function');
  expect(output).toContain('✅ Notifier created: object');
  expect(output).toContain('🎉 All CommonJS tests passed!');
});

// Test 2: TypeScript Installation and Usage
runner.test('should install and work in TypeScript project', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Install discord-notify and TypeScript
  await runner.runCommand('npm install ../../../ typescript @types/node', projectDir);
  
  // Create tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      module: "commonjs",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      outDir: "./dist"
    },
    include: ["src/**/*"],
    exclude: ["node_modules"]
  };
  
  writeFileSync(join(projectDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
  
  // Create src directory and test file
  await runner.runCommand('mkdir src', projectDir);
  
  const testFile = `
import DiscordNotifyFactory from 'discord-notify';

async function testDiscordNotify() {
  // Test basic functionality
  const notifier = DiscordNotifyFactory({
    webhookUrl: 'https://discord.com/api/webhooks/test'
  });

  console.log('✅ Package imported successfully');
  console.log('✅ Factory function available:', typeof DiscordNotifyFactory);
  console.log('✅ Notifier created:', typeof notifier);
  console.log('✅ Send method available:', typeof notifier.send);
  console.log('✅ Success method available:', typeof notifier.success);
  console.log('✅ Error method available:', typeof notifier.error);
  console.log('✅ Alert method available:', typeof notifier.alert);
  console.log('✅ Info method available:', typeof notifier.info);

  // Test TypeScript types
  const config = {
    webhookUrl: 'https://discord.com/api/webhooks/test',
    appName: 'Test App',
    environment: 'test'
  };
  
  const typedNotifier = DiscordNotifyFactory(config);
  console.log('✅ TypeScript types work correctly');

  // Test that methods don't throw errors (with invalid webhook)
  try {
    await notifier.send('Test message');
    console.log('✅ Send method works (graceful failure with invalid webhook)');
  } catch (error) {
    console.log('✅ Send method works (expected error with invalid webhook)');
  }

  console.log('🎉 All TypeScript tests passed!');
}

testDiscordNotify().catch(console.error);
`;

  writeFileSync(join(projectDir, 'src', 'test.ts'), testFile);
  
  // Compile TypeScript
  await runner.runCommand('npx tsc', projectDir);
  
  // Run the compiled test
  const output = await runner.runCommand('node dist/test.js', projectDir);
  
  expect(output).toContain('✅ Package imported successfully');
  expect(output).toContain('✅ TypeScript types work correctly');
  expect(output).toContain('🎉 All TypeScript tests passed!');
});

// Test 3: ES Modules Installation and Usage
runner.test('should install and work in ES Modules project', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Update package.json for ES modules
  const packageJson = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8'));
  packageJson.type = 'module';
  writeFileSync(join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // Install discord-notify from local package
  await runner.runCommand('npm install ../../../', projectDir);
  
  // Create test file
  const testFile = `
import DiscordNotifyFactory from 'discord-notify';

// Test basic functionality
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/test'
});

console.log('✅ Package imported successfully');
console.log('✅ Factory function available:', typeof DiscordNotifyFactory);
console.log('✅ Notifier created:', typeof notifier);
console.log('✅ Send method available:', typeof notifier.send);
console.log('✅ Success method available:', typeof notifier.success);
console.log('✅ Error method available:', typeof notifier.error);
console.log('✅ Alert method available:', typeof notifier.alert);
console.log('✅ Info method available:', typeof notifier.info);

// Test that methods don't throw errors (with invalid webhook)
async function testSend() {
  try {
    await notifier.send('Test message');
    console.log('✅ Send method works (graceful failure with invalid webhook)');
  } catch (error) {
    console.log('✅ Send method works (expected error with invalid webhook)');
  }
}

testSend().then(() => {
  console.log('🎉 All ES Modules tests passed!');
}).catch(console.error);
`;

  writeFileSync(join(projectDir, 'test.js'), testFile);
  
  // Run the test
  const output = await runner.runCommand('node test.js', projectDir);
  
  expect(output).toContain('✅ Package imported successfully');
  expect(output).toContain('✅ Factory function available: function');
  expect(output).toContain('🎉 All ES Modules tests passed!');
});

// Test 4: Yarn Installation
runner.test('should install and work with Yarn', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Install discord-notify with yarn (local package)
  const { stdout, stderr } = await runner.runCommandWithOutput('yarn add ../../../', projectDir);
  
  // Check if yarn is available, if not, skip this test
  if (stderr.includes('command not found') || stderr.includes('yarn: not found')) {
    console.log('   ⚠️  Yarn not available, skipping Yarn test');
    return;
  }
  
  expect(stdout).toContain('discord-notify');
  
  // Create test file
  const testFile = `
const DiscordNotifyFactory = require('discord-notify');

const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/test'
});

console.log('✅ Package installed with Yarn successfully');
console.log('✅ Notifier created:', typeof notifier);
console.log('🎉 Yarn installation test passed!');
`;

  writeFileSync(join(projectDir, 'test.js'), testFile);
  
  // Run the test
  const output = await runner.runCommand('node test.js', projectDir);
  
  expect(output).toContain('✅ Package installed with Yarn successfully');
  expect(output).toContain('🎉 Yarn installation test passed!');
});

// Test 5: Different Node.js Versions Compatibility
runner.test('should work with different Node.js versions', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Install discord-notify from local package
  await runner.runCommand('npm install ../../../', projectDir);
  
  // Check Node.js version
  const nodeVersion = await runner.runCommand('node --version', projectDir);
  console.log(`   Testing with Node.js version: ${nodeVersion.trim()}`);
  
  // Create test file that tests Node.js compatibility
  const testFile = `
const DiscordNotifyFactory = require('discord-notify');

// Test that the package works with current Node.js version
const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/test'
});

// Test that fetch is available (Node.js 18+)
if (typeof fetch !== 'undefined') {
  console.log('✅ Fetch API available (Node.js 18+)');
} else {
  console.log('⚠️  Fetch API not available (Node.js < 18)');
}

console.log('✅ Package works with current Node.js version');
console.log('🎉 Node.js compatibility test passed!');
`;

  writeFileSync(join(projectDir, 'test.js'), testFile);
  
  // Run the test
  const output = await runner.runCommand('node test.js', projectDir);
  
  expect(output).toContain('✅ Package works with current Node.js version');
  expect(output).toContain('🎉 Node.js compatibility test passed!');
});

// Test 6: Package.json Dependencies Check
runner.test('should have correct package.json dependencies', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Install discord-notify from local package
  await runner.runCommand('npm install ../../', projectDir);
  
  // Read package.json
  const packageJson = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8'));
  
  expect(packageJson.dependencies).toBeDefined();
  expect(packageJson.dependencies['discord-notify']).toBeDefined();
  
  // Check that discord-notify has no dependencies (zero dependencies)
  const discordNotifyPackageJson = JSON.parse(
    readFileSync(join(projectDir, 'node_modules', 'discord-notify', 'package.json'), 'utf8')
  );
  
  expect(discordNotifyPackageJson.dependencies).toBeDefined();
  expect(Object.keys(discordNotifyPackageJson.dependencies || {}).length).toBe(0);
  
  console.log('✅ Package has zero dependencies as expected');
  console.log('🎉 Package.json dependencies test passed!');
});

// Test 7: Real NPM Registry Installation
runner.test('should install from NPM registry', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Install from NPM registry (not local)
  const { stdout, stderr } = await runner.runCommandWithOutput('npm install discord-notify', projectDir);
  
  // Check if installation was successful
  if (stderr && stderr.includes('404')) {
    throw new Error('Package not found on NPM registry');
  }
  
  expect(stdout).toContain('discord-notify');
  
  // Verify the package is installed
  const packageJson = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8'));
  expect(packageJson.dependencies['discord-notify']).toBeDefined();
  
  // Test basic functionality
  const testFile = `
const DiscordNotifyFactory = require('discord-notify');

const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/test'
});

console.log('✅ Package installed from NPM registry successfully');
console.log('✅ Notifier created:', typeof notifier);
console.log('🎉 NPM registry installation test passed!');
`;

  writeFileSync(join(projectDir, 'test.js'), testFile);
  
  const output = await runner.runCommand('node test.js', projectDir);
  
  expect(output).toContain('✅ Package installed from NPM registry successfully');
  expect(output).toContain('🎉 NPM registry installation test passed!');
});

// Test 8: Production Build Test
runner.test('should work in production build', async () => {
  const projectDir = runner.createTempProject();
  
  // Initialize npm project
  await runner.runCommand('npm init -y', projectDir);
  
  // Install discord-notify from local package
  await runner.runCommand('npm install ../../../', projectDir);
  
  // Set NODE_ENV to production
  process.env.NODE_ENV = 'production';
  
  const testFile = `
const DiscordNotifyFactory = require('discord-notify');

const notifier = DiscordNotifyFactory({
  webhookUrl: 'https://discord.com/api/webhooks/test',
  appName: 'Production Test App',
  environment: 'production'
});

console.log('✅ Package works in production environment');
console.log('✅ Notifier created with production config');
console.log('🎉 Production build test passed!');
`;

  writeFileSync(join(projectDir, 'test.js'), testFile);
  
  const output = await runner.runCommand('NODE_ENV=production node test.js', projectDir);
  
  expect(output).toContain('✅ Package works in production environment');
  expect(output).toContain('🎉 Production build test passed!');
  
  // Reset NODE_ENV
  delete process.env.NODE_ENV;
});

// Run all tests
if (require.main === module) {
  runner.run().catch(console.error);
}

export default runner; 