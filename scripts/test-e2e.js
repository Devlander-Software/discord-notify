#!/usr/bin/env node

/**
 * E2E Installation Test Runner
 * 
 * This script runs comprehensive end-to-end tests that:
 * - Create temporary projects
 * - Install discord-notify from NPM
 * - Test functionality in different environments
 * - Verify package compatibility
 */

const { spawn } = require('child_process');
const { join } = require('path');

console.log('🚀 Discord Notify E2E Installation Test Runner');
console.log('==============================================\n');

// Check if we're in the right directory
const packageJsonPath = join(__dirname, '..', 'package.json');
try {
  require(packageJsonPath);
} catch (error) {
  console.error('❌ Error: Must run from project root directory');
  process.exit(1);
}

// Run the E2E tests
async function runE2ETests() {
  const testPath = join(__dirname, '..', 'tests', 'e2e-installation.test.ts');
  
  console.log('📋 Running E2E Installation Tests...\n');
  
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['ts-node', testPath], {
      stdio: 'inherit',
      shell: true,
      cwd: join(__dirname, '..')
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log('\n🎉 All E2E tests passed!');
        resolve();
      } else {
        console.log(`\n❌ E2E tests failed with code ${code}`);
        reject(new Error(`E2E tests failed with code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      console.error('❌ Failed to run E2E tests:', error);
      reject(error);
    });
  });
}

// Main execution
async function main() {
  try {
    await runE2ETests();
    process.exit(0);
  } catch (error) {
    console.error('❌ E2E test runner failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runE2ETests }; 