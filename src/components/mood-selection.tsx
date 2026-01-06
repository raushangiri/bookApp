"use client";

import { useState } from "react";
import { Smile, Zap, Coffee, Cloud, Heart, Sparkles, HelpCircle, Frown } from "lucide-react";
import { getRecommendations } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { RecommendationResults } from "@/components/recommendation-results";
import { type MoodBasedRecommendationsOutput } from "@/ai/flows/mood-based-recommendations";
import { Skeleton } from "./ui/skeleton";

const moods = [
  { name: "Happy", icon: Smile },
  { name: "Calm", icon: Cloud },
  { name: "Motivated", icon: Zap },
  { name: "Sad", icon: Frown },
  { name: "Romantic", icon: Heart },
  { name: "Spiritual", icon: Sparkles },
  { name: "Curious", icon: HelpCircle },
  { name: "Anxious", icon: Coffee },
] as const;

type Mood = (typeof moods)[number]['name'];

export function MoodSelection() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [recommendations, setRecommendations] = useState<MoodBasedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await getRecommendations({ mood });
      setRecommendations(result);
    } catch (e) {
      setError("Failed to get recommendations. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
        {moods.map((mood) => (
          <Card
            key={mood.name}
            onClick={() => handleMoodSelect(mood.name)}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1
              ${selectedMood === mood.name ? 'border-primary ring-2 ring-primary/80 shadow-lg' : 'border-card-border'}
            `}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <mood.icon className="h-10 w-10 mb-3 text-primary" />
              <span className="font-headline text-lg font-medium text-foreground text-center">{mood.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-12">
            <div>
                <Skeleton className="h-8 w-1/3 mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i}><CardContent className="p-0"><Skeleton className="aspect-[2/3] w-full" /></CardContent></Card>
                    ))}
                </div>
            </div>
            <div>
                <Skeleton className="h-8 w-1/3 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
                </div>
            </div>
        </div>
      )}
      {error && <p className="text-center text-destructive font-medium">{error}</p>}
      {recommendations && (
        <RecommendationResults recommendations={recommendations} />
      )}
    </section>
  );
}
