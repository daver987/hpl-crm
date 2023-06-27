# High Park Livery CRM (hpl-crm)

## Overview
This project is the backend administrative area for the High Park Livery website. It provides a comprehensive dashboard to manage quote submissions, dispatch systems, and analytics. The CRM integrates data from multiple systems to offer a clear overview of the business operations.

## Key Features
- **Quote Submissions Overview:** Allows admins to view and manage all the quote submissions.
- **Customizable Quote Calculations:** Admins can control the calculation logic for the quotes on the website.
- **Integrated Analytics:** Displays insightful charts and statistics.
- **Multi-system Integration:** Brings in data from Fasttrak, Evertransit, Stripe, and the PlanetScale database to provide a holistic view of the business operations.
- **Quote Push to Dispatch:** Enables admins to push unbooked quotes from the CRM into the dispatch system of choice (Fasttrak or Evertransit) if the client books the order.
- **Automated Sales Follow-up:** Uses GPT-4 to generate and send a follow-up email for unbooked quotes at the press of a single button.
- **UI:** Uses Naive UI for the interface components.

## Tech Stack
- Frontend: Nuxt 3, Naive UI
- Backend: Node.js, Fasttrak, Evertransit, Stripe, Upstash
- Database: PlanetScale (Prisma, tRPC)


## Setup & Installation
- **Pre-requisites:** Node.js (version 16 due to hosting provider limitations), Yarn.

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

## Contact
If you have any questions or feedback, feel free to reach out to me at info@drobertson.pro
