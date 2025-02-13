# Nextron Video App

This is a demo video upload and review application built using **Nextron (Electron + Next.js)**, Firebase Firestore for data storage, and Material UI (MUI) for the frontend.

## Project Overview

The app allows users to:
- Upload videos with thumbnails and descriptions
- View uploaded videos in a gallery
- Submit reviews and ratings for videos
- Reply to other users' reviews
- Filter and sort reviews by rating and date

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies
```bash
npm install
```
Or with yarn:
```bash
yarn install
```

### 3. Firebase Setup
This app uses Firebase Firestore for data storage.

#### Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Register a web app within the project.
4. Obtain your Firebase configuration object (API key, project ID, etc.).

#### Update `renderer/utils/firebase.ts`
Create the file `renderer/utils/firebase.ts` and configure it as follows:

```ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '<YOUR_API_KEY>',
  authDomain: '<YOUR_PROJECT_ID>.firebaseapp.com',
  projectId: '<YOUR_PROJECT_ID>',
  storageBucket: '<YOUR_PROJECT_ID>.appspot.com',
  messagingSenderId: '<YOUR_MESSAGING_SENDER_ID>',
  appId: '<YOUR_APP_ID>',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

### 4. Configure Firestore Security Rules
During development, you can set permissive rules:

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
Go to **Firestore Database > Rules** in the Firebase console to apply this.

### 5. Run the Application
```bash
npm run dev
```
Or with yarn:
```bash
yarn dev
```

This will start the Nextron app in development mode.

## Folder Structure
```
project-root/
│
├── main/              # Electron main process files
│
├── renderer/          # Next.js frontend
│   ├── components/    # React components
│   ├── pages/         # Next.js pages
│   ├── utils/         # Firebase setup and Firestore functions
│
├── package.json       # Nextron project configuration
```

## Key Functionalities

### Video Upload
- Upload a video file and thumbnail.
- Store video metadata (title, description, category, duration, thumbnail as base64 string) in Firestore.

### Video Listing
- Display uploaded videos with thumbnails, title, and description.

### Reviews
- Users can submit reviews and ratings for videos.
- Users can reply to other reviews.
- Reviews can be sorted by date or rating.

## Firestore Collections

### `videos`
Each document contains:
- `title` (string)
- `description` (string)
- `category` (string)
- `duration` (string)
- `thumbnail` (string - base64 data URL)
- `videoFile` (string - video filename or placeholder text)
- `isPublic` (boolean)

### `reviews`
Each document contains:
- `movieId` (string - ID of the video document)
- `movieTitle` (string)
- `rating` (number)
- `text` (string)
- `createdAt` (ISO string)
- `replies` (array of objects containing `id`, `text`, and `createdAt`)

## Testing the App
- Upload a video and thumbnail using the **Upload Page**.
- Navigate to the home page to view the uploaded videos.
- Click on a video to submit reviews and replies.
- Use the sort filter to organize reviews by date or rating.

## Troubleshooting
- Ensure your Firebase config is accurate.
- Ensure Firestore rules allow read/write.
- If thumbnails are large, you may hit Firestore's document size limit (1MB). Consider compressing images before converting them to base64.

## Recommended Tools
- Firebase Console: Monitor Firestore data and adjust rules.
- React Developer Tools: Inspect React component state and props.
- Nextron Documentation: [https://github.com/saltyshiomix/nextron](https://github.com/saltyshiomix/nextron)

---

