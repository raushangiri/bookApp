'use server';

/**
 * @fileOverview Fetches book details (description) using the title from available APIs.
 *
 * - getBookDetails - A function that handles the book details extraction process.
 * - BookDetailsInput - The input type for the getBookDetails function.
 * - BookDetailsOutput - The return type for the getBookDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookDetailsInputSchema = z.object({
  title: z.string().describe('The title of the book.'),
});
export type BookDetailsInput = z.infer<typeof BookDetailsInputSchema>;

const BookDetailsOutputSchema = z.object({
  description: z.string().describe('The description of the book.'),
});
export type BookDetailsOutput = z.infer<typeof BookDetailsOutputSchema>;

export async function getBookDetails(input: BookDetailsInput): Promise<BookDetailsOutput> {
  return bookDetailsExtractionFlow(input);
}

const bookDetailsExtractionPrompt = ai.definePrompt({
  name: 'bookDetailsExtractionPrompt',
  input: {schema: BookDetailsInputSchema},
  output: {schema: BookDetailsOutputSchema},
  prompt: `You are an AI assistant specialized in finding book descriptions.
  Given the title of a book, you will search for its description using available APIs.
  Return the book description.
  Title: {{{title}}}`,
});

const bookDetailsExtractionFlow = ai.defineFlow(
  {
    name: 'bookDetailsExtractionFlow',
    inputSchema: BookDetailsInputSchema,
    outputSchema: BookDetailsOutputSchema,
  },
  async input => {
    const {output} = await bookDetailsExtractionPrompt(input);
    return output!;
  }
);
