# Running the React Portfolio

## Quick Start

Since PM2 has permission issues on your system, use the standard npm dev server:

```bash
cd /Users/mohammadosama/Desktop/three/three-react
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000/
- **Network**: http://192.168.1.14:3000/

---

## Running in Background (Alternative to PM2)

### Option 1: Using nohup (Recommended)

```bash
cd /Users/mohammadosama/Desktop/three/three-react
nohup npm run dev > dev-server.log 2>&1 &
echo $! > .dev-server.pid
```

To stop:
```bash
kill $(cat .dev-server.pid)
rm .dev-server.pid
```

### Option 2: Using screen

```bash
# Start a screen session
screen -S react-portfolio

# Run the dev server
npm run dev

# Detach: Press Ctrl+A then D

# Reattach later
screen -r react-portfolio

# Kill the session
screen -X -S react-portfolio quit
```

### Option 3: Using tmux

```bash
# Start tmux session
tmux new -s react-portfolio

# Run the dev server
npm run dev

# Detach: Press Ctrl+B then D

# Reattach later
tmux attach -t react-portfolio

# Kill the session
tmux kill-session -t react-portfolio
```

---

## Helper Scripts

I've added these scripts to your `package.json`:

```bash
# Start in background
npm run dev:bg

# Stop background process
npm run dev:stop

# View logs
npm run dev:logs
```

---

## Production Build

When ready for production:

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

The build will be in the `dist/` directory.

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Clear Cache

```bash
rm -rf node_modules/.vite
npm run dev
```
