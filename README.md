# Headless CMS - Content Management System Built with Next.js 14

![GitHub repo size](https://img.shields.io/github/repo-size/evanch98/simple-content-management-system)
![GitHub stars](https://img.shields.io/github/stars/evanch98/simple-content-management-system?style=social)
![GitHub forks](https://img.shields.io/github/forks/evanch98/simple-content-management-system?style=social)

This project is a headless CMS built using the Next.js 14 framework, designed to power content-driven websites such as personal portfolios. It enables efficient content management through an intuitive interface that supports the creation of pages, sections, and reusable components. The CMS was built with React, TypeScript, Tailwind CSS, Shadcn UI, and Convex Database.

## Features

- **Authentication**: Implemented with Convex Auth for secure user access.
- **Multiple Projects**: Users can create and manage multiple projects simultaneously.
- **Page and Section Management**: Create pages, divide them into sections, and assign reusable components to each section.
- **Image Uploads**: Upload images to obtain public URLs for use within Image components.
- **API Endpoints for JSON Content**: Easily retrieve your content in JSON format using auto-generated API endpoints, making it ready for seamless integration with your websites.

## Tech Stack

- **Framework**: Next.js 14
- **Frontend**: React, TypeScript, Tailwind CSS and Shadcn UI
- **Database & Authentication**: Convex Database & Convex Auth

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/evanch98/simple-content-management-system.git
cd <project-folder>
```

2. **Install dependencies:**

```bash
bun install
```

3. **Set up environment variables:**<br/>
   Create `.env.local` file at the root of your project folder. Add necessary API keys. Refer to the [Convex Docs](https://docs.convex.dev/home) for more information.

```
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
```

4. **Run the development server:**

```bash
bunx convex dev
```

```bash
bun run dev
```

Visit http://localhost:3000 to see the project running locally.

## Usage Instructions

1. Create a new project within the CMS.
2. Add pages, sections, and components to organize the content.
3. Upload images and use their URLs for Image components.
4. Retrieve API endpoints for each project to access the JSON content programmatically.
5. Integrate the JSON data into your user-facing websites by fetching from the generated endpoints.

> [!WARNING]
>
> This CMS is intended solely for my personal projects. If you'd like to explore the project, feel free to do so. However:
>
> - Do not use it in production for your own projects.
> - Breaking changes will occur without notice as the CMS will evolve to meet the needs of my projects.
> - No guarantees are provided regarding stability or future updates.
