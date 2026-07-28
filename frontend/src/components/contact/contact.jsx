import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../../css/contact/contact.css";
import profilePic from "../../assets/images/profile-pic.png";

export default function Contact() {
  const contact = {
    name: "Reshal Maryson",
    role: "Building CriticAI — AI-powered code review",
    email: "reshalmaryson000@gmail.com",
    phone: "+92 345-2306545",
    github: "https://github.com/ReshalMaryson",
    linkedin: "https://www.linkedin.com/in/reshalmaryson",
  };

  return (
    <section className="contact-section">
      <div className="contact-card">
        <div className="contact-avatar">
          <img src={profilePic} width="120" alt="" />
        </div>
        <h2 style={{ color: "white", marginTop: "30px" }}>{contact.name}</h2>
        <p className="contact-role">{contact.role}</p>

        <div className="contact-links">
          <a href={`mailto:${contact.email}`} className="contact-link">
            <Mail size={18} />
            <span>{contact.email}</span>
          </a>

          <a href={`tel:${contact.phone}`} className="contact-link">
            <Phone size={18} />
            <span>{contact.phone}</span>
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaLinkedin size={18} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
