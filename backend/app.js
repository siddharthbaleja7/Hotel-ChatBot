
// const express = require('express');
// require('dotenv').config();
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
// const { fetchBotResponse } = require('./openai');
// const { sequelize, testConnection } = require('./sequelize');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const HOTEL_API_BASE_URL = 'https://bot9assignement.deno.dev';

// // JSON body parser middleware
// app.use(bodyParser.json());

// // Define Conversation model
// const Conversation = sequelize.define('Conversation', {
//     messageId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userMessage: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     botResponse: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });

// // Sync database models
// sequelize.sync();

// // Function to fetch available rooms from Hotel API
// async function fetchAvailableRooms() {
//     try {
//         const response = await axios.get(`${HOTEL_API_BASE_URL}/rooms`);
//         return response.data; // Assuming API returns an array of rooms
//     } catch (error) {
//         console.error('Error fetching available rooms:', error.message);
//         return [];
//     }
// }

// // Function to create a new booking via Hotel API
// async function createBooking(roomId, fullName, email, nights) {
//     try {
//         const response = await axios.post(
//             `${HOTEL_API_BASE_URL}/book`,
//             {
//                 roomId,
//                 fullName,
//                 email,
//                 nights
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             }
//         );
//         return response.data; // Assuming API returns booking details or confirmation
//     } catch (error) {
//         console.error('Error creating booking:', error.message);
//         return null;
//     }
// }

// // Main endpoint for handling chat messages
// app.post('/chat', async (req, res) => {
//     const { message } = req.body;

//     // Save user message to database
//     const savedMessage = await Conversation.create({
//         messageId: Date.now().toString(), // Example messageId generation
//         userMessage: message,
//         botResponse: '', // Will be filled after processing
//     });

//     try {
//         // Call OpenAI API for bot response
//         const botResponse = await fetchBotResponse(message);

//         // Update the conversation record with bot response
//         await savedMessage.update({ botResponse });

//         res.json({ botResponse });
//     } catch (err) {
//         console.error('Error processing message:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Endpoint to fetch available rooms
// app.get('/rooms', async (req, res) => {
//     try {
//         const rooms = await fetchAvailableRooms();
//         res.json({ rooms });
//     } catch (error) {
//         console.error('Error fetching rooms:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Endpoint to create a booking
// app.post('/book', async (req, res) => {
//     const { roomId, fullName, email, nights } = req.body;

//     try {
//         const bookingResponse = await createBooking(roomId, fullName, email, nights);
//         res.json({ bookingResponse });
//     } catch (error) {
//         console.error('Error creating booking:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start server and test database connection
// app.listen(PORT, async () => {
//     await testConnection(); // Test database connection on server start
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
// const { fetchBotResponse } = require('./openai');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // JSON body parser middleware
// app.use(bodyParser.json());

// // Sequelize setup for SQLite
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: false,
// });

// // Define Conversation model
// const Conversation = sequelize.define('Conversation', {
//     messageId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userMessage: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     botResponse: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });

// // Sync database models
// sequelize.sync();

// // Function to get room options from hotel API
// async function getRoomOptions() {
//     try {
//         const response = await axios.get('https://bot9assignement.deno.dev/rooms');
//         return response.data; // Assuming the API returns an array of room options
//     } catch (error) {
//         console.error('Error fetching room options:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Main endpoint for handling chat messages and interacting with APIs
// // Main endpoint for handling chat messages and interacting with APIs
// app.post('/chat', async (req, res) => {
//     const { message } = req.body;

//     try {
//         // Save user message to database
//         const savedMessage = await Conversation.create({
//             messageId: Date.now().toString(),
//             userMessage: message,
//             botResponse: '', // Will be filled after processing
//         });

//         // Call OpenAI API for bot response
//         let botResponse = await fetchBotResponse(message);

//         // If bot response suggests getting room options
//         if (botResponse.includes('room options')) {
//             const roomOptions = await getRoomOptions();
//             // Format room options for bot response
//             let formattedResponse = "Here are the available room options:\n";
//             roomOptions.forEach(room => {
//                 formattedResponse += `\n${room.name}:\n- Description: ${room.description}\n- Price: ${room.price}\n`;
//             });
//             botResponse = formattedResponse;
//         }

//         // Update the conversation record with bot response
//         await savedMessage.update({ botResponse });

//         res.json({ botResponse });
//     } catch (err) {
//         console.error('Error processing message:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
// const { fetchBotResponse } = require('./openai');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // const cors = require('cors');
// // app.use(cors( { origin: 'http://127.0.0.1:5500' } ));

// // JSON body parser middleware
// app.use(bodyParser.json());

// // Sequelize setup for SQLite
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: false,
// });

// // Define Conversation model
// const Conversation = sequelize.define('Conversation', {
//     messageId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userMessage: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     botResponse: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });

// // Sync database models
// sequelize.sync();

// // Function to get room options from hotel API
// async function getRoomOptions() {
//     try {
//         const response = await axios.get('https://bot9assignement.deno.dev/rooms');
//         return response.data; // Assuming the API returns an array of room options
//     } catch (error) {
//         console.error('Error fetching room options:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Function to book a room via hotel booking API
// async function bookRoom(roomId, fullName, email, nights) {
//     try {
//         const response = await axios.post('https://bot9assignement.deno.dev/book', {
//             roomId,
//             fullName,
//             email,
//             nights
//         });
//         return response.data; // Assuming the API returns booking confirmation or details
//     } catch (error) {
//         console.error('Error booking room:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Main endpoint for handling chat messages and interacting with APIs
// app.post('/chat', async (req, res) => {
//     const { message, roomId, fullName, email, nights } = req.body;

//     try {
//         // Save user message to database
//         const savedMessage = await Conversation.create({
//             messageId: Date.now().toString(),
//             userMessage: message,
//             botResponse: '', // Will be filled after processing
//         });

//         // Call OpenAI API for bot response
//         let botResponse = await fetchBotResponse(message);

//         // If bot response suggests getting room options
//         if (botResponse.includes('room options')) {
//             const roomOptions = await getRoomOptions();
//             // Format room options for bot response
//             let formattedResponse = "Here are the available room options:\n";
//             roomOptions.forEach(room => {
//                 formattedResponse += `\n${room.name}:\n- Description: ${room.description}\n- Price: ${room.price}\n`;
//             });
//             botResponse = formattedResponse;
//         }
//         // If bot response suggests booking a room
//         else if (botResponse.includes('book a room')) {
//             // Perform room booking
//             const bookingResult = await bookRoom(roomId, fullName, email, nights);
//             botResponse = `Your room has been booked successfully!\nBooking ID: ${bookingResult.bookingId}\nConfirmation Email has been sent to: ${email}`;
//         }

//         // Update the conversation record with bot response
//         await savedMessage.update({ botResponse });

//         res.json({ botResponse });
//     } catch (err) {
//         console.error('Error processing message:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
// const { fetchBotResponse } = require('./openai'); // Assuming fetchBotResponse calls the Gemini API

// const app = express();
// const PORT = process.env.PORT || 3000;

// // JSON body parser middleware
// app.use(bodyParser.json());

// const cors = require('cors');
// app.use(cors());


// // Sequelize setup for SQLite
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: false,
// });

// // Define Conversation model
// const Conversation = sequelize.define('Conversation', {
//     messageId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userMessage: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     botResponse: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });

// // Sync database models
// sequelize.sync();

// // Function to get room options from hotel API
// async function getRoomOptions() {
//     try {
//         const response = await axios.get('https://bot9assignement.deno.dev/rooms');
//         return response.data; // Assuming the API returns an array of room options
//     } catch (error) {
//         console.error('Error fetching room options:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Function to book a room via hotel booking API
// async function bookRoom(roomId, fullName, email, nights) {
//     console.log(roomId,fullName,email,nights);
//     try {
//         const response = await axios.post('https://bot9assignement.deno.dev/book', {
//             roomId,
//             fullName,
//             email,
//             nights
//         });
//         return response.data; // Assuming the API returns booking confirmation or details
//     } catch (error) {
//         console.error('Error booking room:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Main endpoint for handling chat messages and interacting with APIs
// app.post('/chat', async (req, res) => {
//     const { message, roomId, fullName, email, nights } = req.body;

//     try {
//         // Check if message is provided
//         if (!message) {
//             throw new Error('Message is required');
//         }

//         // Save user message to database
//         const savedMessage = await Conversation.create({
//             messageId: Date.now().toString(),
//             userMessage: message,
//             botResponse: '', // Will be filled after processing
//         });

//         let botResponse = '';

//         // Example logic based on the message content
//         if (message.toLowerCase().includes('room options')) {
//             const roomOptions = await getRoomOptions();
//             // Format room options for bot response
//             let formattedResponse = "Here are the available room options:\n";
//             roomOptions.forEach(room => {
//                 formattedResponse += `\n${room.name}:\n- Description: ${room.description}\n- Price: ${room.price}\n`;
//             });
//             botResponse = formattedResponse;
//         } else if (message.toLowerCase().includes('book a room')) {
//             // Perform room booking
//             const bookingResult = await bookRoom(roomId, fullName, email, nights);
//             botResponse = `Your room has been booked successfully!\nBooking ID: ${bookingResult.bookingId}\nConfirmation Email has been sent to: ${email}`;
//         } else {
//             // Call Gemini API for bot response to unrecognized requests
//             const geminiResponse = await fetchBotResponse(message);
            
//             // Extract and format the relevant part of the response
//             botResponse = geminiResponse.candidates[0]?.content?.parts[0]?.text || 'Sorry, I did not understand that request.';
//         }

//         // Update the conversation record with bot response
//         await savedMessage.update({ botResponse });

//         res.json({ botResponse });
//     } catch (err) {
//         console.error('Error processing message:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
// const { fetchBotResponse } = require('./openai'); // Assuming fetchBotResponse calls the Gemini API

// const app = express();
// const PORT = process.env.PORT || 3000;

// // JSON body parser middleware
// app.use(bodyParser.json());

// const cors = require('cors');
// app.use(cors());

// // Sequelize setup for SQLite
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: false,
// });

// // Define Conversation model
// const Conversation = sequelize.define('Conversation', {
//     messageId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userMessage: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     botResponse: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });

// // Sync database models
// sequelize.sync();

// // Function to get room options from hotel API
// async function getRoomOptions() {
//     try {
//         const response = await axios.get('https://bot9assignement.deno.dev/rooms');
//         return response.data; // Assuming the API returns an array of room options
//     } catch (error) {
//         console.error('Error fetching room options:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Function to book a room via hotel booking API
// async function bookRoom(roomId, fullName, email, nights) {
//     console.log(roomId, fullName, email, nights);
//     try {
//         const response = await axios.post('https://bot9assignement.deno.dev/book', {
//             roomId,
//             fullName,
//             email,
//             nights
//         });
//         return response.data; // Assuming the API returns booking confirmation or details
//     } catch (error) {
//         console.error('Error booking room:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Function to parse message and extract booking details
// function parseBookingMessage(message) {
//     const fullNameMatch = message.match(/name:\s*([\w\s]+)/i);
//     const emailMatch = message.match(/email:\s*([\w.-]+@[\w.-]+)/i);
//     const nightsMatch = message.match(/nights:\s*(\d+)/i);


//     const fullName = fullNameMatch ? fullNameMatch[1] : null;
//     const email = emailMatch ? emailMatch[1] : null;
//     const nights = nightsMatch ? parseInt(nightsMatch[1], 10) : null;


//     return { fullName, email, nights };
// }

// // Function to select a room based on preferences
// async function selectRoom(roomType) {
//     const rooms = await getRoomOptions();
//     // Select the first available room that matches the room type
//     const room = rooms.find(r => r.name.toLowerCase() === roomType.toLowerCase());
//     if (room) {
//         return room.id;
//     } else {
//         throw new Error('No rooms available matching the specified type');
//     }
// }

// // Main endpoint for handling chat messages and interacting with APIs
// app.post('/chat', async (req, res) => {
//     const { message } = req.body;

//     try {
//         // Check if message is provided
//         if (!message) {
//             throw new Error('Message is required');
//         }

//         // Save user message to database
//         const savedMessage = await Conversation.create({
//             messageId: Date.now().toString(),
//             userMessage: message,
//             botResponse: '', // Will be filled after processing
//         });

//         let botResponse = '';

//         // Example logic based on the message content
//         if (message.toLowerCase().includes('room options')) {
//             const roomOptions = await getRoomOptions();
//             // Format room options for bot response
//             let formattedResponse = "Here are the available room options:\n";
//             roomOptions.forEach(room => {
//                 formattedResponse += `\n${room.name}:\n- Description: ${room.description}\n- Price: ${room.price}\n`;
//             });
//             botResponse = formattedResponse;
//         } else if (message.toLowerCase().includes('book a room')) {
//             // Extract booking details from message
//             const { fullName, email, nights } = parseBookingMessage(message);

//             // Ensure all details are extracted
//             if (fullName && email && nights) {
//                 const roomId = await selectRoom(roomType);
//                 const bookingResult = await bookRoom(roomId, fullName, email, nights);
//                 botResponse = `Congratulations! Your room has been booked successfully!\nBooking ID: ${bookingResult.bookingId}\nA confirmation email has been sent to: ${email}`;
//             }else{
//                 botResponse = 'Please provide all required booking details: name, email, number of nights';
//             }
//         } else {
//             // Call Gemini API for bot response to unrecognized requests
//             const geminiResponse = await fetchBotResponse(message);

//             // Extract and format the relevant part of the response
//             botResponse = geminiResponse.candidates[0]?.content?.parts[0]?.text || 'Sorry, I did not understand that request.';
//         }

//         // Update the conversation record with bot response
//         await savedMessage.update({ botResponse });

//         res.json({ botResponse });
//     } catch (err) {
//         console.error('Error processing message:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
// const { fetchBotResponse } = require('./openai'); // Assuming fetchBotResponse calls the Gemini API

// const app = express();
// const PORT = process.env.PORT || 3000;

// // JSON body parser middleware
// app.use(bodyParser.json());

// const cors = require('cors');
// app.use(cors());

// // Sequelize setup for SQLite
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: false,
// });

// // Define Conversation model
// const Conversation = sequelize.define('Conversation', {
//     messageId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userMessage: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     botResponse: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });

// // Sync database models
// sequelize.sync();

// // Function to get room options from hotel API
// async function getRoomOptions() {
//     try {
//         const response = await axios.get('https://bot9assignement.deno.dev/rooms');
//         return response.data; // Assuming the API returns an array of room options
//     } catch (error) {
//         console.error('Error fetching room options:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Function to book a room via hotel booking API
// async function bookRoom(roomId, fullName, email, nights) {
//     try {
//         const response = await axios.post('https://bot9assignement.deno.dev/book', {
//             roomId,
//             fullName,
//             email,
//             nights
//         });
//         return response.data; // Assuming the API returns booking confirmation or details
//     } catch (error) {
//         console.error('Error booking room:', error);
//         throw error; // Handle errors appropriately in your application
//     }
// }

// // Function to parse message and extract booking details
// function parseBookingMessage(message) {
//     const fullNameMatch = message.match(/name:\s*([\w\s]+)/i);
//     const emailMatch = message.match(/email:\s*([\w.-]+@[\w.-]+)/i);
//     const nightsMatch = message.match(/nights:\s*(\d+)/i);

//     const fullName = fullNameMatch ? fullNameMatch[1] : null;
//     const email = emailMatch ? emailMatch[1] : null;
//     const nights = nightsMatch ? parseInt(nightsMatch[1], 10) : null;

//     return { fullName, email, nights };
// }

// // Function to select a room based on preferences
// async function selectRoom(roomType) {
//     const rooms = await getRoomOptions();
//     // Select the first available room that matches the room type
//     const room = rooms.find(r => r.name.toLowerCase() === roomType.toLowerCase());
//     if (room) {
//         return room.id;
//     } else {
//         throw new Error('No rooms available matching the specified type');
//     }
// }

// // Main endpoint for handling chat messages and interacting with APIs
// // Main endpoint for handling chat messages and interacting with APIs
// app.post('/chat', async (req, res) => {
//     const { message } = req.body;

//     try {
//         // Check if message is provided
//         if (!message) {
//             throw new Error('Message is required');
//         }

//         // Save user message to database
//         const savedMessage = await Conversation.create({
//             messageId: Date.now().toString(),
//             userMessage: message,
//             botResponse: '', // Will be filled after processing
//         });

//         let botResponse = '';

//         // Example logic based on the message content
//         if (message.toLowerCase().includes('room options')) {
//             const roomOptions = await getRoomOptions();
//             // Format room options for bot response
//             let formattedResponse = "Here are the available room options:\n";
//             roomOptions.forEach(room => {
//                 formattedResponse += `\n${room.name}:\n- Description: ${room.description}\n- Price: ${room.price}\n`;
//             });
//             botResponse = formattedResponse;
//         } else if (message.toLowerCase().includes('book a room')) {
//             console.log('Booking request received:', message);
        
//             // Extract booking details directly from the message
//             const fullNameMatch = message.match(/name:\s*([\w\s]+)/i);
//             const emailMatch = message.match(/email:\s*([\w.-]+@[\w.-]+)/i);
//             const nightsMatch = message.match(/nights:\s*(\d+)/i);
        
//             console.log('fullNameMatch:', fullNameMatch);
//             console.log('emailMatch:', emailMatch);
//             console.log('nightsMatch:', nightsMatch);
        
//             const fullName = fullNameMatch ? fullNameMatch[1] : null;
//             const email = emailMatch ? emailMatch[1] : null;
//             const nights = nightsMatch ? parseInt(nightsMatch[1], 10) : null;
        
//             console.log('Extracted booking details:', fullName, email, nights);
        
//             if (fullName && email && nights) {
//                 const roomType = 'standard'; // Adjust as per your logic or extract from message
//                 const rooms = await getRoomOptions();
//                 const room = rooms.find(r => r.name.toLowerCase() === roomType.toLowerCase());
//                 if (room) {
//                     const bookingResult = await bookRoom(room.id, fullName, email, nights);
//                     botResponse = `Dear ${fullName}, your reservation is confirmed!\n`;
//                     botResponse += `Booking Reference: ${bookingResult.bookingId || '12345'}\n`;
//                     botResponse += `Name: ${fullName}\n`;
//                     botResponse += `Email: ${email}\n`;
//                     botResponse += `Nights: ${nights}\n`;
//                     botResponse += `Check-In: ${bookingResult.checkInDate}\n`;
//                     botResponse += `Check-Out: ${bookingResult.checkOutDate}\n`;
//                     botResponse += `Thank you for choosing us, and we look forward to your stay.`;
//                 } else {
//                     botResponse = 'No rooms available matching the specified type';
//                 }
//             } else {
//                 botResponse = 'Please provide all required booking details: name, email, and number of nights.';
//             }
        
//         } else {
//             // Call Gemini API for bot response to unrecognized requests
//             const geminiResponse = await fetchBotResponse(message);

//             // Extract and format the relevant part of the response
//             botResponse = geminiResponse.candidates[0]?.content?.parts[0]?.text || 'Sorry, I did not understand that request.';
//         }

//         // Update the conversation record with bot response
//         await savedMessage.update({ botResponse });

//         res.json({ botResponse });
//     } catch (err) {
//         console.error('Error processing message:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');
const { fetchBotResponse } = require('./openai'); // Assuming fetchBotResponse calls the Gemini API

const app = express();
const PORT = process.env.PORT || 3000;

// JSON body parser middleware
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Sequelize setup for SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

// Define Conversation model
const Conversation = sequelize.define('Conversation', {
    messageId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userMessage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    botResponse: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

// Sync database models
sequelize.sync();

// Function to get room options from hotel API
async function getRoomOptions() {
    try {
        const response = await axios.get('https://bot9assignement.deno.dev/rooms');
        return response.data; // Assuming the API returns an array of room options
    } catch (error) {
        console.error('Error fetching room options:', error);
        throw error; // Handle errors appropriately in your application
    }
}

// Function to book a room via hotel booking API
async function bookRoom(roomId, fullName, email, nights) {
    try {
        const response = await axios.post('https://bot9assignement.deno.dev/book', {
            roomId,
            fullName,
            email,
            nights
        });
        return response.data; // Assuming the API returns booking confirmation or details
    } catch (error) {
        console.error('Error booking room:', error);
        throw error; // Handle errors appropriately in your application
    }
}

// Function declarations for API documentation
const getRoomsFunctionDeclaration = {
    name: "get_Rooms",
    parameters: {
        type: "object",
        description: "Retrieve a list of available rooms.",
        properties: {      
            amenities: {
                type: "array",
                items: {
                    type: "string"
                },
                description: "List of amenities available in the rooms."
            },
            roomType: {
                type: "string",
                description: "Type of room (e.g., single, double, suite)."
            }
        },
        required: []
    }
};

const bookingFunctionDeclaration = {
    name: "book_Room",
    parameters: {
        type: "object",
        description: "Book a room with details like name, email, etc.",
        properties: {
            name: {
                type: "string",
                description: "Name of the person booking the room."
            },
            email: {
                type: "string",
                description: "Email address of the person booking the room."
            },
            nights: {
                type: "integer",
                description: "Number of nights for the booking."
            }
        },
        required: ["name", "email", "nights"]
    }
};

// Main endpoint for handling chat messages and interacting with APIs
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        // Check if message is provided
        if (!message) {
            throw new Error('Message is required');
        }

        // Save user message to database
        const savedMessage = await Conversation.create({
            messageId: Date.now().toString(),
            userMessage: message,
            botResponse: '', // Will be filled after processing
        });

        let botResponse = '';

        // Example logic based on the message content
        if (message.toLowerCase().includes('room options')) {
            const roomOptions = await getRoomOptions();
            // Format room options for bot response
            let formattedResponse = "Here are the available room options:\n";
            roomOptions.forEach(room => {
                formattedResponse += `\n${room.name}:\n- Description: ${room.description}\n- Price: ${room.price}\n`;
            });
            botResponse = formattedResponse;
        } else if (message.toLowerCase().includes('book a room')) {
            console.log('Booking request received:', message);
        
            // Extract booking details directly from the message
            const { fullName, email, nights } = req.body; // Assuming these are directly provided in the request body
        
            console.log('Extracted booking details:', fullName, email, nights);
        
            if (fullName && email && nights) {
                const roomType = 'standard'; // Adjust as per your logic or extract from message
                const rooms = await getRoomOptions();
                const room = rooms.find(r => r.name.toLowerCase() === roomType.toLowerCase());
                if (room) {
                    const bookingResult = await bookRoom(room.id, fullName, email, nights);
                    botResponse = `Dear ${fullName}, your reservation is confirmed!\n`;
                    botResponse += `Booking Reference: ${bookingResult.bookingId || '12345'}\n`;
                    botResponse += `Name: ${fullName}\n`;
                    botResponse += `Email: ${email}\n`;
                    botResponse += `Nights: ${nights}\n`;
                    botResponse += `Check-In: ${bookingResult.checkInDate}\n`;
                    botResponse += `Check-Out: ${bookingResult.checkOutDate}\n`;
                    botResponse += `Thank you for choosing us, and we look forward to your stay.`;
                } else {
                    botResponse = 'No rooms available matching the specified type';
                }
            } else {
                botResponse = 'Please provide all required booking details: name, email, and number of nights.';
            }
        
        } else {
            // Call Gemini API for bot response to unrecognized requests
            const geminiResponse = await fetchBotResponse(message);

            // Extract and format the relevant part of the response
            botResponse = geminiResponse.candidates[0]?.content?.parts[0]?.text || 'Sorry, I did not understand that request.';
        }

        // Update the conversation record with bot response
        await savedMessage.update({ botResponse });

        res.json({ botResponse });
    } catch (err) {
        console.error('Error processing message:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
