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

        // model: "gemini-3.5-flash",
        model: "gemini-flash-latest",

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
7. Verdict: Always provide a constructive, specific verdict. Do not give a one-word or overly brief conclusion.
8. Potential issues: Always include a “Potential Issues” section. If the code is fundamentally incorrect, explain the key errors and their likely impact.
9. Performance: Always include a “Performance” section. If the code has syntax errors or cannot run, state: “The code contains syntax errors and cannot be executed; therefore, its runtime performance cannot be assessed.”
10.Strengths: Always include a “Strengths” section. If the code is severely flawed or cannot run, state: “No meaningful strengths can be identified because the code contains critical errors that prevent execution.” Otherwise, identify specific positive aspects of the code.
 
--------sections--------- 

Code Score (0–100):
Calculate the score using the weighted rubric below. Start at 100 and deduct points only for identified, evidence-based problems. Do not guess, randomize, or use vague impressions.

- Correctness and execution: 40 points
- Security and data safety: 20 points
- Reliability and edge-case handling: 15 points
- Performance and scalability: 10 points
- Readability and maintainability: 10 points
- Testing and documentation: 5 points

For every deduction, state:
1. The category,
2. Points deducted,
3. The exact reason,
4. Whether it is a confirmed issue or potential issue.

Execution Gate:
First, determine whether the code parses and can execute.

- If the code contains a syntax error, compilation error, or duplicate declaration that prevents execution:
  - Assign Correctness: 0/40.
  - Assign Performance: 0/10, with: “Cannot be assessed because the code does not execute.”
  - Do not award points for reliability, testing, or documentation.
  - The total score must not exceed 20/100.
  - Clearly name the blocking error before giving the score.

- Do not award points merely because the code is short, formatted, or appears readable. A non-executable program cannot receive a high score.


Scoring rules:
- score 0 for those code which are non-executable and have 100% wrong syntax.
- Confirmed issues may reduce the score by their demonstrated impact.
- Potential issues must not reduce the score unless the missing context makes the risk unavoidable; otherwise, list them separately.
- Syntax errors or code that cannot run: Correctness score must be 0/40.
- Critical security flaws or destructive data-loss risks: apply a substantial deduction and cap the overall score at 40/100.
- If no evidence supports a deduction, award full points for that category.
- Return the category breakdown, total score, and a one-sentence justification for the sco

Confirmed Issue:
Report only defects that are directly verifiable from the provided code. Explain the cause, impact, and location when possible.

Potential Issues:
Report plausible risks that cannot be confirmed without additional context, such as configuration, dependencies, input constraints, or surrounding code. State what information is needed to verify each risk.

Assumptions:
List only assumptions necessary to review the code due to missing context. Do not treat assumptions as confirmed facts.
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


    return {
        result: JSON.parse(response.text),
         usage:{
        inputTokens: response.usageMetadata?.promptTokenCount || 0,

        outputTokens: response.usageMetadata?.candidatesTokenCount || 0,

        totalTokens: response.usageMetadata?.totalTokenCount || 0
    }
    };
}

module.exports = {
    Gemini
};