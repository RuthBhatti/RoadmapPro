import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function EnvBanner() {
  const hasSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const hasSupabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (hasSupabaseUrl && hasSupabaseKey) {
    return null;
  }

  return (
    <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Missing Supabase configuration: Please set{" "}
        {!hasSupabaseUrl && "VITE_SUPABASE_URL"}
        {!hasSupabaseUrl && !hasSupabaseKey && " and "}
        {!hasSupabaseKey && "VITE_SUPABASE_PUBLISHABLE_KEY"} in your environment variables.
      </AlertDescription>
    </Alert>
  );
}