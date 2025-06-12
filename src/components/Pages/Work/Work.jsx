import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
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
import TandaThumbnail1 from "../../../assets/TANDA/Thumbnail/Thumbnail1.svg";
import TandaThumbnail2 from "../../../assets/TANDA/Thumbnail/Thumbnail2.svg";
import './Work.css';

const Work = () => {
  const [activeContentId, setActiveContentId] = useState('tanda');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const workContentRef = useRef(null);
  const contentNavRef = useRef(null);
  const scrollLockRef = useRef(false);

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
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!workContentRef.current || !contentNavRef.current) return;
      const headerHeight = 64;
      const targetY = 24;
      const navRect = contentNavRef.current.getBoundingClientRect();
      const navTop = navRect.top;
      
      // Calculate progress: 1 when navTop == targetY, 0 when navTop is just below workContent
      const workRect = workContentRef.current.getBoundingClientRect();
      const startY = workRect.bottom; // nav just below work content
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

  // Framer Motion values
  const minY = 24; // Changed from 88 to 24
  const maxY = viewportHeight * 0.8; // Reduce the maximum scroll distance to 80% of viewport height
  const translateY = (1 - scrollProgress) * (maxY - minY) + minY;
  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.2;

  return (
    <div>
      <div className="work-page">
        <motion.div
          className="work-content-section"
          ref={workContentRef}
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
            opacity: Math.max(opacity, 0),
            scale: Math.max(scale, 0.8),
            zIndex: 1,
            right: 0,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <div className="work-description" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 300, color: 'var(--active)', margin: 0, textAlign: 'left' }}>
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
        <div ref={contentNavRef} style={{ zIndex: 2, position: 'relative', marginTop: '100vh' }}>
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
                onNext={handleNextContent}
              >
                <BodyComponent style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <Text>
                      TANDA is a fintech startup dedicated to making financial security accessible to everyone. Through our iOS and Android mobile apps, we offer a community-driven savings service that empowers users to reach their financial goals.
                    </Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="https://via.placeholder.com/400x300" alt="Tanda Image" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  </div>
                </BodyComponent>
                <BodyComponent>
                  <SelectedWorks title="Selected Works" description="A collection of my work">
                    <WorkItem index="01" title="Improving our NUX to Increase User Activation Rates" description="Delightful sign-up flow that increased user retention and reduced drop off" />
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
                onNext={handleNextContent}
              >
                <BodyComponent style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <Text>
                      LiftOff Mobile's Influence team aims to transform digital advertising by leveraging user-generated content (UGC) as a powerful, authentic marketing tool for brands and mobile businesses.  We bridges relationships between influencers and advertisers, providing tools to help influencers to monetize their content, and advertisers find creators who fit their specific needs.
                    </Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="https://via.placeholder.com/400x300" alt="Liftoff Image" style={{ width: '100%', height: 'auto' }} />
                  </div>
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
                onNext={handleNextContent}
              >
                <BodyComponent style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <Text>
                      This is the Jefuel section.
                    </Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="https://via.placeholder.com/400x300" alt="Jefuel Image" style={{ width: '100%', height: 'auto' }} />
                  </div>
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
                onNext={handleNextContent}
              >
                <BodyComponent style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <Text>
                      This is the CashApp section.
                    </Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="https://via.placeholder.com/400x300" alt="CashApp Image" style={{ width: '100%', height: 'auto' }} />
                  </div>
                </BodyComponent>
                <BodyComponent>
                  <SelectedWorks title="Selected Works" description="A collection of my work">
                    <WorkItem index="01" title="CashApp Project 1" description="Description for CashApp Project 1" />
                    <WorkItem index="02" title="CashApp Project 2" description="Description for CashApp Project 2" />
                  </SelectedWorks>
                </BodyComponent>
              </Content>
            </ContentStack>
          </ContentNavigator>
        </div>
      </div>
    </div>
  );
};

export default Work;
