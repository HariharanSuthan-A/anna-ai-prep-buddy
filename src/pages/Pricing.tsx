
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft, 
  Check, 
  Star, 
  Sparkles,
  CreditCard,
  Shield,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactionId, setTransactionId] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGooglePay = () => {
    // Google Pay deeplink for ₹49
    const upiId = "hariharansuthan05@okaxis"; // Replace with your UPI ID
    const amount = "49.00";
    const note = "Stubud.io Premium Subscription";
    
    const googlePayUrl = `upi://pay?pa=${upiId}&pn=Stubud.io&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    
    // Try to open Google Pay, fallback to general UPI
    window.location.href = googlePayUrl;
    
    toast({
      title: "Payment Initiated",
      description: "Please complete the payment and enter your transaction ID below for verification.",
    });
  };

  const handleVerificationSubmit = async () => {
    if (!transactionId.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both transaction ID and email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send verification email to admin
      const emailBody = `
New Premium Subscription Verification Request

Transaction ID: ${transactionId}
User Email: ${email}
Amount: ₹49
Timestamp: ${new Date().toLocaleString()}

Please verify and activate the premium subscription for this user.
      `;

      // Create mailto link
      const mailtoLink = `mailto:hariharansuthan05@gmail.com?subject=Stubud.io Premium Verification - ${transactionId}&body=${encodeURIComponent(emailBody)}`;
      
      window.location.href = mailtoLink;

      toast({
        title: "Verification Submitted",
        description: "Your verification request has been sent. You'll receive confirmation within 24 hours.",
      });

      setTransactionId("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <span className="text-xl lg:text-2xl font-bold text-educational-900">Stubud.io</span>
                  <p className="text-xs text-educational-600 hidden sm:block">Pricing Plans</p>
                </div>
              </div>
            </div>
            
            <Badge className="bg-gradient-to-r from-educational-600 to-success-600 text-white px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Choose Your Plan</span>
              <span className="sm:hidden">Plans</span>
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-educational-900">
            Choose Your **Learning Plan**
          </h1>
          <p className="text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto">
            Start for **free** or unlock unlimited access with our affordable premium plan
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <Card className="border-2 border-educational-200 hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-educational-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-educational-600" />
              </div>
              <CardTitle className="text-2xl text-educational-900">**Free Plan**</CardTitle>
              <div className="text-4xl font-bold text-educational-900">₹0</div>
              <p className="text-educational-600">Perfect for trying out</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>**3** x 2-mark answers per day</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>**2** x 16-mark answers per day</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>Anna University format</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>Basic AI assistance</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/chat')}
                className="w-full bg-educational-600 hover:bg-educational-700 text-white mt-6"
              >
                Start Free
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-success-400 relative hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-success-50/50 to-background">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-success-600 to-educational-600 text-white px-4 py-1">
                <Star className="h-3 w-3 mr-1" />
                **Most Popular**
              </Badge>
            </div>
            <CardHeader className="text-center pb-4 pt-8">
              <div className="w-16 h-16 bg-gradient-to-r from-success-100 to-educational-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-success-600" />
              </div>
              <CardTitle className="text-2xl text-educational-900">**Premium Plan**</CardTitle>
              <div className="text-4xl font-bold text-success-600">₹49</div>
              <p className="text-educational-600">**Unlimited access** for 30 days</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>**Unlimited** 2-mark answers</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>**Unlimited** 16-mark answers</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>**Priority** AI responses</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>**Advanced** formatting</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-success-600 mr-3" />
                  <span>**24/7** support</span>
                </div>
              </div>
              <Button 
                onClick={handleGooglePay}
                className="w-full bg-gradient-to-r from-success-600 to-educational-600 hover:from-success-700 hover:to-educational-700 text-white mt-6"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pay with Google Pay
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Verification Section */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-educational-900 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              **Payment Verification**
            </CardTitle>
            <p className="text-foreground/70">
              After completing payment, enter your transaction details for **instant activation**
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-educational-900 mb-2">
                **Transaction ID**
              </label>
              <Input
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your UPI transaction ID"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-educational-900 mb-2">
                **Email Address**
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleVerificationSubmit}
              disabled={isSubmitting || !transactionId.trim() || !email.trim()}
              className="w-full bg-educational-600 hover:bg-educational-700 text-white"
            >
              {isSubmitting ? "Submitting..." : "**Submit for Verification**"}
            </Button>
            <p className="text-xs text-foreground/60 text-center">
              Verification usually takes **less than 24 hours**. You'll receive confirmation via email.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-educational-900">
            **Frequently Asked Questions**
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold text-educational-900 mb-2">**How does the free plan work?**</h3>
                <p className="text-foreground/70">You get **3 daily 2-mark answers** and **2 daily 16-mark answers**. Perfect for trying out our service!</p>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold text-educational-900 mb-2">**How long does verification take?**</h3>
                <p className="text-foreground/70">Usually **within 24 hours**. We'll send you an email confirmation once your premium access is activated.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
