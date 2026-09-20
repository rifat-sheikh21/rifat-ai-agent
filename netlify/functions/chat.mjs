export default async (req) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    // Get user's message
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({
          error: "Message is required."
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Get OpenAI API key from Netlify Environment Variables
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY is not configured in Netlify."
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Send request to OpenAI
    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },

        body: JSON.stringify({
          model: "gpt-5",
          
          instructions: `
You are Rifat AI Agent, a helpful and beginner-friendly AI assistant.

The user may speak Bangla, Banglish, or English.

Reply in the user's language whenever practical.

You specialize in:

- Digital Marketing
- GA4
- Google Tag Manager (GTM)
- Meta Pixel
- Conversion Tracking
- E-commerce Tracking
- Google Ads
- Facebook Ads
- Social Media Marketing
- Local SEO
- AI Website Creation
- AI Content Creation
- Freelancing
- Website Development

Explain technical topics in simple language, especially for beginners.

Give step-by-step instructions when the user asks how to do something.

Never claim that you performed an external action unless you actually performed it.

Be helpful, clear and concise.
`,

          input: message
        })
      }
    );

    // Convert OpenAI response to JSON
    const data = await response.json();

    // Handle OpenAI API errors
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error:
            data?.error?.message ||
            "OpenAI API request failed."
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Send AI response back to website
    return new Response(
      JSON.stringify({
        reply:
          data.output_text ||
          "I couldn't generate a response."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        error: "Server error. Please try again."
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
