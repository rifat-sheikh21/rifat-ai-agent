# Rifat AI Agent — Netlify Starter

## What this project does
A simple AI chat agent:
Browser → Netlify Function → OpenAI API → Browser

## Important
Never put your OpenAI API key inside `index.html` or browser JavaScript.

## Netlify deployment
1. Create an OpenAI API key.
2. Create a new Netlify site.
3. Upload this project folder, or connect its GitHub repository.
4. In Netlify, go to Project configuration → Environment variables.
5. Add:
   OPENAI_API_KEY = your OpenAI API key
6. Make sure the variable is available to Functions.
7. Deploy/redeploy the site.
8. Open the generated `.netlify.app` URL and test the chat.

## Files
- index.html — chat interface
- netlify/functions/chat.mjs — secure server-side AI request
- netlify.toml — Netlify configuration
