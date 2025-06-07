
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Send, MessageCircle, Bot, User, Sparkles, BookOpen, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [answerType, setAnswerType] = useState<"2mark" | "16mark">("2mark");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI study companion for Anna University exam preparation. I can help you with 2-mark and 16-mark answers based on university evaluation patterns. Select your preferred answer type and ask me anything!",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user" as const,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      const promptType = answerType === "2mark" 
        ? "Provide a concise 2-mark answer format with key points (maximum 2-3 sentences with bullet points if needed)"
        : "Provide a detailed 16-mark answer format with introduction, detailed explanation with examples, and conclusion (comprehensive response with proper structure)";

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDkbEjn21-DvyI795K4fR1N5irLt1Is2H0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional AI assistant specialized in Anna University exam preparation. ${promptType}

Question: ${currentQuestion}

Please format your response appropriately for Anna University evaluation standards with clear structure and academic language.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: answerType === "2mark" ? 512 : 1024,
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
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Connection Error",
        description: "I'm having trouble connecting right now. Please try again in a moment.",
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
    "What are the types of databases?",
    "Explain computer networks fundamentals"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-educational-50 via-background to-success-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-educational-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-educational-600 hover:text-educational-800 hover:bg-educational-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-educational-600 to-success-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-educational-900">StudyBuddy</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-educational-600 to-success-600 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Assistant
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold mb-2 text-educational-900 flex items-center justify-center">
            <MessageCircle className="h-10 w-10 mr-3" />
            AI Study Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Professional exam preparation with structured answers
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Answer Type Selection */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg text-educational-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Answer Type Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant={answerType === "2mark" ? "default" : "outline"}
                    onClick={() => setAnswerType("2mark")}
                    className={answerType === "2mark" 
                      ? "bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700" 
                      : "border-educational-300 hover:bg-educational-50"
                    }
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    2-Mark Answers
                  </Button>
                  <Button
                    variant={answerType === "16mark" ? "default" : "outline"}
                    onClick={() => setAnswerType("16mark")}
                    className={answerType === "16mark" 
                      ? "bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700" 
                      : "border-educational-300 hover:bg-educational-50"
                    }
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    16-Mark Answers
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  {answerType === "2mark" 
                    ? "Get concise answers with key points for quick revision"
                    : "Get detailed explanations with examples and comprehensive coverage"
                  }
                </p>
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="h-96 overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-educational-600 to-success-600 ml-3' 
                            : 'bg-gradient-to-r from-educational-600 to-success-600 mr-3'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div className={`rounded-xl p-4 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-educational-600 to-success-600 text-white' 
                            : 'bg-white border border-educational-200 shadow-sm'
                        }`}>
                          <p className="whitespace-pre-line text-sm leading-relaxed">
                            {message.text}
                          </p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-educational-100' : 'text-gray-500'
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
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-educational-600 to-success-600 flex items-center justify-center mr-3">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="bg-white border border-educational-200 rounded-xl p-4 shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-educational-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-success-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-educational-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Message Input */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about your subjects..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-educational-200 focus:border-educational-400 bg-white/50"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Get structured answers in {answerType === "2mark" ? "2-mark" : "16-mark"} format as per Anna University evaluation pattern
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm animate-scale-in">
              <CardHeader>
                <CardTitle className="text-lg text-educational-900 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left h-auto p-3 hover:bg-educational-50 border-educational-200 text-sm"
                      onClick={() => setInputMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features Info */}
            <div className="space-y-4">
              <Card className="text-center p-4 shadow-lg bg-gradient-to-r from-educational-50 to-success-50">
                <div className="w-12 h-12 bg-gradient-to-r from-educational-600 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2M</span>
                </div>
                <h3 className="font-semibold text-educational-900 mb-2">2-Mark Answers</h3>
                <p className="text-sm text-gray-600">Concise, direct answers with key points</p>
              </Card>
              
              <Card className="text-center p-4 shadow-lg bg-gradient-to-r from-success-50 to-educational-50">
                <div className="w-12 h-12 bg-gradient-to-r from-success-600 to-educational-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">16M</span>
                </div>
                <h3 className="font-semibold text-educational-900 mb-2">16-Mark Answers</h3>
                <p className="text-sm text-gray-600">Detailed explanations with examples</p>
              </Card>
              
              <Card className="text-center p-4 shadow-lg bg-gradient-to-r from-educational-50 to-success-50">
                <div className="w-12 h-12 bg-gradient-to-r from-educational-600 to-success-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-educational-900 mb-2">Professional Learning</h3>
                <p className="text-sm text-gray-600">Structured academic approach</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <Card className="mt-8 shadow-lg bg-gradient-to-r from-educational-100 to-success-100">
          <CardHeader>
            <CardTitle className="text-lg text-educational-900 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Study Tips for Anna University Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-educational-800">For 2-Mark Questions:</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Keep answers concise and to the point</li>
                  <li>• Use bullet points for clarity</li>
                  <li>• Include key terms and definitions</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-educational-800">For 16-Mark Questions:</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Structure with introduction and conclusion</li>
                  <li>• Provide detailed explanations with examples</li>
                  <li>• Use diagrams where applicable</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
