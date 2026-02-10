const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const { seedModules2to4 } = require('./seed-modules-2-4')
const { seedModules5to8 } = require('./seed-modules-5-8')
const { seedModules9to12 } = require('./seed-modules-9-12')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding AI Mastery Academy database...')

  // Clear existing data (in correct order for foreign keys)
  console.log('🗑️  Clearing existing data...')
  await prisma.reply.deleteMany()
  await prisma.post.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.quizAttempt.deleteMany()
  await prisma.progress.deleteMany()
  await prisma.question.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.course.deleteMany()
  await prisma.userBadge.deleteMany()
  await prisma.badge.deleteMany()
  await prisma.payment.deleteMany()
  console.log('✅ Cleared existing data')

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10)

  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
      track: 'Business',
    },
  })

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@aimastery.com' },
    update: { isAdmin: true, tier: 'master' },
    create: {
      email: 'admin@aimastery.com',
      name: 'Admin User',
      password: hashedPassword,
      track: 'Business',
      tier: 'master',
      isAdmin: true,
    },
  })
  console.log('✅ Admin user created (admin@aimastery.com / password123)')

  // Create course
  const course = await prisma.course.upsert({
    where: { slug: 'ai-mastery-complete' },
    update: {
      title: 'AI Mastery Academy - Complete Course',
      description: 'Master AI before your competition does — 12 modules, 36+ lessons',
    },
    create: {
      title: 'AI Mastery Academy - Complete Course',
      slug: 'ai-mastery-complete',
      description: 'Master AI before your competition does — 12 modules, 36+ lessons',
      order: 1,
      published: true,
    },
  })

  // ============================================
  // MODULE 1: TRANSFORMER ARCHITECTURE (FREE)
  // ============================================
  
  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Transformer Architecture & AI Cognition',
      slug: 'transformer-architecture',
      description: 'Understand how AI systems actually think - the foundation for everything else',
      order: 1,
      icon: '🧠',
      tier: 'free',
    },
  })

  const lesson1_1 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: 'How AI Actually "Thinks"',
      slug: 'how-ai-thinks',
      duration: 18,
      order: 1,
      content: `
<div class="lesson-content">
<h1>How AI Actually "Thinks"</h1>

<h2>🎯 What You'll Learn</h2>
<p>By the end of this lesson, you'll understand:</p>
<ul>
<li>What happens inside AI when you type a prompt</li>
<li>Why AI sometimes generates false information (hallucinations)</li>
<li>How to design better prompts based on how AI processes language</li>
<li>The fundamental difference between AI and human intelligence</li>
</ul>

<h2>The Big Picture: AI is Pattern Completion, Not Intelligence</h2>

<p>Imagine you're working with a colleague who has:</p>
<ul>
<li>Read every book, article, and website ever written</li>
<li>Perfect memory of all that information</li>
<li>Incredible pattern recognition skills</li>
</ul>

<p><strong>But they have NEVER experienced the real world.</strong></p>

<p>They can predict what word comes next in any sentence with stunning accuracy. They can write like Shakespeare, code like a senior engineer, and explain physics like Richard Feynman.</p>

<p><strong>But they don't actually "understand" any of it.</strong></p>

<p>That's AI. It's the most sophisticated pattern-matching system ever created—but it's not intelligent in the way humans are.</p>

<h2>What Happens When You Type a Prompt</h2>

<p>Let's say you type: <strong>"Write a professional email to my boss requesting time off."</strong></p>

<p>Here's what happens inside AI in 3 steps:</p>

<h3>Step 1: Text Becomes Numbers (Tokenization)</h3>

<p>AI doesn't read words like you do. Every word (and part of a word) gets converted into a number called a <strong>token</strong>.</p>

<p><strong>Example breakdown:</strong></p>
<ul>
<li>"Write" → Token #5847</li>
<li>"a" → Token #264</li>
<li>"professional" → Token #8932</li>
<li>"email" → Token #3421</li>
</ul>

<p><strong>Why this matters:</strong></p>
<ul>
<li>Longer prompts = more tokens = higher costs</li>
<li>Context windows are measured in tokens (e.g., GPT-4o's 128,000 token limit)</li>
<li>Being concise but specific maximizes value</li>
</ul>

<h3>Step 2: Pattern Matching Across Training Data</h3>

<p>The AI searches through patterns it learned from millions of documents during training:</p>

<ul>
<li>It saw thousands of professional emails in its training data</li>
<li>It noticed patterns: formal greetings → clear purpose → polite request → professional closing</li>
<li>It calculates probabilities: "Based on these patterns, what should come next?"</li>
</ul>

<p><strong>Critical insight:</strong> AI doesn't "know" what a professional email is. It recognizes statistical patterns from examples.</p>

<h3>Step 3: Predicting One Token at a Time</h3>

<p>The AI generates your email by predicting the most probable next token, over and over:</p>

<ul>
<li>First token: "Dear" (87% probability vs. "Hi" at 8%)</li>
<li>Second token: "[Name]" (94% probability)</li>
<li>Third token: "," (99% probability)</li>
<li>Fourth token: "I" (91% probability)</li>
</ul>

<p>It does this thousands of times until it reaches a natural stopping point (or hits a token limit).</p>

<h2>Why This Changes How You Prompt</h2>

<p>Understanding pattern completion transforms your prompting strategy:</p>

<h3>❌ Weak Prompt (Vague Pattern)</h3>
<pre>email boss time off</pre>

<p><strong>Problem:</strong> Too vague. AI doesn't know what pattern to match.</p>

<h3>✅ Strong Prompt (Clear Pattern)</h3>
<pre>
Write a professional email to my boss requesting 3 days off next month.

Context: I need time off for a family wedding
Tone: Respectful but confident
Include:
- Formal greeting
- Clear dates (June 15-17)
- Reason (brief)
- Offer to prepare coverage plan
- Professional closing

Keep it under 150 words.
</pre>

<p><strong>Why it works:</strong> Creates a crystal-clear pattern for AI to match against professional emails in training data.</p>

<h2>The Intelligence Illusion</h2>

<p>When ChatGPT writes a brilliant market analysis or explains quantum physics, it <em>feels</em> intelligent. But here's what's really happening:</p>

<p><strong>It's not reasoning about markets or physics.</strong></p>

<p>It's predicting patterns based on thousands of similar analyses and explanations it saw during training.</p>

<p><strong>Think of it like:</strong></p>
<ul>
<li>A chess computer that plays brilliantly but doesn't "enjoy" chess or "feel" competitive</li>
<li>Autocomplete on steroids—predicting not just words, but entire arguments, code structures, and creative narratives</li>
<li>A mirror reflecting patterns from millions of examples, creating something that looks new but is actually recombined patterns</li>
</ul>

<h2>Why AI "Hallucinates"</h2>

<p>Sometimes AI confidently generates completely false information. Understanding why is crucial.</p>

<h3>Real Example</h3>

<p><strong>User prompt:</strong> "What did Einstein say about quantum computing in his 1940 lectures?"</p>

<p><strong>AI response:</strong> "In his landmark 1940 Princeton lectures, Einstein predicted that quantum computing would revolutionize physics within the century, stating that quantum entanglement could enable computational speedups impossible with classical systems..."</p>

<p><strong>Reality:</strong> Einstein died in 1955. Quantum computing wasn't conceived until the 1980s. This entire response is fabricated.</p>

<h3>Why It Happened</h3>

<ol>
<li><strong>Pattern recognition:</strong> The prompt combined familiar patterns—"Einstein" + "quantum" + "lectures" + "1940s"</li>
<li><strong>Plausible generation:</strong> AI found related patterns from real Einstein quotes about quantum mechanics and real information about quantum computing</li>
<li><strong>No fact-checking:</strong> AI has no mechanism to verify if Einstein actually said this or if the dates make sense</li>
<li><strong>Confidence regardless:</strong> AI assigns high probability to plausible-sounding text, whether true or false</li>
</ol>

<p><strong>The lesson:</strong> AI completes patterns. It doesn't verify truth. You must fact-check anything important.</p>

<h2>Practical Application: Building Better Prompts</h2>

<p>Let's practice using what you've learned.</p>

<h3>Task: Explain blockchain to a 12-year-old</h3>

<h4>Before (Weak Prompt)</h4>
<pre>explain blockchain</pre>

<p><strong>Problems:</strong></p>
<ul>
<li>No target audience specified</li>
<li>No complexity level indicated</li>
<li>No format guidance</li>
<li>Vague pattern for AI to match</li>
</ul>

<h4>After (Strong Prompt)</h4>
<pre>
Explain blockchain technology to a curious 12-year-old.

Requirements:
- Use simple language (6th grade reading level)
- Compare blockchain to something familiar (like a shared Google Doc that everyone can see but nobody can erase)
- Avoid technical jargon
- Include one concrete real-world example (like tracking where food comes from)
- Maximum 200 words
- Use short paragraphs (2-3 sentences each)

Tone: Friendly teacher explaining to an interested student, not talking down
</pre>

<p><strong>Why this works:</strong></p>
<ul>
<li>Clear audience = AI matches patterns from educational content for kids</li>
<li>Concrete requirements = AI knows exactly what pattern to generate</li>
<li>Constraints = Forces focused, quality output</li>
<li>Analogy request = Triggers comparison patterns from training data</li>
</ul>

<h2>Key Mental Models</h2>

<p>Carry these concepts with you:</p>

<h3>1. AI as a Pattern Completion Engine</h3>
<p>Not: "AI understands my request and thinks about how to answer"<br>
But: "AI finds similar patterns from training and generates statistically probable text"</p>

<h3>2. Tokens as Currency</h3>
<p>More tokens = more cost, more processing<br>
Optimal prompting = maximum clarity in minimum tokens</p>

<h3>3. You're the Director, AI is the Actor</h3>
<p>Bad direction = mediocre performance<br>
Specific direction = Oscar-worthy output</p>

<h3>4. Trust, Then Verify</h3>
<p>Use AI for drafts, ideas, starting points<br>
Always fact-check important claims</p>

<h2>✅ Key Takeaways</h2>

<p><strong>Remember these 6 essentials:</strong></p>

<ol>
<li><strong>AI predicts patterns, it doesn't think</strong> — Sophisticated autocomplete, not consciousness</li>
<li><strong>Tokenization is fundamental</strong> — Text becomes numbers, and you pay per token</li>
<li><strong>Clear patterns = better outputs</strong> — Specific prompts create clearer patterns to match</li>
<li><strong>Hallucinations are inevitable</strong> — AI generates plausible text without fact-checking</li>
<li><strong>You control the quality</strong> — Better prompts = exponentially better results</li>
<li><strong>Context is everything</strong> — The more specific context you provide, the more accurate the pattern matching</li>
</ol>

<h2>🎯 Quick Challenge</h2>

<p>Before moving to the next lesson, try this:</p>

<p><strong>Open ChatGPT or Claude and test two prompts:</strong></p>

<p><strong>Prompt 1 (Weak):</strong><br>
"business plan coffee shop"</p>

<p><strong>Prompt 2 (Strong):</strong><br>
Use everything you learned to write a detailed, specific prompt for a coffee shop business plan. Include audience, format, specific sections needed, tone, and length constraints.</p>

<p>Compare the outputs. The difference should be dramatic.</p>

<h2>🚀 Coming Up Next</h2>

<p>In Lesson 1.2, we'll dive deep into <strong>Token Economics & Context Windows</strong>—understanding memory limits, calculating costs, and working strategically within constraints to maximize AI value.</p>

<p>You'll learn why Claude is better for long documents, how to handle projects that exceed context limits, and strategic chunking techniques.</p>
</div>
      `,
    },
  })

  // Create quiz for lesson 1.1
  await prisma.quiz.create({
    data: {
      lessonId: lesson1_1.id,
      title: 'Test Your Understanding: How AI Thinks',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'What is the fundamental way AI generates text?',
            type: 'mcq',
            options: JSON.stringify([
              'It thinks about the question and formulates an answer',
              'It searches a database of pre-written answers',
              'It predicts the most probable next token based on patterns',
              'It uses logic and reasoning like humans do'
            ]),
            correctAnswer: '2',
            explanation: 'AI generates text by predicting the most statistically probable next token (word or word-part) based on patterns it learned during training. It does not think, reason, or understand in the human sense.',
            order: 1,
          },
          {
            question: 'Why does AI sometimes "hallucinate" false information?',
            type: 'mcq',
            options: JSON.stringify([
              'The AI is trying to deceive users',
              'There are bugs in the code',
              'AI generates plausible-sounding text based on patterns without fact-checking',
              'The training data contained false information'
            ]),
            correctAnswer: '2',
            explanation: 'Hallucinations occur because AI generates plausible text based on pattern matching, but has no mechanism to verify if the content is actually true. It confidently produces text that sounds right based on statistical patterns.',
            order: 2,
          },
          {
            question: 'What are tokens in the context of AI?',
            type: 'mcq',
            options: JSON.stringify([
              'Cryptocurrency used to pay for AI services',
              'Units that represent words or parts of words that AI processes',
              'Security credentials for accessing AI',
              'Points you earn for using AI'
            ]),
            correctAnswer: '1',
            explanation: 'Tokens are the units that AI uses to process text. Each word or part of a word becomes a token (a number). Token count affects both cost and context window limitations.',
            order: 3,
          },
          {
            question: 'Which prompt will generally produce better results?',
            type: 'mcq',
            options: JSON.stringify([
              'Short, vague prompts to let AI be creative',
              'Long prompts with lots of unnecessary details',
              'Specific prompts with clear context, format, and constraints',
              'Technical jargon to sound professional'
            ]),
            correctAnswer: '2',
            explanation: 'Specific prompts with clear context, format requirements, and constraints create clearer patterns for AI to match, resulting in much better outputs. Clarity and structure beat vagueness every time.',
            order: 4,
          },
          {
            question: 'True or False: AI truly understands the meaning of the text it generates.',
            type: 'true-false',
            correctAnswer: 'false',
            explanation: 'False. AI does not understand meaning in the way humans do. It recognizes and generates patterns based on statistical relationships in training data, but has no consciousness, comprehension, or understanding of concepts.',
            order: 5,
          },
        ],
      },
    },
  })

  const lesson1_2 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: 'Token Economics & Context Windows',
      slug: 'token-economics',
      duration: 16,
      order: 2,
      content: `
<div class="lesson-content">
<h1>Token Economics & Context Windows</h1>

<h2>🎯 What You'll Learn</h2>
<p>By the end of this lesson, you'll understand:</p>
<ul>
<li>What context windows are and why they matter</li>
<li>How to calculate token costs for your AI usage</li>
<li>Strategic approaches when your project exceeds context limits</li>
<li>Which AI model to choose based on memory requirements</li>
<li>Advanced techniques for working with long documents</li>
</ul>

<h2>Understanding AI Memory: The Context Window</h2>

<p>Imagine hiring a brilliant consultant, but they can only remember the last 20 minutes of your conversation. Everything before that? Gone.</p>

<p><strong>That's exactly how AI works.</strong></p>

<p>The <strong>context window</strong> is AI's working memory—the total amount of text (measured in tokens) it can "see" at one time.</p>

<h3>Real-World Analogy</h3>

<p>Think of context windows like RAM in a computer:</p>

<ul>
<li><strong>Small context (4K tokens):</strong> Like working on a phone—quick tasks only</li>
<li><strong>Medium context (8K-32K tokens):</strong> Like a regular laptop—handles most work</li>
<li><strong>Large context (128K+ tokens):</strong> Like a high-end workstation—can process entire books</li>
</ul>

<h2>Current Model Comparison (2025)</h2>

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
<thead>
<tr style="background: rgba(59,130,246,0.1); border-bottom: 2px solid rgba(59,130,246,0.3);">
<th style="padding: 12px; text-align: left;">Model</th>
<th style="padding: 12px; text-align: left;">Context</th>
<th style="padding: 12px; text-align: left;">~Words</th>
<th style="padding: 12px; text-align: left;">Best For</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
<td style="padding: 12px;">GPT-4o mini</td>
<td style="padding: 12px;">128K tokens</td>
<td style="padding: 12px;">~96,000</td>
<td style="padding: 12px;">Quick tasks, cost-effective everyday use</td>
</tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
<td style="padding: 12px;">GPT-4o</td>
<td style="padding: 12px;">128K tokens</td>
<td style="padding: 12px;">~96,000</td>
<td style="padding: 12px;">Standard work, multimodal tasks</td>
</tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
<td style="padding: 12px;">Claude 3.5 Sonnet</td>
<td style="padding: 12px;">200K tokens</td>
<td style="padding: 12px;">~150,000</td>
<td style="padding: 12px;">Complex analysis, coding, long documents</td>
</tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
<td style="padding: 12px;">Claude 3 Opus</td>
<td style="padding: 12px;">200K tokens</td>
<td style="padding: 12px;">~150,000</td>
<td style="padding: 12px;">Highest quality reasoning, research</td>
</tr>
<tr>
<td style="padding: 12px;">Gemini 1.5 Pro</td>
<td style="padding: 12px;">1M tokens</td>
<td style="padding: 12px;">~750,000</td>
<td style="padding: 12px;">Multiple documents, massive context needs</td>
</tr>
</tbody>
</table>

<h2>What Happens When You Exceed Context</h2>

<p><strong>The AI forgets. Completely.</strong></p>

<p>It's not like human memory where old details get fuzzy. With AI, when you exceed context:</p>

<h3>Example Scenario</h3>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
You're having a long conversation with GPT-4o (128K context) and you:
1. Over many messages, you've discussed 30+ topics
2. Your conversation now exceeds the context window
3. You ask: "What did we decide about the marketing budget in message 5?"

Problem: Those early messages are now COMPLETELY GONE from context.
The AI literally cannot see them anymore.
</pre>

<p><strong>The AI will either:</strong></p>
<ul>
<li>Tell you it can't see the first document</li>
<li>Hallucinate about what was in it</li>
<li>Only analyze the second document</li>
</ul>

<h2>Strategic Solutions for Long Projects</h2>

<h3>Solution 1: Compression & Summarization</h3>

<p>Instead of keeping full conversation history, periodically compress it.</p>

<p><strong>Example workflow:</strong></p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
After 10 exchanges:
"Summarize our conversation so far in 200 words, 
focusing only on key decisions and action items."

[Save this summary]

Then continue working, referencing the summary instead of full history.
</pre>

<p><strong>When to use:</strong> Long brainstorming sessions, iterative writing projects</p>

<h3>Solution 2: Strategic Chunking</h3>

<p>Break large documents into logical chunks and process sequentially.</p>

<p><strong>Example approach for a 50,000-word research paper:</strong></p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
"I have a 50,000-word research paper in 5 sections.

I'll send each section separately. For each:
1. Extract 3-5 key findings
2. Note any methodology concerns
3. Identify connections to previous sections

After all 5 sections, synthesize themes."
</pre>

<p><strong>When to use:</strong> Academic papers, long reports, research synthesis</p>

<h3>Solution 3: External Memory Systems</h3>

<p>Maintain a "state file" you reload at the start of each session.</p>

<p><strong>Your external memory document might include:</strong></p>

<ul>
<li><strong>Session 1 outcomes:</strong> Defined product vision, target market is small business owners</li>
<li><strong>Session 2 decisions:</strong> Pricing set at $49/month, focus on ease-of-use</li>
<li><strong>Session 3 progress:</strong> Completed feature list, started UI mockups</li>
<li><strong>Current status:</strong> Need to finalize onboarding flow</li>
</ul>

<p>Start each new session by pasting this context. AI treats it as the beginning of conversation.</p>

<p><strong>When to use:</strong> Multi-session projects, ongoing consulting work</p>

<h3>Solution 4: Model Selection Strategy</h3>

<p><strong>Match your task to the right context window:</strong></p>

<ul>
<li><strong>Quick question (under 1,000 words):</strong> GPT-4o mini (cheapest, fastest)</li>
<li><strong>Standard analysis (1,000-10,000 words):</strong> GPT-4o or Claude 3.5 Sonnet</li>
<li><strong>Long document work (10,000-150,000 words):</strong> Claude 3.5 Sonnet (200K context)</li>
<li><strong>Multiple documents (150,000+ words):</strong> Gemini 1.5 Pro (1M context)</li>
</ul>

<p><strong>Don't waste money:</strong> Using Claude Opus for a simple question is like hiring a lawyer to answer basic legal FAQs. Use the right tool for the job.</p>

<h2>Token Cost Economics</h2>

<p>Understanding costs helps you optimize spending.</p>

<h3>Current Approximate Pricing (API, 2025)</h3>

<ul>
<li><strong>GPT-4o mini:</strong> $0.00015 per 1K input tokens (~$0.02 per 100K words) — extremely cheap</li>
<li><strong>GPT-4o:</strong> $0.005 per 1K input tokens (~$0.50 per 100K words)</li>
<li><strong>Claude 3.5 Sonnet:</strong> $0.003 per 1K input tokens (~$0.30 per 100K words)</li>
<li><strong>Claude 3 Opus:</strong> $0.015 per 1K input tokens (~$1.50 per 100K words)</li>
</ul>

<p><strong>Note:</strong> Most people use subscription plans ($20/month for ChatGPT Plus or Claude Pro) rather than paying per-token via the API. API pricing matters when building applications.</p>

<h3>Real-World Cost Example</h3>

<p><strong>Task:</strong> Analyze a 40,000-word business plan</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
40,000 words ≈ 53,000 tokens (with your questions)

GPT-4o mini: $0.01 (great for simple analysis)
GPT-4o: $0.27 (solid choice, fits easily)
Claude 3.5 Sonnet: $0.16 (fits easily, excellent quality)
Claude 3 Opus: $0.80 (highest quality, fits easily)
</pre>

<p><strong>Optimal choice:</strong> Claude 3.5 Sonnet or GPT-4o — both handle the full document with excellent quality at low cost. Use Opus only when you need the absolute highest reasoning quality.</p>

<h2>Advanced Context Management Techniques</h2>

<h3>Technique 1: Rolling Window</h3>

<p>Keep only the most recent N exchanges plus essential context.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Structure:
[Essential context: Project brief]
[Last 5 exchanges]
[Current question]

Everything older is dropped.
</pre>

<h3>Technique 2: Hierarchical Summaries</h3>

<p>Create layered summaries at different levels of detail.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Level 1: One-sentence summary per chapter
Level 2: One-paragraph summary per chapter  
Level 3: Full chapter (only when needed)

Feed levels 1-2 for overview tasks.
Feed level 3 only for specific deep dives.
</pre>

<h3>Technique 3: Token Budgeting</h3>

<p>Allocate token "budget" to different parts of your prompt.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Total budget: 128,000 tokens (GPT-4o)

Allocation:
- System instructions: 500 tokens
- Essential context: 50,000 tokens
- Your question: 500 tokens
- AI response space: 77,000 tokens

Discipline: Even with large budgets, plan your context.
More focused context = better quality responses.
</pre>

<h2>🎯 Practical Exercise</h2>

<p><strong>Scenario:</strong> You need to analyze a 200,000-word research corpus that exceeds even Claude's 200K context window.</p>

<p><strong>Design your strategy:</strong></p>

<ol>
<li>How will you break up the document?</li>
<li>What will you extract from each chunk?</li>
<li>How will you synthesize insights at the end?</li>
<li>Calculate approximate token cost</li>
</ol>

<p><strong>Example answer:</strong></p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
1. Break into 5 chunks (~40K words each)

2. For each chunk, extract:
   - 5 key findings
   - 2 methodology notes
   - Key questions raised

3. Synthesis:
   - Combine all findings (25 total)
   - Group by theme
   - Ask AI to create final analysis

4. Cost calculation (using Claude 3.5 Sonnet):
   - 200K words ≈ 266K tokens
   - Processing: 266K * $0.003 = $0.80
   - Plus synthesis: ~$0.10
   - Total: ~$0.90
</pre>

<h2>✅ Key Takeaways</h2>

<ol>
<li><strong>Context windows are hard limits</strong> — Exceed them and AI loses all older information</li>
<li><strong>Match model to task</strong> — Don't overpay for context you don't need</li>
<li><strong>Strategic chunking works</strong> — Break large projects into logical pieces</li>
<li><strong>External memory is powerful</strong> — Maintain state documents for multi-session work</li>
<li><strong>Token costs add up</strong> — Budget wisely, compress when possible</li>
<li><strong>Summarization preserves essence</strong> — You rarely need full detail in context</li>
</ol>

<h2>💡 Pro Tips</h2>

<ul>
<li><strong>For long projects:</strong> Create a "project brief" document (300 words) that summarizes everything. Start every session by pasting it.</li>
<li><strong>For research:</strong> Extract findings incrementally rather than trying to process everything at once.</li>
<li><strong>For writing:</strong> Work in sections. Feed AI only the current section + brief outline of the whole.</li>
<li><strong>For code:</strong> Reference only the relevant files, not your entire codebase.</li>
</ul>

<h2>⚠️ Common Mistakes</h2>

<ul>
<li><strong>Assuming AI "remembers" previous chats</strong> — Each conversation starts fresh</li>
<li><strong>Not tracking token usage</strong> — Costs can surprise you</li>
<li><strong>Using the most expensive model for everything</strong> — GPT-4o mini or Claude Haiku handles most simple tasks at a fraction of the cost</li>
<li><strong>Keeping full conversation history</strong> — Learn to compress and summarize</li>
</ul>

<h2>🚀 Coming Up Next</h2>

<p>In Lesson 1.3, we'll explore <strong>Hallucinations & Prevention Strategies</strong>—learning to identify when AI is making things up, techniques to reduce hallucinations, and verification frameworks to ensure accuracy.</p>
</div>
      `,
    },
  })

  // Lesson 1.3
  const lesson1_3 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: 'Hallucinations & Prevention Strategies',
      slug: 'hallucinations-prevention',
      duration: 20,
      order: 3,
      content: `
<div class="lesson-content">
<h1>Hallucinations & Prevention Strategies</h1>

<h2>🎯 What You'll Learn</h2>
<p>By the end of this lesson, you'll be able to:</p>
<ul>
<li>Identify different types of AI hallucinations</li>
<li>Understand why hallucinations happen at a technical level</li>
<li>Implement prevention strategies to reduce false outputs</li>
<li>Build verification systems for critical information</li>
<li>Know when to trust AI and when to be skeptical</li>
</ul>

<h2>What Are Hallucinations?</h2>

<p><strong>Hallucination:</strong> When AI confidently generates information that is partially or completely false, with no indication of uncertainty.</p>

<p>This isn't a bug—it's a fundamental characteristic of how language models work. They generate plausible text without fact-checking.</p>

<h3>Real-World Example</h3>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
User: "What books did Malcolm Gladwell write in 2022?"

AI: "In 2022, Malcolm Gladwell published 'The Pattern Theory' 
in March and 'Rethinking Success' in November, both of which 
became immediate bestsellers."

Reality: Malcolm Gladwell published NO books in 2022. 
Both titles are completely fabricated.
</pre>

<p><strong>Why this is dangerous:</strong></p>
<ul>
<li>The answer sounds completely plausible</li>
<li>The AI shows zero uncertainty</li>
<li>Even includes specific months</li>
<li>Most people would accept this as fact</li>
</ul>

<h2>Why Hallucinations Happen</h2>

<p>Remember from Lesson 1: AI predicts the most probable next token based on patterns. Here's the problem:</p>

<h3>The Hallucination Process</h3>

<ol>
<li><strong>You ask a question</strong> → "What books did Malcolm Gladwell write in 2022?"</li>
<li><strong>AI searches for patterns</strong> → "Malcolm Gladwell" + "books" + "2022"</li>
<li><strong>Finds similar patterns</strong> → "Malcolm Gladwell wrote [book title] in [year]"</li>
<li><strong>No exact match exists</strong> → Gladwell didn't publish in 2022</li>
<li><strong>AI generates plausible completion anyway</strong> → Creates realistic-sounding titles</li>
<li><strong>No truth verification</strong> → AI has no mechanism to check if this is real</li>
</ol>

<p><strong>Key insight:</strong> AI optimizes for plausibility, not truth. A convincing lie scores higher than "I don't know."</p>

<h2>Types of Hallucinations</h2>

<h3>1. Factual Hallucinations</h3>

<p>AI generates false information about real events, people, or facts.</p>

<p><strong>Examples:</strong></p>
<ul>
<li>Fake statistics: "According to a 2021 Stanford study, 73% of..." (no such study exists)</li>
<li>Wrong dates: "The iPhone was released in 2008" (actually 2007)</li>
<li>False attributions: Quoting someone who never said that</li>
</ul>

<h3>2. Source Hallucinations</h3>

<p>AI cites non-existent sources or misattributes real information.</p>

<p><strong>Example:</strong></p>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px;">
AI: "As reported in The New York Times article 'The Future of Work' 
(March 15, 2023), remote work has decreased productivity by 23%."

Reality: That specific article doesn't exist. The statistic is invented.
</pre>

<h3>3. Temporal Hallucinations</h3>

<p>AI places events, technologies, or people in the wrong time periods.</p>

<p><strong>Example:</strong></p>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px;">
AI: "In his 1995 book, Steve Jobs discussed how social media 
would transform business."

Problems:
- Jobs didn't write a book in 1995
- Social media as we know it didn't exist in 1995
- The concepts don't match the timeline
</pre>

<h3>4. Detail Elaboration</h3>

<p>Core fact is correct, but AI invents specific details.</p>

<p><strong>Example:</strong></p>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px;">
Truth: Tesla was founded in 2003
AI elaboration: "Tesla was founded on July 12, 2003, in Martin 
Eberhard's garage in San Carlos, California, with an initial 
investment of $6.5 million from Peter Thiel."

Reality: Some details correct, others completely fabricated.
</pre>

<h2>Prevention Strategy 1: Constrain the Pattern Space</h2>

<p>Force AI to stay within verifiable boundaries.</p>

<h3>❌ Vulnerable Prompt</h3>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px;">
"Tell me about the history of Tesla Motors."
</pre>

<p><strong>Why it's risky:</strong> AI can generate any plausible-sounding history. No constraints on what it can invent.</p>

<h3>✅ Protected Prompt</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px;">
"List 5 documented facts about Tesla Motors history.

For each fact, you must:
1. State the specific fact
2. Cite the source (article, book, SEC filing, interview)
3. Include the date of the source

If you cannot cite a reliable source, do NOT include that fact.
If you're uncertain, say 'I'm not certain about this.'"
</pre>

<p><strong>Why it works:</strong></p>
<ul>
<li>Forces AI into verifiable pattern space</li>
<li>Requiring citations triggers "uncertainty" patterns</li>
<li>Explicit permission to say "I don't know" reduces fabrication</li>
</ul>

<h2>Prevention Strategy 2: Inject Uncertainty</h2>

<p>Explicitly ask for confidence levels and alternative viewpoints.</p>

<h3>❌ Vulnerable Prompt</h3>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px;">
"What caused the 2008 financial crisis?"
</pre>

<h3>✅ Protected Prompt</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px;">
"What caused the 2008 financial crisis?

For each cause you identify:
- Rate your confidence: HIGH (broad consensus) / 
  MEDIUM (debated) / LOW (speculative)
- Note if there are dissenting views
- Distinguish between immediate triggers and underlying causes

If experts disagree significantly, explain both perspectives."
</pre>

<p><strong>Why it works:</strong> Forces AI to access "uncertainty" and "debate" patterns from training data rather than just generating confident assertions.</p>

<h2>Prevention Strategy 3: Adversarial Self-Critique</h2>

<p>Have AI critique and refine its own output in a second pass.</p>

<h3>❌ Single-Pass (Risky)</h3>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px;">
"Explain blockchain technology."
[Accept first output]
</pre>

<h3>✅ Two-Pass (Protected)</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px;">
Pass 1:
"Explain blockchain technology in simple terms."

[Get response]

Pass 2:
"Now critique your explanation above:
1. Identify any oversimplifications that might be misleading
2. Note any claims you're uncertain about
3. Flag anything that could be interpreted incorrectly
4. Provide a revised version addressing these issues"
</pre>

<p><strong>Why it works:</strong> Second pass activates "critical thinking" and "error detection" patterns, catching many first-pass hallucinations.</p>

<h2>Prevention Strategy 4: Request Evidence</h2>

<p>Make AI provide evidence for claims, which reduces unsupported assertions.</p>

<h3>Example: Medical Information</h3>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px;">
"What does peer-reviewed research say about meditation's effects 
on anxiety?

Requirements:
- Only include findings from published studies
- Cite specific studies (authors, year, journal)
- Distinguish between:
  * Well-established findings (multiple studies)
  * Preliminary findings (single or few studies)
  * Proposed mechanisms vs. confirmed mechanisms
- Note any contradictory findings

Reminder: This is for educational purposes. I will consult 
healthcare professionals for medical decisions."
</pre>

<h2>Detection Techniques: Red Flags</h2>

<p>Train yourself to spot potential hallucinations:</p>

<h3>🚩 Warning Sign 1: Overly Specific Details</h3>

<p><strong>Example:</strong> "On March 15, 2019, at 2:47 PM, Elon Musk tweeted..."</p>

<p><strong>Why suspicious:</strong> Unless the prompt specifically asks for this level of detail and AI has access to verified sources, such precision often indicates fabrication.</p>

<h3>🚩 Warning Sign 2: Too-Perfect Narrative</h3>

<p><strong>Example:</strong> "Einstein struggled in school, was rejected from university, but through persistence became the greatest physicist of all time."</p>

<p><strong>Why suspicious:</strong> Real life is messier. Overly neat narratives are often simplified or embellished. (In reality, Einstein wasn't a bad student—this is a myth.)</p>

<h3>🚩 Warning Sign 3: Anachronistic Language</h3>

<p><strong>Example:</strong> "In 1950, scientists were concerned about AI safety..."</p>

<p><strong>Why suspicious:</strong> "AI safety" is modern terminology. 1950s discussions would use different framing.</p>

<h3>🚩 Warning Sign 4: Suspiciously Convenient Connections</h3>

<p><strong>Example:</strong> "Steve Jobs met with the Dalai Lama in 1997, which inspired the 'Think Different' campaign."</p>

<p><strong>Why suspicious:</strong> Perfect narrative connections are often invented. (This specific meeting isn't documented.)</p>

<h3>🚩 Warning Sign 5: Lack of Nuance on Controversial Topics</h3>

<p><strong>Example:</strong> "Studies show working from home increases productivity by 25%."</p>

<p><strong>Why suspicious:</strong> Real research on complex topics always has nuance, debates, and contradictions. One-sided statements are red flags.</p>

<h2>Verification Methods</h2>

<h3>Method 1: Cross-Reference</h3>

<p>Ask AI to verify its own claims:</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
[After getting an answer]

"You stated that [specific claim]. Can you:
1. Provide the specific source for this claim
2. Note if there are any contradicting sources
3. Rate your confidence in this claim"
</pre>

<h3>Method 2: Probe Deeper</h3>

<p>Request more specific details:</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
AI: "Malcolm Gladwell published 'The Pattern Theory' in 2022."

You: "Who was the publisher? What was the ISBN? 
What was the book's subtitle?"

[If AI confidently provides these, they're likely ALL fabricated. 
If AI says it doesn't know, that's more honest.]
</pre>

<h3>Method 3: Reverse Question</h3>

<p>Ask the opposite question and check consistency:</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
First: "What are the benefits of working from home?"
Then: "What are the downsides of working from home?"

Compare: Are the claims consistent? Do they contradict?
If AI says WFH increases productivity by 25%, then says 
it decreases productivity, both are likely hallucinated statistics.
</pre>

<h3>Method 4: External Validation</h3>

<p>For critical information, always verify externally:</p>

<ul>
<li><strong>Statistics:</strong> Check original study or authoritative source</li>
<li><strong>Quotes:</strong> Verify against original text or verified quote databases</li>
<li><strong>Historical facts:</strong> Cross-reference with multiple reputable sources</li>
<li><strong>Medical/legal info:</strong> Consult professionals, never rely solely on AI</li>
</ul>

<h2>When to Trust vs. When to Verify</h2>

<h3>Lower-Stakes: Trust More Freely</h3>

<ul>
<li>Brainstorming ideas</li>
<li>Creative writing</li>
<li>Learning new concepts (general education)</li>
<li>Generating options to explore</li>
</ul>

<h3>Medium-Stakes: Verify Key Claims</h3>

<ul>
<li>Business research</li>
<li>Academic work</li>
<li>Professional writing</li>
<li>Learning technical skills</li>
</ul>

<h3>High-Stakes: Verify Everything</h3>

<ul>
<li>Medical information</li>
<li>Legal advice</li>
<li>Financial decisions</li>
<li>Safety-critical information</li>
<li>Academic citations</li>
</ul>

<h2>🎯 Practical Exercise</h2>

<p><strong>Task: Deliberately Induce a Hallucination</strong></p>

<ol>
<li><strong>Ask about an obscure topic combined with modern concepts:</strong>
   <br>"What did [obscure 19th century figure] say about artificial intelligence?"</li>

<li><strong>Document what AI generates</strong> (it will likely hallucinate)</li>

<li><strong>Redesign the prompt using prevention strategies:</strong>
   <br>Include requirements for sources, confidence levels, and permission to say "I don't know"</li>

<li><strong>Compare the outputs:</strong> Did your improved prompt reduce hallucination?</li>
</ol>

<h2>✅ Key Takeaways</h2>

<ol>
<li><strong>Hallucinations are inevitable</strong> — Result of pattern completion without fact-checking</li>
<li><strong>Constrain pattern space</strong> — Force AI to stay within verifiable bounds</li>
<li><strong>Inject uncertainty</strong> — Explicitly request confidence levels and caveats</li>
<li><strong>Use adversarial critique</strong> — Have AI check its own work in a second pass</li>
<li><strong>Request evidence</strong> — Require sources and citations for important claims</li>
<li><strong>Learn to spot red flags</strong> — Train your hallucination detector</li>
<li><strong>Verify externally</strong> — For high-stakes information, always fact-check</li>
</ol>

<h2>💡 Pro Tips</h2>

<ul>
<li><strong>Three-Source Rule:</strong> For critical facts, get AI to cite three independent sources. If it can't, treat as uncertain.</li>
<li><strong>Specificity Test:</strong> Ask for very specific details (ISBN, page numbers, exact dates). Excessive specificity without sources suggests fabrication.</li>
<li><strong>Controversy Check:</strong> On debated topics, explicitly ask for opposing views. If AI presents only one side, it may be oversimplifying or hallucinating.</li>
<li><strong>Known-Truth Baseline:</strong> Occasionally ask questions you already know the answer to. This calibrates your sense of AI's reliability.</li>
</ul>

<h2>⚠️ Common Mistakes</h2>

<ul>
<li><strong>Trusting AI more on topics you know less about</strong> — Exactly when you should be MOST skeptical</li>
<li><strong>Assuming citations are real without checking</strong> — AI can invent plausible-looking sources</li>
<li><strong>Treating AI like a search engine</strong> — Search engines find existing content; AI generates new text</li>
<li><strong>Using AI for time-sensitive information</strong> — AI doesn't know what happened after training cutoff</li>
</ul>

<h2>🚀 Coming Up Next</h2>

<p>In Module 2, we shift from understanding AI architecture to mapping the practical landscape. You'll learn to navigate the ecosystem of AI tools, understanding which to use when, and how to build a strategic AI stack for your specific needs.</p>

<p>We start with <strong>"ChatGPT vs Claude vs Gemini"</strong> — a practical comparison that will save you time and money by matching the right tool to each task.</p>
</div>
      `,
    },
  })

  console.log('✅ Module 1 complete with 3 lessons and quiz!')

  // Seed Modules 2-4 (Free + Starter tier)
  console.log('📦 Seeding Modules 2-4...')
  await seedModules2to4(prisma, course.id)
  console.log('✅ Modules 2-4 complete!')

  // Seed Modules 5-8 (Pro tier)
  console.log('📦 Seeding Modules 5-8...')
  await seedModules5to8(prisma, course.id)
  console.log('✅ Modules 5-8 complete!')

  // Seed Modules 9-12 (Master tier)
  console.log('📦 Seeding Modules 9-12...')
  await seedModules9to12(prisma, course.id)
  console.log('✅ Modules 9-12 complete!')

  // Create badges
  const badges = [
    { name: 'First Steps', description: 'Complete your first lesson', icon: '👣', criteria: 'complete_1_lesson' },
    { name: 'Quick Learner', description: 'Complete 5 lessons', icon: '📚', criteria: 'complete_5_lessons' },
    { name: 'Module Master', description: 'Complete an entire module', icon: '🏆', criteria: 'complete_module' },
    { name: 'Quiz Ace', description: 'Score 100% on a quiz', icon: '🎯', criteria: 'perfect_quiz' },
    { name: 'Halfway There', description: 'Complete 50% of the course', icon: '⭐', criteria: 'complete_50_percent' },
    { name: 'AI Master', description: 'Complete the entire course', icon: '🎓', criteria: 'complete_course' },
  ]

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    })
  }
  console.log('✅ Badges created!')

  console.log('🎉 AI Mastery Academy database seeded successfully with 12 modules!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })