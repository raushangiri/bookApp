import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookCard } from "@/components/book-card";

const kidBooks = [
  { title: "The Very Hungry Caterpillar" },
  { title: "Where the Wild Things Are" },
  { title: "Goodnight Moon" },
  { title: "Charlotte's Web" },
  { title: "Harry Potter and the Sorcerer's Stone" },
];

export default function KidsPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold text-primary mb-2">Kids Corner</h1>
        <p className="text-lg text-muted-foreground font-body">
          Fun and educational books for young readers.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Age Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-8">6-8 years</SelectItem>
            <SelectItem value="9-12">9-12 years</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="stories">Moral Stories</SelectItem>
            <SelectItem value="math">Math</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="animals">Animals</SelectItem>
            <SelectItem value="space">Space</SelectItem>
            <SelectItem value="friendship">Friendship</SelectItem>
            <SelectItem value="adventure">Adventure</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {kidBooks.map((book, index) => (
          <BookCard key={index} title={book.title} />
        ))}
      </div>
    </div>
  );
}
