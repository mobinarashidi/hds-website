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
                    <p>Sharif University of Technology | Fall 2025</p>
                    <div className="scroll-container">
                        <button onClick={scrollToContent} className="scroll-down-btn">
                            Explore
                            <span className="arrow-icon">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#2c3e50" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"/>
                         </svg>
                       </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="content-and-sidebar-wrapper">
                <main ref={mainContentRef} className="main-content">
                    <section id="course-description" className="course-description-section">
                        <p style={{fontStyle: "italic"}}>
                            Recent years have witnessed an explosion in the volume and variety of data
                            collected in all scientific disciplines and industrial settings. Such massive
                            data sets present a number of challenges to researchers in statistics and
                            machine learning. High-dimensional statistics provides a self-contained framework
                            for tackling these challenges. The field is central to helping researchers in
                            statistics, machine learning, and related areas understand, apply, and adapt
                            modern statistical methods suited to large-scale data.
                            <strong> — Martin J. Wainwright</strong>
                        </p>
                    </section>


                    <section id="instructor" className="instructor-section">
                        <h2>Instructor</h2>
                        <div className="instructor-card">
                            <img
                                src="/images/Professor.jpg"
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
                                    <a href="https://linkedin.com/in/rohban" target="_blank"
                                       rel="noopener noreferrer">
                                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                                             alt="LinkedIn" width="24" height="24"/>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section id="assistants" className="head-assistants-section">
                        <h2>Head Assistant</h2>
                        <div className="head-card-container">
                            <div className="head-assistant-card">
                                <div className="assistant-photo">
                                    <img src="/images/AliNajar.jpg" alt="Ali Najar" className="assistant-photo"/>
                                </div>
                                <div className="assistant-info">
                                    <h3>Ali Najar</h3>
                                    <p>Email: anajar13750@gmail.com</p>
                                    <p>Head TA</p>
                                    <div className="social-icons">
                                        <a href="https://github.com/Ali-Najar" target="_blank"
                                           rel="noopener noreferrer">
                                            <img
                                                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
                                                alt="GitHub" width="24" height="24"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="assistants-section">


                        <h2>Teaching Assistants</h2>
                        <div className="card-container">
                            <div className="assistant-card">
                                <img src="/images/AliAbbasi.jpg" alt="Ali Abbasi"/>
                                <h3>Ali Abbasi</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/NahalMirzaie.jpg" alt="Nahal Mirzaei"/>
                                <h3>Nahal Mirzaei</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/AmirHosseinNaghdi.jpg" alt="AmirHossein Naghdi"/>
                                <h3>AmirHossein Naghdi</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/KiarashJoolaei.jpg" alt="Kiarash Joolaei"/>
                                <h3>Kiarash Joolaei</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/ErfanSobhaei.jpg" alt="Erfan Sobhaei"/>
                                <h3>Erfan Sobhaei</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/SaraKarimi.jpg" alt="Sara Karimi"/>
                                <h3>Sara Karimi</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/AlirezaMirrokni.jpg" alt="Alireza Mirrokni"/>
                                <h3>Alireza Mirrokni</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/ArshiaIzadyari.jpg" alt="Arshia Izadyari"/>
                                <h3>Arshia Izadyari</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/AsemaneNafea.jpg" alt="Asemane Nafea"/>
                                <h3>Asemane Nafea</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/DanialGharib.jpg" alt="Danial Gharib"/>
                                <h3>Danial Gharib</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/SepehrZolfaghari.jpg" alt="Sepehr Zolfaghari"/>
                                <h3>Sepehr Zolfaghari</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/MahshadMoradi.JPEG" alt="Mahshad Moradi"/>
                                <h3>Mahshad Moradi</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/MehdiZinati.JPG" alt="Mehdi Zinati"/>
                                <h3>Mehdi Zinati</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/MohammadAghaei.jpg" alt="Mohammad Aghaei"/>
                                <h3>Mohammad Aghaei</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/AmirrezaVelae.jpg" alt="Amirreza Velae"/>
                                <h3>Amirreza Velae</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/ShayanBaghayiNejad.jpg" alt="Shayan Baghayi Nejad"/>
                                <h3>Shayan Baghayi Nejad</h3>
                                <p>Teaching Assistant</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/MobinaRashidi.png" alt="Mobina Rashidi"/>
                                <h3>Mobina Rashidi</h3>
                                <p>Website Developer</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/default.jpg" alt="Ali Moghadasi"/>
                                <h3>Ali Moghadasi</h3>
                                <p>Website Developer</p>
                            </div>
                            <div className="assistant-card">
                                <img src="/images/ArmanTahmasebi.jpg" alt="Arman Tahmasebi"/>
                                <h3>Arman Tahmasebi</h3>
                                <p>Recording Manager</p>
                            </div>
                        </div>
                    </section>

                    <section id="grading" className="learning-objectives-section">
                        <h2>Grading</h2>
                        <p>
                            The grading for this course :
                        </p>
                        <ul className="grading-ul">
                            <li>
                                <b>Quiz:</b> 15%
                            </li>
                            <li>
                                <b>Homework:</b> 10%
                            </li>
                            <li>
                                <b>Midterm Exam:</b> 25%
                            </li>
                            <li>
                                <b>Seminar Presentation:</b> 20%
                            </li>
                            <li>
                                <b>Final Exam:</b> 30%
                            </li>
                        </ul>
                    </section>

                    <section id="schedule" className="schedule-section">
                        <h2>Schedule</h2>
                        <div className="table-container">
                            <table className="clean-table">
                                <thead>
                                <tr>
                                    <th>Week-Session</th>
                                    <th>Topic (English)</th>
                                    <th className="col-right">Section</th>
                                    <th className="col-right">Book Chapter</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Week 1 - Session 1</td>
                                    <td>Introduction & Importance of High-Dimensional Estimation (Sparse
                                        Recovery
                                        Example)
                                    </td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">1</td>
                                </tr>
                                <tr>
                                    <td>Week 1 - Session 2</td>
                                    <td>Basic Upper Bounds (Markov, Chernoff & Hoeffding)</td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">2</td>
                                </tr>
                                <tr>
                                    <td>Week 2 - Session 1</td>
                                    <td>Sub-Gaussian Random Variables</td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">2</td>
                                </tr>
                                <tr>
                                    <td>Week 2 - Session 2</td>
                                    <td>Sub-Exponential Random Variables</td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">2</td>
                                </tr>
                                <tr>
                                    <td>Week 3 - Session 1</td>
                                    <td>Moment-Based Bounds (Bernstein)</td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">2</td>
                                </tr>
                                <tr>
                                    <td>Week 3 - Session 2</td>
                                    <td>Concentration for Lipschitz Functions around their Mean (1)</td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">2</td>
                                </tr>
                                <tr>
                                    <td>Week 4 - Session 1</td>
                                    <td>Concentration for Lipschitz Functions around their Mean (2)</td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">2</td>
                                </tr>
                                <tr>
                                    <td>Week 4 - Session 2</td>
                                    <td>Concentration for Functions of Gaussian Random Variables</td>
                                    <td className="col-right">1</td>
                                    <td className="col-right">2</td>
                                </tr>
                                <tr>
                                    <td>Week 5 - Session 1</td>
                                    <td>Intro to Sparse Recovery & Restricted Nullspace Property</td>
                                    <td className="col-right">2</td>
                                    <td className="col-right">7</td>
                                </tr>
                                <tr>
                                    <td>Week 5 - Session 2</td>
                                    <td>Intro to Mutual Incoherence Condition</td>
                                    <td className="col-right">2</td>
                                    <td className="col-right">7</td>
                                </tr>
                                <tr>
                                    <td>Week 6 - Session 1</td>
                                    <td>Intro to Restricted Isometry Property (RIP)</td>
                                    <td className="col-right">2</td>
                                    <td className="col-right">7</td>
                                </tr>
                                <tr>
                                    <td>Week 6 - Session 2</td>
                                    <td>Random Design Matrices that Satisfy RIP</td>
                                    <td className="col-right">2</td>
                                    <td className="col-right">5,7</td>
                                </tr>
                                <tr>
                                    <td>Week 7 - Session 1</td>
                                    <td>Intro to Lower Bounds – Hypothesis-Testing-Based Bounds</td>
                                    <td className="col-right">3</td>
                                    <td className="col-right">15</td>
                                </tr>
                                <tr>
                                    <td>Week 7 - Session 2</td>
                                    <td>Distribution Distance Metrics & Relations – Binary Testing and Le Cam’s
                                        Method
                                    </td>
                                    <td className="col-right">3</td>
                                    <td className="col-right">15</td>
                                </tr>
                                <tr>
                                    <td>Week 8 - Session 1</td>
                                    <td>Le Cam’s Method (Part 2)</td>
                                    <td className="col-right">3</td>
                                    <td className="col-right">15</td>
                                </tr>
                                <tr>
                                    <td>Week 8 - Session 2</td>
                                    <td>Le Cam’s Method (Part 3)</td>
                                    <td className="col-right">3</td>
                                    <td className="col-right">15</td>
                                </tr>
                                <tr className="exam-cell">
                                    <td colSpan="4">Midterm
                                        Exam (covers HW 1 & 2 topics)
                                    </td>
                                </tr>
                                <tr>
                                    <td>Week 9 - Session 1</td>
                                    <td>Le Cam’s Method (Part 4)</td>
                                    <td className="col-right">3</td>
                                    <td className="col-right">15</td>
                                </tr>
                                <tr>
                                    <td>Week 9 - Session 2</td>
                                    <td>Fano’s Inequality (Part 1)</td>
                                    <td className="col-right">3</td>
                                    <td className="col-right">15</td>
                                </tr>
                                <tr>
                                    <td>Week 10 - Session 1</td>
                                    <td>Fano’s Inequality (Part 2)</td>
                                    <td className="col-right">3</td>
                                    <td className="col-right">15</td>
                                </tr>
                                <tr>
                                    <td>Week 10 - Session 2</td>
                                    <td>Concentration of Covariance Estimator around its Mean (1)</td>
                                    <td className="col-right">4</td>
                                    <td className="col-right">6</td>
                                </tr>
                                <tr>
                                    <td>Week 11 - Session 1</td>
                                    <td>Concentration of Covariance Estimator around its Mean (2)</td>
                                    <td className="col-right">4</td>
                                    <td className="col-right">6</td>
                                </tr>
                                <tr>
                                    <td>Week 11 - Session 2</td>
                                    <td>Concentration of Covariance Estimator around its Mean (3)</td>
                                    <td className="col-right">4</td>
                                    <td className="col-right">5,6</td>
                                </tr>
                                <tr>
                                    <td>Week 12 - Session 1</td>
                                    <td>Concentration of Covariance Estimator around its Mean (4)</td>
                                    <td className="col-right">4</td>
                                    <td className="col-right">5,6</td>
                                </tr>
                                <tr>
                                    <td>Week 12 - Session 2</td>
                                    <td>Concentration of Covariance Estimator around its Mean (5)</td>
                                    <td className="col-right">4</td>
                                    <td className="col-right">5,6</td>
                                </tr>
                                <tr>
                                    <td>Week 13 - Session 1</td>
                                    <td>Uniform Learnability & the Glivenko–Cantelli Theorem</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">4</td>
                                </tr>
                                <tr>
                                    <td>Week 13 - Session 2</td>
                                    <td>Rademacher Complexity (Part 1)</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">4</td>
                                </tr>
                                <tr>
                                    <td>Week 14 - Session 1</td>
                                    <td>Rademacher Complexity (Part 2)</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">4</td>
                                </tr>
                                <tr>
                                    <td>Week 14 - Session 2</td>
                                    <td>Upper Bounds on Rademacher Complexity (Part 1)</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">4</td>
                                </tr>
                                <tr>
                                    <td>Week 15 - Session 1</td>
                                    <td>Upper Bounds on Rademacher Complexity (Part 2)</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">4</td>
                                </tr>
                                <tr>
                                    <td>Week 15 - Session 2</td>
                                    <td>Single-Step Discretization Upper Bound for Sub-Gaussian Processes</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">5</td>
                                </tr>
                                <tr>
                                    <td>Week 16 - Session 1</td>
                                    <td>Make-up Class: Chaining & Dudley Integral (Part 1)</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">5</td>
                                </tr>
                                <tr>
                                    <td>Week 16 - Session 2</td>
                                    <td>Make-up Class: Chaining & Dudley Integral (Part 2)</td>
                                    <td className="col-right">5</td>
                                    <td className="col-right">5</td>
                                </tr>
                                <tr className="exam-cell final-exam-cell">
                                    <td colSpan="4">Final
                                        Exam at 15:00 (covers post-midterm material)
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="course-references" className="course-references-section">
                        <h3>Course References</h3>
                        <ul className="grading-ul">
                            <li>
                                Martin J. Wainwright, “High-Dimensional Statistics: A Non-Asymptotic
                                Viewpoint,” 2019.
                            </li>
                            <li>
                                Roman Vershynin, “High-Dimensional Probability: An Introduction with
                                Applications in Data Science,” 2025.
                            </li>
                        </ul>
                    </section>

                </main>

                <aside className="sidebar">
                    <div className="sidebar-content">
                        <h4>HDS Course</h4>
                        <ul>
                            <li><a href="#instructor">Instructor</a></li>
                            <li><a href="#assistants">Teaching Assistants</a></li>
                            <li><a href="#grading">Grading</a></li>
                            <li><a href="#schedule">Schedule</a></li>
                            <li><a href="#course-references">Course References</a></li>
                        </ul>
                    </div>
                </aside>
            </div>

        </div>
    );
};

export default Home;