
# 🔍 Underlink Scanner Chrome Extension

## ✨ Features
- One-click page scanning
- Visual validation indicators:
  - ✅ Active links (green border)
  - ❌ Non-clickable underlines (red border)
- Lightweight (no page slowdown)
- No external dependencies

## 🚀 Quick Start
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/underlink-scanner.git
   ```
2. Load in Chrome:
   - Navigate to `chrome://extensions`
   - Enable Developer Mode (top-right)
   - Click "Load unpacked" and select the folder

## 🖥️ Usage
```mermaid
graph TD
    A[Click Extension] --> B[Scan Page]
    B --> C{Results}
    C -->|Valid Links| D[Green Borders]
    C -->|Decorative| E[Red Borders]
```

## 📸 Screenshots
| Interface | Results |
|-----------|---------|
|<img width="268" height="296" alt="link" src="https://github.com/user-attachments/assets/9a606d8d-ce6d-4350-97d6-027d7d5836f2" />| <img width="260" height="311" alt="link2" src="https://github.com/user-attachments/assets/2f4474b7-4239-4990-be4b-17e1512558c9" />|

## 📂 Files
```
underlink-scanner/
├── manifest.json
├── popup.html
├── popup.js
├── contentScript.js
└── README.md
```

## 📜 License
MIT © 2023 [Amine-ellafi] - See [LICENSE](LICENSE)

---
📬 **Contact**: amineellafi@isikef.u-jendouba.tn  
🔗 **GitHub**: https://github.com/Amine-ellafi


