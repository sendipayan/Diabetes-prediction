"use server";

type PredictResponse = {
  success: boolean;
  data?: {
    prediction: string;      // "Diabetic" / "Not Diabetic"
    confidence: number;      // between 0 and 1
    reasons: string[];       // you can fill later, keep empty for now
  };
  error?: string;
};

const FLASK_API_URL =
  process.env.FLASK_API_URL || "http://127.0.0.1:5000/predict";

export async function predictDiabetes(formData: FormData): Promise<PredictResponse> {
  try {
    // 1. Read values from formData (note: your input names are lowercase / camelCase)
    const pregnancies = Number(formData.get("pregnancies"));
    const glucose = Number(formData.get("glucose"));
    const bloodPressure = Number(formData.get("bloodPressure"));
    const skinThickness = Number(formData.get("skinThickness"));
    const insulin = Number(formData.get("insulin"));
    const bmi = Number(formData.get("bmi"));
    const dpf = Number(formData.get("diabetesPedigreeFunction"));
    const age = Number(formData.get("age"));

    // 2. Basic validation (optional but good)
    if (
      [pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, dpf, age]
        .some(v => Number.isNaN(v))
    ) {
      return { success: false, error: "Invalid numeric input." };
    }

    // 3. Build payload in the SAME KEY NAMES your Flask API expects
    //    These must match FEATURE_ORDER in your api.py:
    //    ["Pregnancies","Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"]
    const payload = {
      Pregnancies: pregnancies,
      Glucose: glucose,
      BloodPressure: bloodPressure,
      SkinThickness: skinThickness,
      Insulin: insulin,
      BMI: bmi,
      DiabetesPedigreeFunction: dpf,
      Age: age,
    };

    // 4. Call Flask API from the server (no browser CORS issue here)
    const res = await fetch(FLASK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      return {
        success: false,
        error: `Flask API error: ${res.status} ${res.statusText} ${errBody}`,
      };
    }

    const data = await res.json();
    // We assume Flask returns: { prediction: 0 or 1, probability: [p0, p1] }
    const rawPred = data?.prediction;
    const probs: number[] | undefined = data?.probability;

    const label =
      rawPred === 1
        ? "Diabetic"
        : rawPred === 0
        ? "Not Diabetic"
        : "Unknown";

    // Confidence: pick probability corresponding to predicted class if available
    let confidence = 0;
    if (Array.isArray(probs) && (rawPred === 0 || rawPred === 1)) {
      confidence = probs[rawPred] ?? 0;
    }

    return {
      success: true,
      data: {
        prediction: label,
        confidence,     // 0–1, you can multiply by 100 in the result page
        reasons: [],    // you can later populate with feature-based explanations
      },
    };
  } catch (err: any) {
    console.error("predictDiabetes error:", err);
    return {
      success: false,
      error: err?.message || "Unknown error",
    };
  }
}
