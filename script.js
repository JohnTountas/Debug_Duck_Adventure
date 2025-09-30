let score = 0;
let currentBug = 0;
const terminal = document.getElementById("terminal");
const commandInput = document.getElementById("command");
const scoreElement = document.getElementById("score");
const duck = document.getElementById("duck");

const bugs = [
  {
    description: "undefined variable 'x' - try declaring it!",
    solution: ["var x", "let x", "const x"],
    hint: "Declare a variable named 'x'",
  },
  {
    description: "function 'greet' is not defined - create it!",
    solution: ["function greet", "const greet =", "let greet ="],
    hint: "Create a function called 'greet'",
  },
  {
    description: "array is missing push method - fix the syntax!",
    solution: ["push(", ".push("],
    hint: "Use the push method on an array",
  },
  {
    description: "missing semicolon at end of statement!",
    solution: [";"],
    hint: "Don't forget the semicolon!",
  },
  {
    description: "duck.quack() method is missing - implement it!",
    solution: ["duck.quack", "quack()"],
    hint: "Make the duck quack!",
  },
];

const duckResponses = [
  "Quack! Good job! 🦆",
  "Fantastic debugging! *happy quack*",
  "You're a debugging hero! 🦆✨",
  "Bug squashed! Quack quack!",
  "Excellent work, developer! 🦆🎉",
];

const easterEggs = {
  "duck.quack()": "🦆 QUACK QUACK QUACK! You found the secret duck command!",
  "console.log('hello world')": "Hello World! The classic first program! 🌍",
  "npm install coffee": "☕ Installing coffee... Developer fuel detected!",
  "git commit -m 'fix'": "💾 Committing... Hope this doesn't break production!",
  undefined: "🤔 Ah, the eternal JavaScript mystery...",
  null: "🕳️ The void stares back at you...",
  42: "🌌 The answer to life, the universe, and everything!",
};

function addTerminalLine(text, className = "") {
  const line = document.createElement("div");
  line.className = `terminal-line ${className}`;
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function executeCommand() {
  const command = commandInput.value.trim();
  if (!command) return;

  addTerminalLine(`$ ${command}`, "prompt");

  // Check for easter eggs
  if (easterEggs[command.toLowerCase()]) {
    addTerminalLine(easterEggs[command.toLowerCase()], "success");
    commandInput.value = "";
    return;
  }

  // Check if command solves current bug
  const currentBugData = bugs[currentBug];
  const solved = currentBugData.solution.some((sol) =>
    command.toLowerCase().includes(sol.toLowerCase())
  );

  if (solved) {
    score++;
    scoreElement.textContent = score;
    addTerminalLine(
      duckResponses[Math.floor(Math.random() * duckResponses.length)],
      "success"
    );

    // Celebrate!
    duck.classList.add("celebration");
    setTimeout(() => duck.classList.remove("celebration"), 1000);

    // Move to next bug
    currentBug = (currentBug + 1) % bugs.length;
    setTimeout(() => {
      addTerminalLine(`New Bug: ${bugs[currentBug].description}`, "warning");
    }, 1500);

    // Special messages for milestones
    if (score === 5) {
      setTimeout(() => {
        addTerminalLine(
          "🎉 DEBUG DUCK SAYS: You're a JavaScript wizard! 🧙‍♂️",
          "success"
        );
      }, 2000);
    }
  } else {
    addTerminalLine("Bug still there... try again! 🐛", "error");
    addTerminalLine(`Hint: ${currentBugData.hint}`, "warning");
  }

  commandInput.value = "";
}

// Allow Enter key to execute
commandInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    executeCommand();
  }
});

// Fun random duck animations
setInterval(() => {
  if (Math.random() < 0.1) {
    const emojis = ["🦆", "🐛", "☕", "💻", "🔧", "⚡"];
    duck.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    setTimeout(() => (duck.textContent = "🦆"), 2000);
  }
}, 3000);
