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
import TitleSection from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/TitleSection';
import WorkItem from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/WorkItems/WorkItem';
import Tile from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Tile/Tile';
import TileColumn from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TileColumn/TileColumn';
import { motion, useScroll, useTransform } from 'framer-motion';
// All TANDA Case Study 1 images
import * as CaseStudy1Images from '../../../../assets/TANDA/CaseStudy1';
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
                  Improving User Education and Building Trust During Onboarding to Increase User Growth
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
                    src={CaseStudy1Images.TandaThumbnail1} 
                    alt="Tanda Mobile App Preview 1" 
                  />
                  <img 
                    src={CaseStudy1Images.TandaThumbnail1} 
                    alt="Tanda Mobile App Preview 2" 
                  />
                  <img 
                    src={CaseStudy1Images.TandaThumbnail1} 
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
                  <Image src={CaseStudy1Images.Figure01} alt="Onboarding funnel drop-off chart showing conversion from app download to activation" />
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
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Sign Up Screen"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "Phone Verification"
                        },
                        {
                          id: "03",
                          index: "03", 
                          title: "Create Account"
                        },
                        {
                          id: "04",
                          index: "04", 
                          title: "Onboarding - Carousel"
                        },
                        {
                          id: "05",
                          index: "05", 
                          title: "User Activation - Join Circle Flow"
                        },
                        {
                          id: "06",
                          index: "06", 
                          title: "Onboarding - Link Bank"
                        },
                        {
                          id: "07",
                          index: "07", 
                          title: "Onboarding - Email Verification"
                        },
                        {
                          id: "08",
                          index: "08", 
                          title: "Onboarding - Know Your Customer (KYC) Flow"
                        },
                        {
                          id: "09",
                          index: "09", 
                          title: "Onboarding - KYC Fail States"
                        }
                      ],
                      bodyItems: [
                        // 1. Sign Up Screen - 1 Image, 2 Annotations
                        {
                          id: "01",
                          children: [
                            <img src={CaseStudy1Images.SignUpScreen} alt="Sign Up Screen showing the initial user registration process" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Missed Value Proposition Opportunity",
                              description: "Extra screen space is available but standing alone. This area could showcase key product benefits or elaborate onboarding expectations instead."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "No Clear Primary CTA",
                              description: "Sign-up and log-in buttons have equal visual weight. Prioritize signing up with visual hierarchy since most visitors are new users."
                            }
                          ]
                        },
                        // 2. Phone Verification - 2 Images, 2 Annotations
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.PhoneVerification01} alt="Phone Verification screen 01" />,
                            <img src={CaseStudy1Images.PhoneVerification02} alt="Phone Verification screen 02" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Removed Redundant Verification",
                              description: "Phone verification added clarity without technical necessity."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Simplified Information",
                              description: "One verification prompt is sufficient for account creation; we eliminated this step to streamline onboarding."
                            }
                          ]
                        },
                        // 3. Create Account - 5 images, 5 annotations
                        {
                          id: "03",
                          children: [
                            <img src={CaseStudy1Images.CreateAccount01} alt="Create Account screen 01" />,
                            <img src={CaseStudy1Images.CreateAccount02} alt="Create Account screen 02" />,
                            <img src={CaseStudy1Images.CreateAccount03} alt="Create Account screen 03" />,
                            <img src={CaseStudy1Images.CreateAccount04} alt="Create Account screen 04" />
                          ],
                          annotationSets: [
                            {
                              position: 1, // After first image
                              items: [
                                {
                                  id: "01",
                                  index: "01",
                                  title: "Information Overload",
                                  description: "Requesting too many fields simultaneously interfered with the primary names (first name, last name, email, password) overwhelms users at a critical moment. Split into disclosure—splitting inputs across multiple steps—would improve completion rates."
                                },
                                {
                                  id: "02",
                                  index: "02",
                                  title: "Ambiguous Input Purpose",
                                  description: "Email field won't make fields lack context. Users may be unclear whether they're creating an account, creating an established account, creating hesitation at a critical moment."
                                }
                              ]
                            },
                            {
                              position: 2, // After second image
                              items: [
                                {
                                  id: "03",
                                  index: "03",
                                  title: "Delayed Email Verification",
                                  description: "Email verification was not verified until weeks after sign-up and before using the product. Delaying the onboarding. This creates a fragmented experience and addresses user frustration when addresses when stakes are lower."
                                },
                                {
                                  id: "04",
                                  index: "04",
                                  title: "Profile Picture Upload",
                                  description: "Requesting a profile picture during signup adds friction. Users are unfamiliar with understanding its platform importance, resulting in incomplete profiles."
                                }
                              ]
                            },
                            {
                              position: 4, // After all images
                              items: [
                                {
                                  id: "05",
                                  index: "05",
                                  title: "Non-Essential Fields",
                                  description: "Legal agreement and job title inputs aren't required for account creation. Deferring these optional fields to post-signup would reduce friction and allows users to reach core functionality faster."
                                }
                              ]
                            }
                          ]
                        },
                        // 4. Onboarding Carousel - 2 images, 4 annotations
                        {
                          id: "04",
                          children: [
                            <img src={CaseStudy1Images.Carousel01} alt="Onboarding Carousel 01" />,
                            <img src={CaseStudy1Images.Carousel02} alt="Onboarding Carousel 02" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Overwhelming Step Count",
                              description: "Six onboarding tasks listed upfront may users experience any product view. A shorter introduction with progressive disclosure will reduce abandonment and create momentum."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Fragmented Email Verification",
                              description: "Email verification occurs during onboarding after initial input during signup. This pattern cause confusion and delays addressing critical emails."
                            },
                            {
                              id: "03",
                              index: "03",
                              title: "Action Before Value",
                              description: "Users are asked to complete tasks before experiencing what those tasks unlock and why those actions matter. Reordering actions so users taste value would increase engagement."
                            },
                            {
                              id: "04",
                              index: "04",
                              title: "Unclear Progression Logic",
                              description: "The numbered carousel doesn't require prior completion to create confusion. Without full information. The entire carousel needs dependencies and flow."
                            }
                          ]
                        },
                        // 5. User Activation - Join Circle Flow - 2 images, 2 annotations
                        {
                          id: "05",
                          children: [
                            <img src={CaseStudy1Images.UserActivation01} alt="User Activation 01" />,
                            <img src={CaseStudy1Images.UserActivation02} alt="User Activation 02" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Something about the onboarding carousel",
                              description: "The carousel is a critical onboarding process"
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "The carousel ticker?",
                              description: "Redundant? not the the only verification step, email verification so are verification we are all required to"
                            }
                          ]
                        },
                        // 6. Onboarding - Link Bank - 2 images, 1 annotation
                        {
                          id: "06",
                          children: [
                            <img src={CaseStudy1Images.LinkBank01} alt="Link Bank 01" />,
                            <img src={CaseStudy1Images.LinkBank02} alt="Link Bank 02" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Third-Party Integration",
                              description: "Bank linking is handled through Plaid, a trusted third-party provider. This outsources security and compliance but fragments the user experience."
                            }
                          ]
                        },
                        // 7. Onboarding - Email Verification - 1 image, 2 annotations
                        {
                          id: "07",
                          children: [
                            <img src={CaseStudy1Images.EmailVerification01} alt="Email Verification 01" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Misplaced Verification Step",
                              description: "Email verification should occur immediately after input during account creation, not post-onboarding. Early verification catches invalid addresses when stakes are lower."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Missing Error States",
                              description: "No clear indicators for resend or pending verification. Users can't easily resend codes or troubleshoot delays, causing frustration and abandonment."
                            }
                          ]
                        },
                        // 8. Onboarding - Know Your Customer (KYC) Flow - 3 images, 4 annotations
                        {
                          id: "08",
                          children: [
                            <img src={CaseStudy1Images.KYC01} alt="KYC Flow 01" />,
                            <img src={CaseStudy1Images.KYC02} alt="KYC Flow 02" />,
                            <img src={CaseStudy1Images.KYC021} alt="KYC Flow 02-1" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Missing Context and Purpose",
                              description: "Users are dropped into forms without explanation of what's being collected or why. Upfront clarity and demonstrated value would reduce anxiety and incentivize thorough data entry."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Single-Page Form Overload",
                              description: "All KYC fields appear on one screen, creating cognitive overload. Breaking this into smaller, logical steps would improve completion rates."
                            },
                            {
                              id: "03",
                              index: "03",
                              title: "Insufficient Trust for Sensitive Data",
                              description: "Requesting SSN without demonstrated value. Users haven't experienced platform benefit to justify sharing sensitive information."
                            },
                            {
                              id: "04",
                              index: "04",
                              title: "Unexplained Document Requests",
                              description: "Additional document uploads lack context and reason for verification fails. Users need to understand what information is required and how it will be used."
                            }
                          ]
                        },
                        // 9. Onboarding - KYC Fail States - 4 images, 2 annotations
                        {
                          id: "09",
                          children: [
                            <img src={CaseStudy1Images.KYCFail01} alt="KYC Fail States 01" />,
                            <img src={CaseStudy1Images.KYCFail02} alt="KYC Fail States 02" />,
                            <img src={CaseStudy1Images.KYCFail021} alt="KYC Fail States 02-1" />,
                            <img src={CaseStudy1Images.KYCFail022} alt="KYC Fail States 02-2" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Unclear State Communication",
                              description: "Rejection and review states look similar. Users don't understand what went wrong, what specific issues to fix or what actions they can take."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Misleading Timeline Expectation",
                              description: "Stating 1-3 business days for reviews takes typically complete within an hour discourages users and increases abandonment."
                            }
                          ]
                        }
                      ]
                    }}
                    lastCard={{
                      index: "02",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "UX Session Recordings",
                      description: "We reviewed recordings of real user interactions to observe behavior patterns. <ul><li>Noted hesitation points, rage clicks, and moments of exit</li><li>Mapped common interaction breakdowns and where friction occurred</li></ul>",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Log In Button Misleading New Users"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "Users Continue Past Profile Picture Field"
                        },
                        {
                          id: "03",
                          index: "03", 
                          title: "Users Leave Home Screen During Onboarding"
                        },
                        {
                          id: "04",
                          index: "04", 
                          title: "KYC Flow Causing Onboarding Bottleneck"
                        }
                      ],
                      bodyItems: [
                        // 01. Log In Button Misleading New Users - 3 screens, 2 annotations
                        {
                          id: "01",
                          children: [
                            <img src={CaseStudy1Images.Research2MisleadingLogin01} alt="Misleading login flow showing user confusion" />,
                            <img src={CaseStudy1Images.Research2MisleadingLogin02} alt="Login interface causing user drop-off" />,
                            <img src={CaseStudy1Images.Research2MisleadingLogin03} alt="User login behavior patterns and confusion" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "New Users Defaulted to \"Log In\"",
                              description: "Most new users arrived toward \"Log In\" rather than \"Sign Up,\" indicating unclear button hierarchy."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Login Page Mistaken for Sign-Up",
                              description: "Users entered new credentials expecting to sign up from the login page, then dropped off when it failed."
                            }
                          ]
                        },
                        // 02. Users Continue Past Profile Picture Field - 2 screens, 2 annotations
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.Research2ProfilePicture01} alt="Profile picture field showing low engagement" />,
                            <img src={CaseStudy1Images.Research2ProfilePicture02} alt="Account creation showing skipped profile picture" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Low Engagement with Profile Picture CTA",
                              description: "Most users ignored the profile picture prompt at the top of account creation, suggesting low visibility or unclear value proposition."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Rushed or Dismissive Behavior",
                              description: "Users who did engage either selected random images or immediately skipped, indicating they didn't understand the relevance of profile pictures for community participation."
                            }
                          ]
                        },
                        // 03. Users Leave Home Screen During Onboarding - 3 screens, 3 annotations
                        {
                          id: "03",
                          children: [
                            <img src={CaseStudy1Images.Research2LeaveOnboarding01} alt="Users leaving during onboarding showing non-sticky behavior" />,
                            <img src={CaseStudy1Images.Research2LeaveOnboarding02} alt="Onboarding abandonment patterns and navigation issues" />,
                            <img src={CaseStudy1Images.Research2LeaveOnboarding03} alt="Onboarding flow exit points and blocking alerts" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "Non-Sticky Onboarding Scrolls Away",
                              description: "The onboarding carousel lives at the top screen scrolls away with content, causing users to naturally explore the feed below."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Unclear Blocking Alerts",
                              description: "When users try joining circles without verification, error messages don't explain that onboarding is incomplete, leaving them unable to understand why actions failed."
                            },
                            {
                              id: "03",
                              index: "03",
                              title: "Unrestricted Navigation Creates False Progress",
                              description: "Users can freely navigate to Browse Circles before completing onboarding, suggesting these features are accessible when they're actually blocked."
                            }
                          ]
                        },
                        // 04. KYC Flow Causing Onboarding Bottleneck - 3 screens, 3 annotations
                        {
                          id: "04",
                          children: [
                            <img src={CaseStudy1Images.Research2KYCBottleneck01} alt="KYC bottleneck causing user drop-off" />,
                            <img src={CaseStudy1Images.Research2KYCBottleneck02} alt="KYC flow friction points and issues" />,
                            <img src={CaseStudy1Images.Research2KYCBottleneck03} alt="Identity verification bottlenecks and barriers" />
                          ],
                          annotationItems: [
                            {
                              id: "01",
                              index: "01",
                              title: "SSN Request Triggers Drop-Off",
                              description: "Users breeze through input fields, but exit the page when they encounter SSN field. Even users who reach this step leave without submitting any information."
                            },
                            {
                              id: "02",
                              index: "02",
                              title: "Pending Status Ends Engagement",
                              description: "When KYC enters pending state, 95% of users leave the app and don't return because they can't access other features while locked."
                            },
                            {
                              id: "03",
                              index: "03",
                              title: "Locked Steps Create Dead End",
                              description: "Users who skip identity verification are blocked in subsequent steps (Link Bank) blocked, forcing them back to complete entire onboarding carousel, and leave the app."
                            }
                          ]
                        }
                      ]
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
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Logistics"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "Persona 1"
                        },
                        {
                          id: "03",
                          index: "03",
                          title: "Persona 2"
                        },
                        {
                          id: "04",
                          index: "04",
                          title: "Persona 3"
                        }
                      ],
                      bodyItems: [
                        {
                          id: "01",
                          children: [
                            <img src={CaseStudy1Images.Research3Logistics} alt="Interview logistics and session setup" />
                          ]
                        },
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.Research3Persona1} alt="First user persona insights" />
                          ]
                        },
                        {
                          id: "03",
                          children: [
                            <img src={CaseStudy1Images.Research3Persona2} alt="Second user persona insights" />
                          ]
                        },
                        {
                          id: "04",
                          children: [
                            <img src={CaseStudy1Images.Research3Persona3} alt="Third user persona insights" />
                          ]
                        }
                      ]
                    }}
                    lastCard={{
                      index: "04",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "Competitive Analysis",
                      description: "We benchmarked onboarding flows from successful apps in fintech and adjacent industries. <ul><li>Focused on sign-up entry points, KYC timing, trust-building, and feature education</li><li>Pulled inspiration from best practices and patterns in user-first flows</li></ul>",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Fintech Benchmarking"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "Best Practice Analysis"
                        }
                      ],
                      bodyItems: [
                        {
                          id: "01",
                          children: [
                          ]
                        },
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.Figure01} alt="Best practices and patterns comparison" />
                          ]
                        }
                      ]
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
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Session Timeout Issues"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "Firebase Auth Failures"
                        },
                        {
                          id: "03",
                          index: "03", 
                          title: "Error State Confusion"
                        }
                      ],
                      bodyItems: [
                        {
                          id: "01",
                          children: [
                          ]
                        },
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.SignUpScreen} alt="Firebase authentication failure examples" />
                          ]
                        },
                        {
                          id: "03",
                          children: [
                            <img src={CaseStudy1Images.KYCFail01} alt="Confusing error states that break user trust" />
                          ]
                        }
                      ]
                    }}
                    lastCard={{
                      index: "02",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "The Sign-Up Flow Asked Too Much, Too Soon",
                      description: "Email-only sign-up, unclear profile picture requirements, and early KYC requests created unnecessary friction. Users hadn't yet seen the product's value, so the asks felt premature.",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Misleading Login"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "KYC Bottleneck"
                        },
                        {
                          id: "03",
                          index: "03",
                          title: "Profile Picture"
                        },
                        {
                          id: "04",
                          index: "04",
                          title: "Leave Onboarding"
                        }
                      ],
                      bodyItems: [
                        {
                          id: "01",
                          children: [
                            <img src={CaseStudy1Images.Research2MisleadingLogin01} alt="Misleading login flow issues" />,
                            <img src={CaseStudy1Images.Research2MisleadingLogin02} alt="Login interface confusion" />,
                            <img src={CaseStudy1Images.Research2MisleadingLogin03} alt="User login behavior patterns" />
                          ]
                        },
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.Research2KYCBottleneck01} alt="KYC bottleneck causing user drop-off" />,
                            <img src={CaseStudy1Images.Research2KYCBottleneck02} alt="KYC flow friction points" />,
                            <img src={CaseStudy1Images.Research2KYCBottleneck03} alt="Identity verification issues" />
                          ]
                        },
                        {
                          id: "03",
                          children: [
                            <img src={CaseStudy1Images.Research2ProfilePicture01} alt="Profile picture friction points" />,
                            <img src={CaseStudy1Images.Research2ProfilePicture02} alt="Profile picture upload issues" />
                          ]
                        },
                        {
                          id: "04",
                          children: [
                            <img src={CaseStudy1Images.Research2LeaveOnboarding01} alt="Users leaving during onboarding" />,
                            <img src={CaseStudy1Images.Research2LeaveOnboarding02} alt="Onboarding abandonment patterns" />,
                            <img src={CaseStudy1Images.Research2LeaveOnboarding03} alt="Onboarding flow exit points" />
                          ]
                        }
                      ]
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
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Lack of Clear Guidance"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "Missing Orientation"
                        },
                        {
                          id: "03",
                          index: "03",
                          title: "No Success Milestones"
                        }
                      ],
                      bodyItems: [
                        {
                          id: "01",
                          children: [
                            <img src={CaseStudy1Images.Carousel01} alt="Users confused about next steps after sign-up" />
                          ]
                        },
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.UserActivation01} alt="Missing user orientation and onboarding guidance" />
                          ]
                        },
                        {
                          id: "03",
                          children: [
                            <img src={CaseStudy1Images.Figure01} alt="Lack of clear success milestones and progress indicators" />
                          ]
                        }
                      ]
                    }}
                    lastCard={{
                      index: "04",
                      icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
                      title: "Research Synthesis & Key Findings",
                      description: "Through comprehensive user research and analysis, we identified the core issues preventing successful user activation and engagement with the TANDA platform.",
                      ctaText: "View Details",
                      ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
                      headItems: [
                        {
                          id: "01",
                          index: "01",
                          title: "Research Summary"
                        },
                        {
                          id: "02", 
                          index: "02",
                          title: "Key Findings"
                        },
                        {
                          id: "03",
                          index: "03", 
                          title: "Opportunity Areas"
                        }
                      ],
                      bodyItems: [
                        {
                          id: "01",
                          children: [
                          ]
                        },
                        {
                          id: "02",
                          children: [
                            <img src={CaseStudy1Images.Figure01} alt="Key findings from user research and analysis" />
                          ]
                        },
                        {
                          id: "03",
                          children: [
                            <img src={CaseStudy1Images.UserActivation01} alt="Identified opportunity areas for improvement" />
                          ]
                        }
                      ]
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
                    title="Build Trust"
                    bottomLeft={<span className="S1">Legitimacy & Data Transparency</span>}
                    bottomRight={null}
                    body="Establish user confidence through clear communication about data collection, transparent processes, and demonstrating platform legitimacy from the start."
                    icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                  />
                  <Tile
                    index="02"
                    title="Build Motivation"
                    bottomLeft={<span className="S1">Understanding Value & Incentives</span>}
                    bottomRight={null}
                    body="Help users understand what TANDA offers them and why they should care through clear value propositions, referral bonuses, and social incentives."
                    icon={<Icon svgPath={ICON_PATHS.solidSunAlt} size="small" />}
                  />
                  <Tile
                    index="03"
                    title="Guide Users to Value"
                    bottomLeft={<span className="S1">Education & Clear Pathways</span>}
                    bottomRight={null}
                    body="Provide proper product education and guidance to help users navigate onboarding and reach core functionality confidently."
                    icon={<Icon svgPath={ICON_PATHS.arrowRight} size="small" />}
                  />
                </BodyComponent>

                <BodyComponent rows={1}>
                  <Card
                    index="01"
                    icon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    title="Remove Barriers to Entry"
                    description="Our comprehensive approach to redesigning the user onboarding experience, incorporating user research insights and business objectives."
                    ctaText="View Strategy"
                    ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
                    headItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Strategy Framework"
                      },
                      {
                        id: "02", 
                        index: "02",
                        title: "User Journey Mapping"
                      },
                      {
                        id: "03",
                        index: "03", 
                        title: "Success Metrics"
                      }
                    ]}
                    bodyItems={[
                      {
                        id: "01",
                        children: [],
                        annotationItems: [
                          {
                            id: "01",
                            index: "01",
                            title: "Framework Analysis",
                            description: "Our research-informed approach to reducing onboarding friction and improving user confidence."
                          },
                          {
                            id: "02",
                            index: "02", 
                            title: "Implementation Strategy",
                            description: "Phased rollout approach focusing on high-impact changes first to maximize user adoption."
                          }
                        ]
                      },
                      {
                        id: "02",
                        children: [
                          <img src={CaseStudy1Images.Figure01} alt="User journey mapping" />
                        ]
                      },
                      {
                        id: "03",
                        children: [
                          <img src={CaseStudy1Images.UserActivation01} alt="Success metrics" />
                        ]
                      }
                    ]}
                  />
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