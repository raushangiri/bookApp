import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  title: string;
}

export function BookCard({ title }: BookCardProps) {
  // Use a deterministic-random placeholder image based on the title
  const imageIndex = title.length % PlaceHolderImages.length;
  const placeholderImage = PlaceHolderImages[imageIndex] || PlaceHolderImages[0];

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative">
          <Image
            src={placeholderImage.imageUrl}
            alt={`Cover for ${title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholderImage.imageHint}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-headline font-semibold truncate text-foreground" title={title}>{title}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
