import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 bg-linear-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 px-3">
              K-Nearest Neighbors Algorithm
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-teal-500 pb-2">
            Diabetes Prediction System
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A precise Machine Learning simulation simulating KNN classification to predict diabetes risk based on medical parameters.
          </p>
        </div>

        <div className="flex gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-blue-500/25 transition-all">
            <Link href="/predict">Start Prediction</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md">
            <CardHeader>
              <Activity className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle>Medical Accuracy</CardTitle>
              <CardDescription>
                Simulates real-world KNN models trained on the Pima Indians Diabetes Database.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-md">
            <CardHeader>
              <Brain className="w-10 h-10 text-purple-500 mb-2" />
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                No need to install anything, just a simple form to fill.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-md">
            <CardHeader>
              <ShieldCheck className="w-10 h-10 text-teal-500 mb-2" />
              <CardTitle>Privacy Focused</CardTitle>
              <CardDescription>
                Data is processed securely and ephemeral, never stored permanently.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Diabetes KNN Demo. Not for medical diagnosis.</p>
      </footer>
    </div>
  );
}
