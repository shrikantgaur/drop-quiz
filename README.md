# VocabDrop 🎯 — Multi-Topic Quiz Game

🚀 **Live Demo:** https://shrikantgaur.github.io/drop-quiz/

dropQuiz is an interactive falling-word quiz game built with pure HTML, CSS, and JavaScript. Players must quickly identify the correct answer before it reaches the bottom of the screen.

Perfect for learning, practicing vocabulary, testing knowledge, and showcasing frontend development skills.

## Features

* 🎮 Fast-paced falling-word gameplay
* 📱 Responsive design for desktop and mobile
* 📖 Multiple quiz categories
* ⚡ No frameworks or external dependencies
* 🎯 Score tracking and instant feedback
* 🌈 Clean, colorful UI
* 🚀 Deployable directly to GitHub Pages

## Live Demo

Visit the game here:

https://shrikantgaur.github.io/drop-quiz/

## Topics Included

* 📖 English Vocabulary

  * Synonyms
  * Antonyms
  * Word Meanings

* 💻 Developer Basics

  * HTML
  * CSS
  * JavaScript
  * Git

* 🇮🇳 Hindi ↔ English

* 🔬 Science Quiz

* 🌍 General Knowledge

* ➕ Quick Maths

## Project Structure

```text
drop-quiz/
│
├── index.html      # Main application
├── style.css       # Styling and animations
├── game.js         # Game logic
├── data.js         # Quiz data and topics
└── README.md
```

## Getting Started

### Run Locally

Simply clone the repository and open `index.html` in your browser.

```bash
git clone https://github.com/shrikantgaur/drop-quiz.git
cd drop-quiz
```

Then open:

```text
index.html
```

No installation or build step required.

## Adding Your Own Topic

Open `data.js` and add a new object inside the `TOPICS` array:

```javascript
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
      options: [
        "Right Answer",
        "Wrong 1",
        "Wrong 2",
        "Wrong 3"
      ]
    }
  ]
}
```

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* GitHub Pages

## Future Improvements

* 🏆 High score leaderboard
* 🔊 Sound effects
* ⏱️ Difficulty levels
* 📊 Player statistics
* 🌐 Additional language packs
* 🎨 More themes and customization

## Contributing

Contributions, ideas, and improvements are welcome. Feel free to fork the repository and submit a pull request.

## License

This project is open source and available under the MIT License.

---

Made with ❤️ by Shrikant Gaur
