import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContentNavigator from "../../ContentNavigator/ContentNavigator";
import Head from "../../ContentNavigator/ContentStack/Content/Head/Head";
import Body from "../../ContentNavigator/ContentStack/Content/Body/Body";
import BodyComponent from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent";
import Text from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text";
import './Contact.css';

const Contact = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const rect = contentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableHeight = rect.height - windowHeight;

      if (scrollableHeight > 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div ref={contentRef} className="contact-content-section">
        <ContentNavigator>
          <Head
            index="Contact"
            title="Get in Touch"
            subtitle="Let's Connect"
          />
          <Body showNextButton={false}>
            <BodyComponent>
              <Text>
                <p className="B1">
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, feel free to reach out.
                </p>
                <p className="B1">
                  <strong>Email:</strong> <a href="mailto:hello@example.com" className="contact-link">hello@example.com</a>
                </p>
                <p className="B1">
                  <strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/yourprofile</a>
                </p>
              </Text>
            </BodyComponent>
          </Body>
        </ContentNavigator>
      </div>
    </motion.div>
  );
};

export default Contact;
