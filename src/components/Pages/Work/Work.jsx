import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useScroll, useMotionTemplate } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentNavigator from "../../ContentNavigator/ContentNavigator";
import ContentStack from "../../ContentNavigator/ContentStack/ContentStack";
import Content from "../../ContentNavigator/ContentStack/Content/Content";
import TabNav from "../../ContentNavigator/TabNav/TabNav";
import NavTabItem from "../../ContentNavigator/TabNav/NavTabItem";
import Body from "../../ContentNavigator/ContentStack/Content/Body/Body";
import BodyComponent from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent";
import Text from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text";
import SelectedWorks from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/SelectedWorks";
import WorkItem from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/WorkItems/WorkItem";
import Callout from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Callout/Callout";
import CalloutItem from "../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Callout/CalloutItems/CalloutItem";
import TandaThumbnail1 from "../../../assets/TANDA/Thumbnail/Thumbnail1.svg";
import TandaThumbnail2 from "../../../assets/TANDA/Thumbnail/Thumbnail2.svg";
import lightbulbIcon from "../../../assets/icons/lightbulb-2.svg";
import searchIcon from "../../../assets/icons/search.svg";
import timelineIcon from "../../../assets/icons/timeline.svg";
import usersIcon from "../../../assets/icons/users.svg";
import './Work.css';

const Work = () => {
  const [activeContentId, setActiveContentId] = useState('tanda');
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [animationPhase, setAnimationPhase] = useState('idle'); // 'idle' | 'collapsing' | 'fading' | 'navigating'
  const workContentRef = useRef(null);
  const contentNavRef = useRef(null);
  const scrollLockRef = useRef(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  // Force proper initial state on every mount
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Handle navigation to CaseStudy1 with animation sequence
  const handleNavigation = () => {
    console.log('CTA clicked! Setting animation phase to collapsing');
    setAnimationPhase('collapsing'); // Start height animation
  };

  // Debug animation phase changes
  useEffect(() => {
    console.log('Animation phase changed to:', animationPhase);
  }, [animationPhase]);

  // Styles using CSS custom properties - consistent with design system
  const styles = {
    // Typography styles
    heroTitle: {
      fontSize: 'var(--font-size-title-xl)',
      fontWeight: 'var(--font-weight-regular)',
      color: 'var(--color-primary)',
      margin: 0,
      textAlign: 'center',
      padding: '0 var(--spacing-xl)'
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

  const handleTabChange = (id) => {
    setActiveContentId(id);
  };

  const handleNextContent = () => {
    const contentIds = ['tanda', 'liftoff', 'jefuel', 'cashapp'];
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex < contentIds.length - 1) {
      setActiveContentId(contentIds[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentNavRef.current) return;
      
      const targetY = 64; // ContentNavigator trigger point
      const navRect = contentNavRef.current.getBoundingClientRect();
      const navTop = navRect.top;
      const currentScrollY = window.scrollY;

      // Scroll locking logic
      const activeContent = document.querySelector('.content.active');
      if (activeContent) {
        const isScrollingDown = currentScrollY > lastScrollY.current;
        const shouldLock = navTop <= targetY;

        if (shouldLock) {
          if (isScrollingDown) {
            if (!scrollLockRef.current) {
              activeContent.classList.add('scrollable');
              scrollLockRef.current = true;
              // Store the scroll position when locking
              lastScrollY.current = currentScrollY;
            }
            
            // Calculate scroll delta and apply it to content
            const scrollDelta = currentScrollY - lastScrollY.current;
            const currentScroll = activeContent.scrollTop;
            const maxScroll = activeContent.scrollHeight - activeContent.clientHeight;
            
            // Only scroll if we haven't reached the bottom
            if (currentScroll < maxScroll) {
              activeContent.scrollTop = Math.min(currentScroll + scrollDelta, maxScroll);
              window.scrollTo({
                top: lastScrollY.current,
                behavior: 'auto'
              });
            } else if (currentScroll >= maxScroll && scrollDelta > 0) {
              // If we're at the bottom and still scrolling down, unlock
              activeContent.classList.remove('scrollable');
              scrollLockRef.current = false;
            }
          } else if (!isScrollingDown && navTop > targetY) {
            // Unlock when scrolling up and above the target position
            if (scrollLockRef.current) {
              activeContent.classList.remove('scrollable');
              scrollLockRef.current = false;
            }
          }
        } else {
          if (scrollLockRef.current) {
            activeContent.classList.remove('scrollable');
            scrollLockRef.current = false;
          }
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer Motion scroll system - replaces manual scroll tracking
  const { scrollY } = useScroll();
  
  // Update scroll progress, but only when ready
  useEffect(() => {
    if (!isReady) {
      setScrollProgress(0);
      return;
    }
    
    const unsubscribe = scrollY.on('change', (latest) => {
      if (!workContentRef.current || !contentNavRef.current || !isReady) {
        setScrollProgress(0);
        return;
      }
      
      const headerHeight = 64;
      const targetY = 64;
      const navRect = contentNavRef.current.getBoundingClientRect();
      const navTop = navRect.top;
      
      const workRect = workContentRef.current.getBoundingClientRect();
      const startY = workRect.bottom;
      const endY = targetY;
      const progress = Math.min(Math.max((startY - navTop) / (startY - endY), 0), 1);
      
      setScrollProgress(progress);
    });
    
    return unsubscribe;
  }, [scrollY, isReady]);

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
          top: '64px',
          left: 0,
          width: '100%',
          height: '100vh',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          right: 0,
        }}
      >
        <div className="work-description" style={styles.workDescription}>
          <h2 style={styles.heroTitle}>
            Product designer with 5+ years experience building and growing products for startups in the fintech and influencer advertising spaces.
          </h2>
        </div>
        <div className="work-carousel">
          <div className="work-carousel-scroll">
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
      <div 
        ref={contentNavRef} 
        style={styles.contentNav}
      >
        <motion.div
          initial={{ height: 'auto', opacity: 1 }}
          animate={{
            height: animationPhase === 'collapsing' ? '1px' : 
                    animationPhase === 'fading' ? '1px' : 'auto',
            opacity: animationPhase === 'fading' ? 0 : 1
          }}
          transition={{
            height: { duration: 0.4, ease: "easeInOut" },
            opacity: { duration: 0.25, ease: "easeInOut" }
          }}
          onAnimationComplete={(definition) => {
            console.log('Animation completed:', definition);
            console.log('Current animation phase:', animationPhase);
            console.log('Height value:', definition.height);
            console.log('Opacity value:', definition.opacity);
            
            // Check if height animation is complete
            if (animationPhase === 'collapsing' && definition.height === '1px') {
              console.log('Height animation done, starting fade out');
              setAnimationPhase('fading');
            }
            // Check if fade animation is complete
            else if (animationPhase === 'fading' && definition.opacity === 0) {
              console.log('Fade out done, navigating to CaseStudy1');
              setAnimationPhase('navigating');
              navigate('/case-study-1');
            }
          }}
        >
          <ContentNavigator>
            <TabNav activeId={activeContentId} onTabChange={handleTabChange}>
              <NavTabItem id="tanda" index="01" title="Tanda" />
              <NavTabItem id="liftoff" index="02" title="Liftoff" />
              <NavTabItem id="jefuel" index="03" title="Jefuel" />
              <NavTabItem id="cashapp" index="04" title="CashApp" />
            </TabNav>
            <ContentStack activeId={activeContentId}>
              <Content
                id="tanda"
                isActive={activeContentId === "tanda"}
                index="01"
                title="Tanda"
                period="2024"
                icon={lightbulbIcon}
                position="Senior Product Designer"
                topLeft="index"
                topRight="period"
                bottomLeft="icon"
                bottomRight="position"
                onNext={handleNextContent}
              >
                <BodyComponent style={styles.bodyComponent}>
                  <div style={styles.flexColumn}>
                    <Text style="workBody">
                      TANDA is a fintech startup dedicated to making financial security accessible to everyone. Through our iOS and Android mobile apps, we offer a community-driven savings service that empowers users to reach their financial goals.
                    </Text>
                  </div>
                  <div style={styles.flexColumn}>
                    <img src="https://via.placeholder.com/400/300" alt="Tanda Image" style={styles.projectImage} />
                  </div>
                </BodyComponent>
                <BodyComponent>
                  <Callout title="Key Achievements">
                    <CalloutItem 
                      index="01" 
                      title="Product Roadmap & Growth Features" 
                      description="Collaborated with leadership to define product roadmap and designed multiple growth-focused features to drive user acquisition and engagement"
                    />
                    <CalloutItem 
                      index="02" 
                      title="New User Onboarding Redesign" 
                      description="Led new user onboarding redesign through user research and iterative testing, achieving 50% increase in new user growth and 60% reduction in user churn"
                    />
                    <CalloutItem 
                      index="03" 
                      title="Core Product Experience Redesign" 
                      description="Redesigned core product experience, increasing daily active users by 15% month-over-month and improving long-term user retention"
                    />
                    <CalloutItem 
                      index="04" 
                      title="Design System Implementation" 
                      description="Established comprehensive design system with component library, tokenization and documentation, eliminating engineering confusion and streamlining the design-to-development handoff process"
                    />
                  </Callout>
                </BodyComponent>
                <BodyComponent>
                  <SelectedWorks title="Selected Works" description="A collection of my work">
                    <WorkItem 
                      index="01" 
                      image={TandaThumbnail1} 
                      title="Improving our NUX to Increase User Activation Rates" 
                      description="Delightful sign-up flow that increased user retention and reduced drop off"
                      onCtaClick={handleNavigation}
                    />
                    <WorkItem index="02" title="TANDA: Core Product" description="Improved core product experience to increase user activation, retention and growth" />
                  </SelectedWorks>
                </BodyComponent>
              </Content>

              <Content
                id="liftoff"
                isActive={activeContentId === "liftoff"}
                index="02"
                title="Liftoff"
                period="2024"
                icon={searchIcon}
                position="Product Designer"
                onNext={handleNextContent}
              >
                <BodyComponent style={styles.bodyComponent}>
                  <div style={styles.flexColumn}>
                    <Text style="workBody">
                      LiftOff Mobile's Influence team aims to transform digital advertising by leveraging user-generated content (UGC) as a powerful, authentic marketing tool for brands and mobile businesses.  We bridges relationships between influencers and advertisers, providing tools to help influencers to monetize their content, and advertisers find creators who fit their specific needs.
                    </Text>
                  </div>
                  <div style={styles.flexColumn}>
                    <img src="https://via.placeholder.com/400/300" alt="Liftoff Image" style={styles.projectImage} />
                  </div>
                </BodyComponent>
                <BodyComponent>
                  <Callout title="Key Achievements">
                    <CalloutItem 
                      index="01" 
                      title="Influence Platform Design" 
                      description="Designed comprehensive influencer discovery and management platform connecting brands with authentic creators"
                    />
                    <CalloutItem 
                      index="02" 
                      title="UGC Campaign Tools" 
                      description="Created intuitive campaign creation tools enabling brands to launch user-generated content campaigns at scale"
                    />
                    <CalloutItem 
                      index="03" 
                      title="Creator Monetization Features" 
                      description="Built features allowing influencers to monetize their content through brand partnerships and sponsored campaigns"
                    />
                    <CalloutItem 
                      index="04" 
                      title="Analytics & Insights Dashboard" 
                      description="Developed comprehensive analytics dashboard providing campaign performance insights and ROI tracking"
                    />
                  </Callout>
                </BodyComponent>
                <BodyComponent>
                  <SelectedWorks title="Selected Works" description="A collection of my work">
                    <WorkItem index="01" title="Liftoff Project 1" description="Description for Liftoff Project 1" />
                    <WorkItem index="02" title="Liftoff Project 2" description="Description for Liftoff Project 2" />
                  </SelectedWorks>
                </BodyComponent>
              </Content>

              <Content
                id="jefuel"
                isActive={activeContentId === "jefuel"}
                index="03"
                title="Jefuel"
                period="2024"
                icon={timelineIcon}
                position="Product Designer"
                onNext={handleNextContent}
              >
                <BodyComponent style={styles.bodyComponent}>
                  <div style={styles.flexColumn}>
                    <Text style="workBody">
                      Jetfuel was a premier influencer marketing platform that empowered creators to take control of their monetization. Our iOS app The Plug, provided influencers the autonomy to easily discover and connect with advertisers they wanted to work with, enabling them to launch campaigns seamlessly and build sustainable income through authentic partnerships.
                    </Text>
                  </div>
                  <div style={styles.flexColumn}>
                    <img src="https://via.placeholder.com/400/300" alt="Jefuel Image" style={styles.projectImage} />
                  </div>
                </BodyComponent>
                <BodyComponent>
                  <Callout title="Key Achievements">
                    <CalloutItem 
                      index="01" 
                      title="Product Strategy & Vision" 
                      description="Collaborated with leadership to define product roadmap and designed multiple growth-focused features to drive user acquisition and engagement"
                    />
                    <CalloutItem 
                      index="02" 
                      title="User Experience Design" 
                      description="Led comprehensive UX redesign through user research and iterative testing, improving user satisfaction and engagement metrics"
                    />
                    <CalloutItem 
                      index="03" 
                      title="Core Feature Development" 
                      description="Designed and implemented core product features that increased user retention and daily active usage"
                    />
                    <CalloutItem 
                      index="04" 
                      title="Design System & Documentation" 
                      description="Established comprehensive design system with component library and documentation, streamlining development workflows"
                    />
                  </Callout>
                </BodyComponent>
                <BodyComponent>
                  <SelectedWorks title="Selected Works" description="A collection of my work">
                    <WorkItem index="01" title="Jefuel Project 1" description="Description for Jefuel Project 1" />
                    <WorkItem index="02" title="Jefuel Project 2" description="Description for Jefuel Project 2" />
                  </SelectedWorks>
                </BodyComponent>
              </Content>

              <Content
                id="cashapp"
                isActive={activeContentId === "cashapp"}
                index="04"
                title="CashApp"
                period="2024"
                icon={usersIcon}
                position="Product Designer"
                onNext={handleNextContent}
              >
                <BodyComponent style={styles.bodyComponent}>
                  <div style={styles.flexColumn}>
                    <Text style="workBody">
                      Cash App is a mobile payment service that makes sending, spending, saving, and investing simple and accessible. Through a single app, users can transfer money instantly, invest in stocks and bitcoin, use a customizable Cash Card for purchases, and access banking services—all designed to reimagine how people interact with money.
                    </Text>
                  </div>
                  <div style={styles.flexColumn}>
                    <img src="https://via.placeholder.com/400/300" alt="CashApp Image" style={styles.projectImage} />
                  </div>
                </BodyComponent>
                <BodyComponent>
                  <Callout title="Key Achievements">
                    <CalloutItem 
                      index="01" 
                      title="Financial Product Design" 
                      description="Designed innovative financial products and features that simplified money management for millions of users"
                    />
                    <CalloutItem 
                      index="02" 
                      title="Mobile-First Experience" 
                      description="Led mobile-first design approach creating intuitive and accessible financial tools for diverse user bases"
                    />
                    <CalloutItem 
                      index="03" 
                      title="User Growth & Engagement" 
                      description="Implemented growth-focused features and onboarding flows that significantly increased user acquisition and retention"
                    />
                    <CalloutItem 
                      index="04" 
                      title="Design Operations" 
                      description="Established design processes and systems that improved cross-functional collaboration and product development efficiency"
                    />
                  </Callout>
                </BodyComponent>
              </Content>
            </ContentStack>
          </ContentNavigator>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Work;
