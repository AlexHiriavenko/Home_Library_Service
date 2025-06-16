# 🎵 Home Library Service

A NestJS-based application for managing users, artists, albums, and tracks.

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repo-url>
cd HomeLibraryService/docker_db_orm
```

### 2. Install dependencies

```bash
npm install
```

Create your `.env` file based on the `.env.example`:

```bash
cp .env.example .env
```

---

## ⚙️ Running the App with 🐳 Docker

```bash
npm run docker:start
```

- Launches `PostgreSQL` and the NestJS app in containers.
- Swagger is available at: [http://localhost:4000/api](http://localhost:4000/api)

To stop:

```bash
Ctrl+C twice
```

- First press: wait for containers to gracefully stop
- Second press: return to the CLI prompt

If something goes wrong:

```bash
npm run docker:hardReset
npm run docker:start
```

## 🔍 Logger

You can find the logs folder in the root of the project
This logs folder and the files in it will be generated automatically after the first log.

---

## 🧪 Testing

### Without authorization

```bash
npm run test            # run all tests
npm run test -- path    # run a specific test file
```

### With authorization

```bash
npm run test:auth
npm run test:auth -- path
```

---

## 💅 Linting and Formatting

```bash
npm run lint      # run linter
npm run format    # auto-format code
```

---

## 🐞 Debugging in VS Code

Press <kbd>F5</kbd> in the editor to start debugging.

Documentation: https://code.visualstudio.com/docs/editor/debugging
