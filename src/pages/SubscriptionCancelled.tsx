import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function SubscriptionCancelled() {
  const navigate = useNavigate();

  const handleBackToPricing = () => {
    navigate("/#pricing");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-strong border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto p-4 bg-orange-100 rounded-full w-fit mb-6">
              <XCircle className="h-12 w-12 text-orange-600" />
            </div>
            <CardTitle className="text-3xl mb-2">Subscription Cancelled</CardTitle>
            <CardDescription className="text-lg">
              Your subscription setup was cancelled and no charges were made
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <h4 className="font-semibold mb-3">No Problem!</h4>
              <p className="text-muted-foreground">
                You can return to our pricing page anytime to start your subscription. 
                Your 14-day free trial will still be available when you're ready.
              </p>
            </div>

            <div className="bg-gradient-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-3">Why Choose RoadmapPro?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  AI-powered task generation saves hours of planning
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Real-time collaboration keeps teams aligned
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  14-day free trial with no credit card required
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Cancel anytime, no long-term commitments
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleBackToPricing}
                className="bg-gradient-primary hover:shadow-glow transition-smooth flex-1"
                size="lg"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={handleBackToHome}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Have questions? Contact our support team - we're here to help!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}