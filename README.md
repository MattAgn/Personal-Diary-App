# Diary app

## Description

This is a small personal diary app built with Expo and Tamagui made for a technical interview. It is based on the native iOS "Journal" app.
Constraints: 
- Technologies: use expo, jotai, tamagui
- Time to build: 7 days

## What it looks like

Video of the app in on iOS simulator:

https://github.com/user-attachments/assets/1b91a44b-0244-41e5-a794-7dab946572cc

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Build the app.

   ```bash
   npx expo run:android
   npx expo run:ios
   ```

   These commands will build the native app for Android and iOS. Run it every time you add a new native dependency or when you want to install the app on a new device.

3. Start the app by launching the Metro bundler

   ```bash
   npm start
   ```

> Warning: This app does not work on with Expo GO, step 2 is required.

### Audio feature on Android

On the Android emulator, you need to enable 'virtual microphone uses host audio input' in the developer options. Otherwise the audio will not be recorded.

## Features

- [x] Add a new diary entry with a title, content.
- [x] View all diary entries.
- [x] View a single diary entry.
- [x] Edit a diary entry.
- [x] Delete a diary entry.
- [x] Add labels to a diary entry.
- [x] Filter diary entries by content or title.
- [x] Add an image to a diary entry.
- [x] Export to PDF and share
- [x] Add a video to a diary entry and play it.
- [x] Add audio notes
- [x] Add animations (list, images)

## Screenshots 


| Page             | iOS                                               | Android                                                   |
| ---------------- | ------------------------------------------------- | --------------------------------------------------------- |
| Homepage         | ![Homepage iOS](./screenshots/ios-home.png)       | ![Homepage Android](./screenshots/android-home.png)       |
| Diary Entry Page | ![Entry iOS](./screenshots/ios-entry-details.png) | ![Entry Android](./screenshots/android-entry-details.png) |
| New Entry Page   | ![New Entry iOS](./screenshots/ios-new-entry.png) | ![New Entry Android](./screenshots/android-new-entry.png) |
| Settings Page    | ![Settings iOS](./screenshots/ios-settings.png)   | ![Settings Android](./screenshots/android-settings.png)   |
