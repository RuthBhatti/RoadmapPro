import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Zap, Building, Users, Crown, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [showBusinessDialog, setShowBusinessDialog] = useState(false);

  // Stripe price IDs
  const PRICE_IDS = {
    pro: "price_1SC8v2AHlP5lTq1ohPDSURex",
    business: "price_1SC8vcAHlP5lTq1o4fFS5lre"
  };

  const handleGetStarted = async (plan: "pro" | "business") => {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to start your subscription.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (plan === "business") {
      setShowBusinessDialog(true);
      return;
    }

    await createCheckoutSession(plan);
  };

  const createCheckoutSession = async (plan: "pro" | "business") => {
    setIsLoading(plan);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: PRICE_IDS[plan],
          businessName: plan === "business" ? businessName : undefined
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open checkout in new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setIsLoading("");
      setShowBusinessDialog(false);
      setBusinessName("");
    }
  };

  const features = {
    pro: [
      "Up to 10 active roadmaps",
      "AI-powered task generation",
      "Basic team collaboration (5 members)",
      "Email support",
      "Standard integrations",
      "Project templates",
      "Basic analytics"
    ],
    business: [
      "Unlimited roadmaps",
      "Advanced AI task optimization",
      "Unlimited team members",
      "Priority support & dedicated success manager",
      "Advanced integrations + custom webhooks",
      "Custom templates & branding",
      "Advanced analytics & reporting",
      "SSO & enterprise security",
      "API access",
      "Custom training sessions"
    ]
  };

  const pricing = {
    pro: {
      monthly: 29,
      yearly: Math.round(29 * 12 * 0.95),
      yearlyMonthly: Math.round(29 * 0.95)
    },
    business: {
      monthly: 199,
      yearly: Math.round(199 * 12 * 0.95),
      yearlyMonthly: Math.round(199 * 0.95)
    }
  };

  return (
    <>
      <section id="pricing" className="py-24 px-4 bg-gradient-subtle">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your team. Start with a 14-day free trial.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="ml-2">
                Save 5%
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pro Plan */}
            <Card className="relative bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto p-3 bg-gradient-primary rounded-full w-fit mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <CardDescription className="text-lg">Perfect for individuals and small teams</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">
                    ${isYearly ? pricing.pro.yearlyMonthly : pricing.pro.monthly}
                  </span>
                  <span className="text-xl text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {isYearly ? `$${pricing.pro.yearly} billed annually` : 'Billed monthly'}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {features.pro.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                  size="lg"
                  onClick={() => handleGetStarted("pro")}
                  disabled={isLoading === "pro"}
                >
                  {isLoading === "pro" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Start 14-Day Free Trial
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  No credit card required for trial • Cancel anytime
                </p>
              </CardContent>
            </Card>

            {/* Business Pro Plan */}
            <Card className="relative bg-gradient-card border-0 shadow-glow ring-2 ring-primary/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-primary text-primary-foreground px-6 py-1 text-sm font-medium">
                  <Crown className="h-4 w-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <div className="mx-auto p-3 bg-gradient-primary rounded-full w-fit mb-4">
                  <Building className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2">Business Pro</CardTitle>
                <CardDescription className="text-lg">For growing teams and enterprises</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">
                    ${isYearly ? pricing.business.yearlyMonthly : pricing.business.monthly}
                  </span>
                  <span className="text-xl text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {isYearly ? `$${pricing.business.yearly} billed annually` : 'Billed monthly'}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {features.business.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                  size="lg"
                  onClick={() => handleGetStarted("business")}
                  disabled={isLoading === "business"}
                >
                  {isLoading === "business" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Start 14-Day Free Trial
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  No credit card required for trial • Dedicated onboarding
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-card border-0 shadow-soft max-w-3xl mx-auto">
              <CardContent className="pt-12 pb-12">
                <h3 className="text-2xl font-bold mb-4">Need Something Custom?</h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Large enterprise? Custom requirements? Let's build a solution that fits your needs.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" size="lg">
                    Schedule Demo
                  </Button>
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Name Dialog */}
      <Dialog open={showBusinessDialog} onOpenChange={setShowBusinessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Business Information</DialogTitle>
            <DialogDescription>
              Please provide your business name for billing and account setup.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBusinessDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => createCheckoutSession("business")}
              disabled={!businessName.trim() || isLoading === "business"}
            >
              {isLoading === "business" ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Continue to Checkout"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};