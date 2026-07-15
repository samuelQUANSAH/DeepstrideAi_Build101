import os
import boto3
import json
from dotenv import load_dotenv

# Load local environment variables from .env
load_dotenv()

def test_bedrock_connection():
    print("--------------------------------------------------")
    print("Starting AWS Bedrock Connectivity Test...")
    print("--------------------------------------------------")
    
    region = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
    model_id = os.getenv("BEDROCK_LLM_MODEL_ID", "anthropic.claude-3-5-sonnet-20240620-v1:0")
    
    print(f"Target Region: {region}")
    print(f"Target LLM Model: {model_id}")
    
    try:
        # Initialize Bedrock Runtime client
        # Uses default credentials file (~/.aws/credentials) or local env parameters
        client = boto3.client(
            service_name="bedrock-runtime",
            region_name=region
        )
        
        # Payload format for Anthropic Claude 3 / 3.5 Sonnet
        payload = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 100,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Hello, AWS Bedrock. Verify connectivity."
                        }
                    ]
                }
            ],
            "temperature": 0.5
        }
        
        body = json.dumps(payload)
        
        print("\nInvoking model...")
        response = client.invoke_model(
            body=body,
            modelId=model_id,
            accept="application/json",
            contentType="application/json"
        )
        
        response_body = json.loads(response.get("body").read())
        content = response_body.get("content", [])
        if content:
            print("\nSUCCESS! AWS Bedrock responded:")
            print(content[0].get("text"))
        else:
            print("\nAWS Bedrock returned an empty response content.")
            print(f"Raw Response: {response_body}")
            
    except Exception as e:
        print(f"\nFAILURE! Error invoking AWS Bedrock: {e}")
        print("Please verify your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY values inside your local .env file.")
    print("--------------------------------------------------\n")

if __name__ == "__main__":
    test_bedrock_connection()
