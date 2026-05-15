# 🎯 Board of Advisors — AI Boardroom

> Describe your business problem. Five expert AI advisors convene, argue with each other, and force-rank what you should do next.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite) ![OpenRouter](https://img.shields.io/badge/OpenRouter-API-orange) ![Netlify](https://img.shields.io/badge/Netlify-Live-green?logo=netlify)

---

## 📖 Overview

**Board of Advisors** is a React-powered AI application that simulates a boardroom meeting. Submit a business challenge, and five AI advisor personas (VC, CFO, Growth Lead, Risk Expert, Domain Specialist) analyze it from different angles, debate with each other, and deliver ranked recommendations.

### What Makes It Different:
- ✅ **Distinct personas** — each advisor has unique priorities and blind spots
- ✅ **Real debate** — advisors reference and challenge each other by name
- ✅ **Ranked output** — recommendations are prioritized by impact, not listed randomly
- ✅ **Sequential flow** — follows a natural boardroom pattern (initial takes → debate → verdict)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- An [OpenRouter API key](https://openrouter.ai/) (free $5 credit on signup)

### Installation

```bash
# Clone the repository
git clone https://github.com/fizarashid456/board-of-advisors.git
cd board-of-advisors

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your OpenRouter API key
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Live Demo

🔗 **[View Live App](https://netlify.app)** *(Replace with your Netlify URL)*

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **UI Framework** | React 18.3 |
| **Build Tool** | Vite 5.4 |
| **AI API** | OpenRouter (Claude 3 Haiku) |
| **Styling** | Inline CSS + global styles |
| **Deployment** | Netlify |

---

## 📁 Project Structure

```
board-of-advisors/
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Root component
│   ├── services/
│   │   └── claudeApi.js         # OpenRouter API integration
│   ├── hooks/
│   │   └── useBoardSession.js   # Session state management
│   ├── prompts/
│   │   └── boardPrompts.js      # AI prompt templates
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProblemInput.jsx
│   │   ├── LoadingState.jsx
│   │   ├── AdvisorCard.jsx
│   │   ├── DebateExchange.jsx
│   │   ├── FinalVerdict.jsx
│   │   └── shared/              # Reusable UI components
│   ├── utils/
│   │   └── parseHelpers.js      # JSON parsing utilities
│   ├── constants/
│   │   └── advisors.js          # Advisor personas
│   └── styles/
│       ├── global.css
│       └── theme.js             # Design tokens
├── index.html
├── vite.config.js
├── netlify.toml                 # Netlify build config
├── package.json
└── .env.example
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_OPENROUTER_API_KEY=your_api_key_here
```

Get your API key:
1. Sign up at https://openrouter.ai/
2. Go to **Keys** section
3. Create a new API key
4. Copy and paste into `.env`

---

## 🎯 How It Works

### Session Flow

1. **User Input** → Describes business problem
2. **API Call 1** → Five advisors give independent initial takes
3. **Advisor Cards** → Display initial positions (appears after ~3-5 sec)
4. **API Call 2** → Advisors debate, referencing each other by name
5. **Debate Section** → Shows 6 debate exchanges (appears after ~3-5 sec)
6. **API Call 3** → Board synthesizes debate into ranked recommendations
7. **Final Verdict** → Shows summary + 3 prioritized action items

Total time: **10-20 seconds** depending on API response speed.

---

## 👥 The Five Advisors

| ID | Name | Title | Focus |
|---|---|---|---|
| `vc` | Marcus Reid | VC Partner | Market size, 10x returns, scalability |
| `cfo` | Sandra Voss | CFO | Unit economics, burn rate, margins |
| `growth` | Dev Patel | Growth Lead | CAC, LTV, virality, rapid experiments |
| `devil` | Elena Cross | Risk Advisor | Risks, holes, assumptions |
| `expert` | Prof. Wu | Domain Expert | Industry patterns, historical context |

---

## 📦 Building for Production

```bash
npm run build
```

Output is in the `dist/` folder. This is what Netlify deploys.

---

## 🚀 Deployment

### Deploy to Netlify

1. **Push to GitHub** (already done ✅)
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com/
   - Click **Add new site** → **Import an existing project**
   - Select GitHub → **fizarashid456/board-of-advisors**

3. **Configure Environment**
   - In Netlify: **Site settings** → **Build & deploy** → **Environment**
   - Add `VITE_OPENROUTER_API_KEY` with your API key

4. **Deploy**
   - Netlify auto-builds on `git push`
   - Your live URL: `https://your-site-name.netlify.app`

---

## 🔑 API Details

### Provider: OpenRouter
- **Endpoint:** `https://openrouter.ai/api/v1/chat/completions`
- **Model:** `anthropic/claude-3-haiku`
- **Max Tokens:** 1500 per request
- **Temperature:** 0.7 (balanced creativity/consistency)

### Why OpenRouter?
- ✅ CORS enabled (works from browser)
- ✅ Supports Claude, Mistral, Llama, etc.
- ✅ Free $5 credit on signup
- ✅ No backend proxy needed
- ✅ Simple, reliable API

---

## 🛠️ Development

### Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

### Code Style
- **File naming:** PascalCase for components, camelCase for utilities
- **Exports:** Named exports for utilities/hooks, default for components
- **No external UI libraries** — keep it simple and lightweight

---

## 📝 API Response Format

All three API calls expect JSON responses with specific structures:

### 1️⃣ Initial Takes
```json
{
  "takes": [
    {
      "id": "vc",
      "response": "...",
      "keyInsight": "...",
      "mainConcern": "..."
    }
  ]
}
```

### 2️⃣ Debate Round
```json
{
  "exchanges": [
    {
      "speakerId": "vc",
      "targetId": "cfo",
      "message": "..."
    }
  ]
}
```

### 3️⃣ Final Verdict
```json
{
  "summary": "...",
  "recommendations": [
    {
      "rank": 1,
      "action": "...",
      "rationale": "...",
      "champion": "vc"
    }
  ]
}
```

---

## 🐛 Troubleshooting

### "API key not found"
- Check `.env` file exists in project root
- Restart dev server after changing `.env`
- Make sure key starts with `sk-or-v1-`

### "Failed to fetch"
- Verify internet connection
- Check your OpenRouter API key is valid
- Try refreshing the page

### "Empty response from API"
- Your API key might be out of credits
- Check OpenRouter account at https://openrouter.ai/

### Build fails on Netlify
- Check that `package.json` has `"type": "module"`
- Ensure `npm run build` works locally first
- Check environment variable is set in Netlify dashboard

---

## 📄 License

MIT — Free to use, modify, and distribute.

---

## 🤝 Contributing

Found a bug or have a feature idea?
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Support

Questions? Issues? 
- Check the [Troubleshooting](#-troubleshooting) section
- Review the [original README](./README.md) for architecture details
- Open an issue on GitHub

---

## 🎉 Features

- ✅ Five distinct AI advisor personas
- ✅ Real-time API integration with OpenRouter
- ✅ Sequential boardroom simulation
- ✅ Advisor debate with cross-references
- ✅ Force-ranked recommendations
- ✅ Clean, modern UI (no external frameworks)
- ✅ Fully responsive design
- ✅ Production-ready deployment

---

## 🔮 Future Roadmap

- [ ] Session history (localStorage/database)
- [ ] Export to PDF reports
- [ ] Custom advisor profiles
- [ ] Multi-round debates
- [ ] Follow-up questions
- [ ] Domain-specific advisor modes
- [ ] Dark/Light theme toggle
- [ ] Mobile app version

---

**Built with ❤️ using React, Vite, and OpenRouter AI**

*Last updated: May 2025*
