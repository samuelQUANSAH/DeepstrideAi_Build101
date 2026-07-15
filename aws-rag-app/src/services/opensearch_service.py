import os
from opensearchpy import OpenSearch, RequestsHttpConnection
from typing import List, Dict, Any

class OpenSearchService:
    def __init__(self):
        self.host = os.getenv("OPENSEARCH_HOST", "").replace("https://", "").replace("http://", "").split("/")[0]
        self.region = os.getenv("OPENSEARCH_REGION", "us-east-1")
        self.index_name = os.getenv("OPENSEARCH_INDEX_NAME", "furniture-specs-index")
        
        # Connection options for AWS OpenSearch Serverless
        # Under production IAM setup, you would use RequestsHttpConnection with AWS4Auth
        self.client = OpenSearch(
            hosts=[{"host": self.host, "port": 443}],
            http_auth=None,  # SigV4 handles this automatically inside AWS or via local AWS SDK credentials
            use_ssl=True,
            verify_certs=True,
            connection_class=RequestsHttpConnection
        )

    def create_vector_index(self):
        """
        Creates the OpenSearch Serverless index with a k-NN vector field mapping.
        """
        index_body = {
            "settings": {
                "index.knn": True
            },
            "mappings": {
                "properties": {
                    "vector_field": {
                        "type": "knn_vector",
                        "dimension": 1024,
                        "method": {
                            "name": "hnsw",
                            "space_type": "cosinesimil",
                            "engine": "nmslib"
                        }
                    },
                    "text": {
                        "type": "text"
                    },
                    "metadata": {
                        "type": "object"
                    }
                }
            }
        }
        
        if not self.client.indices.exists(index=self.index_name):
            print(f"Creating vector index: {self.index_name}...")
            self.client.indices.create(index=self.index_name, body=index_body)
            print("Index created successfully.")
        else:
            print(f"Index {self.index_name} already exists.")

    def index_document(self, doc_id: str, text: str, vector: List[float], metadata: Dict[str, Any]):
        """
        Pushes a single document chunk (scrubbed text, metadata, and embedding vector) into OpenSearch.
        """
        document = {
            "vector_field": vector,
            "text": text,
            "metadata": metadata
        }
        
        return self.client.index(
            index=self.index_name,
            body=document,
            id=doc_id,
            refresh=True
        )

    def search_similar_documents(self, query_vector: List[float], top_k: int = 3) -> List[Dict[str, Any]]:
        """
        Performs vector search in OpenSearch using k-NN query.
        """
        query = {
            "size": top_k,
            "query": {
                "knn": {
                    "vector_field": {
                        "vector": query_vector,
                        "k": top_k
                    }
                }
            }
        }
        
        response = self.client.search(
            body=query,
            index=self.index_name
        )
        
        hits = response.get("hits", {}).get("hits", [])
        results = []
        for hit in hits:
            results.append({
                "id": hit.get("_id"),
                "text": hit.get("_source", {}).get("text"),
                "metadata": hit.get("_source", {}).get("metadata"),
                "score": hit.get("_score")
            })
        return results
