# Detailed Installation Guide

This document provides step-by-step instructions for setting up and deploying the entire portfolio project.

## Table of Contents

- [Frontend Installation](#frontend-installation)
- [Node.js Backend Installation](#nodejs-backend-installation)
- [Sanity CMS Setup](#sanity-cms-setup)
- [MongoDB Setup](#mongodb-setup)
- [GitHub API Configuration](#github-api-configuration)
- [Email Service Configuration](#email-service-configuration)
- [Docker Setup](#docker-setup)
- [Deployment Instructions](#deployment-instructions)

## Frontend Installation

### Basic Setup

```bash
# Clone the repository (if not already done)
git clone https://github.com/Hmtgit7/portfolio.git
cd portfolio/react-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Configuration

Edit the `.env` file and add:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SANITY_PROJECT_ID=your_sanity_project_id
REACT_APP_SANITY_TOKEN=your_sanity_token
```

### Running Development Server

```bash
npm start
```

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Node.js Backend Installation

### Basic Setup

```bash
cd ../portfolio-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Configuration

Edit the `.env` file and add:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio_db
GITHUB_TOKEN=your_github_token
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_TO=hmtloharcoding3579@gmail.com
```

### Running Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

## Sanity CMS Setup

### Initialize New Project

```bash
cd ../sanity-backend

# Create a new Sanity project
npm create sanity@latest -- --create-project "Portfolio CMS" --dataset production
```

Follow the prompts to complete setup.

### Start Sanity Studio

```bash
npm run start
```

Sanity Studio will be available at http://localhost:3333

### Schema Configuration

1. Go to `schemas` directory
2. Create schema files for:
   - Works/Projects
   - About
   - Skills
   - Experiences
   - Contact
   - Testimonials

Example schema file (works.js):
```javascript
export default {
  name: 'works',
  title: 'Works',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'projectLink',
      title: 'Project Link',
      type: 'string',
    },
    {
      name: 'codeLink',
      title: 'Code Link',
      type: 'string',
    },
    {
      name: 'imgUrl',
      title: 'ImageUrl',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
     type:'array',
     of: [
       {
         name:'tag',
         title:'Tag',
         type:'string'
      }
     ]
    }
  ],
};
```

## MongoDB Setup

### Local Installation

1. Install MongoDB Community Edition:
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
   - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - macOS/Linux: `sudo systemctl start mongod`

3. Create database:
   ```bash
   mongosh
   > use portfolio_db
   > exit
   ```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier is sufficient)
3. Create a database user
4. Whitelist your IP address
5. Get connection string and update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio_db?retryWrites=true&w=majority
   ```

## GitHub API Configuration

1. Create a GitHub personal access token:
   - Go to [GitHub Settings](https://github.com/settings/tokens)
   - Generate new token (classic)
   - Select scopes: `public_repo`, `read:user`, `user:email`
   - Copy the token

2. Add token to backend `.env` file:
   ```
   GITHUB_TOKEN=your_github_token
   ```

## Email Service Configuration

### Gmail Setup

1. Enable 2-Step Verification for your Google account
2. Generate an app password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Under "Signing in to Google", select "App passwords"
   - Generate a new app password for "Mail" and "Other"
   - Copy the 16-character password

3. Add to backend `.env` file:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   EMAIL_TO=hmtloharcoding3579@gmail.com
   ```

## Docker Setup

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

### Backend Containerization

```bash
cd ../portfolio-backend

# Build and start containers
docker-compose up -d
```

This will:
- Start MongoDB container
- Build and start backend container
- Connect them through a Docker network

### Frontend Containerization (Optional)

Create a `Dockerfile` in the frontend directory:

```dockerfile
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:

```bash
docker build -t portfolio-frontend .
docker run -p 80:80 portfolio-frontend
```

## Deployment Instructions

### Frontend Deployment (Netlify)

1. Create `netlify.toml` in the frontend directory:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy via Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

### Backend Deployment (Render)

1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect to your GitHub repository
4. Set build command: `npm install && npm run build`
5. Set start command: `node dist/server.js`
6. Add environment variables from your `.env` file

### Sanity Deployment

Sanity Studio is automatically deployed when you push changes. The URL format is:
`https://<project-id>.sanity.studio/`

To deploy manually:
```bash
cd sanity-backend
sanity deploy
```

This completes the detailed installation process for all components of the portfolio project.