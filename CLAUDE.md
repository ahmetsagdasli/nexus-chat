# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Agent Tool is a React + TypeScript chat application with AI integration capabilities. It provides a modern chat interface where users can interact with an AI assistant.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite dev server on port 3000
- **Build**: `npm run build` - TypeScript compilation followed by Vite build
- **Preview**: `npm run preview` - Preview production build locally
- **Lint**: `npm run lint` - Currently no linter configured
- **Test**: `npm run test` - Currently no tests configured

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatMessage.tsx  # Individual message component
│   └── ChatInput.tsx    # Message input component
├── hooks/
│   └── useChat.ts       # Chat state management hook
├── services/
│   └── aiService.ts     # AI integration service
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main app component
├── App.css              # Application styles
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Architecture Notes

### State Management
- Uses React hooks for state management (`useChat` custom hook)
- Messages are stored as arrays with unique IDs and timestamps
- Loading states managed for async AI responses

### AI Integration
- `AIService` class handles AI response generation
- **Real OpenAI Integration**: Uses OpenAI GPT-3.5-turbo API when API key is provided
- **Fallback Mode**: Uses simulated responses when API key is not available
- Environment variable support: `VITE_OPENAI_API_KEY`
- Supports conversation history for context-aware responses
- Status indicator shows whether real AI or simulated responses are being used

### UI/UX
- Modern dark theme chat interface
- Responsive design with mobile support
- Real-time typing indicators
- Auto-scrolling to latest messages
- Message timestamps and role indicators

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **Styling**: Pure CSS with modern design patterns
- **Build Tool**: Vite with React plugin
- **Type Safety**: Full TypeScript integration

## Environment Setup

To enable real OpenAI integration, create a `.env` file in the project root:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

The application will automatically detect the API key and switch from simulated to real AI responses.