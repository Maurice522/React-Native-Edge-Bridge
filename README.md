# 📱 Expo Adobe Assurance Integration

This project is an [Expo](https://expo.dev) React Native app that integrates **Adobe Experience Platform Assurance** and allows connecting to an Assurance session via a custom link.  
It also demonstrates **trackAction** and **trackState** usage with a `HashMap` style payload.

---

## 🚀 Features
- Connect to Adobe Assurance using a user-provided link or a default link.
- Show popup if an Assurance session is already running.
- Send `trackAction` and `trackState` events.
- Support for `HashMap`-style payloads.
- Works on **physical devices** as well as emulators.

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies
```bash
npm install
If you get tslib missing errors when running, do the following:

bash
Copy
Edit
npx expo prebuild
npm install @adobe/react-native-aepcore @adobe/react-native-aepedgebridge tslib
npx react-native run-android
2️⃣ Configure Adobe App ID & Assurance Link
Open your main config file and update these values:

javascript
Copy
Edit
const DEFAULT_LINK = "YOUR ASSURANCE LINK HERE"; // Example: testadobe://?adb_validation_sessionid=xxxxxxxx
MobileCore.initializeWithAppId("YOUR APP ID HERE"); // Example: launch-xxxxxxxxxxxx
Where to find these:

App ID → In Adobe Launch / Data Collection UI, under your environment settings.

Assurance Link → In Adobe Assurance UI when you create a new session.

3️⃣ Run the App on Physical Device
Ensure PC and phone are on the same Wi-Fi network, then run:

bash
Copy
Edit
npx react-native run-android
Or, for Expo:

bash
Copy
Edit
npx expo start
Scan the QR code with the Expo Go app or your camera (if using a development build).

🛠 Using the App
Connect to Assurance

Click Connect to Assurance.

Enter your Assurance session link OR choose the default link.

If a session is already running, you'll see a popup.

Send Tracking Events

trackAction and trackState are available with custom data payloads.

📚 Useful Links
Adobe Assurance Documentation

Adobe Experience Platform Mobile SDK

Expo Documentation

React Native Docs

🧹 Reset Project (Optional)
bash
Copy
Edit
npm run reset-project
This moves the starter code to app-example and gives you a fresh app directory.