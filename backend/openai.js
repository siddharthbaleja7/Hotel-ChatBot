// require('dotenv').config();
// const axios = require('axios');

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const OPENAI_API_BASE_URL = 'https://api.openai.com/v1';

// // Function to call OpenAI API for chat completions
// async function fetchBotResponse(userMessage) {
//     console.log(messages)
//     try {
//         const messages = [
//             { role: 'user', content: userMessage }
//         ];
//         const response = await axios.post(
//             `${OPENAI_API_BASE_URL}/chat/completions`,
//             {
//                 model: 'gpt-4o',
//                 messages: messages
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${OPENAI_API_KEY}`
//                 }
//             }
//         );

//         return response.data.choices[0].message.content.trim();
//     } catch (error) {
//         // console.error('Error fetching completion:', error.message);
//         return null;
//     }
// }


// module.exports = {
//   fetchBotResponse,
// };
// openai.js
// require('dotenv').config();
// const axios = require('axios');

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const OPENAI_API_BASE_URL = 'https://api.openai.com/v1';

// // Function to call OpenAI API for chat completions
// async function fetchBotResponse(userMessage) {
//     try {
//         const messages = [
//             { role: 'user', content: userMessage }
//         ];
//         const response = await axios.post(
//             `${OPENAI_API_BASE_URL}/chat/completions`,
//             {
//                 model: 'gpt-3.5-turbo', // Adjust model name as per your requirement
//                 messages: messages
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${OPENAI_API_KEY}`
//                 }
//             }
//         );

//         return response.data.choices[0].message.content.trim();
//     } catch (error) {
//         console.error('Error fetching completion:', error.message);
//         return null;
//     }
// }

// module.exports = {
//     fetchBotResponse,
// };

require('dotenv').config();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

// Function to call Gemini API for content generation
async function fetchBotResponse(userMessage) {
    try {
        const contents = [
            {
                role: 'user',
                parts: [{ text: userMessage }]
            }
        ];
        const response = await axios.post(
            GEMINI_API_BASE_URL,
            {
                contents: contents
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': GEMINI_API_KEY
                }
            }
        );

        return response.data; // Adjust as needed to get the exact response format
    } catch (error) {
        console.error('Error fetching content from Gemini API:', error.message);
        return null;
    }
}

module.exports = {
    fetchBotResponse,
};
