# demo-integration-wizard-gemini

A full-stack demo for IntentDataCompany topic integration into HubSpot using Google Gemini and the HubSpot CRM API.

## Project Structure

```
/demo-integration-wizard-gemini
├── frontend
│   ├── src
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── components/IntegrationForm.tsx
│   │   └── types.ts
│   ├── package.json
│   └── tsconfig.json
├── backend
│   ├── index.js
│   ├── .env.example
│   ├── routes/analyze.js
│   ├── routes/hubspot.js
│   └── utils/topics.json
├── README.md
└── .gitignore
```

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd demo-integration-wizard-gemini
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3031
```

### 3. Backend Setup

```bash
cd backend
cp sample.env .env
# Fill in your GEMINI_API_KEY in .env
npm install
npm run dev
# Runs on http://localhost:3032
```

## Features
- Enter a product/service description to get suggested IntentDataCompany topics (via Gemini)
- Copy/paste YAML output
- Integrate topics into HubSpot with a single click
- Success/failure messages with error details

## Environment Variables
See `backend/sample.env` for required keys:
Get a free key here: https://aistudio.google.com/apikey

```
GEMINI_API_KEY=<add your key>
```

## Sample YAML Output

```
topic_cluster: Cloud Security Topics
topics:
  - Cloud Security
  - CASB
  - Zero Trust
  - Data Loss Prevention
hubspot_fields:
  - Cloud_Security_Topics_Surge_Score
  - Cloud_Security_Topics_Last_Surge_Date
  - Cloud_Security_Topics_Topic_Count
dynamic_lists:
  - name: Hot Cloud Security Leads
    filter: Surge_Score > 50
``` 

Note - there is an "Integrate with HubSpot" botton that auto-returns success, to acctually integrate with HS later(?)