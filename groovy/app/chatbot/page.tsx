'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useChat } from 'ai/react'
import Header from '@/components/header'
import { Footer } from '@/components/footer'
import { PaperAirplaneIcon, UserIcon } from '@heroicons/react/24/outline'

export default function ChatbotPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chatbot',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Bonjour ! Je suis votre assistant voyage GrooveNomad. 🎵 Dites-moi ce que vous recherchez : style de musique, budget, destination, période... Je peux vous proposer les meilleurs festivals et vous aider à organiser votre voyage !"
      }
    ]
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const renderMessageContent = (text: string) => {
    const lines = text.split('\n')
    const elements = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Détecter les titres (###)
      if (line.startsWith('### ')) {
        const title = line.replace('### ', '')
        elements.push(
          <h3 key={i} className="text-lg font-semibold text-gray-900 mb-2 mt-4">
            {title}
          </h3>
        )
        continue
      }
      
      // Détecter les liens vers les festivals (http://localhost:3000/festival/ID)
      const festivalLinkMatch = line.match(/http:\/\/localhost:3000\/festival\/([A-Z0-9]+)/)
      if (festivalLinkMatch) {
        const festivalId = festivalLinkMatch[1]
        const festivalName = line.match(/\*\*(.*?)\*\*/)?.[1] || `Festival ${festivalId}`
        const cleanLine = line.replace(/http:\/\/localhost:3000\/festival\/[A-Z0-9]+/, '').replace(/\*\*(.*?)\*\*/, `**${festivalName}**`)
        
        elements.push(
          <div key={i} className="mb-3">
            <div className="text-sm text-gray-700 mb-2">{cleanLine}</div>
            <a
              href={`/festival/${festivalId}`}
              className="inline-flex items-center px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
            >
              🎫 Voir le festival
            </a>
          </div>
        )
        continue
      }
      
      // Détecter les nouveaux liens de type "la page du festival" ou "voir le festival"
      const newLinkMatch = line.match(/(?:la page du festival|voir le festival|découvrir ce festival)/i)
      if (newLinkMatch) {
        // Chercher l'ID du festival dans les lignes précédentes
        let festivalId = null
        for (let j = i - 1; j >= 0; j--) {
          const prevLine = lines[j]
          const idMatch = prevLine.match(/http:\/\/localhost:3000\/festival\/([A-Z0-9]+)/)
          if (idMatch) {
            festivalId = idMatch[1]
            break
          }
        }
        
        if (festivalId) {
          const cleanLine = line.replace(/(?:la page du festival|voir le festival|découvrir ce festival)/i, '')
          elements.push(
            <div key={i} className="mb-3">
              <span className="text-sm text-gray-700">{cleanLine}</span>
              <a
                href={`/festival/${festivalId}`}
                className="inline-flex items-center px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors ml-2"
              >
                🎫 Voir le festival
              </a>
            </div>
          )
          continue
        }
      }
      
      // Détecter les listes avec tirets
      if (line.trim().startsWith('- ')) {
        const content = line.replace('- ', '')
        elements.push(
          <div key={i} className="flex items-start mb-2">
            <span className="text-purple-500 mr-2">•</span>
            <span className="text-sm text-gray-700">{content}</span>
          </div>
        )
        continue
      }
      
      // Détecter les sections avec emojis et gras
      if (line.includes('📍') || line.includes('📅') || line.includes('🎵') || line.includes('💰') || line.includes('🌐')) {
        elements.push(
          <div key={i} className="flex items-center mb-2 text-sm text-gray-700">
            <span className="mr-2">{line}</span>
          </div>
        )
        continue
      }
      
      // Texte normal avec formatage en gras
      if (line.trim()) {
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        elements.push(
          <p key={i} className="text-sm text-gray-700 mb-2 leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: formattedLine }} />
        )
      } else {
        elements.push(<div key={i} className="h-2"></div>)
      }
    }
    
    return elements
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl mt-25 font-bold tracking-tight text-gray-900">
            Assistant Voyage IA
          </h1>
          <p className="text-gray-600 mt-2">
            Parlez-moi de vos envies de festival et je vous proposerai le voyage parfait ! 🎵
          </p>
        </div>

        {/* Zone de chat style LLM */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[700px] mt-15 mb-20 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-4xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-purple-500 text-white ml-3' 
                      : 'bg-gray-200 text-gray-600 mr-3'
                  }`}>
                    {message.role === 'user' ? (
                      <UserIcon className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">AI</span>
                    )}
                  </div>
                  
                  {/* Message */}
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-3xl rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.role === 'user' ? (
                        <p className="text-sm">{message.content}</p>
                      ) : (
                        <div className="text-sm">
                          {renderMessageContent(message.content)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-4xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 mr-3 flex items-center justify-center">
                    <span className="text-sm font-bold">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block max-w-3xl rounded-2xl px-4 py-3 bg-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Décrivez vos envies de festival..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Conseils d'utilisation */}
{/*         <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            💡 Conseils pour obtenir les meilleures suggestions :
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Mentionnez vos styles de musique préférés (rock, électro, jazz...)</li>
            <li>• Indiquez votre budget approximatif</li>
            <li>• Précisez vos dates ou période souhaitée</li>
            <li>• Décrivez vos préférences d'hébergement (hôtel, camping, appartement...)</li>
            <li>• Mentionnez votre ville de départ pour les transports</li>
            <li>• Ou simplement dites "Bonjour" pour commencer !</li>
          </ul>
        </div> */}
      </div>

      <Footer />
    </div>
  )
}