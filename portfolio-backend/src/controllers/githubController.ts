// src/controllers/githubController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import { asyncHandler } from '../utils/errorHandler';
import { GitHubProfile, GitHubRepo, GitHubStats } from '../types';

// @desc    Get GitHub profile
// @route   GET /api/github/profile/:username
// @access  Public
export const getGitHubProfile = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;

    const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        },
    });

    res.json(response.data);
});

// @desc    Get GitHub repositories
// @route   GET /api/github/repos/:username
// @access  Public
export const getGitHubRepos = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const perPage = req.query.per_page || 10;
    const sort = req.query.sort || 'updated';

    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        params: {
            per_page: perPage,
            sort: sort,
        },
        headers: {
            Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        },
    });

    res.json(response.data);
});

// @desc    Get GitHub stats
// @route   GET /api/github/stats/:username
// @access  Public
export const getGitHubStats = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;

    // Fetch all repositories to calculate stats
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        params: {
            per_page: 100,
        },
        headers: {
            Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        },
    });

    const repos = response.data;

    // Calculate statistics
    const totalStars = repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0);

    // Get language distribution
    const topLanguages: { [key: string]: number } = {};
    repos.forEach((repo: GitHubRepo) => {
        if (repo.language) {
            topLanguages[repo.language] = (topLanguages[repo.language] || 0) + 1;
        }
    });

    // Get most starred repositories
    const mostStarredRepos = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

    const stats: GitHubStats = {
        totalStars,
        totalForks,
        topLanguages,
        mostStarredRepos,
    };

    res.json(stats);
});