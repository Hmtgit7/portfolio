'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsGithub, BsStar, BsCodeSlash } from 'react-icons/bs';
import { FaCodeBranch } from 'react-icons/fa';
import { RiGitRepositoryLine } from 'react-icons/ri';
import AppWrap from '../../lib/AppWrap';
import MotionWrap from '../../lib/MotionWrap';
import '../styles/GitHub.scss';

const username = 'Hmtgit7';

const GitHub = () => {
  const [allRepos, setAllRepos] = useState([]);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();

        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);

        const topLanguages = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            topLanguages[repo.language] = (topLanguages[repo.language] || 0) + 1;
          }
        });

        setProfile(profileData);
  setAllRepos(reposData);
  setRepos(reposData);
        setStats({ totalStars, totalForks, topLanguages });
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch GitHub data');
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const handleRepoFilter = (item) => {
    setActiveFilter(item);

    if (item === 'All') {
      setRepos(allRepos);
      return;
    }

    if (item === 'Starred') {
      setRepos([...allRepos].sort((a, b) => b.stargazers_count - a.stargazers_count));
      return;
    }

    if (item === 'Recent') {
      setRepos([...allRepos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()));
      return;
    }

    setRepos(allRepos.filter((repo) => repo.language === item));
  };

  const getLanguageFilters = () => {
    if (!allRepos || allRepos.length === 0) return ['All'];

    const languages = new Set(['All', 'Starred', 'Recent']);
    allRepos.forEach((repo) => {
      if (repo.language) languages.add(repo.language);
    });

    return Array.from(languages);
  };

  if (loading) {
    return (
      <div className="app__github">
        <h2 className="head-text">GitHub <span>Profile</span></h2>
        <div className="app__github-loading"><p>Loading GitHub data...</p></div>
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
              <div className="app__github-stat"><RiGitRepositoryLine /><p>{profile.public_repos} <span>Repositories</span></p></div>
              <div className="app__github-stat"><BsStar /><p>{stats?.totalStars || 0} <span>Stars</span></p></div>
              <div className="app__github-stat"><FaCodeBranch /><p>{stats?.totalForks || 0} <span>Forks</span></p></div>
              <div className="app__github-stat"><BsCodeSlash /><p>{profile.public_gists || 0} <span>Gists</span></p></div>
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
                  <a
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
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
                <span className="value">{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <a href={profile.html_url} target="_blank" rel="noreferrer" className="app__github-profile-button">
              <BsGithub />
              <span>View GitHub Profile</span>
            </a>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <>
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

          <div className="app__github-repos">
            <h3>Latest Repositories</h3>
            <div className="app__github-repos-grid">
              {repos.map((repo) => (
                <motion.div
                  key={repo.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="app__github-repo"
                >
                  <h4>{repo.name}</h4>
                  <p className="p-text">{repo.description || 'Repository description not available.'}</p>
                  <div className="app__github-repo-language">
                    <span className="language-color" style={{ backgroundColor: '#313bac' }} />
                    <span>{repo.language || 'Unknown'}</span>
                  </div>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="app__github-profile-button" style={{ alignSelf: 'stretch' }}>
                    <BsGithub />
                    <span>Open Repo</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(GitHub, 'app__github'),
  'github',
  'app__whitebg',
);