/**
 * Portfolio Data Source
 * 集中管理個人資訊、專案作品、技能清單、職涯經歷與社群連結
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: "Todd Lin",
    title: "Full-Stack Engineer & Creative Developer",
    statusText: "Open to exciting opportunities & projects",
    statusAvailable: true,
    typingRoles: [
      "Full-Stack Developer",
      "Cloud & AI Systems Builder",
      "UI/UX & Creative Technologist",
      "Open Source Contributor"
    ],
    bio: "熱衷於打造兼具極致效能與現代美學的數位產品。專注於全端架構、現代前端工程、雲端服務與智慧 AI 應用整合。",
    avatar: "assets/avatar.svg",
    location: "Taipei, Taiwan",
    email: "todd.lin.dev@example.com",
    resumeUrl: "#resume",
    stats: [
      { number: "5+", label: "Years Experience" },
      { number: "30+", label: "Completed Projects" },
      { number: "99.9%", label: "System Uptime" }
    ],
    socials: [
      { name: "GitHub", icon: "github", url: "https://github.com" },
      { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com" },
      { name: "Twitter/X", icon: "twitter", url: "https://x.com" },
      { name: "Email", icon: "mail", url: "mailto:todd.lin.dev@example.com" }
    ]
  },

  about: {
    heading: "專注於工程細節與用戶體驗的結合",
    paragraphs: [
      "具備多年軟體開發與架構設計經驗，熱衷於探索最前端的網頁技術與雲端運算架構。從微服務後端 API 到精緻細膩的流暢前端介面，皆能以工程化思維提供最佳解法。",
      "在工作之餘，積極參與開源社群、研發自動化開發工具，並將人工智慧 LLM / Agentic 應用整合至日常工作流中。"
    ],
    quote: "「簡約是終極的細膩。」— 致力於打造簡潔優雅且具備強大擴展性的系統架構。",
    pillars: [
      {
        icon: "zap",
        title: "極致效能 (High Performance)",
        description: "深入調優前端渲染與後端查詢延遲，確保秒級載入與高併發承載能力。"
      },
      {
        icon: "layout",
        title: "精緻美學 (Modern UI/UX)",
        description: "重視微互動、響應式排版與無障礙設計，提供令人驚豔的使用者體驗。"
      },
      {
        icon: "cpu",
        title: "AI 智慧賦能 (AI & Agentic Tech)",
        description: "善用大型語言模型與代理人框架，加速產品自動化與智能化決策流程。"
      }
    ]
  },

  skillCategories: [
    {
      id: "frontend",
      title: "Frontend Engineering",
      icon: "layout",
      skills: ["React / Next.js", "TypeScript", "Vue 3", "TailwindCSS", "HTML5 & CSS3", "WebGL / Three.js", "Vite / Webpack"]
    },
    {
      id: "backend",
      title: "Backend & Systems",
      icon: "database",
      skills: ["Node.js / Express", "Python / FastAPI", "Go (Golang)", "PostgreSQL", "Redis", "GraphQL / REST", "Prisma / TypeORM"]
    },
    {
      id: "cloud-ai",
      title: "Cloud, DevOps & AI",
      icon: "cloud",
      skills: ["Docker & K8s", "AWS / GCP", "CI/CD Actions", "OpenAI / Claude API", "LangChain / LlamaIndex", "Vector DB (Pinecone)"]
    },
    {
      id: "tools",
      title: "Tools & Methodologies",
      icon: "tool",
      skills: ["Git & GitHub Workflow", "Linux / Shell", "System Architecture", "Agile / Scrum", "Figma Design", "Jest / Playwright"]
    }
  ],

  projects: [
    {
      id: "nexus-ai",
      title: "Nexus AI Workspace",
      category: "ai",
      categoryLabel: "AI & Cloud",
      badge: "Featured",
      image: "assets/project-nexus.svg",
      shortDesc: "次世代多模態 AI 工作協同平台，整合自主代理人、即時知識庫檢索與智能代碼審查。",
      longDesc: "Nexus AI 是一個專為研發團隊設計的智慧協同平台，支援多 Agent 自動分工、動態 Context 管理與向量知識庫即時檢索 (RAG)，大幅縮短團隊 40% 以上的重構與調研時間。",
      features: [
        "支援多模型切換 (GPT-4o, Claude 3.5, Gemini 1.5 Pro)",
        "自主工作流排程與背景異步任務監控",
        "端到端加密與企業級權限控管 (RBAC)",
        "直覺的視覺化工作流程畫布 (Flow Canvas)"
      ],
      tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "LangChain", "Docker"],
      liveUrl: "https://example.com/nexus",
      sourceUrl: "https://github.com/example/nexus-ai"
    },
    {
      id: "hyper-dashboard",
      title: "HyperMetrics Analytics",
      category: "fullstack",
      categoryLabel: "Full-Stack",
      badge: "Hot",
      image: "assets/project-hyper.svg",
      shortDesc: "高併發分散式即時數據監控系統，每秒處理數萬筆指標與視覺化圖表。",
      longDesc: "採用 ClickHouse 結合 WebSocket 串流技術建構的即時指標監控面板，提供自訂報表、自適應警報系統與多維度篩選分析，為電商與 SaaS 產品提供即時洞察。",
      features: [
        "次毫秒級數據即時渲染圖表 (Chart.js / Canvas)",
        "即時異常檢測與 Telegram / Slack 警報推送",
        "自適應暗黑/明亮主題與個人化面板佈局"
      ],
      tags: ["Next.js", "Node.js", "ClickHouse", "Redis", "WebSocket", "Tailwind"],
      liveUrl: "https://example.com/hypermetrics",
      sourceUrl: "https://github.com/example/hypermetrics"
    },
    {
      id: "zenith-ui",
      title: "Zenith Design System",
      category: "frontend",
      categoryLabel: "Frontend / UI",
      badge: "Open Source",
      image: "assets/project-zenith.svg",
      shortDesc: "輕量化、極致無障礙 (A11y) 與高自訂性的現代 Glassmorphism 元件庫。",
      longDesc: "Zenith UI 是一套注重視覺質感與開發者體驗的 React 元件庫，支援完整的鍵盤導航、流暢微動畫與多套主題配色，已被超過 50+ 專案採用。",
      features: [
        "100% 完整 TypeScript 型別支援",
        "符合 WAI-ARIA 無障礙標準 (WCAG AAA)",
        "極小打包體積 (< 15kb gzip)，零外部肥大依賴"
      ],
      tags: ["TypeScript", "React", "Vanilla CSS", "Storybook", "Rollup"],
      liveUrl: "https://example.com/zenith-ui",
      sourceUrl: "https://github.com/example/zenith-ui"
    },
    {
      id: "cloud-sentinel",
      title: "CloudSentinel CLI & Bot",
      category: "fullstack",
      categoryLabel: "Full-Stack & DevOps",
      badge: "Tooling",
      image: "assets/project-sentinel.svg",
      shortDesc: "雲端基礎設施自動化健檢與資安漏洞掃描工具，支援 AWS & GCP 多帳戶治理。",
      longDesc: "基於 Go 語言打造的高速 CLI 工具，自動稽核 IAM 權限過度授予、未加密 S3 Bucket 與閒置資源，生成可執行的修復建議報告。",
      features: [
        "秒級完成百台雲端實例配置掃描",
        "整合 GitHub Actions 自動化 CI/CD 安全閥門",
        "生成互動式 HTML 資安體檢報表"
      ],
      tags: ["Go", "AWS SDK", "GCP API", "Docker", "CLI"],
      liveUrl: "https://example.com/sentinel",
      sourceUrl: "https://github.com/example/cloud-sentinel"
    }
  ],

  experience: [
    {
      role: "Senior Full-Stack Engineer",
      company: "TechCorp Global • Taipei",
      period: "2023 — Present",
      description: "主導核心 SaaS 產品微服務架構升級，將整體系統吞吐量提升 300%，帶領 6 人研發小組推進現代化前端重構與自動化測試管線。",
      techs: ["React", "TypeScript", "Go", "Kubernetes", "AWS", "PostgreSQL"]
    },
    {
      role: "Frontend Team Lead",
      company: "InnovateX Solutions",
      period: "2021 — 2023",
      description: "負責多個大型企業級儀表板開發，建置共用 UI 元件庫與前端效能監控體系，降低首屏載入時間 45%。",
      techs: ["Vue 3", "TypeScript", "Node.js", "Vite", "GraphQL", "Tailwind"]
    },
    {
      role: "Software Engineer",
      company: "PixelCraft Studio",
      period: "2019 — 2021",
      description: "參與多項互動式網頁與行動應用開發，實現流暢的 WebGL 動畫與高效能 RESTful API 後端服務。",
      techs: ["JavaScript", "Python", "FastAPI", "Docker", "MySQL"]
    }
  ]
};
