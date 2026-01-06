import { MoodSelection } from "@/components/mood-selection";

export default function MoodPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
          How are you feeling today?
        </h1>
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
          Select a mood to discover books and quotes that resonate with you, curated by our AI.
        </p>
      </header>
      <MoodSelection />
    </div>
  );
}
