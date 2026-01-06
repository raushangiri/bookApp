
"use server";

import { getMoodBasedRecommendations, type MoodBasedRecommendationsInput } from "@/ai/flows/mood-based-recommendations";
import { getBookDetails, type BookDetailsInput } from "@/ai/flows/book-details-extraction";
import { processPdf, type ProcessPdfInput, textToSpeech, type TextToSpeechInput } from "@/ai/flows/pdf-processor";

export async function getRecommendations(input: MoodBasedRecommendationsInput) {
  try {
    const recommendations = await getMoodBasedRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Could not fetch recommendations at this time. Please try again later.");
  }
}

export async function getBookDescription(input: BookDetailsInput) {
  try {
    const details = await getBookDetails(input);
    return details;
  } catch (error) {
    console.error("Error fetching book description:", error);
    throw new Error("Could not fetch book description at this time.");
  }
}

export async function summarizePdf(input: ProcessPdfInput) {
  try {
    const result = await processPdf(input);
    return result;
  } catch (error) {
    console.error("Error summarizing PDF:", error);
    throw new Error("Could not summarize the PDF at this time.");
  }
}

export async function getAudioSummary(input: TextToSpeechInput) {
    try {
        const result = await textToSpeech(input);
        return result;
    } catch (error) {
        console.error("Error generating audio summary:", error);
        throw new Error("Could not generate audio summary at this time.");
    }
}
