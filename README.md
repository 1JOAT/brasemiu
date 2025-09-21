# Video Editor Portfolio Website

A modern, cinematic portfolio website built with Next.js 15, TypeScript, and Tailwind CSS for professional video editors and filmmakers.

## Features

- 🎬 **Cinematic Design** - Sleek, professional aesthetic tailored for video editors
- 🚀 **Next.js 15** - Latest features including App Router and Server Components
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Fast loading with image optimization and lazy loading
- 🎯 **SEO Ready** - Comprehensive meta tags, structured data, and sitemap
- 🎨 **Smooth Animations** - Subtle, professional animations and transitions
- 📹 **Video Integration** - YouTube video embeds and portfolio showcases
- 🛡️ **Type Safe** - Full TypeScript implementation

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image component
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd video-editor-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### 1. Update Portfolio Data

Edit `components/VideoEditorPortfolio.tsx` and replace the sample data:

```typescript
const portfolioData: PortfolioData = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  videos: [
    // Add your actual video projects
  ],
  tools: [
    // Add your tools/software
  ],
  clients: [
    // Add your clients
  ],
  stats: [
    // Update your statistics
  ]
};
```

### 2. Add YouTube Videos

Replace the sample YouTube IDs with actual video IDs:

```typescript
videos: [
  {
    id: 1,
    title: "Your Video Title",
    category: "Commercial",
    thumbnail: "path-to-thumbnail",
    duration: "2:30",
    youtubeId: "your-actual-youtube-id"
  }
]
```

### 3. Update SEO Information

Edit `app/layout.tsx` to update SEO metadata:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Video Editor",
  description: "Your description",
  // ... other metadata
}
```

### 4. Add Analytics

Update the analytics code in `app/layout.tsx` with your tracking IDs:

```javascript
ga('create', 'YOUR-GA-TRACKING-ID', 'auto');
```

### 5. Update Images

Replace placeholder images in the `public` folder:
- `favicon.ico`
- `apple-touch-icon.png`
- `favicon-32x32.png`
- `favicon-16x16.png`
- `og-image.jpg`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

The optimized build will be in the `.next` folder.

## Performance Optimization

- Images are automatically optimized with Next.js Image component
- CSS is purged and minified with Tailwind CSS
- Bundle is optimized with Next.js built-in optimizations
- Lazy loading implemented for better performance

## SEO Features

- Meta tags for social sharing (Open Graph, Twitter Cards)
- Structured data (JSON-LD) for better search engine understanding
- Sitemap generation
- Robots.txt configuration
- Canonical URLs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the developer.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for video editors and filmmakers.