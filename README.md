# JobSeekerAI 🤖💼

**An Intelligent Career Assistant Built with Mastra A2A Protocol & Telex Integration**

[![Mastra](https://img.shields.io/badge/Built%20with-Mastra-blue)](https://mastra.ai)
[![A2A Protocol](https://img.shields.io/badge/A2A%20Protocol-Compliant-green)](https://a2a-protocol.org)
[![Telex](https://img.shields.io/badge/Telex-Integrated-orange)](https://telex.im)
[![HNG Internship](https://img.shields.io/badge/HNG-Internship-red)](https://hng.tech/internship)

## 🌟 Overview

JobSeekerAI is an intelligent career assistant that helps job seekers discover opportunities and receive personalized guidance. Built as part of the HNG Internship, it combines real-time job market data with AI-powered analysis to provide actionable career insights.

## ✨ Features

- 🔍 **Real-time Job Search** - Fetches live job listings using JSearch API
- 📊 **Skill Gap Analysis** - Compares your skills with market demands
- 💡 **Personalized Recommendations** - Suggests skills to learn and resume improvements
- 🎯 **Career Guidance** - Provides actionable career advice based on market trends
- 🤖 **AI-Powered** - Uses Google Gemini for intelligent analysis
- 🔄 **Telex Integration** - Seamlessly integrates with Telex workflows via A2A protocol

## 🛠️ Tech Stack

- **Framework**: Mastra
- **AI Model**: Google Gemini 2.0 Flash
- **Protocol**: A2A (Agent-to-Agent)
- **APIs**: JSearch (Job listings), RapidAPI
- **Integration**: Telex workflows
- **Deployment**: Mastra Cloud
- **Language**: TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Mastra Cloud account
- JSearch API key (from RapidAPI)
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/jobseeker-ai.git
cd jobseeker-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```env
# .env
JSEARCH_API_KEY=your_rapidapi_key_here
GOOGLE_API_KEY=your_gemini_api_key_here
```

4. **Run locally**
```bash
npm run dev
```

### Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Mastra Cloud**
```bash
npx mastra deploy
```

## 📁 Project Structure

```
jobseeker-ai/
├── src/
│   ├── agents/
│   │   └── jobseeker-agent.ts
│   ├── tools/
│   │   ├── job-search-tool.ts
│   │   └── skill-analysis-tool.ts
│   ├── routes/
│   │   └── a2a-agent-route.ts
│   └── config/
│       └── mastra-config.ts
├── package.json
├── tsconfig.json
└── .env
```

## 🔗 API Integration

### A2A Endpoint
```
POST https://your-app.mastra.cloud/a2a/agent/jobSeekerAgent
```

### Example Request
```json
{
  "jsonrpc": "2.0",
  "id": "test-001",
  "method": "message/send",
  "params": {
    "message": {
      "kind": "message",
      "role": "user",
      "parts": [{
        "kind": "text",
        "text": "Find AI engineer jobs in Europe"
      }]
    }
  }
}
```

## 🎯 Telex Integration

Add this workflow to your Telex instance:

```json
{
  "name": "jobseeker_agent",
  "description": "Get job search support and career guidance",
  "nodes": [{
    "id": "jobseeker_agent",
    "name": "jobseeker agent",
    "type": "a2a/mastra-a2a-node",
    "url": "https://your-app.mastra.cloud/a2a/agent/jobSeekerAgent"
  }]
}
```

## 💡 Usage Examples

**Job Search:**
```
"Find machine learning jobs in Berlin"
```

**Skill Analysis:**
```
"Analyze my skills: Python, React, AWS"
```

**Career Advice:**
```
"What skills should I learn for data science?"
```
## Testing with postman 

### Request body

```
json

{
  "jsonrpc":"2.0",
  "id":"exec-001",
  "method":"message/send",
  "params":{
    "messages":[
      {
        "kind":"message",
        "taskId":"task-001",
        "messageId":"msg-001",
        "role":"user",
        "parts":[ { "kind":"text", "text": { "message":"I am skillful machine learning engineer with skills in deep learning,NLP,CV,python ,MERN looking for job in any european country remotely" } } ]
      }
    ],
    "contextId":"ctx-001",
    "taskId":"task-001"
  }
}
```
## sample response
```
{
  "jsonrpc": "2.0",
  "id": "17007e60df1d42efa34d97fef20c5427",
  "result": {
    "id": "a92a07cf-39ed-4a1f-82d4-ffa33a5cff56",
    "contextId": "a79d7fd4-b31f-45a9-9eaa-f54d2645a932",
    "status": {
      "state": "completed",
      "timestamp": "2025-11-04T09:50:59.060Z",
      "message": {
        "messageId": "c906de8f-11e0-4778-8070-e88d5a3479f6",
        "role": "agent",
        "parts": [
          {
            "kind": "text",
            "text": "I am here and ready to help! I apologize for the delay.\n\nI will search for remote machine learning engineer positions in Europe. To start, could you list a few specific countries you'd prefer, or should I search across all of Europe? Also, are you interested in full-time, part-time, or contract positions?\n"
          }
        ],
        "kind": "message"
      }
    },
    "artifacts": [
      {
        "artifactId": "4bdac2ab-8bf8-4ec7-8473-1baf2b5eea46",
        "name": "jobSeekerAgentResponse",
        "parts": [
          {
            "kind": "text",
            "text": "I am here and ready to help! I apologize for the delay.\n\nI will search for remote machine learning engineer positions in Europe. To start, could you list a few specific countries you'd prefer, or should I search across all of Europe? Also, are you interested in full-time, part-time, or contract positions?\n"
          }
        ]
      }
    ],
    "history": [
      {
        "kind": "message",
        "role": "user",
        "parts": [
          {
            "kind": "text",
            "text": "I am skillful machine learning engineer with skills in deep learning, NLP, CV, python, MERN looking for job in any european country remotely."
          },
          {
            "kind": "data",
            "data": [
              {
                "kind": "text",
                "text": "<p>I am skillful machine learning engineer with skills in deep learning,NLP,CV,python ,MERN looking for job in any european country remotely</p><p></p>"
              },
              {
                "kind": "text",
                "text": "I'll help you find remote job opportunities for machine learning engineers in Europe!"
              },
              {
                "kind": "text",
                "text": "<p>why not responding</p><p></p>"
              },
              {
                "kind": "text",
                "text": "why not responding"
              }
            ]
          }
        ],
        "messageId": "03ce4c78d5ed4a6dbd4e566391ee587c",
        "taskId": "02d6dae3-73ba-4a17-b703-ca745d4a24b9"
      },
      {
        "kind": "message",
        "role": "agent",
        "parts": [
          {
            "kind": "text",
            "text": "I am here and ready to help! I apologize for the delay.\n\nI will search for remote machine learning engineer positions in Europe. To start, could you list a few specific countries you'd prefer, or should I search across all of Europe? Also, are you interested in full-time, part-time, or contract positions?\n"
          }
        ],
        "messageId": "288d39a4-cedf-428e-9e84-022ad2a76da9",
        "taskId": "ff47747f-d694-4719-a897-0dad1dfc2090"
      }
    ],
    "kind": "task"
  }
}
```


## 🎓 HNG Internship

This project was built as part of the **HNG Internship** program, demonstrating:
- ✅ Mastra A2A protocol implementation
- ✅ Telex workflow integration  
- ✅ Real-world API integration
- ✅ Production deployment skills
- ✅ AI agent development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [HNG Internship](https://hng.tech/internship) for the opportunity
- [Mastra](https://mastra.ai) for the excellent framework
- [Telex](https://telex.im) for workflow integration
- [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) for job data

## 📞 Support

For support or questions:
- Open an issue on GitHub
- Reach out via [HNG Internship Slack](https://hng-tech.slack.com)

---

**Built with ❤️ for the HNG Internship Community**

*Help job seekers find their dream careers! 🚀*