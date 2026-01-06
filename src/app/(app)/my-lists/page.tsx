import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCard } from "@/components/book-card";

// Mock data
const readingList = [
  { title: "The Midnight Library" },
  { title: "Project Hail Mary" },
];

const wishlist = [
  { title: "Klara and the Sun" },
  { title: "The Lincoln Highway" },
  { title: "Dune" },
];

export default function MyListsPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-12 text-center md:text-left">
        <h1 className="font-headline text-5xl font-bold text-primary mb-2">My Lists</h1>
        <p className="text-lg text-muted-foreground font-body">
          Your personal collection of books.
        </p>
      </header>
      
      <Tabs defaultValue="reading-list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="reading-list">Reading List</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="reading-list" className="mt-8">
          {readingList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {readingList.map((book, index) => (
                <BookCard key={index} title={book.title} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-16">Your reading list is empty.</p>
          )}
        </TabsContent>
        <TabsContent value="wishlist" className="mt-8">
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {wishlist.map((book, index) => (
                <BookCard key={index} title={book.title} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-16">Your wishlist is empty.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
