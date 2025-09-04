import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import { ScrollArea } from './scroll-area';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  Loader2,
  Sparkles,
  TrendingUp,
  PieChart,
  Target,
  AlertCircle
} from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../../lib/openrouter';

interface ChatBotProps {
  userContext?: {
    totalBalance?: number;
    monthlyIncome?: number;
    monthlyExpenses?: number;
    goals?: any[];
    recentTransactions?: any[];
  };
  className?: string;
}

export default function ChatBot({ userContext, className = '' }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI Financial Advisor. I can help you with budgeting, saving strategies, investment advice, and analyzing your spending patterns. What would you like to know?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How can I save more money?",
    "Analyze my spending patterns",
    "Investment advice for beginners",
    "How to create an emergency fund?",
    "Best budgeting strategies",
    "Tax saving tips"
  ];

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage([...messages, userMessage], userContext);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (response.error) {
        console.warn('AI Response Warning:', response.error);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const formatMessage = (content: string) => {
    // Simple formatting for better readability
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/₹(\d+)/g, '<span class="font-semibold text-primary">₹$1</span>');
  };

  return (
    <Card className={`clean-card h-[600px] flex flex-col ${className}`}>
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <span className="text-lg font-heading">AI Financial Advisor</span>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className="badge-success text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <Badge className="badge-primary text-xs">
                DeepSeek R1
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={`${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'} text-xs font-bold`}>
                      {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground border border-border'
                  }`}>
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                    <div className="text-xs opacity-70 mt-2">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted border border-border rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Quick Questions */}
        <div className="border-t border-border p-4">
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-3"
                  onClick={() => handleSendMessage(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about your finances..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              className="flex-1 input-clean"
              disabled={isLoading}
            />
            <Button
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              onClick={handleVoiceInput}
              className="relative"
              disabled={isLoading}
              title="Voice input"
            >
              <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
              {isListening && (
                <div className="absolute inset-0 rounded-md bg-red-500/20 animate-ping"></div>
              )}
            </Button>
            <Button 
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="btn-primary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}