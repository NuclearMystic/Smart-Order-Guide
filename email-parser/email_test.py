from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# Define the scope to read Gmail messages
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# Specify the sender's email address to filter by
SENDER_EMAIL = "Admin@inlawshospitality.com"  # Replace with the actual sender's email address

def main():
    # Start the OAuth flow
    flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
    creds = flow.run_local_server(port=0)

    # Use the credentials to access Gmail API
    service = build('gmail', 'v1', credentials=creds)
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=1000).execute()
    messages = results.get('messages', [])

    print("Filtered Emails from Specific Sender:")
    for msg in messages:
        msg_data = service.users().messages().get(userId='me', id=msg['id']).execute()
        
        # Extract 'From' header and filter by specific sender
        headers = msg_data['payload']['headers']
        sender = next((header['value'] for header in headers if header['name'] == 'From'), None)
        
        # If the sender matches, print the subject
        if sender and SENDER_EMAIL in sender:
            subject = next((header['value'] for header in headers if header['name'] == 'Subject'), "No Subject")
            print(f"From: {sender}")
            print(f"Subject: {subject}\n")

if __name__ == '__main__':
    main()
