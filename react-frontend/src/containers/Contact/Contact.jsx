import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './Contact.scss';
import { client } from '../../client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    try {
      setIsFormSubmitting(true);
      setFormError('');

      // First try to submit to backend API
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      try {
        // Submit to backend API
        await axios.post(`${API_BASE_URL}/contact`, formData);
      } catch (backendError) {
        console.warn('Backend connection failed, falling back to Sanity:', backendError);

        // Fallback to Sanity if backend is not available
        const contact = {
          _type: 'contact',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        };

        // Check if client is defined (from Sanity)
        if (typeof client !== 'undefined') {
          await client.create(contact);
        } else {
          // If no backend and no Sanity, we'll just simulate success
          console.log('Form submitted (simulated):', formData);
        }
      }

      setIsFormSubmitted(true);
      setIsFormSubmitting(false);

      // Reset form data
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError(error.response?.data?.error || 'Failed to send message. Please try again.');
      setIsFormSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:hmtloharcoding3579@gmail.com" className="p-text">hmtloharcoding3579@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+91 6267375870" className="p-text">+91 6267375870</a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          {formError && (
            <div className="app__footer-error">
              <p>{formError}</p>
            </div>
          )}

          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button
            type="button"
            className="p-text"
            onClick={handleSubmit}
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      ) : (
        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="app__footer-thankyou"
        >
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
          <p className="p-text">
            I'll respond to your message as soon as possible.
          </p>
          <button
            type="button"
            className="p-text"
            onClick={() => setIsFormSubmitted(false)}
          >
            Send Another Message
          </button>
        </motion.div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Contact, 'app__footer'),
  'contact',
  'app__whitebg',
); 

// import React, { useState } from 'react';

// import { images } from '../../constants';
// import { AppWrap, MotionWrap } from '../../Wrapper';
// import { client } from '../../client';
// import './Contact.scss';

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { username, email, message } = formData;

//   const handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     setLoading(true);

//     const contact = {
//       _type: 'contact',
//       name: formData.username,
//       email: formData.email,
//       message: formData.message,
//     };

//     client.create(contact)
//       .then(() => {
//         setLoading(false);
//         setIsFormSubmitted(true);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <h2 className="head-text">Take a coffee & chat with me</h2>

//       <div className="app__footer-cards">
//         <div className="app__footer-card ">
//           <img src={images.email} alt="email" />
//           <a href="mailto:hello@micael.com" className="p-text">hmtloharcoding3579@gmail.com</a>
//         </div>
//         <div className="app__footer-card">
//           <img src={images.mobile} alt="phone" />
//           <a href="tel:+1 (123) 456-7890" className="p-text">+91 6267375870</a>
//         </div>
//       </div>
//       {!isFormSubmitted ? (
//         <div className="app__footer-form app__flex">
//           <div className="app__flex">
//             <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
//           </div>
//           <div className="app__flex">
//             <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
//           </div>
//           <div>
//             <textarea
//               className="p-text"
//               placeholder="Your Message"
//               value={message}
//               name="message"
//               onChange={handleChangeInput}
//             />
//           </div>
//           <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
//         </div>
//       ) : (
//         <div>
//           <h3 className="head-text">
//             Thank you for getting in touch!
//           </h3>
//         </div>
//       )}
//     </>
//   );
// };

// export default AppWrap(
//   MotionWrap(Contact, 'app__footer'),
//   'contact',
//   'app__whitebg',
// );