import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log('AuthCallback: Starting auth callback process');
      console.log('AuthCallback: Current URL:', window.location.href);
      console.log('AuthCallback: URL params:', window.location.search);
      
      try {
        // For magic links, we just need to get the session - Supabase handles the token exchange automatically
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('AuthCallback: Session check result:', { session: !!session, error });
        
        if (error) {
          console.error('AuthCallback: Session error:', error);
          throw error;
        }

        if (session?.user) {
          console.log('AuthCallback: User found, redirecting to dashboard');
          toast({
            title: "Welcome!",
            description: "You've successfully signed in.",
          });
          navigate("/dashboard");
        } else {
          console.log('AuthCallback: No session found, redirecting to login');
          // No session found, redirect to login
          navigate("/login");
        }
      } catch (error: any) {
        console.error('AuthCallback: Error during auth callback:', error);
        toast({
          title: "Authentication failed",
          description: error.message,
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure URL parameters are processed
    const timer = setTimeout(handleAuthCallback, 100);
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Completing sign in...</p>
        </div>
      </div>
    );
  }

  return null;
}