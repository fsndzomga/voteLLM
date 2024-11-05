# US Battleground State Voter Quiz

This is a fun and interactive web app that determines "What Kind of US Battleground State Voter Are You?" The app combines a multi-page questionnaire with an AI-powered personality generator to assign users a hypothetical battleground state and voter profile.

## Project Overview

The app is designed to:
1. Present users with 3-4 yes/no questions covering social, political, and economic views.
2. Ask users to hypothetically choose between candidates in a fictional 2024 election.
3. Generate a humorous, AI-driven profile describing the type of voter they might be, complete with a suggested battleground state and city.

## Features

- **Multi-Step Questionnaire**: Users answer questions in a sequential, multi-page format with smooth navigation.
- **AI-Generated Profile**: Uses an open source LLM from the [NEBIUS AI Studio](https://nebius.com/studio/inference?utm_medium=cpc&utm_source=voteLLM&utm_campaign=Network_en_all_lgen_inference_cloud&utm_term=voteLLM)  to generate a personalized, fun voter profile and assign a US battleground state and city.
- **Interactive Results Page**: Displays the user's hypothetical voter profile with animations for added engagement.

## Tech Stack

- **Frontend**: Next.js for server-side rendering and SEO benefits, along with React for smooth, multi-page form handling.
- **Backend**: Flask for handling API requests and logic, including AI integration.
- **AI Integration**: Uses NEBIUS AI Studio API for generating questions and creating the hypothetical voter profile.
- **State Management**: React context to handle multi-page state across the Next.js App Router.
- **Styling**: Tailwind CSS for responsive and modern design.

## Folder Structure

```plaintext
project-root
├── app/
│   ├── layout.js               # Global layout for all pages
│   ├── page.js                 # Home page (start of quiz)
│   ├── questions/[step]/       # Dynamic question pages
│   │   └── page.js
│   ├── vote/                   # Page for final candidate selection
│   │   └── page.js
│   └── results/                # Page displaying the user profile
│       └── page.js
└── backend/
    ├── app.py                  # Flask API for question generation and profile creation
    ├── requirements.txt         # Backend dependencies
    └── .env                     # Environment variables
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/fsndzomga/voteLLM.git
cd voteLLM
```

### 2. Install Backend Dependencies

Navigate to the `backend` folder and install the required packages from `requirements.txt`:

```bash
cd backend
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies

Navigate to the frontend directory:

```bash
cd ../frontend
npm install
```

### 4. Set Up Environment Variables

In the `backend` folder, create a `.env` file and add your **Nebius API key**:

```plaintext
NEBIUS_API_KEY=your_nebius_api_key
```

Replace `your_nebius_api_key` with the actual API key.

### 5. Run the Application

#### Start the Flask Backend

```bash
cd backend
python app.py
```

#### Start the Next.js Frontend

```bash
cd ../frontend
npm run dev
```

The app should now be running, with the backend on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## API Endpoints

- `GET /generate_questions`: Generates a set of fun, yes/no questions based on political, economic, and social topics.
- `POST /submit_answers`: Accepts the user’s answers and vote choice, generating a humorous profile with a battleground state and city.

## Future Improvements

- **Social Sharing**: Enable users to share their voter profile results on social media.
- **Expanded Analysis**: Include more detailed profile descriptions and additional battleground states.
- **Dynamic Question Generation**: Use the AI to dynamically generate unique questions for each user session.

## License

This project is licensed under the MIT License.
