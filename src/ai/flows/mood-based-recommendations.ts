'use server';

/**
 * @fileOverview A mood-based recommendation AI agent.
 *
 * - getMoodBasedRecommendations - A function that returns book and quote recommendations based on the selected mood.
 * - MoodBasedRecommendationsInput - The input type for the getMoodBasedRecommendations function.
 * - MoodBasedRecommendationsOutput - The return type for the getMoodBasedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodBasedRecommendationsInputSchema = z.object({
  mood: z.enum([
    'Happy',
    'Calm',
    'Motivated',
    'Sad',
    'Romantic',
    'Spiritual',
    'Curious',
    'Anxious',
  ]).describe('The mood selected by the user.'),
});
export type MoodBasedRecommendationsInput = z.infer<typeof MoodBasedRecommendationsInputSchema>;

const MoodBasedRecommendationsOutputSchema = z.object({
  books: z.array(z.string()).describe('Recommended books based on the mood.'),
  quotes: z.array(z.string()).describe('Recommended quotes based on the mood.'),
});
export type MoodBasedRecommendationsOutput = z.infer<typeof MoodBasedRecommendationsOutputSchema>;

export async function getMoodBasedRecommendations(input: MoodBasedRecommendationsInput): Promise<MoodBasedRecommendationsOutput> {
  return moodBasedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodBasedRecommendationsPrompt',
  input: {schema: MoodBasedRecommendationsInputSchema},
  output: {schema: MoodBasedRecommendationsOutputSchema},
  prompt: `You are a recommendation system that provides books and quotes tailored to the user's mood.\
\
  The user has selected the following mood: {{{mood}}}.\
\
  Based on this mood, recommend a list of books and quotes that would be suitable.\
\
  Return the books and quotes as arrays of strings in the output.`, 
});

const moodBasedRecommendationsFlow = ai.defineFlow(
  {
    name: 'moodBasedRecommendationsFlow',
    inputSchema: MoodBasedRecommendationsInputSchema,
    outputSchema: MoodBasedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
