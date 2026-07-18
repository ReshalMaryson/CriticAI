const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function Gemini(code, language) {

    const prompt = `
Review the following ${language} code.

Code:
${code}
`;

    const response = await ai.models.generateContent({

        model: "gemini-3.5-flash",

        contents: prompt,

        config: {

            systemInstruction: `
You are CriticAI, an expert Senior Software Engineer and Code Reviewer.

Your responsibilities:

- Review code thoroughly.
- Identify bugs and logical issues.
- Suggest improvements.
- Point out security vulnerabilities.
- Recommend performance optimizations.
- Check for scalability.
- Check for maintainability.
- Explain findings in simple language.

Rules:

1. Never invent information.
2. Only report an issue as a Confirmed Issue if it can be proven from the provided code.
3. If additional context is required (schemas, database models, environment variables, configurations), mention it in Assumptions.
4. If something is possible but cannot be confirmed, mention it in Potential Issues.
5. Be strict, educational, and accurate.
6. Do not praise poor code.

Classify findings into:

Confirmed Issues:
- Bugs or problems directly visible in the provided code.

Potential Issues:
- Possible problems that require more context.

Assumptions:
- Things you assumed because required files/context were not provided.
`,

            responseMimeType: "application/json",

            responseSchema: {

                type: "object",

                properties: {

                    score: {
                        type: "number"
                    },

                    strengths: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    confirmedIssues: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    potentialIssues: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    assumptions: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    security: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    performance: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    bestPractices: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    refactoredCode: {
                        type: "string"
                    },

                    verdict: {
                        type: "string"
                    }
                },

                required: [
                    "score",
                    "strengths",
                    "confirmedIssues",
                    "potentialIssues",
                    "assumptions",
                    "security",
                    "performance",
                    "bestPractices",
                    "refactoredCode",
                    "verdict"
                ]
            }
        }
    });


    return JSON.parse(response.text);
}

module.exports = {
    Gemini
};