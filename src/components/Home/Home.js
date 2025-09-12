import React, { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
    const mainContentRef = useRef(null);
    const heroRef = useRef(null);

    const handleScroll = () => {
        if (heroRef.current) {
            const scrollDistance = window.scrollY;
            const heroHeight = heroRef.current.offsetHeight;
            const fadePoint = heroHeight * 0.7;

            if (scrollDistance > fadePoint) {
                const opacity = 1 - (scrollDistance - fadePoint) / (heroHeight - fadePoint);
                heroRef.current.style.opacity = Math.max(0, opacity);
            } else {
                heroRef.current.style.opacity = 1;
            }
        }
    };

    const scrollToContent = () => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        const sections = document.querySelectorAll('section');
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="home-page-container">

            <div ref={heroRef} className="welcome-hero-section">
                <div className="hero-content">
                    <h1>Welcome to High Dimensional Statistics</h1>
                    <p>Sharif University of Technology | Spring 2025</p>
                    <button onClick={scrollToContent} className="scroll-down-btn">
                        Explore
                        <span className="arrow-icon">↓</span>
                    </button>
                </div>
            </div>

            {/*

                 <div className="content-and-sidebar-wrapper">
                <main ref={mainContentRef} className="main-content">
                    <section id="course-description" className="course-description-section">
                        <h2>Course Description</h2>
                        <p>
                            This course provides an in-depth introduction to the field of deep reinforcement learning.
                            Initially, we will explore reinforcement learning conceptually and practically to help you
                            grasp the fundamental concepts. This phase will take place before Nowruz. After Nowruz, we
                            will delve deeper into the subject, focusing on advanced topics. The course will cover both
                            classical reinforcement learning and deep reinforcement learning, including interesting
                            topics such as multi-agent RL, offline methods, and meta RL. By the end of the course, you
                            will have a solid understanding of how to apply deep reinforcement learning to solve complex
                            problems in various domains.
                        </p>
                    </section>

                    <section id="learning-objectives" className="learning-objectives-section">
                        <h2>Learning Objectives</h2>
                        <ul>
                            <li>Understand the fundamentals of reinforcement learning</li>
                            <li>Apply reinforcement learning to various domains</li>
                            <li>Use deep learning techniques to handle large state spaces in RL</li>
                            <li>Master the concepts and gain practical understanding of RL</li>
                            <li>Gain hands-on experience with implementing RL algorithms</li>
                        </ul>
                    </section>

                    <section id="schedule" className="schedule-section">
                        <h2>Schedule</h2>
                        <div className="table-container">
                            <table className="schedule-table">
                                <thead>
                                <tr>
                                    <th>Week #</th>
                                    <th>Topic of the week</th>
                                    <th>Lecture 1</th>
                                    <th>Lecture 2</th>
                                    <th>Homework</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Week 1</td>
                                    <td>Introduction to RL</td>
                                    <td><a href="#">۲۱ بهمن (February 9)</a></td>
                                    <td><a href="#">۲۳ بهمن (February 11)</a></td>
                                    <td><a href="#">HW 1</a></td>
                                </tr>
                                <tr>
                                    <td>Week 2</td>
                                    <td>Value-Based Methods</td>
                                    <td><a href="#">۲۸ بهمن (February 16)</a></td>
                                    <td><a href="#">۳۰ بهمن (February 18)</a></td>
                                    <td><a href="#">HW 2</a></td>
                                </tr>
                                <tr>
                                    <td>Week 3</td>
                                    <td>Policy-Based Methods</td>
                                    <td><a href="#">۵ اسفند (February 23)</a></td>
                                    <td><a href="#">۷ اسفند (February 25)</a></td>
                                    <td><a href="#">HW 3</a></td>
                                </tr>
                                <tr>
                                    <td>Week 4</td>
                                    <td>Advanced Methods</td>
                                    <td><a href="#">۱۲ اسفند (March 2)</a></td>
                                    <td><a href="#">۱۴ اسفند (March 4)</a></td>
                                    <td><a href="#">HW 4</a></td>
                                </tr>
                                <tr>
                                    <td>Week 5</td>
                                    <td>Model-Based Methods</td>
                                    <td><a href="#">۱۹ اسفند (March 9)</a></td>
                                    <td><a href="#">۲۱ اسفند (March 11)</a></td>
                                    <td><a href="#">HW 5</a></td>
                                </tr>
                                <tr>
                                    <td>Week 6</td>
                                    <td>Multi-Armed Bandits</td>
                                    <td><a href="#">۲۶ اسفند (March 16)</a></td>
                                    <td><a href="#">۲۸ اسفند (March 18)</a></td>
                                    <td><a href="#">HW 6</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="instructor" className="instructor-section">
                        <h2>Instructor</h2>
                        <div className="instructor-card">
                            <img
                                src="/images/profile.png"
                                alt="Dr. Rohban"
                                className="instructor-photo"
                            />
                            <div className="instructor-info">
                                <h3>Dr. Mohammad Hossein Rohban</h3>
                                <p>Email: <a href="mailto:rohban@sharif.edu">rohban@sharif.edu</a></p>
                                <div className="social-icons">
                                    <a href="https://github.com/rohban" target="_blank" rel="noopener noreferrer">
                                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
                                             alt="GitHub" width="24" height="24"/>
                                    </a>
                                    <a href="https://linkedin.com/in/rohban" target="_blank" rel="noopener noreferrer">
                                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                                             alt="LinkedIn" width="24" height="24"/>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section id="assistants" className="assistants-section">
                        <h2>Head Assistants</h2>
                        <div className="card-container">
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Arash Alikhani"/>
                                <h3>TA Name</h3>
                                <p>Lead Head Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Soroush VahabiTabar"/>
                                <h3>TA Name</h3>
                                <p>Head Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Soroush VahabiTabar"/>
                                <h3>TA Name</h3>
                                <p>Head Assistant</p>
                            </div>

                        </div>

                        <h2>Teaching Assistants</h2>
                        <div className="card-container">
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Abdollah Zehtabi"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Ahmad Karami"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Abdollah Zehtabi"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Ahmad Karami"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Abdollah Zehtabi"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Ahmad Karami"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Abdollah Zehtabi"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Ahmad Karami"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Abdollah Zehtabi"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Ahmad Karami"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Abdollah Zehtabi"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Ahmad Karami"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Abdollah Zehtabi"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/profile.png" alt="Ahmad Karami"/>
                                <h3>TA Name</h3>
                                <p>Teaching Assistant</p>
                            </div>
                        </div>
                    </section>

                </main>

                <aside className="sidebar">
                    <div className="sidebar-content">
                        <h4>HDS Course</h4>
                        <ul>
                            <li><a href="#course-description">Course Description</a></li>
                            <li><a href="#learning-objectives">Learning Objectives</a></li>
                            <li><a href="#schedule">Schedule</a></li>
                            <li><a href="#instructor">Instructor</a></li>
                            <li><a href="#teaching-assistants">Teaching Assistants</a></li>
                        </ul>
                    </div>
                </aside>
            </div>
            */}

        </div>
    );
};

export default Home;