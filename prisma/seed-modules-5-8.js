async function seedModules5to8(prisma, courseId) {
  // ============================================
  // MODULE 5: ADVANCED AI WORKFLOWS (PRO)
  // ============================================
  const module5 = await prisma.module.create({
    data: {
      courseId,
      title: 'Advanced AI Workflows & Automation',
      slug: 'advanced-ai-workflows',
      description: 'Chain multiple AI tasks into powerful automated systems',
      order: 5,
      icon: '⚡',
      tier: 'pro',
    },
  })

  const lesson5_1 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: 'Multi-Step AI Workflows',
      slug: 'multi-step-ai-workflows',
      duration: 22,
      order: 1,
      content: `
<div class="lesson-content">
<h1>Multi-Step AI Workflows</h1>

<h2>What You'll Learn</h2>
<p>Single prompts are powerful. Chained workflows are transformative. Learn to connect multiple AI steps into systems that produce expert-level output.</p>

<h2>Why Multi-Step Beats Single-Step</h2>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
Single-step approach:
"Write a complete marketing strategy for my SaaS product"
Result: Generic, surface-level strategy
</pre>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Multi-step workflow:
Step 1: "Analyze my target market" → detailed audience insight
Step 2: "Based on this audience, identify top 3 channels" → focused strategy
Step 3: "For each channel, create a 30-day action plan" → tactical execution
Step 4: "Review the plan for gaps and add KPIs" → quality check

Result: Comprehensive, actionable, customized strategy
</pre>

<h2>The Pipeline Pattern</h2>
<p>Think of AI workflows like a factory assembly line. Each station adds value:</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Research → Outline → Draft → Review → Polish → Publish

Each step uses the output of the previous step as input.
Each step has a specialized prompt optimized for that task.
</pre>

<h2>Workflow 1: Content Creation Pipeline</h2>

<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Step 1 — Research:
"Research the topic [topic]. Provide: 5 key points with sources,
3 common misconceptions, 2 unique angles not covered by competitors"

Step 2 — Outline:
"Using this research, create a blog post outline with:
- Attention-grabbing title options (3)
- H2 headings for each section
- 2-3 bullet points of what each section covers
- Suggested word count per section"

Step 3 — Draft:
"Write the full blog post following this outline.
[Paste outline + your style guidelines]"

Step 4 — Review:
"Critique this blog post. Check for:
- Factual accuracy
- Engagement (is it boring anywhere?)
- SEO optimization
- Missing information
Provide specific improvements."

Step 5 — Polish:
"Apply these improvements. Also: tighten language, remove
filler, add a stronger hook, and ensure every paragraph
adds value."
</pre>

<h2>Workflow 2: Business Proposal System</h2>

<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Step 1 — Client Analysis:
"Based on this client info: [details], identify their top 3
pain points, their likely budget range, and decision criteria"

Step 2 — Solution Design:
"Design a solution that addresses these pain points. Include
deliverables, timeline, and why our approach is unique"

Step 3 — Pricing Strategy:
"Create 3 pricing tiers (good/better/best) for this proposal.
Anchor the middle tier as the recommended option"

Step 4 — Draft Proposal:
"Write a professional proposal combining all of the above.
Structure: Executive Summary → Problem → Solution → Pricing
→ Why Us → Next Steps"

Step 5 — Objection Prep:
"What are the 5 most likely objections this client will
have? Write a confident response for each."
</pre>

<h2>Building Your Own Workflows</h2>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Framework for creating any workflow:

1. Start with the end goal → What final output do you need?
2. Work backward → What inputs does each step need?
3. Identify specializations → What's each step optimized for?
4. Add quality gates → Where should you review/redirect?
5. Document the workflow → Save prompts for reuse

Test the workflow 3 times and refine prompts at each step.
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Chained workflows beat single prompts</strong> for complex tasks</li>
<li><strong>Each step specializes</strong> — research, outline, draft, review, polish</li>
<li><strong>Output feeds input</strong> — previous results become next step's context</li>
<li><strong>Quality gates</strong> at each step catch issues early</li>
<li><strong>Document and reuse</strong> — workflows improve over time</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 5.2 covers building repeatable AI-powered content systems with SOPs for consistent quality.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson5_1.id, title: 'Multi-Step Workflows Quiz', passingScore: 70, questions: { create: [
    { question: 'Why do multi-step AI workflows produce better results than single prompts?', type: 'mcq', options: JSON.stringify(['They cost more so they must be better', 'Each step specializes in one task and builds on previous results', 'They use more advanced AI models', 'Single prompts cannot generate any useful output']), correctAnswer: '1', explanation: 'Multi-step workflows let each prompt specialize in one task, with each step building on the refined output of the previous step. This produces much more thorough results.', order: 1 },
    { question: 'What is the "pipeline pattern" in AI workflows?', type: 'mcq', options: JSON.stringify(['Running multiple AI models simultaneously', 'A series of specialized steps where each output feeds the next input', 'Using only one AI tool for all tasks', 'A specific OpenAI feature']), correctAnswer: '1', explanation: 'The pipeline pattern connects sequential steps where each step\'s output becomes the next step\'s input, like a factory assembly line. Each station adds specific value.', order: 2 },
    { question: 'What is the purpose of a "quality gate" in a workflow?', type: 'mcq', options: JSON.stringify(['To make the process slower and more thorough', 'To review output at key points and catch issues before they compound', 'To limit how many tokens are used', 'To prevent AI from generating content']), correctAnswer: '1', explanation: 'Quality gates are review points where you check the output before proceeding. Catching issues early prevents errors from compounding through subsequent steps.', order: 3 },
    { question: 'When building a custom workflow, what should you start with?', type: 'mcq', options: JSON.stringify(['The first step of the process', 'The AI model selection', 'The end goal — what final output do you need?', 'The budget for AI tools']), correctAnswer: '2', explanation: 'Start with the end goal and work backward. Knowing what final output you need helps you determine what steps and inputs are required to get there.', order: 4 },
  ] } } })

  const lesson5_2 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: 'AI-Powered Content Systems',
      slug: 'ai-powered-content-systems',
      duration: 20,
      order: 2,
      content: `
<div class="lesson-content">
<h1>AI-Powered Content Systems</h1>

<h2>What You'll Learn</h2>
<p>Build repeatable content creation systems that maintain quality while scaling output by 5-10x.</p>

<h2>The Content System vs. One-Off Creation</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
One-off creation:
"Write a blog post about X" → decent output, every time from scratch

Content system:
Brand voice guide + topic research + outline template + draft prompt
+ editing checklist → consistently excellent output, every time
</pre>

<h2>Building Your Brand Voice Guide</h2>
<p>Create a document that defines your brand's AI personality:</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"My Brand Voice Guide:

Tone: Professional but approachable. Think 'smart friend
who happens to be an expert.'

DO use:
- Contractions (we're, you'll, it's)
- Short sentences mixed with longer ones
- Concrete examples over abstract concepts
- Active voice
- Second person ('you')

DON'T use:
- 'In today's fast-paced world'
- 'Leverage', 'synergy', 'cutting-edge'
- Passive voice
- Sentences over 25 words
- More than 2 sentences per paragraph

Reading level: 8th grade
Vocabulary: Avoid jargon. If a technical term is necessary,
explain it immediately."

Paste this at the start of every content prompt.
</pre>

<h2>The Batch Content Workflow</h2>

<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Monday: Topic Research (30 min)
"Generate 20 content ideas for [niche] based on:
- Common questions our audience asks
- Current trends in the industry
- Competitor gaps (topics they don't cover well)
- Seasonal relevance for this month"

Tuesday: Outline Day (1 hour)
Create outlines for 5 pieces using the outline template

Wednesday-Thursday: Draft Day (2 hours)
Draft all 5 pieces using the content pipeline

Friday: Edit & Schedule (1 hour)
Polish, add images, schedule for the week

Output: 5 quality pieces per week with ~5 hours of work
(vs. 15-20 hours without AI)
</pre>

<h2>Maintaining Consistency</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Consistency checklist for AI content:
□ Brand voice guide pasted at start
□ Target audience specified
□ Format template followed
□ Fact-checked key claims
□ Added personal anecdotes/experience
□ Reviewed for AI-sounding phrases
□ Unique images/visuals added
□ CTA matches business goal
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Systems beat one-offs</strong> — invest time upfront, save time forever</li>
<li><strong>Brand voice guides</strong> ensure AI matches your style consistently</li>
<li><strong>Batch processing</strong> — create a week of content in one focused session</li>
<li><strong>5 quality pieces per week</strong> with ~5 hours of work</li>
<li><strong>Always add human elements</strong> — personal stories, unique insights, verification</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 5.3 covers no-code automation with Zapier and Make.com — connecting AI to your existing tools automatically.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson5_2.id, title: 'Content Systems Quiz', passingScore: 70, questions: { create: [
    { question: 'What is the main advantage of a content system over one-off creation?', type: 'mcq', options: JSON.stringify(['It costs less per piece', 'Consistently excellent output with much less time per piece', 'AI generates longer content', 'It eliminates the need for human editing']), correctAnswer: '1', explanation: 'Content systems produce consistently high-quality output because they use proven templates, brand voice guides, and repeatable workflows — reducing time from 3-4 hours to about 1 hour per piece.', order: 1 },
    { question: 'What should you paste at the start of every content prompt?', type: 'mcq', options: JSON.stringify(['Your company logo', 'Your brand voice guide', 'A disclaimer about AI', 'Previous blog posts']), correctAnswer: '1', explanation: 'Pasting your brand voice guide at the start of every content prompt ensures the AI matches your tone, style, vocabulary, and formatting preferences consistently.', order: 2 },
    { question: 'How much content can you realistically produce per week with an AI content system?', type: 'mcq', options: JSON.stringify(['1 piece, same as without AI', '5 quality pieces with about 5 hours of work', '50 pieces with no human involvement', '100+ pieces automatically']), correctAnswer: '1', explanation: 'With a well-designed AI content system, you can produce about 5 quality pieces per week in roughly 5 hours — compared to 15-20 hours without AI assistance.', order: 3 },
    { question: 'What human element should always be added to AI-generated content?', type: 'mcq', options: JSON.stringify(['Nothing — AI content is complete as-is', 'Personal anecdotes, unique insights, and fact verification', 'More words to make it longer', 'Copyright notices']), correctAnswer: '1', explanation: 'AI content needs human elements — personal stories, unique professional insights, fact verification, and the perspective that only you can provide. This is what separates great content from generic AI output.', order: 4 },
  ] } } })

  const lesson5_3 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: 'No-Code AI Automation',
      slug: 'nocode-ai-automation',
      duration: 20,
      order: 3,
      content: `
<div class="lesson-content">
<h1>No-Code AI Automation with Zapier & Make</h1>

<h2>What You'll Learn</h2>
<p>Connect AI to your existing tools without writing any code. Build automations that run in the background and save hours daily.</p>

<h2>What Is No-Code Automation?</h2>
<p>No-code automation tools like Zapier and Make.com let you create "if this, then that" workflows between apps. When you add AI into these workflows, the possibilities become extraordinary.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Example: When a new customer support email arrives →
AI analyzes the sentiment and urgency →
Routes to the right team member →
Drafts a personalized response →
Sends a Slack notification to the team

All automatic. Zero manual work.
</pre>

<h2>Top 5 AI Automations to Build Today</h2>

<h3>1. Email → AI Summary → Slack</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Trigger: New email arrives
Action 1: Send email text to ChatGPT
Prompt: "Summarize this email in 2 sentences. Flag if urgent."
Action 2: Post summary to Slack channel

Time saved: 30 min/day reviewing non-urgent emails
</pre>

<h3>2. Form Submission → AI Analysis → CRM Update</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Trigger: New form submission (Typeform/Google Forms)
Action 1: AI categorizes the lead (hot/warm/cold)
Action 2: AI generates a personalized follow-up email draft
Action 3: Creates contact in CRM with AI notes

Time saved: 15 min per lead × 10 leads/day = 2.5 hours/day
</pre>

<h3>3. Social Mention → AI Response Draft</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Trigger: Brand mentioned on social media
Action 1: AI analyzes sentiment (positive/negative/neutral)
Action 2: AI drafts an appropriate response
Action 3: Sends to your review queue for approval

Time saved: 1 hour/day on social monitoring
</pre>

<h3>4. Weekly Report Generator</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Trigger: Every Friday at 3 PM
Action 1: Pull data from Google Sheets/Airtable
Action 2: AI analyzes trends and creates insights
Action 3: AI generates formatted report
Action 4: Emails report to team

Time saved: 2-3 hours of manual report creation
</pre>

<h3>5. Content Repurposing Engine</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Trigger: New blog post published
Action 1: AI creates 5 social media posts (one per platform)
Action 2: AI creates email newsletter snippet
Action 3: AI extracts 3 quote graphics text
Action 4: Schedules all across platforms

Time saved: 1-2 hours per blog post in repurposing
</pre>

<h2>Getting Started with Zapier</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
1. Sign up at zapier.com (free plan: 100 tasks/month)
2. Create a new Zap
3. Choose trigger app (Gmail, Slack, etc.)
4. Add ChatGPT as an action step
5. Write your prompt with dynamic fields
6. Add output destination (Slack, Sheet, Email)
7. Test and activate

Cost: Free for basic, $20/mo for 750 tasks
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>No-code AI automation</strong> requires zero programming skills</li>
<li><strong>Start with email and Slack</strong> — highest impact, easiest to set up</li>
<li><strong>AI + automation = always-on assistant</strong> working in the background</li>
<li><strong>Build incrementally</strong> — start with 1 automation, add more over time</li>
<li><strong>Always add human review</strong> for customer-facing outputs</li>
</ol>

<h2>Coming Up Next</h2>
<p>Module 6 dives deep into AI for Content & Marketing — building full content strategies, copywriting mastery, and social media optimization.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson5_3.id, title: 'No-Code Automation Quiz', passingScore: 70, questions: { create: [
    { question: 'What tools enable no-code AI automation?', type: 'mcq', options: JSON.stringify(['Only custom Python scripts', 'Zapier and Make.com', 'Excel macros only', 'AI does not support automation']), correctAnswer: '1', explanation: 'Zapier and Make.com (formerly Integromat) are no-code platforms that let you connect AI like ChatGPT to your existing apps without any programming.', order: 1 },
    { question: 'Which AI automation would save the most time for a sales team?', type: 'mcq', options: JSON.stringify(['Blog post repurposing', 'Form submission → AI lead scoring → CRM update', 'Weekly report generation', 'Social media monitoring']), correctAnswer: '1', explanation: 'Automating lead processing (scoring, categorizing, drafting follow-ups, CRM entry) can save 2.5+ hours daily for active sales teams — the highest-impact automation.', order: 2 },
    { question: 'What should you always include for customer-facing automated outputs?', type: 'mcq', options: JSON.stringify(['Longer responses for better quality', 'A human review step before sending', 'Multiple AI models for better accuracy', 'A disclaimer that it was AI-generated']), correctAnswer: '1', explanation: 'Any automation that produces customer-facing outputs (emails, social responses, proposals) should include a human review step to ensure quality and appropriateness.', order: 3 },
    { question: 'What is the recommended approach for building automations?', type: 'mcq', options: JSON.stringify(['Build all automations at once', 'Start with one high-impact automation and add more over time', 'Wait until you have a large team', 'Only automate tasks that take less than 5 minutes']), correctAnswer: '1', explanation: 'Start with one automation that addresses your biggest time sink, perfect it, then incrementally add more. This prevents overwhelm and ensures each automation is reliable.', order: 4 },
  ] } } })

  console.log('  ✅ Module 5: Advanced Workflows (3 lessons)')

  // ============================================
  // MODULE 6: AI FOR CONTENT & MARKETING (PRO)
  // ============================================
  const module6 = await prisma.module.create({
    data: {
      courseId,
      title: 'AI for Content & Marketing',
      slug: 'ai-content-marketing',
      description: 'Build AI-powered content strategies that drive traffic and conversions',
      order: 6,
      icon: '✍️',
      tier: 'pro',
    },
  })

  const lesson6_1 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: 'AI-Driven Content Strategy',
      slug: 'ai-content-strategy',
      duration: 22,
      order: 1,
      content: `
<div class="lesson-content">
<h1>AI-Driven Content Strategy</h1>

<h2>What You'll Learn</h2>
<p>Use AI to build a complete content strategy — from audience research to content calendar to performance optimization.</p>

<h2>The AI Content Strategy Framework</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
1. Audience Discovery → Who are you creating for?
2. Topic Mining → What do they want to read?
3. Content Calendar → When and where to publish?
4. Creation System → How to produce efficiently?
5. Optimization → How to improve performance?
</pre>

<h2>Step 1: AI Audience Discovery</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Create 3 detailed audience personas for [your business].

For each persona include:
- Demographics (age, role, income, location)
- Top 3 pain points (be specific, not generic)
- Where they consume content (platforms, formats)
- What would make them share content
- Their level of expertise in [your topic]
- What objections they have to [your product/service]

Base this on [industry] best practices."
</pre>

<h2>Step 2: AI Topic Mining</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Generate 30 content ideas for [audience persona] in [niche].

Organize into categories:
- Awareness: Topics for people who don't know they need us yet
- Consideration: Topics for people comparing solutions
- Decision: Topics for people ready to buy
- Retention: Topics for existing customers

For each idea: title, format (blog/video/social), and
estimated search intent (informational/commercial/navigational)"
</pre>

<h2>Step 3: Content Calendar</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Create a 4-week content calendar for [business].

Requirements:
- 3 blog posts per week
- 5 social posts per week per platform (LinkedIn, Twitter, Instagram)
- 1 email newsletter per week
- Mix of content types: educational, entertaining, promotional
- 80/20 rule: 80% value, 20% promotional

Present as a table with: Date | Platform | Content Type |
Topic | CTA | Funnel Stage"
</pre>

<h2>SEO-First Content Creation</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
AI-powered SEO workflow:
1. "Generate 20 long-tail keywords for [topic]"
2. "Group these keywords by search intent"
3. "Create an outline targeting [primary keyword]"
4. "Write the article with natural keyword placement"
5. "Generate meta title (under 60 chars) and meta
   description (under 155 chars)"
6. "Suggest 5 internal linking opportunities"
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Strategy before creation</strong> — audience → topics → calendar → create</li>
<li><strong>AI excels at audience personas</strong> and topic ideation</li>
<li><strong>Content calendars</strong> eliminate "what should I write?" paralysis</li>
<li><strong>SEO-first approach</strong> ensures content gets found</li>
<li><strong>80/20 rule</strong> — mostly value, some promotion</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 6.2 covers AI Copywriting Mastery — writing sales pages, ads, and emails that convert using proven frameworks.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson6_1.id, title: 'Content Strategy Quiz', passingScore: 70, questions: { create: [
    { question: 'What is the first step in the AI content strategy framework?', type: 'mcq', options: JSON.stringify(['Creating content immediately', 'Audience discovery — understanding who you are creating for', 'Setting up social media accounts', 'Choosing AI tools']), correctAnswer: '1', explanation: 'Audience discovery comes first because all content decisions — topics, format, tone, platform — depend on understanding who you are trying to reach.', order: 1 },
    { question: 'What is the 80/20 rule for content?', type: 'mcq', options: JSON.stringify(['80% AI-generated, 20% human-written', '80% valuable content, 20% promotional content', '80% blog posts, 20% social media', '80% text, 20% images']), correctAnswer: '1', explanation: 'The 80/20 rule means 80% of your content should provide value (education, entertainment, insight) and only 20% should be promotional. This builds trust and engagement.', order: 2 },
    { question: 'Why should content be organized by funnel stage?', type: 'mcq', options: JSON.stringify(['It makes AI prompts easier', 'Different audiences need different content based on where they are in their journey', 'It reduces content creation costs', 'Search engines require it']), correctAnswer: '1', explanation: 'People at different stages (awareness, consideration, decision) have different questions and needs. Matching content to funnel stage ensures relevance and moves readers toward conversion.', order: 3 },
    { question: 'What should an SEO-first content workflow start with?', type: 'mcq', options: JSON.stringify(['Writing the article first', 'Keyword research and grouping by search intent', 'Creating social media posts', 'Designing images']), correctAnswer: '1', explanation: 'SEO-first means starting with keyword research to identify what people are actually searching for, then building content around those terms to ensure it gets found organically.', order: 4 },
  ] } } })

  const lesson6_2 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: 'AI Copywriting Mastery',
      slug: 'ai-copywriting-mastery',
      duration: 22,
      order: 2,
      content: `
<div class="lesson-content">
<h1>AI Copywriting Mastery</h1>

<h2>What You'll Learn</h2>
<p>Write copy that converts using proven frameworks — sales pages, ads, emails — all powered by AI.</p>

<h2>The Big 3 Copywriting Frameworks</h2>

<h3>1. AIDA — Attention, Interest, Desire, Action</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Write a sales email using the AIDA framework.

Product: [your product]
Audience: [who]
Price: [cost]

A — Attention: Hook them with a bold statement or question
I — Interest: Present the problem they face
D — Desire: Show how your product solves it (with proof)
A — Action: Clear, compelling call-to-action

Tone: [conversational/professional/urgent]
Length: Under 300 words"
</pre>

<h3>2. PAS — Problem, Agitate, Solution</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Write ad copy using the PAS framework.

P — Problem: [describe the pain point]
A — Agitate: Make them feel the urgency of solving it
S — Solution: Present [your product] as the answer

Keep under 100 words. End with a strong CTA.
Include a sense of urgency without being pushy."
</pre>

<h3>3. BAB — Before, After, Bridge</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Write a landing page section using BAB framework.

Before: [paint the painful current state]
After: [paint the desired future state]
Bridge: [show how your product gets them there]

Make the transformation vivid and specific.
Use concrete numbers where possible."
</pre>

<h2>AI A/B Testing</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
"Generate 5 variations of this headline for A/B testing:

Original: [your headline]
Product: [what you're selling]
Audience: [who]

Make each variation use a different psychological trigger:
1. Curiosity
2. Fear of missing out
3. Social proof
4. Specific benefit
5. Question format"
</pre>

<h2>Email Subject Line Generator</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Generate 10 email subject lines for [campaign type].

Requirements:
- Under 50 characters each
- Mix of: curiosity, urgency, personalization, benefit-driven
- No spam trigger words (FREE, ACT NOW, etc.)
- Include 2 options with emoji and 2 with numbers
- Rate each on a predicted open rate scale (1-10)"
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Frameworks produce better copy</strong> — AIDA, PAS, BAB are proven</li>
<li><strong>AI + frameworks = high-converting copy</strong> in minutes</li>
<li><strong>Generate multiple variations</strong> for A/B testing</li>
<li><strong>Use psychological triggers</strong> strategically</li>
<li><strong>Always test</strong> — let data decide which copy wins</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 6.3 covers AI for Social Media & SEO — platform-specific optimization and content repurposing.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson6_2.id, title: 'AI Copywriting Quiz', passingScore: 70, questions: { create: [
    { question: 'What does the AIDA framework stand for?', type: 'mcq', options: JSON.stringify(['Analyze, Implement, Develop, Achieve', 'Attention, Interest, Desire, Action', 'Audience, Intent, Design, Action', 'Attract, Inform, Deliver, Assess']), correctAnswer: '1', explanation: 'AIDA stands for Attention (hook), Interest (present the problem), Desire (show the solution), and Action (clear call-to-action). It is one of the oldest and most proven copywriting frameworks.', order: 1 },
    { question: 'What is the PAS framework best suited for?', type: 'mcq', options: JSON.stringify(['Long-form blog posts', 'Short ad copy that drives urgency', 'Technical documentation', 'Internal memos']), correctAnswer: '1', explanation: 'PAS (Problem, Agitate, Solution) excels in short-form copy like ads and social posts where you need to quickly identify a pain point, amplify urgency, and present your solution.', order: 2 },
    { question: 'How should you use AI for A/B testing copy?', type: 'mcq', options: JSON.stringify(['Generate one perfect version', 'Generate multiple variations using different psychological triggers', 'Only test headlines, not body copy', 'Use the same copy on all platforms']), correctAnswer: '1', explanation: 'Generate 5+ variations using different psychological triggers (curiosity, FOMO, social proof, benefits, questions), then test them with real data to see which converts best.', order: 3 },
    { question: 'What should email subject lines avoid to prevent spam filters?', type: 'mcq', options: JSON.stringify(['Numbers and statistics', 'Questions and curiosity hooks', 'ALL CAPS, FREE, and urgent spam trigger words', 'Personalization and emojis']), correctAnswer: '2', explanation: 'Spam trigger words like FREE, ACT NOW, LIMITED TIME in all caps can send emails to spam folders. Use subtler urgency and benefit-focused language instead.', order: 4 },
  ] } } })

  const lesson6_3 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: 'AI for Social Media & SEO',
      slug: 'ai-social-media-seo',
      duration: 20,
      order: 3,
      content: `
<div class="lesson-content">
<h1>AI for Social Media & SEO</h1>

<h2>What You'll Learn</h2>
<p>Optimize your content for every platform and search engine using AI. Turn one piece of content into 10+ pieces across platforms.</p>

<h2>Platform-Specific AI Optimization</h2>

<h3>LinkedIn</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Rewrite this content for LinkedIn.

Original: [your content]

LinkedIn optimization:
- Open with a bold hook (first 2 lines visible before 'see more')
- Short paragraphs (1-2 sentences max)
- Use line breaks between paragraphs
- Include 3-5 relevant hashtags at the end
- End with a question to drive comments
- Professional but personal tone
- Under 1300 characters for optimal engagement"
</pre>

<h3>Twitter/X</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Create a Twitter thread from this content.

Original: [your content]

Thread rules:
- Tweet 1: Strong hook (under 280 characters)
- Tweets 2-6: One key point per tweet
- Final tweet: Summary + CTA
- Use simple language, no jargon
- Each tweet should stand alone but connect to the thread
- Include 'Thread 🧵' in the first tweet"
</pre>

<h2>The Content Repurposing Engine</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
One blog post becomes:
1. LinkedIn article (condensed version)
2. Twitter thread (key points)
3. Instagram carousel (visual key points)
4. Email newsletter excerpt
5. YouTube video script
6. Podcast talking points
7. Pinterest infographic text
8. Reddit discussion post
9. Quora answer
10. Facebook post

That's 10 pieces from 1 original piece.
AI handles 90% of the adaptation work.
</pre>

<h2>AI-Powered SEO Optimization</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Optimize this blog post for SEO.

Post: [paste your draft]
Primary keyword: [target keyword]
Secondary keywords: [2-3 related terms]

Check and improve:
1. Title tag (under 60 characters, keyword near front)
2. Meta description (under 155 characters, compelling)
3. H2/H3 headings (include keyword variations)
4. First 100 words (include primary keyword naturally)
5. Internal linking suggestions (3-5)
6. Image alt text suggestions
7. FAQ section for featured snippet opportunity
8. Readability improvements"
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Optimize per platform</strong> — each has different rules and audiences</li>
<li><strong>Repurpose everything</strong> — 1 piece becomes 10+ across platforms</li>
<li><strong>SEO is systematic</strong> — AI handles technical optimization</li>
<li><strong>Hooks matter most</strong> — first line decides if people keep reading</li>
<li><strong>Consistency beats perfection</strong> — post regularly with AI's help</li>
</ol>

<h2>Coming Up Next</h2>
<p>Module 7 explores AI for Data & Analytics — turning raw data into actionable business insights.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson6_3.id, title: 'Social Media & SEO Quiz', passingScore: 70, questions: { create: [
    { question: 'How many content pieces can you create from one blog post through repurposing?', type: 'mcq', options: JSON.stringify(['2-3 pieces', '5 pieces', '10+ pieces across platforms', 'Only 1 — repurposing reduces quality']), correctAnswer: '2', explanation: 'One blog post can be repurposed into 10+ pieces: LinkedIn post, Twitter thread, Instagram carousel, email snippet, video script, podcast notes, and more.', order: 1 },
    { question: 'What is the most important element of a LinkedIn post?', type: 'mcq', options: JSON.stringify(['Hashtags', 'The first 2 lines (hook before "see more")', 'Post length', 'Number of images']), correctAnswer: '1', explanation: 'The first 2 lines of a LinkedIn post are visible before users click "see more." A strong hook in these lines determines whether people read the rest of your post.', order: 2 },
    { question: 'Where should the primary keyword appear in an SEO-optimized article?', type: 'mcq', options: JSON.stringify(['Only in the title', 'Only in headings', 'In the title, first 100 words, headings, and meta description', 'Repeated as many times as possible throughout']), correctAnswer: '2', explanation: 'The primary keyword should appear naturally in the title, first 100 words, H2/H3 headings, and meta description. Natural placement matters more than frequency.', order: 3 },
    { question: 'What makes an effective Twitter/X thread?', type: 'mcq', options: JSON.stringify(['Very long tweets with complex language', 'Each tweet stands alone but connects to the thread, with a strong hook', 'Only text, no formatting or structure', 'Reposting the exact same blog content']), correctAnswer: '1', explanation: 'Effective threads have a strong hook in tweet 1, each subsequent tweet makes one clear point that stands alone but connects to the narrative, and the final tweet summarizes with a CTA.', order: 4 },
  ] } } })

  console.log('  ✅ Module 6: Content & Marketing (3 lessons)')

  // ============================================
  // MODULE 7: AI FOR DATA & ANALYTICS (PRO)
  // ============================================
  const module7 = await prisma.module.create({
    data: {
      courseId,
      title: 'AI for Data & Analytics',
      slug: 'ai-data-analytics',
      description: 'Turn raw data into actionable business insights with AI',
      order: 7,
      icon: '📈',
      tier: 'pro',
    },
  })

  const lesson7_1 = await prisma.lesson.create({
    data: {
      moduleId: module7.id,
      title: 'AI-Powered Data Analysis',
      slug: 'ai-powered-data-analysis',
      duration: 22,
      order: 1,
      content: `
<div class="lesson-content">
<h1>AI-Powered Data Analysis</h1>

<h2>What You'll Learn</h2>
<p>You don't need to be a data scientist to analyze data effectively. AI can interpret spreadsheets, find patterns, and create visualizations from plain English instructions.</p>

<h2>ChatGPT Code Interpreter: Your Data Analyst</h2>
<p>ChatGPT's Code Interpreter (Advanced Data Analysis) lets you upload CSV files, Excel spreadsheets, and more — then analyze them using natural language.</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
What you can do:
✅ Upload a spreadsheet and ask questions about it
✅ Create charts and visualizations
✅ Clean messy data automatically
✅ Run statistical analysis
✅ Find patterns and anomalies
✅ Generate reports from raw data
✅ Merge and transform datasets
</pre>

<h2>The Data Analysis Workflow</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Step 1: Upload → "Here's my sales data for Q1"
Step 2: Explore → "Summarize the key metrics"
Step 3: Analyze → "What trends do you see?"
Step 4: Visualize → "Create a chart showing monthly trends"
Step 5: Insight → "What should I do based on this data?"
</pre>

<h2>Essential Data Analysis Prompts</h2>

<h3>Quick Data Summary</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Analyze this dataset and provide:
1. Total rows and columns
2. Key statistics (mean, median, min, max) for numeric columns
3. Any missing data or anomalies
4. Top 5 insights you notice immediately
5. Suggested analyses to run next"
</pre>

<h3>Trend Analysis</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Analyze the trends in this data:
1. Is [metric] increasing, decreasing, or flat?
2. Are there seasonal patterns?
3. Are there any sudden changes? When and why might they occur?
4. Create a line chart showing the trend over time
5. Predict the next 3 months based on the trend"
</pre>

<h3>Customer Analysis</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Analyze this customer data:
1. Segment customers by [spending/frequency/recency]
2. Identify our top 20% customers (highest value)
3. Find patterns: what do our best customers have in common?
4. Identify at-risk customers (declining activity)
5. Suggest 3 actions to improve retention"
</pre>

<h2>Data Visualization with AI</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Visualization prompts that work:
• "Create a bar chart comparing [X] across [Y]"
• "Make a pie chart showing the distribution of [metric]"
• "Plot a scatter chart of [X] vs [Y] — is there correlation?"
• "Create a dashboard with 4 key metrics"
• "Show a heatmap of [metric] by [time] and [category]"
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>No coding needed</strong> — AI analyzes data from plain English</li>
<li><strong>Upload → Explore → Analyze → Visualize → Insight</strong></li>
<li><strong>ChatGPT Code Interpreter</strong> is the most accessible data analysis tool</li>
<li><strong>Always ask "so what?"</strong> — insights without actions are useless</li>
<li><strong>Verify surprising findings</strong> — AI can misinterpret data context</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 7.2 covers Business Intelligence with AI — building dashboards, tracking KPIs, and translating data into strategy.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson7_1.id, title: 'Data Analysis Quiz', passingScore: 70, questions: { create: [
    { question: 'What is ChatGPT Code Interpreter best used for?', type: 'mcq', options: JSON.stringify(['Only writing code', 'Analyzing uploaded data files using natural language', 'Replacing spreadsheet software entirely', 'Only creating charts']), correctAnswer: '1', explanation: 'Code Interpreter lets you upload CSV/Excel files and analyze them using plain English prompts — finding patterns, creating charts, running statistics, and generating insights.', order: 1 },
    { question: 'What is the final step in the data analysis workflow?', type: 'mcq', options: JSON.stringify(['Creating a chart', 'Uploading more data', 'Extracting actionable insights — what should you DO based on the data', 'Sharing the raw data']), correctAnswer: '2', explanation: 'The most important step is translating analysis into action. Data insights without clear "so what?" recommendations are useless. Always end with actionable next steps.', order: 2 },
    { question: 'When should you verify AI data analysis results?', type: 'mcq', options: JSON.stringify(['Never — AI is always accurate with data', 'Only when using free AI tools', 'When findings are surprising or will drive important decisions', 'Only when the dataset is very large']), correctAnswer: '2', explanation: 'AI can misinterpret data context or make calculation errors. Always verify surprising findings and any results that will drive important business decisions.', order: 3 },
    { question: 'What type of analysis helps identify your most valuable customers?', type: 'mcq', options: JSON.stringify(['Trend analysis only', 'Customer segmentation by spending, frequency, and recency', 'Simple averages', 'Counting total customers']), correctAnswer: '1', explanation: 'Segmenting customers by spending (how much), frequency (how often), and recency (how recently) — known as RFM analysis — reveals your most valuable customers and their patterns.', order: 4 },
  ] } } })

  const lesson7_2 = await prisma.lesson.create({
    data: { moduleId: module7.id, title: 'Business Intelligence with AI', slug: 'business-intelligence-ai', duration: 20, order: 2,
      content: `<div class="lesson-content"><h1>Business Intelligence with AI</h1><h2>What You'll Learn</h2><p>Transform raw business data into strategic intelligence — KPI tracking, trend analysis, and executive-ready reports.</p><h2>Building a KPI Dashboard with AI</h2><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">"Help me build a KPI dashboard for [business type].\n\n1. Recommend the top 10 KPIs I should track\n2. For each KPI: definition, formula, target range, frequency\n3. Create a dashboard layout with 4 primary and 6 secondary KPIs\n4. Suggest data sources for each KPI\n5. Define red/yellow/green thresholds"</pre><h2>AI-Powered Reporting</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">Weekly report prompt:\n"Analyze this week's data and create an executive summary:\n\nData: [paste or upload]\n\nInclude:\n1. Key metrics vs last week and vs target\n2. Top 3 wins this week\n3. Top 3 concerns or risks\n4. Recommended actions for next week\n5. One chart showing the most important trend\n\nKeep under 500 words. Use bullet points.\nHighlight any metric that's >10% off target."</pre><h2>Predictive Insights</h2><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">"Based on the last 12 months of data:\n1. Project next quarter's revenue with confidence range\n2. Identify seasonal patterns\n3. Flag any concerning trends\n4. Suggest 3 opportunities to improve performance\n\nClearly state assumptions and limitations."</pre><h2>Key Takeaways</h2><ol><li><strong>KPI dashboards</strong> keep you focused on what matters</li><li><strong>AI reports</strong> save hours of manual analysis weekly</li><li><strong>Predictive insights</strong> help you plan proactively</li><li><strong>Always state assumptions</strong> in AI-generated forecasts</li></ol><h2>Coming Up Next</h2><p>Lesson 7.3 covers AI for Financial Analysis — budgets, ROI calculations, and financial modeling.</p></div>`,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson7_2.id, title: 'Business Intelligence Quiz', passingScore: 70, questions: { create: [
    { question: 'What is the purpose of a KPI dashboard?', type: 'mcq', options: JSON.stringify(['To impress investors', 'To track the most important metrics and keep focus on what matters', 'To replace financial statements', 'To automate all business decisions']), correctAnswer: '1', explanation: 'A KPI dashboard tracks your most important business metrics in one place, helping you quickly identify what is working, what is not, and where to focus your attention.', order: 1 },
    { question: 'What should AI-generated forecasts always include?', type: 'mcq', options: JSON.stringify(['Only the best-case scenario', 'Assumptions and limitations of the prediction', 'Guarantees of accuracy', 'Recommendations to ignore the data']), correctAnswer: '1', explanation: 'AI forecasts should always clearly state the assumptions made and limitations of the prediction, so decision-makers understand the confidence level and potential for error.', order: 2 },
    { question: 'How often should you generate AI-powered business reports?', type: 'mcq', options: JSON.stringify(['Once a year', 'Weekly for operational metrics, monthly for strategic review', 'Only when problems arise', 'Daily for all metrics']), correctAnswer: '1', explanation: 'Weekly reports for operational metrics keep you agile, while monthly strategic reviews provide the longer view needed for bigger decisions and trend identification.', order: 3 },
    { question: 'What is the most important element of an executive summary report?', type: 'mcq', options: JSON.stringify(['Maximum detail and length', 'Actionable recommendations based on the data', 'Beautiful charts and graphics', 'Raw data tables']), correctAnswer: '1', explanation: 'Executive summaries must be action-oriented. The most valuable element is clear recommendations — what should we DO based on what the data shows?', order: 4 },
  ] } } })

  const lesson7_3 = await prisma.lesson.create({
    data: { moduleId: module7.id, title: 'AI for Financial Analysis', slug: 'ai-financial-analysis', duration: 20, order: 3,
      content: `<div class="lesson-content"><h1>AI for Financial Analysis</h1><h2>What You'll Learn</h2><p>Use AI for budget analysis, ROI calculations, financial modeling, and making better financial decisions.</p><h2>Budget Analysis with AI</h2><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">"Analyze this budget data:\n[paste budget]\n\n1. Compare actual vs budgeted for each category\n2. Identify top 3 categories that are over budget\n3. Find areas where we're under-spending (opportunity)\n4. Calculate overall budget variance\n5. Recommend reallocations to optimize spending\n\nPresent in a table with RAG (red/amber/green) status."</pre><h2>ROI Calculator</h2><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">"Calculate the ROI for this investment:\n\nInvestment: [amount and description]\nExpected returns: [what you expect to gain]\nTimeframe: [months/years]\nRisks: [potential downsides]\n\nProvide:\n1. Simple ROI percentage\n2. Payback period\n3. Net present value (assuming 8% discount rate)\n4. Best case / worst case / expected scenarios\n5. Break-even analysis\n6. Recommendation: invest or not?"</pre><h2>Financial Scenario Modeling</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">"Model these 3 scenarios for my business:\n\nScenario 1 (Conservative): Revenue grows 10%, costs up 5%\nScenario 2 (Base): Revenue grows 25%, costs up 15%\nScenario 3 (Optimistic): Revenue grows 50%, costs up 20%\n\nFor each, calculate:\n- Projected profit margin\n- Cash flow impact\n- Hiring capacity\n- Runway remaining\n\nCurrent financials: [paste key numbers]"</pre><h2>Important Disclaimer</h2><pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">AI financial analysis is for informational purposes only.\nAlways consult a qualified financial advisor for:\n• Investment decisions\n• Tax planning\n• Legal financial obligations\n• Major business financial decisions\n\nAI is a powerful analysis tool, not a financial advisor.</pre><h2>Key Takeaways</h2><ol><li><strong>AI excels at financial analysis</strong> — budgets, ROI, scenarios</li><li><strong>Always model multiple scenarios</strong> — optimistic, base, conservative</li><li><strong>Use RAG status</strong> for quick budget health checks</li><li><strong>Consult professionals</strong> for actual financial decisions</li><li><strong>AI provides analysis, you provide judgment</strong></li></ol><h2>Coming Up Next</h2><p>Module 8 covers building Custom AI Solutions — creating GPTs, understanding APIs, and designing AI-powered systems.</p></div>`,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson7_3.id, title: 'Financial Analysis Quiz', passingScore: 70, questions: { create: [
    { question: 'What does RAG status mean in budget analysis?', type: 'mcq', options: JSON.stringify(['Revenue, Assets, Growth', 'Red, Amber, Green — visual indicators of budget health', 'Return, Allocation, Gain', 'Risk-Adjusted Growth']), correctAnswer: '1', explanation: 'RAG (Red, Amber, Green) is a visual traffic-light system used to quickly show whether metrics are on target (green), at risk (amber), or off target (red).', order: 1 },
    { question: 'Why should you model multiple financial scenarios?', type: 'mcq', options: JSON.stringify(['To impress stakeholders with complexity', 'To prepare for different outcomes and make better-informed decisions', 'Because AI requires multiple inputs', 'To predict the exact future outcome']), correctAnswer: '1', explanation: 'Multiple scenarios (conservative, base, optimistic) help you prepare for different outcomes, understand the range of possibilities, and make decisions that are robust across scenarios.', order: 2 },
    { question: 'What should you always do with AI financial analysis?', type: 'mcq', options: JSON.stringify(['Accept it as professional financial advice', 'Use it as analysis input but consult qualified advisors for decisions', 'Share it publicly as your official forecast', 'Ignore it in favor of gut feeling']), correctAnswer: '1', explanation: 'AI financial analysis is for informational purposes. Always consult qualified financial advisors for investment decisions, tax planning, and major financial decisions.', order: 3 },
    { question: 'What makes break-even analysis valuable?', type: 'mcq', options: JSON.stringify(['It guarantees profitability', 'It shows the point where revenue equals costs, helping you understand minimum required performance', 'It is only useful for startups', 'It replaces all other financial analysis']), correctAnswer: '1', explanation: 'Break-even analysis shows the minimum revenue needed to cover costs. This helps you set realistic targets and understand the risk level of an investment.', order: 4 },
  ] } } })

  console.log('  ✅ Module 7: Data & Analytics (3 lessons)')

  // ============================================
  // MODULE 8: CUSTOM AI SOLUTIONS (PRO)
  // ============================================
  const module8 = await prisma.module.create({
    data: {
      courseId,
      title: 'AI Automation & Custom Solutions',
      slug: 'custom-ai-solutions',
      description: 'Build custom AI assistants, understand APIs, and design AI-powered systems',
      order: 8,
      icon: '💻',
      tier: 'pro',
    },
  })

  const lesson8_1 = await prisma.lesson.create({
    data: { moduleId: module8.id, title: 'Building Custom GPTs', slug: 'building-custom-gpts', duration: 22, order: 1,
      content: `<div class="lesson-content"><h1>Building Custom GPTs & AI Assistants</h1><h2>What You'll Learn</h2><p>Create specialized AI assistants tailored to your specific business needs — no coding required.</p><h2>What Are Custom GPTs?</h2><p>Custom GPTs are specialized versions of ChatGPT that you configure with specific instructions, knowledge, and capabilities. Think of them as trained assistants for specific roles.</p><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">Examples of custom GPTs:\n✅ Customer support agent trained on your product docs\n✅ Content writer pre-loaded with your brand voice\n✅ Sales assistant with your pricing and objection handling\n✅ Onboarding guide for new employees\n✅ Meeting prep assistant for your industry</pre><h2>Building Your First Custom GPT</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">Step 1: Go to chat.openai.com → Explore GPTs → Create\n\nStep 2: Define the purpose\n"You are a [role] that helps [audience] with [specific task].\nYou always [key behaviors].\nYou never [things to avoid]."\n\nStep 3: Upload knowledge files\n- Product documentation\n- Brand guidelines\n- FAQ documents\n- Process documents\n- Training materials\n\nStep 4: Configure capabilities\n- Web browsing (for real-time info)\n- Code interpreter (for data analysis)\n- DALL-E (for image generation)\n\nStep 5: Test and refine</pre><h2>Custom Instructions Template</h2><pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">"You are [Name], a [role] for [company/purpose].\n\nYour expertise: [specific domain knowledge]\nYour audience: [who will use this GPT]\nYour personality: [tone and communication style]\n\nRules:\n1. Always [key behavior]\n2. Never [thing to avoid]\n3. When uncertain, [what to do]\n4. Format responses as [preferred format]\n5. Include [required elements] in every response\n\nKnowledge base: Use the uploaded files as your primary\nsource. If information isn't in the files, say so rather\nthan guessing."</pre><h2>5 High-Value Custom GPTs to Build</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">1. Customer FAQ Bot\n   - Upload: All product docs, common questions, policies\n   - Purpose: Answer customer questions accurately\n   - Value: Save 10+ hours/week of support time\n\n2. Content Creator\n   - Upload: Brand voice guide, content examples, style rules\n   - Purpose: Draft content in your exact voice\n   - Value: 5x content output\n\n3. Sales Coach\n   - Upload: Sales playbook, objection handling, case studies\n   - Purpose: Help reps prepare for calls and handle objections\n   - Value: Higher close rates\n\n4. Onboarding Guide\n   - Upload: Employee handbook, process docs, org chart\n   - Purpose: Answer new hire questions 24/7\n   - Value: Faster ramp-up, less manager time\n\n5. Meeting Prep\n   - Upload: Industry data, competitor info, company metrics\n   - Purpose: Prepare briefings before important meetings\n   - Value: Better-prepared, more productive meetings</pre><h2>Key Takeaways</h2><ol><li><strong>Custom GPTs</strong> are specialized AI assistants for your needs</li><li><strong>No coding required</strong> — just instructions + knowledge files</li><li><strong>Upload your documents</strong> as the knowledge base</li><li><strong>Clear instructions</strong> = better, more consistent outputs</li><li><strong>Start with one high-value GPT</strong> and expand from there</li></ol><h2>Coming Up Next</h2><p>Lesson 8.2 demystifies APIs for non-developers — understanding how AI tools connect behind the scenes.</p></div>`,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson8_1.id, title: 'Custom GPTs Quiz', passingScore: 70, questions: { create: [
    { question: 'What is a Custom GPT?', type: 'mcq', options: JSON.stringify(['A new AI model you train from scratch', 'A specialized ChatGPT configured with specific instructions and knowledge', 'A paid upgrade to ChatGPT', 'A different AI company product']), correctAnswer: '1', explanation: 'Custom GPTs are specialized versions of ChatGPT configured with specific instructions, uploaded knowledge files, and selected capabilities — no coding or model training required.', order: 1 },
    { question: 'What makes custom GPTs respond accurately about your business?', type: 'mcq', options: JSON.stringify(['They automatically learn from the internet', 'You upload your documents as a knowledge base', 'They have access to your company database', 'They record your conversations for training']), correctAnswer: '1', explanation: 'Custom GPTs use uploaded documents (product docs, FAQs, brand guides, etc.) as their knowledge base, enabling them to respond accurately about your specific business.', order: 2 },
    { question: 'Which custom GPT would save the most support team time?', type: 'mcq', options: JSON.stringify(['Content creator GPT', 'Customer FAQ Bot with product documentation', 'Meeting prep GPT', 'Sales coach GPT']), correctAnswer: '1', explanation: 'A Customer FAQ Bot trained on product documentation can handle common customer questions 24/7, potentially saving 10+ hours per week of support team time.', order: 3 },
    { question: 'What should a custom GPT do when it does not know the answer?', type: 'mcq', options: JSON.stringify(['Make up a plausible answer', 'Search the internet for the answer', 'Acknowledge it does not know rather than guessing', 'End the conversation']), correctAnswer: '2', explanation: 'Custom GPTs should be instructed to acknowledge when information is not in their knowledge base rather than guessing. This prevents misinformation and builds trust.', order: 4 },
  ] } } })

  const lesson8_2 = await prisma.lesson.create({
    data: { moduleId: module8.id, title: 'API Basics for Non-Developers', slug: 'api-basics-non-developers', duration: 18, order: 2,
      content: `<div class="lesson-content"><h1>API Basics for Non-Developers</h1><h2>What You'll Learn</h2><p>Understand what APIs are and how they power AI integrations — even if you never write a line of code.</p><h2>What Is an API?</h2><p>Think of an API like a restaurant waiter:</p><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">You (the customer) → Place your order\nWaiter (the API) → Takes your order to the kitchen\nKitchen (the AI service) → Prepares your food\nWaiter (the API) → Brings the result back to you\n\nYou don't need to know how to cook.\nYou just need to know how to order.</pre><h2>Why APIs Matter for AI</h2><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">With the ChatGPT website: You type, get answers, manually copy.\n\nWith the ChatGPT API: Your apps, spreadsheets, and workflows\ncan automatically send prompts and receive answers —\nno human typing required.\n\nThis is how automation tools like Zapier and Make.com work.\nThey use APIs behind the scenes.</pre><h2>Key API Concepts</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">API Key: Your unique password to access the service\n(Keep it secret — like a credit card number)\n\nEndpoint: The specific URL you send requests to\n(Like dialing a specific extension at a company)\n\nRequest: What you send (your prompt + settings)\nResponse: What you get back (AI's answer)\n\nRate Limit: How many requests you can make per minute\n(Prevents overuse)\n\nTokens: How usage is measured and billed</pre><h2>API Pricing vs Subscription</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">ChatGPT Plus: $20/month, unlimited chat (with some limits)\nChatGPT API: Pay per token used\n\nFor personal use: Subscription is usually better\nFor automation: API is necessary and often cheaper at scale\n\nExample cost:\n1000 automated customer responses/month via API ≈ $5-15\n(Much cheaper than hiring someone to do it manually)</pre><h2>Using APIs Without Code</h2><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">Tools that let you use APIs without coding:\n\n1. Zapier — Connect 5000+ apps with AI\n2. Make.com — More advanced workflows, visual builder\n3. Postman — Test API calls with a visual interface\n4. Google Sheets + Apps Script — AI in your spreadsheets\n5. Airtable Automations — AI-powered database workflows</pre><h2>Key Takeaways</h2><ol><li><strong>APIs are the glue</strong> connecting AI to your other tools</li><li><strong>You don't need to code</strong> — no-code tools handle the technical parts</li><li><strong>API pricing is per-use</strong> — often cheaper than subscriptions for automation</li><li><strong>Keep API keys secret</strong> — treat them like passwords</li><li><strong>Understanding APIs</strong> unlocks the full power of AI automation</li></ol><h2>Coming Up Next</h2><p>Lesson 8.3 covers AI Workflow Architecture — designing end-to-end AI systems for your business.</p></div>`,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson8_2.id, title: 'API Basics Quiz', passingScore: 70, questions: { create: [
    { question: 'What is the best analogy for an API?', type: 'mcq', options: JSON.stringify(['A cookbook with recipes', 'A waiter taking your order to the kitchen and bringing back results', 'A map showing directions', 'A phone book of contacts']), correctAnswer: '1', explanation: 'An API is like a waiter: you (the app) place an order (request), the waiter (API) takes it to the kitchen (AI service), and brings back the result (response). You don\'t need to know how the kitchen works.', order: 1 },
    { question: 'How should you treat your API key?', type: 'mcq', options: JSON.stringify(['Share it freely so others can use your account', 'Keep it secret like a credit card number', 'Post it on your website for easy access', 'Change it every hour for security']), correctAnswer: '1', explanation: 'API keys are like passwords or credit card numbers — they authenticate your account and usage is billed to you. Never share them publicly or include them in visible code.', order: 2 },
    { question: 'When is API pricing cheaper than a subscription?', type: 'mcq', options: JSON.stringify(['For personal casual use', 'For high-volume automated tasks at scale', 'It is never cheaper', 'For one-off questions']), correctAnswer: '1', explanation: 'API pay-per-use pricing is often cheaper than subscriptions for automated workflows processing many requests, especially when each request is small and focused.', order: 3 },
    { question: 'How can non-developers use APIs?', type: 'mcq', options: JSON.stringify(['They cannot — APIs require coding', 'Through no-code tools like Zapier and Make.com', 'By hiring a developer for every task', 'Only through ChatGPT Plus subscription']), correctAnswer: '1', explanation: 'No-code platforms like Zapier, Make.com, and Airtable handle the technical API connection behind the scenes, letting non-developers build powerful AI automations.', order: 4 },
  ] } } })

  const lesson8_3 = await prisma.lesson.create({
    data: { moduleId: module8.id, title: 'AI Workflow Architecture', slug: 'ai-workflow-architecture', duration: 20, order: 3,
      content: `<div class="lesson-content"><h1>AI Workflow Architecture</h1><h2>What You'll Learn</h2><p>Design end-to-end AI-powered business processes — choosing the right tools, building resilient systems, and planning for scale.</p><h2>The Architecture Framework</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">Every AI workflow has 4 layers:\n\n1. Input Layer — Where data/triggers come from\n   (Email, forms, databases, schedules, webhooks)\n\n2. Processing Layer — Where AI does the work\n   (ChatGPT API, Claude API, custom GPTs)\n\n3. Logic Layer — Where decisions are made\n   (If/then rules, routing, error handling)\n\n4. Output Layer — Where results go\n   (Email, Slack, CRM, database, documents)</pre><h2>Designing Resilient Systems</h2><pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">Things that can go wrong:\n• AI returns unexpected format → Add validation\n• API rate limit hit → Add retry with delay\n• AI hallucinates in automated output → Add human review\n• Service goes down → Add fallback/notification\n• Costs spike unexpectedly → Set budget alerts</pre><pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">Design principles:\n✅ Always have error handling at each step\n✅ Log everything for debugging\n✅ Set cost alerts and usage limits\n✅ Add human review for customer-facing outputs\n✅ Build fallbacks for when AI is unavailable\n✅ Start small, scale gradually\n✅ Monitor output quality over time</pre><h2>End-to-End Example: Customer Onboarding</h2><pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">Trigger: New customer signs up\n\n→ Step 1: Pull customer data from CRM\n→ Step 2: AI generates personalized welcome email\n→ Step 3: AI creates customized onboarding checklist\n→ Step 4: Schedule automated check-in emails (days 3, 7, 14)\n→ Step 5: AI monitors engagement signals\n→ Step 6: If low engagement → alert success team\n→ Step 7: If high engagement → trigger upsell sequence\n\nResult: Personalized onboarding at scale with zero manual work</pre><h2>Choosing the Right Tool for Each Layer</h2><pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">Input: Zapier triggers, webhooks, scheduled tasks\nProcessing: ChatGPT API (versatile), Claude API (precise)\nLogic: Zapier Paths, Make.com routers, custom rules\nOutput: Email (SendGrid), Slack, CRM (HubSpot), Google Sheets</pre><h2>Key Takeaways</h2><ol><li><strong>4 layers:</strong> Input → Processing → Logic → Output</li><li><strong>Error handling is essential</strong> — things will go wrong</li><li><strong>Human review</strong> for customer-facing automated content</li><li><strong>Start small, scale gradually</strong> — prove value before expanding</li><li><strong>Monitor costs and quality</strong> continuously</li></ol><h2>Coming Up Next</h2><p>Congratulations on completing the Pro tier! Module 9 enters the Master tier with AI Strategy & Leadership — building AI transformation roadmaps for organizations.</p></div>`,
    },
  })

  await prisma.quiz.create({ data: { lessonId: lesson8_3.id, title: 'Workflow Architecture Quiz', passingScore: 70, questions: { create: [
    { question: 'What are the 4 layers of AI workflow architecture?', type: 'mcq', options: JSON.stringify(['Plan, Build, Test, Deploy', 'Input, Processing, Logic, Output', 'Data, Model, Training, Inference', 'Frontend, Backend, Database, API']), correctAnswer: '1', explanation: 'The 4 layers are: Input (triggers/data sources), Processing (AI does the work), Logic (decisions and routing), and Output (where results are delivered).', order: 1 },
    { question: 'What should you do when an AI workflow produces customer-facing content?', type: 'mcq', options: JSON.stringify(['Send it immediately for speed', 'Add a human review step before delivery', 'Add more AI processing steps for quality', 'Skip review if the AI model is advanced enough']), correctAnswer: '1', explanation: 'Customer-facing automated content should always include a human review step. AI can produce unexpected or inappropriate outputs that need human judgment before reaching customers.', order: 2 },
    { question: 'What is the recommended approach to building AI workflows?', type: 'mcq', options: JSON.stringify(['Build the complete system at once', 'Start small, prove value, then scale gradually', 'Wait until AI technology is more mature', 'Only use pre-built solutions']), correctAnswer: '1', explanation: 'Starting small and scaling gradually lets you prove value, identify issues, and build confidence before investing in larger, more complex AI systems.', order: 3 },
    { question: 'What should you set up to prevent unexpected AI costs?', type: 'mcq', options: JSON.stringify(['Nothing — AI costs are always predictable', 'Budget alerts and usage limits', 'Only use free AI tools', 'Limit AI to one request per day']), correctAnswer: '1', explanation: 'Setting budget alerts and usage limits prevents cost spikes from bugs, loops, or unexpected high usage in automated AI workflows. Always monitor costs actively.', order: 4 },
  ] } } })

  console.log('  ✅ Module 8: Custom AI Solutions (3 lessons)')
}

module.exports = { seedModules5to8 }
