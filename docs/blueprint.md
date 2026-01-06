# **App Name**: LibroMood

## Core Features:

- Mood-Based Recommendations: Users select a mood, and the system recommends books and quotes that align with that mood.
- Book Discovery and Reading: Fetch book details (cover, title, author, description) from a free book API, with links to read previews and full books.
- Text-to-Speech: Convert quotes and book text into audio using the browser's Web Speech API. Features include play/pause, speed control, and voice selection.
- Reading List and Wishlist: Allow users to save books to a 'Reading List' (currently reading) and a 'Wishlist' (read later), storing progress in the MongoDB database.
- Kids Section: Offers a parental-controlled section for children, filtering age-appropriate content based on age group, subject, and topic selected by a parent. Use a book API and filter it.
- Book Details Extraction Tool: A tool which uses the title of a book and retrieves additional details such as summary or description from available APIs using reasoning to decide which API is the best one to use for extracting that information.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to evoke feelings of trust and knowledge.
- Background color: Light grey (#F0F4F8) for a clean and modern look.
- Accent color: Soft purple (#9575CD) to complement the blue and provide a calm, creative vibe.
- Headline font: 'Belleza' (sans-serif) for a modern, expressive feel, suitable for headlines. Body font: 'Alegreya' (serif) for body text.
- Use minimalist, line-based icons related to books, moods, and user actions.  Ensure they are consistent in style and easily recognizable.
- Design a responsive layout that adapts to different screen sizes. Use a grid-based system for content alignment.
- Incorporate subtle animations and transitions to enhance the user experience, such as fading in new content or animating the mood selection.