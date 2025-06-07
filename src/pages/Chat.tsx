import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Send, MessageCircle, Bot, User, Sparkles, Menu, X, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for Anna University exam preparation. I can help you with structured answers based on university evaluation patterns. Choose between **2-mark quick responses** or **16-mark detailed explanations**. What would you like to know?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAnswerType, setSelectedAnswerType] = useState<"2mark" | "16mark" | null>(null);
  const [usageCount, setUsageCount] = useState({ twoMark: 0, sixteenMark: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Usage limits for free users
  const FREE_LIMITS = {
    twoMark: 3,
    sixteenMark: 2
  };

  // Load usage from localStorage on component mount
  useEffect(() => {
    const savedUsage = localStorage.getItem('stubud_usage');
    const lastResetDate = localStorage.getItem('stubud_last_reset');
    const today = new Date().toDateString();

    if (lastResetDate !== today) {
      // Reset daily usage
      setUsageCount({ twoMark: 0, sixteenMark: 0 });
      localStorage.setItem('stubud_usage', JSON.stringify({ twoMark: 0, sixteenMark: 0 }));
      localStorage.setItem('stubud_last_reset', today);
    } else if (savedUsage) {
      setUsageCount(JSON.parse(savedUsage));
    }
    setIsLoading(false);
  }, []);

  // Function to format text with bold
  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const checkUsageLimit = (answerType: "2mark" | "16mark") => {
    if (answerType === "2mark" && usageCount.twoMark >= FREE_LIMITS.twoMark) {
      return false;
    }
    if (answerType === "16mark" && usageCount.sixteenMark >= FREE_LIMITS.sixteenMark) {
      return false;
    }
    return true;
  };

  const updateUsageCount = (answerType: "2mark" | "16mark") => {
    const newUsage = {
      ...usageCount,
      [answerType === "2mark" ? "twoMark" : "sixteenMark"]: 
        usageCount[answerType === "2mark" ? "twoMark" : "sixteenMark"] + 1
    };
    setUsageCount(newUsage);
    localStorage.setItem('stubud_usage', JSON.stringify(newUsage));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      toast({
        title: "Please enter a question",
        description: "Type your question in the input field below.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedAnswerType) {
      toast({
        title: "Select answer format",
        description: "Please choose between **2-mark** or **16-mark** answer format.",
        variant: "destructive"
      });
      return;
    }

    // Check usage limits for free users
    if (!checkUsageLimit(selectedAnswerType)) {
      toast({
        title: "Daily limit reached",
        description: `You've reached your daily limit for ${selectedAnswerType} answers. Upgrade to premium for unlimited access!`,
        variant: "destructive"
      });
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user" as const,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputMessage;
    const currentAnswerType = selectedAnswerType;
    setInputMessage("");
    setIsTyping(true);

    try {
      const answerTypePrompt = selectedAnswerType === "2mark" 
        ? "Provide a concise, structured **2-mark answer** with key points. Keep it brief but comprehensive, suitable for quick revision."
        : "Provide a detailed, comprehensive **16-mark answer** with introduction, detailed explanation, examples, diagrams if applicable, and conclusion. Structure it with proper headings and subpoints.";

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDkbEjn21-DvyI795K4fR1N5irLt1Is2H0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an AI assistant specialized in Anna University exam preparation. ${answerTypePrompt}

Question: ${currentQuestion}

Please format your response appropriately for Anna University evaluation standards with proper structure and academic language. Use **text** for bold formatting.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: selectedAnswerType === "2mark" ? 512 : 2048,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. Please try again.";

      const aiMessage = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: "ai" as const,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update usage count
      updateUsageCount(currentAnswerType);
      setSelectedAnswerType(null); // Reset selection after sending
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
      
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "ai" as const,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "Explain data structures and their types",
    "What is algorithm complexity analysis?", 
    "Define operating system and its functions",
    "Explain object-oriented programming concepts",
    "What are the different types of networks?",
    "Explain database normalization"
  ];

  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-br from-background via-educational-50/30 to-success-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-educational-600 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-spin">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <p className="text-educational-600">Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-educational-50/30 to-success-50/30">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-lg border-b border-educational-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-educational-600 hover:text-educational-800 p-2"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-educational-600 to-success-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl lg:text-2xl font-bold text-educational-900">**Stubud.io**</span>
                  <p className="text-xs text-educational-600 hidden sm:block">AI Chat Assistant</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-success-600 to-educational-600 hover:from-success-700 hover:to-educational-700 text-white px-3 py-1.5 text-sm"
              >
                <Crown className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">**Upgrade**</span>
                <span className="sm:hidden">**Pro**</span>
              </Button>
              <Badge className="bg-gradient-to-r from-educational-600 to-success-600 text-white px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="sm:hidden">AI</span>
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-educational-900 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 lg:h-10 lg:w-10 mr-3" />
            **AI Chat Assistant**
          </h1>
          <p className="text-lg lg:text-xl text-foreground/80">
            Get answers in **Anna University evaluation format**
          </p>
        </div>

        {/* Usage Counter */}
        <Card className="mb-6 bg-gradient-to-r from-educational-50 to-success-50 border-educational-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-educational-900">**Daily Usage** (Free Plan)</h3>
                <p className="text-sm text-educational-600">Resets every day at midnight</p>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  <span className="font-medium">2-mark:</span> {usageCount.twoMark}/{FREE_LIMITS.twoMark}
                  <span className="mx-2">|</span>
                  <span className="font-medium">16-mark:</span> {usageCount.sixteenMark}/{FREE_LIMITS.sixteenMark}
                </div>
                <Button
                  onClick={() => navigate('/pricing')}
                  size="sm"
                  className="mt-2 bg-success-600 hover:bg-success-700 text-white"
                >
                  **Upgrade for Unlimited**
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Type Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-educational-900 flex items-center">
              <span>**Choose Answer Format**</span>
              {selectedAnswerType && (
                <Badge className="ml-3 bg-success-100 text-success-700">
                  {selectedAnswerType === "2mark" ? "**2-Mark Selected**" : "**16-Mark Selected**"}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant={selectedAnswerType === "2mark" ? "default" : "outline"}
                className={`h-auto p-4 text-left ${
                  selectedAnswerType === "2mark" 
                    ? "bg-educational-600 text-white" 
                    : "hover:bg-educational-50"
                } ${usageCount.twoMark >= FREE_LIMITS.twoMark ? "opacity-50" : ""}`}
                onClick={() => setSelectedAnswerType("2mark")}
                disabled={usageCount.twoMark >= FREE_LIMITS.twoMark}
              >
                <div>
                  <div className="font-semibold text-lg mb-1">**2-Mark Answer**</div>
                  <div className="text-sm opacity-80">Quick, concise responses with key points</div>
                  <div className="text-xs mt-1">
                    Remaining: {FREE_LIMITS.twoMark - usageCount.twoMark}
                  </div>
                </div>
              </Button>
              <Button
                variant={selectedAnswerType === "16mark" ? "default" : "outline"}
                className={`h-auto p-4 text-left ${
                  selectedAnswerType === "16mark" 
                    ? "bg-educational-600 text-white" 
                    : "hover:bg-educational-50"
                } ${usageCount.sixteenMark >= FREE_LIMITS.sixteenMark ? "opacity-50" : ""}`}
                onClick={() => setSelectedAnswerType("16mark")}
                disabled={usageCount.sixteenMark >= FREE_LIMITS.sixteenMark}
              >
                <div>
                  <div className="font-semibold text-lg mb-1">**16-Mark Answer**</div>
                  <div className="text-sm opacity-80">Detailed explanations with examples</div>
                  <div className="text-xs mt-1">
                    Remaining: {FREE_LIMITS.sixteenMark - usageCount.sixteenMark}
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-educational-900">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto p-3 hover:bg-educational-50 text-sm"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="h-64 sm:h-80 lg:h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-educational-600 ml-2' : 'bg-success-600 mr-2'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 lg:p-4 ${
                      message.sender === 'user' 
                        ? 'bg-educational-600 text-white' 
                        : 'bg-background border border-educational-200'
                    }`}>
                      <div 
                        className="whitespace-pre-line text-sm lg:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
                      />
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-educational-200' : 'text-foreground/60'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-success-600 flex items-center justify-center mr-2">
                      <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                    <div className="bg-background border border-educational-200 rounded-lg p-3 lg:p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask any question about your subjects..."
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                className="flex-1 min-h-[44px]"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping || !selectedAnswerType}
                className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 px-6 min-h-[44px] w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2 sm:mr-0" />
                <span className="sm:hidden">Send Message</span>
              </Button>
            </div>
            <p className="text-xs text-foreground/60 mt-2">
              Choose answer format above, then ask your question to get structured responses per **Anna University evaluation pattern**
            </p>
          </CardContent>
        </Card>

        {/* Features Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <Card className="text-center p-4 lg:p-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-educational-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-educational-600 font-bold text-lg lg:text-xl">2M</span>
            </div>
            <h3 className="font-semibold text-educational-900 mb-2">2-Mark Answers</h3>
            <p className="text-sm text-foreground/70">Concise, direct answers with key points</p>
          </Card>
          
          <Card className="text-center p-4 lg:p-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-success-600 font-bold text-lg lg:text-xl">16M</span>
            </div>
            <h3 className="font-semibold text-educational-900 mb-2">16-Mark Answers</h3>
            <p className="text-sm text-foreground/70">Detailed explanations with examples</p>
          </Card>
          
          <Card className="text-center p-4 lg:p-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-accent-600" />
            </div>
            <h3 className="font-semibold text-educational-900 mb-2">AI-Powered</h3>
            <p className="text-sm text-foreground/70">Evaluation pattern based responses</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
