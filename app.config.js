export default {
  name: 'penguin-mobile-autopass',
  slug: 'penguin-mobile-autopass',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'penguin-mobile-autopass',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.pederseo.penguinmobileautopass',
    googleServicesFile: './GoogleService-Info.plist'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.maggi.penguinmobileautopass',
    googleServicesFile: './google-services.json'
  },
  web: {
    favicon: './assets/images/icon.png'
  },
  plugins: [
    '@react-native-firebase/app',
    '@react-native-firebase/crashlytics',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static'
        }
      }
    ],
    'expo-router'
  ],
  experiments: {
    newArchEnabled: true
  }
};
