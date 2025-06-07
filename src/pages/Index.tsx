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
  CheckCircle,
  Brain,
  Award,
  Clock,
  Shield,
  Menu,
  X
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Advanced artificial intelligence tailored specifically for Anna University examination patterns and evaluation criteria.",
      color: "educational"
    },
    {
      icon: Target,
      title: "Precision Answers",
      description: "Get exactly what you need - structured 2-mark quick responses or comprehensive 16-mark detailed explanations.",
      color: "success"
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Designed to help you achieve top grades with answers formatted according to university standards.",
      color: "accent"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get immediate, well-structured responses that save valuable study time during exam preparation.",
      color: "educational"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      course: "Computer Science Engineering",
      year: "Final Year",
      text: "StudyBuddy transformed my exam preparation. The AI provides exactly the kind of structured answers that Anna University expects.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Arjun Krishnan",
      course: "Electronics & Communication",
      year: "Third Year", 
      text: "The 16-mark answer format is incredibly detailed and helped me understand complex concepts with practical examples.",
      rating: 5,
      avatar: "AK"
    },
    {
      name: "Sneha Reddy",
      course: "Information Technology",
      year: "Second Year",
      text: "Perfect for quick revision. The 2-mark answers are concise yet comprehensive, exactly what I need before exams.",
      rating: 5,
      avatar: "SR"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Questions Answered" },
    { number: "15,000+", label: "Students Helped" },
    { number: "200+", label: "Subjects Covered" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-educational-50/30 to-success-50/30">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-lg border-b border-educational-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-educational-600 to-success-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div>
                <span className="text-xl lg:text-2xl font-bold text-educational-900">**Stubud.io**</span>
                <p className="text-xs text-educational-600 hidden sm:block">AI Learning Assistant</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-educational-700 hover:text-educational-900 font-medium transition-colors">Features</a>
              <a href="#testimonials" className="text-educational-700 hover:text-educational-900 font-medium transition-colors">Reviews</a>
              <a href="#about" className="text-educational-700 hover:text-educational-900 font-medium transition-colors">About</a>
              <Button 
                onClick={() => navigate('/pricing')}
                variant="outline"
                className="border-educational-300 text-educational-700 hover:bg-educational-50 mr-2"
              >
                Pricing
              </Button>
              <Button 
                onClick={() => navigate('/chat')}
                className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 text-white px-6 py-2.5 shadow-lg"
              >
                Start Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-educational-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-educational-700 font-medium" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#testimonials" className="text-educational-700 font-medium" onClick={() => setIsMenuOpen(false)}>Reviews</a>
                <a href="#about" className="text-educational-700 font-medium" onClick={() => setIsMenuOpen(false)}>About</a>
                <Button 
                  onClick={() => {
                    navigate('/pricing');
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="border-educational-300 text-educational-700 hover:bg-educational-50 w-full"
                >
                  View Pricing
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/chat');
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 text-white w-full"
                >
                  Start Learning
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-educational-600 to-success-600 text-white mb-6 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              **AI-Powered Academic Excellence**
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-educational-900 leading-tight">
              **Master Anna University**
              <span className="bg-gradient-to-r from-educational-600 to-success-600 bg-clip-text text-transparent block"> 
                **Exams with AI**
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get precisely formatted answers for your engineering exams. Choose between **quick 2-mark responses** 
              or **comprehensive 16-mark explanations**, all structured according to 
              <span className="font-semibold text-educational-700"> **Anna University evaluation standards**</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/chat')}
                className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 text-white px-8 py-6 text-lg shadow-xl w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                **Start Free Trial**
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/pricing')}
                className="border-educational-300 text-educational-700 hover:bg-educational-50 px-8 py-6 text-lg w-full sm:w-auto"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                **View Pricing Plans**
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-educational-900 mb-1">**{stat.number}**</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <Badge className="bg-educational-100 text-educational-700 mb-4">
              <Shield className="h-3 w-3 mr-1" />
              **Premium Features**
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-educational-900">
              **Why Choose Stubud.io?**
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Experience **cutting-edge AI technology** designed specifically for **academic excellence** 
              and **examination success**.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    feature.color === 'educational' ? 'bg-educational-100 group-hover:bg-educational-200' :
                    feature.color === 'success' ? 'bg-success-100 group-hover:bg-success-200' :
                    'bg-accent-100 group-hover:bg-accent-200'
                  }`}>
                    <feature.icon className={`h-8 w-8 transition-all duration-300 ${
                      feature.color === 'educational' ? 'text-educational-600' :
                      feature.color === 'success' ? 'text-success-600' :
                      'text-accent-600'
                    }`} />
                  </div>
                  <CardTitle className="text-xl text-educational-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-educational-50/50 to-success-50/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-educational-900">
              **Simple. Intelligent. Effective.**
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Get started with **AI-powered learning** in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Ask Your Question",
                description: "Type any academic question or select from our curated question bank covering all engineering subjects."
              },
              {
                step: "02", 
                title: "Choose Answer Format",
                description: "Select 2-mark for quick, concise answers or 16-mark for detailed, comprehensive explanations."
              },
              {
                step: "03",
                title: "Get Perfect Answers",
                description: "Receive structured, university-standard responses that help you excel in your examinations."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-educational-600 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-educational-900">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-educational-600 to-success-600 hover:from-educational-700 hover:to-success-700 text-white px-8 py-6 text-lg shadow-xl"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              **Try It Now - Free**
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-educational-900">
              **Trusted by Students Across India**
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Join thousands of successful students who have transformed their academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 leading-relaxed text-lg">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-educational-600 to-success-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-educational-900 text-lg">{testimonial.name}</p>
                      <p className="text-sm text-foreground/70">{testimonial.course}</p>
                      <p className="text-xs text-foreground/60">{testimonial.year}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <Card className="bg-gradient-to-r from-educational-600 to-success-600 text-white overflow-hidden relative border-0">
            <CardContent className="p-8 lg:p-16 text-center relative z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              
              <Badge className="bg-white/20 text-white mb-6 px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                **Ready to Excel?**
              </Badge>
              
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                **Start Your Academic Journey Today**
              </h2>
              
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
                Join the growing community of **successful students**. Get **instant AI assistance**, 
                **structured answers**, and **examination-ready responses**.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/chat')}
                  className="bg-white text-educational-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold w-full sm:w-auto shadow-lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  **Start Free**
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/pricing')}
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto"
                >
                  **View Plans**
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-educational-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-educational-600 to-success-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl lg:text-3xl font-bold">**Stubud.io**</span>
            </div>
            <p className="text-educational-200 mb-8 max-w-md mx-auto text-lg">
              Your **AI-powered study companion** for **academic excellence** at Anna University.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-educational-200">
              <span className="flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered
              </span>
              <span className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Secure & Private
              </span>
              <span className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Academic Excellence
              </span>
            </div>
            <div className="mt-8 pt-8 border-t border-educational-800 text-educational-300 text-sm">
              <p>&copy; 2024 StudyBuddy. All rights reserved. Built for Anna University students.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
