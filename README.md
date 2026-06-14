# VocabDrop 🎯 — Multi-Topic Quiz Game

A portfolio-ready, interactive falling-word quiz game. Students, developers, and general users can all play!

## How to run
Just open `index.html` in any browser. No server, no dependencies to install.

## Topics included
- 📖 English Vocab (synonyms, antonyms, meanings)
- 💻 Dev Basics (HTML, CSS, JS, Git)
- 🇮🇳 Hindi ↔ English
- 🔬 Science Quiz
- 🌍 General Knowledge
- ➕ Quick Maths

## Add your own topic
Open `data.js` and add a new object to the `TOPICS` array:

```js
{
  id: "my-topic",
  label: "My Topic",
  icon: "🚀",
  color: "#E24B4A",
  colorLight: "#FCEBEB",
  description: "Short description here",
  questions: [
    {
      q: "Your question here?",
      correct: "Right Answer",
      options: ["Right Answer", "Wrong 1", "Wrong 2", "Wrong 3"]
    },
    // add more...
  ]
}
```

## Files
- `index.html` — layout & screens
- `style.css` — all styling
- `game.js` — game engine
- `data.js` — all quiz questions (edit this!)

## Portfolio tip
Upload all 4 files to any static host:
- **GitHub Pages** (free) — push to repo, enable Pages
- **Netlify** (free) — drag & drop the folder
- **Vercel** (free) — import GitHub repo
