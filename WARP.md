# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Purpose

This is an experimental repository for comparing AI model outputs when building a Snake game. The project is currently in **DRAFT** stage with no production code.

### Experiment Context
- **Goal**: Compare different AI coding assistants (Claude Code, Gemini CLI, etc.) on the same task
- **Task**: Build a lightweight webapp Snake game with:
  - Snake pattern gameplay (avoid objects & self)
  - Eating makes snake grow
  - Speed increases over time
  - Cheap hosting (local storage, shareable)

## Current State

The repository currently contains only documentation (README.md) and a LICENSE file. No actual implementations exist yet.

## Expected Development Workflow

As implementations are added to this repository:

1. **Separate Branches/Directories**: Each AI model's implementation should be isolated to allow direct comparison
2. **Static Hosting**: Since the goal is cheap hosting, implementations will likely be static HTML/CSS/JS files
3. **No Build Process**: Given the lightweight webapp requirement, expect vanilla JavaScript without build tools
4. **Local Development**: Simply open HTML files in a browser or use a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```

## Repository Structure (Expected)

```
snake-experimenter/
├── README.md              # Experiment documentation
├── LICENSE                # MIT License
├── claude-code/           # (Future) Claude Code implementation
├── gemini-cli/            # (Future) Gemini CLI implementation
└── [other-models]/        # (Future) Other AI model implementations
```

## Note for Future Development

This repository is intentionally minimal. When adding implementations:
- Keep each implementation self-contained
- Document any differences in approach between models
- Maintain the lightweight, shareable nature of the project
- Update this WARP.md with actual commands once a build system (if any) is added
