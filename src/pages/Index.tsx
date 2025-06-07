
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  MessageCircle, 
  BookOpen, 
  Target, 
  Users, 
  Sparkles, 
  ArrowRight,
  Star,
  Coffee,
  Heart,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description: "Get instant answers formatted for Anna University exams. Ask questions and receive structured 2-mark and 16-mark responses.",
      color: "educational"
    },
    {
      icon: BookOpen,
      title: "Subject Expertise",
      description: "Comprehensive coverage of all engineering subjects with evaluation pattern-based responses tailored for your success.",
      color: "success"
    },
    {
      icon: Target,
      title: "Exam-Focused",
      description: "Answers structured according to Anna University evaluation standards to help you score better in exams.",
      color: "warm"
    },
    {
      icon: Users,
      title: "Student-Friendly",
      description: "Designed by students, for students. A cozy and comfortable learning environment that feels like studying with a friend.",
      color: "educational"
    }
  ];

  const testimonials = [
    {
      name: "Priya R.",
      course: "CSE 3rd Year",
      text: "StudyBuddy helped me understand complex algorithms in a simple way. The AI answers are perfectly structured for exams!",
      rating: 5
    },
    {
      name: "Arjun M.",
      course: "ECE 2nd Year",
      text: "The cozy interface makes studying enjoyable. I love how the AI formats answers exactly like what professors expect.",
      rating: 5
    },
    {
      name: "Sneha K.",
      course: "IT 4th Year",
      text: "Perfect study companion! The quick questions feature saved me hours during exam preparation.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-educational-50 to-success-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-warm-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-educational-600 to-success-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-educational-900">StudyBuddy</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-educational-600 border-educational-300">
              <Coffee className="h-3 w-3 mr-1" />
              Cozy Learning
            </Badge>
            <Button 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 text-white"
            >
              Start Studying
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-warm-600 to-educational-600 text-white mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Study Companion
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-educational-900 leading-tight">
            Your Cozy
            <span className="bg-gradient-to-r from-educational-600 to-success-600 bg-clip-text text-transparent"> AI Study </span>
            Companion
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your study sessions with our warm, friendly AI assistant designed specifically for 
            <span className="font-semibold text-educational-700"> Anna University students</span>. 
            Get structured answers, exam preparation tips, and personalized learning support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 text-white px-8 py-6 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Chatting with AI
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-educational-300 text-educational-700 hover:bg-educational-50 px-8 py-6 text-lg"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Features
            </Button>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-educational-100 to-success-100 rounded-3xl p-8 animate-gentle-float">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-educational-600 to-success-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-educational-900">AI Study Assistant</span>
                  <Badge className="bg-success-100 text-success-700">Online</Badge>
                </div>
                <div className="text-left space-y-3">
                  <div className="bg-educational-50 rounded-lg p-3">
                    <p className="text-sm text-educational-800">
                      "Explain data structures with examples for 16-mark answer"
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong>Data Structures (16 Marks)</strong><br/>
                      1. Introduction: Data structures are ways to organize and store data...<br/>
                      2. Types: Linear (Arrays, Linked Lists) and Non-linear (Trees, Graphs)...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="bg-warm-100 text-warm-700 mb-4">
            <Heart className="h-3 w-3 mr-1" />
            Designed with Love
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-educational-900">
            Why Students Love StudyBuddy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of AI intelligence and cozy design, 
            tailored specifically for your academic success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  feature.color === 'educational' ? 'bg-educational-100 group-hover:bg-educational-200' :
                  feature.color === 'success' ? 'bg-success-100 group-hover:bg-success-200' :
                  'bg-warm-100 group-hover:bg-warm-200'
                }`}>
                  <feature.icon className={`h-8 w-8 transition-all duration-300 ${
                    feature.color === 'educational' ? 'text-educational-600 group-hover:text-educational-700' :
                    feature.color === 'success' ? 'text-success-600 group-hover:text-success-700' :
                    'text-warm-600 group-hover:text-warm-700'
                  }`} />
                </div>
                <CardTitle className="text-xl text-educational-900 group-hover:text-educational-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-educational-50 to-success-50 rounded-3xl mx-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-educational-900">
            How StudyBuddy Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, intuitive, and effective. Start your cozy study session in just a few clicks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-slide-in-left">
            <div className="w-20 h-20 bg-gradient-to-r from-educational-600 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3 text-educational-900">Ask Your Question</h3>
            <p className="text-gray-600">
              Type any academic question or choose from quick question templates designed for common exam topics.
            </p>
          </div>

          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-success-600 to-warm-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3 text-educational-900">AI Analyzes & Responds</h3>
            <p className="text-gray-600">
              Our AI understands Anna University patterns and crafts perfect 2-mark or 16-mark answers instantly.
            </p>
          </div>

          <div className="text-center animate-slide-in-right">
            <div className="w-20 h-20 bg-gradient-to-r from-warm-600 to-educational-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3 text-educational-900">Study & Excel</h3>
            <p className="text-gray-600">
              Review structured answers, save important responses, and ace your exams with confidence!
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/chat')}
            className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 text-white px-8 py-6 text-lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Try It Now - It's Free!
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-educational-900">
            Loved by Students Across Anna University
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who have transformed their study experience with StudyBuddy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warm-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-educational-600 to-success-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-educational-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.course}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-educational-600 to-success-600 text-white overflow-hidden relative">
          <CardContent className="p-12 text-center relative z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <Badge className="bg-white/20 text-white mb-6">
              <CheckCircle className="h-3 w-3 mr-1" />
              Ready to Excel?
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Cozy Study Journey Today
            </h2>
            
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join the growing community of successful Anna University students. 
              Get instant AI assistance, structured answers, and exam-ready responses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/chat')}
                className="bg-white text-educational-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Studying Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-educational-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-educational-600 to-success-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">StudyBuddy</span>
            </div>
            <p className="text-educational-200 mb-6 max-w-md mx-auto">
              Your cozy AI study companion, designed with love for Anna University students.
            </p>
            <div className="flex justify-center items-center space-x-6 text-educational-200">
              <span className="flex items-center">
                <Coffee className="h-4 w-4 mr-2" />
                Made with love
              </span>
              <span className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                For students
              </span>
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-powered
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
