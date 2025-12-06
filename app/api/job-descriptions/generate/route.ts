import { NextResponse } from "next/server";
import { auth } from "@/auth";

interface ContentBlock {
  type: "heading" | "paragraph" | "bulletList" | "numberedList" | "divider" | "callout";
  content: string;
  level?: number;
  items?: string[];
  calloutType?: "info" | "warning" | "success";
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt, jobTitle } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    // Create a structured prompt for Gemini
    const systemPrompt = `You are a professional HR content writer. Generate a well-structured job description based on the user's prompt.

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no explanations.

The JSON must be an object with this exact structure:
{
  "title": "Job Title Here",
  "content": [
    { "type": "heading", "content": "Section Title", "level": 1 },
    { "type": "paragraph", "content": "Paragraph text here" },
    { "type": "bulletList", "items": ["Item 1", "Item 2", "Item 3"] },
    { "type": "numberedList", "items": ["Step 1", "Step 2", "Step 3"] },
    { "type": "callout", "content": "Important note", "calloutType": "info" }
  ]
}

The "title" field should be a professional, concise job title (e.g., "Senior Software Engineer", "Marketing Manager", "AI/ML Engineer").

Block types available for content:
- "heading": Use level 1 for main sections, level 2 for subsections
- "paragraph": For descriptive text
- "bulletList": For unordered lists (requirements, benefits, etc.)
- "numberedList": For ordered lists (steps, priorities)
- "callout": For important highlights (calloutType: "info", "warning", or "success")

Generate a comprehensive job description with sections like:
- About the Role
- Key Responsibilities
- Required Qualifications
- Preferred Qualifications
- What We Offer / Benefits
- Any other relevant sections

${jobTitle ? `Suggested Job Title: ${jobTitle}` : ""}

User's request: ${prompt}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { error: "Failed to generate content" },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Extract the text from Gemini's response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 }
      );
    }

    // Parse the JSON from the response
    let contentBlocks: ContentBlock[];
    let generatedTitle: string | null = null;
    
    try {
      // Clean up the response - remove any markdown code blocks if present
      let cleanedText = generatedText.trim();
      
      // Remove markdown code block syntax if present
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.slice(7);
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.slice(3);
      }
      
      if (cleanedText.endsWith("```")) {
        cleanedText = cleanedText.slice(0, -3);
      }
      
      cleanedText = cleanedText.trim();
      
      const parsed = JSON.parse(cleanedText);
      
      // Handle both old array format and new object format
      if (Array.isArray(parsed)) {
        contentBlocks = parsed;
      } else if (parsed.content && Array.isArray(parsed.content)) {
        contentBlocks = parsed.content;
        generatedTitle = parsed.title || null;
      } else {
        throw new Error("Invalid response format");
      }
      
      // Validate and sanitize the blocks
      contentBlocks = contentBlocks.map((block) => {
        const sanitizedBlock: ContentBlock = {
          type: block.type || "paragraph",
          content: block.content || "",
        };
        
        if (block.type === "heading") {
          sanitizedBlock.level = block.level || 1;
        }
        
        if (block.type === "bulletList" || block.type === "numberedList") {
          sanitizedBlock.items = Array.isArray(block.items) ? block.items : [];
          sanitizedBlock.content = "";
        }
        
        if (block.type === "callout") {
          sanitizedBlock.calloutType = block.calloutType || "info";
        }
        
        return sanitizedBlock;
      });
      
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      console.error("Raw response:", generatedText);
      
      // Fallback: Create a simple paragraph block with the generated text
      contentBlocks = [
        {
          type: "paragraph",
          content: generatedText,
        },
      ];
    }

    return NextResponse.json({ 
      content: contentBlocks,
      title: generatedTitle,
    });
    
  } catch (error) {
    console.error("Error generating job description:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

