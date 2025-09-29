import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionData {
  subscribed: boolean;
  product_id?: string;
  plan_name?: string;
  subscription_end?: string;
  trial_end?: string;
  in_trial?: boolean;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSubscription({ subscribed: false });
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Subscription check error:', error);
        setSubscription({ subscribed: false });
      } else {
        setSubscription(data);
      }
    } catch (error: any) {
      console.error('Subscription check failed:', error);
      setSubscription({ subscribed: false });
    } finally {
      setIsLoading(false);
    }
  };

  const openCustomerPortal = async () => {
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

  useEffect(() => {
    checkSubscription();

    // Listen for auth state changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          checkSubscription();
        } else if (event === 'SIGNED_OUT') {
          setSubscription({ subscribed: false });
        }
      }
    );

    // Auto-refresh subscription status every 5 minutes
    const interval = setInterval(checkSubscription, 5 * 60 * 1000);

    return () => {
      authSubscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return {
    subscription,
    isLoading,
    checkSubscription,
    openCustomerPortal,
    isSubscribed: subscription?.subscribed || false,
    inTrial: subscription?.in_trial || false,
    planName: subscription?.plan_name,
  };
};