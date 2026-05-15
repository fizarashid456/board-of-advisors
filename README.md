# Board of Advisors — AI Boardroom

> Describe your business problem. Five expert AI advisors convene, argue with each other, and force-rank what you should do next.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Architecture & Design Decisions](#4-architecture--design-decisions)
5. [Component Breakdown](#5-component-breakdown)
6. [Hooks & State Management](#6-hooks--state-management)
7. [API Integration](#7-api-integration)
8. [Prompt Engineering](#8-prompt-engineering)
9. [Theming & Styling](#9-theming--styling)
10. [The Five Advisors](#10-the-five-advisors)
11. [Session Flow](#11-session-flow)
12. [Setup & Installation](#12-setup--installation)
13. [Environment Variables](#13-environment-variables)
14. [Available Scripts](#14-available-scripts)
15. [Build & Deployment](#15-build--deployment)
16. [Code Conventions](#16-code-conventions)
17. [Known Limitations](#17-known-limitations)
18. [Future Roadmap](#18-future-roadmap)

---

## 1. Project Overview

**Board of Advisors** is a single-page React application powered by the Anthropic Claude API. The user describes a startup or business problem in a text area, clicks submit, and the app runs three sequential API calls that simulate a full boardroom meeting:

1. Each of the five advisors gives their initial, independent take on the problem
2. The advisors argue with each other — they push back on each other's positions by name
3. The board synthesizes the debate into a force-ranked list of recommended actions

The result feels like a real boardroom: there's disagreement, tension, and a clear output — not just five separate Q&A responses.

**What makes this different from a basic chatbot:**
- Responses are not generic — each persona has a distinct voice, priorities, and blind spots
- Advisors explicitly reference and challenge each other's points in the debate round
- The final output is ranked by impact, not listed randomly
- The experience is sequential and structured, making it easy to follow the logic

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 18.3.x |
| Build Tool | Vite | 5.4.x |
| AI Model | Claude (claude-sonnet-4) | via REST API |
| Styling | CSS-in-JS (inline styles) + global CSS | — |
| Language | JavaScript (ES2022+) | — |
| Package Manager | npm | — |

No external UI libraries, no CSS frameworks, no state management libraries. The simplicity is intentional — the codebase stays readable and easy to hand off.

---

## 3. Folder Structure

```
board-of-advisors/
│
├── index.html                        # App entry HTML, Vite picks this up
├── vite.config.js                    # Vite configuration
├── package.json                      # Dependencies and scripts
├── .env.example                      # Template for required env vars
├── .gitignore                        # Excludes node_modules, .env, dist
│
└── src/
    │
    ├── main.jsx                      # React mount point, imports global CSS
    ├── App.jsx                       # Root component — layout and rendering only
    │
    ├── styles/
    │   ├── global.css                # Reset, animations, base typography
    │   └── theme.js                  # All design tokens (colors, spacing, etc.)
    │
    ├── constants/
    │   └── advisors.js               # Static data for all 5 advisor personas
    │
    ├── services/
    │   └── claudeApi.js              # All Anthropic API communication
    │
    ├── prompts/
    │   └── boardPrompts.js           # Prompt templates for all 3 API calls
    │
    ├── utils/
    │   └── parseHelpers.js           # JSON parsing + context formatting utilities
    │
    ├── hooks/
    │   └── useBoardSession.js        # Custom hook — full session lifecycle & state
    │
    └── components/
        │
        ├── shared/                   # Small, reusable UI primitives
        │   ├── Avatar.jsx            # Circular initials avatar
        │   ├── RoleTag.jsx           # Pill badge showing advisor role
        │   └── LoadingPulse.jsx      # Animated dot with label text
        │
        ├── Header.jsx                # App title, subtitle, advisor avatar strip
        ├── ProblemInput.jsx          # Textarea form for the user's problem
        ├── LoadingState.jsx          # Progress indicator during API calls
        ├── SectionLabel.jsx          # Horizontal divider with centered label
        ├── AdvisorCard.jsx           # One advisor's initial position card
        ├── DebateExchange.jsx        # One debate exchange between two advisors
        └── FinalVerdict.jsx          # Board summary + ranked recommendations
```

---

## 4. Architecture & Design Decisions

### Separation of concerns

The project is structured around a clear three-layer split:

```
Data / Config       →  constants/, styles/theme.js
Business Logic      →  services/, prompts/, utils/, hooks/
UI / Rendering      →  components/, App.jsx
```

`App.jsx` imports from the hook and renders components. It does not call the API, parse JSON, or build prompts. That logic lives in the hook and the service/utility layers.

### Custom hook for session logic

`useBoardSession.js` owns the entire board session lifecycle — API calls, state transitions, error handling, and reset. This means:

- `App.jsx` stays clean and easy to read
- The session logic can be tested independently
- If you ever need to swap the UI framework, the core logic is untouched

### Single API service file

All `fetch` calls go through `claudeApi.js`. If the API URL, model name, or auth headers ever change, there is exactly one file to update.

### Prompts as a separate module

`boardPrompts.js` holds all three prompt templates. Prompt engineering is iterative — keeping prompts separate from component code means you can tune them without risk of breaking UI logic.

### Design tokens centralized

All colors, spacing, and typography values live in `styles/theme.js`. Advisor-specific colors are defined there (under `advisorColors`) and imported into `constants/advisors.js`. This means you can retheme the entire app by editing one file.

---

## 5. Component Breakdown

### `Header.jsx`
- Renders the page title, subtitle, and the row of advisor avatars
- No props — static content only
- Imports `ADVISORS` from constants to render the avatar strip dynamically

### `ProblemInput.jsx`
- Controlled textarea for the user's problem description
- Accepts `value`, `onChange`, `onSubmit`, and `error` props
- Supports Cmd+Enter / Ctrl+Enter to submit
- Submit button is disabled when the textarea is empty
- Shows an inline error message if the previous session failed

### `LoadingState.jsx`
- Shows the current loading label (e.g. "Debate in progress...")
- Three step indicators that turn green as each API call completes
- Props: `loadingLabel`, `takesReady`, `debateReady`, `verdictReady`

### `AdvisorCard.jsx`
- Renders one advisor's initial position
- Props: `advisor` (config object), `take` (API response for that advisor)
- Left border color is the advisor's brand color
- Two chips at the bottom: Key Insight and Main Concern

### `DebateExchange.jsx`
- Renders one cross-advisor argument
- Props: `exchange` — `{ speakerId, targetId, message }`
- Uses `getAdvisorById()` to look up both participants and apply their colors

### `FinalVerdict.jsx`
- Renders the board summary paragraph and the three ranked recommendations
- Each recommendation has a medal icon, action text, rationale, and champion attribution
- Top-ranked item gets a slightly different background to stand out
- Internal `RecommendationRow` sub-component handles each row

### Shared components

| Component | Props | Purpose |
|---|---|---|
| `Avatar` | `initials`, `color` | Circular avatar with colored initials |
| `RoleTag` | `label`, `color` | Pill badge for advisor role |
| `LoadingPulse` | `label` | Animated dot + label for loading states |
| `SectionLabel` | `text` | Horizontal rule with centered label text |

---

## 6. Hooks & State Management

### `useBoardSession.js`

This hook manages everything that changes during a session. It returns:

```js
{
  status,        // 'idle' | 'running' | 'done' | 'error'
  loadingLabel,  // String shown in the loading indicator
  takes,         // Array of initial advisor positions
  exchanges,     // Array of debate exchanges
  verdict,       // Final summary + recommendations object
  error,         // Error message string (empty if no error)
  startSession,  // async (problem: string) => void
  resetSession,  // () => void
}
```

`SESSION_STATUS` is exported as a constants object so App.jsx uses named values instead of raw strings:

```js
import { SESSION_STATUS } from "./hooks/useBoardSession";
// ...
const isRunning = status === SESSION_STATUS.RUNNING;
```

**State transitions:**

```
IDLE
  ↓ startSession()
RUNNING
  ↓ all 3 API calls complete
DONE
  ↓ resetSession()
IDLE

RUNNING
  ↓ API call throws
ERROR
  ↓ user edits input and resubmits
RUNNING
```

---

## 7. API Integration

### Endpoint

```
POST https://api.anthropic.com/v1/messages
```

### Request format

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1000,
  "system": "...",
  "messages": [
    { "role": "user", "content": "..." }
  ]
}
```

### Response parsing

Claude is instructed in every system prompt to return only valid JSON. However, it occasionally wraps the JSON in markdown code fences regardless. `parseClaudeJSON()` in `utils/parseHelpers.js` strips those fences before calling `JSON.parse()`.

### Three API calls per session

| Call | Input | Output |
|---|---|---|
| 1 — Initial takes | The user's problem | `{ takes: [...] }` |
| 2 — Debate round | Problem + takes as context | `{ exchanges: [...] }` |
| 3 — Final verdict | Problem + debate context | `{ summary, recommendations: [...] }` |

Each call is sequential — the output of one feeds into the next as context. This chain is handled entirely inside `useBoardSession.js`.

### Error handling

All three API calls are inside a single `try/catch` in `startSession()`. If any call fails, `status` is set to `ERROR` and the error message is surfaced to the user via `ProblemInput`. The session can be retried immediately.

---

## 8. Prompt Engineering

All three prompts follow the same principles:

1. **Open with role**: "You simulate a board of advisors..." sets the frame immediately
2. **Return only JSON**: The instruction is explicit and repeated — "Return ONLY valid JSON. No explanation, no markdown, no extra text."
3. **Define the structure**: The expected JSON shape is included verbatim in the prompt so Claude has no ambiguity about what to return
4. **Character sheets**: For the initial takes prompt, each advisor's personality is described in one sentence — enough to shape tone without over-constraining the response

The debate prompt explicitly tells Claude to reference specific positions by name, which is what makes the debate feel real rather than generic.

### Iterating on prompts

If responses feel off-character or the JSON structure is inconsistent, edit `src/prompts/boardPrompts.js`. No other file needs to change. It's worth keeping old prompt versions commented out above the current one while you're experimenting.

---

## 9. Theming & Styling

### Design tokens

`src/styles/theme.js` exports `colors`, `advisorColors`, `spacing`, `borderRadius`, and `typography`. These are imported wherever those values are needed.

### Styling approach

Components use inline styles for most rules. This keeps styles co-located with the JSX, avoids class name collisions, and makes the code self-contained without a build step for CSS modules.

`global.css` handles the things that inline styles cannot: `*` reset, `body` base styles, `@keyframes` animations, scrollbar styling, and focus rings.

### Color palette

The app uses a dark navy theme. All colors are defined in `theme.js`:

| Role | Hex | Usage |
|---|---|---|
| `bgBase` | `#0a0f1e` | Page background |
| `bgSurface` | `#111827` | Card backgrounds |
| `bgCard` | `#162032` | Elevated cards |
| `bgInput` | `#0d1525` | Input fields |
| `accent` | `#4a7fbd` | Buttons, links, focus |
| `success` | `#2db87b` | Completed steps |
| `textPrimary` | `#e8edf5` | Headings and body |
| `textSecondary` | `#8da3bb` | Supporting text |
| `textMuted` | `#3d5068` | Labels, dividers |

### Advisor brand colors

Each advisor has three values: `main` (text/borders), `fill` (background tint), `border` (card borders).

| Advisor | Color |
|---|---|
| VC — Marcus Reid | `#4a7fbd` (blue) |
| CFO — Sandra Voss | `#2ea8d5` (steel blue) |
| Growth — Dev Patel | `#2db87b` (teal green) |
| Devil — Elena Cross | `#d4821a` (amber orange) |
| Expert — Prof. Wu | `#8b72d4` (soft violet) |

---

## 10. The Five Advisors

| ID | Name | Title | Personality |
|---|---|---|---|
| `vc` | Marcus Reid | Partner at Apex Ventures | Ruthless VC obsessed with market size, 10x returns, and scalability. Blunt and aggressive. |
| `cfo` | Sandra Voss | Former CFO, 3 Exits | Skeptical CFO who lives in unit economics, burn rate, and margins. Conservative and numbers-first. |
| `growth` | Dev Patel | Growth Lead, 4 Unicorns | Growth hacker focused on CAC, LTV, virality loops, and rapid channel experiments. High energy. |
| `devil` | Elena Cross | Strategic Risk Advisor | Devil's advocate paid to surface risks, poke holes, and challenge every assumption. Professionally contrarian. |
| `expert` | Prof. James Wu | PhD, 20yr Veteran | Domain expert with deep industry knowledge and historical pattern recognition. Calm and measured. |

To add a new advisor: add an entry to `constants/advisors.js` and add its color to `styles/theme.js`. The prompts reference advisors by their `id`, so add the new id and personality description to all three prompts in `boardPrompts.js`.

---

## 11. Session Flow

```
User types problem
        ↓
clicks "Convene the Board"
        ↓
startSession(problem) called in useBoardSession
        ↓
API Call 1 ─────────────────────────────────────
  System: promptInitialTakes()
  User:   "Business problem: {problem}"
  Output: takes[] — 5 advisor positions
        ↓
setTakes(parsedTakes) → advisor cards appear
        ↓
API Call 2 ─────────────────────────────────────
  System: promptDebate()
  User:   problem + takes formatted as context
  Output: exchanges[] — 6 debate exchanges
        ↓
setExchanges(parsed) → debate section appears
        ↓
API Call 3 ─────────────────────────────────────
  System: promptVerdict()
  User:   problem + debate formatted as context
  Output: verdict — summary + 3 ranked items
        ↓
setVerdict(parsed) → verdict section appears
        ↓
status = "done" → "Start New Session" button shown
```

---

## 12. Setup & Installation

**Prerequisites:**
- Node.js 18 or higher
- An Anthropic API key (get one at https://console.anthropic.com/)

**Steps:**

```bash
# 1. Clone or download the project
git clone <repo-url>
cd board-of-advisors

# 2. Install dependencies
npm install

# 3. Set up your environment variables
cp .env.example .env
# Open .env and add your Anthropic API key

# 4. Start the development server
npm run dev
```

The app will open at `http://localhost:3000`.

---

## 13. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_ANTHROPIC_API_KEY` | Yes | Your Anthropic API key. Get one at console.anthropic.com |

Variables prefixed with `VITE_` are automatically available in the browser via `import.meta.env.VITE_*`. Never commit your `.env` file — it's in `.gitignore`.

> **Note:** The current implementation calls the Anthropic API directly from the browser. For production use, move these calls to a backend server so your API key is never exposed to the client.

---

## 14. Available Scripts

| Script | Command | Description |
|---|---|---|
| Development server | `npm run dev` | Starts Vite dev server at localhost:3000 with hot reload |
| Production build | `npm run build` | Bundles the app into the `dist/` folder |
| Preview build | `npm run preview` | Serves the production build locally for testing |

---

## 15. Build & Deployment

**Build for production:**

```bash
npm run build
```

This outputs a static site to the `dist/` folder. The contents of `dist/` can be deployed to any static hosting service.

**Deployment options:**

| Platform | Steps |
|---|---|
| Vercel | Connect the repo — Vercel auto-detects Vite. Add `VITE_ANTHROPIC_API_KEY` in Project Settings → Environment Variables. |
| Netlify | Drag the `dist/` folder into Netlify Drop, or connect the repo. Add the env var in Site Settings → Environment Variables. |
| GitHub Pages | Run `npm run build`, then push the `dist/` folder to the `gh-pages` branch. |

---

## 16. Code Conventions

**File naming:** PascalCase for components (`AdvisorCard.jsx`), camelCase for everything else (`claudeApi.js`, `useBoardSession.js`).

**Comments:** Every file starts with a JSDoc block explaining its purpose. Comments within functions explain *why*, not *what*. Code that is self-explanatory doesn't need a comment.

**Props:** Documented in the JSDoc block at the top of each component file. No PropTypes library is used — the docs serve that purpose.

**Exports:** Named exports for utilities, constants, and hooks. Default exports for components.

**No magic strings:** Session status values use the `SESSION_STATUS` constants object instead of raw strings like `"running"`.

**No nested ternaries:** Conditional rendering uses separate variables (`isIdle`, `isRunning`, `isDone`) assigned before the JSX return.

---

## 17. Known Limitations

- **API key exposed client-side.** The Anthropic API is called directly from the browser. This is fine for internal tools and demos but should be proxied through a backend server for any public-facing deployment.

- **Three sequential API calls.** Each session makes 3 separate requests. Total latency is roughly 10–20 seconds depending on response length and network conditions. A backend that streams the responses could reduce perceived wait time significantly.

- **No session persistence.** Sessions live in React state only. Refreshing the page clears the results. Adding localStorage or a database would require minimal changes to the hook.

- **Domain expert is generic.** The "Domain Expert" persona uses general industry knowledge. For domain-specific accuracy (e.g. healthcare regulations, legal considerations), the expert persona prompt would need to be specialized.

---

## 18. Future Roadmap

| Feature | Priority | Notes |
|---|---|---|
| Backend proxy for API key security | High | Move Claude calls to an Express/Next.js API route |
| Response streaming | High | Stream tokens as they arrive for faster perceived response |
| Session history | Medium | Save past sessions to localStorage or a database |
| Export to PDF | Medium | Let users download the board session as a report |
| Custom advisor profiles | Medium | Let users define their own advisor personas |
| Follow-up questions | Low | Allow users to ask the board a follow-up after the session |
| Multi-round debate | Low | Let the debate run for more than one round |
| Domain mode | Low | Pre-configure the domain expert for specific industries (SaaS, healthcare, etc.) |

---

## License

MIT — free to use, modify, and distribute.

---

*Built with React, Vite, and the Anthropic Claude API.*
