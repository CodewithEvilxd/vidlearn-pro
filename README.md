# VidLearn Pro – YouTube Playlist Progress Tracker

Transform YouTube playlists into structured courses. Monitor your progress with interactive checkmarks, visual progress bars, duration tracking, and completion metrics.

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/CodewithEvilxd/vidlearn-pro)](https://github.com/CodewithEvilxd/vidlearn-pro/releases) [![Star on GitHub](https://img.shields.io/github/stars/CodewithEvilxd/vidlearn-pro?style=social)](https://github.com/CodewithEvilxd/vidlearn-pro/stargazers) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Open Issues](https://img.shields.io/github/issues/CodewithEvilxd/vidlearn-pro)](https://github.com/CodewithEvilxd/vidlearn-pro/issues) [![Pull Requests](https://img.shields.io/github/issues-pr/CodewithEvilxd/vidlearn-pro)](https://github.com/CodewithEvilxd/vidlearn-pro/pulls)

**VidLearn Pro** helps you stay organized while learning from YouTube playlists.

Instead of passively watching videos and forgetting your progress, you can turn any playlist into a structured online course. The extension integrates directly into YouTube, showing a progress bar, completion percentage, watched and total duration, and checkmarks for finished videos — giving you a clear view of your learning journey.

---

## 📚 Table of Contents

- [Why VidLearn Pro?](#why-vidlearn-pro)
- [✨ Features](#-features)
- [🚀 Installation & Usage](#-installation--usage)
- [📸 Screenshots](#-screenshots)
- [🌐 Browser Compatibility](#-browser-compatibility)
- [❓ FAQ](#-faq)
- [🔧 Troubleshooting](#-troubleshooting)
- [🛠️ For Developers](#️-for-developers)
  - [Contributing](#contributing)
  - [Running Locally](#running-locally)
  - [Project Structure](#project-structure)
- [🔐 Permissions Explained](#-permissions-explained)
- [📜 License](#-license)

---

## Why VidLearn Pro?

YouTube is a powerful place for self-learning — from coding tutorials to full university lectures.  
But since YouTube is designed for entertainment, not structured courses, it's easy to lose progress, skip videos, or lose consistency.

**VidLearn Pro** solves this by adding a clean progress-tracking layer to YouTube playlists, showing completion percentage, durations, and checkmarks to keep your learning organized, consistent, and motivating.

_Ready to use VidLearn Pro?_ Load the extension and start tracking your playlists.

---

## ✨ Features

- 📊 **Visual Progress Bar** – Instantly see how much of a playlist you've completed.
- ✅ **Video Checkmarks** – Mark videos as finished to keep your learning on track.
- ⏱️ **Duration Tracking** – Know your watched and total time to plan your study sessions better.
- 🔄 **Dynamic Playlist Scanning** – Automatically detects videos in the playlist.
- 💾 **Saved Locally** – Your progress stays saved in your browser, no sign-up needed.
- 📤 **Export Courses** – Download your course data as JSON for backup.
- 🔄 **Mark All as Watched** – Instantly complete all videos in a course.
- ↩️ **Reset Progress** – Clear progress for a fresh start on any course.

_All features appear seamlessly inside YouTube's interface._

**Preview of Features:**

![VidLearn Pro Features](https://github.com/user-attachments/assets/8c127ea8-cd61-4033-bd51-6ad586f467b0)

---

## 🚀 Installation & Usage

### Installation

1. **Download the Extension:**
   - Visit the [GitHub Releases](https://github.com/CodewithEvilxd/vidlearn-pro/releases) page.
   - Download the latest `.zip` file for your browser.

2. **Load in Browser:**
   - **Chrome/Edge:** Go to `chrome://extensions/` (or `edge://extensions/`), enable Developer Mode, and load the unpacked extension.
   - **Firefox:** Go to `about:addons`, click the gear icon, select "Install Add-on From File", and choose the `.xpi` file.

3. **Enable:** The extension is now installed and ready to use.

### Usage

1. Navigate to any YouTube playlist page.
2. Click the **"Start Course"** button near the playlist title.
3. The progress bar and checkboxes will appear automatically.

**Additional Features:**
- Use the **📤 Export** button in the popup to backup your courses.
- **Reset** or **Mark All as Watched** individual courses using the action buttons.
- All progress is saved locally in your browser.

For more details, visit the [GitHub repository](https://github.com/CodewithEvilxd/vidlearn-pro).

---

## 📸 Screenshots

### Playlist Page with Progress Tracking
![Playlist Page](https://github.com/user-attachments/assets/example-playlist.png)

### Popup Interface
![Popup](https://github.com/user-attachments/assets/example-popup.png)

---

## 🌐 Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Microsoft Edge
- ✅ Firefox (with minor limitations)
- ❌ Safari (Not supported)

---

## ❓ FAQ

**Q: Is my data stored anywhere?**  
A: No, all progress is saved locally in your browser. No accounts or servers involved.

**Q: Does it work on mobile?**  
A: Currently, only desktop browsers are supported.

**Q: Can I sync progress across devices?**  
A: Not yet, but export/import features are planned.

---

## 🔧 Troubleshooting

- **Extension not loading:** Ensure Developer Mode is enabled in your browser's extension settings.
- **Progress not saving:** Check if you have sufficient browser storage space.
- **UI not appearing:** Refresh the YouTube page after enabling the extension.

If issues persist, open an [issue](https://github.com/CodewithEvilxd/vidlearn-pro/issues) on GitHub.

---

## 🛠️ For Developers

This section provides information for anyone who wants to contribute to the project or run it locally.

### Contributing

Contributions are welcome! Bug fixes, feature suggestions, and pull requests are appreciated. For major changes, please open an issue first to discuss your ideas.

### Running Locally

Follow these steps to set up the project on your local machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CodewithEvilxd/vidlearn-pro.git
   ```
2. **Open Browser Extensions:** Navigate to `chrome://extensions/` in your browser.
3. **Enable Developer Mode:** Ensure the **Developer mode** toggle is switched on.
4. **Load the extension:** Click **"Load unpacked"** and select the `vidlearn-pro` folder you cloned.

> **Note:** Changes to the source code will only reflect after you reload the extension on the `chrome://extensions/` page.

### Project Structure

```
vidlearn-pro/
├── icons/          # Contains all extension icons.
├── src/            # Contains the main source code.
│   ├── background/ # Handles background tasks.
│   ├── content/    # Injects scripts directly into web pages.
│   └── popup/      # Code for the extension's popup window.
├── styles/         # Contains CSS files for UI elements injected onto pages.
└── manifest.json   # Chrome extension configuration file.
```

---

## 🔐 Permissions Explained

VidLearn Pro requests only the permissions it needs to function, nothing more.

| Permission         | Why It's Needed                                                        |
| :----------------- | :--------------------------------------------------------------------- |
| `storage`          | To save your playlist progress locally in the browser.                 |
| `webNavigation`    | To detect playlist pages so the extension can apply the correct logic. |
| `host_permissions` | To display the progress UI only on YouTube pages.                      |

**Privacy first:** No personal data is collected, stored, or transmitted.

## 📜 License

This project is licensed under the [GNU GPLv3 License](https://www.gnu.org/licenses/gpl-3.0.html).

See the [LICENSE](LICENSE) file for full details.

---

## 📝 Changelog

### v1.0.1
- Added export/import functionality.
- Improved UI responsiveness.
- Bug fixes for playlist detection.

For full changelog, see [Releases](https://github.com/CodewithEvilxd/vidlearn-pro/releases).
