 import "../../css/landingPage/landingPage.css";


export default function LandingPage() {

    /*
        CriticAI Landing Page

        Sections:

        1. Navbar   (removed and made global)
           - Brand identity
           - Navigation

        2. Hero
           - Main marketing message
           - CTA buttons
           - AI Review preview card

        3. Features
           - Core product benefits

        4. Footer

        Component is standalone.
        No external libraries required.
    */


    return (
<>
        <div className="landing">
            {/* Hero Section */}
            <section className="hero">

                <div className="hero-left">

                    <div className="badge">
                        AI POWERED CODE REVIEW
                    </div>

                    <h1>
                        Ship better code.
                        <br />
                        Before bugs ship with it.
                    </h1>
                    <p>
                        CriticAI analyzes your code like a senior engineer.
                        Find hidden bugs, security issues, and improve
                        your architecture before production.
                    </p>

                    <div className="buttons">

                        <button className="primary">
                            Start Reviewing
                        </button>
                        <button className="secondary">
                            Explore
                        </button>

                    </div>
                </div>

                {/* AI Preview */}

                <div className="review-card">

                    <div className="window-bar">

                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                    <div className="code">

                        <pre>
                        {`const users = await User.find();

                        if(!users){
                        return res.status(404)
                        }`}
                        </pre>

                    </div>

                    <div className="analysis">
                        <div className="score">

                            <strong>
                                7.5
                            </strong>

                            <small>
                                /10
                            </small>
                        </div>

                        <div>
                            <h3>
                                Code Review
                            </h3>
                            <p>
                                Found 3 issues
                            </p>
                        </div>
                    </div>

                    <div className="issue">
                        <span>
                            ⚠
                        </span>

                        Missing pagination
                        can affect scalability.

                    </div>

                    <div className="issue">

                        <span>
                            ⚠
                        </span>

                        Possible sensitive
                        data exposure.

                    </div>
                </div>
            </section>


            {/* Features */}

            <section className="features">


                <div className="feature">

                    <h3>
                        Deep Analysis
                    </h3>

                    <p>
                        Detect bugs and logical problems
                        beyond syntax.
                    </p>

                </div>




                <div className="feature">

                    <h3>
                        Security First
                    </h3>

                    <p>
                        Identify vulnerabilities before
                        attackers do.
                    </p>

                </div>





                <div className="feature">

                    <h3>
                        Better Architecture
                    </h3>

                    <p>
                        Improve scalability and clean code.
                    </p>

                </div>


            </section>
            <footer>

                © 2026 CriticAI — Built for developers.

            </footer>
        </div>
</>
    );

};
