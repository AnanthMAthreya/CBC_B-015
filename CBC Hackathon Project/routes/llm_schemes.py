# routes/llm_schemes.py

import os
from flask import Blueprint, request, jsonify
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from routes.retrieve_schemes import get_vectorstore

# Setup Groq API
os.environ["GROQ_API_KEY"] = "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"
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("Groq API Key is not set.")

# Load LLaMA 3 via Groq
llm = ChatGroq(api_key=groq_api_key, model_name="llama3-8b-8192")

# Prompt template
prompt_template = PromptTemplate(
    input_variables=["question", "context"],
    template=(
        "You are an AI assistant that helps Indian citizens understand government schemes in simple language. "
        "Answer the question clearly and concisely based on the provided context. Provide examples if applicable.\n\n"
        "Question: {question}\n\n"
        "Context: {context}\n\n"
        "Answer:"
    )
)

qa_chain = LLMChain(llm=llm, prompt=prompt_template)

# Retriever
vectorstore = get_vectorstore()
retrieve_services = vectorstore.as_retriever()

# Define Blueprint
llm_schemes_bp = Blueprint("llm_schemes", __name__)

@llm_schemes_bp.route("/ask-scheme", methods=["POST"])
def ask_scheme():
    data = request.json
    question = data.get("question")

    # In /ask-scheme
    print(f"Received data: {data}")  # Log the received request
    
    if not question:
        return jsonify({"error": "Question is required"}), 400

    try:
        # Retrieve and format context
        retrieved_docs = retrieve_services.get_relevant_documents(question)
        context = " ".join([doc.page_content for doc in retrieved_docs])

        # Get response from LLM
        response = qa_chain.run(question=question, context=context)

        return jsonify({"answer": response})
    except Exception as e:
        return jsonify({"error": "Failed to process the request", "details": str(e)}), 500



