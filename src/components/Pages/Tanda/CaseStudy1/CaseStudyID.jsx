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
import CardCarousel from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/Card/CardCarousel/CardCarousel';
import TitleSection from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/TitleSection';
import WorkItem from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TitleSection/WorkItems/WorkItem';
import Tile from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Tile/Tile';
import TileColumn from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TileColumn/TileColumn';
import MediaSet from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/Card/CardCarousel/BodyItem/MediaSet';
import TextSet from '../../../ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/Card/CardCarousel/BodyItem/TextSet';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

// Text container component for bodyItems
const TextContainer = ({ children, className = '' }) => {
  return (
    <div 
      className={`text-container ${className}`}
      style={{
        width: '320px',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontFamily: 'var(--font-family-body)',
        fontSize: 'var(--font-size-body-sm)', // 20px
        fontWeight: 'var(--font-weight-regular)', // 400
        color: 'var(--color-primary)', // #ffffe3
        lineHeight: '1.4',
        textAlign: 'left'
      }}
    >
      {children}
    </div>
  );
};

const CaseStudyID = () => {
  const [activeContentId, setActiveContentId] = useState('problem');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextContentId, setNextContentId] = useState(null);
  const [contentHeight, setContentHeight] = useState(152); // Start at collapsed height for initial animation
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load animation
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

  // Handle initial load expansion animation
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
    }, 100); // Small delay before starting expansion

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Handle content transition with animation
  const transitionToContent = (newId) => {
    if (newId === activeContentId || isTransitioning) return;

    setIsTransitioning(true);
    setNextContentId(newId);
    setContentHeight(152); // Collapse to 152px

    // After collapse animation completes, switch content
    setTimeout(() => {
      setActiveContentId(newId);
      setNextContentId(null);

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
      }, 550); // 150ms pause + 400ms head animation
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
                // 1. Sign Up Screen - T:2, M:2
                {
                  id: "01",
                  children: [
                    <TextSet key="text-1" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-1">
                      <img src={SignUpScreen} alt="Sign Up Screen showing the initial user registration process" />
                    </MediaSet>
                  ]
                },
                // 2. Phone Verification - 2 Annotations, 2 Images
                {
                  id: "02",
                  children: [
                    <TextSet key="text-2" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-2">
                      <img src={PhoneVerification01} alt="Phone Verification screen 01" />
                      <img src={PhoneVerification02} alt="Phone Verification screen 02" />
                    </MediaSet>
                  ]
                },
                // 3. Create Account - Reordered: 2 textsets, 1 media, 1 textset, 3 images
                {
                  id: "03",
                  children: [
                    <TextSet key="text-3a" annotationItems={[
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
                    ]} />,
                    <TextSet key="text-3b" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-3a">
                      <img src={CreateAccount01} alt="Create Account screen 01" />
                    </MediaSet>,
                    <TextSet key="text-3c" annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Non-Essential Fields",
                        description: "Legal agreement and job title inputs aren't required for account creation. Deferring these optional fields to post-signup would reduce friction and allows users to reach core functionality faster."
                      }
                    ]} />,
                    <MediaSet key="media-3b">
                      <img src={CreateAccount02} alt="Create Account screen 02" />
                      <img src={CreateAccount03} alt="Create Account screen 03" />
                      <img src={CreateAccount04} alt="Create Account screen 04" />
                    </MediaSet>
                  ]
                },
                // 4. Onboarding Carousel - T, T, M
                {
                  id: "04",
                  children: [
                    <TextSet key="text-4a" annotationItems={[
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
                      }
                    ]} />,
                    <TextSet key="text-4b" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-4">
                      <img src={Carousel01} alt="Onboarding Carousel 01" />
                      <img src={Carousel02} alt="Onboarding Carousel 02" />
                    </MediaSet>
                  ]
                },
                // 5. User Activation - Join Circle Flow - T:2, M:2
                {
                  id: "05",
                  children: [
                    <TextSet key="text-5" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-5">
                      <img src={UserActivation01} alt="User Activation 01" />
                      <img src={UserActivation02} alt="User Activation 02" />
                    </MediaSet>
                  ]
                },
                // 6. Onboarding - Link Bank - T:1, M:2
                {
                  id: "06",
                  children: [
                    <TextSet key="text-6" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Third-Party Integration",
                        description: "Bank linking is handled through Plaid, a trusted third-party provider. This outsources security and compliance but fragments the user experience."
                      }
                    ]} />,
                    <MediaSet key="media-6">
                      <img src={LinkBank01} alt="Link Bank 01" />
                      <img src={LinkBank02} alt="Link Bank 02" />
                    </MediaSet>
                  ]
                },
                // 7. Onboarding - Email Verification - T:2, M:2
                {
                  id: "07",
                  children: [
                    <TextSet key="text-7" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-7">
                      <img src={EmailVerification01} alt="Email Verification 01" />
                    </MediaSet>
                  ]
                },
                // 8. Onboarding - Know Your Customer (KYC) Flow - T:2, M:1, T:2, M:2
                {
                  id: "08",
                  children: [
                    <TextSet key="text-8a" annotationItems={[
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
                      }
                    ]} />,
                    <MediaSet key="media-8a">
                      <img src={KYC01} alt="KYC Flow 01" />
                    </MediaSet>,
                    <TextSet key="text-8b" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-8b">
                      <img src={KYC02} alt="KYC Flow 02" />
                      <img src={KYC021} alt="KYC Flow 02-1" />
                    </MediaSet>
                  ]
                },
                // 9. Onboarding - KYC Fail States - T:2, M:4
                {
                  id: "09",
                  children: [
                    <TextSet key="text-9" annotationItems={[
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
                    ]} />,
                    <MediaSet key="media-9">
                      <img src={KYCFail01} alt="KYC Fail States 01" />
                      <img src={KYCFail02} alt="KYC Fail States 02" />
                      <img src={KYCFail021} alt="KYC Fail States 02-1" />
                      <img src={KYCFail022} alt="KYC Fail States 02-2" />
                    </MediaSet>
                  ]
                }
              ]
            }}
            lastCard={{
              index: "02",
              icon: <Icon svgPath={ICON_PATHS.users} size="xl" />,
              title: "UX Session Recordings",
              description: "We reviewed recordings of real user interactions to observe behavior patterns. <ul><li>Noted hesitation points, rage clicks, and moments of exit</li><li>Mapped common interaction breakdowns and where friction occurred</li></ul>",
              ctaText: "View Sessions",
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
                // 01. Log In Button Misleading New Users - T:2, M:3
                {
                  id: "01",
                  children: [
                    <TextSet key="text-rec-1" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "New Users Defaulted to 'Log In'",
                        description: "Most new users expect to see toward 'Sign Up' rather than 'Sign In', indicating unclear button hierarchy."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Login Page Mistaken for Sign-Up",
                        description: "Users entered new credentials expecting to sign up, but were then dropped off when it wasn't registration."
                      }
                    ]} />,
                    <MediaSet key="media-rec-1">
                      <img src={Research2MisleadingLogin01} alt="Misleading login flow showing user confusion" />
                      <img src={Research2MisleadingLogin02} alt="Login interface causing user drop-off" />
                      <img src={Research2MisleadingLogin03} alt="User login behavior patterns and confusion" />
                    </MediaSet>
                  ]
                },
                // 02. Users Continue Past Profile Picture Field - T:2, M:2
                {
                  id: "02",
                  children: [
                    <TextSet key="text-rec-2" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Low Engagement with Profile Picture CTA",
                        description: "Many users ignored the profile picture prompt at the top of account creation, suggesting low visibility or unclear value proposition."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Rushed or Dismissive Behavior",
                        description: "Users who did engage either selected random images or immediately skipped, indicating they didn't understand the importance of profile pictures for community participation."
                      }
                    ]} />,
                    <MediaSet key="media-rec-2">
                      <img src={Research2ProfilePicture01} alt="Profile picture field showing low engagement" />
                      <img src={Research2ProfilePicture02} alt="Account creation showing skipped profile picture" />
                    </MediaSet>
                  ]
                },
                // 03. Users Leave Home Screen During Onboarding - T:2, T:1, M:3
                {
                  id: "03",
                  children: [
                    <TextSet key="text-rec-3a" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Non-Sticky Onboarding Scrolls Away",
                        description: "By providing carousel onboarding on-screen, scrolls away with content, causing users to lose track once they naturally explore the feed below."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Unclear Blocking Alerts",
                        description: "When users try joining circles without verification, alert messages don't explain that onboarding is incomplete, leaving them unable to understand any actions."
                      }
                    ]} />,
                    <TextSet key="text-rec-3b" annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Unrestricted Navigation Creates False Progress",
                        description: "Users can freely navigate to Browse Circles before completing onboarding, suggesting these features are accessible when they're actually blocked."
                      }
                    ]} />,
                    <MediaSet key="media-rec-3">
                      <img src={Research2LeaveOnboarding01} alt="Users leaving during onboarding showing non-sticky behavior" />
                      <img src={Research2LeaveOnboarding02} alt="Onboarding abandonment patterns and navigation issues" />
                      <img src={Research2LeaveOnboarding03} alt="Onboarding flow exit points and blocking alerts" />
                    </MediaSet>
                  ]
                },
                // 04. KYC Flow Causing Onboarding Bottleneck - T:2, T:1, M:3
                {
                  id: "04",
                  children: [
                    <TextSet key="text-rec-4a" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "SSN Request Triggers Drop-Off",
                        description: "Users breeze through input fields, but exit the page when they encounter sensitive data requests. Users who reach this step leave without submitting any information."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Locked Steps Create Dead End",
                        description: "Users who skip identity verification have subsequent steps (Link Bank) blocked, forcing them out of the entire onboarding carousel, and leave the app."
                      }
                    ]} />,
                    <TextSet key="text-rec-4b" annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Pending Status Ends Engagement",
                        description: "When KYC goes into pending review status, users leave the app and don't return because they can't access other features while locked."
                      }
                    ]} />,
                    <MediaSet key="media-rec-4">
                      <img src={Research2KYCBottleneck01} alt="KYC bottleneck showing user drop-off patterns" />
                      <img src={Research2KYCBottleneck02} alt="KYC flow causing onboarding abandonment" />
                      <img src={Research2KYCBottleneck03} alt="KYC pending status and user engagement issues" />
                    </MediaSet>
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
                    <MediaSet key="media-interview-1">
                      <img src={OnboardingFunnelChart} alt="Interview logistics and methodology" />
                    </MediaSet>
                  ]
                },
                {
                  id: "02",
                  children: [
                    <MediaSet key="media-interview-2">
                      <img src={Figure01} alt="Persona 1 profile and insights" />
                    </MediaSet>
                  ]
                },
                {
                  id: "03",
                  children: [
                    <MediaSet key="media-interview-3">
                      <img src={Figure01} alt="Persona 2 profile and insights" />
                    </MediaSet>
                  ]
                },
                {
                  id: "04",
                  children: [
                    <MediaSet key="media-interview-4">
                      <img src={Figure01} alt="Persona 3 profile and insights" />
                    </MediaSet>
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
                  title: "KYC Flows"
                },
                {
                  id: "02",
                  index: "02",
                  title: "Sign Up Options"
                },
                {
                  id: "03",
                  index: "03",
                  title: "Onboarding Flows"
                }
              ],
              bodyItems: [
                // 01. KYC Flows - T:2, M:3
                {
                  id: "01",
                  children: [
                    <TextSet key="text-comp-1" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Progressive Disclosure and Trust Building",
                        description: "Leading fintech apps like Chime, Cash App, and Venmo break KYC into progressive steps with clear explanations upfront. They emphasize regulatory compliance and security benefits before requesting sensitive information, building trust through transparency."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Visual Trust Indicators Are Standard",
                        description: "Security badges, encryption icons, and 'Your data is safe' messaging appear consistently during sensitive data collection. Competitors collect information in 2-3 small, focused steps rather than overwhelming single forms, with SSN requests saved for last after users are already invested."
                      }
                    ]} />,
                    <MediaSet key="media-comp-1">
                      <img src={SignUpScreen} alt="Competitive KYC flow example 1 - placeholder" />
                      <img src={SignUpScreen} alt="Competitive KYC flow example 2 - placeholder" />
                      <img src={SignUpScreen} alt="Competitive KYC flow example 3 - placeholder" />
                    </MediaSet>
                  ]
                },
                // 02. Sign Up Options - T:2, M:3
                {
                  id: "02",
                  children: [
                    <TextSet key="text-comp-2" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Social Sign-Up Dominates Modern Products",
                        description: "Over 80% of reviewed competitors offer social sign-in options (Google, Apple, Facebook). This reduces friction by eliminating manual data entry and leveraging existing trust in established platforms."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Email/Password Still Offered as Fallback",
                        description: "While social options are prominent, all products maintain traditional email/password registration for users who prefer privacy or don't have social accounts. The key is making both paths equally accessible."
                      }
                    ]} />,
                    <MediaSet key="media-comp-2">
                      <img src={SignUpScreen} alt="Social sign-up options analysis - placeholder" />
                      <img src={SignUpScreen} alt="Traditional email sign-up - placeholder" />
                      <img src={SignUpScreen} alt="Sign-up option comparison - placeholder" />
                    </MediaSet>
                  ]
                },
                // 03. Onboarding Flows - T:2, M:3
                {
                  id: "03",
                  children: [
                    <TextSet key="text-comp-3" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Fast Onboarding is Industry Standard (~3 Steps)",
                        description: "Modern fintech products complete core onboarding in approximately 3 steps: Account Creation → Basic Profile → Value Demonstration. Additional requirements like KYC are deferred until users need premium features, preventing early drop-off."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Progressive Completion Over Gatekeeping",
                        description: "Leading competitors allow users to access core features immediately, then progressively unlock premium features as users complete additional verification steps. This maintains compliance while maximizing initial engagement."
                      }
                    ]} />,
                    <MediaSet key="media-comp-3">
                      <img src={SignUpScreen} alt="3-step onboarding pattern - placeholder" />
                      <img src={SignUpScreen} alt="Onboarding progress indicators - placeholder" />
                      <img src={SignUpScreen} alt="Quick onboarding completion - placeholder" />
                    </MediaSet>
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
              index: "01",
              icon: <Icon svgPath={ICON_PATHS.solidTrendingDown} size="xl" />,
              title: "Technical Friction Caused Early Exits",
              description: "Technical bugs blocked users from creating accounts. We had to fix the foundation before improving the experience.",
              ctaText: "View Details",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Unclear Email Verification"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "CloudFlare Timeout"
                },
                {
                  id: "03",
                  index: "03",
                  title: "Pasted Email Error"
                }
              ],
              bodyItems: [
                // 01. Unclear Email Verification - T:2, M:3
                {
                  id: "01",
                  children: [
                    <TextSet key="text-tech-1" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Login Page Mistaken for Sign-Up",
                        description: "Users entered new credentials expecting to create an account, then dropped off when it wasn't registration."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Email Verification Out of Sync with Input",
                        description: "The verification screen didn't directly match what users previously verified, causing confusion when users expected verified addresses. Users had no way to confirm they were verifying the correct email inbox or fix input errors without restarting the entire flow."
                      }
                    ]} />,
                    <MediaSet key="media-tech-1">
                      <img src={EmailVerification01} alt="Email verification confusion showing user drop-off" />
                      <img src={EmailVerification02} alt="Email verification screen mismatch issues" />
                      <img src={SignUpScreen} alt="Email verification flow problems" />
                    </MediaSet>
                  ]
                },
                // 02. CloudFlare Timeout - T:2, M:2
                {
                  id: "02",
                  children: [
                    <TextSet key="text-tech-2" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "CloudFlare Timeout Bug with Phone Verification",
                        description: "Users encountered CloudFlare protection errors when attempting to verify phone numbers. Connection timeout issues prevented account creation."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Phone Number can be removed -- not required technically",
                        description: "Since phone verification isn't technically required, this step entirely removing it fixes the bug and unnecessary friction."
                      }
                    ]} />,
                    <MediaSet key="media-tech-2">
                      <img src={PhoneVerification01} alt="CloudFlare timeout error during phone verification" />
                      <img src={PhoneVerification02} alt="Phone verification connection issues" />
                    </MediaSet>
                  ]
                },
                // 03. Pasted Email Error - T:1, M:2
                {
                  id: "03",
                  children: [
                    <TextSet key="text-tech-3" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Pasted Emails Rejected But Logged as Valid",
                        description: "Pasted emails were rejected by the input field but still logged as registered, creating an account error that blocked retry attempts."
                      }
                    ]} />,
                    <MediaSet key="media-tech-3">
                      <img src={SignUpScreen} alt="Pasted email rejection error" />
                      <img src={Figure01} alt="Email validation issues and account errors" />
                    </MediaSet>
                  ]
                }
              ]
            }}
            lastCard={{
              index: "02",
              icon: <Icon svgPath={ICON_PATHS.solidTrendingDown} size="xl" />,
              title: "Trust Barriers & Unclear Value Prevent Activation",
              description: "Users who created accounts dropped off during KYC and profile setup. They didn't trust us enough to share sensitive information, and didn't understand what they'd gain by completing these steps.",
              ctaText: "View Details",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "KYC Trust Issues"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Value Proposition Gaps"
                }
              ],
              bodyItems: [
                // 01. KYC Trust Issues - T:2, M:2, T:2, M:3
                {
                  id: "01",
                  children: [
                    <TextSet key="text-trust-1a" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Providing Context Before the KYC Flow Increases Trust",
                        description: "Explaining what KYC verification is, why it's legally required for financial platforms, and that TANDA uses a trusted third-party provider provides necessary context that reduces hesitation and increases completion rates."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Visual Security Signals Build Trust",
                        description: "Visual security indicators placed at critical input moments (encryption badges, privacy links, compliance statements) reassure users their data is protected, reducing anxiety and increasing completion rates."
                      }
                    ]} />,
                    <MediaSet key="media-trust-1a">
                      <img src={KYC01} alt="KYC intro screen explaining purpose" />
                      <img src={SignUpScreen} alt="Security and privacy assurances" />
                    </MediaSet>,
                    <TextSet key="text-trust-1b" annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Progressive Form Steps Lower Cognitive Load",
                        description: "A long single-page form felt overwhelming and lacked address autocomplete, causing both abandonment and data entry errors. Splitting into manageable steps and adding autocomplete increases both completion rates and verification success."
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Failure States Lead to Immediate Churn",
                        description: "KYC rejection messages that felt final and offered no recourse led to immediate abandonment. Reframing failures with encouraging language, explaining what went wrong, and providing clear next steps retains users through temporary setbacks."
                      }
                    ]} />,
                    <MediaSet key="media-trust-1b">
                      <img src={SignUpScreen} alt="Progressive KYC steps - Basic Info" />
                      <img src={SignUpScreen} alt="Progressive KYC steps - Address" />
                      <img src={SignUpScreen} alt="Progressive KYC steps - Document Upload" />
                    </MediaSet>
                  ]
                },
                // 02. Value Proposition Gaps - T:2, M:3, T:2, M:3
                {
                  id: "02",
                  children: [
                    <TextSet key="text-trust-2a" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Delaying Core Value Drives Early Abandonment",
                        description: "The onboarding flow prioritized data collection over value delivery, requiring users to complete KYC before accessing circles. This reversed sequence—friction before value—led to drop-off as users couldn't see why the hassle was worthwhile."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Circle Discovery Buried Behind Onboarding Forms",
                        description: "Users couldn't browse or join circles until they completed KYC and profiles. Burying the core value proposition behind forms meant users abandoned before understanding what they were working toward."
                      }
                    ]} />,
                    <MediaSet key="media-trust-2a">
                      <img src={SignUpScreen} alt="Value proposition gap - sensitive request" />
                      <img src={SignUpScreen} alt="Find Circle feature buried" />
                      <img src={SignUpScreen} alt="User motivation drop-off" />
                    </MediaSet>,
                    <TextSet key="text-trust-2b" annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Contextual Surveys Build Relevance Early",
                        description: "Introducing a brief survey about financial objectives educates users on TANDA's range of capabilities while gathering intent data that powers personalized onboarding paths and targeted circle recommendations."
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Personalized Value Demonstrations Drive Motivation",
                        description: "Survey responses trigger personalized value demonstrations: users who select '$500 emergency fund' immediately see circles where members achieved that goal. This connects TANDA's features directly to individual needs, creating compelling motivation to continue."
                      }
                    ]} />,
                    <MediaSet key="media-trust-2b">
                      <img src={SignUpScreen} alt="Segmentation survey implementation" />
                      <img src={SignUpScreen} alt="Personalized value demonstration" />
                      <img src={SignUpScreen} alt="Goal-based circle recommendations" />
                    </MediaSet>
                  ]
                }
              ]
            }}
          />
        </BodyComponent>,
        <BodyComponent key="research-cardgroup-4">
          <CardGroup
            firstCard={{
              index: "03",
              icon: <Icon svgPath={ICON_PATHS.lightbulb} size="xl" />,
              title: "Users Felt Aimless When They Entered the App",
              description: "Users who completed account setup didn't know what to do next. The app provided no clear direction, no education on features, and no compelling reason to continue engaging.",
              ctaText: "View Details",
              ctaIcon: <Icon svgPath={ICON_PATHS.eye} size="small" />,
              headItems: [
                {
                  id: "01",
                  index: "01",
                  title: "Onboarding Carousel Not Engaging"
                },
                {
                  id: "02", 
                  index: "02",
                  title: "Unclear Navigation and Direction"
                },
                {
                  id: "03",
                  index: "03",
                  title: "Incentivization and Guidance"
                }
              ],
              bodyItems: [
                // 01. Onboarding Carousel Not Engaging - T:2, M:2, T:2, M:2
                {
                  id: "01",
                  children: [
                    <TextSet key="text-aimless-1a" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Onboarding Needs to Engage Users",
                        description: "The carousel is visually unappealing and literally scrolls away when users navigate the home screen. It's not sticky, not engaging, and users scroll past it before they can properly engage with onboarding."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Bloated Onboarding Flow Results in Drop Offs",
                        description: "Six required steps felt daunting and dragged on the onboarding process. This bloat created a barrier that drove early abandonment before users experienced value."
                      }
                    ]} />,
                    <MediaSet key="media-aimless-1a">
                      <img src={Carousel01} alt="Onboarding carousel showing low engagement" />
                      <img src={Carousel02} alt="Onboarding carousel user behavior patterns" />
                    </MediaSet>,
                    <TextSet key="text-aimless-1b" annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Locked Onboarding Steps Lead to Dropoff",
                        description: "Strict, locked-step onboarding meant users couldn't progress if they encountered any errors or blockers. Hitting an error state led to immediate abandonment as users had no path forward or way to skip problematic steps."
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "No Clear Direction After Entering the App",
                        description: "After completing or dismissing onboarding, users landed on a home screen with no compelling entry point or guidance. Without clear CTAs or direction on 'what to do next,' users wandered aimlessly between sections without taking meaningful action."
                      }
                    ]} />,
                    <MediaSet key="media-aimless-1b">
                      <img src={SignUpScreen} alt="Home screen entry point issues - placeholder" />
                      <img src={SignUpScreen} alt="Locked onboarding steps - placeholder" />
                    </MediaSet>
                  ]
                },
                // 02. Unclear Navigation and Direction - T:2, M:3, T:2, M:1
                {
                  id: "02",
                  children: [
                    <TextSet key="text-aimless-2a" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Page Purpose is Not Readily Apparent",
                        description: "Navigating to the circles page, users don't understand what the page is or what it provides. The design fails to communicate what circles are, why they'd join one, or what actions are available, leaving users confused about how to proceed."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Lack of In-App Education",
                        description: "With no in-app education, users were fully reliant on in-person onboarding to understand how circles work and how to join them."
                      }
                    ]} />,
                    <MediaSet key="media-aimless-2a">
                      <img src={SignUpScreen} alt="Unclear navigation showing user confusion" />
                      <img src={SignUpScreen} alt="Navigation issues and user behavior" />
                      <img src={SignUpScreen} alt="Navigation problems causing drop-off" />
                    </MediaSet>,
                    <TextSet key="text-aimless-2b" annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Onboarding Flow Felt Like Discrete Tasks",
                        description: "Onboarding tasks were disconnected rather than flowing continuously. Users were jarred by being pulled into a task, then kicked back to the home screen to access the carousel for the next step, breaking momentum and creating a disjointed experience."
                      }
                    ]} />,
                    <MediaSet key="media-aimless-2b">
                      <img src={KYC01} alt="Navigation confusion in KYC flow" />
                    </MediaSet>
                  ]
                },
                // 03. Incentivization and Guidance - T:2, M:2, T:2, M:2
                {
                  id: "03",
                  children: [
                    <TextSet key="text-aimless-3a" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Onboarding Requests Info Without Highlighting Value",
                        description: "The onboarding flow asks users for information (profile, KYC, preferences) without explaining what they'll gain. No value proposition is presented during these requests, making the process feel extractive rather than beneficial."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Incentives Exist But Aren't Surfaced In-App",
                        description: "TANDA offers referral bonuses and new user rewards, but these incentives are only mentioned during in-person onboarding. Users completing onboarding in-app never see these benefits, missing critical motivation to complete the process."
                      }
                    ]} />,
                    <MediaSet key="media-aimless-3a">
                      <img src={UserActivation01} alt="Incentivization issues showing lack of motivation" />
                      <img src={UserActivation02} alt="Guidance problems in user activation" />
                    </MediaSet>,
                    <TextSet key="text-aimless-3b" annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "In-Person Onboarding Highlights Value, App Doesn't",
                        description: "Users who receive in-person onboarding hear about TANDA's value, referral bonuses, and new user rewards. Those onboarding independently through the app never encounter these incentives, creating a significant motivation gap."
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "No Visible Rewards During Onboarding Journey",
                        description: "Incentives like sign-up bonuses and referral rewards aren't referenced on the home screen, carousel, or during any onboarding steps. Users have no idea what they're working toward or what completing onboarding will unlock."
                      }
                    ]} />,
                    <MediaSet key="media-aimless-3b">
                      <img src={SignUpScreen} alt="Guidance and motivation gaps - placeholder" />
                      <img src={SignUpScreen} alt="Reward surfacing strategy - placeholder" />
                    </MediaSet>
                  ]
                }
              ]
            }}
            lastCard={{
              index: "04",
              icon: <Icon svgPath={ICON_PATHS.users} size="xl" />,
              title: "Friend-Referred Users Show Highest Completion Rates",
              description: "Users invited by friends completed onboarding at significantly higher rates. They had context about what TANDA could do and trusted the platform more.",
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
                // 01. Activation Drivers - T:2, M:2
                {
                  id: "01",
                  children: [
                    <TextSet key="text-friend-1" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Friend Referrals Show Highest Completion Rates",
                        description: "Users referred by friends complete onboarding at significantly higher rates than other acquisition channels. When a friend walks them through the process in-person, they receive context, trust-building, and step-by-step guidance that mirrors TANDA staff onboarding."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Social Connection is Lost When Not In-Person",
                        description: "Friend referrals only succeed when the friend physically walks the user through onboarding. Without in-person guidance, the social connection is easily lost—users get confused and drop off because we haven't integrated these friend connections into the app experience."
                      }
                    ]} />,
                    <MediaSet key="media-friend-1">
                      <img src={SignUpScreen} alt="Friend referral activation patterns - placeholder" />
                      <img src={SignUpScreen} alt="In-person vs digital onboarding comparison - placeholder" />
                    </MediaSet>
                  ]
                },
                // 02. Success Metrics - T:2, M:2
                {
                  id: "02",
                  children: [
                    <TextSet key="text-friend-2" annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "No Robust In-App Invite System",
                        description: "We lack a system that maintains the friend connection during digital onboarding. When friends can't guide users in-person, there's no in-app mechanism to preserve that social accountability or provide the same contextual support."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Friend Code and Employer Fields Don't Replicate Connection",
                        description: "Attempts to capture friend connections through friend codes, employer fields, and job information haven't worked. These passive data fields don't replicate the active guidance and social accountability that makes in-person friend referrals successful."
                      }
                    ]} />,
                    <MediaSet key="media-friend-2">
                      <img src={SignUpScreen} alt="Invite system gaps - placeholder" />
                      <img src={SignUpScreen} alt="Friend code implementation - placeholder" />
                    </MediaSet>
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
        <BodyComponent key="strategy-intro-tiles" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <Text
            subtitle="Strategic Approach"
            style="B1"
          >
            From our research findings, we identified patterns in what prevented users from completing onboarding and what motivated them to engage. We distilled these insights into three guiding principles that would shape our strategic approach:
          </Text>
          <TileColumn gap="16px">
            <Tile
              index="01"
              title="Build Motivation"
              bottomLeft={<span className="S1">Highlight Value Props & Incentives</span>}
              body="Demonstrate direct user benefits to motivate onboarding completion. Keep value propositions and incentives visible and accessible throughout the experience."
              icon={<Icon svgPath={ICON_PATHS.solidSunAlt} size="small" />}
            />
            <Tile
              index="02"
              title="Guide Users to Value"
              bottomLeft={<span className="S1">Clear Pathways & Contextual Education</span>}
              bottomRight={null}
              body="Guide users toward core value (joining a circle) through clear pathways and contextual education. Make progress feel natural and purposeful, not like filling out forms."
              icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
            />
            <Tile
              index="03"
              title="Build Trust"
              bottomLeft={<span className="S1">Legitimacy & Data Transparency</span>}
              bottomRight={null}
              body="Establish user confidence through clear communication about data collection, transparent processes, and demonstrating platform legitimacy from the start."
              icon={<Icon svgPath={ICON_PATHS.solidFlag} size="small" />}
            />
          </TileColumn>
        </BodyComponent>,
        <BodyComponent key="strategy-linebreak">
          <div style={{ height: '48px', borderBottom: '1px solid var(--color-inactive)', margin: '24px 0' }} />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-1">
          <FullCard
            index="01"
            icon={<Icon svgPath={ICON_PATHS.timeline} size="xl" />}
            title="Exploring Value Propositions & Trust Signals"
            subtitle="Core Infrastructure Improvements"
            description="We conducted user testing to identify which value propositions resonated most with our target users and how we could effectively communicate trust and security throughout the onboarding experience."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Context"
              },
              {
                id: "02",
                index: "02",
                title: "Value Prop Brainstorming"
              },
              {
                id: "03",
                index: "03",
                title: "Trust Signal Brainstorm"
              },
              {
                id: "04",
                index: "04",
                title: "Testing and Implementation"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <TextSet
                    key="text-strategy-1-context-intro"
                    text="Users abandoned because they didn't trust us and didn't see enough value to justify sharing sensitive information."
                  />,
                  <TextSet
                    key="text-strategy-1-context-value"
                    text="TANDA's value propositions were only communicated through in-person onboarding—app users never saw them."
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Missing Value Propositions at Entry",
                        description: "Highlighting our value propositions at the beginning of the user experience can provide motivation to start the process"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-1-context-a">
                    <img src={SignUpScreen} alt="Sign-up screen without value props" />
                    <img src={SignUpScreen} alt="Sign-up screen without value props" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-1-context-trust"
                    text="Our sign-up and KYC flows requested sensitive information without security indicators, privacy assurances, or explanations."
                    annotationItems={[
                      {
                        id: "02",
                        index: "02",
                        title: "KYC Lacks Context and Trust Signals",
                        description: "KYC screen provides no context as to what this flow is, who is verifying it, who the data is shared with, or why it's required"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-1-context-b">
                    <img src={SignUpScreen} alt="KYC screen without trust signals" />
                    <img src={SignUpScreen} alt="KYC screen without trust signals" />
                  </MediaSet>
                ],
                annotationItems: []
              },
              {
                id: "02",
                children: [
                  <TextSet
                    key="text-strategy-1-value-props-a"
                    text="We explored different value propositions to understand which benefits resonated most strongly with users:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Quick Cash Access",
                        description: "\"Access emergency funds when you need them\" - Emphasizes immediate financial relief and speed"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Community Savings",
                        description: "\"Save together with friends and family\" - Focuses on social connection and collective wealth building"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-1-value-props">
                    <img src={SignUpScreen} alt="Value proposition concepts - Quick Cash" />
                    <img src={SignUpScreen} alt="Value proposition concepts - Community Savings" />
                    <img src={SignUpScreen} alt="Value proposition concepts - Financial Goals" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-1-value-props-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Financial Goals",
                        description: "\"Achieve your financial goals faster\" - Highlights specific outcomes like vacations, emergency funds, or down payments"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "No Credit Check",
                        description: "\"Get money without credit checks\" - Addresses financial inclusion and removes traditional barriers"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-1-value-props-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Flexible Contributions",
                        description: "\"Save at your own pace\" - Emphasizes control and lack of rigid requirements"
                      },
                      {
                        id: "06",
                        index: "06",
                        title: "Social Accountability",
                        description: "\"Stay motivated with your circle\" - Leverages peer support and commitment"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "03",
                children: [
                  <TextSet
                    key="text-strategy-1-trust-signals-a"
                    text="We brainstormed various trust-building elements to reduce anxiety around sensitive data sharing:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Encryption Indicators",
                        description: "Bank-level encryption badge with explanation of data security measures"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Compliance Badges",
                        description: "Display regulatory compliance (FDIC insured, SOC 2 certified) near sensitive input fields"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-1-trust-signals">
                    <img src={SignUpScreen} alt="Trust signal examples - Encryption" />
                    <img src={SignUpScreen} alt="Trust signal examples - Compliance" />
                    <img src={SignUpScreen} alt="Trust signal examples - Privacy" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-1-trust-signals-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Privacy Policy Links",
                        description: "Clear, accessible privacy policy with plain language explanations"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Security Certifications",
                        description: "Third-party security certifications and audit results"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-1-trust-signals-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Transparent Data Usage",
                        description: "Explicit statements about what data is collected and why it's needed"
                      },
                      {
                        id: "06",
                        index: "06",
                        title: "User Testimonials",
                        description: "Social proof from existing users about platform trustworthiness"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-1-trust-signals-d"
                    annotationItems={[
                      {
                        id: "07",
                        index: "07",
                        title: "Progress Transparency",
                        description: "Clear communication about verification timelines and what happens next"
                      },
                      {
                        id: "08",
                        index: "08",
                        title: "Support Availability",
                        description: "Visible customer support options during sensitive steps"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "04",
                children: [
                  <TextSet
                    key="text-strategy-1-testing-a"
                    text="Conducted preference testing and user interviews to validate messaging effectiveness:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Preference Tests",
                        description: "A/B tested value proposition messaging with 25 users in sign-up and onboarding screens. \"Quick Cash Access\" showed highest engagement and conversion intent."
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "User Interviews",
                        description: "Conducted in-depth conversations with 12 users about trust concerns. Encryption indicators and compliance badges were most frequently mentioned as confidence builders."
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-1-testing">
                    <img src={SignUpScreen} alt="Testing results - Value prop preference" />
                    <img src={SignUpScreen} alt="Testing results - Trust signal ranking" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-1-testing-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Card Sorting",
                        description: "Asked users to rank trust signals by importance. Data transparency and progress visibility ranked higher than expected, suggesting users want control and visibility over security credentials."
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Message Hierarchy Testing",
                        description: "Tested different sequences of value → trust messaging. Users responded best when value was established first, followed by trust assurances at decision points."
                      }
                    ]}
                  />
                ],
                annotationItems: []
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-2">
          <FullCard
            index="02"
            icon={<Icon svgPath={ICON_PATHS.lightbulb} size="xl" />}
            title="Integrating Education & Guidance"
            subtitle="Contextual Help and User Support"
            description="We identified key moments where users needed guidance and explored different education approaches to provide context without overwhelming the experience."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Identifying Points of Need"
              },
              {
                id: "02",
                index: "02",
                title: "Exploring Education Options"
              },
              {
                id: "03",
                index: "03",
                title: "Creating Seamless Product Guidance"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <TextSet
                    key="text-strategy-2-context"
                    text="Users had limited sign-up options and our email-based flow was unintuitive. The single-page form overwhelmed users with too many fields at once while unclear verification states and the inability to distinguish sign-up from login created confusion. Technical bugs (phone verification timeouts, pasted email errors) compounded these issues."
                  />,
                  <MediaSet key="media-strategy-2-context">
                    <img src={SignUpScreen} alt="Confusing sign-up flow" />
                    <img src={SignUpScreen} alt="Overwhelming single-page form" />
                  </MediaSet>
                ],
                annotationItems: []
              },
              {
                id: "02",
                children: [
                  <TextSet
                    key="text-strategy-2-signup-a"
                    text="We explored different sign-up methods to understand which would best balance ease of use with security:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Email + Password (Traditional)",
                        description: "Standard account creation with email verification. Most familiar pattern but adds extra verification step"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Phone Number First",
                        description: "SMS-based verification with immediate access. Fast but raises privacy concerns and creates dependency on phone service"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-2-signup">
                    <img src={SignUpScreen} alt="Email and phone sign-up options" />
                    <img src={SignUpScreen} alt="Social and magic link options" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-2-signup-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Social Sign-In (Google/Apple)",
                        description: "One-tap authentication using existing accounts. Fastest entry but some users distrust data sharing"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Magic Link",
                        description: "Passwordless email link authentication. Removes password friction but requires email access during each login"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "03",
                children: [
                  <TextSet
                    key="text-strategy-2-email-a"
                    text="We streamlined the email sign-up experience with clear states and progressive disclosure:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Clear Verification States",
                        description: "Email verification now shows which email is being verified with clear status indicators. Users cannot proceed with account creation until email is verified preventing ghost accounts and ensuring valid contact information"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Distinction between Sign Up and Login",
                        description: "Explored ways to help users distinguish between sign-up and login flows including visual hierarchy and clear labels. Added immediate redirection back to sign-up with a Don't have an account? link to prevent confusion"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-2-email">
                    <img src={SignUpScreen} alt="Clear email verification states" />
                    <img src={SignUpScreen} alt="Sign-up vs login distinction" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-2-email-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Implementing Best Practices",
                        description: "Broke the overwhelming single-page form into logical steps revealing complexity gradually to reduce cognitive load. Progressive disclosure improved completion rates while maintaining necessary information gathering"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "04",
                children: [
                  <TextSet
                    key="text-strategy-2-redundancy-a"
                    text="We removed unnecessary steps and fields to streamline the sign-up process:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Phone Verification Removed",
                        description: "Not technically required and caused CloudFlare timeout bugs. Eliminated entire step and associated errors"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Profile Picture Deferred",
                        description: "Moved from sign-up to post-onboarding. Low engagement during sign-up better suited for profile completion"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-2-redundancy">
                    <img src={SignUpScreen} alt="Streamlined sign-up flow" />
                    <img src={SignUpScreen} alt="Removed unnecessary fields" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-2-redundancy-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Job Title Removed",
                        description: "Non-essential information that added friction. Can be collected later if needed for specific features"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Email Verification Timing",
                        description: "Kept verification but improved error states with email display resend and edit options"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-2-redundancy-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Form Field Optimization",
                        description: "Fixed paste detection bug for email input improved validation feedback"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "05",
                children: [
                  <TextSet
                    key="text-strategy-2-testing-a"
                    text="We tested the new sign-up flow and measured significant improvements:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Testing Methodology",
                        description: "Timed task completion measured drop-off points post-test confidence surveys"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Completion Time",
                        description: "Reduced from 4:30 average to 1:45 average 60% improvement in time-to-account-creation"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-2-testing">
                    <img src={SignUpScreen} alt="Testing results - completion time" />
                    <img src={SignUpScreen} alt="Testing results - user confidence" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-2-testing-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "User Confidence",
                        description: "85% of users felt confident they understood what they were signing up for with the new flow"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Technical Validation",
                        description: "Eliminated all three critical bugs: CloudFlare timeout paste email error unclear email verification"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-2-testing-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Best Practices Documentation",
                        description: "Created sign-up guidelines for future features: minimize fields progressive disclosure defer non-essential data"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-3">
          <FullCard
            index="03"
            icon={<Icon svgPath={ICON_PATHS.users} size="xl" />}
            title="Streamlining Sign-Up Flow"
            subtitle="Reducing Friction in Account Creation"
            description="Through competitive analysis and rapid prototyping we established best practices for sign-up and tested new flow variations to reduce friction and improve completion rates."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "Context"
              },
              {
                id: "02",
                index: "02",
                title: "Exploring Sign Up Options"
              },
              {
                id: "03",
                index: "03",
                title: "Streamlining Email Sign Up"
              },
              {
                id: "04",
                index: "04",
                title: "Removing Redundancy"
              },
              {
                id: "05",
                index: "05",
                title: "Testing and Results"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <TextSet
                    key="text-strategy-3-points-a"
                    text="We identified six critical moments where users needed guidance but weren't receiving it:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Page Entry Points",
                        description: "Users couldn't identify page purpose or available actions without clear signposting"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Feature Discovery",
                        description: "Didn't understand circle mechanics or how circles were evaluated for trustworthiness"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-3-points">
                    <img src={SignUpScreen} alt="Points of confusion" />
                    <img src={SignUpScreen} alt="Missing guidance moments" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-3-points-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Blocking Moments",
                        description: "Generic alerts appeared without explaining why they were blocked or what to do next"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Critical Decision Points",
                        description: "Needed context before sensitive requests like KYC or payment information"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-3-points-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Progress Uncertainty",
                        description: "Couldn't tell how far along they were in processes or what remained to complete"
                      },
                      {
                        id: "06",
                        index: "06",
                        title: "Hidden Value",
                        description: "Rewards and benefits existed but were never surfaced to motivate completion"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "02",
                children: [
                  <TextSet
                    key="text-strategy-3-education-a"
                    text="We explored different education methods to provide help without disrupting the experience:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Contextual Tooltips",
                        description: "Info icons with explanations on tap. Lightweight but requires user to seek help"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "First-Time Modals",
                        description: "Full-screen explanations on first visit. Comprehensive but can feel interruptive"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-3-education">
                    <img src={SignUpScreen} alt="Tooltip examples" />
                    <img src={SignUpScreen} alt="Modal and walkthrough options" />
                    <img src={SignUpScreen} alt="Inline guidance" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-3-education-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Progressive Walkthroughs",
                        description: "Step-by-step guided tours. Effective for complex features but time-consuming"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Inline Explanations",
                        description: "Educational content embedded in interface. Always visible but takes up space"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-3-education-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Video Tutorials",
                        description: "Short explainer videos for complex features. Engaging but not everyone watches"
                      },
                      {
                        id: "06",
                        index: "06",
                        title: "Coach Marks",
                        description: "Animated pointers to UI elements. Draws attention but can feel patronizing"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-3-education-d"
                    annotationItems={[
                      {
                        id: "07",
                        index: "07",
                        title: "Improved Error States",
                        description: "Transform blocking alerts into educational moments explaining why and what to do"
                      },
                      {
                        id: "08",
                        index: "08",
                        title: "Progressive Disclosure",
                        description: "Introduce advanced features after basics are understood. Reduces overwhelm"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "03",
                children: [
                  <TextSet
                    key="text-strategy-3-guidance-a"
                    text="We designed strategies to integrate guidance seamlessly throughout the product:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Sticky vs Dismissible Carousel",
                        description: "Current carousel scrolls away. Explored sticky positioning to maintain awareness"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Integrated Task Cards",
                        description: "Embed next steps directly within relevant pages instead of separate checklist"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-3-guidance">
                    <img src={SignUpScreen} alt="Integrated guidance examples" />
                    <img src={SignUpScreen} alt="Contextual prompts" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-3-guidance-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Progress Indicators",
                        description: "Persistent tracking without dominating space. Shows advancement through journey"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Contextual Prompts",
                        description: "Trigger guidance at moment of need rather than upfront. More relevant and timely"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-3-guidance-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Narrative Cohesion",
                        description: "Connect steps with clear explanations of what unlocks next to maintain motivation"
                      },
                      {
                        id: "06",
                        index: "06",
                        title: "Reward Visibility",
                        description: "Surface incentives throughout journey to encourage completion of tasks"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              }
            ]}
          />
        </BodyComponent>,
        <BodyComponent key="strategy-fullcard-4">
          <FullCard
            index="04"
            icon={<Icon svgPath={ICON_PATHS.solidSunAlt} size="xl" />}
            title="Redesigning Onboarding Experience"
            subtitle="Exploring Different Approaches to Guide Users"
            description="We explored multiple onboarding patterns and sequences to determine which approach would best balance user motivation, value demonstration, and required actions."
            headItems={[
              {
                id: "01",
                index: "01",
                title: "The Challenge"
              },
              {
                id: "02",
                index: "02",
                title: "Exploring Different Onboarding Patterns"
              },
              {
                id: "03",
                index: "03",
                title: "Onboarding Card Presentation"
              },
              {
                id: "04",
                index: "04",
                title: "Onboarding Sequencing & Testing"
              }
            ]}
            bodyItems={[
              {
                id: "01",
                children: [
                  <TextSet
                    key="text-strategy-4-challenge"
                    text="Six tasks shown upfront overwhelmed users. Generic blocking alerts appeared without explaining why they were needed. The experience felt like a disconnected checklist rather than a purposeful journey."
                  />,
                  <MediaSet key="media-strategy-4-challenge">
                    <img src={SignUpScreen} alt="Overwhelming onboarding checklist" />
                    <img src={SignUpScreen} alt="Generic blocking alerts" />
                  </MediaSet>
                ],
                annotationItems: []
              },
              {
                id: "02",
                children: [
                  <TextSet
                    key="text-strategy-4-education-a"
                    text="We explored different education methods to provide help without disrupting the experience:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Contextual Tooltips",
                        description: "Info icons with explanations on tap. Lightweight but requires user to seek help"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "First-Time Modals",
                        description: "Full-screen explanations on first visit. Comprehensive but can feel interruptive"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-4-education">
                    <img src={SignUpScreen} alt="Tooltip examples" />
                    <img src={SignUpScreen} alt="Modal and walkthrough options" />
                    <img src={SignUpScreen} alt="Inline guidance" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-4-education-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Progressive Walkthroughs",
                        description: "Step-by-step guided tours. Effective for complex features but time-consuming"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Inline Explanations",
                        description: "Educational content embedded in interface. Always visible but takes up space"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-4-education-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Video Tutorials",
                        description: "Short explainer videos for complex features. Engaging but not everyone watches"
                      },
                      {
                        id: "06",
                        index: "06",
                        title: "Coach Marks",
                        description: "Animated pointers to UI elements. Draws attention but can feel patronizing"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-4-education-d"
                    annotationItems={[
                      {
                        id: "07",
                        index: "07",
                        title: "Improved Error States",
                        description: "Transform blocking alerts into educational moments explaining why and what to do"
                      },
                      {
                        id: "08",
                        index: "08",
                        title: "Progressive Disclosure",
                        description: "Introduce advanced features after basics are understood. Reduces overwhelm"
                      }
                    ]}
                  />
                ],
                annotationItems: []
              },
              {
                id: "03",
                children: [
                  <TextSet
                    key="text-strategy-4-guidance-a"
                    text="We designed strategies to integrate guidance seamlessly throughout the product:"
                    annotationItems={[
                      {
                        id: "01",
                        index: "01",
                        title: "Sticky vs Dismissible Carousel",
                        description: "Current carousel scrolls away. Explored sticky positioning to maintain awareness"
                      },
                      {
                        id: "02",
                        index: "02",
                        title: "Integrated Task Cards",
                        description: "Embed next steps directly within relevant pages instead of separate checklist"
                      }
                    ]}
                  />,
                  <MediaSet key="media-strategy-4-guidance">
                    <img src={SignUpScreen} alt="Integrated guidance examples" />
                    <img src={SignUpScreen} alt="Contextual prompts" />
                  </MediaSet>,
                  <TextSet
                    key="text-strategy-4-guidance-b"
                    annotationItems={[
                      {
                        id: "03",
                        index: "03",
                        title: "Progress Indicators",
                        description: "Persistent tracking without dominating space. Shows advancement through journey"
                      },
                      {
                        id: "04",
                        index: "04",
                        title: "Contextual Prompts",
                        description: "Trigger guidance at moment of need rather than upfront. More relevant and timely"
                      }
                    ]}
                  />,
                  <TextSet
                    key="text-strategy-4-guidance-c"
                    annotationItems={[
                      {
                        id: "05",
                        index: "05",
                        title: "Narrative Cohesion",
                        description: "Connect steps with clear explanations of what unlocks next to maintain motivation"
                      },
                      {
                        id: "06",
                        index: "06",
                        title: "Reward Visibility",
                        description: "Surface incentives throughout journey to encourage completion of tasks"
                      }
                    ]}
                  />
                ],
                annotationItems: []
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
                  <MediaSet key="media-sol-1">
                    <img src={Figure01} alt="Sign-up flow comparison showing before and after improvements" />
                  </MediaSet>
                ]
              },
              {
                id: "02",
                children: [
                  <MediaSet key="media-sol-2">
                    <img src={SignUpScreen} alt="User testing results and feedback on new sign-up flow" />
                  </MediaSet>
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
                  <MediaSet key="media-sol-3">
                    <img src={OnboardingFunnelChart} alt="Enhanced onboarding flow with improved user guidance" />
                  </MediaSet>
                ]
              },
              {
                id: "02",
                children: [
                  <MediaSet key="media-sol-4">
                    <img src={Figure01} alt="Progress tracking and user journey visualization" />
                  </MediaSet>
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
                  <MediaSet key="media-sol-5">
                    <img src={SignUpScreen} alt="Security messaging and transparency improvements" />
                  </MediaSet>
                ]
              },
              {
                id: "02",
                children: [
                  <MediaSet key="media-sol-6">
                    <img src={OnboardingFunnelChart} alt="Trust-building elements and user confidence indicators" />
                  </MediaSet>
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
                  <MediaSet key="media-sol-7">
                    <img src={Figure01} alt="User segmentation and personalized onboarding paths" />
                  </MediaSet>
                ]
              },
              {
                id: "02",
                children: [
                  <MediaSet key="media-sol-8">
                    <img src={SignUpScreen} alt="Adaptive content and dynamic user experience" />
                  </MediaSet>
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
                  <MediaSet key="media-sol-9">
                    <img src={OnboardingFunnelChart} alt="Analytics dashboard and user behavior tracking" />
                  </MediaSet>
                ]
              },
              {
                id: "02",
                children: [
                  <MediaSet key="media-sol-10">
                    <img src={Figure01} alt="A/B testing results and optimization insights" />
                  </MediaSet>
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
