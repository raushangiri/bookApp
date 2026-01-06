import { Card, CardContent } from "@/components/ui/card";
import { SpeechPlayer } from "./speech-player";

interface QuoteCardProps {
  quote: string;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const [text, author] = quote.split(" - ");

  return (
    <Card className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <blockquote className="border-l-4 border-accent pl-4">
          <p className="font-body text-lg italic text-foreground mb-4">"{text}"</p>
          {author && <footer className="font-headline text-base text-muted-foreground">- {author}</footer>}
        </blockquote>
      </CardContent>
      <div className="flex justify-end p-4 border-t bg-card/50">
        <SpeechPlayer text={`${text} by ${author || 'Unknown'}`} />
      </div>
    </Card>
  );
}
