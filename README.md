# SkyPulse Weather ⛅

A beautiful, production-ready weather application built with React, TypeScript, and TailwindCSS.

SkyPulse Weather

## ✨ Features

- **Real-time Weather Data** - Current conditions, hourly, and 7-day forecasts
- **City Search** - Find weather for any city with autocomplete
- **Geolocation** - Get weather for your current location
- **Air Quality Index** - Monitor PM2.5, PM10, and ozone levels
- **Weather Map** - Interactive radar map with precipitation overlay
- **Dark/Light Mode** - Automatic theme detection with manual toggle
- **Unit Toggle** - Switch between Celsius and Fahrenheit
- **Favorite Cities** - Save and quickly access your favorite locations
- **Keyboard Shortcuts** - Power user features for quick navigation
- **PWA Support** - Install as a native app on any device
- **Responsive Design** - Beautiful on mobile, tablet, and desktop

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3.4 + shadcn/ui
- **Icons**: Lucide React
- **Maps**: Leaflet + React-Leaflet
- **PWA**: vite-plugin-pwa
- **API**: Open-Meteo (no API key required!)

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `Esc` | Close dialogs |
| `T` | Toggle theme |
| `U` | Toggle units |
| `F` | Toggle favorite |
| `R` | Refresh data |

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # Header, Container
│   ├── weather/       # Weather display components
│   ├── search/        # Search and favorites
│   ├── settings/      # Theme and unit toggles
│   ├── shared/        # Error boundary, skeletons
│   └── ui/            # shadcn/ui components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── lib/
│   ├── api/           # API functions and types
│   └── utils/         # Utility functions
└── styles/            # Global CSS
```

## 🌐 API

This app uses the free [Open-Meteo API](https://open-meteo.com/) which requires no API key:

- **Weather**: `https://api.open-meteo.com/v1/forecast`
- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Air Quality**: `https://air-quality-api.open-meteo.com/v1/air-quality`

## 🎨 Design Features

- **Glassmorphism** - Modern frosted glass effect cards
- **Time-based Gradients** - Background changes with time of day
- **Smooth Animations** - Micro-interactions and transitions
- **Mobile-first** - Responsive breakpoints at 640px and 1024px

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data by [Open-Meteo](https://open-meteo.com/)
- Radar tiles by [RainViewer](https://www.rainviewer.com/)
- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)

---

Built with ❤️ by [James]
