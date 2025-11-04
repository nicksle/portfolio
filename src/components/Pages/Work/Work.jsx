import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useScroll, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentNavigator from "../../ContentNavigator/ContentNavigator";
import TabNav from "../../ContentNavigator/TabNav/TabNav";
import NavTabItem from "../../ContentNavigator/TabNav/NavTabItem";
import Head from "../../ContentNavigator/ContentStack/Content/Head/Head";
import Body from "../../ContentNavigator/ContentStack/Content/Body/Body";
import BodyComponent from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent";
import Text from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text";
import TitleSection from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/TitleSection";
import WorkItem from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/WorkItems/WorkItem";
import CalloutItem from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/CalloutItems/CalloutItem";
import TandaThumbnail1 from "../../../assets/TANDA/Thumbnail/Thumbnail1.svg";
import TandaThumbnail2 from "../../../assets/TANDA/Thumbnail/Thumbnail2.svg";
import SignUpCarouselVideo from "../../../assets/TANDA/CaseStudy1/01.mov";
import WorkItem1Left from "../../../assets/TANDA/WorkItem1/01.jpg";
import WorkItem1Right from "../../../assets/TANDA/WorkItem1/02.jpg";
import './Work.css';

const Work = () => {
  const [activeContentId, setActiveContentId] = useState('tanda');
  const workContentRef = useRef(null);
  const contentNavRef = useRef(null);
  const contentScrollRef = useRef(null);
  const navigate = useNavigate();

  // Force proper initial state on every mount
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Animation states from CaseStudyID
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextContentId, setNextContentId] = useState(null);
  const [contentHeight, setContentHeight] = useState(152); // Start at collapsed height for initial animation
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load animation

  // Debug component lifecycle and force reset
  useEffect(() => {
    console.log('🏠 Work component MOUNTED');
    // Force component to start hidden, then animate in
    setIsReady(false);
    // Ensure scroll progress starts at 0
    setScrollProgress(0);

    const timer = setTimeout(() => {
      console.log('🏠 Work component READY - triggering animation');
      setIsReady(true);
    }, 50); // Small delay to ensure clean initial state

    return () => {
      console.log('🏠 Work component UNMOUNTED');
      clearTimeout(timer);
    };
  }, []);

  // Handle initial load expansion animation (from CaseStudyID)
  useEffect(() => {
    // Trigger expansion after a short delay
    const timer = setTimeout(() => {
      console.log(`🔼 Content expansion started at ${Date.now()}`);
      setContentHeight(757);
      // Mark initial load complete after animation finishes
      setTimeout(() => {
        console.log(`✅ Content expansion completed at ${Date.now()}`);
        setIsInitialLoad(false);
      }, 400); // Match animation duration
    }, 100);

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Handle content transition with animation (from CaseStudyID)
  const transitionToContent = (newId) => {
    if (newId === activeContentId || isTransitioning) return;

    setIsTransitioning(true);
    setNextContentId(newId);
    setContentHeight(152); // Collapse to 152px

    // After collapse animation completes, switch content
    setTimeout(() => {
      setActiveContentId(newId);
      setNextContentId(null);

      console.log(`🔄 Content switched to: ${newId}`);

      // Reset scroll position to top when changing content
      if (contentScrollRef.current) {
        contentScrollRef.current.scrollTop = 0;
      }

      // Wait for pause (150ms) + head animation (400ms) before expanding
      setTimeout(() => {
        console.log(`🔼 Starting expansion after head animation`);
        // Expand to full height
        setContentHeight(757);

        // End transition after expand animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 400); // Match expand animation duration
      }, 550); // Pause (150ms) + head fade-in (400ms)
    }, 400); // Collapse animation duration
  };

  // Styles using CSS custom properties - consistent with design system
  const styles = {
    // Typography styles
    heroTitle: {
      fontSize: 'var(--font-size-title-xl)',
      fontWeight: 'var(--font-weight-regular)',
      color: 'var(--color-primary)',
      margin: 0,
      textAlign: 'left'
    },
    
    // Layout styles
    contentNav: {
      zIndex: 2,
      position: 'relative',
      marginTop: '100vh'
    },
    
    bodyComponent: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--spacing-xl)'
    },
    
    flexColumn: {
      flex: 1
    },
    
    // Image styles
    projectImage: {
      width: '100%',
      height: 'auto',
      borderRadius: 'var(--border-radius-default)'
    },
    
    // Spacing styles
    workDescription: {
      marginBottom: 'var(--spacing-xl)'
    }
  };

  // Content registry - single source of truth for all project content
  const contentRegistry = {
    tanda: {
      id: "tanda",
      index: "01",
      title: "Tanda",
      subtitle: "Fintech Startup",
      period: "2024",
      icon1: null,
      icon2: null,
      bodyItems: [
        <BodyComponent key="tanda-description" style={styles.bodyComponent}>
          <div style={styles.flexColumn}>
            <Text>
              TANDA is a fintech startup dedicated to making financial security accessible to everyone. Through our iOS and Android mobile apps, we offer a community-driven savings service that empowers users to reach their financial goals.
            </Text>
          </div>
          <div style={styles.flexColumn}>
            <img src="https://via.placeholder.com/400/300" alt="Tanda Image" style={styles.projectImage} />
          </div>
        </BodyComponent>,
        <BodyComponent key="tanda-highlights">
          <TitleSection title="Key Highlights">
            <CalloutItem index="1" content="Collaborated with leadership to define product roadmap and designed multiple growth-focused features to drive user acquisition and engagement" />
            <CalloutItem index="2" content="Led new user onboarding redesign through user research and iterative testing, achieving 50% increase in new user growth and 60% reduction in user churn" />
            <CalloutItem index="3" content="Redesigned core product experience, increasing daily active users by 15% month-over-month and improving long-term user retention" />
            <CalloutItem index="4" content="Established comprehensive design system with component library, tokenization and documentation, eliminating engineering confusion and streamlining the design-to-development handoff process" />
          </TitleSection>
        </BodyComponent>,
        <BodyComponent key="tanda-works">
          <TitleSection title="Selected Works">
            <WorkItem
              index="01"
              thumbnails={[
                { img: WorkItem1Left, scale: 0.98 },
                { video: SignUpCarouselVideo, scale: 1.02 },
                { img: WorkItem1Right, scale: 0.98 }
              ]}
              gradientBackground={{ startColor: '#667eea', endColor: '#764ba2' }}
              title="Improving User Education and Building Trust During Onboarding to Increase User Growth"
              description="Enhanced onboarding that helps users understand TANDA's value while building confidence through clear communication and supportive guidance"
              onCtaClick={() => navigate('/case-study-id')}
            />
            <WorkItem
              index="02"
              thumbnails={[
                { img: "https://via.placeholder.com/300x200/764ba2/ffffff?text=Core+Product" }
              ]}
              gradientBackground={{ startColor: '#764ba2', endColor: '#667eea' }}
              title="TANDA: Core Product"
              description="Improved core product experience to increase user activation, retention and growth"
            />
          </TitleSection>
        </BodyComponent>
      ]
    },
    liftoff: {
      id: "liftoff",
      index: "02",
      title: "Liftoff",
      subtitle: "Influence Platform",
      period: "2024",
      icon1: null,
      icon2: null,
      bodyItems: [
        <BodyComponent key="liftoff-description" style={styles.bodyComponent}>
          <div style={styles.flexColumn}>
            <Text>
              LiftOff Mobile's Influence team aims to transform digital advertising by leveraging user-generated content (UGC) as a powerful, authentic marketing tool for brands and mobile businesses. We bridges relationships between influencers and advertisers, providing tools to help influencers to monetize their content, and advertisers find creators who fit their specific needs.
            </Text>
          </div>
          <div style={styles.flexColumn}>
            <img src="https://via.placeholder.com/400/300" alt="Liftoff Image" style={styles.projectImage} />
          </div>
        </BodyComponent>,
        <BodyComponent key="liftoff-highlights">
          <TitleSection title="Key Highlights">
            <CalloutItem index="1" content="Led end-to-end design of our desktop product Plug Marketplace, enabling advertisers to discover and match with influencers, resulting in 40% increase in successful campaign completions" />
            <CalloutItem index="2" content="Partnered with Liftoff Mobile designers to rebrand Jetfuel to Liftoff Influence, implementing unified design system and visual identity post-acquisition" />
            <CalloutItem index="3" content="Conducted user research and solution synthesis for our core product: The Plug. Created high-fidelity mock-ups for concept testing and roadmapped A/B testing for feature implementation" />
            <CalloutItem index="4" content="Redesigned our internal tools from Retool to custom products that allowed teams to better manage advertiser spend and influencer submissions, resulting in 35% revenue increase over a 6 month period" />
          </TitleSection>
        </BodyComponent>,
        <BodyComponent key="liftoff-works">
          <TitleSection title="Selected Works">
            <WorkItem index="01" title="Liftoff Project 1" description="Description for Liftoff Project 1" />
            <WorkItem index="02" title="Liftoff Project 2" description="Description for Liftoff Project 2" />
          </TitleSection>
        </BodyComponent>
      ]
    },
    jefuel: {
      id: "jefuel",
      index: "03",
      title: "Jefuel",
      subtitle: "Social Platform",
      period: "2024",
      icon1: null,
      icon2: null,
      bodyItems: [
        <BodyComponent key="jefuel-description" style={styles.bodyComponent}>
          <div style={styles.flexColumn}>
            <Text>
              This is the Jefuel section.
            </Text>
          </div>
          <div style={styles.flexColumn}>
            <img src="https://via.placeholder.com/400/300" alt="Jefuel Image" style={styles.projectImage} />
          </div>
        </BodyComponent>,
        <BodyComponent key="jefuel-highlights">
          <TitleSection title="Key Highlights">
            <CalloutItem index="1" content="Collaborated with CEO to define product roadmap focused on user retention and profitability, identifying and prioritizing key features that drove business growth" />
            <CalloutItem index="2" content="Led design for the features in our open network initiative which includes introducing profiles, messaging and connections; resulted in 30% increase in DAUs" />
            <CalloutItem index="3" content="Led the design and research for new monetization features for influencers, increasing their earning potential by an average of 20%" />
          </TitleSection>
        </BodyComponent>,
        <BodyComponent key="jefuel-works">
          <TitleSection title="Selected Works">
            <WorkItem index="01" title="Jefuel Project 1" description="Description for Jefuel Project 1" />
            <WorkItem index="02" title="Jefuel Project 2" description="Description for Jefuel Project 2" />
          </TitleSection>
        </BodyComponent>
      ]
    },
    cashapp: {
      id: "cashapp",
      index: "04",
      title: "CashApp",
      subtitle: "Fintech Giant",
      period: "2024",
      icon1: null,
      icon2: null,
      bodyItems: [
        <BodyComponent key="cashapp-description" style={styles.bodyComponent}>
          <div style={styles.flexColumn}>
            <Text>
              This is the CashApp section.
            </Text>
          </div>
          <div style={styles.flexColumn}>
            <img src="https://via.placeholder.com/400/300" alt="CashApp Image" style={styles.projectImage} />
          </div>
        </BodyComponent>,
        <BodyComponent key="cashapp-highlights">
          <TitleSection title="Key Highlights">
            <CalloutItem index="1" content="Collaborated with designers, engineers and PMs within the Ecosystems and Boost workstreams; shipped an exclusive ice cream boost for summer 2019, resulting in a 15% increase in boosts usage" />
            <CalloutItem index="2" content="Participated in design critiques, where I provided and received feedback on designs within a variety of features and workstream" />
          </TitleSection>
        </BodyComponent>,
        <BodyComponent key="cashapp-works">
          <TitleSection title="Selected Works">
            <WorkItem index="01" title="CashApp Project 1" description="Description for CashApp Project 1" />
            <WorkItem index="02" title="CashApp Project 2" description="Description for CashApp Project 2" />
          </TitleSection>
        </BodyComponent>
      ]
    }
  };

  const handleTabChange = (id) => {
    console.log('Tab changed to:', id);
    transitionToContent(id);
  };

  const handleNextContent = () => {
    const contentIds = ['tanda', 'liftoff', 'jefuel', 'cashapp'];
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex < contentIds.length - 1) {
      transitionToContent(contentIds[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!workContentRef.current || !contentNavRef.current) return;

      const targetY = 120;
      const navRect = contentNavRef.current.getBoundingClientRect();
      const navTop = navRect.top;

      const workRect = workContentRef.current.getBoundingClientRect();
      const startY = workRect.bottom;
      const endY = targetY;
      const progress = Math.min(Math.max((startY - navTop) / (startY - endY), 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll-based values like CaseStudy1 - direct calculation, not state
  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.2;

  return (
    <motion.div
      key="work-page-unique"
      className="work-page"
      exit={{ 
        opacity: 0,
        scale: 0.8,
        y: 50
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="work-content-section"
        ref={workContentRef}
        initial={{
          opacity: 0,
          scale: 0.8,
          y: 50
        }}
        animate={isReady ? {
          opacity: opacity,
          scale: scale,
          y: 0
        } : {
          opacity: 0,
          scale: 0.8,
          y: 50
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
        style={{
          position: 'fixed',
          left: 0,
          width: '100%',
          height: '100vh',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: Math.max(opacity, 0),
          scale: Math.max(scale, 0.8),
          zIndex: 1,
          right: 0,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="work-description" style={styles.workDescription}>
          <h2 style={styles.heroTitle}>
            Product designer with 5+ years experience building and growing products for startups in the fintech and influencer advertising spaces.
          </h2>
        </div>
        <div className="work-carousel">
          <div className="work-carousel-scroll">
            {/* First set of items */}
            <div className="work-carousel-item">
              <img src={TandaThumbnail1} alt="Tanda App Interface 1" />
            </div>
            <div className="work-carousel-item">
              <img src={TandaThumbnail2} alt="Tanda App Interface 2" />
            </div>
            <div className="work-carousel-item">
              <img src="https://via.placeholder.com/300x200" alt="Work 3" />
            </div>
            <div className="work-carousel-item">
              <img src="https://via.placeholder.com/300x200" alt="Work 4" />
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="work-carousel-item">
              <img src={TandaThumbnail1} alt="Tanda App Interface 1" />
            </div>
            <div className="work-carousel-item">
              <img src={TandaThumbnail2} alt="Tanda App Interface 2" />
            </div>
            <div className="work-carousel-item">
              <img src="https://via.placeholder.com/300x200" alt="Work 3" />
            </div>
            <div className="work-carousel-item">
              <img src="https://via.placeholder.com/300x200" alt="Work 4" />
            </div>
          </div>
        </div>
      </motion.div>
      <div ref={contentNavRef} style={{ zIndex: 2, position: 'relative', marginTop: '100vh' }}>
        <ContentNavigator activeId={activeContentId}>
          <TabNav activeId={activeContentId} onTabChange={handleTabChange}>
            <NavTabItem id="tanda" index="01" title="Tanda" />
            <NavTabItem id="liftoff" index="02" title="Liftoff" />
            <NavTabItem id="jefuel" index="03" title="Jefuel" />
            <NavTabItem id="cashapp" index="04" title="CashApp" />
          </TabNav>

          <motion.div
            ref={contentScrollRef}
            className="content"
            initial={{ height: 152, opacity: 0.3 }} // Start collapsed on initial load
            style={{
              flex: (isInitialLoad || isTransitioning) ? 'none' : '1' // Keep flex none during initial load and transitions
            }}
            animate={{
              height: contentHeight, // Always animate to contentHeight (152 or 757)
              opacity: isTransitioning ? 0.3 : 1
            }}
            transition={{
              height: { duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.3, ease: "easeInOut" }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContentId}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Head
                  index={contentRegistry[activeContentId]?.index}
                  subtitle={contentRegistry[activeContentId]?.subtitle}
                  title={contentRegistry[activeContentId]?.title}
                  icon={contentRegistry[activeContentId]?.icon1}
                  secondIcon={contentRegistry[activeContentId]?.icon2}
                  period={contentRegistry[activeContentId]?.period}
                />
              </motion.div>
            </AnimatePresence>
            <Body
              key={activeContentId} // Force remount on tab switch to replay animations
              onNextSection={handleNextContent}
              showNextButton={activeContentId !== 'cashapp'}
            >
              {contentRegistry[activeContentId]?.bodyItems || []}
            </Body>
          </motion.div>
        </ContentNavigator>
      </div>
    </motion.div>
  );
};

export default Work;
