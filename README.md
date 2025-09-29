# RoadmapPro - AI-Powered Project Management

A modern, collaborative project management platform that combines AI intelligence with human creativity to build better roadmaps together.

## 🚀 Features

- **AI-Powered Task Generation**: Define high-level goals and let AI suggest detailed tasks, dependencies, and timelines
- **Real-time Collaboration**: Team members can collaborate in real-time with instant updates
- **Visual Timeline Management**: Beautiful Gantt charts and Kanban boards for project visualization
- **Team Management**: Manage team members with role-based permissions and workload distribution
- **Advanced Analytics**: Track project progress with comprehensive reporting and insights

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Supabase for authentication, database, and real-time features
- **State Management**: TanStack Query for server state
- **Routing**: React Router v6

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <PROJECT_DIRECTORY>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components and routing
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── integrations/       # Third-party service integrations
└── types/              # TypeScript type definitions
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from project settings
3. Add them to your environment variables
4. Run the database migrations in the `supabase/` directory

### Database Schema

The application uses the following main tables:
- `roadmaps` - Project roadmap data
- `tasks` - Individual task items
- `roadmap_members` - Team member assignments
- `profiles` - Extended user profile information

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **Traditional Hosting**: Upload the contents of `dist/` to your web server

### Environment Variables in Production

Make sure to set the following environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 📱 Features Overview

### For Individuals
- **Pro Plan ($29/month)**: Perfect for freelancers and small teams
- Up to 10 active roadmaps
- Basic team collaboration (5 members)
- AI-powered task generation

### For Businesses  
- **Business Pro ($199/month)**: For growing teams and enterprises
- Unlimited roadmaps and team members
- Advanced AI optimization
- Priority support and custom integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact: support@roadmappro.com

---