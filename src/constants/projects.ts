import { ImgLink } from '@/constants/imageLinks';

export type Project = {
  title: string;
  description: string;
  img: string;
  gitHubLink: string;
  webLink?: string;
  content: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Pramman',
    description: 'A secure identity provider that enables seamless authentication with minimal setup.',
    img: ImgLink.pramman,
    gitHubLink: 'https://github.com/AnujAcharjee/pramaan',
    webLink: 'https://pramaan.anujacharjee.com',
    content:
      "Every time I started a new project, authentication was the part I dreaded most — repetitive, tedious, and somehow always more complicated than it needed to be. I kept thinking, there has to be a better way, and that's when I stumbled upon Auth0. Curious, I started digging into how they actually worked under the hood, and I was completely hooked; the fact that so many moving parts come together seamlessly behind a simple 'Sign in with Google' button is honestly kind of magical. So I did what any curious developer would do: I built my own. That's how Pramaan was started... an OAuth 2.0 and OpenID Connect (OIDC) compliant Identity Provider (IdP) designed to provide secure, standards-based authentication and authorization for web, mobile, and backend applications.",
  },
  {
    title: 'Stock Rush CLI',
    description: 'A command-line based stock trading simulator.',
    img: ImgLink.stockRush,
    gitHubLink: 'https://github.com/AnujAcharjee/Stock-Rush-CLI',
    content:
      "Third year of uni, touched multithreading for the first time and bro... it was the coolest thing ever for me at that point. Like multiple processes running simultaneously 🤯?? I was losing it. So I was like, let me try this fr; and built Stock Rush, a CLI app that simulates real-time stock trading in the terminal. Track portfolios, execute buy/sell orders, view market data, all without leaving the command line. Was it necessary? Probably not. Did I have fun? Absolutely",
  },
  {
    title: 'Wanderlust',
    description:
      'A web-based platform that facilitates the booking of short-term rentals and accommodations.',
    img: ImgLink.wanderlust,
    gitHubLink: 'https://github.com/AnujAcharjee/Wanderlust',
    webLink: 'https://wanderlust.anujacharjee.com/listings',
    content:
      "Wanderlust was my first ever MERN stack project 😁. Inspired by Airbnb, it's a full-stack rental platform where users can create listings, search for stays, and go through the entire booking workflow, all wrapped in a clean, responsive UI. It's not perfect, but it's got its own charm...",
  },
  {
    title: 'Amazon UI Clone',
    description: 'UI clone built with HTML & CSS.',
    img: ImgLink.amazonClone,
    gitHubLink: 'https://github.com/AnujAcharjee/amazon-clone',
    content:
      "Back when I thought HTML and CSS were the hardest things in the world, I built an Amazon clone and nearly lost my mind over a misaligned div. Homepage, product listing, cart pages — all of it, pixel-perfect. Young me was built different 😭"
  },
];
