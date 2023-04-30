import base64
from pathlib import Path

secret_dir = Path(__file__).resolve().parent

#with open(secret_dir / 'ads_joindomain.b64.txt') as b64_file:
#   ads_joindomain_password = base64.b64decode(b64_file.read().strip()).decode()

# with open(secret_dir / 'secret_key.b64.txt') as b64_file:
#     secret_key = base64.b64decode(b64_file.read().strip()).decode()

# with open(secret_dir / 'db_password.b64.txt') as b64_file:
#     db_password = base64.b64decode(b64_file.read().strip()).decode()
