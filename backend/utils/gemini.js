const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const MAX_TOPICS = 8 // B/c LLM don't know how to count 

// get a free key here: https://aistudio.google.com/apikey
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Load topics from topics.json
const topicsPath = path.join(__dirname, 'topics.json');
const allowedTopics = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));

async function analyzeProductDescription(description) {
    console.log("GEMINI_API_KEY ====> ", process.env.GEMINI_API_KEY);
    console.log("PRODUCT DESCRIPTION ====> ", description);
  try {
    const prompt = `Given the following product or service description, suggest 5 to ${MAX_TOPICS} relevant topics ONLY from the provided list that would be most relevant for tracking intent data.
    Ensure that the topics are relevant to the product or service description and are not generic, with at least 80% relevance.
    Return the topics as a JSON array of strings, and do not include any topics not in the list. 
    If none are relevant, return an empty array.\n\nProduct Description: ${description}\n\nAllowed Topics: ${JSON.stringify(allowedTopics)}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Remove Markdown code block markers if present
    const cleaned = text.replace(/```json|```/g, '').trim();
    let topics = JSON.parse(cleaned);
    // Filter to only allowed topics (case-insensitive match)
    topics = topics.filter(t => allowedTopics.some(at => at.toLowerCase() === t.toLowerCase()));
    if (!topics.length) {
      throw new Error('no related topics found');
    }
    return topics;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(error.message || 'Failed to analyze product description');
  }
}

module.exports = {
  analyzeProductDescription, 
  MAX_TOPICS
}; 