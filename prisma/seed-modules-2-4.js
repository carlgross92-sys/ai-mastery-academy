async function seedModules2to4(prisma, courseId) {
  // ============================================
  // MODULE 2: AI TOOL LANDSCAPE (FREE)
  // ============================================
  const module2 = await prisma.module.create({
    data: {
      courseId,
      title: 'AI Tool Landscape & Strategic Selection',
      slug: 'ai-tool-landscape',
      description: 'Navigate the AI ecosystem — know which tool to use for every task',
      order: 2,
      icon: '🗺️',
      tier: 'free',
    },
  })

  const lesson2_1 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: 'ChatGPT vs Claude vs Gemini',
      slug: 'chatgpt-vs-claude-vs-gemini',
      duration: 20,
      order: 1,
      content: `
<div class="lesson-content">
<h1>ChatGPT vs Claude vs Gemini: The Practical Guide</h1>

<h2>What You'll Learn</h2>
<p>By the end of this lesson, you'll know exactly which AI tool to reach for in any situation — saving you time and getting better results.</p>

<h2>The Big Three: Overview</h2>

<p>Think of the three major AI platforms like different types of vehicles. Each can get you where you need to go, but some are better suited for certain journeys.</p>

<h3>ChatGPT (by OpenAI)</h3>
<p><strong>Model:</strong> GPT-4o (flagship), GPT-4o mini (budget)</p>
<p><strong>Context Window:</strong> 128K tokens (~96,000 words)</p>
<p><strong>Best For:</strong> General tasks, creative writing, code generation, image creation (DALL-E built in)</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Strengths:
✅ Largest ecosystem — plugins, GPT Store, DALL-E integration
✅ Best for creative and conversational tasks
✅ Code Interpreter can run Python, analyze data, create charts
✅ Most widely known — easiest to find tutorials and templates
✅ Voice mode for hands-free interaction
</pre>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
Limitations:
❌ Can be overly verbose — "as an AI language model..."
❌ Tends to be more agreeable (less pushback on bad ideas)
❌ Image generation can be inconsistent
❌ Rate limits on GPT-4o can be frustrating on free tier
</pre>

<h3>Claude (by Anthropic)</h3>
<p><strong>Model:</strong> Claude 3.5 Sonnet (fast + smart), Claude 3 Opus (highest quality)</p>
<p><strong>Context Window:</strong> 200K tokens (~150,000 words)</p>
<p><strong>Best For:</strong> Long document analysis, nuanced writing, coding, research</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Strengths:
✅ Largest standard context window (200K tokens)
✅ Excels at nuanced, balanced analysis
✅ Better at following complex instructions precisely
✅ More honest about uncertainty — less hallucination
✅ Artifacts feature for code, documents, and visualizations
</pre>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
Limitations:
❌ No built-in image generation
❌ Smaller plugin/integration ecosystem
❌ Can be overly cautious on some topics
❌ No native code execution (unlike ChatGPT's Code Interpreter)
</pre>

<h3>Gemini (by Google)</h3>
<p><strong>Model:</strong> Gemini 1.5 Pro (flagship)</p>
<p><strong>Context Window:</strong> 1M tokens (~750,000 words) — largest available</p>
<p><strong>Best For:</strong> Massive documents, multimodal tasks, Google Workspace integration</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Strengths:
✅ Massive 1M token context — can process entire books
✅ Deep Google integration (Docs, Sheets, Gmail, Search)
✅ Strong multimodal capabilities (text, image, video, audio)
✅ Free tier is generous
✅ Real-time web search built in
</pre>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
Limitations:
❌ Output quality can lag behind GPT-4o and Claude on complex reasoning
❌ Less predictable formatting
❌ Fewer third-party integrations
❌ Can be overly reliant on Google search results
</pre>

<h2>Head-to-Head: Which to Use When</h2>

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
<thead>
<tr style="background: rgba(59,130,246,0.1); border-bottom: 2px solid rgba(59,130,246,0.3);">
<th style="padding: 12px; text-align: left;">Task</th>
<th style="padding: 12px; text-align: left;">Best Choice</th>
<th style="padding: 12px; text-align: left;">Why</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Writing blog posts</td><td style="padding: 12px;">ChatGPT or Claude</td><td style="padding: 12px;">Both excel at creative writing</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Analyzing a 100-page report</td><td style="padding: 12px;">Claude</td><td style="padding: 12px;">200K context, best at long docs</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Analyzing an entire book</td><td style="padding: 12px;">Gemini</td><td style="padding: 12px;">1M context handles full books</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Data analysis with charts</td><td style="padding: 12px;">ChatGPT</td><td style="padding: 12px;">Code Interpreter runs Python</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Coding/debugging</td><td style="padding: 12px;">Claude</td><td style="padding: 12px;">Most precise instruction following</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Image generation</td><td style="padding: 12px;">ChatGPT (DALL-E)</td><td style="padding: 12px;">Built-in, no extra tools needed</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Research with sources</td><td style="padding: 12px;">Gemini</td><td style="padding: 12px;">Built-in Google search</td></tr>
<tr><td style="padding: 12px;">Email/document drafting</td><td style="padding: 12px;">Gemini</td><td style="padding: 12px;">Google Workspace integration</td></tr>
</tbody>
</table>

<h2>Pricing Comparison</h2>

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
<thead>
<tr style="background: rgba(59,130,246,0.1); border-bottom: 2px solid rgba(59,130,246,0.3);">
<th style="padding: 12px; text-align: left;">Plan</th>
<th style="padding: 12px; text-align: left;">ChatGPT</th>
<th style="padding: 12px; text-align: left;">Claude</th>
<th style="padding: 12px; text-align: left;">Gemini</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Free</td><td style="padding: 12px;">GPT-4o mini (limited GPT-4o)</td><td style="padding: 12px;">Claude 3.5 Sonnet (limited)</td><td style="padding: 12px;">Gemini 1.5 Flash</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Paid</td><td style="padding: 12px;">$20/mo (Plus)</td><td style="padding: 12px;">$20/mo (Pro)</td><td style="padding: 12px;">$20/mo (Advanced)</td></tr>
<tr><td style="padding: 12px;">Best Paid Feature</td><td style="padding: 12px;">DALL-E, Code Interpreter</td><td style="padding: 12px;">More usage, Opus access</td><td style="padding: 12px;">1M context, Workspace</td></tr>
</tbody>
</table>

<h2>The Power User Strategy</h2>

<p>The smartest professionals don't pick one tool — they use all three strategically:</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Morning routine:
1. Use Gemini to scan overnight emails and news (Google integration)
2. Use ChatGPT to draft creative content (blog posts, social media)
3. Use Claude to review and refine important documents (precision)

The cost: $0/month (free tiers) to $60/month (all three paid)
The time saved: 15-20 hours per week
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>No single AI is "best"</strong> — Each excels in different areas</li>
<li><strong>ChatGPT</strong> — Best ecosystem, creative tasks, image generation</li>
<li><strong>Claude</strong> — Best for long documents, precise instructions, coding</li>
<li><strong>Gemini</strong> — Best for massive context, Google integration, research</li>
<li><strong>Power users combine all three</strong> for maximum productivity</li>
<li><strong>Start with free tiers</strong> — upgrade only when you hit limits</li>
</ol>

<h2>Coming Up Next</h2>
<p>In Lesson 2.2, we'll explore specialized AI tools beyond the big three — Midjourney for images, ElevenLabs for voice, GitHub Copilot for code, and more.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson2_1.id,
      title: 'ChatGPT vs Claude vs Gemini Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'Which AI platform has the largest context window?',
            type: 'mcq',
            options: JSON.stringify(['ChatGPT (GPT-4o)', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'They are all the same']),
            correctAnswer: '2',
            explanation: 'Gemini 1.5 Pro has a 1 million token context window, the largest among the big three. Claude offers 200K and GPT-4o offers 128K.',
            order: 1,
          },
          {
            question: 'For analyzing a 100-page business report, which tool would be most suitable?',
            type: 'mcq',
            options: JSON.stringify(['ChatGPT for its creativity', 'Claude for its long document handling', 'Gemini for its search integration', 'Any tool — they all handle it equally']),
            correctAnswer: '1',
            explanation: 'Claude excels at long document analysis with its 200K context window and precise instruction following. While Gemini has a larger context, Claude typically provides more nuanced analysis.',
            order: 2,
          },
          {
            question: 'Which platform has built-in image generation?',
            type: 'mcq',
            options: JSON.stringify(['Claude (via Artifacts)', 'Gemini (via Imagen)', 'ChatGPT (via DALL-E)', 'All three have built-in image generation']),
            correctAnswer: '2',
            explanation: 'ChatGPT has DALL-E built directly into the conversation interface. Claude does not generate images. Gemini has some image capabilities but DALL-E in ChatGPT is the most mature.',
            order: 3,
          },
          {
            question: 'What is the recommended strategy for power users?',
            type: 'mcq',
            options: JSON.stringify(['Pick the cheapest and stick with it', 'Only use ChatGPT since it is most popular', 'Use all three strategically based on task type', 'Wait for one clear winner to emerge']),
            correctAnswer: '2',
            explanation: 'Power users leverage all three platforms based on their strengths: ChatGPT for creative tasks and images, Claude for documents and precision, and Gemini for research and Google integration.',
            order: 4,
          },
        ],
      },
    },
  })

  const lesson2_2 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: 'Specialized AI Tools',
      slug: 'specialized-ai-tools',
      duration: 18,
      order: 2,
      content: `
<div class="lesson-content">
<h1>Specialized AI Tools: Beyond the Big Three</h1>

<h2>What You'll Learn</h2>
<p>The big three chat models are just the beginning. There's an entire ecosystem of specialized AI tools that can 10x specific tasks. Let's explore the most impactful ones.</p>

<h2>Image Generation: Midjourney & DALL-E</h2>

<h3>Midjourney</h3>
<p><strong>What it does:</strong> Creates stunning, artistic images from text descriptions</p>
<p><strong>Where to use it:</strong> Discord (Midjourney bot)</p>
<p><strong>Cost:</strong> $10-60/month depending on plan</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Best for:
✅ Marketing visuals and social media graphics
✅ Product concept art
✅ Brand imagery and backgrounds
✅ Artistic and creative visuals
✅ Photorealistic scenes

Example prompt:
"/imagine professional headshot of a confident businesswoman
in a modern office, warm lighting, shallow depth of field,
corporate photography style --ar 1:1 --v 6"
</pre>

<h3>DALL-E 3 (via ChatGPT)</h3>
<p><strong>What it does:</strong> Generates images directly within ChatGPT conversations</p>
<p><strong>Best for:</strong> Quick visuals, iterative design, text in images</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Midjourney vs DALL-E Quick Guide:
• Need artistic quality? → Midjourney
• Need it fast and integrated? → DALL-E
• Need text in the image? → DALL-E (much better at text)
• Need photorealistic? → Midjourney v6
• Need to iterate in conversation? → DALL-E
</pre>

<h2>AI Voice: ElevenLabs</h2>
<p><strong>What it does:</strong> Creates incredibly realistic AI voices from text</p>
<p><strong>Cost:</strong> Free tier available, $5-99/month for more</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Use cases:
✅ Voiceovers for videos and presentations
✅ Podcast content creation
✅ Audiobook narration
✅ Voice cloning (with consent) for consistent branding
✅ Multilingual content — same voice in 29 languages
</pre>

<p><em>Fun fact: The voice reading this lesson to you is powered by ElevenLabs!</em></p>

<h2>AI Video: Runway & Sora</h2>
<p><strong>Runway ML:</strong> Text-to-video, image-to-video, video editing</p>
<p><strong>OpenAI Sora:</strong> Advanced text-to-video (integrated into ChatGPT)</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Current state of AI video (2025):
• Short clips (5-15 seconds) work well
• Great for social media content
• B-roll and background footage
• Product demonstrations
• NOT ready for: Full movies, complex narratives, precise actions
</pre>

<h2>AI Code: GitHub Copilot</h2>
<p><strong>What it does:</strong> AI-powered code completion and generation inside your code editor</p>
<p><strong>Cost:</strong> $10/month (individual), free for students</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Why developers love it:
✅ Autocompletes entire functions as you type
✅ Generates code from comments
✅ Explains existing code
✅ Writes tests automatically
✅ Supports every major programming language

Productivity boost: 30-55% faster coding (GitHub's own research)
</pre>

<h2>AI Research: Perplexity</h2>
<p><strong>What it does:</strong> AI-powered research engine with cited sources</p>
<p><strong>Cost:</strong> Free tier, $20/month for Pro</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Why it's different from regular AI chat:
✅ Always cites sources — you can verify claims
✅ Real-time web search built in
✅ Academic paper search
✅ Reduces hallucination risk significantly
✅ Great for fact-checking other AI outputs
</pre>

<h2>The AI Tool Decision Framework</h2>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Ask yourself:
1. What type of output do I need? (text/image/video/voice/code)
2. How important is accuracy? (creative vs factual)
3. What's my budget? (free vs paid)
4. Do I need integration with existing tools?
5. How often will I use it? (one-off vs daily)

If text → ChatGPT/Claude/Gemini
If image → Midjourney or DALL-E
If voice → ElevenLabs
If video → Runway or Sora
If code → GitHub Copilot
If research → Perplexity
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Specialized tools beat general tools</strong> for specific tasks</li>
<li><strong>Midjourney</strong> for stunning visuals, DALL-E for quick/integrated images</li>
<li><strong>ElevenLabs</strong> creates voices indistinguishable from humans</li>
<li><strong>GitHub Copilot</strong> makes developers 30-55% faster</li>
<li><strong>Perplexity</strong> solves the hallucination problem with cited sources</li>
<li><strong>Start with free tiers</strong> — upgrade when you know what you need</li>
</ol>

<h2>Coming Up Next</h2>
<p>In Lesson 2.3, we'll build your personal AI stack — choosing the right combination of tools based on your role and goals, with cost optimization strategies.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson2_2.id,
      title: 'Specialized AI Tools Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'Which tool is best for creating photorealistic marketing images?',
            type: 'mcq',
            options: JSON.stringify(['ChatGPT', 'Midjourney', 'ElevenLabs', 'Perplexity']),
            correctAnswer: '1',
            explanation: 'Midjourney v6 excels at photorealistic image generation and is the preferred tool for marketing visuals and artistic imagery.',
            order: 1,
          },
          {
            question: 'What makes Perplexity different from ChatGPT for research?',
            type: 'mcq',
            options: JSON.stringify(['It is faster', 'It always cites sources you can verify', 'It has a larger context window', 'It is completely free']),
            correctAnswer: '1',
            explanation: 'Perplexity always provides cited sources for its claims, allowing you to verify information. This significantly reduces the risk of hallucinated facts.',
            order: 2,
          },
          {
            question: 'According to GitHub research, how much faster does Copilot make developers?',
            type: 'mcq',
            options: JSON.stringify(['5-10% faster', '15-20% faster', '30-55% faster', '80-100% faster']),
            correctAnswer: '2',
            explanation: 'GitHub\'s own research shows that developers using Copilot are 30-55% faster at completing coding tasks.',
            order: 3,
          },
          {
            question: 'Which tool would you use to create a professional voiceover for a video?',
            type: 'mcq',
            options: JSON.stringify(['Midjourney', 'GitHub Copilot', 'ElevenLabs', 'Runway ML']),
            correctAnswer: '2',
            explanation: 'ElevenLabs specializes in text-to-speech with incredibly realistic voices, making it the go-to tool for voiceovers, podcasts, and audiobooks.',
            order: 4,
          },
        ],
      },
    },
  })

  const lesson2_3 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: 'Building Your AI Stack',
      slug: 'building-your-ai-stack',
      duration: 15,
      order: 3,
      content: `
<div class="lesson-content">
<h1>Building Your Personal AI Stack</h1>

<h2>What You'll Learn</h2>
<p>By the end of this lesson, you'll have a customized AI toolkit matched to your role, budget, and goals.</p>

<h2>What Is an "AI Stack"?</h2>
<p>Your AI stack is the specific combination of AI tools you use daily. Just like developers have a tech stack, every professional should have an AI stack.</p>

<h2>Stack by Role</h2>

<h3>The Marketer's Stack</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Essential (Free):
• ChatGPT — Content drafts, social posts, ad copy
• Canva AI — Quick graphics and designs

Growth ($40/mo):
• ChatGPT Plus — Better outputs, DALL-E images
• Jasper or Copy.ai — Specialized marketing copy

Pro ($100/mo):
• Add Midjourney — Premium marketing visuals
• Add ElevenLabs — Video voiceovers
• Add Perplexity Pro — Market research with sources

ROI: 10-20 hours saved per week = $500-1000+ value
</pre>

<h3>The Business Owner's Stack</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Essential (Free):
• Claude — Business analysis, strategy documents
• Gemini — Email management, Google Workspace

Growth ($40/mo):
• Claude Pro — Longer documents, more usage
• ChatGPT Plus — Versatile assistant

Pro ($80/mo):
• Add Perplexity Pro — Competitive research
• Add ElevenLabs — Presentation voiceovers

ROI: Better decisions + time savings = 10-50x return
</pre>

<h3>The Writer/Creator's Stack</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Essential (Free):
• Claude — Long-form writing, editing, brainstorming
• ChatGPT — Creative ideation, quick drafts

Growth ($40/mo):
• Claude Pro — Handle full manuscripts
• Midjourney — Article images, cover art

Pro ($100/mo):
• Add ElevenLabs — Audiobook narration
• Add Runway — Video content creation

ROI: 2-3x content output at same or better quality
</pre>

<h2>The Cost Optimization Framework</h2>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Rule 1: Start free, upgrade with data
• Use free tiers for 2 weeks before paying
• Track which tools you actually use daily
• Only pay for tools that save you 5+ hours/month

Rule 2: Avoid tool overlap
• Don't pay for both ChatGPT Plus AND Claude Pro
  unless you truly use both daily
• Pick one main chat AI, one specialized tool

Rule 3: Calculate your ROI
• Your hourly rate × hours saved = tool value
• If tool costs $20/mo and saves 10 hours at $50/hr
  → $500 value for $20 = 25x ROI
</pre>

<h2>Your Action Plan</h2>
<ol>
<li><strong>This week:</strong> Sign up for free tiers of ChatGPT, Claude, and Gemini</li>
<li><strong>Next 2 weeks:</strong> Use all three for your daily tasks, note which you prefer</li>
<li><strong>Week 3:</strong> Add one specialized tool (Midjourney, ElevenLabs, or Perplexity)</li>
<li><strong>Month 2:</strong> Upgrade your most-used tool to paid tier</li>
<li><strong>Ongoing:</strong> Re-evaluate monthly — tools evolve fast</li>
</ol>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Build your stack around your role</strong> — not every tool is for everyone</li>
<li><strong>Start free, upgrade with data</strong> — track what you actually use</li>
<li><strong>Calculate ROI</strong> — if a tool saves more than it costs, it's worth it</li>
<li><strong>Avoid overlap</strong> — pick one main chat AI plus specialized tools</li>
<li><strong>Re-evaluate monthly</strong> — the AI landscape changes fast</li>
</ol>

<h2>Coming Up Next</h2>
<p>In Module 3, we dive deep into Prompt Engineering Mastery — the single most important skill for getting incredible results from any AI tool.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson2_3.id,
      title: 'Building Your AI Stack Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'What is the recommended first step when building your AI stack?',
            type: 'mcq',
            options: JSON.stringify(['Pay for the most expensive tools immediately', 'Start with free tiers and track what you actually use', 'Only use one tool for everything', 'Wait until AI tools are more mature']),
            correctAnswer: '1',
            explanation: 'The recommended approach is to start with free tiers for 2 weeks, track which tools you actually use daily, and then upgrade only the tools that save you significant time.',
            order: 1,
          },
          {
            question: 'How should you calculate whether a paid AI tool is worth it?',
            type: 'mcq',
            options: JSON.stringify(['Compare it to the most expensive alternative', 'Check if your competitors use it', 'Calculate hours saved × your hourly rate vs tool cost', 'Always go with the cheapest option']),
            correctAnswer: '2',
            explanation: 'ROI calculation: Your hourly rate × hours saved per month. If a $20/month tool saves 10 hours at $50/hr, that is $500 in value — a 25x return.',
            order: 2,
          },
          {
            question: 'Which combination would best serve a content marketer on a $40/month budget?',
            type: 'mcq',
            options: JSON.stringify(['GitHub Copilot + Runway', 'ChatGPT Plus + Canva AI', 'Claude Pro + GitHub Copilot', 'Midjourney + ElevenLabs']),
            correctAnswer: '1',
            explanation: 'A content marketer benefits most from ChatGPT Plus (content drafts, DALL-E images, versatile assistant) combined with Canva AI for quick graphic design.',
            order: 3,
          },
          {
            question: 'How often should you re-evaluate your AI tool stack?',
            type: 'mcq',
            options: JSON.stringify(['Once when you set it up', 'Every year', 'Monthly — the AI landscape changes fast', 'Only when a tool stops working']),
            correctAnswer: '2',
            explanation: 'The AI landscape evolves rapidly. Monthly re-evaluation ensures you are using the best available tools and not paying for tools you have outgrown or that have been surpassed.',
            order: 4,
          },
        ],
      },
    },
  })

  console.log('  ✅ Module 2: AI Tool Landscape (3 lessons)')

  // ============================================
  // MODULE 3: PROMPT ENGINEERING MASTERY (STARTER)
  // ============================================
  const module3 = await prisma.module.create({
    data: {
      courseId,
      title: 'Prompt Engineering Mastery',
      slug: 'prompt-engineering-mastery',
      description: 'The #1 skill for getting incredible results from any AI tool',
      order: 3,
      icon: '🎯',
      tier: 'starter',
    },
  })

  const lesson3_1 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: 'The Anatomy of a Perfect Prompt',
      slug: 'anatomy-perfect-prompt',
      duration: 22,
      order: 1,
      content: `
<div class="lesson-content">
<h1>The Anatomy of a Perfect Prompt</h1>

<h2>What You'll Learn</h2>
<p>Prompt engineering is the single most impactful AI skill. The difference between a vague prompt and a well-engineered one can be the difference between useless output and genuinely impressive results.</p>

<h2>The CRAFT Framework</h2>
<p>We've developed the CRAFT framework to make prompt engineering simple and repeatable:</p>

<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
C — Context: Background information and situation
R — Role: Who should the AI act as?
A — Action: What specifically should the AI do?
F — Format: How should the output be structured?
T — Tone: What style or voice should be used?
</pre>

<h3>C — Context</h3>
<p>Context is the foundation of your prompt. Without it, AI is guessing.</p>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
❌ Bad: "Write a marketing email"
(What product? What audience? What goal?)
</pre>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
✅ Good: "I run a SaaS startup that helps restaurants manage
online orders. We just launched a new feature that lets
restaurants create custom loyalty programs. Our target audience
is restaurant owners with 1-5 locations."
</pre>

<h3>R — Role</h3>
<p>Assigning a role activates different pattern sets in the AI's training data.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Powerful roles to try:
• "Act as a senior marketing strategist at a Fortune 500 company"
• "You are a patent attorney reviewing this for legal issues"
• "Respond as a data scientist explaining to a non-technical CEO"
• "Act as a professional copywriter who specializes in B2B SaaS"
</pre>

<h3>A — Action</h3>
<p>Be specific about what you want. Vague actions produce vague results.</p>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
❌ Vague: "Help me with this email"
</pre>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
✅ Specific: "Write a 150-word email announcing our new loyalty
feature. Include 3 specific benefits, one customer success
example, and a clear call-to-action to schedule a demo."
</pre>

<h3>F — Format</h3>
<p>Tell AI exactly how to structure the output.</p>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Format options:
• "Respond in bullet points"
• "Create a table with columns for X, Y, Z"
• "Write in paragraphs of 2-3 sentences each"
• "Use the format: [Problem] → [Solution] → [Result]"
• "Provide your answer as a numbered step-by-step guide"
• "Structure as: Executive Summary, Key Findings, Recommendations"
</pre>

<h3>T — Tone</h3>
<p>Tone controls the voice and feel of the output.</p>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Tone spectrum:
• Formal ← → Casual
• Technical ← → Simple
• Serious ← → Playful
• Authoritative ← → Friendly
• Concise ← → Detailed

Example: "Write in a conversational but professional tone,
as if explaining to a smart colleague over coffee."
</pre>

<h2>CRAFT in Action: Full Example</h2>

<pre style="background: rgba(16,185,129,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
[Context]
I run a SaaS startup that helps restaurants manage online orders.
We just launched custom loyalty programs. Our audience is
restaurant owners with 1-5 locations who are not very tech-savvy.

[Role]
Act as a senior email marketing specialist who has worked with
restaurant technology companies.

[Action]
Write a product announcement email for our new loyalty feature.
Include: 3 benefits, 1 brief customer success story (you can
create a realistic one), and a clear CTA to book a demo.

[Format]
Subject line + preview text + email body. Use short paragraphs
(2-3 sentences max). Include one bullet-point list.

[Tone]
Friendly and approachable. Avoid jargon. Write at an 8th grade
reading level. Enthusiastic but not pushy.
</pre>

<p><strong>The result?</strong> A polished, targeted email that would take a professional copywriter 30-60 minutes, generated in seconds.</p>

<h2>Common Prompt Mistakes</h2>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
Mistake 1: Too vague
"Write something about marketing"

Mistake 2: Too many tasks at once
"Write an email, create a social post, make a landing page,
and design a logo"

Mistake 3: No constraints
"Write a blog post" (How long? What style? What audience?)

Mistake 4: Assuming AI knows your context
"Update the proposal" (What proposal? What updates?)

Mistake 5: Not specifying what to AVOID
Sometimes what you don't want is as important as what you do.
Add: "Do NOT include jargon, clichés, or phrases like
'in today's fast-paced world'"
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>CRAFT framework:</strong> Context, Role, Action, Format, Tone</li>
<li><strong>Context is king</strong> — more relevant context = better output</li>
<li><strong>Roles unlock different capabilities</strong> — assign expert roles</li>
<li><strong>Be specific about actions</strong> — vague requests = vague results</li>
<li><strong>Define format upfront</strong> — tables, bullets, word limits</li>
<li><strong>Set tone explicitly</strong> — don't leave voice to chance</li>
</ol>

<h2>Coming Up Next</h2>
<p>In Lesson 3.2, we'll explore advanced prompting techniques: chain-of-thought reasoning, few-shot learning, and other power moves that produce expert-level outputs.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson3_1.id,
      title: 'Anatomy of a Perfect Prompt Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'What does CRAFT stand for in prompt engineering?',
            type: 'mcq',
            options: JSON.stringify(['Create, Review, Adjust, Finalize, Test', 'Context, Role, Action, Format, Tone', 'Clarity, Relevance, Accuracy, Focus, Thoroughness', 'Command, Request, Argue, Frame, Target']),
            correctAnswer: '1',
            explanation: 'CRAFT stands for Context (background info), Role (who AI should act as), Action (what to do), Format (output structure), and Tone (voice/style).',
            order: 1,
          },
          {
            question: 'Why is assigning a "Role" to the AI effective?',
            type: 'mcq',
            options: JSON.stringify(['It makes the AI smarter', 'It activates different pattern sets from training data', 'It reduces the cost of the API call', 'It prevents hallucinations completely']),
            correctAnswer: '1',
            explanation: 'Assigning a role activates different pattern sets in the AI\'s training data. When you say "act as a senior marketing strategist," the AI draws from patterns associated with expert marketing content.',
            order: 2,
          },
          {
            question: 'Which prompt is better engineered?',
            type: 'mcq',
            options: JSON.stringify(['"Write a blog post about AI"', '"Help me with content"', '"Write a 800-word blog post about AI in healthcare for a non-technical audience, using a conversational tone with 3 practical examples"', '"AI blog post please make it good"']),
            correctAnswer: '2',
            explanation: 'The third option includes all CRAFT elements: context (AI in healthcare), action (write 800-word blog post), format (3 practical examples), and tone (conversational, non-technical). The others are too vague.',
            order: 3,
          },
          {
            question: 'What is a common prompt mistake?',
            type: 'mcq',
            options: JSON.stringify(['Being too specific', 'Including too much context', 'Asking for too many different tasks in one prompt', 'Using the CRAFT framework']),
            correctAnswer: '2',
            explanation: 'Asking for too many tasks at once (write email + create social post + design landing page) overwhelms the AI. Focus on one task per prompt for best results.',
            order: 4,
          },
        ],
      },
    },
  })

  const lesson3_2 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: 'Advanced Prompting Techniques',
      slug: 'advanced-prompting-techniques',
      duration: 25,
      order: 2,
      content: `
<div class="lesson-content">
<h1>Advanced Prompting Techniques</h1>

<h2>What You'll Learn</h2>
<p>These advanced techniques can dramatically improve AI output quality. They're used by the top 1% of AI users and can turn good results into exceptional ones.</p>

<h2>Technique 1: Chain-of-Thought (CoT) Prompting</h2>
<p><strong>What it is:</strong> Asking AI to think step-by-step before giving a final answer.</p>
<p><strong>Why it works:</strong> Forces the AI through a logical reasoning process rather than jumping to conclusions.</p>

<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
❌ Without CoT:
"Should I hire a marketing agency or build an in-house team?"

Result: Generic pros/cons list
</pre>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
✅ With CoT:
"I need to decide between hiring a marketing agency or building
an in-house team. Think through this step by step:

1. First, analyze the cost implications of each option for a
   startup with $500K annual revenue
2. Then, consider the quality and control tradeoffs
3. Next, evaluate the speed of getting results
4. Finally, give your recommendation with reasoning"

Result: Structured, logical analysis with justified recommendation
</pre>

<h2>Technique 2: Few-Shot Learning</h2>
<p><strong>What it is:</strong> Providing examples of the output you want before asking for new output.</p>
<p><strong>Why it works:</strong> Examples create a precise pattern for the AI to follow.</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Convert these product features into benefit-driven headlines.

Examples:
Feature: 256GB storage → Headline: "Never Delete a Photo Again"
Feature: 5G connectivity → Headline: "Download Movies in Seconds"
Feature: 12-hour battery → Headline: "From Morning Meeting to
Evening Flight, Without a Charger"

Now convert these:
Feature: AI-powered camera
Feature: Water resistance to 10m
Feature: Titanium frame"
</pre>

<p><strong>The magic:</strong> By showing 3 examples, you've taught the AI your exact style and approach. The new headlines will match your pattern perfectly.</p>

<h2>Technique 3: Role Stacking</h2>
<p><strong>What it is:</strong> Asking the AI to respond from multiple expert perspectives.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
"Evaluate this business idea from three perspectives:

1. As a venture capitalist: Is this investable? What's the
   market opportunity?
2. As a potential customer: Would you pay for this? What
   concerns would you have?
3. As a competitor: How would you defend against this?
   What's the weakness?

Business idea: [your idea here]"
</pre>

<h2>Technique 4: Constraint-Based Prompting</h2>
<p><strong>What it is:</strong> Adding strategic limitations that actually improve output quality.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Powerful constraints:
• "Explain this in exactly 3 sentences"
• "Use only words a 10-year-old would understand"
• "Do NOT use the words: innovative, leverage, synergy"
• "Every paragraph must include a concrete example"
• "Limit your response to 200 words"
• "You must include at least one counterargument"
</pre>

<p><strong>Why constraints help:</strong> They force the AI to be more creative and precise. Without constraints, AI tends to be verbose and generic.</p>

<h2>Technique 5: Iterative Refinement</h2>
<p><strong>What it is:</strong> Using follow-up prompts to improve output in stages.</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Round 1: "Write a LinkedIn post about AI productivity tools"
Round 2: "Make it more conversational and add a hook in
          the first line"
Round 3: "Shorten to under 150 words and end with a question
          to drive engagement"
Round 4: "Replace any generic phrases with specific examples"
</pre>

<p><strong>Key insight:</strong> Don't expect perfection on the first try. The best AI users iterate 3-5 times to get exceptional output.</p>

<h2>Technique 6: Persona Prompting</h2>
<p><strong>What it is:</strong> Having AI adopt a detailed persona for more consistent, high-quality output.</p>

<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"For this conversation, you are Alex — a senior content
strategist with 15 years of experience in B2B SaaS marketing.

Your traits:
• You value clarity over cleverness
• You always tie content back to business outcomes
• You prefer short paragraphs and concrete examples
• You push back when ideas lack strategic alignment
• Your catchphrase is 'what's the business case?'

Stay in character for all responses. I'll ask you to review
my content strategy."
</pre>

<h2>When to Use Which Technique</h2>

<table style="width:100%; border-collapse: collapse; margin: 20px 0;">
<thead>
<tr style="background: rgba(59,130,246,0.1); border-bottom: 2px solid rgba(59,130,246,0.3);">
<th style="padding: 12px; text-align: left;">Situation</th>
<th style="padding: 12px; text-align: left;">Best Technique</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Complex decisions</td><td style="padding: 12px;">Chain-of-Thought</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Matching a specific style</td><td style="padding: 12px;">Few-Shot Learning</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Getting diverse perspectives</td><td style="padding: 12px;">Role Stacking</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Tightening loose writing</td><td style="padding: 12px;">Constraint-Based</td></tr>
<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><td style="padding: 12px;">Polishing any output</td><td style="padding: 12px;">Iterative Refinement</td></tr>
<tr><td style="padding: 12px;">Ongoing projects</td><td style="padding: 12px;">Persona Prompting</td></tr>
</tbody>
</table>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Chain-of-Thought</strong> — "Think step by step" dramatically improves reasoning</li>
<li><strong>Few-Shot Learning</strong> — Examples teach AI your exact style</li>
<li><strong>Role Stacking</strong> — Multiple perspectives reveal blind spots</li>
<li><strong>Constraints improve quality</strong> — Limitations force creativity</li>
<li><strong>Iterate 3-5 times</strong> — Don't accept first drafts</li>
<li><strong>Personas ensure consistency</strong> — Great for ongoing projects</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 3.3 gives you ready-to-use prompt templates for every common situation — business emails, content creation, data analysis, and more.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson3_2.id,
      title: 'Advanced Prompting Techniques Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'What is chain-of-thought prompting?',
            type: 'mcq',
            options: JSON.stringify(['Sending multiple prompts in sequence', 'Asking AI to think step-by-step before answering', 'Linking multiple AI tools together', 'Writing very long prompts']),
            correctAnswer: '1',
            explanation: 'Chain-of-thought prompting asks the AI to reason through a problem step by step before providing its final answer, leading to better logical analysis.',
            order: 1,
          },
          {
            question: 'How does few-shot learning work?',
            type: 'mcq',
            options: JSON.stringify(['You provide examples of desired output, then ask for new output following the same pattern', 'You train a new AI model with limited data', 'You use the AI for only brief interactions', 'You limit the AI to short responses']),
            correctAnswer: '0',
            explanation: 'Few-shot learning works by providing 2-5 examples of the output format/style you want, creating a precise pattern for the AI to replicate with new inputs.',
            order: 2,
          },
          {
            question: 'Why do constraints actually improve AI output?',
            type: 'mcq',
            options: JSON.stringify(['They make the AI work harder', 'They force the AI to be more creative and precise', 'They reduce the cost of the API call', 'They prevent all errors']),
            correctAnswer: '1',
            explanation: 'Constraints like word limits, reading levels, and banned words force the AI to be more creative and precise. Without constraints, AI tends to produce verbose, generic output.',
            order: 3,
          },
          {
            question: 'How many iterations should you typically expect for excellent output?',
            type: 'mcq',
            options: JSON.stringify(['1 — AI should get it right first time', '3-5 rounds of refinement', '10-20 iterations minimum', 'It depends on the AI model only']),
            correctAnswer: '1',
            explanation: 'The best AI users typically iterate 3-5 times to refine output from good to exceptional. Expecting perfection on the first try is the most common beginner mistake.',
            order: 4,
          },
        ],
      },
    },
  })

  const lesson3_3 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: 'Prompt Templates for Every Situation',
      slug: 'prompt-templates-library',
      duration: 20,
      order: 3,
      content: `
<div class="lesson-content">
<h1>Prompt Templates for Every Situation</h1>

<h2>What You'll Learn</h2>
<p>This lesson is your prompt reference library. Save these templates and customize them for your specific needs.</p>

<h2>Template 1: Business Email</h2>
<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Write a professional email.

Context: [describe the situation]
Recipient: [who is this to and what's your relationship]
Goal: [what action do you want them to take]
Tone: [formal/friendly/urgent/appreciative]
Length: [under 150 words / 200-300 words]

Include:
- Clear subject line
- One specific call-to-action
- Professional closing

Avoid: jargon, passive voice, more than 3 paragraphs
</pre>

<h2>Template 2: Content Creation</h2>
<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Write a [blog post / article / social post] about [topic].

Target audience: [who will read this]
Goal: [educate / persuade / entertain / drive signups]
Length: [word count]
Style: [conversational / authoritative / storytelling]

Structure:
- Hook that grabs attention in first sentence
- [number] main points with examples
- Practical takeaway the reader can use today
- Call-to-action at the end

Avoid: [clichés, jargon, filler phrases like "in today's
fast-paced world"]

SEO keywords to naturally include: [keywords]
</pre>

<h2>Template 3: Data Analysis</h2>
<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Analyze this data and provide insights.

Data: [paste or describe data]
Context: [what business does this relate to]

Please:
1. Summarize key findings (top 3-5)
2. Identify trends or patterns
3. Flag any anomalies or concerns
4. Provide actionable recommendations
5. Note any limitations of this analysis

Present findings in a table where possible.
Highlight the single most important insight first.
</pre>

<h2>Template 4: Meeting Summary</h2>
<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Summarize this meeting transcript/notes.

[Paste transcript or notes]

Create a summary with:
1. Meeting purpose (1 sentence)
2. Key decisions made (bullet points)
3. Action items (who / what / by when)
4. Open questions or unresolved items
5. Next steps

Keep the summary under 300 words.
Highlight any deadlines in bold.
</pre>

<h2>Template 5: Competitor Analysis</h2>
<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Analyze [competitor name] as a competitor to my business.

My business: [brief description]
My target market: [who you serve]
Competitor: [name and brief description]

Analyze:
1. Their strengths vs our strengths
2. Their weaknesses and vulnerabilities
3. Their pricing strategy
4. Their marketing approach
5. Opportunities we can exploit
6. Threats they pose to us

Present as a SWOT analysis table, then provide
3 specific strategic recommendations.

Note: Flag if you are uncertain about any claims.
</pre>

<h2>Template 6: Brainstorming</h2>
<pre style="background: rgba(59,130,246,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
Generate [number] ideas for [topic/challenge].

Context: [background on the situation]
Constraints: [budget, timeline, resources, etc.]

For each idea, provide:
- One-line description
- Why it could work
- Main risk or challenge
- Effort level (low/medium/high)

Include a mix of:
- Safe, proven approaches
- Creative, unconventional ideas
- One "moonshot" idea that could be transformative

Rank them by potential impact.
</pre>

<h2>How to Customize Templates</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Step 1: Start with the template above
Step 2: Fill in the [brackets] with your specifics
Step 3: Add any extra constraints or requirements
Step 4: Remove sections you don't need
Step 5: Save your customized version for reuse

Pro tip: Create a document with your 5 most-used templates
pre-filled with your standard context (company info, target
audience, brand voice guidelines).
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Templates save time</strong> — don't reinvent the wheel for common tasks</li>
<li><strong>Customize for your context</strong> — fill in brackets with your specifics</li>
<li><strong>Save your favorites</strong> — build a personal prompt library</li>
<li><strong>Iterate on templates</strong> — refine them as you learn what works</li>
<li><strong>Share with your team</strong> — consistent prompts = consistent quality</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 3.4 covers debugging prompts — what to do when AI gives you bad output, and systematic approaches to fixing it.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson3_3.id,
      title: 'Prompt Templates Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'What is the main benefit of using prompt templates?',
            type: 'mcq',
            options: JSON.stringify(['They make AI responses shorter', 'They save time and ensure consistent quality for common tasks', 'They are required by AI platforms', 'They bypass AI safety features']),
            correctAnswer: '1',
            explanation: 'Prompt templates save time by providing a proven structure for common tasks, ensuring consistently high-quality outputs without starting from scratch each time.',
            order: 1,
          },
          {
            question: 'What should you do after filling in a template?',
            type: 'mcq',
            options: JSON.stringify(['Use it exactly as-is every time', 'Add extra constraints specific to your situation', 'Delete most of the template to keep it short', 'Send it without reviewing']),
            correctAnswer: '1',
            explanation: 'After filling in the template brackets, you should add any extra constraints or requirements specific to your current situation, and remove sections you don\'t need.',
            order: 2,
          },
          {
            question: 'Which template element is most important for getting relevant results?',
            type: 'mcq',
            options: JSON.stringify(['The format specification', 'The target audience / context', 'The word count limit', 'The tone instruction']),
            correctAnswer: '1',
            explanation: 'Context — including target audience, business background, and situation — is the most critical element. Without context, even perfectly structured prompts produce generic results.',
            order: 3,
          },
          {
            question: 'What is a "pro tip" for template usage in teams?',
            type: 'mcq',
            options: JSON.stringify(['Each person should create their own from scratch', 'Share customized templates for consistent team output quality', 'Only managers should use templates', 'Templates should be kept secret']),
            correctAnswer: '1',
            explanation: 'Sharing customized prompt templates across your team ensures everyone produces consistent, high-quality AI outputs. This is especially valuable for brand voice and standard processes.',
            order: 4,
          },
        ],
      },
    },
  })

  const lesson3_4 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: 'Debugging & Iterating Prompts',
      slug: 'debugging-iterating-prompts',
      duration: 18,
      order: 4,
      content: `
<div class="lesson-content">
<h1>Debugging & Iterating Prompts</h1>

<h2>What You'll Learn</h2>
<p>Even great prompts sometimes produce disappointing results. This lesson teaches you a systematic approach to diagnose and fix prompt issues.</p>

<h2>The Prompt Debugging Framework</h2>
<p>When AI output is bad, work through these diagnostic steps:</p>

<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Step 1: Is the output wrong or just not what you expected?
→ If wrong: fact-checking issue (add verification requirements)
→ If unexpected: clarity issue (make your expectations explicit)

Step 2: What specifically is wrong?
→ Too long? Add word/sentence limits
→ Wrong tone? Specify tone more precisely
→ Missing info? Add "You must include..."
→ Too generic? Add specific examples or constraints
→ Wrong format? Show an example of the format you want

Step 3: Is the prompt too vague or too complex?
→ Too vague: Add CRAFT elements
→ Too complex: Break into multiple prompts
</pre>

<h2>Common Problems & Solutions</h2>

<h3>Problem: Output is too generic</h3>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
Before: "Write about AI in healthcare"
Result: Generic overview article
</pre>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Fix: Add specificity
"Write about 3 specific ways AI is reducing diagnostic
errors in emergency rooms, with one real hospital case
study for each. Target audience: hospital administrators."
</pre>

<h3>Problem: AI ignores instructions</h3>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
Before: A prompt with 10 different instructions buried in
a long paragraph
</pre>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Fix: Use numbered lists and formatting
"Follow these instructions exactly:
1. Write in first person
2. Maximum 200 words
3. Include exactly 3 bullet points
4. End with a question"
</pre>

<h3>Problem: Output sounds robotic</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Fix: Add voice and personality instructions
"Write as if you're explaining this to a friend over coffee.
Use contractions, short sentences, and occasional humor.
Start with a relatable scenario, not a definition.
AVOID: 'In today's rapidly evolving landscape', 'leverage',
'cutting-edge', 'game-changing', 'it's important to note'"
</pre>

<h3>Problem: AI hallucinates facts</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Fix: Add verification constraints
"Only include facts you are highly confident about.
For any statistic, include the source.
If you're not sure about something, say 'I'm not certain
about this — please verify' rather than guessing.
Do NOT fabricate quotes, studies, or statistics."
</pre>

<h2>The Iteration Playbook</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Iteration 1: Get the structure right
"Give me an outline for [task]"

Iteration 2: Fill in the content
"Now write the full version following this outline"

Iteration 3: Refine the quality
"Improve this by: [specific feedback]"

Iteration 4: Polish the details
"Final pass: tighten the language, remove filler,
ensure every sentence adds value"
</pre>

<h2>The "Feedback Sandwich" Technique</h2>
<p>When iterating, tell AI what worked AND what didn't:</p>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"The structure is great and I love the opening hook.
However, the middle section is too technical for my audience,
and the conclusion doesn't have a clear call-to-action.

Please rewrite keeping the same opening, but simplify the
middle section using analogies, and end with a specific CTA
to book a consultation."
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Bad output = prompt issue</strong> not an AI limitation (usually)</li>
<li><strong>Diagnose first</strong> — identify what specifically is wrong before fixing</li>
<li><strong>Use numbered lists</strong> — AI follows structured instructions better</li>
<li><strong>Ban specific phrases</strong> — tell AI what NOT to write</li>
<li><strong>Iterate with specific feedback</strong> — "make it better" doesn't work</li>
<li><strong>Break complex tasks into steps</strong> — 3 simple prompts beat 1 complex one</li>
</ol>

<h2>Coming Up Next</h2>
<p>Module 4 takes everything you've learned and applies it to real business scenarios — AI for email, research, analysis, and decision-making.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson3_4.id,
      title: 'Debugging Prompts Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'When AI output is too generic, what is the best fix?',
            type: 'mcq',
            options: JSON.stringify(['Use a different AI model', 'Add specificity — concrete details, examples, and constraints', 'Make the prompt shorter', 'Repeat the same prompt multiple times']),
            correctAnswer: '1',
            explanation: 'Generic output is almost always a specificity problem. Adding concrete details, target audience, specific examples, and constraints produces much more targeted results.',
            order: 1,
          },
          {
            question: 'Why do numbered lists improve prompt compliance?',
            type: 'mcq',
            options: JSON.stringify(['They look more professional', 'AI processes numbers faster', 'Each instruction is clearly separated and easier for AI to follow', 'They reduce token usage']),
            correctAnswer: '2',
            explanation: 'When instructions are in a numbered list, each one is clearly delineated, making it much easier for the AI to identify and follow every requirement rather than missing instructions buried in paragraphs.',
            order: 2,
          },
          {
            question: 'What is the "feedback sandwich" technique?',
            type: 'mcq',
            options: JSON.stringify(['Sending three prompts in a row', 'Telling AI what worked AND what needs improvement in your feedback', 'Using three different AI tools for the same task', 'Breaking a prompt into three parts']),
            correctAnswer: '1',
            explanation: 'The feedback sandwich tells AI what worked well, what needs improvement, and specific changes to make. This preserves the good parts while fixing the issues.',
            order: 3,
          },
          {
            question: 'What should you do when a prompt is too complex?',
            type: 'mcq',
            options: JSON.stringify(['Add more details to clarify', 'Break it into multiple simpler prompts', 'Use a more advanced AI model', 'Remove all constraints']),
            correctAnswer: '1',
            explanation: 'Complex prompts should be broken into multiple simpler ones. Three focused prompts executed sequentially produce better results than one overloaded prompt.',
            order: 4,
          },
        ],
      },
    },
  })

  console.log('  ✅ Module 3: Prompt Engineering (4 lessons)')

  // ============================================
  // MODULE 4: BUSINESS AI INTEGRATION (STARTER)
  // ============================================
  const module4 = await prisma.module.create({
    data: {
      courseId,
      title: 'Business AI Integration',
      slug: 'business-ai-integration',
      description: 'Apply AI to real business tasks — email, research, analysis, and decision-making',
      order: 4,
      icon: '📊',
      tier: 'starter',
    },
  })

  const lesson4_1 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
      title: 'AI for Email & Communication',
      slug: 'ai-email-communication',
      duration: 18,
      order: 1,
      content: `
<div class="lesson-content">
<h1>AI for Email & Communication</h1>

<h2>What You'll Learn</h2>
<p>Email is the #1 time sink for professionals. AI can cut your email time by 50-70% while actually improving quality.</p>

<h2>The Email Time Problem</h2>
<p>The average professional spends <strong>2.5 hours per day</strong> on email. That's 12.5 hours per week, 650 hours per year.</p>
<p><strong>With AI, you can realistically cut this to 1 hour per day</strong> — saving 7.5 hours per week.</p>

<h2>5 Email Workflows You Can Automate Today</h2>

<h3>1. The Quick Reply</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Write a brief, professional reply to this email. Keep it
under 75 words. Be friendly but direct.

Their email: [paste email]
My response should: [accept/decline/ask for more info/schedule]
Key point to make: [your main message]"

Time saved: 5-10 minutes per email × 20 emails = 2+ hours/day
</pre>

<h3>2. The Difficult Conversation</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Help me write a professional email for a sensitive situation.

Situation: [describe what happened]
Relationship: [boss/client/colleague/vendor]
Goal: [what outcome do you want]
Constraints: [anything to avoid mentioning]
Tone: Diplomatic but clear. Not apologetic unless warranted.

Write 2 versions:
Version A: More direct approach
Version B: Softer approach"
</pre>

<h3>3. Meeting Follow-Up</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Write a follow-up email after a meeting.

Meeting notes: [paste your notes]
Attendees: [names and roles]
My role: [your position]

Include:
- Brief summary of key discussion points
- Action items with owners and deadlines
- Next meeting date/time if applicable
- Friendly closing

Keep under 200 words."
</pre>

<h3>4. Client Proposal Email</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Write an email to send with a proposal.

Client: [name, company, what they need]
Our proposal: [brief summary of what we're proposing]
Key selling points: [3 main reasons to choose us]
Next step: [what you want them to do]

Tone: Confident and professional, not salesy.
Length: Under 200 words — the proposal document has the details."
</pre>

<h3>5. Batch Email Processing</h3>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"I have 5 emails that need replies. For each, write a
brief professional response.

Email 1: [paste]
My response: [accept the meeting]

Email 2: [paste]
My response: [decline politely, suggest next week]

Email 3: [paste]
My response: [request more details about budget]

Email 4: [paste]
My response: [thank them, confirm receipt]

Email 5: [paste]
My response: [delegate to my colleague Sarah]"
</pre>

<h2>Beyond Email: AI for All Communication</h2>

<h3>Slack/Teams Messages</h3>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
"Rewrite this message for Slack. Make it concise and casual
but professional. Use one emoji maximum.

Original: [your draft]"
</pre>

<h3>Presentation Talking Points</h3>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
"Create bullet-point talking points for a 10-minute
presentation on [topic].

Audience: [who]
Key message: [main takeaway]
Include: 1 strong opening line, 3-4 main points,
1 memorable closing statement"
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>Email is the biggest time-saver</strong> — 2.5 hours/day down to 1 hour</li>
<li><strong>Batch process emails</strong> — handle 5-10 at once with AI</li>
<li><strong>Use AI for difficult conversations</strong> — get multiple drafts</li>
<li><strong>Always review before sending</strong> — AI drafts, you decide</li>
<li><strong>Apply to all communication</strong> — Slack, presentations, reports</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 4.2 covers AI for Research & Analysis — turning hours of research into minutes of focused insight.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson4_1.id,
      title: 'AI for Email Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'How much time does the average professional spend on email daily?',
            type: 'mcq',
            options: JSON.stringify(['30 minutes', '1 hour', '2.5 hours', '4 hours']),
            correctAnswer: '2',
            explanation: 'The average professional spends 2.5 hours per day on email, which totals about 650 hours per year. AI can realistically cut this to 1 hour per day.',
            order: 1,
          },
          {
            question: 'What is the recommended approach for handling multiple emails with AI?',
            type: 'mcq',
            options: JSON.stringify(['Process each email in a separate conversation', 'Batch 5-10 emails in a single prompt with response instructions', 'Let AI auto-reply to all emails', 'Only use AI for the most important emails']),
            correctAnswer: '1',
            explanation: 'Batch processing — putting 5-10 emails in a single prompt with brief response instructions for each — is the most efficient approach.',
            order: 2,
          },
          {
            question: 'For a difficult or sensitive email, what should you ask AI to provide?',
            type: 'mcq',
            options: JSON.stringify(['Just one draft to save time', 'Multiple versions with different approaches (direct vs softer)', 'An apology regardless of the situation', 'A very long and detailed response']),
            correctAnswer: '1',
            explanation: 'For sensitive situations, having AI write multiple versions (e.g., a more direct approach and a softer approach) lets you choose the tone that best fits the situation.',
            order: 3,
          },
          {
            question: 'What should you always do before sending an AI-drafted email?',
            type: 'mcq',
            options: JSON.stringify(['Add more text to make it longer', 'Review and personalize it', 'Send it immediately to save time', 'Ask AI to rewrite it three more times']),
            correctAnswer: '1',
            explanation: 'Always review AI-drafted emails before sending. Check for accuracy, add personal touches, and ensure the tone matches your intent. AI drafts, you decide.',
            order: 4,
          },
        ],
      },
    },
  })

  const lesson4_2 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
      title: 'AI for Research & Analysis',
      slug: 'ai-research-analysis',
      duration: 20,
      order: 2,
      content: `
<div class="lesson-content">
<h1>AI for Research & Analysis</h1>

<h2>What You'll Learn</h2>
<p>Transform research that takes hours into focused analysis in minutes. Learn workflows for market research, competitor analysis, and report generation.</p>

<h2>The AI Research Workflow</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
Phase 1: Define → What exactly do you need to know?
Phase 2: Gather → Use AI to collect and summarize information
Phase 3: Analyze → Ask AI to find patterns and insights
Phase 4: Verify → Cross-check key claims with primary sources
Phase 5: Present → Use AI to create the final deliverable
</pre>

<h2>Market Research in 10 Minutes</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Prompt:
"Provide a market analysis for [industry/product].

Include:
1. Market size and growth rate (note if estimates)
2. Top 5 players and their approximate market share
3. Key trends shaping the next 2-3 years
4. Biggest challenges facing new entrants
5. Underserved segments or opportunities

Format: Executive summary (3 sentences) followed by
detailed analysis in sections.

Important: Flag any data points you're uncertain about.
Note: I will verify key statistics independently."
</pre>

<h2>Competitor Analysis Framework</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
Step 1 — Landscape:
"List the top 10 competitors in [space]. For each: name,
one-line description, estimated size, target customer."

Step 2 — Deep Dive:
"For [specific competitor], analyze:
- Their pricing model
- Their main value proposition
- Their strengths and weaknesses
- Recent strategic moves
- Customer complaints (based on review patterns)"

Step 3 — Strategic Positioning:
"Based on this competitor analysis, where are the gaps
in the market? What positioning would be most defensible
for a new entrant focused on [your focus]?"
</pre>

<h2>Report Generation</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Create a professional report based on these findings.

Data/findings: [paste your research]

Report structure:
1. Executive Summary (250 words max)
2. Key Findings (bullet points, ranked by importance)
3. Detailed Analysis (organized by theme)
4. Recommendations (3-5, each with implementation steps)
5. Risks and Considerations

Audience: [who will read this]
Tone: [professional/executive/technical]
Length: [target pages/words]"
</pre>

<h2>The Verification Layer</h2>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
CRITICAL RULE: Never present AI research as fact without
verification.

Always verify:
• Specific statistics and numbers
• Market size claims
• Competitor details (pricing, features)
• Legal or regulatory information
• Recent events or developments

Use Perplexity or direct sources for fact-checking.
AI is excellent for frameworks and analysis — but
specific data points need human verification.
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>AI excels at research frameworks</strong> — structure, analysis, synthesis</li>
<li><strong>Break research into phases</strong> — define, gather, analyze, verify, present</li>
<li><strong>Always verify key data points</strong> — AI generates plausible statistics</li>
<li><strong>Use multi-step workflows</strong> — landscape → deep dive → positioning</li>
<li><strong>AI creates the draft, you add the judgment</strong> — combine AI speed with human insight</li>
</ol>

<h2>Coming Up Next</h2>
<p>Lesson 4.3 covers AI for Decision Making — using AI for SWOT analysis, scenario planning, and risk assessment.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson4_2.id,
      title: 'AI for Research Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'What is the most important step in the AI research workflow?',
            type: 'mcq',
            options: JSON.stringify(['Gathering as much information as possible', 'Using the most expensive AI model', 'Verifying key claims with primary sources', 'Making the report as long as possible']),
            correctAnswer: '2',
            explanation: 'Verification is critical. AI can generate plausible-sounding statistics and market data that may not be accurate. Key data points should always be cross-checked with primary sources.',
            order: 1,
          },
          {
            question: 'What makes multi-step competitor analysis more effective than a single prompt?',
            type: 'mcq',
            options: JSON.stringify(['It uses more tokens so it must be better', 'Each step builds on the previous one, creating deeper insight', 'It gives the AI more time to think', 'It is not more effective — single prompts work just as well']),
            correctAnswer: '1',
            explanation: 'Multi-step analysis (landscape → deep dive → positioning) builds depth progressively. Each step provides context for the next, resulting in much more insightful strategic analysis.',
            order: 2,
          },
          {
            question: 'Which type of information should you always verify independently?',
            type: 'mcq',
            options: JSON.stringify(['Creative suggestions and ideas', 'General industry trends', 'Specific statistics, pricing data, and legal information', 'Writing style recommendations']),
            correctAnswer: '2',
            explanation: 'Specific statistics, competitor pricing, market size claims, and legal/regulatory information should always be independently verified. AI may generate plausible but incorrect specific data.',
            order: 3,
          },
          {
            question: 'What is AI best at in the research process?',
            type: 'mcq',
            options: JSON.stringify(['Providing verified real-time data', 'Creating analysis frameworks and synthesizing information', 'Replacing human judgment entirely', 'Generating original primary research']),
            correctAnswer: '1',
            explanation: 'AI excels at creating analytical frameworks, synthesizing information from multiple angles, and structuring research into clear deliverables. It combines speed with structured thinking.',
            order: 4,
          },
        ],
      },
    },
  })

  const lesson4_3 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
      title: 'AI for Decision Making',
      slug: 'ai-decision-making',
      duration: 18,
      order: 3,
      content: `
<div class="lesson-content">
<h1>AI for Decision Making</h1>

<h2>What You'll Learn</h2>
<p>AI won't make decisions for you — but it can dramatically improve the quality of your decision-making by stress-testing ideas, revealing blind spots, and structuring complex tradeoffs.</p>

<h2>SWOT Analysis with AI</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Perform a SWOT analysis for [decision/business/project].

Context: [relevant background]

For each quadrant, provide:
- 3-5 specific points (not generic)
- A brief explanation of why each matters
- One actionable step to address it

After the SWOT, provide:
1. The single biggest opportunity
2. The single biggest threat
3. Your overall strategic recommendation"
</pre>

<h2>Pros/Cons with Weighted Scoring</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Help me decide between [Option A] and [Option B].

Context: [situation]
What matters most to me: [priorities]

For each option:
1. List pros and cons
2. Rate each pro/con on impact (1-10)
3. Weight them by my stated priorities
4. Calculate a total weighted score
5. Present in a comparison table

Then give your recommendation based on the analysis."
</pre>

<h2>Scenario Planning</h2>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"I'm considering [decision]. Help me think through scenarios.

Create 3 scenarios:
1. Best case — Everything goes right. What happens?
2. Most likely — Realistic outcome. What should I expect?
3. Worst case — Things go wrong. What's the downside?

For each scenario:
- Describe what happens
- Estimate probability (%)
- List key factors that would cause this scenario
- Suggest 1-2 preparations or mitigations

Expected value analysis: Based on probabilities and outcomes,
what is the smart choice?"
</pre>

<h2>Devil's Advocate Technique</h2>
<pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
"I'm planning to [your decision]. I think it's a good idea
because [your reasons].

Now, act as a devil's advocate. Argue against this decision:
1. What could go wrong that I haven't considered?
2. What assumptions am I making that might be wrong?
3. What would a skeptical investor/advisor say?
4. Is there a simpler alternative I'm overlooking?

Be honest and tough — I need real challenges, not validation."
</pre>

<h2>Pre-Mortem Analysis</h2>
<p><strong>One of the most powerful decision tools:</strong></p>
<pre style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
"Imagine it's 12 months from now, and [my decision] has
completely failed. We're doing a post-mortem.

What went wrong? Generate the 7 most likely reasons for
failure, ranked by probability. For each:
1. Describe what happened
2. What early warning signs were missed
3. What could have been done to prevent it

This is for: [describe your decision/project]"
</pre>

<h2>When NOT to Use AI for Decisions</h2>
<pre style="background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
AI should NOT be the sole basis for:
• Legal decisions — consult a lawyer
• Medical decisions — consult a doctor
• Financial investments — consult a financial advisor
• Hiring/firing decisions — too much human nuance
• Ethical dilemmas — AI lacks moral judgment

AI is a thinking partner, not a decision-maker.
Use it to structure your thinking, not to replace it.
</pre>

<h2>Key Takeaways</h2>
<ol>
<li><strong>AI improves decisions, doesn't make them</strong> — it's a thinking partner</li>
<li><strong>SWOT + weighted pros/cons</strong> = structured decision framework</li>
<li><strong>Scenario planning</strong> reveals best/worst/likely outcomes</li>
<li><strong>Devil's advocate</strong> catches blind spots and weak assumptions</li>
<li><strong>Pre-mortem analysis</strong> identifies failure modes before they happen</li>
<li><strong>Never use AI alone for legal, medical, or financial decisions</strong></li>
</ol>

<h2>Coming Up Next</h2>
<p>Congratulations on completing the Starter modules! In Module 5, we enter the Pro tier with Advanced AI Workflows & Automation — chaining multiple AI tasks together for powerful multi-step systems.</p>
</div>
      `,
    },
  })

  await prisma.quiz.create({
    data: {
      lessonId: lesson4_3.id,
      title: 'AI for Decision Making Quiz',
      passingScore: 70,
      questions: {
        create: [
          {
            question: 'What is a "pre-mortem" analysis?',
            type: 'mcq',
            options: JSON.stringify(['Analyzing a decision after it fails', 'Imagining a decision has failed and identifying likely causes', 'Testing a product before launch', 'Reviewing competitor failures']),
            correctAnswer: '1',
            explanation: 'A pre-mortem imagines it is 12 months in the future and your decision has failed, then works backward to identify the most likely causes. This proactively reveals failure modes.',
            order: 1,
          },
          {
            question: 'Why is the devil\'s advocate technique valuable?',
            type: 'mcq',
            options: JSON.stringify(['It always proves decisions are wrong', 'It catches blind spots and challenges assumptions', 'It makes AI more creative', 'It is faster than other decision techniques']),
            correctAnswer: '1',
            explanation: 'The devil\'s advocate technique forces AI to argue against your decision, revealing blind spots, weak assumptions, and alternatives you may not have considered.',
            order: 2,
          },
          {
            question: 'Which decisions should you NOT rely solely on AI for?',
            type: 'mcq',
            options: JSON.stringify(['Content strategy decisions', 'Legal, medical, and financial decisions', 'Marketing campaign choices', 'Product feature prioritization']),
            correctAnswer: '1',
            explanation: 'AI should not be the sole basis for legal, medical, financial, or hiring decisions. These require human expertise, ethical judgment, and professional accountability.',
            order: 3,
          },
          {
            question: 'What makes weighted pros/cons better than a simple pros/cons list?',
            type: 'mcq',
            options: JSON.stringify(['It takes more time so it must be better', 'It accounts for the fact that not all factors are equally important', 'It uses more advanced AI features', 'It is only useful for financial decisions']),
            correctAnswer: '1',
            explanation: 'Weighted scoring accounts for the fact that different factors have different levels of importance. A small pro that aligns with your top priority may outweigh several minor cons.',
            order: 4,
          },
        ],
      },
    },
  })

  console.log('  ✅ Module 4: Business AI Integration (3 lessons)')
}

module.exports = { seedModules2to4 }
