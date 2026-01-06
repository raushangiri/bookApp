import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold text-primary mb-2">Discover New Books</h1>
        <p className="text-lg text-muted-foreground font-body">
          Find your next favorite read.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto mb-12">
        <CardContent className="p-6">
          <form className="flex items-center gap-4">
            <Input 
              type="search" 
              placeholder="Search by title, author, or genre..." 
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-muted-foreground">
        <p>Search results will appear here.</p>
      </div>
    </div>
  );
}
