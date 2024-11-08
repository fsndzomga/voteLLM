from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
import re
import random
import pandas as pd

app = Flask(__name__)
CORS(app)

load_dotenv()

battleground_states = {
    "Arizona": {
        "Phoenix": {
            "population": 1680992,
            "demographics": "Diverse population with a growing Hispanic community; younger median age.",
            "political_notes": "Leans Republican historically but has become more competitive recently due to demographic changes."
        },
        "Tucson": {
            "population": 548073,
            "demographics": "Strong presence of university students and retirees; large Hispanic population.",
            "political_notes": "Typically leans Democratic, partly due to the university presence and more progressive community."
        },
        "Mesa": {
            "population": 518012,
            "demographics": "Suburban area with a mix of young families and retirees; high Hispanic population.",
            "political_notes": "Historically conservative but has shifted slightly in recent years."
        }
    },
    "Georgia": {
        "Atlanta": {
            "population": 498715,
            "demographics": "Diverse, majority African-American population; younger, highly educated residents in urban areas.",
            "political_notes": "Atlanta's influence as a progressive hub has shifted Georgia towards competitive status."
        },
        "Savannah": {
            "population": 145492,
            "demographics": "A mix of African-American and White populations; prominent tourism industry.",
            "political_notes": "Leans Democratic but is in a largely conservative surrounding area."
        },
        "Augusta": {
            "population": 202081,
            "demographics": "Diverse community, with a large military presence due to nearby Fort Gordon.",
            "political_notes": "Moderate-leaning with a strong military vote."
        }
    },
    "Michigan": {
        "Detroit": {
            "population": 639111,
            "demographics": "Predominantly African-American; economically challenged with revitalization efforts ongoing.",
            "political_notes": "Consistently Democratic; key for Democratic turnout in Michigan."
        },
        "Ann Arbor": {
            "population": 121477,
            "demographics": "Large student population due to University of Michigan; highly educated, younger population.",
            "political_notes": "Strongly Democratic; known for its progressive values."
        },
        "Grand Rapids": {
            "population": 202767,
            "demographics": "Predominantly White, suburban, with a mix of middle-class and affluent residents.",
            "political_notes": "Historically conservative but becoming more politically mixed."
        }
    },
    "Pennsylvania": {
        "Philadelphia": {
            "population": 1584200,
            "demographics": "Large African-American population, significant Hispanic and immigrant communities.",
            "political_notes": "Key Democratic stronghold; high voter turnout critical for state outcomes."
        },
        "Pittsburgh": {
            "population": 302205,
            "demographics": "Older population with industrial heritage; shifting tech industry and younger demographic influx.",
            "political_notes": "Leans Democratic but with conservative suburbs."
        },
        "Allentown": {
            "population": 121442,
            "demographics": "Diverse population, with a growing Hispanic community and middle-class families.",
            "political_notes": "Leans Democratic, reflecting suburban political shifts in Pennsylvania."
        }
    },
    "Wisconsin": {
        "Milwaukee": {
            "population": 577222,
            "demographics": "Predominantly African-American and Hispanic in urban core; surrounding suburbs more conservative.",
            "political_notes": "Milwaukee turnout is crucial for Democratic success in Wisconsin."
        },
        "Madison": {
            "population": 269840,
            "demographics": "University city with a young, highly educated population; progressive-leaning.",
            "political_notes": "Strongly Democratic; often the highest turnout region in the state."
        },
        "Green Bay": {
            "population": 104057,
            "demographics": "Predominantly White, with working-class and suburban demographics.",
            "political_notes": "Leans Republican but can swing based on economic issues."
        }
    },
    "Nevada": {
        "Las Vegas": {
            "population": 641903,
            "demographics": "Diverse, with a significant Hispanic population; strong union presence in service industries.",
            "political_notes": "Leans Democratic but with significant non-partisan voters; turnout varies."
        },
        "Reno": {
            "population": 268839,
            "demographics": "Primarily White with a growing tech industry and younger workforce.",
            "political_notes": "Generally leans Democratic but is less predictable than Las Vegas."
        }
    },
    "North Carolina": {
        "Charlotte": {
            "population": 874579,
            "demographics": "Diverse population with a strong banking industry; younger professionals.",
            "political_notes": "Leans Democratic, especially in urban areas, but surrounded by conservative regions."
        },
        "Raleigh": {
            "population": 467665,
            "demographics": "Highly educated with a large university presence; young, diverse population.",
            "political_notes": "Consistently Democratic in city center; key for state-level outcomes."
        },
        "Greensboro": {
            "population": 299035,
            "demographics": "Mixed demographics, with a significant African-American population and college presence.",
            "political_notes": "Leans Democratic but within a largely conservative state."
        }
    }
}

examples = [
    "Do you think Trump lost the 2020 election ?",
    "Do you think Trump should have recognized that he lost the 2020 election ?",
    "Do you think the Trump comment about 'they are eating the dogs' was racist ?",
    "Do you think Harris is competent ?",
    "Are you pro or against abortion"
]

client = OpenAI(
        base_url="https://api.studio.nebius.ai/v1/",
        api_key=os.environ.get("NEBIUS_API_KEY"),
        )


def extract_question(response_content):
    """Extracts question in <question> tags."""
    pattern = re.compile(r'<question>(.*?)</question>', re.DOTALL)
    match = pattern.search(response_content)
    if match:
        return match.group(1).strip()
    return None


def generate_questions():

    questions = []

    # The two first questions are always the same
    # one about the sex of the person in a yes or no format
    # and one about the age of the person in a yes or no format (>50 or less)
    # Sometimes ask are you a man, sometimes are you a woman to have a bit of variety
    gender_question = random.choice(
        ["Are you a woman ?", "Are you a man ?"]
    )

    questions.append(gender_question)
    questions.append("Are you older than 50 ?")

    # load questions from questions.txt file if any
    if os.path.exists("questions.txt"):
        with open("questions.txt", "r") as file:
            questions_bank = file.readlines()

    if len(questions_bank) >= 30:
        # randomly select 3 questions from the questions bank
        for _ in range(3):
            question = random.choice(questions_bank)
            questions.append(question)
        return questions
    else:
        # Load the key_moments.txt file and retrieve its content
        with open("key_moments.txt", "r") as file:
            key_moments = file.readlines()

        prompt = f"""
        Given the following key moments in the 2024 US election campaign: {key_moments}
        Generate a question that could be asked to someone in order to understand their opinion on the election.
        Put the question in a <question> tag.
        Example of questions for inspiration: {" ".join(examples)}
        The question should be different from these: {" ".join(questions)}
        The idea is to be able to draw a quick, fun profile of the person as a US battleground state voter.
        Questions should be diverse and dissimilar to each other, covering a wide range of moral, political, and social issues.
        Questions should be short and concise.
        """

        for _ in range(3):
            response = client.chat.completions.create(
                model="meta-llama/Meta-Llama-3.1-405B-Instruct",
                messages=[{"role": "user", "content": f"{prompt}"}]
            )

            question = extract_question(response.choices[0].message.content)

            questions.append(question)

        # serialize the questions to a file
        with open("questions.txt", "a+") as file:
            for question in questions:
                file.write(question + "\n")

        return questions


def extract_profile_data(response_content):
    """Extracts state, city, and personality from the response content."""
    tags = ['state', 'city', 'personality']
    data = {}

    for tag in tags:
        pattern = re.compile(rf'<{tag}>(.*?)</{tag}>', re.DOTALL)
        match = pattern.search(response_content)
        data[tag] = match.group(1).strip() if match else None

    return data['state'], data['city'], data['personality']


def generate_user_profile(questions, answers, vote_choice):
    # Generate a response based on answers and vote choice

    data = [f"To the question: {question}, the user answered: {answer}" for question, answer in zip(questions, answers)] + [f"The user's would vote for: {vote_choice}"]

    prompt = f"""Given the following answers to questions about the 2024 US election campaign: {data}
    Assign a likely battleground state and city of the user based on their answers.
    Here are some background details on a few battleground states:
    {battleground_states}
    Describe this hypothetical person's personality and what kind of voter
    they might be in a fun way.
    Example, You are a proud georgian from the Atlanta...
    give a response containing three tags: <state>, <city>, <personality>.
    for example: <state>Georgia</state><city>Atlanta</city><personality>you are a proud georgian from the Atlanta...</personality>
    """
    while True:
        response = client.chat.completions.create(
            model="meta-llama/Meta-Llama-3.1-405B-Instruct",
            messages=[{"role": "user", "content": f"{prompt}"}],
        )

        data = extract_profile_data(response.choices[0].message.content)

        # if state, city and personality are not None, return the data
        if all(data):
            break

    return {
        "state": data[0],
        "city": data[1],
        "description": data[2]
    }


@app.route('/generate_questions', methods=['GET'])
def get_questions():
    questions = generate_questions()
    return jsonify({"questions": questions})


@app.route('/submit_answers', methods=['POST'])
def submit_answers():
    data = request.json
    answers = data.get('answers')
    vote_choice = data.get('voteChoice')
    questions = data.get('questions')

    # store questions and answers in a file per user should be csv
    # put in pandas dataframe and save as csv
    # this is for dev only obviously does not work in production as i will lose data when using services like heroku or render
    df = pd.DataFrame(data)
    df.to_csv("answers.csv", index=False, mode='a', header=False)

    # Get user profile based on answers and vote choice
    profile = generate_user_profile(questions, answers, vote_choice)
    return jsonify({"profile": profile})


if __name__ == '__main__':
    # port = int(os.environ.get("PORT", 5000))  # Use the PORT environment variable or default to 5000
    # app.run(debug=False, host="0.0.0.0", port=port)

    app.run(debug=True)
