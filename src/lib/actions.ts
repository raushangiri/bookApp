"use server";

import { getMoodBasedRecommendations, type MoodBasedRecommendationsInput } from "@/ai/flows/mood-based-recommendations";

export async function getRecommendations(input: MoodBasedRecommendationsInput) {
  try {
    const recommendations = await getMoodBasedRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    // In a real app, you might want to log this error to a monitoring service
    throw new Error("Could not fetch recommendations at this time. Please try again later.");
  }
}
