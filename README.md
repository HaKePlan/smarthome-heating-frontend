## Getting Started

To run this webapplication:

1. create a `.env.local` in the root with following content:
  HOST=[your local host]
  PORT=[port for this application]
  APIROUTE=[for data fetching (route to server)]
  NEXT_PUBLIC_APIHOST=$HOST:$PORT$APIROUTE
  NEXT_PUBLIC_REFRESHINTERVAL=5000 // 5s reloading interval for data

2. run the development server:

```bash
npm run dev

Open [http://localhost:3010](http://localhost:3010) with your browser to see the result.```

