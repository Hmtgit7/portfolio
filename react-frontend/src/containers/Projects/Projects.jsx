import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { client } from '../../client';
import './Projects.scss';

const Projects = () => {
    const [works, setWorks] = useState([]);
    const [filterWork, setFilterWork] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [loading, setLoading] = useState(true);

    // Animation variants
    const headerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut"
            }
        }
    };

    useEffect(() => {
        // Function to fetch projects
        const fetchProjects = async () => {
            setLoading(true);
            try {
                // Try to fetch from Sanity
                let projectData = [];

                try {
                    const query = '*[_type == "works"]';
                    projectData = await client.fetch(query);
                } catch (error) {
                    console.warn('Error fetching from Sanity, using fallback data', error);
                    // Fallback to hardcoded data if Sanity fails
                    projectData = [
                        {
                            title: 'Modern UI/UX Website',
                            description: 'A modern UI/UX portfolio website with animations and responsive design',
                            projectLink: 'https://myproject.com',
                            codeLink: 'https://github.com/myusername/project1',
                            imgUrl: 'https://example.com/project1.jpg',
                            tags: ['Web App', 'React JS']
                        },
                        {
                            title: 'E-commerce Application',
                            description: 'Full-stack e-commerce application with payment integration and admin panel',
                            projectLink: 'https://myecommerce.com',
                            codeLink: 'https://github.com/myusername/ecommerce',
                            imgUrl: 'https://example.com/ecommerce.jpg',
                            tags: ['Web App', 'MERN']
                        },
                        {
                            title: 'Content Management System',
                            description: 'A content management system with user authentication and role-based access',
                            projectLink: 'https://mycms.com',
                            codeLink: 'https://github.com/myusername/cms',
                            imgUrl: 'https://example.com/cms.jpg',
                            tags: ['Web App', 'MEAN']
                        },
                        {
                            title: 'Realtime Chat Application',
                            description: 'Realtime chat application with private and group messaging capabilities',
                            projectLink: 'https://mychat.com',
                            codeLink: 'https://github.com/myusername/chat',
                            imgUrl: 'https://example.com/chat.jpg',
                            tags: ['Mobile App', 'React Native']
                        },
                        {
                            title: 'Task Management Dashboard',
                            description: 'Interactive dashboard for task management with drag-and-drop functionality',
                            projectLink: 'https://mytasks.com',
                            codeLink: 'https://github.com/myusername/tasks',
                            imgUrl: 'https://example.com/tasks.jpg',
                            tags: ['UI/UX', 'React JS']
                        },
                        {
                            title: 'Blog Platform',
                            description: 'Full-featured blog platform with comment system and rich text editor',
                            projectLink: 'https://myblog.com',
                            codeLink: 'https://github.com/myusername/blog',
                            imgUrl: 'https://example.com/blog.jpg',
                            tags: ['Web App', 'MERN']
                        }
                    ];
                }

                setWorks(projectData);
                setFilterWork(projectData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleWorkFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard({ y: 100, opacity: 0 });

        setTimeout(() => {
            setAnimateCard({ y: 0, opacity: 1 });

            if (item === 'All') {
                setFilterWork(works);
            } else {
                setFilterWork(works.filter((work) => work.tags.includes(item)));
            }
        }, 500);
    };

    // Get unique tags for filters
    const getUniqueTags = () => {
        if (!works || works.length === 0) return ['All'];

        const tags = new Set(['All']);
        works.forEach(work => {
            if (work.tags && Array.isArray(work.tags)) {
                work.tags.forEach(tag => tags.add(tag));
            }
        });

        return Array.from(tags);
    };

    // Container variants for staggered children animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Item variants for project cards
    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    return (
        <div className="app__projects">
            <motion.div
                className="app__projects-header"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <Link to="/" className="app__projects-back">
                    <BiArrowBack />
                    <span>Back to Home</span>
                </Link>
                <h1 className="head-text">My Creative <span>Portfolio</span></h1>
                <p className="p-text">Here are some of the projects I've worked on. Each project represents a unique challenge and showcases different skills and technologies.</p>
            </motion.div>

            <motion.div
                className="app__projects-filter"
                variants={filterVariants}
                initial="hidden"
                animate="visible"
            >
                {getUniqueTags().map((item, index) => (
                    <motion.div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__projects-filter-item ${activeFilter === item ? 'item-active' : ''}`}
                        whileHover={{
                            scale: 1.1,
                            backgroundColor: activeFilter === item ? 'var(--secondary-color)' : 'var(--secondary-color)',
                            color: '#fff'
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        {item}
                    </motion.div>
                ))}
            </motion.div>

            {loading ? (
                <div className="app__projects-loading">
                    <div className="loader"></div>
                    <p>Loading projects...</p>
                </div>
            ) : (
                <motion.div
                    className="app__projects-portfolio"
                    variants={containerVariants}
                    initial="hidden"
                    // animate="visible"
                    animate={animateCard}
                    transition={{ duration: 0.5, delayChildren: 0.5 }}
                >
                    {filterWork.map((work, index) => (
                        <motion.div
                            className="app__projects-item"
                            key={index}
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="app__projects-img">
                                <img src={work.imgUrl} alt={work.title} />

                                <motion.div
                                    whileHover={{ opacity: [0, 1] }}
                                    transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.1 }}
                                    className="app__projects-hover"
                                >
                                    <a href={work.projectLink} target="_blank" rel="noreferrer">
                                        <motion.div
                                            whileInView={{ scale: [0, 1] }}
                                            whileHover={{ scale: [1, 0.9] }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <AiFillEye />
                                        </motion.div>
                                    </a>
                                    <a href={work.codeLink} target="_blank" rel="noreferrer">
                                        <motion.div
                                            whileInView={{ scale: [0, 1] }}
                                            whileHover={{ scale: [1, 0.9] }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <AiFillGithub />
                                        </motion.div>
                                    </a>
                                </motion.div>
                            </div>

                            <div className="app__projects-content">
                                <motion.h4
                                    className="bold-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {work.title}
                                </motion.h4>
                                <motion.p
                                    className="p-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {work.description}
                                </motion.p>

                                <div className="app__projects-tag">
                                    {work.tags && work.tags.map((tag, tagIndex) => (
                                        <motion.p
                                            key={`tag-${tagIndex}`}
                                            className="p-tag"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + (tagIndex * 0.1) }}
                                        >
                                            {tag}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Projects;