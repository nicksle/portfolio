import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContentNavigator from "../../ContentNavigator/ContentNavigator";
import Head from "../../ContentNavigator/ContentStack/Content/Head/Head";
import Body from "../../ContentNavigator/ContentStack/Content/Body/Body";
import BodyComponent from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent";
import Text from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text";
import TitleSection from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/TitleSection";
import './Resume.css';

const Resume = () => {
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
      className="resume-page"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div ref={contentRef} className="resume-content-section">
        <ContentNavigator>
          <Head
            index="Resume"
            title="Experience & Skills"
            subtitle="Professional Background"
          />
          <Body showNextButton={false}>
            <BodyComponent>
              <TitleSection title="Experience">
                <Text>
                  <div className="resume-item">
                    <h3 className="H3">Product Designer</h3>
                    <p className="S1">Company Name • 2022 - Present</p>
                    <p className="B1">
                      Led design initiatives for key product features, collaborating with cross-functional teams
                      to deliver user-centered solutions that improved engagement and retention.
                    </p>
                  </div>
                  <div className="resume-item">
                    <h3 className="H3">UX Designer</h3>
                    <p className="S1">Previous Company • 2020 - 2022</p>
                    <p className="B1">
                      Designed and tested user interfaces for mobile and web applications,
                      conducting user research to inform design decisions.
                    </p>
                  </div>
                </Text>
              </TitleSection>

              <TitleSection title="Skills">
                <Text>
                  <p className="B1">
                    <strong>Design:</strong> Figma, Sketch, Adobe Creative Suite, Prototyping
                  </p>
                  <p className="B1">
                    <strong>Research:</strong> User Interviews, Usability Testing, Data Analysis
                  </p>
                  <p className="B1">
                    <strong>Development:</strong> HTML, CSS, JavaScript, React
                  </p>
                </Text>
              </TitleSection>
            </BodyComponent>
          </Body>
        </ContentNavigator>
      </div>
    </motion.div>
  );
};

export default Resume;
