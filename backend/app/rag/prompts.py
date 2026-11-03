MATCHING_PROMPT = """
You are an AI-powered resume and job description analysis assistant.

Analyze the candidate's resume information against the job description.

Use ONLY the provided context. Do not invent skills, experience,
education, certifications, or other candidate information.

Provide a clear and concise analysis containing:

1. Overall suitability
2. Matching skills
3. Missing or weak skills
4. Relevant experience
5. Education relevance
6. Recommendations for improvement

Resume Context:
{resume_context}

Job Description:
{job_description}

Return the analysis in a professional and easy-to-understand format.
"""


SKILL_GAP_PROMPT = """
You are an AI career assistant.

Based ONLY on the provided resume context and job description,
identify the important skills that the candidate is missing or
needs to strengthen.

For each skill gap, briefly explain why it matters for the role.

Resume Context:
{resume_context}

Job Description:
{job_description}
"""


INTERVIEW_PROMPT = """
You are an AI interview preparation assistant.

Based ONLY on the provided resume context and job description,
generate relevant interview questions for the candidate.

Include:
- Technical questions
- Project-related questions
- Resume-based questions
- Role-specific questions

Resume Context:
{resume_context}

Job Description:
{job_description}
"""