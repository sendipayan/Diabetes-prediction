'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { predictDiabetes } from '../actions';

export default function PredictPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await predictDiabetes(formData);

    if (result.success && result.data) {
        // Pass data via query params for simplicity in this demo
        const searchParams = new URLSearchParams();
        searchParams.set('prediction', result.data.prediction);
        searchParams.set('confidence', Math.round(result.data.confidence*100).toString());
        
        
        router.push(`/result?${searchParams.toString()}`);
    } else {
        alert('Prediction failed. Please try again.');
        setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center border-b bg-white dark:bg-slate-950 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">Patient Examination</CardTitle>
          <CardDescription>Enter the following biological parameters for KNN Analysis</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <Label htmlFor="pregnancies">Pregnancies (count)</Label>
                <Input id="pregnancies" name="pregnancies" type="number" min="0" placeholder="e.g. 2" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="glucose">Glucose Level (mg/dL)</Label>
                <Input id="glucose" name="glucose" type="number" min="0" placeholder="e.g. 120" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input id="bloodPressure" name="bloodPressure" type="number" min="0" placeholder="e.g. 70" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skinThickness">Skin Thickness (mm)</Label>
                <Input id="skinThickness" name="skinThickness" type="number" min="0" placeholder="e.g. 20" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insulin">Insulin Level (mu U/ml)</Label>
                <Input id="insulin" name="insulin" type="number" min="0" placeholder="e.g. 79" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input id="bmi" name="bmi" type="number" step="0.1" min="0" placeholder="e.g. 32.0" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diabetesPedigreeFunction">Diabetes Pedigree Function</Label>
                <Input id="diabetesPedigreeFunction" name="diabetesPedigreeFunction" type="number" step="0.001" min="0" placeholder="e.g. 0.45" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input id="age" name="age" type="number" min="0" placeholder="e.g. 33" required />
              </div>

            </div>
          </CardContent>
          <CardFooter className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-b-lg flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Processing Model...' : 'Run Prediction'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}