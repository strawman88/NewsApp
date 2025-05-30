import React from 'react';

function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>
        Reach out to AUSNEWSHUB for all enquiries. We’re here to help!
      </p>
      <ul className="contact-details">
        <li>
          <strong>Address:</strong> 123 Main Street, Suite 400, New York, NY 10001
        </li>
        <li>
          <strong>Phone:</strong> (212) 555-1234
        </li>
        <li>
          <strong>Email:</strong> <a href="mailto:info@ausnewshub.com">info@ausnewshub.com</a>
        </li>
        <li>
          <strong>Business Hours:</strong> Mon–Fri, 9am–6pm
        </li>
      </ul>
    </div>
  );
}

export default ContactPage;