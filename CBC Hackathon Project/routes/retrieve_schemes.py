import os
from flask import Blueprint, jsonify
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Set up embedding model
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Define the base directory relative to the current file (which is in 'routes')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Paths (you can later move these to config)
pdf_folder_path = os.path.join(BASE_DIR, '..', 'Government Schemes', 'Schemes')
persist_directory = os.path.join(BASE_DIR, '..', 'vectorstore', 'db2')

# Create the Blueprint for retrieve_schemes
retrieve_schemes_bp = Blueprint("retrieve_schemes", __name__)

def build_vectorstore():
    all_docs = []
    for filename in os.listdir(pdf_folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(pdf_folder_path, filename)
            loader = PyMuPDFLoader(file_path)
            documents = loader.load()
            splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            chunks = splitter.split_documents(documents)
            all_docs.extend(chunks)

    print(f"✅ Total chunks: {len(all_docs)}")

    vectorstore = Chroma.from_documents(
        documents=all_docs,
        embedding=embedding,
        persist_directory=persist_directory
    )
    vectorstore.persist()
    print("✅ Vector DB created and saved.")
    return vectorstore

def get_vectorstore():
    return Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding
    )

# Blueprint Route to trigger building of vectorstore
@retrieve_schemes_bp.route('/build-vectorstore', methods=['GET'])
def build_vectorstore_route():
    try:
        vectorstore = build_vectorstore()
        return jsonify({"message": "Vectorstore created successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Blueprint Route to retrieve the vectorstore
@retrieve_schemes_bp.route('/get-vectorstore', methods=['GET'])
def get_vectorstore_route():
    try:
        vectorstore = get_vectorstore()
        return jsonify({"message": "Vectorstore retrieved successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
