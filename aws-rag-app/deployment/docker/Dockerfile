# Use official lightweight Python parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt /app/

# Install python packages
RUN pip install --no-cache-dir -r requirements.txt

# Download the SpaCy model required by Microsoft Presidio Analyzer
RUN python -m spacy download en_core_web_sm

# Copy project files
COPY . /app/aws-rag-app/

# Expose target server port
EXPOSE ${PORT}

# Run the FastAPI app via uvicorn
CMD ["sh", "-c", "python -m uvicorn aws-rag-app.src.main:app --host 0.0.0.0 --port ${PORT}"]
