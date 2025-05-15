# Customer Service Chat App

A simple customer service chat application that uses OpenAI's GPT to respond to user queries.

## Features

- Clean, modern UI built with Next.js, React, and Tailwind CSS
- Real-time interaction with OpenAI's GPT model
- Thumbs up/down rating system for agent responses
- Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your OpenAI API key:

Create a `.env.local` file in the root directory with the following:

```
OPENAI_API_KEY=your-openai-api-key-here
```

Replace `your-openai-api-key-here` with your actual OpenAI API key. You can get an API key from [OpenAI's platform](https://platform.openai.com/api-keys).

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

- Type a message in the input field and press enter or click the send button
- The app will send your message to OpenAI and display the response
- You can rate the AI's responses with thumbs up or thumbs down

## Technology Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- shadcn/ui
- OpenAI API

## Note

This is a frontend demonstration with basic OpenAI integration. In a production environment, you would want to:

1. Move the API key to a secure backend
2. Implement proper error handling and rate limiting
3. Add user authentication and conversation history
4. Implement proper context management for the AI
