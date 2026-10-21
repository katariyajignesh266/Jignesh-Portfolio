import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState({ 1: true, 2: false, 3: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  const toggleFaq = (id) => {
    setFaqOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-container page-contact">
      <div className="page-header">
        <div>
          <h2>Contact & Help Center</h2>
          <p className="page-subtitle">
            Need assistance or have feedback? Reach out to our support team or explore common questions.
          </p>
        </div>
      </div>

      <div className="contact-grid">
        {/* Contact Form */}
        <div className="contact-card">
          <h3>Send a Message</h3>
          <p className="contact-subtext">We typically respond to inquiries within 1–2 business hours.</p>

          {submitted ? (
            <div className="contact-success-state">
              <div className="success-icon">✓</div>
              <h4>Message Received!</h4>
              <p>Thank you for contacting us. We will get back to you at <strong>{formData.email}</strong> shortly.</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">Your Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Topic / Category</label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="General">General Inquiry</option>
                  <option value="Feature">Feature Request</option>
                  <option value="Bug">Bug Report</option>
                  <option value="Performance">Performance Feedback</option>
                  <option value="Account">Account & Security</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="Describe your inquiry or feedback in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary-action">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* FAQs & Support Info */}
        <div className="contact-sidebar">
          <div className="info-card">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
              <div className="faq-item">
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(1)}
                >
                  <span>How are my tasks saved and synced?</span>
                  <span>{faqOpen[1] ? '−' : '+'}</span>
                </button>
                {faqOpen[1] && (
                  <div className="faq-answer">
                    All tasks are persistently stored in MongoDB under your personal user account. Optimistic UI updates save changes immediately in the interface while syncing to the backend.
                  </div>
                )}
              </div>

              <div className="faq-item">
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(2)}
                >
                  <span>How is account security managed?</span>
                  <span>{faqOpen[2] ? '−' : '+'}</span>
                </button>
                {faqOpen[2] && (
                  <div className="faq-answer">
                    Passwords are encrypted with industry-standard bcrypt hashing. Sessions are authenticated using signed JSON Web Tokens (JWT) verified on every API request through middleware.
                  </div>
                )}
              </div>

              <div className="faq-item">
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(3)}
                >
                  <span>Can I prioritize and categorize tasks?</span>
                  <span>{faqOpen[3] ? '−' : '+'}</span>
                </button>
                {faqOpen[3] && (
                  <div className="faq-answer">
                    Yes. Each task supports Low, Medium, and High priority tags. You can update priorities on the fly from the task list or view priority distribution in the Analytics tab.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="info-card course-info-card">
            <h4>Support & Help Desk</h4>
            <p><strong>Email:</strong> support@taskflow.dev</p>
            <p><strong>Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM</p>
            <p><strong>Response Time:</strong> Typically under 2 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
