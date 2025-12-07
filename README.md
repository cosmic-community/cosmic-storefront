# Cosmic Storefront

A modern e-commerce application built with Next.js, Tailwind CSS, and Cosmic CMS.

## Features
- 🛍️ **Product Catalog**: Browse detailed product pages with galleries and markdown descriptions.
- 📦 **Collections**: Shop by category with dedicated collection pages.
- ⭐ **Reviews System**: Read and submit product reviews directly to the CMS.
- 🛒 **Shopping Cart**: Persistent cart functionality with slide-out interface.
- 🎨 **Responsive Design**: Beautifully crafted UI that works on any device.

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=693529d12d6361e3dab3e4a7&clone_repository=69352ae42d6361e3dab3e4bf)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for "Design a content model for an e-commerce store with products, collections, and customer reviews", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- [Next.js 16](https://nextjs.org/) - The React Framework for the Web
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Cosmic CMS](https://www.cosmicjs.com/) - Headless CMS for content management
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering for descriptions

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Cosmic account and bucket

### Installation

1. Install dependencies:
```bash
npm install
# or
bun install
```

2. Set up environment variables:
Create a `.env.local` file with your Cosmic credentials:
```bash
COSMIC_BUCKET_SLUG=your_bucket_slug
COSMIC_READ_KEY=your_read_key
COSMIC_WRITE_KEY=your_write_key
```

3. Run the development server:
```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
<!-- README_END -->