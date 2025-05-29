import React, { useState, useRef, useEffect } from 'react';
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
import IconSvg from '../../../../assets/icons/eye.svg';
import CardGroup from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/CardGroup';
import Card from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/Card/Card';
import SelectedWorks from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/SelectedWorks';
import WorkItem from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/WorkItems/WorkItem';
import Tile from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Tile/Tile';
import { motion } from 'framer-motion';
import TandaThumbnail1 from '../../../../assets/TANDA/CaseStudy1/Thumbnail/TandaThumbnail1.svg';

const CaseStudy = () => {
  const [activeContentId, setActiveContentId] = useState('problem');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const caseStudyContentRef = useRef(null);
  const contentNavRef = useRef(null);
  const scrollLockRef = useRef(false);
  const carouselScrollRef = useRef(null);

  const handleTabChange = (id) => {
    setActiveContentId(id);
  };

  const handleNextContent = () => {
    const contentIds = ['problem', 'goals', 'research', 'insights', 'solutions', 'retrospective'];
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
      const headerHeight = 64;
      const targetY = 24;
      const navRect = contentNavRef.current.getBoundingClientRect();
      const navTop = navRect.top;
      
      // Calculate progress: 1 when navTop == targetY, 0 when navTop is just below caseStudyContent
      const caseStudyRect = caseStudyContentRef.current.getBoundingClientRect();
      const startY = caseStudyRect.bottom; // nav just below case study content
      const endY = targetY;
      const progress = Math.min(Math.max((startY - navTop) / (startY - endY), 0), 1);
      setScrollProgress(progress);

      // Add/remove scrollable class based on navTop position
      const activeContent = document.querySelector('.content.active');
      if (activeContent) {
        if (navTop <= targetY) {
          activeContent.classList.add('scrollable');
          const scrollOffset = window.scrollY + navTop - targetY;
          window.scrollTo({ top: scrollOffset, behavior: 'auto' });
          scrollLockRef.current = true;
        } else {
          activeContent.classList.remove('scrollable');
          scrollLockRef.current = false;
        }
      }
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
  const minY = 24; // Changed from 88 to 24
  const maxY = viewportHeight * 0.8; // Reduce the maximum scroll distance to 80% of viewport height
  const translateY = (1 - scrollProgress) * (maxY - minY) + minY;
  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.2;

  return (
    <div>
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
              Through this project, we streamlined the sign-up and onboarding experience to reduce drop-off and improve user activation. By simplifying the account creation flow and clearly highlighting our product’s value propositions, we lowered barriers to entry and encouraged more users to complete the process. Updating our new user experience with a late-binding onboarding approach allowed us to guide users more effectively, educate them on key features, and build trust from the start.
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
                      <span className="S1">Value 1</span>
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
                      <span className="S1">Value 2</span>
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
                      <span className="S1">Value 3</span>
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
              <NavTabItem id="problem" index="01" title="Problem" />
              <NavTabItem id="goals" index="02" title="Goals" />
              <NavTabItem id="research" index="03" title="Research" />
              <NavTabItem id="insights" index="04" title="Insights" />
              <NavTabItem id="solutions" index="05" title="Solutions" />
              <NavTabItem id="retrospective" index="06" title="Retrospective" />
            </TabNav>
            <ContentStack activeId={activeContentId}>
              <Content
                id="problem"
                isActive={activeContentId === "problem"}
                index="01"
                subtitle="Understanding the Challenge"
                title="Problem"
                icon="problem"
                period="2023"
                onNext={handleNextContent}
              >
                <BodyComponent style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <Text>
                    Despite strong app download numbers, we faced a critical challenge: users weren't completing the sign-up process. Our analytics revealed a significant drop-off between app installation and account creation.
                  </Text>
                  <Image src="https://picsum.photos/800/600" alt="Tanda mobile app problem illustration" />
                </BodyComponent>
                <BodyComponent style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                  <Tile
                    index="01"
                    title="Complex Sign Up"
                    bottomLeft={<span className="S1">Issue</span>}
                    bottomRight={<span className="S1">2023</span>}
                    body="The existing sign-up process required too many steps and information, causing users to abandon the process."
                  />
                  <Tile
                    index="02"
                    title="Poor Onboarding"
                    bottomLeft={<span className="S1">Issue</span>}
                    bottomRight={<span className="S1">2023</span>}
                    body="New users lacked clear guidance on how to get started, leading to confusion and early drop-offs."
                  />
                  <Tile
                    index="03"
                    title="Technical Barriers"
                    bottomLeft={<span className="S1">Issue</span>}
                    bottomRight={<span className="S1">2023</span>}
                    body="Technical issues during sign-up and verification created additional friction points for users."
                  />
                </BodyComponent>
              </Content>

              <Content
                isActive={activeContentId === 'goals'}
                id="goals"
                index="02"
                subtitle="Defining Success"
                title="Goals"
                icon={IconSvg}
                period="2024"
                onNext={handleNextContent}
              >
                <BodyComponent>
                  <Text>
                    Our primary goals were to improve user experience, increase efficiency, and create a more scalable solution. We established clear metrics to measure success and ensure we were meeting user needs effectively.
                  </Text>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="02"
                    icon={IconSvg}
                    title="Project Goals"
                    description="Setting clear objectives and success metrics for the project."
                    ctaText="View Details"
                    ctaIcon={IconSvg}
                  >
                    <img src="https://picsum.photos/400/540" alt="Goals visualization 1" />
                    <img src="https://picsum.photos/400/540" alt="Goals visualization 2" />
                    <img src="https://picsum.photos/400/540" alt="Goals visualization 3" />
                  </FullCard>
                </BodyComponent>
              </Content>

              <Content
                isActive={activeContentId === 'research'}
                id="research"
                index="03"
                subtitle="Gathering Insights"
                title="Research"
                icon={IconSvg}
                period="2024"
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
                      icon: IconSvg,
                      title: "User Interviews",
                      description: "Conducted 15 in-depth interviews with current users to understand their workflow and pain points.",
                      ctaText: "View Details",
                      ctaIcon: IconSvg
                    }}
                    lastCard={{
                      index: "02",
                      icon: IconSvg,
                      title: "Usability Testing",
                      description: "Observed 20 users completing common tasks to identify friction points in the current interface.",
                      ctaText: "View Details",
                      ctaIcon: IconSvg
                    }}
                  />
                </BodyComponent>
                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "03",
                      icon: IconSvg,
                      title: "Analytics Review",
                      description: "Analyzed usage patterns and drop-off points from 3 months of user data.",
                      ctaText: "View Details",
                      ctaIcon: IconSvg
                    }}
                    lastCard={{
                      index: "04",
                      icon: IconSvg,
                      title: "Competitive Analysis",
                      description: "Evaluated 5 competing products to identify industry best practices and opportunities.",
                      ctaText: "View Details",
                      ctaIcon: IconSvg
                    }}
                  />
                </BodyComponent>
              </Content>

              <Content
                id="insights"
                index="04"
                subtitle="Key Insights"
                title="Understanding User Needs"
                icon={IconSvg}
                period="2023"
              >
                <BodyComponent>
                  <Text>
                    Through our research, we identified several key insights that would guide our design decisions and help us create a more effective and user-friendly platform.
                  </Text>
                </BodyComponent>

                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "01",
                      icon: IconSvg,
                      title: "User Pain Points",
                      description: "Understanding the challenges users face in their daily operations",
                      ctaText: "View Research",
                      ctaIcon: IconSvg,
                      images: [
                        'https://picsum.photos/540/540?random=1',
                        'https://picsum.photos/540/540?random=2',
                        'https://picsum.photos/540/540?random=3'
                      ]
                    }}
                    lastCard={{
                      index: "02",
                      icon: IconSvg,
                      title: "User Goals",
                      description: "Identifying what users want to achieve with the platform",
                      ctaText: "View Research",
                      ctaIcon: IconSvg,
                      images: [
                        'https://picsum.photos/540/540?random=4',
                        'https://picsum.photos/540/540?random=5',
                        'https://picsum.photos/540/540?random=6'
                      ]
                    }}
                  />
                </BodyComponent>

                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "03",
                      icon: IconSvg,
                      title: "User Behavior",
                      description: "Analyzing how users interact with the current platform",
                      ctaText: "View Research",
                      ctaIcon: IconSvg,
                      images: [
                        'https://picsum.photos/540/540?random=7',
                        'https://picsum.photos/540/540?random=8',
                        'https://picsum.photos/540/540?random=9'
                      ]
                    }}
                    lastCard={{
                      index: "04",
                      icon: IconSvg,
                      title: "User Feedback",
                      description: "Gathering insights from user interviews and surveys",
                      ctaText: "View Research",
                      ctaIcon: IconSvg,
                      images: [
                        'https://picsum.photos/540/540?random=10',
                        'https://picsum.photos/540/540?random=11',
                        'https://picsum.photos/540/540?random=12'
                      ]
                    }}
                  />
                </BodyComponent>

                <BodyComponent>
                  <CardGroup
                    firstCard={{
                      index: "05",
                      icon: IconSvg,
                      title: "Market Analysis",
                      description: "Understanding the competitive landscape and market trends",
                      ctaText: "View Research",
                      ctaIcon: IconSvg,
                      images: [
                        'https://picsum.photos/540/540?random=13',
                        'https://picsum.photos/540/540?random=14',
                        'https://picsum.photos/540/540?random=15'
                      ]
                    }}
                    lastCard={{
                      index: "06",
                      icon: IconSvg,
                      title: "Industry Best Practices",
                      description: "Identifying successful patterns and approaches in the industry",
                      ctaText: "View Research",
                      ctaIcon: IconSvg,
                      images: [
                        'https://picsum.photos/540/540?random=16',
                        'https://picsum.photos/540/540?random=17',
                        'https://picsum.photos/540/540?random=18'
                      ]
                    }}
                  />
                </BodyComponent>
              </Content>

              <Content
                isActive={activeContentId === 'solutions'}
                id="solutions"
                index="05"
                subtitle="Our Approach"
                title="Solutions"
                icon={IconSvg}
                period="2024"
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
                    icon={IconSvg}
                    title="Streamlined Onboarding"
                    description="A simplified onboarding process that reduces friction and increases user conversion."
                    ctaText="View Details"
                    ctaIcon={IconSvg}
                  >
                    <img src="https://picsum.photos/400/540" alt="Onboarding solution" />
                    <img src="https://picsum.photos/400/540" alt="Onboarding metrics" />
                    <img src="https://picsum.photos/400/540" alt="Onboarding feedback" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="02"
                    icon={IconSvg}
                    title="Enhanced Navigation"
                    description="Improved information architecture and navigation patterns for better user flow."
                    ctaText="View Details"
                    ctaIcon={IconSvg}
                  >
                    <img src="https://picsum.photos/400/540" alt="Navigation solution" />
                    <img src="https://picsum.photos/400/540" alt="Navigation testing" />
                    <img src="https://picsum.photos/400/540" alt="Navigation feedback" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="03"
                    icon={IconSvg}
                    title="Mobile Optimization"
                    description="Responsive design improvements for better mobile experience."
                    ctaText="View Details"
                    ctaIcon={IconSvg}
                  >
                    <img src="https://picsum.photos/400/540" alt="Mobile optimization" />
                    <img src="https://picsum.photos/400/540" alt="Mobile testing" />
                    <img src="https://picsum.photos/400/540" alt="Mobile metrics" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="04"
                    icon={IconSvg}
                    title="Performance Improvements"
                    description="Technical optimizations for faster load times and smoother interactions."
                    ctaText="View Details"
                    ctaIcon={IconSvg}
                  >
                    <img src="https://picsum.photos/400/540" alt="Performance metrics" />
                    <img src="https://picsum.photos/400/540" alt="Performance testing" />
                    <img src="https://picsum.photos/400/540" alt="Performance results" />
                  </FullCard>
                </BodyComponent>
                <BodyComponent rows={1}>
                  <FullCard
                    index="05"
                    icon={IconSvg}
                    title="User Feedback Integration"
                    description="New features for collecting and implementing user feedback."
                    ctaText="View Details"
                    ctaIcon={IconSvg}
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
                index="06"
                subtitle="Looking Back"
                title="Retrospective"
                icon={IconSvg}
                period="2024"
                onNext={handleNextContent}
              >
                <BodyComponent rows={1}>
                  <FullCard
                    index="06"
                    icon={IconSvg}
                    title="Project Retrospective"
                    description="Reflecting on what we learned and achieved throughout the project."
                    ctaText="View Details"
                    ctaIcon={IconSvg}
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
    </div>
  );
};

export default CaseStudy; 