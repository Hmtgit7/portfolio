# Portfolio

A full-stack portfolio website showcasing my projects, skills, and professional experience. The application features a modern, responsive design with smooth animations and integration with GitHub for automatic project synchronization.

![Portfolio Demo](https://hemant-gehlod.netlify.app)

## 🌟 Features

- **Interactive UI** with smooth animations and transitions
- **Responsive Design** that works on all devices
- **GitHub Integration** to showcase repositories and contributions
- **Dynamic Projects Page** with filtering capabilities
- **Contact Form** with email notifications
- **CMS Backend** for easy content management
- **Docker Support** for easy deployment

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **SCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing

### Backend
- **Node.js** - Server environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Nodemailer** - Email service

### CMS
- **Sanity.io** - Content management

### DevOps
- **Docker** - Containerization
- **Netlify/Vercel** - Frontend hosting
- **Render/Heroku** - Backend hosting

## 🛠️ Project Structure

```
portfolio/
├── react-frontend/       # React frontend application
├── portfolio-backend/    # Node.js/Express API
└── sanity-backend/       # Sanity CMS backend
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional)

### Frontend Setup

```bash
# Navigate to frontend directory
cd react-frontend

# Install dependencies
npm install

# Create .env file for environment variables
cp .env.example .env

# Start development server
npm start
```

### Node.js Backend Setup

```bash
# Navigate to backend directory
cd portfolio-backend

# Install dependencies
npm install

# Create .env file for environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Docker Setup (Optional)

```bash
# Navigate to backend directory
cd portfolio-backend

# Build and start containers
docker-compose up -d
```

### Sanity Backend Setup

```bash
# Navigate to Sanity directory
cd sanity-backend

# Install dependencies
npm install

# Initialize Sanity project (if not already initialized)
npm create sanity@latest -- --create-project "Portfolio CMS" --dataset production

# Start Sanity Studio
npm run start
```

## 📝 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SANITY_PROJECT_ID=your_sanity_project_id
REACT_APP_SANITY_TOKEN=your_sanity_token
```

### Backend (.env)
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

### Sanity (.env)
```
SANITY_STUDIO_PROJECT_ID=your_sanity_project_id
SANITY_STUDIO_DATASET=production
```

## 🔄 API Endpoints

### GitHub API
- `GET /api/github/profile/:username` - Get GitHub profile
- `GET /api/github/repos/:username` - Get repositories
- `GET /api/github/stats/:username` - Get statistics

### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (protected)

## 📱 Responsive Design

The application is fully responsive and works on various screen sizes:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚢 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Connect your GitHub repository
2. Set the build command: `npm run build`
3. Set the publish directory: `build`
4. Add environment variables

### Backend Deployment (Render/Heroku)
1. Connect your GitHub repository
2. Set the build command: `npm run build`
3. Set the start command: `npm start`
4. Add environment variables

### Docker Deployment
1. Build the Docker image: `docker build -t portfolio-backend .`
2. Push to a container registry: `docker push your-registry/portfolio-backend`
3. Deploy using Docker Compose or Kubernetes

## 🌐 Live Demo

[View Live Demo](https://hemant-gehlod.netlify.app)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Hemant Gehlod - [hmtloharcoding3579@gmail.com](mailto:hmtloharcoding3579@gmail.com)

GitHub: [https://github.com/Hmtgit7](https://github.com/Hmtgit7)

LinkedIn: [https://www.linkedin.com/in/hemant-gehlod](https://www.linkedin.com/in/hemant-gehlod)

---

Made with ❤️ by Hemant Gehlod
