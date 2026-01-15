# PM2 Management Commands

## Quick Start

The React portfolio is now managed by PM2. Here are the essential commands:

### Start the Application
```bash
pm2 start ecosystem.config.cjs
```

### View Running Processes
```bash
pm2 list
```

### View Logs
```bash
# View all logs
pm2 logs three-react-portfolio

# View last 50 lines
pm2 logs three-react-portfolio --lines 50

# View only errors
pm2 logs three-react-portfolio --err
```

### Stop the Application
```bash
pm2 stop three-react-portfolio
```

### Restart the Application
```bash
pm2 restart three-react-portfolio
```

### Delete from PM2
```bash
pm2 delete three-react-portfolio
```

### Monitor Resources
```bash
pm2 monit
```

### Save PM2 Configuration (Auto-start on reboot)
```bash
pm2 save
pm2 startup
```

## Application Details

- **Name**: three-react-portfolio
- **URL**: http://localhost:5173/
- **Logs Directory**: `./logs/`
- **Config File**: `ecosystem.config.cjs`

## Troubleshooting

If you encounter issues:

1. **Check logs**: `pm2 logs three-react-portfolio`
2. **Restart**: `pm2 restart three-react-portfolio`
3. **Check status**: `pm2 list`
4. **View detailed info**: `pm2 show three-react-portfolio`

## Update PM2

If you see a version mismatch warning:
```bash
pm2 update
```
