'use client'

import { useState, useEffect } from 'react'
import { Terminal, Code, Database, Cloud } from 'lucide-react'

const codeSnippets = [
  {
    title: 'FastAPI Backend',
    icon: <Code className="h-4 w-4" />,
    language: 'python',
    code: `from fastapi import FastAPI, HTTPException
from sqlalchemy.orm import Session
from typing import List

app = FastAPI(title="API Service")

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "status": "active"}

@app.post("/users/")
async def create_user(user: UserCreate):
    # Business logic here
    return {"message": "User created"}`
  },
  {
    title: 'PostgreSQL Query',
    icon: <Database className="h-4 w-4" />,
    language: 'sql',
    code: `-- Optimized user analytics query
SELECT 
    u.id,
    u.name,
    COUNT(o.id) as order_count,
    AVG(o.total_amount) as avg_order
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0
ORDER BY avg_order DESC;`
  },
  {
    title: 'Docker Configuration',
    icon: <Cloud className="h-4 w-4" />,
    language: 'dockerfile',
    code: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`
  },
  {
    title: 'Microservice Architecture',
    icon: <Terminal className="h-4 w-4" />,
    language: 'python',
    code: `# Service orchestration
import asyncio
from typing import Dict, Any

class ServiceOrchestrator:
    def __init__(self):
        self.services = {}
    
    async def call_service(self, name: str, data: Dict):
        if name not in self.services:
            raise ServiceNotFound(f"Service {name} not found")
        
        return await self.services[name].process(data)
    
    async def health_check(self) -> Dict[str, Any]:
        results = {}
        for name, service in self.services.items():
            results[name] = await service.health()
        return results`
  }
]

export function TechShowcase() {
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false)
      setTimeout(() => {
        setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
        setIsTyping(true)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const snippet = codeSnippets[currentSnippet]

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Code Editor Header */}
      <div className="bg-gray-800 dark:bg-gray-900 rounded-t-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2 ml-4 text-gray-300 text-sm">
            {snippet.icon}
            <span>{snippet.title}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">{snippet.language}</div>
      </div>

      {/* Code Editor Body */}
      <div className="bg-gray-900 dark:bg-black rounded-b-lg p-4 min-h-[300px] font-mono text-sm overflow-hidden">
        <div className={`transition-opacity duration-500 ${isTyping ? 'opacity-100' : 'opacity-50'}`}>
          <pre className="text-gray-100 leading-relaxed">
            <code className="language-python">
              {snippet.code}
            </code>
          </pre>
        </div>
        
        {/* Typing Cursor */}
        <div className="flex items-center mt-2">
          <span className="text-green-400">❯</span>
          <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
        </div>
      </div>

      {/* Tech Stack Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {codeSnippets.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSnippet
                ? 'bg-blue-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Floating Tech Icons */}
      <div className="relative mt-8 h-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-6 text-gray-400 dark:text-gray-500 animate-pulse">
            <div className="text-xs text-center">
              <Database className="h-6 w-6 mx-auto mb-1" />
              <span>PostgreSQL</span>
            </div>
            <div className="text-xs text-center">
              <Code className="h-6 w-6 mx-auto mb-1" />
              <span>FastAPI</span>
            </div>
            <div className="text-xs text-center">
              <Cloud className="h-6 w-6 mx-auto mb-1" />
              <span>Docker</span>
            </div>
            <div className="text-xs text-center">
              <Terminal className="h-6 w-6 mx-auto mb-1" />
              <span>DevOps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 