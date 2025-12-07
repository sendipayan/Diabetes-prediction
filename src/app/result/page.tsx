import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const prediction = params.prediction as string;
  const confidence = parseFloat((params.confidence as string) || '0');
  const reasonsString = params.reasons as string;
  
  let reasons: string[] = [];
  try {
    reasons = JSON.parse(reasonsString || '[]');
  } catch {
    reasons = ['Analysis details unavailable'];
  }

  const isDiabetic = prediction === 'Diabetic';
  const bgClass = isDiabetic ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20';
  const borderClass = isDiabetic ? 'border-red-200 dark:border-red-800' : 'border-green-200 dark:border-green-800';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <Card className={`w-full max-w-lg shadow-2xl border-2 ${borderClass}`}>
        <CardHeader className={`${bgClass} rounded-t-lg text-center pb-8`}>
          <div className="mx-auto bg-white dark:bg-slate-950 p-4 rounded-full w-20 h-20 flex items-center justify-center shadow-sm mb-4">
            {isDiabetic ? (
              <AlertCircle className="w-10 h-10 text-red-600" />
            ) : (
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Prediction Result
          </CardTitle>
          <div className="mt-4">
             <Badge variant={isDiabetic ? "destructive" : "secondary"} className={`text-lg px-4 py-1 ${isDiabetic ? '' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                {prediction?.toUpperCase() || 'UNKNOWN'}
             </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Model Confidence</span>
              <span className="text-slate-500">{confidence}%</span>
            </div>
            <Progress value={confidence} className={`h-3 ${isDiabetic ? '[&>div]:bg-red-600' : '[&>div]:bg-green-600'}`} />
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Key Risk Factors Identified:</h3>
            <ul className="space-y-2">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDiabetic ? 'bg-red-500' : 'bg-green-500'}`} />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-b-lg">
          <Link href="/predict" className="w-full">
            <Button size="lg" variant="outline" className="w-full font-semibold">
              Run Another Prediction
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
