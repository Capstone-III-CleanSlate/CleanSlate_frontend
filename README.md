# CleanSlate Frontend

CleanSlate is an AI-assisted Gmail cleanup extension that helps users review a
crowded inbox without surrendering control of their email. This repository
contains the React and Vite interface used in the Chrome side panel.

The frontend connects to the
[CleanSlate backend](https://github.com/Capstone-III-CleanSlate/CleanSlate_backend)
for Google authentication, Gmail access, Gemini classification, protected
senders, and email actions.

## Features

- Google sign-in through the extension and backend OAuth flow
- Animated scan stages for longer inbox scans
- Dynamic scan summaries for any categories returned by Gemini
- Email and conversation counts kept separate
- Category-level Accept, Review, and Trash actions
- Conversation selection with Accept, Keep in inbox, and Trash actions
- Paginated conversation lists with expandable snippets
- AI confidence percentages for classified conversations
- Protected-sender management with add and remove controls
- Responsive dark interface designed for Chrome's resizable side panel

## Action behavior

- **Accept** applies or creates the suggested Gmail label and archives the
  selected conversations.
- **Keep in inbox** declines the suggested classification and leaves the
  selected conversations in the inbox.
- **Trash** moves conversations to Gmail Trash. It does not permanently delete
  them.

## Requirements

- A current Node.js LTS release and npm
- Google Chrome or another Chromium browser with side-panel support
- A running CleanSlate backend
- A Google account allowed to use the backend's OAuth application

## Local setup

1. Clone the repository and enter the Vite application:

   ```bash
   git clone https://github.com/Capstone-III-CleanSlate/CleanSlate_frontend.git
   cd CleanSlate_frontend/CleanSlate_sidebar
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and set the backend URL:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Build the extension:

   ```bash
   npm run build
   ```

5. Open `chrome://extensions`, enable **Developer mode**, choose
   **Load unpacked**, and select `CleanSlate_sidebar/dist`.

6. Copy the generated extension ID into the backend `.env`:

   ```env
   EXTENSION_ORIGIN=chrome-extension://your-extension-id
   ```

7. Restart the backend after changing `EXTENSION_ORIGIN`, reload the extension,
   and click the CleanSlate extension icon to open its side panel.

Each unpacked copy can receive a different extension ID. Every developer should
use the ID shown on their own `chrome://extensions` page.

## Development commands

Run these from `CleanSlate_sidebar`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server for interface work |
| `npm run build` | Create the Chrome-ready `dist` folder |
| `npm run lint` | Check JavaScript and React code with ESLint |
| `npm run preview` | Preview the production build in a browser |

After frontend changes, rebuild and reload the unpacked extension to test
Chrome APIs and the complete authentication flow.

## Authentication flow

1. The user clicks **Login with Google** in the side panel.
2. The extension opens the backend Google OAuth route in a new tab.
3. After authorization, the backend callback sends a temporary session token to
   the extension.
4. `background.js` stores that token in `chrome.storage.local` and closes the
   callback tab.
5. Authenticated frontend requests send the token as a Bearer token.

## Project structure

```text
CleanSlate_sidebar/
├── public/
│   ├── background.js
│   └── manifest.json
├── src/
│   ├── components/    # Scan, summary, details, and protected-sender views
│   ├── services/      # Backend requests and scan-response normalization
│   ├── styles/        # Feature-specific stylesheets
│   ├── utils/         # Reusable display helpers
│   ├── App.jsx        # Authentication and top-level view selection
│   └── index.css      # Shared theme and layout styles
├── .env.example
├── package.json
└── vite.config.js
```

## Important notes

- Never commit `.env`, tokens, credentials, or API keys.
- The frontend does not contact Gmail, Gemini, or PostgreSQL directly. Those
  operations belong to the authenticated backend.
- Scan categories are dynamic. The interface renders the labels returned by the
  backend instead of depending on a fixed category list.

