// src/routes/githubRoutes.ts
import express from 'express';
import {
    getGitHubProfile,
    getGitHubRepos,
    getGitHubStats,
} from '../controllers/githubController';

const router = express.Router();

router.get('/profile/:username', getGitHubProfile);
router.get('/repos/:username', getGitHubRepos);
router.get('/stats/:username', getGitHubStats);

export default router;