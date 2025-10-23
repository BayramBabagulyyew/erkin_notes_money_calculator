# Notes Calculator

A lightweight notes app that blends free-form notes with inline calculation. Write notes, tag and search them, and evaluate math expressions directly inside a note.

## Features

- Create, edit and delete notes (plain text / Markdown)
- Inline expression evaluation (e.g. `= 12 * 3 + 4`)
- Tagging and quick search
- Export / import notes (JSON)
- Simple CLI and minimal web UI

## Getting started

Prerequisites

- Node.js 18+ (or language/runtime of your choice)
- Git (optional)

Install

- Clone repository:
  git clone <repo-url>
- Install dependencies:
  npm install

Run

- Development server:
  npm run dev
- Build:
  npm run build
- CLI:
  npm run cli -- <command>

## Usage examples

Create a note (CLI)

- Add:
  notes add "Shopping list\n= 12.50 + 3.75" --tags=shopping
- List:
  notes list --tag=shopping
- View:
  notes view <note-id>

Inline calculation

- Put expressions on their own line prefixed with `=`:
  = 100 / 4
- The app will evaluate and show the result when viewing or exporting.

Web UI

- Open http://localhost:3000
- Create notes, enter expressions, and use search/tags.

## Data & config

- Notes stored in ./data/notes.json (default)
- Config in ./config.json (storage path, server port, evaluator options)

## Contributing

- Fork, create a feature branch, run tests, and open a PR.
- Keep changes small and focused. Add tests for new behavior.

## License

- MIT

Notes: Replace placeholder scripts, port and storage path to fit your project structure.
