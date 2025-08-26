import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CaseStudy.css';
import ContentNavigator from '../../../ContentNavigator/ContentNavigator';
import ContentStack from '../../../ContentNavigator/ContentStack/ContentStack';
import Content from '../../../ContentNavigator/ContentStack/Content/Content';
import TabNav from '../../../ContentNavigator/TabNav/TabNav';
import NavTabItem from '../../../ContentNavigator/TabNav/NavTabItem';
import Body from '../../../ContentNavigator/ContentStack/Content/Body/Body';
import BodyComponent from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent';
import Text from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text';
import Image from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Image/Image';
import FullCard from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/FullCard/FullCard';
import CardGroup from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/CardGroup';
import Card from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/Card/Card';
import SelectedWorks from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/SelectedWorks';
import WorkItem from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/WorkItems/WorkItem';
import Tile from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Tile/Tile';
import TileColumn from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TileColumn/TileColumn';
import { motion, useScroll, useTransform } from 'framer-motion';
import TandaThumbnail1 from '../../../../assets/TANDA/CaseStudy1/Thumbnail/TandaThumbnail1.svg';
import OnboardingFunnelChart from '../../../../assets/TANDA/CaseStudy1/onboarding-funnel-chart.svg';
import Figure01 from '../../../../assets/TANDA/CaseStudy1/Figure 01.svg';
import Icon from '../../../../components/Icon';
import { ICON_PATHS } from '../../../../utils/iconPaths';



const CaseStudy = () => {
  const [activeContentId, setActiveContentId] = useState('problem');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [shouldAnimate, setShouldAnimate] = useState(true); // Control animation state
  const [isExiting, setIsExiting] = useState(false); // Track exit animation
  const caseStudyContentRef = useRef(null);
  const contentNavRef = useRef(null);
  const carouselScrollRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Debug component lifecycle
  useEffect(() => {
    console.log('📱 CaseStudy component MOUNTED');
    return () => {
      console.log('📱 CaseStudy component UNMOUNTED');
    };
  }, []);

  // Force animation when navigating to this page
  useEffect(() => {
    console.log('CaseStudy location changed, triggering entrance animation');
    setShouldAnimate(true); // Trigger animation immediately
    setIsExiting(false); // Not exiting
  }, [location.pathname]);

  // Handle exit animation before navigation
  const handleExitNavigation = (targetPath) => {
    console.log('Starting exit animation to:', targetPath);
    setIsExiting(true);
    setShouldAnimate(false);
    
    // Navigate after exit animation completes
    setTimeout(() => {
      navigate(targetPath);
    }, 800); // Match the transition duration
  };

  const handleTabChange = (id) => {
    setActiveContentId(id);
  };

  const handleNextContent = () => {
    const contentIds = ['problem', 'research', 'strategy', 'solutions', 'retrospective'];
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex < contentIds.length - 1) {
      setActiveContentId(contentIds[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!caseStudyContentRef.current || !contentNavRef.current) return;
      
      const targetY = 64;
      const navRect = contentNavRef.current.getBoundingClientRect();
      const navTop = navRect.top;
      
      const caseStudyRect = caseStudyContentRef.current.getBoundingClientRect();
      const startY = caseStudyRect.bottom;
      const endY = targetY;
      const progress = Math.min(Math.max((startY - navTop) / (startY - endY), 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleCarouselScroll = (e) => {
      console.log('Carousel Scroll Position:', e.target.scrollLeft);
      console.log('Carousel Scroll Width:', e.target.scrollWidth);
      console.log('Carousel Client Width:', e.target.clientWidth);
    };

    const carouselElement = carouselScrollRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('scroll', handleCarouselScroll);
      return () => carouselElement.removeEventListener('scroll', handleCarouselScroll);
    }
  }, []);

  useEffect(() => {
    const logContainerWidths = () => {
      const content = document.querySelector('.casestudy-content');
      const info = document.querySelector('.casestudy-info');
      const image = document.querySelector('.casestudy-image');
      const carousel = document.querySelector('.casestudy-image-carousel');
      const scroll = document.querySelector('.carousel-scroll');

      console.log('Container Widths:');
      console.log('Content:', content?.offsetWidth);
      console.log('Info:', info?.offsetWidth);
      console.log('Image:', image?.offsetWidth);
      console.log('Carousel:', carousel?.offsetWidth);
      console.log('Scroll:', scroll?.offsetWidth);
    };

    // Log initial widths
    logContainerWidths();

    // Log widths on resize
    window.addEventListener('resize', logContainerWidths);
    return () => window.removeEventListener('resize', logContainerWidths);
  }, []);

  // Framer Motion values
  const minY = 24;
  const maxY = viewportHeight * 0.8;
  const translateY = (1 - scrollProgress) * (maxY - minY) + minY;
  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.2;

  return (
    <motion.div
      key="casestudy-page" // Add unique key to force proper remounting
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut" // Simple, subtle easing
      }}
      onAnimationStart={(definition) => console.log('CaseStudy animation started:', definition)}
      onAnimationComplete={(definition) => console.log('CaseStudy animation completed:', definition)}
      onUpdate={(latest) => console.log('CaseStudy animation update:', latest)}
    >
      <div className="casestudy-page">
        <motion.div
          className="casestudy-content-section"
          ref={caseStudyContentRef}
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
          <div className="casestudy-content">
            <div className="casestudy-info">
              <div className="casestudy-title">
                <div className="casestudy-title-top">
                  <span className="S1">01</span>
                  <span className="S1">2023</span>
                </div>
                <h2 className="casestudy-title-text H2">
                  Designing a NUX to Improve User Sign Up and Activation
                </h2>
                <div className="casestudy-title-bottom">
                  <span className="S1">Case Study</span>
                  <span className="S1">User Growth</span>
                </div>
              </div>
              <div className="casestudy-divider"></div>
              <p className="casestudy-description">
              Through this project, we streamlined the sign-up and onboarding experience to reduce drop-off and improve user activation. By simplifying the account creation flow and clearly highlighting our product's value propositions, we lowered barriers to entry and encouraged more users to complete the process. Updating our new user experience with a late-binding onboarding approach allowed us to guide users more effectively, educate them on key features, and build trust from the start.
              </p>
            </div>
            <div className="casestudy-image">
              <div className="casestudy-image-carousel">
                <div className="carousel-scroll" ref={carouselScrollRef}>
                  <img 
                    src={TandaThumbnail1} 
                    alt="Tanda Mobile App Preview 1" 
                  />
                  <img 
                    src={TandaThumbnail1} 
                    alt="Tanda Mobile App Preview 2" 
                  />
                  <img 
                    src={TandaThumbnail1} 
                    alt="Tanda Mobile App Preview 3" 
                  />
                </div>
              </div>
              <div className="casestudy-divider"></div>
              <div className="casestudy-impact">
                <div className="casestudy-impact-top">
                  <h3 className="S1">Impact</h3>
                </div>
                <div className="casestudy-impact-content">
                  <div className="casestudy-impact-metric">
                    <div className="casestudy-impact-metric-top">
                      <span className="S1">01</span>
                      <Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />
                    </div>
                    <div className="casestudy-impact-metric-text">
                      <span>48%</span>
                    </div>
                    <div className="casestudy-impact-metric-bottom">
                      <span className="S1">User Sign Up</span>
                    </div>
                  </div>
                  <div className="casestudy-impact-metric">
                    <div className="casestudy-impact-metric-top">
                      <span className="S1">02</span>
                      <Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />
                    </div>
                    <div className="casestudy-impact-metric-text">
                      <span>32%</span>
                    </div>
                    <div className="casestudy-impact-metric-bottom">
                      <span className="S1">Activation Rate</span>
                    </div>
                  </div>
                  <div className="casestudy-impact-metric">
                    <div className="casestudy-impact-metric-top">
                      <span className="S1">03</span>
                      <Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />
                    </div>
                    <div className="casestudy-impact-metric-text">
                      <span>24%</span>
                    </div>
                    <div className="casestudy-impact-metric-bottom">
                      <span className="S1">Support Inquiries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div ref={contentNavRef} style={{ zIndex: 2, position: 'relative', marginTop: '100vh' }}>
          <ContentNavigator>
            <TabNav activeId={activeContentId} onTabChange={handleTabChange}>
              <NavTabItem id="problem" index="01" title="The Challenge" />
              <NavTabItem id="research" index="02" title="Research & Discovery" />
              <NavTabItem id="strategy" index="03" title="Strategy" />
              <NavTabItem id="solutions" index="04" title="Solutions" />
              <NavTabItem id="retrospective" index="05" title="Retrospective" />
            </TabNav>
            <ContentStack activeId={activeContentId}>
              <Content
                id="problem"
                isActive={activeContentId === "problem"}
                index="01"
                subtitle="Defining the Problem and Setting Goals"
                title="The Challenge"
                icon={<Icon svgPath={ICON_PATHS.solidIso} size="xl" />}
                secondIcon={<Icon svgPath={ICON_PATHS.arrowDown} size="small" />}
                period=""
                onNext={handleNextContent}
              >
                <BodyComponent style={{ gridTemplateColumns: '1fr 1fr' }}>
                <Text 
                subtitle="The Problem"
                style="B1"
              >
                Our analytics showed a major drop-off between installation and account creation..Despite high app downloads, many users didn't complete sign-up.  <br /> <br /> Of those who did sign up, many failed to activate — stalling during onboarding and missing key product actions. This pointed to deeper issues in how we introduced the product and guided users early on.
                </Text>
                  <Image src={Figure01} alt="Onboarding funnel drop-off chart showing conversion from app download to activation" />
                </BodyComponent>
                <BodyComponent style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                  <Tile
                    index="01"
                    title="Sign Up Rate"
                    bottomLeft={<span className="S1">High Drop-Off</span>}
                    bottomRight={null}
                    body="Only 30% of users who downloaded the app completed sign-up. <br /><br />Friction from our email-only flow and unclear verification may have caused early abandonment."
                    icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
                  />
                  <Tile
                    index="02"
                    title="Activation Rate"
                    bottomLeft={<span className="S1">High Drop Off</span>}
                    body="Of the users who signed up, only 25% of those users completed on boarding to be an activated user <br /><br />This metrics shows that users may have a difficult time interacting with our product."
                    icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
                  />
                  <Tile
                    index="03"
                    title="On Boarding Time"
                    bottomLeft={<span className="S1">Long Completion Time</span>}
                    bottomRight={null}
                    body="Average time to complete on boarding was over 24 hours. <br /><br />There are issues within our on boarding flow causing the process to take longer than desired"
                    icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
                  />
                </BodyComponent>
                <div className="break-line" />
                
                <BodyComponent>
                  <Text 
                    subtitle="Goals"
                    style="B1"
                  >
                    Our primary goal was to improve the NUX so we could grow our active user base and learn from their behavior. By increasing activation, we'd not only retain more users, but also gather richer insights to guide product decisions and drive long-term growth.  <br /><br />  In order to reach this goal, we mapped out our KPIs as business goals, and also laid out what our perceived user goals were:

                  </Text>
                </BodyComponent>
                
                <BodyComponent style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <TileColumn gap="16px" subtitle="Business Goals">
                    <Tile
                      index="01"
                      title="Increase Sign Up Conversion"
                      bottomLeft={<span className="S1">KPI: % of Downloads that Complete Sign Up</span>}
                      bottomRight={null}
                      body="Target: +50% Increase <br /><br />We want to get more users to complete the account creation flow successfully."
                      icon={<Icon svgPath={ICON_PATHS.solidSunAlt} size="small" />}
                    />
                    <Tile
                      index="02"
                      title="Analytics Review"
                      bottomLeft={<span className="S1">KPI: % of users completing onboarding milestones</span>}
                      bottomRight={null}
                      body="Target: +50% Increase <br /><br />We want to drive more users to complete onboarding and engage with key features."
                      icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    />
                    <Tile
                      index="03"
                      title="Reduce Support Load"
                      bottomLeft={<span className="S1">KPI: % of support tickets related to NUX</span>}
                      bottomRight={null}
                      body="Target: -50% Decrease <br /><br />We want to lower the volume of onboarding-related support requests as an indicator of increased product understanding."
                      icon={<Icon svgPath={ICON_PATHS.eyeClosed} size="small" />}
                    />
                  </TileColumn>
                  
                  <TileColumn gap="16px" subtitle="User Goals">
                                      <Tile
                    index="01"
                    title="Understand Product Value"
                    bottomLeft={<span className="S1">Understand what TANDA Provides</span>}
                    bottomRight={null}
                    body="Users want to understand what TANDA can do for them before they fully commit to on boarding."
                    icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                  />
                    <Tile
                      index="02"
                      title="Access to Value"
                      bottomLeft={<span className="S1">Quickly Access Core Functionality</span>}
                      bottomRight={null}
                      body="Users want to easily access the funds cash functionality of TANDA once they've signed up"
                      icon={<Icon svgPath={ICON_PATHS.arrowRight} size="small" />}
                    />
                    <Tile
                      index="03"
                      title="Have Trust in the Platform"
                      bottomLeft={<span className="S1">Community Built on Trust</span>}
                      bottomRight={null}
                      body="As a financial platform, users want to be sure they can trust TANDA with their sensitive information"
                      icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    />
                  </TileColumn>
                </BodyComponent>
                </Content>

              <Content
                isActive={activeContentId === 'research'}
                id="research"
                index="02"
                subtitle="Developing Key Insights through User Reseaerch"
                title="Research"
                icon={<Icon svgPath={ICON_PATHS.search} size="small" />}
                secondIcon={<Icon svgPath={ICON_PATHS.arrowDown} size="small" />}
                period=""
                onNext={handleNextContent}
              >
                <BodyComponent>
                  <Text>
                    Our research process involved multiple methodologies to gather comprehensive insights about user needs and pain points.
                  </Text>
                </BodyComponent>
                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "01",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "User Flow Audit",
                      description: "We conducted a comprehensive walkthrough of the existing sign-up and onboarding experience.<ul><li>Collected internal feedback from design, product, and engineering</li><li>Identified gaps in flow, inconsistent patterns, and possible pain points</li></ul>",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                    lastCard={{
                      index: "02",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "UX Session Recordings",
                      description:"We reviewed recordings of real user interactions to observe behavior patterns. <ul><li>Noted hesitation points, rage clicks, and moments of exit</li><li>Mapped common interaction breakdowns and where friction occurred</li></ul>",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                  />
                </BodyComponent>
                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "03",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "User Interviews",
                      description: "We were able to conduct live on boarding sessions with users to directly view them completing our NUX.  During these sessions we just observed the users and were able to ask probing questions after.",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                    lastCard={{
                      index: "04",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "Competitive Analysis",
                      description: "We benchmarked onboarding flows from successful apps in fintech and adjacent industries. <ul><li>Focused on sign-up entry points, KYC timing, trust-building, and feature education</li><li>Pulled inspiration from best practices and patterns in user-first flows</li></ul>",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                  />
                </BodyComponent>

                <div className="break-line" />

                <BodyComponent>
                  <Text>
                    Through our research, we identified several key insights that would guide our design decisions and help us create a more effective and user-friendly platform.
                  </Text>
                </BodyComponent>

                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "01",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "Technical Friction Was Causing Early Exits",
                      description: "Session timeouts, Firebase auth failures, and confusing error states created trust-breaking moments before users could even see the product.",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                    lastCard={{
                      index: "02",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "The Sign-Up Flow Asked Too Much, Too Soon",
                      description: "Email-only sign-up, unclear profile picture requirements, and early KYC requests created unnecessary friction. Users hadn't yet seen the product's value, so the asks felt premature.",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                  />
                </BodyComponent>
                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "03",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "Users Didn't Know What to Do After Signing Up",
                      description: "Once in the app, many users were unsure how to proceed. There was no clear guidance, orientation, or milestone structure to show what success looked like.",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                    lastCard={{
                      index: "04",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "Competitive Analysis",
                      description: "We benchmarked onboarding flows from similar fintech apps. Key takeaways included how other apps sequence sensitive steps (like KYC), onboard with visual tours, and promote early product value.",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                  />
                </BodyComponent>
                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "03",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      title: "Users Didn't Know What to Do After Signing Up",
                      description: "Once in the app, many users were unsure how to proceed. There was no clear guidance, orientation, or milestone structure to show what success looked like.",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />
                    }}
                  />
                </BodyComponent>
              </Content>

              <Content
                id="strategy"
                index="03"
                subtitle="Planning a Phased, Principle-Driven Approach"
                title="Strategy"
                icon={<Icon svgPath={ICON_PATHS.notesMultiple} size="small" />}
                secondIcon={<Icon svgPath={ICON_PATHS.arrowDown} size="small" />}
                period=""
                onNext={handleNextContent}
              >
                <BodyComponent>
                  <Text>
                    Based on our research findings, we developed a comprehensive strategy focused on reducing friction and improving user confidence throughout the onboarding experience. Our approach centered on three key pillars that would guide our design decisions and implementation priorities.
                  </Text>
                </BodyComponent>

                <BodyComponent style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                  <Tile
                    index="01"
                    title="Earn Trust Early"
                    bottomLeft={<span className="S1">Trust translates to action</span>}
                    bottomRight={null}
                    body="Reduce the number of steps and information required during sign-up to minimize cognitive load and drop-off points."
                    icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  />
                  <Tile
                    index="02"
                    title="Reduce Cognitive Load"
                    bottomLeft={<span className="S1">Simplify the process</span>}
                    bottomRight={<span className="S1">2023</span>}
                    body="Establish user confidence through clear communication, transparent processes, and immediate value demonstration."
                    icon={<Icon svgPath={ICON_PATHS.solidSunAlt} size="small" />}
                  />
                  <Tile
                    index="03"
                    title="Guide, Don’t Overwhelm"
                    bottomLeft={<span className="S1">Create clear steps</span>}
                    bottomRight={<span className="S1">2023</span>}
                    body="Provide contextual guidance that helps users understand what to do next and why each step matters."
                    icon={<Icon svgPath={ICON_PATHS.arrowRight} size="small" />}
                  />
                </BodyComponent>

                <BodyComponent rows={1}>
                  <FullCard
                    index="01"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    title="Remove Barriers to Entry"
                    description="Our comprehensive approach to redesigning the user onboarding experience, incorporating user research insights and business objectives."
                    ctaText="View Strategy"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Strategy framework diagram" />
                    <img src="https://picsum.photos/400/540" alt="User journey mapping" />
                    <img src="https://picsum.photos/400/540" alt="Success metrics" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="02"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    title="Create Understanding of the Product and its Direct Value"
                    description="Our comprehensive approach to redesigning the user onboarding experience, incorporating user research insights and business objectives."
                    ctaText="View Strategy"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Strategy framework diagram" />
                    <img src="https://picsum.photos/400/540" alt="User journey mapping" />
                    <img src="https://picsum.photos/400/540" alt="Success metrics" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="03"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    title="Drive User Activation Through Guidance"
                    description="Our comprehensive approach to redesigning the user onboarding experience, incorporating user research insights and business objectives."
                    ctaText="View Strategy"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Strategy framework diagram" />
                    <img src="https://picsum.photos/400/540" alt="User journey mapping" />
                    <img src="https://picsum.photos/400/540" alt="Success metrics" />
                  </FullCard>
                </BodyComponent>
              </Content>

              <Content
                isActive={activeContentId === 'solutions'}
                id="solutions"
                index="04"
                subtitle="Implementing and Iterating on Final Designs"
                title="Solutions"
                icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                secondIcon={<Icon svgPath={ICON_PATHS.arrowDown} size="small" />}
                period=""
                onNext={handleNextContent}
              >
                <BodyComponent>
                  <Text>
                    Based on our research and insights, we developed a comprehensive solution that addressed the core problems while maintaining flexibility for future growth. Each solution was carefully designed to meet specific user needs and business objectives.
                  </Text>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="01"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    title="Streamlined Onboarding"
                    description="A simplified onboarding process that reduces friction and increases user conversion."
                    ctaText="View Details"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Onboarding solution" />
                    <img src="https://picsum.photos/400/540" alt="Onboarding metrics" />
                    <img src="https://picsum.photos/400/540" alt="Onboarding feedback" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="02"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="xl" />}
                    title="Enhanced Navigation"
                    description="Improved information architecture and navigation patterns for better user flow."
                    ctaText="View Details"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Navigation solution" />
                    <img src="https://picsum.photos/400/540" alt="Navigation testing" />
                    <img src="https://picsum.photos/400/540" alt="Navigation feedback" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="03"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="xl" />}
                    title="Mobile Optimization"
                    description="Responsive design improvements for better mobile experience."
                    ctaText="View Details"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Mobile optimization" />
                    <img src="https://picsum.photos/400/540" alt="Mobile testing" />
                    <img src="https://picsum.photos/400/540" alt="Mobile metrics" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="04"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="xl" />}
                    title="Performance Improvements"
                    description="Technical optimizations for faster load times and smoother interactions."
                    ctaText="View Details"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Performance metrics" />
                    <img src="https://picsum.photos/400/540" alt="Performance testing" />
                    <img src="https://picsum.photos/400/540" alt="Performance results" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="05"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="xl" />}
                    title="User Feedback Integration"
                    description="New features for collecting and implementing user feedback."
                    ctaText="View Details"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Feedback system" />
                    <img src="https://picsum.photos/400/540" alt="Feedback analysis" />
                    <img src="https://picsum.photos/400/540" alt="Feedback implementation" />
                  </FullCard>
                </BodyComponent>
              </Content>

              <Content
                isActive={activeContentId === 'retrospective'}
                id="retrospective"
                index="05"
                subtitle="Evaluating Impact and Identifying Next Steps"
                title="Retrospective"
                icon={<Icon svgPath={ICON_PATHS.replyAll} size="small" />}
                secondIcon={<Icon svgPath={ICON_PATHS.arrowDown} size="small" />}
                period=""
                onNext={handleNextContent}
              >
                <BodyComponent rows={1}>
                  <FullCard
                    index="06"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="xl" />}
                    title="Project Retrospective"
                    description="Reflecting on what we learned and achieved throughout the project."
                    ctaText="View Details"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  >
                    <img src="https://picsum.photos/400/540" alt="Retrospective visualization 1" />
                    <img src="https://picsum.photos/400/540" alt="Retrospective visualization 2" />
                    <img src="https://picsum.photos/400/540" alt="Retrospective visualization 3" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1} style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <Text>
                    Looking back on the project, we achieved our primary goals while learning valuable lessons about the development process and user needs.
                  </Text>
                  <Text>
                    The retrospective phase helped us identify areas for improvement and best practices to carry forward into future projects.
                  </Text>
                </BodyComponent>
              </Content>
            </ContentStack>
          </ContentNavigator>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudy; 