"""
Clario Assessment - DynamoDB Question Populator (Diagnostic Version)
"""

print("=" * 60)
print("SCRIPT STARTED - Checking dependencies...")
print("=" * 60)

# Check Python version
import sys
print(f"\n✓ Python version: {sys.version}")

# Check boto3
try:
    import boto3
    print("✓ boto3 imported successfully")
except ImportError as e:
    print(f"✗ ERROR: boto3 not installed!")
    print(f"   Run: pip install boto3")
    sys.exit(1)

# Check other imports
try:
    import json
    from decimal import Decimal
    from botocore.exceptions import ClientError
    print("✓ All imports successful")
except ImportError as e:
    print(f"✗ ERROR importing modules: {e}")
    sys.exit(1)

print("\n" + "=" * 60)
print("CONNECTING TO AWS...")
print("=" * 60)

# Initialize DynamoDB
try:
    dynamodb = boto3.resource('dynamodb', region_name='eu-north-1')
    print("✓ DynamoDB resource created")
except Exception as e:
    print(f"✗ ERROR creating DynamoDB resource: {e}")
    print("\nMake sure you've configured AWS credentials:")
    print("  aws configure")
    sys.exit(1)

# Connect to table
try:
    table = dynamodb.Table('Question_table')
    print(f"✓ Connected to table: Question_table")
    
    # Try to describe the table to verify it exists
    table.load()
    print(f"✓ Table exists and is accessible")
    print(f"  Table status: {table.table_status}")
    
except ClientError as e:
    print(f"✗ ERROR: Cannot access table 'Question_table'")
    print(f"  Error: {e.response['Error']['Message']}")
    print("\nMake sure:")
    print("  1. Table name is correct")
    print("  2. Table exists in your AWS account")
    print("  3. You have permission to access it")
    sys.exit(1)
except Exception as e:
    print(f"✗ UNEXPECTED ERROR: {e}")
    sys.exit(1)


def convert_to_dynamodb_format(data):
    """Convert float to Decimal for DynamoDB"""
    if isinstance(data, list):
        return [convert_to_dynamodb_format(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_to_dynamodb_format(value) for key, value in data.items()}
    elif isinstance(data, float):
        return Decimal(str(data))
    else:
        return data


# Science Questions Data
SCIENCE_QUESTIONS = [
    {
        "question_id": "SCI_Q1",
        "stream": "SCIENCE",
        "question_number": 1,
        "text": "If your friend suddenly faints during school assembly, what's the first thing you'd do?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "Rush to check if they're breathing and get help fast",
                "career_tags": ["Medicine", "Nursing"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "Help carry them to a safe place",
                "career_tags": ["Physiotherapy", "Medical Laboratory Science", "Radiography"],
                "weight": 2
            },
            {
                "option_id": "C",
                "text": "Stand back and observe what's happening",
                "career_tags": ["Medical Laboratory Science", "Biochemistry", "Microbiology"],
                "weight": 1
            },
            {
                "option_id": "D",
                "text": "Feel nervous and call a teacher immediately",
                "career_tags": ["Computer Science", "Engineering", "Physics", "Chemistry", "Mathematics"],
                "weight": 0
            }
        ]
    },
    {
        "question_id": "SCI_Q2",
        "stream": "SCIENCE",
        "question_number": 2,
        "text": "On a scale of 1-5, how comfortable are you with seeing blood?",
        "question_type": "SCALE",
        "options": [
            {
                "option_id": "1",
                "text": "It really scares me",
                "career_tags": ["Computer Science", "Engineering", "Physics", "Chemistry", "Mathematics"],
                "weight": 0
            },
            {
                "option_id": "2",
                "text": "I don't like it",
                "career_tags": ["Computer Science", "Engineering", "Physics", "Chemistry", "Mathematics"],
                "weight": 0
            },
            {
                "option_id": "3",
                "text": "I can manage if I have to",
                "career_tags": ["Pharmacy", "Medical Laboratory Science", "Biochemistry"],
                "weight": 2
            },
            {
                "option_id": "4",
                "text": "I'm okay with it",
                "career_tags": ["Medicine", "Nursing", "Dentistry"],
                "weight": 3
            },
            {
                "option_id": "5",
                "text": "Doesn't bother me at all",
                "career_tags": ["Medicine", "Nursing", "Dentistry"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q3",
        "stream": "SCIENCE",
        "question_number": 3,
        "text": "Which of these would you rather do on a Saturday afternoon?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "Build something with my hands or fix broken gadgets",
                "career_tags": ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "Code a simple game or app",
                "career_tags": ["Computer Science", "Software Engineering", "Information Technology"],
                "weight": 3
            },
            {
                "option_id": "C",
                "text": "Read about how the human body works",
                "career_tags": ["Medicine", "Biology", "Anatomy"],
                "weight": 3
            },
            {
                "option_id": "D",
                "text": "Do chemistry experiments at home",
                "career_tags": ["Chemistry", "Pharmacy", "Chemical Engineering"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q4",
        "stream": "SCIENCE",
        "question_number": 4,
        "text": "Rate 1-5: 'I enjoy spending hours on my computer or phone learning tech stuff'",
        "question_type": "SCALE",
        "options": [
            {
                "option_id": "1",
                "text": "Not me at all",
                "career_tags": ["Biology", "Medicine", "Nursing", "Pharmacy"],
                "weight": 0
            },
            {
                "option_id": "2",
                "text": "Rarely",
                "career_tags": ["Biology", "Medicine", "Engineering"],
                "weight": 1
            },
            {
                "option_id": "3",
                "text": "Sometimes",
                "career_tags": ["Computer Engineering", "Biomedical Engineering"],
                "weight": 2
            },
            {
                "option_id": "4",
                "text": "Often",
                "career_tags": ["Computer Science", "Software Engineering", "Information Technology"],
                "weight": 3
            },
            {
                "option_id": "5",
                "text": "Yes! All the time",
                "career_tags": ["Computer Science", "Software Engineering", "Information Technology", "Cyber Security"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q5",
        "stream": "SCIENCE",
        "question_number": 5,
        "text": "Would you rather work:",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "In a hospital helping sick people every day",
                "career_tags": ["Medicine", "Nursing", "Physiotherapy"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "In a lab discovering new things",
                "career_tags": ["Biochemistry", "Microbiology", "Medical Laboratory Science"],
                "weight": 3
            },
            {
                "option_id": "C",
                "text": "In an office building software or analyzing data",
                "career_tags": ["Computer Science", "Data Science", "Software Engineering"],
                "weight": 3
            },
            {
                "option_id": "D",
                "text": "On construction sites or oil rigs",
                "career_tags": ["Civil Engineering", "Petroleum Engineering", "Mechanical Engineering"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q6",
        "stream": "SCIENCE",
        "question_number": 6,
        "text": "If you could create something, what would it be?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "A new medicine or vaccine",
                "career_tags": ["Pharmacy", "Medicine", "Biochemistry"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "A mobile app that helps people",
                "career_tags": ["Computer Science", "Software Engineering"],
                "weight": 3
            },
            {
                "option_id": "C",
                "text": "A bridge or building",
                "career_tags": ["Civil Engineering", "Architecture"],
                "weight": 3
            },
            {
                "option_id": "D",
                "text": "A robot or machine",
                "career_tags": ["Mechanical Engineering", "Electrical Engineering", "Robotics"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q7",
        "stream": "SCIENCE",
        "question_number": 7,
        "text": "Rate 1-5: 'I love solving math and physics problems'",
        "question_type": "SCALE",
        "options": [
            {
                "option_id": "1",
                "text": "I really struggle with them",
                "career_tags": ["Biology", "Nursing", "Medicine"],
                "weight": 0
            },
            {
                "option_id": "2",
                "text": "They're hard for me",
                "career_tags": ["Biology", "Medicine"],
                "weight": 1
            },
            {
                "option_id": "3",
                "text": "I can do them but don't enjoy them",
                "career_tags": ["Computer Science", "Chemistry"],
                "weight": 2
            },
            {
                "option_id": "4",
                "text": "I'm pretty good at them",
                "career_tags": ["Engineering", "Physics", "Mathematics"],
                "weight": 3
            },
            {
                "option_id": "5",
                "text": "I love them!",
                "career_tags": ["Engineering", "Physics", "Mathematics", "Computer Science"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q8",
        "stream": "SCIENCE",
        "question_number": 8,
        "text": "You have to choose a project. Which sounds most interesting?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "Study how plants grow in different soils",
                "career_tags": ["Agriculture", "Botany", "Environmental Science"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "Design a website for your school",
                "career_tags": ["Computer Science", "Information Technology"],
                "weight": 3
            },
            {
                "option_id": "C",
                "text": "Research germs under a microscope",
                "career_tags": ["Microbiology", "Medical Laboratory Science"],
                "weight": 3
            },
            {
                "option_id": "D",
                "text": "Build a small electric car",
                "career_tags": ["Mechanical Engineering", "Electrical Engineering"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q9",
        "stream": "SCIENCE",
        "question_number": 9,
        "text": "How do you feel about working with animals?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "I love animals! I want to help them",
                "career_tags": ["Veterinary Medicine", "Zoology", "Animal Science"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "I like them but prefer working with people",
                "career_tags": ["Medicine", "Nursing"],
                "weight": 2
            },
            {
                "option_id": "C",
                "text": "I'd rather work with machines or computers",
                "career_tags": ["Computer Science", "Engineering"],
                "weight": 1
            },
            {
                "option_id": "D",
                "text": "Not really interested in animals",
                "career_tags": ["Chemistry", "Physics", "Mathematics"],
                "weight": 0
            }
        ]
    },
    {
        "question_id": "SCI_Q10",
        "stream": "SCIENCE",
        "question_number": 10,
        "text": "Rate 1-5: 'I'm patient and don't mind doing the same thing carefully many times'",
        "question_type": "SCALE",
        "options": [
            {
                "option_id": "1",
                "text": "No, I get bored easily",
                "career_tags": ["Mathematics", "Physics"],
                "weight": 0
            },
            {
                "option_id": "2",
                "text": "Not really my style",
                "career_tags": ["Mathematics", "Physics"],
                "weight": 1
            },
            {
                "option_id": "3",
                "text": "Depends on what it is",
                "career_tags": ["Engineering", "Computer Science"],
                "weight": 2
            },
            {
                "option_id": "4",
                "text": "Yes, I can be patient",
                "career_tags": ["Medicine", "Pharmacy", "Medical Laboratory Science"],
                "weight": 3
            },
            {
                "option_id": "5",
                "text": "Yes, I'm very patient and detailed",
                "career_tags": ["Medicine", "Pharmacy", "Medical Laboratory Science", "Biochemistry"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q11",
        "stream": "SCIENCE",
        "question_number": 11,
        "text": "If you were rich and didn't need to work, you'd still want to:",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "Help cure diseases and save lives",
                "career_tags": ["Medicine", "Pharmacy", "Nursing"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "Invent new technology and gadgets",
                "career_tags": ["Computer Science", "Engineering", "Software Engineering"],
                "weight": 3
            },
            {
                "option_id": "C",
                "text": "Build things that improve cities",
                "career_tags": ["Civil Engineering", "Architecture"],
                "weight": 3
            },
            {
                "option_id": "D",
                "text": "Discover how nature works",
                "career_tags": ["Biology", "Environmental Science", "Chemistry"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q12",
        "stream": "SCIENCE",
        "question_number": 12,
        "text": "You're given a broken phone. What do you do?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "Try to fix it myself by opening it up",
                "career_tags": ["Electrical Engineering", "Mechanical Engineering"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "Search online how to repair it",
                "career_tags": ["Computer Engineering", "Information Technology"],
                "weight": 2
            },
            {
                "option_id": "C",
                "text": "Take it to someone who knows how",
                "career_tags": ["Computer Science"],
                "weight": 1
            },
            {
                "option_id": "D",
                "text": "Just buy a new one, it's not my thing",
                "career_tags": ["Biology", "Medicine", "Chemistry", "Physics"],
                "weight": 0
            }
        ]
    },
    {
        "question_id": "SCI_Q13",
        "stream": "SCIENCE",
        "question_number": 13,
        "text": "Rate 1-5: 'I want a job where I directly help people feel better or improve their lives'",
        "question_type": "SCALE",
        "options": [
            {
                "option_id": "1",
                "text": "Not important to me",
                "career_tags": ["Engineering", "Computer Science", "Physics", "Chemistry"],
                "weight": 0
            },
            {
                "option_id": "2",
                "text": "Nice but not necessary",
                "career_tags": ["Engineering", "Computer Science"],
                "weight": 1
            },
            {
                "option_id": "3",
                "text": "Somewhat important",
                "career_tags": ["Pharmacy", "Physiotherapy"],
                "weight": 2
            },
            {
                "option_id": "4",
                "text": "Very important",
                "career_tags": ["Medicine", "Nursing", "Physiotherapy"],
                "weight": 3
            },
            {
                "option_id": "5",
                "text": "Extremely important, it's my dream",
                "career_tags": ["Medicine", "Nursing"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q14",
        "stream": "SCIENCE",
        "question_number": 14,
        "text": "Which school subject is your favorite?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "Biology - I love learning about living things",
                "career_tags": ["Medicine", "Biology", "Microbiology", "Zoology"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "Chemistry - mixing things and reactions are cool",
                "career_tags": ["Pharmacy", "Chemistry", "Chemical Engineering"],
                "weight": 3
            },
            {
                "option_id": "C",
                "text": "Physics - understanding how things work",
                "career_tags": ["Engineering", "Physics"],
                "weight": 3
            },
            {
                "option_id": "D",
                "text": "Mathematics - solving problems with numbers",
                "career_tags": ["Computer Science", "Mathematics", "Engineering"],
                "weight": 3
            }
        ]
    },
    {
        "question_id": "SCI_Q15",
        "stream": "SCIENCE",
        "question_number": 15,
        "text": "In 10 years, where do you see yourself?",
        "question_type": "MULTIPLE_CHOICE",
        "options": [
            {
                "option_id": "A",
                "text": "In a white coat working in a hospital or clinic",
                "career_tags": ["Medicine", "Nursing", "Pharmacy"],
                "weight": 3
            },
            {
                "option_id": "B",
                "text": "At a tech company creating cool software",
                "career_tags": ["Computer Science", "Software Engineering", "Information Technology"],
                "weight": 3
            },
            {
                "option_id": "C",
                "text": "On-site managing big construction projects",
                "career_tags": ["Civil Engineering", "Mechanical Engineering", "Petroleum Engineering"],
                "weight": 3
            },
            {
                "option_id": "D",
                "text": "In a research lab making discoveries",
                "career_tags": ["Biochemistry", "Microbiology", "Chemistry"],
                "weight": 3
            }
        ]
    }
]

print(f"\n✓ Loaded {len(SCIENCE_QUESTIONS)} Science questions")

print("\n" + "=" * 60)
print("STARTING BATCH INSERT...")
print("=" * 60)

success_count = 0
error_count = 0

try:
    with table.batch_writer() as batch:
        for question in SCIENCE_QUESTIONS:
            try:
                # Convert to DynamoDB format
                item = convert_to_dynamodb_format(question)
                
                # Write to table
                batch.put_item(Item=item)
                
                success_count += 1
                print(f"✓ Inserted: {question['question_id']} - Q{question['question_number']}")
                
            except ClientError as e:
                error_count += 1
                print(f"✗ Error inserting {question['question_id']}: {e.response['Error']['Message']}")
            except Exception as e:
                error_count += 1
                print(f"✗ Unexpected error inserting {question['question_id']}: {str(e)}")
    
    print(f"\n{'='*60}")
    print(f"BATCH INSERT COMPLETED!")
    print(f"Successfully inserted: {success_count}/{len(SCIENCE_QUESTIONS)}")
    if error_count > 0:
        print(f"Errors encountered: {error_count}")
    print(f"{'='*60}\n")
    
except ClientError as e:
    print(f"\n✗ Batch write failed: {e.response['Error']['Message']}")
except Exception as e:
    print(f"\n✗ Unexpected error during batch write: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
print("SCRIPT COMPLETED")
print("=" * 60)