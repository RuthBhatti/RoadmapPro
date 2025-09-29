import { GitBranch, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <GitBranch className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">RoadmapPro</h3>
                <p className="text-sm text-muted-foreground">Collaborative Planning</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Empowering distributed teams to build better roadmaps together. 
              Combine AI intelligence with human creativity for project success.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="/roadmap/new" className="hover:text-foreground transition-colors">AI Assistant</a></li>
              <li><a href="/templates" className="hover:text-foreground transition-colors">Templates</a></li>
              <li><a href="/integrations" className="hover:text-foreground transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="/careers" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/support" className="hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 RoadmapPro. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground">
            Professional project management made simple
          </div>
        </div>
      </div>
    </footer>
  );
};