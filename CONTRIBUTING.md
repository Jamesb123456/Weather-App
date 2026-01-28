# Contributing to SkyPulse Weather

Thank you for your interest in contributing to SkyPulse Weather! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/skypulse.git
   cd skypulse
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add hourly forecast component
fix: resolve temperature unit conversion bug
docs: update README with new features
style: improve mobile responsiveness
refactor: simplify weather data parsing
```

### Pull Request Process

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against the `main` branch
5. Fill out the PR template with details about your changes
6. Wait for review and address any feedback

## 🧪 Testing

Before submitting a PR, make sure:

- The app builds without errors: `npm run build`
- There are no TypeScript errors: `tsc --noEmit`
- The linter passes: `npm run lint`

## 📁 Project Structure

```
src/
├── components/     # React components
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── lib/            # Utilities and API functions
└── styles/         # Global styles
```

## 🐛 Reporting Bugs

When reporting bugs, please include:

- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## 💡 Suggesting Features

We love new ideas! When suggesting features:

- Check if it's already been suggested
- Describe the use case
- Explain how it would benefit users
- Be open to discussion and feedback

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## 🙏 Thank You

Your contributions make SkyPulse Weather better for everyone. We appreciate your time and effort!
