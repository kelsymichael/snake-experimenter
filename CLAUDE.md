# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is an **experimental repository** comparing AI model outputs when building a Snake game. Each AI assistant (Claude Code, Gemini CLI, etc.) creates their own implementation to compare approaches, code quality, and user experience.

## Repository Structure

```
snake-experimenter/
├── gemini-cli/           # Gemini CLI implementation (complete)
│   ├── index.html        # Game entry point
│   ├── style.css         # Styling
│   ├── script.js         # Game logic
│   └── IMPLEMENTATION.md # Implementation notes & next phases
├── README.md             # Experiment overview
├── WARP.md              # WARP terminal guidance
└── LICENSE              # MIT License
```

## Development Workflow

### Running the Game

The implementations are static HTML/CSS/JavaScript with no build process. To run:

```bash
# Option 1: Python HTTP server
python3 -m http.server 8000

# Option 2: npx serve
npx serve .
```

Then navigate to `http://localhost:8000/gemini-cli/` (or appropriate directory).

### Adding New Implementations

When adding a new AI model implementation:

1. Create a new directory named after the model/tool (e.g., `claude-code/`)
2. Keep implementation self-contained within that directory
3. Use vanilla JavaScript (no build tools) to maintain lightweight hosting
4. Document any unique approaches in an `IMPLEMENTATION.md` within the directory

## Game Architecture (Gemini CLI Implementation)

The Gemini CLI implementation uses a canvas-based rendering approach:

- **Game Loop**: `setTimeout`-based loop calling `update()` function
- **State Management**: Global variables for snake position array, food position, direction, score, and speed
- **Rendering**: `draw()` function clears and redraws canvas each frame
- **Input**: Keyboard event listener for arrow keys (script.js:90-106)
- **Collision Detection**: Checks walls and self-collision (script.js:54-64, 81-88)
- **Game Progression**: Speed increases by 10% each food eaten (script.js:71)

Key game constants in gemini-cli/script.js:
- `gridSize = 20` - Size of each grid cell
- Initial `speed = 200` - Milliseconds between updates
- Speed multiplier `0.9` - Each food eaten makes game 10% faster

## Design Constraints

- **Lightweight**: Must be hostable as static files (GitHub Pages, Netlify, etc.)
- **No backend**: Use localStorage for any persistence (high scores, etc.)
- **Shareable**: Must work as a simple URL with no installation
- **Cross-browser**: Pure JavaScript, no frameworks required
