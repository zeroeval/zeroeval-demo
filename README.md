# ZeroEval Demo: Customer Service Chat App

This demo project showcases [ZeroEval](https://zeroeval.com), a platform for effortless A/B testing of LLMs in production. The app demonstrates how to implement our drop-in proxy endpoint and getting instant feedback on model performance from users through an example customer service chat application.

## What is ZeroEval?

ZeroEval provides a drop-in proxy endpoint that allows you to:

- Split-test different AI models and prompts
- Capture user feedback (thumbs up/down) on responses
- Analyze which models perform better based on real user interaction
- Make data-driven decisions about which models to use in production

## Demo Features

- **ZeroEval Proxy Integration**: Routes AI requests through ZeroEval's proxy endpoint
- **Feedback Attribution**: Captures thumbs up/down ratings and ties them to specific completions

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your ZeroEval API key:

Create a `.env` file in the root directory with the following:

```
NEXT_PUBLIC_ZEROEVAL_API_KEY=
NEXT_PUBLIC_ZEROEVAL_WORKSPACE_ID=
OPENAI_API_KEY=
```

You can get a ZeroEval API key and workspace ID from the [ZeroEval dashboard](https://zeroeval.com).

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## How It Works

### ZeroEval Proxy Integration

The app uses ZeroEval's proxy endpoint instead of calling OpenAI directly. This is configured in `src/app/api/chat/route.ts`:

```typescript
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_ZEROEVAL_API_KEY,
  baseURL: "https://api.zeroeval.com/proxy"
});

const completion = await openai.chat.completions.create({
  model: "zeroeval/<model-id>",
  messages: [...],
});
```

To get a model ID, you need to create a new test through the [ZeroEval dashboard](https://zeroeval.com).

### Feedback Attribution

The app captures user feedback using thumbs up/down buttons and sends it to ZeroEval in `src/components/ChatMessage.tsx`:

```typescript
const submitFeedback = async (isPositive: boolean) => {
  if (!completion_id) return;

  const response = await fetch(
    "https://api.zeroeval.com/workspaces/<workspace-id>/tests/annotation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZEROEVAL_API_KEY}`,
      },
      body: JSON.stringify({
        completion_id: completion_id,
        name: "Acceptance",
        value: isPositive ? "true" : "false",
      }),
    }
  );
};
```

## Technology Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- shadcn/ui
- ZeroEval API

## Questions

Email us at [founders@zeroeval.com](mailto:founders@zeroeval.com) for questions, feeback or support.
