import re
from presidio_analyzer import AnalyzerEngine, PatternRecognizer, Pattern
from presidio_anonymizer import AnonymizerEngine
from presidio_anonymizer.entities import OperatorConfig

class PIIService:
    def __init__(self):
        # Initialize Presidio engines
        self.analyzer = AnalyzerEngine()
        self.anonymizer = AnonymizerEngine()
        self._add_custom_patterns()
        
    def _add_custom_patterns(self):
        """Add custom pattern recognizers to Presidio for addresses and additional phone patterns."""
        # Simple USA Address pattern: e.g. 123 Main St, New York, NY 10001
        address_pattern = Pattern(
            name="us_address_pattern",
            regex=r"\d{1,5}\s\w+\s(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Dr|Drive|Ln|Lane|Way)\b",
            score=0.85
        )
        address_recognizer = PatternRecognizer(
            supported_entity="ADDRESS",
            patterns=[address_pattern]
        )
        self.analyzer.registry.add_recognizer(address_recognizer)

    def redact_text(self, text: str) -> str:
        """
        Scans input text for PII (names, phone numbers, emails, addresses)
        and returns the anonymized string with redacted placeholders.
        """
        if not text or not text.strip():
            return text
            
        # 1. Analyze text for PII
        # We request standard entities: EMAIL, PHONE_NUMBER, IP_ADDRESS, US_PASSPORT, CREDIT_CARD, etc.
        # Plus our custom ADDRESS entity
        entities = ["EMAIL_ADDRESS", "PHONE_NUMBER", "IP_ADDRESS", "CREDIT_CARD", "PERSON", "ADDRESS"]
        results = self.analyzer.analyze(
            text=text,
            language="en",
            entities=entities
        )
        
        # 2. Anonymize (replace PII with placeholders)
        # Customizing operators to output clean placeholders like <EMAIL>, <PHONE>
        anonymized_result = self.anonymizer.anonymize(
            text=text,
            analyzer_results=results,
            operators={
                "EMAIL_ADDRESS": OperatorConfig("replace", {"new_value": "<EMAIL>"}),
                "PHONE_NUMBER": OperatorConfig("replace", {"new_value": "<PHONE>"}),
                "IP_ADDRESS": OperatorConfig("replace", {"new_value": "<IP_ADDRESS>"}),
                "CREDIT_CARD": OperatorConfig("replace", {"new_value": "<CREDIT_CARD>"}),
                "PERSON": OperatorConfig("replace", {"new_value": "<NAME>"}),
                "ADDRESS": OperatorConfig("replace", {"new_value": "<ADDRESS>"}),
                "DEFAULT": OperatorConfig("replace", {"new_value": "<REDACTED>"})
            }
        )
        
        return anonymized_result.text

# Quick self-test block
if __name__ == "__main__":
    service = PIIService()
    sample = "Hello Samuel! You can reach me at 555-0199 or email me at samuel@example.com. My office is located at 456 Tech Parkway."
    print("Original:\n", sample)
    print("Redacted:\n", service.redact_text(sample))
