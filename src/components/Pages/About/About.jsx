import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContentNavigator from "../../ContentNavigator/ContentNavigator";
import TabNav from "../../ContentNavigator/TabNav/TabNav";
import NavTabItem from "../../ContentNavigator/TabNav/NavTabItem";
import Head from "../../ContentNavigator/ContentStack/Content/Head/Head";
import Body from "../../ContentNavigator/ContentStack/Content/Body/Body";
import BodyComponent from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent";
import Text from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text";
import Intro2 from "../../Intro2/Intro2";
import './About.css';

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [activeContentId, setActiveContentId] = useState('bio');
  const aboutIntro2Ref = useRef(null);
  const contentNavRef = useRef(null);

  // Viewport height tracking
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutIntro2Ref.current || !contentNavRef.current) return;

      const targetY = 120;
      const navRect = contentNavRef.current.getBoundingClientRect();
      const navTop = navRect.top;

      const heroRect = aboutIntro2Ref.current.getBoundingClientRect();
      const startY = heroRect.bottom;
      const endY = targetY;
      const progress = Math.min(Math.max((startY - navTop) / (startY - endY), 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animation values
  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.2;

  // Tab change handler
  const handleTabChange = (tabId) => {
    setActiveContentId(tabId);
  };

  // Content registry
  const contentRegistry = {
    bio: {
      id: "bio",
      index: "01",
      title: "About Me",
      subtitle: "Designer & Creative",
      content: (
        <BodyComponent>
          <Text>
            <p className="B1">
              I'm a product designer focused on creating intuitive and meaningful user experiences.
              My work combines research, strategy, and visual design to solve complex problems.
            </p>
            <p className="B1">
              With a background in user research and interaction design, I've helped shape products
              that balance user needs with business goals. I believe in the power of thoughtful design
              to make technology more accessible and human.
            </p>
          </Text>
        </BodyComponent>
      )
    },
    experience: {
      id: "experience",
      index: "02",
      title: "Experience",
      subtitle: "Professional Journey",
      content: (
        <BodyComponent>
          <Text>
            <p className="B1">
              Experience content coming soon.
            </p>
          </Text>
        </BodyComponent>
      )
    },
    skills: {
      id: "skills",
      index: "03",
      title: "Skills",
      subtitle: "Expertise",
      content: (
        <BodyComponent>
          <Text>
            <p className="B1">
              Skills content coming soon.
            </p>
          </Text>
        </BodyComponent>
      )
    }
  };

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Fixed hero section with Intro2 */}
      <motion.div
        className="about-intro2-container"
        ref={aboutIntro2Ref}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '1200px',
          height: '100vh',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: Math.max(opacity, 0),
          scale: Math.max(scale, 0.8),
          zIndex: 1,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <Intro2 />
      </motion.div>

      {/* Scrollable ContentNavigator section */}
      <div
        ref={contentNavRef}
        style={{
          zIndex: 2,
          position: 'relative',
          marginTop: '100vh'
        }}
      >
        <ContentNavigator>
          <TabNav activeId={activeContentId} onTabChange={handleTabChange}>
            <NavTabItem id="bio" index="01" title="About" />
            <NavTabItem id="experience" index="02" title="Experience" />
            <NavTabItem id="skills" index="03" title="Skills" />
          </TabNav>

          <motion.div className="content">
            <Head
              index={contentRegistry[activeContentId]?.index}
              title={contentRegistry[activeContentId]?.title}
              subtitle={contentRegistry[activeContentId]?.subtitle}
            />
            <Body showNextButton={false}>
              {contentRegistry[activeContentId]?.content}
            </Body>
          </motion.div>
        </ContentNavigator>
      </div>
    </motion.div>
  );
};

export default About;
