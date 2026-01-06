'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Book, Heart, BookOpenCheck } from 'lucide-react';

import { getBookDescription } from '@/lib/actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function BookDetailsPage() {
  const params = useParams();
  const { toast } = useToast();
  const title = decodeURIComponent(params.title as string);

  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (title) {
      setIsLoading(true);
      setError(null);
      getBookDescription({ title })
        .then((details) => {
          setDescription(details.description);
        })
        .catch(() => {
          setError('Failed to load book details. Please try again later.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [title]);

  const imageIndex = title.length % PlaceHolderImages.length;
  const placeholderImage = PlaceHolderImages[imageIndex] || PlaceHolderImages[0];

  const handleAddToList = (listName: string) => {
    toast({
      title: 'Success!',
      description: `"${title}" has been added to your ${listName}.`,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[2/3] relative">
                <Image
                  src={placeholderImage.imageUrl}
                  alt={`Cover for ${title}`}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholderImage.imageHint}
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">{title}</h1>
          
          <div className="mb-8 space-y-4">
            <h2 className="font-headline text-2xl font-bold text-primary/90 border-b pb-2">Description</h2>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <BookOpenCheck className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <p className="text-muted-foreground font-body text-lg leading-relaxed">{description}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => handleAddToList('Reading List')}>
              <Book className="mr-2" /> Add to Reading List
            </Button>
            <Button size="lg" variant="secondary" onClick={() => handleAddToList('Wishlist')}>
              <Heart className="mr-2" /> Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
