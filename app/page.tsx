import { Metadata } from 'next'
import VanillaPortfolio from '@/components/VanillaPortfolio'

export const metadata: Metadata = {
  title: 'Adesada Opeyemi - Cinematic Video Editor | Professional Film & Commercial Editing',
  description: 'Award-winning video editor with 8+ years of experience crafting cinematic stories for Netflix, Sony Pictures, and Warner Bros. Specializing in commercials, documentaries, and narrative films.',
  openGraph: {
    title: 'Adesada Opeyemi - Cinematic Video Editor',
    description: 'Award-winning video editor crafting cinematic stories for major studios and brands.',
    images: ['/og-image.jpg'],
  },
}

export default function HomePage() {
  return <VanillaPortfolio />
}