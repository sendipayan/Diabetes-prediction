# Diabetes Prediction Demo

`Diabetes Prediction Demo` is a Next.js frontend for a K-Nearest Neighbors based diabetes risk prediction workflow. It collects patient health metrics, sends them to a Flask prediction API, and displays the predicted class with a confidence score. The backend model is a KNN classifier with a reported accuracy of 81%.

This project is intended as an ML demo and UI showcase, not a medical device. The result should not be used for diagnosis or treatment decisions.

## What This Project Includes

- Landing page with product overview and call to action
- Prediction form for eight clinical input features
- Next.js server action that forwards requests to a Flask backend
- Result page showing predicted label and confidence
- Tailwind CSS and reusable UI primitives for the interface

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Radix UI / shadcn-style components
- Flask API integration for model inference
- Backend KNN model with reported 81% accuracy

## How It Works

1. A user opens the homepage and starts a prediction.
2. The `/predict` page collects:
   - Pregnancies
   - Glucose
   - Blood Pressure
   - Skin Thickness
   - Insulin
   - BMI
   - Diabetes Pedigree Function
   - Age
3. A Next.js server action in `src/app/actions.ts` validates the values and sends them to the Flask API.
4. The Flask API returns a predicted class and probability array.
5. The app maps the response to `Diabetic` or `Not Diabetic` and renders the result on `/result`.

## Project Structure

```text
src/
  app/
    actions.ts        Server action that calls the Flask API
    page.tsx          Landing page
    predict/page.tsx  Input form
    result/page.tsx   Prediction result screen
    layout.tsx        Shared app shell and metadata
  components/ui/      Reusable UI building blocks
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
FLASK_API_URL=http://127.0.0.1:5000/predict
```

`FLASK_API_URL` should point to a Flask endpoint that accepts prediction requests.

### 3. Start the frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Backend API Contract

This repository does not include the Flask model server. The frontend expects a prediction endpoint backed by a KNN model with reported 81% accuracy that:

- Accepts `POST` requests with JSON
- Uses the following keys exactly:

```json
{
  "Pregnancies": 2,
  "Glucose": 120,
  "BloodPressure": 70,
  "SkinThickness": 20,
  "Insulin": 79,
  "BMI": 32.0,
  "DiabetesPedigreeFunction": 0.45,
  "Age": 33
}
```

- Returns JSON in this shape:

```json
{
  "prediction": 0,
  "probability": [0.73, 0.27]
}
```

Expected meaning:

- `prediction: 0` -> `Not Diabetic`
- `prediction: 1` -> `Diabetic`
- `probability` should contain class probabilities in index order `[not_diabetic, diabetic]`

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` builds the app for production
- `npm run start` starts the production server
- `npm run lint` runs ESLint

## Notes

- The current UI presents confidence, but feature-level reasoning is not yet shown on the result page.
- The app uses a server action for backend communication, which avoids browser-side CORS issues.
- The homepage messaging references a KNN model trained on the Pima Indians Diabetes Database.
- The accuracy figure documented here refers to the backend model used by the prediction API.

## Disclaimer

This project is for educational and demonstration purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
