import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BsGithub, BsStar, BsCodeSlash, BsCalendar4Week } from 'react-icons/bs';
import { FaCodeBranch, FaCode } from 'react-icons/fa';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './GitHub.scss';

const GitHub = () => {
    const [repos, setRepos] = useState([]);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

    // Replace with your GitHub username
    const username = 'Hmtgit7';

    // API base URL
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                setLoading(true);

                // Direct GitHub API approach (fallback if backend not available)
                const fetchDirectFromGitHub = async () => {
                    // Fetch profile
                    const profileResponse = await axios.get(`https://api.github.com/users/${username}`);
                    setProfile(profileResponse.data);

                    // Fetch repositories
                    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`);
                    setRepos(reposResponse.data);

                    // Calculate stats
                    const totalStars = reposResponse.data.reduce((sum, repo) => sum + repo.stargazers_count, 0);
                    const totalForks = reposResponse.data.reduce((sum, repo) => sum + repo.forks_count, 0);

                    // Language distribution
                    const topLanguages = {};
                    reposResponse.data.forEach((repo) => {
                        if (repo.language) {
                            topLanguages[repo.language] = (topLanguages[repo.language] || 0) + 1;
                        }
                    });

                    // Most starred repos
                    const mostStarredRepos = [...reposResponse.data]
                        .sort((a, b) => b.stargazers_count - a.stargazers_count)
                        .slice(0, 5);

                    setStats({
                        totalStars,
                        totalForks,
                        topLanguages,
                        mostStarredRepos,
                    });
                };

                // Try fetching from backend first
                try {
                    // Fetch profile from backend
                    const profileResponse = await axios.get(`${API_BASE_URL}/github/profile/${username}`);
                    setProfile(profileResponse.data);

                    // Fetch repos from backend
                    const reposResponse = await axios.get(`${API_BASE_URL}/github/repos/${username}?per_page=8&sort=updated`);
                    setRepos(reposResponse.data);

                    // Fetch stats from backend
                    const statsResponse = await axios.get(`${API_BASE_URL}/github/stats/${username}`);
                    setStats(statsResponse.data);
                } catch (backendError) {
                    console.warn('Backend connection failed, falling back to direct GitHub API:', backendError);
                    await fetchDirectFromGitHub();
                }

                setLoading(false);
            } catch (err) {
                console.error('GitHub data fetch error:', err);
                setError(err.message || 'Failed to fetch GitHub data');
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, [API_BASE_URL, username]);

    const handleRepoFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard({ y: 100, opacity: 0 });

        setTimeout(() => {
            setAnimateCard({ y: 0, opacity: 1 });

            // Filter repos by language
            if (item === 'All') {
                // No filtering needed
            } else if (item === 'Starred') {
                setRepos(prev => [...prev].sort((a, b) => b.stargazers_count - a.stargazers_count));
            } else if (item === 'Recent') {
                setRepos(prev => [...prev].sort((a, b) =>
                    new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
                ));
            } else {
                // Filter by language
                const filteredRepos = repos.filter(repo => repo.language === item);
                if (filteredRepos.length > 0) {
                    setRepos(filteredRepos);
                }
            }
        }, 500);
    };

    // Create language filters dynamically from available repos
    const getLanguageFilters = () => {
        if (!repos || repos.length === 0) return ['All'];

        const languages = new Set();
        languages.add('All');
        languages.add('Starred');
        languages.add('Recent');

        repos.forEach(repo => {
            if (repo.language) {
                languages.add(repo.language);
            }
        });

        return Array.from(languages);
    };

    if (loading) {
        return (
            <div className="app__github">
                <h2 className="head-text">GitHub <span>Profile</span></h2>
                <div className="app__github-loading">
                    <p>Loading GitHub data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app__github">
                <h2 className="head-text">GitHub <span>Profile</span></h2>
                <div className="app__github-error">
                    <p>Error loading GitHub data: {error}</p>
                    <p className="p-text">This might be due to GitHub API rate limits. Try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <h2 className="head-text">My GitHub <span>Contributions</span></h2>

            {profile && (
                <div className="app__github-profile">
                    <div className="app__github-profile-image">
                        <motion.img
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            src={profile.avatar_url}
                            alt={profile.name || username}
                        />
                    </div>
                    <div className="app__github-profile-info">
                        <h3>{profile.name || username}</h3>
                        {profile.bio && <p className="p-text">{profile.bio}</p>}

                        <div className="app__github-profile-stats">
                            <div className="app__github-stat">
                                <RiGitRepositoryLine />
                                <p>{profile.public_repos} <span>Repositories</span></p>
                            </div>
                            <div className="app__github-stat">
                                <BsStar />
                                <p>{stats?.totalStars || 0} <span>Stars</span></p>
                            </div>
                            <div className="app__github-stat">
                                <FaCodeBranch />
                                <p>{stats?.totalForks || 0} <span>Forks</span></p>
                            </div>
                            <div className="app__github-stat">
                                <BsCodeSlash />
                                <p>{profile.public_gists || 0} <span>Gists</span></p>
                            </div>
                        </div>

                        <div className="app__github-profile-additional">
                            {profile.location && (
                                <div className="app__github-profile-additional-item">
                                    <span className="label">Location:</span>
                                    <span className="value">{profile.location}</span>
                                </div>
                            )}
                            {profile.blog && (
                                <div className="app__github-profile-additional-item">
                                    <span className="label">Website:</span>
                                    <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="value link"
                                    >
                                        {profile.blog}
                                    </a>
                                </div>
                            )}
                            <div className="app__github-profile-additional-item">
                                <span className="label">Member since:</span>
                                <span className="value">
                                    {new Date(profile.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <a
                            href={profile.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="app__github-profile-button"
                        >
                            <BsGithub />
                            <span>View GitHub Profile</span>
                        </a>
                    </div>
                </div>
            )}

            {stats && (
                <div className="app__github-languages">
                    <h3>Language Distribution</h3>
                    <div className="app__github-languages-chart">
                        <div className="app__github-languages-bars">
                            {Object.entries(stats.topLanguages)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 5)
                                .map(([language, count], index) => {
                                    const percentage = (count / Object.values(stats.topLanguages).reduce((a, b) => a + b, 0)) * 100;
                                    return (
                                        <div key={language} className="app__github-languages-bar">
                                            <div className="label">
                                                <span>{language}</span>
                                                <span>{percentage.toFixed(1)}%</span>
                                            </div>
                                            <div className="bar">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                                    className="fill"
                                                    style={{
                                                        backgroundColor: getLanguageColor(language)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}

            <div className="app__github-repos">
                <h3>My Repositories</h3>

                <div className="app__github-filter">
                    {getLanguageFilters().map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleRepoFilter(item)}
                            className={`app__github-filter-item ${activeFilter === item ? 'item-active' : ''}`}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <motion.div
                    animate={animateCard}
                    transition={{ duration: 0.5, delayChildren: 0.5 }}
                    className="app__github-repos-grid"
                >
                    {repos.map((repo) => (
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
                            transition={{ duration: 0.5 }}
                            className="app__github-repo"
                            key={repo.id}
                        >
                            <h4 title={repo.name}>{repo.name}</h4>

                            <p className="p-text">{repo.description || 'No description available'}</p>

                            {repo.language && (
                                <div className="app__github-repo-language">
                                    <span
                                        className="language-color"
                                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                                    ></span>
                                    <span>{repo.language}</span>
                                </div>
                            )}

                            <div className="app__github-repo-stats">
                                <div className="app__github-repo-stat">
                                    <BsStar />
                                    <span>{repo.stargazers_count}</span>
                                </div>
                                <div className="app__github-repo-stat">
                                    <FaCodeBranch />
                                    <span>{repo.forks_count}</span>
                                </div>
                                <div className="app__github-repo-stat">
                                    <BsCalendar4Week />
                                    <span title={`Last updated: ${new Date(repo.pushed_at).toLocaleDateString()}`}>
                                        {formatDate(repo.pushed_at)}
                                    </span>
                                </div>
                            </div>

                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="app__github-repo-link"
                            >
                                <FaCode />
                                <span>View Code</span>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="app__github-more">
                    <a
                        href={`https://github.com/${username}?tab=repositories`}
                        target="_blank"
                        rel="noreferrer"
                        className="app__github-more-button"
                    >
                        View All Repositories
                    </a>
                </div>
            </div>

            <div className="app__github-contributions">
                <h3>Contribution Graph</h3>
                <div className="app__github-contributions-graph">
                    <img
                        src={`https://ghchart.rshah.org/${username}`}
                        alt="GitHub Contribution Graph"
                    />
                    <p className="p-text">My GitHub contributions in the last year</p>
                </div>
            </div>
        </>
    );
};

// Function to get color for programming language
const getLanguageColor = (language) => {
    const colors = {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Python: '#3572A5',
        Java: '#b07219',
        Ruby: '#701516',
        PHP: '#4F5D95',
        C: '#555555',
        'C++': '#f34b7d',
        'C#': '#178600',
        Swift: '#ffac45',
        Go: '#00ADD8',
        Rust: '#dea584',
        Kotlin: '#F18E33',
        Dart: '#00B4AB',
    };

    return colors[language] || '#858585';
};

// Format date as "X days/months/years ago"
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return 'today';
    } else if (diffInDays === 1) {
        return 'yesterday';
    } else if (diffInDays < 30) {
        return `${diffInDays} days ago`;
    } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(diffInDays / 365);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
};

export default AppWrap(
    MotionWrap(GitHub, 'app__github'),
    'github',
    'app__whitebg'
);