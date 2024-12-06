# Diary test app

## Description

This is a small diary app built with Expo and Tamagui made for a technical interview.

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

## Features

- [x] Add a new diary entry with a title, content.
- [x] View all diary entries.
- [x] View a single diary entry.
- [x] Edit a diary entry.
- [x] Delete a diary entry.
- [x] Add labels to a diary entry.
- [x] Filter diary entries by content or title.
- [x] Add an image to a diary entry.
- [ ] Add audio notes (TODO)
- [ ] Add icon & splash screen (TODO)
- [ ] Add animations (TODO)

## Remaining tasks

- [ ] Use tamagui theme properly for colors
- [ ] Fix bug when keyboard is open
- [ ] Display modals properly on android

## Screenshots

| Page             | iOS                                               | Android                                                   |
| ---------------- | ------------------------------------------------- | --------------------------------------------------------- |
| Homepage         | ![Homepage iOS](./screenshots/ios-home.png)       | ![Homepage Android](./screenshots/android-home.png)       |
| Diary Entry Page | ![Entry iOS](./screenshots/ios-entry-details.png) | ![Entry Android](./screenshots/android-entry-details.png) |
| New Entry Page   | ![New Entry iOS](./screenshots/ios-new-entry.png) | ![New Entry Android](./screenshots/android-new-entry.png) |
| Settings Page    | ![Settings iOS](./screenshots/ios-settings.png)   | ![Settings Android](./screenshots/android-settings.png)   |
