# Conway's Game of Life

An interactive, fully-featured implementation of **Conway's Game of Life** - a cellular automaton that demonstrates how complex patterns can emerge from simple rules. Explore patterns, customize the appearance, and watch life evolve in real-time.

## ✨ Features

### Core Simulation
- **Real-time cellular automaton** following Conway's original rules
- **Adjustable speed control** (1x to 20x playback)
- **Step-by-step simulation** for detailed observation
- **Interactive grid** - click cells to toggle them alive or dead
- **Two boundary modes**:
  - **Toroidal**: Grid wraps around at edges (like a donut)
  - **Finite**: Hard boundaries where edge cells have fewer neighbors

### Customization
- **Grid size selection** (5×5 to 50×50)
- **Color customization**:
  - Grid color
  - Dead cell color
  - Alive cell color
  - Grid thickness adjustment
- **4 color scheme presets**:
  - Light Mode (clean, professional)
  - Dark Mode (eye-friendly)
  - High Contrast (accessibility-focused)
  - Neon (vibrant, modern)

### Patterns & Analysis
- **Pre-built pattern library**:
  - Still lifes (Block, Beehive, Loaf, Boat)
  - Oscillators (Blinker, Toad, Beacon, Pulsar)
  - Spaceships (Glider, LWSS, MWSS)
  - Methuselahs (Acorn, R-pentomino)
  - Custom patterns
- **Live statistics**:
  - Current generation count
  - Live cell count
  - Population growth rate
  - Population density

### Responsive Design
- **Mobile-first design** - works seamlessly on phones and tablets
- **Adaptive grid scaling** - grid fits perfectly on any screen size
- **No horizontal/vertical scrolling required** on any device
- **Touch-friendly interface** for mobile users

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Git** (for version control and deployment)

### Local Development

1. **Clone the repository** (or extract the project files)
   ```bash
   git clone https://github.com/yourusername/game-of-life.git
   cd game-of-life
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

   The browser will automatically reload when you make changes.

### Running Tests

This project includes comprehensive unit tests to ensure code quality and reliability.

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode (for development):**
```bash
npm run test:watch
```

**Run tests with coverage report:**
```bash
npm run test:coverage
```

**Run tests with interactive UI:**
```bash
npm run test:ui
```

All tests follow the Arrange-Act-Assert pattern and cover:
- Utility functions
- React components
- Custom hooks
- Game logic
- UI interactions

**Build-Time Test Validation:**

Tests automatically run during `npm run build`. **The build will fail if any tests fail**, ensuring:
- All tests must pass before deployment
- Clear, verbose error messages identify failing tests
- Fast feedback with bail-on-first-failure
- No deployments with broken functionality

This is critical for platforms like Vercel, where failed builds prevent deployment of broken code.

### Building for Production

```bash
npm run build
```

**Important:** Tests run automatically during the build process. The build will fail if any tests don't pass.

This creates:
- Optimized frontend bundle in `/dist/public`
- Compiled backend in `/dist`

To run the production build locally:
```bash
node dist/server/index.js
```

Then open http://localhost:4000 in your browser.

---

## 📦 Project Structure

```
game-of-life/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   └── ui/                  # shadcn/ui component library
│   │   ├── features/gameoflife/     # Game of Life feature components
│   │   │   ├── GameGrid.tsx         # Main grid renderer
│   │   │   ├── GameCell.tsx         # Individual cell component
│   │   │   ├── useGameOfLife.ts     # Simulation logic hook
│   │   │   ├── patterns.ts          # Pattern definitions
│   │   │   ├── colorSchemes.ts      # Color scheme presets
│   │   │   ├── ColorCustomizer.tsx  # Color picker component
│   │   │   ├── ColorSchemeSelector.tsx # Preset selector
│   │   │   ├── PatternSelector.tsx  # Pattern loader
│   │   │   ├── GridSizeSelector.tsx # Grid sizing
│   │   │   ├── Statistics.tsx       # Population stats
│   │   │   └── Analytics.tsx        # Simulation metrics
│   │   ├── pages/
│   │   │   └── GameOfLife.tsx       # Main page
│   │   ├── App.tsx                  # Root component
│   │   └── main.tsx                 # Entry point
│   └── public/                      # Static assets
├── server/
│   ├── index.ts                     # Express API server
│   └── static-serve.ts              # Static file serving
├── package.json                     # Dependencies
├── vite.config.js                   # Frontend build config
├── tsconfig.json                    # TypeScript config
└── README.md                        # This file
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **TypeScript** - Type-safe backend

### Testing
- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **@vitest/ui** - Interactive test runner UI
- **Coverage Reports** - v8 coverage provider

### Development Tools
- **TSX** - TypeScript executor with hot reload
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🎮 How to Use

### Getting Started
1. **Click cells** to toggle them alive (blue) or dead (gray)
2. Press **Play** to start the simulation
3. Watch patterns evolve following Conway's rules

### Controls
| Button | Action |
|--------|--------|
| **Play/Pause** | Start or stop the simulation |
| **Step** | Advance one generation (when paused) |
| **Reset** | Clear all cells |
| **Randomize** | Fill grid with random cells |

### Conway's Rules
A cell's next state depends on its current state and the number of live neighbors:
1. **A live cell with 2-3 neighbors survives** (stays alive)
2. **A live cell with any other number of neighbors dies** (underpopulation or overpopulation)
3. **A dead cell with exactly 3 neighbors becomes alive** (reproduction)
4. **A dead cell with any other number of neighbors stays dead**

### Recommended Patterns to Try
- **Glider**: Moves diagonally across the grid
- **Pulsar**: Beautiful oscillating pattern (period 3)
- **Blinker**: Simplest oscillator (period 2)
- **Acorn**: A methuselah - evolves for 5206 generations!

---

## 🌐 Deployment

### GitHub Pages (Static Hosting)

This project is optimized for GitHub Pages deployment:

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/game-of-life.git
   git push -u origin main
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Set source to "Deploy from a branch"
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click **Save**

4. **Update base URL** (optional, if not using a custom domain)
   - Edit `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/game-of-life/',  // Replace with your repo name
     // ... rest of config
   });
   ```

5. **Redeploy**
   ```bash
   git add .
   git commit -m "Update base URL for GitHub Pages"
   git push
   ```

Your site will be available at: `https://yourusername.github.io/game-of-life`

### Vercel (Recommended)

Vercel provides free hosting with automatic deployments and runs tests automatically during deployment:

1. **Push to GitHub** (follow steps above)

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects the setup

3. **Configure build settings**
   - Build command: `npm run build` (tests run automatically before build)
   - Output directory: `dist/public`
   - Node.js version: 18.x or higher

4. **Deploy**
   - Click "Deploy"
   - Tests run first - deployment only proceeds if all tests pass
   - Your site goes live instantly!
   - Automatic deployments on every push to `main`

**Important Notes for Vercel:**
- Tests must pass for deployment to succeed
- Build logs will show test results
- Failed tests will prevent broken code from being deployed
- Coverage reports are generated but not published by default

Your site will be available at: `https://your-project.vercel.app`

### Netlify

1. **Connect to GitHub**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository

2. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Netlify automatically deploys on every push
   - Custom domain support available

### Self-Hosted (VPS/Server)

For AWS, DigitalOcean, or any Linux server:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to server**
   ```bash
   scp -r dist/ user@server:/path/to/app/
   ```

3. **Install dependencies on server**
   ```bash
   cd /path/to/app
   npm install --production
   ```

4. **Start the server**
   ```bash
   NODE_ENV=production PORT=4000 node dist/server/index.js
   ```

5. **Set up reverse proxy** (using Nginx)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start dist/server/index.js --name "game-of-life"
   pm2 startup
   pm2 save
   ```

---

## 🎨 Customization Guide

### Creating Custom Patterns

Edit `client/src/features/gameoflife/patterns.ts`:

```typescript
export const patterns = {
  // ... existing patterns
  myPattern: {
    name: 'My Pattern',
    description: 'A custom pattern I created',
    grid: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    offsetX: 1,
    offsetY: 0,
  },
};
```

### Creating Custom Color Schemes

Edit `client/src/features/gameoflife/colorSchemes.ts`:

```typescript
export const colorSchemes = {
  // ... existing schemes
  ocean: {
    name: 'Ocean',
    gridColor: '#0369a1',      // Deep ocean blue
    deadCellColor: '#e0f2fe',  // Light cyan
    aliveCellColor: '#0284c7', // Ocean blue
    gridThickness: 1,
  },
};
```

---

## 🐛 Troubleshooting

### Grid doesn't render on mobile
- Clear browser cache
- Ensure device has at least 360px width
- Try a smaller grid size (10×10)

### Performance is slow
- Reduce grid size
- Lower simulation speed
- Try a different boundary type

### Colors not showing up
- Check if dark mode is enabled in system settings
- Try a different color scheme preset
- Refresh the page

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Resources & Learning

### About Conway's Game of Life
- [Wikipedia: Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [LifeWiki](https://www.conwaylife.com/) - Comprehensive database of patterns
- [The Game of Life, Animated](https://playgameoflife.com/) - Interactive explorer

### Pattern Collections
- [Still Lifes](https://www.conwaylife.com/wiki/Still_life)
- [Oscillators](https://www.conwaylife.com/wiki/Oscillator)
- [Spaceships](https://www.conwaylife.com/wiki/Spaceship)
- [Methuselahs](https://www.conwaylife.com/wiki/Methuselah)

---

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 💡 Feature Ideas

Future enhancements could include:
- Save/load simulation states
- Export patterns as RLE (Run Length Encoding)
- Import patterns from LifeWiki
- Performance optimization for larger grids
- 3D Game of Life variant
- Multiplayer mode
- Custom rules editor

---

## 📞 Support

- **Bug reports**: Open an issue on GitHub
- **Feature requests**: Start a discussion
- **Questions**: Check existing issues first

---

## 🎉 Enjoy!

Have fun exploring the infinite patterns and behaviors that emerge from simple rules. Welcome to the fascinating world of cellular automata!

