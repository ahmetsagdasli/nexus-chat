# Nexus Chat - AI Chat Application

<div align="center">

  ![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
  ![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green?logo=openai)
  ![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)
  ![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

A modern React + TypeScript chat application with AI integration capabilities.

## 🎬 Live Demo

> **🚀 Quick Start**: `npm install && npm run dev`

### Interactive Demo GIF
*Coming soon - Demo showcasing theme switching, model selection, and AI conversations*

<!-- ![Demo GIF](assets/nexus-chat-demo.gif) -->

### 🎯 Demo Features:
- **Theme Switching**: Dark ↔ Light mode with smooth transitions
- **Model Selection**: Switch between GPT-3.5, GPT-4, GPT-4 Turbo
- **Real-time Chat**: Animated typing indicators and message flow
- **Code Highlighting**: Syntax highlighting for code blocks
- **Responsive Design**: Mobile and desktop layouts

## 📷 Screenshots

<div align="center">
  <img src="assets/dark-theme.png" alt="Dark Theme" width="45%">
  <img src="assets/light-theme.png" alt="Light Theme" width="45%">
</div>

## Features

- 💬 Modern chat interface with **dark/light theme support**
- 🤖 **Real OpenAI integration** with multiple model support (GPT-3.5, GPT-4, GPT-4 Turbo)
- 🎨 **Theme toggle** - Switch between dark and light modes
- 🔄 **Model selector** - Choose from different AI models on-the-fly
- 📱 Responsive design for desktop and mobile
- ⚡ Real-time typing indicators
- 🕒 Message timestamps
- 🧹 Clear chat functionality
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- 🔧 **Status indicators** - Shows current AI model and connection status

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository or download the source code
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

- `src/components/` - React components (ChatMessage, ChatInput, ThemeToggle, ModelSelector)
- `src/contexts/` - React contexts (ThemeContext)
- `src/hooks/` - Custom React hooks (useChat)
- `src/services/` - Services and utilities (AIService)
- `src/types.ts` - TypeScript type definitions and available AI models
- `src/App.tsx` - Main application component
- `src/App.css` - Application styles with theme support
- `src/index.css` - Global styles and CSS custom properties

## Theme Support

The application supports both dark and light themes with smooth transitions:

- **Dark Theme**: Default modern dark interface
- **Light Theme**: Clean light interface for better accessibility
- **Theme Persistence**: Your theme choice is saved to localStorage
- **CSS Variables**: All colors use CSS custom properties for consistent theming
- **Toggle Button**: Click the ☀️/🌙 button in the header to switch themes

## Model Selection

When using real OpenAI integration, you can select from different models:

- **GPT-3.5 Turbo**: Fast and efficient for most tasks
- **GPT-4**: More capable, slower and more expensive
- **GPT-4 Turbo**: Latest GPT-4 with improved capabilities

The model selector dropdown appears only when real AI is connected.

## AI Integration

The application currently uses simulated AI responses with contextual logic. The `AIService` class is designed to be easily replaced with real AI API integration (OpenAI, Claude, etc.).

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern design patterns

## License

ISC License