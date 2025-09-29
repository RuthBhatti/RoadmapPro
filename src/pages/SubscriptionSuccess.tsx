import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      checkSubscription();
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      setSubscription(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to verify subscription status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to open subscription management",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-strong border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto p-4 bg-emerald-100 rounded-full w-fit mb-6">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <CardTitle className="text-3xl mb-2">Welcome to RoadmapPro!</CardTitle>
            <CardDescription className="text-lg">
              Your subscription has been successfully set up
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {subscription && (
              <div className="bg-gradient-card p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-4">Subscription Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">{subscription.plan_name}</span>
                  </div>
                  {subscription.in_trial && subscription.trial_end && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trial Ends:</span>
                      <span className="font-medium">
                        {new Date(subscription.trial_end).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {subscription.subscription_end && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Billing:</span>
                      <span className="font-medium">
                        {new Date(subscription.subscription_end).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-muted/50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">What's Next?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  Create your first AI-powered roadmap
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  Invite team members to collaborate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  Explore advanced features and integrations
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleContinue}
                className="bg-gradient-primary hover:shadow-glow transition-smooth flex-1"
                size="lg"
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                onClick={handleManageSubscription}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Subscription
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Need help getting started? Contact our support team for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}