
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Send, MessageCircle, Bot, User, Sparkles, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your cozy AI study companion for Anna University exam preparation. I can help you with 2-mark and 16-mark answers based on university evaluation patterns. What would you like to know? ☕",
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDkbEjn21-DvyI795K4fR1N5irLt1Is2H0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a friendly, cozy AI study companion specialized in Anna University exam preparation. Please provide educational answers in the Anna University evaluation format. If the question is suitable for a 2-mark answer, provide a concise response with key points. If it requires a detailed explanation, structure it as a 16-mark answer with introduction, detailed explanation, examples, and conclusion.

Question: ${currentQuestion}

Please format your response appropriately for Anna University evaluation standards with a warm, friendly tone.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
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
        title: "Oops! Something went wrong",
        description: "I'm having trouble connecting right now. Please try again in a moment. ☕",
        variant: "destructive"
      });
      
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment. Don't worry, I'll be back to help you soon! ☕",
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
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-educational-50 to-success-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-warm-200 sticky top-0 z-50">
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
            <Badge variant="outline" className="text-warm-600 border-warm-300">
              <Coffee className="h-3 w-3 mr-1" />
              Cozy Mode
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 text-educational-900 flex items-center justify-center">
            <MessageCircle className="h-10 w-10 mr-3" />
            Your Cozy AI Study Session
          </h1>
          <p className="text-xl text-gray-600">
            Ask me anything about your subjects - I'll help you understand and excel! ☕
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chat Messages */}
            <Card className="h-96 overflow-hidden shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-educational-600 to-success-600 ml-3' 
                            : 'bg-gradient-to-r from-warm-600 to-educational-600 mr-3'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl p-4 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-educational-600 to-success-600 text-white' 
                            : 'bg-white border border-warm-200 shadow-sm'
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
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-warm-600 to-educational-600 flex items-center justify-center mr-3">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="bg-white border border-warm-200 rounded-2xl p-4 shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-educational-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-success-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-warm-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Message Input */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about your subjects... 📚"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-warm-200 focus:border-educational-400 bg-white/50"
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
                  <Coffee className="h-3 w-3 mr-1" />
                  Get structured answers in 2-mark and 16-mark formats as per Anna University evaluation pattern
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
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
                      className="w-full text-left h-auto p-3 hover:bg-educational-50 border-warm-200 text-sm"
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
              
              <Card className="text-center p-4 shadow-lg bg-gradient-to-r from-success-50 to-warm-50">
                <div className="w-12 h-12 bg-gradient-to-r from-success-600 to-warm-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">16M</span>
                </div>
                <h3 className="font-semibold text-educational-900 mb-2">16-Mark Answers</h3>
                <p className="text-sm text-gray-600">Detailed explanations with examples</p>
              </Card>
              
              <Card className="text-center p-4 shadow-lg bg-gradient-to-r from-warm-50 to-educational-50">
                <div className="w-12 h-12 bg-gradient-to-r from-warm-600 to-educational-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Coffee className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-educational-900 mb-2">Cozy Learning</h3>
                <p className="text-sm text-gray-600">Warm, friendly study environment</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <Card className="mt-8 shadow-lg bg-gradient-to-r from-warm-100 to-educational-100">
          <CardHeader>
            <CardTitle className="text-lg text-educational-900 flex items-center">
              <Coffee className="h-5 w-5 mr-2" />
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
