# Speasy

This project was created for the **TechEthos Hackathon**.

## Description

**Speasy** is a web application designed for real-time speech-to-speech translation between Tamil and English. It allows users to speak in one language, and the application will provide both the translated text and audio in the other language. The project also features a conversational AI to assist users. The frontend is built with ReactJS and Vite, while the backend is powered by ExpressJS and various Google Cloud services.

## Features

  * **Real-time Speech-to-Text:** Converts spoken language into text.
  * **Translation:** Translates text between Tamil and English.
  * **Text-to-Speech:** Converts translated text back into audible speech.
  * **Contextual Understanding:** Uses a paraphrasing model to provide more accurate translations based on user-provided context.
  * **Conversational AI:** An integrated chatbot to help and interact with users.
  * **Frontend:** Built with ReactJS for a dynamic and responsive user experience.
  * **Backend:** A robust backend built with Node.js and Express to handle all the processing.

## Technology Stack

  * **Frontend:** ReactJS, Vite, TailwindCSS
  * **Backend:** Node.js, ExpressJS
  * **APIs & Services:**
      * Google Cloud Speech-to-Text
      * Google Cloud Text-to-Speech
      * Google Cloud Translation
      * Google Generative AI (for paraphrasing)
      * Character.ai (for the conversational agent)

## Directory Structure

```
root
├── Client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   └── screens
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── Server
│   ├── routes
│   ├── storage
│   └── utils
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── test.html
└── iframe
    ├── public
    └── src
        └── components
```

## Environment Variables

Create a `.env` file in the `Server` directory with the following variables:

```
GEMINI_API_KEY=your-google-gemini-api-key
CAI_AUTH_TOKEN=your-character-ai-auth-token
```

You will also need to have a Google Cloud service account key file named `speesy-430611-088b524dad3e.json` in the `Server/utils` directory.

## Steps to Run the Project

### Prerequisites

  * Node.js and npm installed.
  * Google Cloud account with the necessary APIs enabled (Speech-to-Text, Text-to-Speech, Translation) and a service account key.
  * A Character.ai account and authentication token.

### Frontend (Client)

1.  Navigate to the `Client` directory:
    ```bash
    cd Client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the application in your browser at `http://localhost:5173`.

### Backend (Server)

1.  Navigate to the `Server` directory:
    ```bash
    cd Server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
4.  The backend will be running on `http://localhost:5000`.

### Iframe (for the embedded mobile view)

1.  Navigate to the `iframe` directory:
    ```bash
    cd iframe
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  This will run on a separate port and is used to embed the client application within a smartphone-like frame on the project's homepage.

## Usage

  * The main page provides an interface to set the context for the translation.
  * Navigate to the chat screen to start the speech-to-speech translation.
  * Use the microphone buttons to record your voice in either Tamil or English.
  * The application will display the translated text and provide an audio playback option.
  * A chatbot is available for any assistance.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software under the terms of the MIT License.
