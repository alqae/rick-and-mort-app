<!-- Title -->
<h1 align="center">
  Rick And Mort App
</h1>


## Sections

- [Setting up the development environment](https://reactnative.dev/docs/environment-setup)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Build](#build)

## Screenshots

![Screenshot_1680197656](https://user-images.githubusercontent.com/78764117/228919287-599893af-198e-4ea7-8117-32933780a2cb.png)
![Screenshot_1680197716](https://user-images.githubusercontent.com/78764117/228919298-c235442d-5888-44fe-a932-64847041abb5.png)
![Screenshot_1680197721](https://user-images.githubusercontent.com/78764117/228919306-c0b0a163-288c-4f0b-80c0-f84fc536fbb8.png)

## Usage

- `npx create-react-native-app` Create a new React Native app.
- `yarn ios` -- (`react-native run-ios`) Build the iOS App (requires a MacOS computer).
- `yarn android` -- (`react-native run-android`) Build the Android App.
- `yarn web` -- (`expo start:web`) Run the website in your browser.

## Build
### Step 1. Generate a keystore
```
  keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
```

### Step 2. Adding Keystore to your project
Firstly, you need to copy the file your_key_name.keystore and paste it under the android/app directory in your React Native project folder.
![Screenshot 2023-03-30 at 12 42 57 PM](https://user-images.githubusercontent.com/78764117/228920151-efd04977-2e06-4645-8f62-00207f1e4277.png)

You need to open your android\app\build.gradle file and add the keystore configuration. There are two ways of configuring the project with keystore. First, the common and unsecured way:

```
android {
....
  signingConfigs {
    release {
      storeFile file('your_key_name.keystore')
      storePassword 'your_key_store_password'
      keyAlias 'your_key_alias'
      keyPassword 'your_key_file_alias_password'
    }
  }
  buildTypes {
    release {
      ....
      signingConfig signingConfigs.release
    }
  }
}
```

Therefore, you should make sure the signingConfigs block appears before buildTypes block to avoid unnecessary errors. Moreover, before going any further, make sure you have an assets folder under android/app/src/main/assets. If it’s not there, create one. Then run the following command to build the bundle.

```
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle 
--assets-dest android/app/src/main/res/
```

### Step 3. Release APK Generation
Place your terminal directory to android using then run the following command
- For Windows,
```
gradlew assembleRelease
```
- For Linux and Mac OSX:
```
./gradlew assembleRelease
```
