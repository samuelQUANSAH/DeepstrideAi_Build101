import os
import uuid
from dotenv import load_dotenv

# Load local environment parameters
load_dotenv()

from aws_rag_app.src.services.pii_service import PIIService
from aws_rag_app.src.services.bedrock_service import BedrockService
from aws_rag_app.src.services.opensearch_service import OpenSearchService

# Mock Inventory Records representing database rows
# Some records deliberately contain customer/supplier PII that must be redacted
MOCK_INVENTORY_DB = [
    {
        "product_id": "FURN-0982",
        "name": "Mid-Century Modern Dining Table",
        "description": "Solid walnut dining table designed to seat up to 6 people. Created by designer Samuel Quansah at samuel@creativefurniture.com. For questions call 555-0199.",
        "category": "Dining Room",
        "dimensions": "72\" L x 36\" W x 30\" H"
    },
    {
        "product_id": "FURN-3301",
        "name": "Ergonomic Office Mesh Chair",
        "description": "Adjustable armrests and lumbar support. Managed by account manager Jane Doe. All warranty inquiries should go to 123 Tech Parkway, San Jose, CA.",
        "category": "Office",
        "dimensions": "26\" W x 26\" D x 40\"-45\" H"
    },
    {
        "product_id": "FURN-1189",
        "name": "Velvet Tufted Chesterfield Sofa",
        "description": "Classic Chesterfield sofa in royal blue velvet with deep tufting and turned wood legs.",
        "category": "Living Room",
        "dimensions": "88\" W x 38\" D x 33\" H"
    }
]

def run_ingestion():
    print("--------------------------------------------------")
    print("Starting Ingestion Pipeline Sync Job...")
    print("--------------------------------------------------")
    
    try:
        # Initialize services
        pii = PIIService()
        bedrock = BedrockService()
        opensearch = OpenSearchService()
        
        # Ensure index exists
        opensearch.create_vector_index()
        
        print("\nProcessing database rows...")
        for row in MOCK_INVENTORY_DB:
            pid = row["product_id"]
            title = row["name"]
            raw_desc = row["description"]
            
            print(f"\nProcessing [{pid}] {title}...")
            print(f"-> Raw Description: {raw_desc}")
            
            # 1. Run local PII Redaction
            clean_desc = pii.redact_text(raw_desc)
            print(f"-> Redacted Description: {clean_desc}")
            
            # Combine fields to build the indexing string
            index_text = f"Product: {title}\nCategory: {row['category']}\nDimensions: {row['dimensions']}\nDetails: {clean_desc}"
            
            # 2. Get vector embeddings
            print("-> Computing embedding vector...")
            vector = bedrock.get_embeddings(index_text)
            
            # 3. Upload to OpenSearch Serverless
            print("-> Syncing to OpenSearch Serverless...")
            metadata = {
                "product_id": pid,
                "name": title,
                "category": row["category"],
                "dimensions": row["dimensions"]
            }
            
            response = opensearch.index_document(
                doc_id=pid,
                text=index_text,
                vector=vector,
                metadata=metadata
            )
            print(f"-> Indexed successfully (ID: {response.get('_id')})")
            
        print("\nIngestion pipeline complete successfully!")
        
    except Exception as e:
        print(f"\nIngestion failed: {e}")
        print("Please check your AWS default credentials and your .env configuration.")
    print("--------------------------------------------------\n")

if __name__ == "__main__":
    run_ingestion()
