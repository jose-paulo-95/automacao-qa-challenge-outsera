require('dotenv').config();

const platform = process.env.MOBILE_PLATFORM || 'Android';
const deviceName = process.env.MOBILE_DEVICE_NAME || 'emulator-5554';
const appPath = process.env.MOBILE_APP_PATH || './mobile-tests/apps/app.apk';
const automationName = process.env.MOBILE_AUTOMATION_NAME || 'UiAutomator2';

const androidCapabilities = {
  platformName: 'Android',
  'appium:platformVersion': '11.0',
  'appium:deviceName': deviceName,
  'appium:app': appPath,
  'appium:automationName': automationName,
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 300,
  'appium:autoGrantPermissions': true
};

const iosCapabilities = {
  platformName: 'iOS',
  'appium:platformVersion': '15.0',
  'appium:deviceName': 'iPhone 13',
  'appium:app': './mobile-tests/apps/app.ipa',
  'appium:automationName': 'XCUITest',
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 300
};

exports.config = {
  capabilities: platform === 'iOS' ? [iosCapabilities] : [androidCapabilities]
};

