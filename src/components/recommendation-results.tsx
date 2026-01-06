import { type MoodBasedRecommendationsOutput } from "@/ai/flows/mood-based-recommendations";
import { BookCard } from "./book-card";
import { QuoteCard } from "./quote-card";

interface RecommendationResultsProps {
  recommendations: MoodBasedRecommendationsOutput;
}

export function RecommendationResults({ recommendations }: RecommendationResultsProps) {
  return (
    <div className="space-y-12 animation-fade-in">
      <section>
        <h2 className="font-headline text-3xl font-bold mb-6 text-primary">Book Recommendations</h2>
        {recommendations.books && recommendations.books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recommendations.books.map((bookTitle, index) => (
              <BookCard key={index} title={bookTitle} />
            ))}
          </div>
        ) : (
          <p>No book recommendations found.</p>
        )}
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6 text-primary">Inspiring Quotes</h2>
        {recommendations.quotes && recommendations.quotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.quotes.map((quote, index) => (
              <QuoteCard key={index} quote={quote} />
            ))}
          </div>
        ) : (
          <p>No quotes found.</p>
        )}
      </section>
    </div>
  );
}
