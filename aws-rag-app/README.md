# AWS Bedrock & OpenSearch Serverless RAG Application

This is a production-grade, privacy-compliant Retrieval-Augmented Generation (RAG) backend utilizing Amazon Web Services (AWS) Bedrock and OpenSearch Serverless.

---

## Features
* **Grounded Answers**: Context-aware queries using Anthropic Claude 3.5 Sonnet.
* **PII Redaction**: Automatic local scrubbing of names, emails, phones, and physical addresses via Microsoft Presidio during data ingestion.
* **OpenSearch Serverless Vector Engine**: Scalable, serverless indexing with k-NN cosine similarity search.
* **Robust Scaffold**: Clean separation of services, ingestion scripts, and CI/CD deployment files.

---

## 📂 Project Structure
```text
├── data/                    # Local vector stores or document inputs
├── deployment/
│   └── docker/              # Production deployment Dockerfile
├── scripts/
│   └── ingest.py            # Nightly database sync & vector loader script
├── src/
│   ├── main.py              # FastAPI server entrypoint
│   └── services/
│       ├── bedrock_service.py     # AWS Bedrock API interface
│       ├── opensearch_service.py  # AWS OpenSearch Serverless connector
│       └── pii_service.py         # Microsoft Presidio wrapper
├── .env.template            # Environment variables placeholder
├── .gitignore               # Git exclude list
├── requirements.in          # Unpinned Python packages
├── requirements.txt         # Pinned production packages
└── test_bedrock.py          # Quick Bedrock runtime connectivity test
```

---

## 🛠️ Local Development Setup

### 1. Create Virtual Environment & Install Dependencies
```bash
# Navigate to app directory
cd aws-rag-app

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Download Presidio's NLP Model dependency
python -m spacy download en_core_web_sm
```

### 2. Configure Credentials
Copy `.env.template` to `.env` and fill in your details:
```bash
cp .env.template .env
```
Fill in:
* `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`
* `OPENSEARCH_HOST` (OpenSearch Serverless collection URL)

---

## 🚀 Running the Services

### Verification Step: Test Bedrock Connection
Ensure AWS permissions are correct:
```bash
python test_bedrock.py
```

### Step 1: Run Ingestion Sync Pipeline
Scrub database source files, create vector index mappings, and upload documents:
```bash
python scripts/ingest.py
```

### Step 2: Boot FastAPI Server
```bash
python -m uvicorn src.main:app --reload --port 8000
```
Visit http://127.0.0.1:8000/docs to test `/query` and `/health` endpoints.

---

## 🐳 Docker Deployment
Build and run the containerized FastAPI application:
```bash
# Build from the aws-rag-app root
docker build -f deployment/docker/Dockerfile -t aws-rag-app .

# Run container
docker run -p 8000:8000 --env-file .env aws-rag-app
```
