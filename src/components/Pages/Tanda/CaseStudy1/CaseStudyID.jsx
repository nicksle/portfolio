import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CaseStudy.css';
import ContentNavigator from '../../../ContentNavigator/ContentNavigator';
import Head from '../../../ContentNavigator/ContentStack/Content/Head/Head';
import Body from '../../../ContentNavigator/ContentStack/Content/Body/Body';
import TabNav from '../../../ContentNavigator/TabNav/TabNav';
import NavTabItem from '../../../ContentNavigator/TabNav/NavTabItem';
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
import TandaThumbnail1 from '../../../../assets/TANDA/CaseStudy1/Thumbnail/TandaThumbnail1.svg';
import OnboardingFunnelChart from '../../../../assets/TANDA/CaseStudy1/onboarding-funnel-chart.svg';
import Figure01 from '../../../../assets/TANDA/CaseStudy1/Figure 01.svg';
// User Flow Audit assets
import SignUpScreen from '../../../../assets/TANDA/CaseStudy1/Sign Up Screen.svg';
// Phone Verification imports
import PhoneVerification01 from '../../../../assets/TANDA/CaseStudy1/Phone Verification/01.svg';
import PhoneVerification02 from '../../../../assets/TANDA/CaseStudy1/Phone Verification/02.svg';
// Create Account imports
import CreateAccount01 from '../../../../assets/TANDA/CaseStudy1/Create Account/01.svg';
import CreateAccount02 from '../../../../assets/TANDA/CaseStudy1/Create Account/02.svg';
import CreateAccount03 from '../../../../assets/TANDA/CaseStudy1/Create Account/03.svg';
import CreateAccount04 from '../../../../assets/TANDA/CaseStudy1/Create Account/04.svg';
// Onboarding Carousel imports
import Carousel01 from '../../../../assets/TANDA/CaseStudy1/Onboarding/Carousel/01.svg';
import Carousel02 from '../../../../assets/TANDA/CaseStudy1/Onboarding/Carousel/02.svg';
import Carousel03 from '../../../../assets/TANDA/CaseStudy1/Onboarding/Carousel/03.svg';
// Email Verification imports
import EmailVerification01 from '../../../../assets/TANDA/CaseStudy1/Onboarding/Email Verification/01.svg';
import EmailVerification02 from '../../../../assets/TANDA/CaseStudy1/Onboarding/Email Verification/02.svg';
// KYC imports
import KYC01 from '../../../../assets/TANDA/CaseStudy1/Onboarding/KYC/01.svg';
import KYC02 from '../../../../assets/TANDA/CaseStudy1/Onboarding/KYC/02.svg';
import KYC021 from '../../../../assets/TANDA/CaseStudy1/Onboarding/KYC/02-1.svg';
// KYC Fail imports
import KYCFail01 from '../../../../assets/TANDA/CaseStudy1/Onboarding/KYC Fail/01.svg';
import KYCFail02 from '../../../../assets/TANDA/CaseStudy1/Onboarding/KYC Fail/02.svg';
import KYCFail021 from '../../../../assets/TANDA/CaseStudy1/Onboarding/KYC Fail/02-1.svg';
import KYCFail022 from '../../../../assets/TANDA/CaseStudy1/Onboarding/KYC Fail/02-2.svg';
// Link Bank imports
import LinkBank01 from '../../../../assets/TANDA/CaseStudy1/Onboarding/Link Bank/01.svg';
import LinkBank02 from '../../../../assets/TANDA/CaseStudy1/Onboarding/Link Bank/02.svg';
// User Activation imports
import UserActivation01 from '../../../../assets/TANDA/CaseStudy1/User Activation/01.svg';
import UserActivation02 from '../../../../assets/TANDA/CaseStudy1/User Activation/02.svg';
// Research 2 imports
import Research2KYCBottleneck01 from '../../../../assets/TANDA/CaseStudy1/Research 2/KYC Bottleneck/01.svg';
import Research2KYCBottleneck02 from '../../../../assets/TANDA/CaseStudy1/Research 2/KYC Bottleneck/02.svg';
import Research2KYCBottleneck03 from '../../../../assets/TANDA/CaseStudy1/Research 2/KYC Bottleneck/03.svg';
import Research2LeaveOnboarding01 from '../../../../assets/TANDA/CaseStudy1/Research 2/Leave Onboarding/01.svg';
import Research2LeaveOnboarding02 from '../../../../assets/TANDA/CaseStudy1/Research 2/Leave Onboarding/02.svg';
import Research2LeaveOnboarding03 from '../../../../assets/TANDA/CaseStudy1/Research 2/Leave Onboarding/03.svg';
import Research2MisleadingLogin01 from '../../../../assets/TANDA/CaseStudy1/Research 2/Misleading Login/01.svg';
import Research2MisleadingLogin02 from '../../../../assets/TANDA/CaseStudy1/Research 2/Misleading Login/02.svg';
import Research2MisleadingLogin03 from '../../../../assets/TANDA/CaseStudy1/Research 2/Misleading Login/03.svg';
import Research2ProfilePicture01 from '../../../../assets/TANDA/CaseStudy1/Research 2/Profile Picture/01.svg';
import Research2ProfilePicture02 from '../../../../assets/TANDA/CaseStudy1/Research 2/Profile Picture/02.svg';
// Research 3 imports
import Research3Logistics from '../../../../assets/TANDA/CaseStudy1/Research 3/Logistics.svg';
import Research3Persona1 from '../../../../assets/TANDA/CaseStudy1/Research 3/Persona 1.svg';
import Research3Persona2 from '../../../../assets/TANDA/CaseStudy1/Research 3/Persona 2.svg';
import Research3Persona3 from '../../../../assets/TANDA/CaseStudy1/Research 3/Persona 3.svg';
import Icon from '../../../../components/Icon';
import { ICON_PATHS } from '../../../../utils/iconPaths';

const CaseStudyID = () => {
  const [activeContentId, setActiveContentId] = useState('problem');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextContentId, setNextContentId] = useState(null);
  const [contentHeight, setContentHeight] = useState('auto');
  const caseStudyContentRef = useRef(null);
  const contentNavRef = useRef(null);
  const carouselScrollRef = useRef(null);
  const contentScrollRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Log when component mounts for debugging
  useEffect(() => {
    console.log('📱 CaseStudyID component mounted');
    return () => {
      console.log('📱 CaseStudyID component unmounted');
    };
  }, []);

  // Handle content transition with animation
  const transitionToContent = (newId) => {
    if (newId === activeContentId || isTransitioning) return;
    
    // Measure current content height
    if (contentScrollRef.current) {
      const currentHeight = contentScrollRef.current.scrollHeight;
      setContentHeight(currentHeight);
    }
    
    setIsTransitioning(true);
    setNextContentId(newId);
    
    // After collapse animation completes, switch content and expand
    setTimeout(() => {
      setActiveContentId(newId);
      setNextContentId(null);
      
      // Reset scroll position to top when changing content
      if (contentScrollRef.current) {
        contentScrollRef.current.scrollTop = 0;
      }
      
      // End transition after expand animation
      setTimeout(() => {
        setIsTransitioning(false);
        setContentHeight('auto');
      }, 400); // Match expand animation duration
    }, 400); // Match collapse animation duration
  };

  // Handle tab changes
  const handleTabChange = (id) => {
    console.log('Tab changed to:', id);
    transitionToContent(id);
  };

  const handleNextContent = () => {
    const contentIds = ['problem', 'research', 'strategy', 'solutions', 'retrospective'];
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex < contentIds.length - 1) {
      transitionToContent(contentIds[currentIndex + 1]);
    }
  };

  // Check if we're at the last section to hide the next button
  const isLastSection = () => {
    const contentIds = ['problem', 'research', 'strategy', 'solutions', 'retrospective'];
    const currentIndex = contentIds.indexOf(activeContentId);
    return currentIndex >= contentIds.length - 1;
  };

  // Content Registry - ID-based system that replaces ContentStack
  // Each ID corresponds to a TabNavItem ID for seamless navigation
  const contentRegistry = {
    problem: {
      id: "problem",
      index: "01",
      title: "The Challenge",
      subtitle: "Defining the Problem and Setting Goals",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      bodyItems: [
        <BodyComponent key="problem-text" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Text 
            subtitle="The Problem"
            style="B1"
          >
            Our analytics showed a major drop-off between installation and account creation..Despite high app downloads, many users didn't complete sign-up.  <br /> <br /> Of those who did sign up, many failed to activate — stalling during onboarding and missing key product actions. This pointed to deeper issues in how we introduced the product and guided users early on.
          </Text>
          <Image src={Figure01} alt="Onboarding funnel drop-off chart showing conversion from app download to activation" />
        </BodyComponent>,
        <BodyComponent key="problem-tiles" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
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
        </BodyComponent>,
        <div key="problem-break" className="break-line" />,
        <BodyComponent key="problem-goals">
          <Text 
            subtitle="Goals"
            style="B1"
          >
            Our primary goal was to improve the NUX so we could grow our active user base and learn from their behavior. By increasing activation, we'd not only retain more users, but also gather richer insights to guide product decisions and drive long-term growth.  <br /><br />  In order to reach this goal, we mapped out our KPIs as business goals, and also laid out what our perceived user goals were:
          </Text>
        </BodyComponent>,
        <BodyComponent key="problem-goals-tiles" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
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
      ]
    },
    research: {
      id: "research",
      index: "02",
      title: "Research & Discovery",
      subtitle: "Developing Key Insights through User Research",
      icon1: <Icon svgPath={ICON_PATHS.search} size="small" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      bodyItems: [
        <BodyComponent key="research-intro">
          <Text 
            subtitle="Research Overview"
            style="B1"
          >
            Our research process involved multiple methodologies to gather comprehensive insights about user needs and pain points during the onboarding experience.
          </Text>
        </BodyComponent>,
        <BodyComponent key="research-cardgroup-1">
          <CardGroup
            firstCard={{
              index: "01",
              icon: <Icon svgPath={ICON_PATHS.eye} size="xl" />,
              title: "User Flow Audit",
              description: "We conducted a comprehensive audit of our existing user flow to identify friction points and opportunities for improvement.",
              ctaText: "View Details",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Flow Analysis"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Friction Points"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={Figure01} alt="User flow analysis showing current onboarding steps" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={OnboardingFunnelChart} alt="Identified friction points in user journey" />
                  ]
                }
              ]
            }}
            lastCard={{
              index: "02",
              icon: <Icon svgPath={ICON_PATHS.users} size="xl" />,
              title: "UX Session Recordings",
              description: "We analyzed recorded user sessions to understand real user behavior and identify patterns in how people interact with our product.",
              ctaText: "View Sessions",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Session Analysis"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Behavior Patterns"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={SignUpScreen} alt="UX session recordings analysis" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={Figure01} alt="User behavior patterns identified" />
                  ]
                }
              ]
            }}
          />
        </BodyComponent>,
        <BodyComponent key="research-cardgroup-2">
          <CardGroup
            firstCard={{
              index: "03",
              icon: <Icon svgPath={ICON_PATHS.replyAll} size="xl" />,
              title: "User Interviews",
              description: "We conducted in-depth interviews with users who had recently completed or abandoned the onboarding process to understand their motivations and challenges.",
              ctaText: "View Insights",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Interview Findings"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "User Quotes"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={OnboardingFunnelChart} alt="Key findings from user interviews" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={Figure01} alt="User quotes and feedback" />
                  ]
                }
              ]
            }}
            lastCard={{
              index: "04",
              icon: <Icon svgPath={ICON_PATHS.solidFlag} size="xl" />,
              title: "Competitive Analysis",
              description: "We analyzed competitor onboarding flows to identify best practices and opportunities to differentiate our approach.",
              ctaText: "View Analysis",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Competitor Flows"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Best Practices"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={SignUpScreen} alt="Competitor onboarding flow analysis" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={OnboardingFunnelChart} alt="Identified best practices and opportunities" />
                  ]
                }
              ]
            }}
          />
        </BodyComponent>,
        <BodyComponent key="research-linebreak">
          <div style={{ height: '48px', borderBottom: '1px solid var(--color-inactive)', margin: '24px 0' }} />
        </BodyComponent>,
        <BodyComponent key="research-insights">
          <Text 
            subtitle="Key Research Insights"
            style="B1"
          >
            Through our comprehensive research, we identified several critical insights that would shape our design strategy and inform our solution approach.
          </Text>
        </BodyComponent>,
        <BodyComponent key="research-cardgroup-3">
          <CardGroup
            firstCard={{
              index: "05",
              icon: <Icon svgPath={ICON_PATHS.solidTrendingDown} size="xl" />,
              title: "Primary Pain Points",
              description: "Our research revealed three main areas where users experienced the most friction during onboarding.",
              ctaText: "View Details",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Email Verification"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Profile Setup"
                },
                {
                  id: "03",
                  index: "03",
                  title: "First Transaction"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={Figure01} alt="Email verification friction points" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={SignUpScreen} alt="Profile setup challenges" />
                  ]
                },
                {
                  id: "03",
                  children: [
                    <img src={OnboardingFunnelChart} alt="First transaction barriers" />
                  ]
                }
              ]
            }}
            lastCard={{
              index: "06",
              icon: <Icon svgPath={ICON_PATHS.lightbulb} size="xl" />,
              title: "Opportunity Areas",
              description: "We identified key opportunities to improve the user experience and increase activation rates.",
              ctaText: "View Opportunities",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Onboarding Flow"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "User Guidance"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={OnboardingFunnelChart} alt="Onboarding flow optimization opportunities" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={Figure01} alt="User guidance improvement areas" />
                  ]
                }
              ]
            }}
          />
        </BodyComponent>,
        <BodyComponent key="research-cardgroup-4">
          <CardGroup
            firstCard={{
              index: "07",
              icon: <Icon svgPath={ICON_PATHS.timeline} size="xl" />,
              title: "User Journey Mapping",
              description: "We mapped the complete user journey from download to activation to understand the emotional and functional touchpoints.",
              ctaText: "View Journey",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Current Journey"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Emotional States"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={SignUpScreen} alt="Current user journey mapping" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={Figure01} alt="User emotional states throughout journey" />
                  ]
                }
              ]
            }}
            lastCard={{
              index: "08",
              icon: <Icon svgPath={ICON_PATHS.solidSunAlt} size="xl" />,
              title: "Success Patterns",
              description: "We analyzed successful user patterns to understand what drives activation and identify replicable behaviors.",
              ctaText: "View Patterns",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Activation Drivers"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Success Metrics"
                }
              ],
              bodyItems: [
                {
                  id: "01",
                  children: [
                    <img src={OnboardingFunnelChart} alt="Key drivers of user activation" />
                  ]
                },
                {
                  id: "02",
                  children: [
                    <img src={Figure01} alt="Success metrics and patterns" />
                  ]
                }
              ]
            }}
          />
        </BodyComponent>
      ]
    },
    strategy: {
      id: "strategy",
      index: "03",
      title: "Strategy",
      subtitle: "Planning a Phased, Principle-Driven Approach",
      icon1: <Icon svgPath={ICON_PATHS.notesMultiple} size="small" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      bodyItems: [
        <BodyComponent key="strategy-intro">
          <Text 
            subtitle="Strategic Approach"
            style="B1"
          >
            Based on our research findings, we developed a comprehensive strategy focused on reducing friction, improving user guidance, and creating a more intuitive onboarding experience.
          </Text>
        </BodyComponent>,
        <BodyComponent key="strategy-tiles" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <Tile
            index="01"
            title="Reduce Friction"
            bottomLeft={<span className="S1">Primary Focus</span>}
            bottomRight={null}
            body="Streamline the onboarding flow by removing unnecessary steps and simplifying complex processes. Focus on essential actions only."
            icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
          />
          <Tile
            index="02"
            title="Improve Guidance"
            bottomLeft={<span className="S1">User Support</span>}
            body="Provide clear, contextual guidance throughout the onboarding process to help users understand each step and its purpose."
            icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
          />
          <Tile
            index="03"
            title="Build Trust"
            bottomLeft={<span className="S1">Security Focus</span>}
            bottomRight={null}
            body="Address security concerns early and transparently to build user confidence and reduce abandonment at critical decision points."
            icon={<Icon svgPath={ICON_PATHS.solidFlag} size="small" />}
          />
        </BodyComponent>,
        <BodyComponent key="strategy-linebreak">
          <div style={{ height: '48px', borderBottom: '1px solid var(--color-inactive)', margin: '24px 0' }} />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-1">
          <FullCard
            index="01"
            icon={<Icon svgPath={ICON_PATHS.timeline} size="xl" />}
            title="Phase 1: Foundation"
            subtitle="Core Infrastructure Improvements"
            description="Establish the foundational improvements to our onboarding system, focusing on the most critical pain points identified in our research."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Email Verification"
              },
              {
                id: "02",
                index: "02", 
                title: "Profile Setup"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={Figure01} alt="Email verification improvements and flow optimization" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={SignUpScreen} alt="Profile setup simplification and user guidance" />
                ]
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-2">
          <FullCard
            index="02"
            icon={<Icon svgPath={ICON_PATHS.users} size="xl" />}
            title="Phase 2: Enhancement"
            subtitle="User Experience Optimization"
            description="Build upon the foundation with enhanced user experience features, improved guidance, and better onboarding flow design."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Onboarding Flow"
              },
              {
                id: "02",
                index: "02", 
                title: "User Guidance"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={OnboardingFunnelChart} alt="Enhanced onboarding flow design and user journey" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={Figure01} alt="Improved user guidance and contextual help" />
                ]
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-3">
          <FullCard
            index="03"
            icon={<Icon svgPath={ICON_PATHS.solidSunAlt} size="xl" />}
            title="Phase 3: Optimization"
            subtitle="Performance and Analytics"
            description="Implement advanced analytics, A/B testing capabilities, and continuous optimization based on user behavior data."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Analytics Integration"
              },
              {
                id: "02",
                index: "02", 
                title: "A/B Testing"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={SignUpScreen} alt="Analytics integration and user behavior tracking" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={OnboardingFunnelChart} alt="A/B testing framework and optimization strategies" />
                ]
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-4">
          <FullCard
            index="04"
            icon={<Icon svgPath={ICON_PATHS.lightbulb} size="xl" />}
            title="Phase 4: Innovation"
            subtitle="Advanced Features and Personalization"
            description="Introduce advanced features, personalization capabilities, and innovative approaches to further improve user activation and retention."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Personalization"
              },
              {
                id: "02",
                index: "02", 
                title: "Advanced Features"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={Figure01} alt="Personalized onboarding experience and user segmentation" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={SignUpScreen} alt="Advanced features and innovative onboarding approaches" />
                ]
              }
            ]}
          />
        </BodyComponent>
      ]
    },
    solutions: {
      id: "solutions",
      index: "04",
      title: "Solutions",
      subtitle: "Implementing and Iterating on Final Designs",
      icon1: <Icon svgPath={ICON_PATHS.lightbulb} size="small" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      bodyItems: [
        <BodyComponent key="solutions-intro">
          <Text 
            subtitle="Solution Implementation"
            style="B1"
          >
            We implemented a comprehensive set of solutions designed to address the key pain points identified in our research and strategy phases. Each solution was carefully designed and tested to ensure maximum impact on user activation.
          </Text>
        </BodyComponent>,
        <BodyComponent key="solutions-fullcard-1">
          <FullCard
            index="01"
            icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="xl" />}
            title="Streamlined Sign-Up Flow"
            subtitle="Reducing Friction in Account Creation"
            description="We redesigned the sign-up process to eliminate unnecessary steps and reduce cognitive load, making it easier for users to create accounts and get started."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Before & After"
              },
              {
                id: "02",
                index: "02", 
                title: "User Testing"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={Figure01} alt="Sign-up flow comparison showing before and after improvements" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={SignUpScreen} alt="User testing results and feedback on new sign-up flow" />
                ]
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="solutions-fullcard-2">
          <FullCard
            index="02"
            icon={<Icon svgPath={ICON_PATHS.lightbulb} size="xl" />}
            title="Enhanced Onboarding Experience"
            subtitle="Guiding Users Through Key Actions"
            description="We created a more intuitive onboarding experience with clear guidance, progress indicators, and contextual help to ensure users understand each step."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Onboarding Flow"
              },
              {
                id: "02",
                index: "02", 
                title: "Progress Tracking"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={OnboardingFunnelChart} alt="Enhanced onboarding flow with improved user guidance" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={Figure01} alt="Progress tracking and user journey visualization" />
                ]
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="solutions-fullcard-3">
          <FullCard
            index="03"
            icon={<Icon svgPath={ICON_PATHS.solidFlag} size="xl" />}
            title="Trust & Security Improvements"
            subtitle="Building User Confidence Early"
            description="We addressed security concerns proactively by implementing transparent security messaging, clear data handling policies, and trust-building elements throughout the onboarding process."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Security Messaging"
              },
              {
                id: "02",
                index: "02", 
                title: "Trust Elements"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={SignUpScreen} alt="Security messaging and transparency improvements" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={OnboardingFunnelChart} alt="Trust-building elements and user confidence indicators" />
                ]
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="solutions-fullcard-4">
          <FullCard
            index="04"
            icon={<Icon svgPath={ICON_PATHS.users} size="xl" />}
            title="Personalized User Experience"
            subtitle="Tailoring the Journey to User Needs"
            description="We implemented personalization features that adapt the onboarding experience based on user behavior, preferences, and goals to create a more relevant and engaging journey."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "User Segmentation"
              },
              {
                id: "02",
                index: "02", 
                title: "Adaptive Content"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={Figure01} alt="User segmentation and personalized onboarding paths" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={SignUpScreen} alt="Adaptive content and dynamic user experience" />
                ]
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="solutions-fullcard-5">
          <FullCard
            index="05"
            icon={<Icon svgPath={ICON_PATHS.solidSunAlt} size="xl" />}
            title="Analytics & Optimization"
            subtitle="Data-Driven Continuous Improvement"
            description="We implemented comprehensive analytics and A/B testing capabilities to continuously monitor user behavior and optimize the onboarding experience based on real user data."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Analytics Dashboard"
              },
              {
                id: "02",
                index: "02", 
                title: "A/B Testing Results"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <img src={OnboardingFunnelChart} alt="Analytics dashboard and user behavior tracking" />
                ]
              },
              {
                id: "02",
                children: [
                  <img src={Figure01} alt="A/B testing results and optimization insights" />
                ]
              }
            ]}
          />
        </BodyComponent>
      ]
    },
    retrospective: {
      id: "retrospective",
      index: "05",
      title: "Retrospective",
      subtitle: "Evaluating Impact and Identifying Next Steps",
      icon1: <Icon svgPath={ICON_PATHS.replyAll} size="small" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      bodyItems: [] // Empty - body components will be added later
    }
  };


  // Scroll and animation effects
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!caseStudyContentRef.current || !contentNavRef.current) return;
      
      const targetY = 120;
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

  // Framer Motion values
  const minY = 24;
  const maxY = viewportHeight * 0.8;
  const translateY = (1 - scrollProgress) * (maxY - minY) + minY;
  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.2;

  return (
    <motion.div
      key="casestudy-id-page"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut"
      }}
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
            
            {/* Single Content with vertical scrolling */}
            <motion.div 
              className="content" 
              ref={contentScrollRef}
              initial={{ height: 'auto' }}
              animate={{
                height: isTransitioning ? 120 : contentHeight, // Collapse to head height during transition
                opacity: isTransitioning ? 0.3 : 1
              }}
              transition={{
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
              <Body 
                onNextSection={handleNextContent}
                showNextButton={!isLastSection()}
              >
                {contentRegistry[activeContentId]?.bodyItems || []}
              </Body>
            </motion.div>
          </ContentNavigator>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyID;
