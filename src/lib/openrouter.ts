const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'deepseek/deepseek-r1-0528:free';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  userContext?: {
    totalBalance?: number;
    monthlyIncome?: number;
    monthlyExpenses?: number;
    goals?: any[];
    recentTransactions?: any[];
  }
): Promise<ChatResponse> {
  if (!API_KEY) {
    return { 
      message: "AI service is not configured. Please check your API settings.", 
      error: "Missing API key" 
    };
  }

  try {
    // Add system context for financial advice
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a helpful AI financial advisor. You provide personalized financial advice based on user data. 
      
Current user context:
- Total Balance: ₹${userContext?.totalBalance?.toLocaleString() || 'N/A'}
- Monthly Income: ₹${userContext?.monthlyIncome?.toLocaleString() || 'N/A'}
- Monthly Expenses: ₹${userContext?.monthlyExpenses?.toLocaleString() || 'N/A'}
- Active Goals: ${userContext?.goals?.length || 0}
- Recent Transactions: ${userContext?.recentTransactions?.length || 0}

Provide helpful, actionable financial advice. Keep responses concise and practical. Use Indian Rupee (₹) for currency references.`
    };

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'BudgetWise AI Financial App'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from AI service');
    }

    return {
      message: data.choices[0].message.content.trim()
    };

  } catch (error) {
    console.error('OpenRouter API Error:', error);
    
    // Provide fallback responses for common queries
    const userMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
    
    if (userMessage.includes('budget') || userMessage.includes('expense')) {
      return {
        message: "I'd recommend following the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Based on your current spending patterns, you might want to review your discretionary expenses.",
        error: "Using fallback response"
      };
    } else if (userMessage.includes('save') || userMessage.includes('saving')) {
      return {
        message: "Start by automating your savings - set up automatic transfers to a separate savings account. Even ₹5,000 per month can grow significantly over time with compound interest.",
        error: "Using fallback response"
      };
    } else if (userMessage.includes('invest') || userMessage.includes('investment')) {
      return {
        message: "Consider starting with SIP (Systematic Investment Plan) in diversified mutual funds. Start small with ₹1,000-2,000 monthly and gradually increase as your income grows.",
        error: "Using fallback response"
      };
    }
    
    return {
      message: "I'm having trouble connecting to the AI service right now. Please try again in a moment, or feel free to explore your dashboard for financial insights.",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function getFinancialAdvice(query: string, userContext?: any): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: query
    }
  ];

  const response = await sendChatMessage(messages, userContext);
  return response.message;
}

export async function analyzeSpendingPattern(transactions: any[]): Promise<string> {
  if (!transactions || transactions.length === 0) {
    return "I need some transaction data to analyze your spending patterns. Start by adding a few transactions to get personalized insights.";
  }

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const categoryBreakdown = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const category = t.category || 'Other';
      acc[category] = (acc[category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryBreakdown)
    .sort(([,a], [,b]) => b - a)[0];

  const query = `Analyze my spending: Total expenses ₹${totalExpenses.toLocaleString()}, top category is ${topCategory?.[0]} with ₹${topCategory?.[1]?.toLocaleString()}. Give me 3 specific tips to optimize my spending.`;

  return getFinancialAdvice(query);
}