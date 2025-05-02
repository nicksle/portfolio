import React, { useState } from 'react';
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

const CaseStudy = () => {
  const [activeContentId, setActiveContentId] = useState('problem');

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

  return (
    <div className="case-study">
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
            <Body>
              <BodyComponent style={{ gridTemplateColumns: '1fr 1fr' }}>
                <Text>
                  Tanda, a leading workforce management platform, faced a critical challenge in their mobile app experience. 
                  The existing interface was not optimized for the growing number of users accessing the platform through mobile devices, 
                  leading to decreased user engagement and satisfaction.
                </Text>
                <Image src="https://picsum.photos/800/600" alt="Tanda mobile app problem illustration" />
              </BodyComponent>
            </Body>
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
            <BodyComponent rows={1} style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Text>
                Our primary goals were to improve user experience, increase efficiency, and create a more scalable solution. We established clear metrics to measure success.
              </Text>
              <Text>
                Each goal was carefully defined with specific, measurable outcomes to ensure we could track progress and validate our solutions.
              </Text>
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
            <BodyComponent rows={1}>
              <FullCard
                index="05"
                icon={IconSvg}
                title="Solution Design"
                description="The innovative solutions we developed to address the identified problems."
                ctaText="View Details"
                ctaIcon={IconSvg}
              >
                <img src="https://picsum.photos/400/540" alt="Solutions visualization 1" />
                <img src="https://picsum.photos/400/540" alt="Solutions visualization 2" />
                <img src="https://picsum.photos/400/540" alt="Solutions visualization 3" />
              </FullCard>
            </BodyComponent>
            <BodyComponent rows={1} style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Text>
                Based on our research and insights, we developed a comprehensive solution that addressed the core problems while maintaining flexibility for future growth.
              </Text>
              <Text>
                The solution incorporated both technical improvements and user experience enhancements, creating a more efficient and user-friendly system.
              </Text>
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
  );
};

export default CaseStudy; 