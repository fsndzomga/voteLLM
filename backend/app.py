from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import random
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

battleground_states = {
    "Arizona": ["Phoenix", "Tucson"],
    "Georgia": ["Atlanta", "Savannah"],
    "Michigan": ["Detroit", "Ann Arbor"],
    "Pennsylvania": ["Philadelphia", "Pittsburgh"],
    "Wisconsin": ["Milwaukee", "Madison"]
}

question_templates = [
    "Do you prefer {0} over {1}?",
    "Would you rather {0} than {1}?",
    "Are you more interested in {0} or {1}?"
]

topics = [
    ("small government", "social support programs"),
    ("lower taxes", "better public infrastructure"),
    ("less regulation", "more environmental protection"),
]


def generate_questions():
    questions = []
    for template, topic in zip(question_templates, topics):
        question = template.format(*topic)
        questions.append(question)
    return questions


def generate_user_profile(answers, vote_choice):
    # Generate a response based on answers and vote choice
    client = OpenAI(
        base_url="https://api.studio.nebius.ai/v1/",
        api_key=os.environ.get("NEBIUS_API_KEY"),
        )

    prompt = f"""Given the answers {answers} and vote choice {vote_choice},
    assign a likely battleground state and city.
    Describe this hypothetical person’s personality and what kind of voter
    they might be in a fun way.
    Example, You are a proud georgian from the Atlanta...
    """

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-405B-Instruct",
        messages=[{"role": "user", "content": f"{prompt}"}]
    )
    print(response.choices[0].message.content)
    return response.choices[0].message.content


@app.route('/generate_questions', methods=['GET'])
def get_questions():
    questions = generate_questions()
    return jsonify({"questions": questions})


@app.route('/submit_answers', methods=['POST'])
def submit_answers():
    data = request.json
    answers = data.get('answers')
    vote_choice = data.get('voteChoice')

    # Get a random state and city based on the vote choice
    profile = generate_user_profile(answers, vote_choice)
    return jsonify({"profile": profile})


if __name__ == '__main__':
    app.run(debug=True)
