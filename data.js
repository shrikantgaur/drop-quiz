// ════════════════════════════════════════════════════════
//  VocabDrop — Quiz Data
//  Add your own topics here! Each topic needs:
//    id, label, icon, color, description, questions[]
//  Each question needs:
//    q (question text), correct (right answer), options[] (4 choices)
// ════════════════════════════════════════════════════════

const TOPICS = [
  {
    id: "english",
    label: "English Vocab",
    icon: "📖",
    color: "#7f77dd",
    colorLight: "#EEEDFE",
    description: "Synonyms, antonyms & word meanings",
    questions: [
      { q: "Synonym of 'Happy'", correct: "Joyful", options: ["Joyful", "Angry", "Tired", "Scared"] },
      { q: "Antonym of 'Ancient'", correct: "Modern", options: ["Modern", "Old", "Ruined", "Historic"] },
      { q: "Meaning of 'Benevolent'", correct: "Kind & generous", options: ["Kind & generous", "Cruel", "Lazy", "Noisy"] },
      { q: "Synonym of 'Brave'", correct: "Courageous", options: ["Courageous", "Cowardly", "Timid", "Weak"] },
      { q: "Antonym of 'Transparent'", correct: "Opaque", options: ["Opaque", "Clear", "Shiny", "Bright"] },
      { q: "Meaning of 'Diligent'", correct: "Hardworking", options: ["Hardworking", "Lazy", "Smart", "Clever"] },
      { q: "Synonym of 'Enormous'", correct: "Huge", options: ["Huge", "Tiny", "Average", "Short"] },
      { q: "Antonym of 'Generous'", correct: "Stingy", options: ["Stingy", "Kind", "Gentle", "Helpful"] },
      { q: "Meaning of 'Eloquent'", correct: "Fluent & expressive", options: ["Fluent & expressive", "Silent", "Rude", "Confused"] },
      { q: "Synonym of 'Mysterious'", correct: "Enigmatic", options: ["Enigmatic", "Obvious", "Clear", "Simple"] },
    ]
  },
  {
    id: "developer",
    label: "Dev Basics",
    icon: "💻",
    color: "#1D9E75",
    colorLight: "#E1F5EE",
    description: "HTML, CSS, JS & programming concepts",
    questions: [
      { q: "Full form of CSS", correct: "Cascading Style Sheets", options: ["Cascading Style Sheets", "Computer Style Script", "Creative Style System", "Core Style Sheet"] },
      { q: "Which tag is for paragraph in HTML?", correct: "<p>", options: ["<p>", "<para>", "<text>", "<div>"] },
      { q: "JavaScript runs where?", correct: "Browser / Node.js", options: ["Browser / Node.js", "Database", "Only Server", "Only Mobile"] },
      { q: "What does 'API' stand for?", correct: "Application Programming Interface", options: ["Application Programming Interface", "Automated Program Index", "App Protocol Input", "Array Programming Instance"] },
      { q: "In JS, how to declare a variable?", correct: "let x = 5", options: ["let x = 5", "var: x = 5", "x := 5", "declare x = 5"] },
      { q: "Which is NOT a JS framework?", correct: "Django", options: ["Django", "React", "Vue", "Angular"] },
      { q: "CSS flexbox: center items horizontally?", correct: "justify-content: center", options: ["justify-content: center", "align-items: center", "text-align: center", "flex-center: true"] },
      { q: "What is 'null' in JavaScript?", correct: "Intentional empty value", options: ["Intentional empty value", "Undefined variable", "Zero", "False"] },
      { q: "Git command to save changes?", correct: "git commit", options: ["git commit", "git push", "git save", "git upload"] },
      { q: "What does 'responsive design' mean?", correct: "Works on all screen sizes", options: ["Works on all screen sizes", "Loads very fast", "Has animations", "Uses dark mode"] },
    ]
  },
  {
    id: "hindi",
    label: "Hindi ↔ English",
    icon: "🇮🇳",
    color: "#D85A30",
    colorLight: "#FAECE7",
    description: "Common Hindi words in English",
    questions: [
      { q: "English of 'Paani'", correct: "Water", options: ["Water", "Fire", "Air", "Earth"] },
      { q: "Hindi of 'Sun'", correct: "Suraj", options: ["Suraj", "Chand", "Tara", "Badal"] },
      { q: "English of 'Kitaab'", correct: "Book", options: ["Book", "Pen", "Table", "Chair"] },
      { q: "Hindi of 'Friend'", correct: "Dost", options: ["Dost", "Dushman", "Rishtedar", "Anjan"] },
      { q: "English of 'Vidyalaya'", correct: "School", options: ["School", "Hospital", "Market", "Temple"] },
      { q: "Hindi of 'Happy'", correct: "Khush", options: ["Khush", "Udaas", "Thaka", "Gussa"] },
      { q: "English of 'Aasman'", correct: "Sky", options: ["Sky", "Sea", "Mountain", "River"] },
      { q: "Hindi of 'Apple'", correct: "Seb", options: ["Seb", "Aam", "Kela", "Angur"] },
      { q: "English of 'Ghar'", correct: "Home", options: ["Home", "Shop", "Road", "Garden"] },
      { q: "Hindi of 'Teacher'", correct: "Adhyapak", options: ["Adhyapak", "Vidyarthi", "Neta", "Doctor"] },
    ]
  },
  {
    id: "science",
    label: "Science Quiz",
    icon: "🔬",
    color: "#378ADD",
    colorLight: "#E6F1FB",
    description: "Physics, Chemistry & Biology basics",
    questions: [
      { q: "Chemical symbol of Gold", correct: "Au", options: ["Au", "Go", "Gd", "Ag"] },
      { q: "Speed of light (approx)?", correct: "3 × 10⁸ m/s", options: ["3 × 10⁸ m/s", "3 × 10⁵ m/s", "3 × 10¹⁰ m/s", "3 × 10⁶ m/s"] },
      { q: "Plants make food by?", correct: "Photosynthesis", options: ["Photosynthesis", "Respiration", "Digestion", "Osmosis"] },
      { q: "Water formula is?", correct: "H₂O", options: ["H₂O", "CO₂", "NaCl", "O₂"] },
      { q: "Largest planet in solar system?", correct: "Jupiter", options: ["Jupiter", "Saturn", "Earth", "Neptune"] },
      { q: "Unit of electric current?", correct: "Ampere", options: ["Ampere", "Volt", "Watt", "Ohm"] },
      { q: "DNA stands for?", correct: "Deoxyribonucleic Acid", options: ["Deoxyribonucleic Acid", "Dynamic Nucleic Acid", "Digital Network Array", "Dense Nucleic Agent"] },
      { q: "Force = Mass × ?", correct: "Acceleration", options: ["Acceleration", "Velocity", "Speed", "Gravity"] },
      { q: "Which gas do plants absorb?", correct: "Carbon Dioxide", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"] },
      { q: "Hardest natural substance?", correct: "Diamond", options: ["Diamond", "Gold", "Iron", "Quartz"] },
    ]
  },
  {
    id: "gk",
    label: "General Knowledge",
    icon: "🌍",
    color: "#D4537E",
    colorLight: "#FBEAF0",
    description: "World facts, capitals & more",
    questions: [
      { q: "Capital of India?", correct: "New Delhi", options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"] },
      { q: "Longest river in the world?", correct: "Nile", options: ["Nile", "Amazon", "Ganges", "Yangtze"] },
      { q: "Who wrote 'Harry Potter'?", correct: "J.K. Rowling", options: ["J.K. Rowling", "Tolkien", "Roald Dahl", "C.S. Lewis"] },
      { q: "How many continents on Earth?", correct: "7", options: ["7", "5", "6", "8"] },
      { q: "Olympics held every how many years?", correct: "4 years", options: ["4 years", "2 years", "5 years", "3 years"] },
      { q: "Currency of Japan?", correct: "Yen", options: ["Yen", "Won", "Yuan", "Rupee"] },
      { q: "Largest ocean on Earth?", correct: "Pacific Ocean", options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"] },
      { q: "Father of the Nation (India)?", correct: "Mahatma Gandhi", options: ["Mahatma Gandhi", "Nehru", "Ambedkar", "Patel"] },
      { q: "How many days in a leap year?", correct: "366", options: ["366", "365", "364", "367"] },
      { q: "Tallest mountain in the world?", correct: "Mount Everest", options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"] },
    ]
  },
  {
    id: "math",
    label: "Quick Maths",
    icon: "➕",
    color: "#BA7517",
    colorLight: "#FAEEDA",
    description: "Mental math & number tricks",
    questions: [
      { q: "√144 = ?", correct: "12", options: ["12", "14", "11", "13"] },
      { q: "15% of 200 = ?", correct: "30", options: ["30", "25", "35", "20"] },
      { q: "2⁸ = ?", correct: "256", options: ["256", "128", "512", "64"] },
      { q: "Sum of angles in a triangle?", correct: "180°", options: ["180°", "360°", "90°", "270°"] },
      { q: "Prime numbers between 10–20?", correct: "11, 13, 17, 19", options: ["11, 13, 17, 19", "11, 15, 17, 19", "13, 15, 17", "11, 12, 17, 19"] },
      { q: "Area of circle = ?", correct: "πr²", options: ["πr²", "2πr", "πd", "r²"] },
      { q: "LCM of 4 and 6?", correct: "12", options: ["12", "24", "6", "8"] },
      { q: "What is 7 × 8?", correct: "56", options: ["56", "54", "58", "48"] },
      { q: "Decimal of 3/4?", correct: "0.75", options: ["0.75", "0.25", "0.50", "0.80"] },
      { q: "Perimeter of square with side 5?", correct: "20", options: ["20", "25", "15", "10"] },
    ]
  }
];
