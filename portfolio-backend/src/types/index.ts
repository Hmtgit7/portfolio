export interface GitHubProfile {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    open_issues_count: number;
    topics: string[];
    visibility: string;
  }
  
  export interface GitHubStats {
    totalStars: number;
    totalForks: number;
    topLanguages: { [key: string]: number };
    mostStarredRepos: GitHubRepo[];
  }
  
  // Contact Form Types
  export interface ContactRequest {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }