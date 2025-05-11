# routes/llm_services.py

import os
from flask import Blueprint, request, jsonify
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from routes.retrieve_services import get_vectorstore

# Setup Groq API
os.environ["GROQ_API_KEY"] = "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"
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("Groq API Key is not set.")

# Load Groq + LLaMA 3
llm = ChatGroq(api_key=groq_api_key, model_name="llama3-8b-8192")

# Prompt template
prompt_template = PromptTemplate(
    input_variables=["question", "context"],
    template=(
        "You are an AI assistant that helps Indian citizens understand government digital services in simple language. "
        "Use the following context to answer the question clearly and concisely. Provide examples if applicable.\n\n"
        "Context: {context}\n\n"
        "Question: {question}\n\n"
        "Answer:"
    )
)

qa_chain = LLMChain(llm=llm, prompt=prompt_template)

# Retriever
vectorstore = get_vectorstore()
retrieve_services = vectorstore.as_retriever()

# Define Blueprint
llm_services_bp = Blueprint("llm_services", __name__)

@llm_services_bp.route("/ask-service", methods=["POST"])
def ask_service():
    data = request.json
    question = data.get("question")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    # Retrieve the relevant context
    retrieved_docs = retrieve_services.get_relevant_documents(question)
    context = " ".join([doc.page_content for doc in retrieved_docs])

    # Get LLM response
    response = qa_chain.run(question=question, context=context)

    return jsonify({"answer": response})
