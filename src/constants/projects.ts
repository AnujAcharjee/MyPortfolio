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
      'Pramman is a robust identity provider built on OAuth 2.0 and OpenID Connect standards, enabling secure authentication and authorization flows for modern applications.     ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Wanderlust',
    description:
      'A web-based platform that facilitates the booking of short-term rentals and accommodations.',
    img: ImgLink.wanderlust,
    gitHubLink: 'https://github.com/AnujAcharjee/Wanderlust',
    webLink: 'https://wanderlust.anujacharjee.com/listings',
    content:
      'Wanderlust is a full-stack rental platform inspired by Airbnb, supporting listing creation, search, and booking workflows with a clean, responsive UI.',
  },
  {
    title: 'Stock Rush CLI',
    description: 'A command-line based stock trading simulator.',
    img: ImgLink.stockRush,
    gitHubLink: 'https://github.com/AnujAcharjee/Stock-Rush-CLI',
    content:
      'Stock Rush CLI simulates real-time stock trading in the terminal — track portfolios, execute buy/sell orders, and view market data without leaving the command line.',
  },
  {
    title: 'Amazon UI Clone',
    description: 'UI clone built with HTML & CSS.',
    img: ImgLink.amazonClone,
    gitHubLink: 'https://github.com/AnujAcharjee/amazon-clone',
    content:
      'A pixel-accurate Amazon storefront clone built purely with HTML and CSS, covering the homepage, product listing, and cart pages.',
  },
];
