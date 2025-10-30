# TANDA Portfolio - Discovery Section Complete Summary

## Section Overview

The Discovery section presents 4 key insights from user research (interviews, UXCam sessions, comparative analysis, and user flow audits). Each insight includes intro blurbs and detailed slide breakdowns with annotations.

---

## INSIGHT 1: Technical Friction Caused Early Exits

**Intro:** Technical bugs blocked users from creating accounts. We had to fix the foundation before improving the experience.

### Slide: Technical Bugs Blocked Account Creation

#### Issue 1: CloudFlare Timeout
**Ann 1: CloudFlare Timeout During Phone Verification**
Users encountered CloudFlare protection errors when attempting to verify phone numbers, creating a dead-end that prevented account creation.

**Ann 2: Phone Verification Removed**
Since phone verification wasn't technically required, we eliminated this step entirely—removing both the bug and unnecessary friction.

#### Issue 2: Pasted Email Error
**Ann 3: Pasted Emails Rejected But Logged as Valid**
Pasted emails were rejected by the input field but still logged as registered, creating "ghost accounts" that blocked retry attempts.

**Ann 4: Fixed Input Validation Logic**
Corrected validation to accept pasted emails and aligned account logging with successful registration only.

#### Issue 3: Unclear Email Verification
**Ann 5: Email Verification Out of Sync with Input**
The verification screen didn't show which email address was being verified. Users couldn't catch typos or confirm they were checking the right inbox.

**Ann 6: Added Email Display and Self-Service Options**
Showed the email address on-screen and added "Resend," "Check spam," and "Edit email" options for self-service recovery.

---

## INSIGHT 2: Lack of Trust and Understanding Value Prevents Activation

**Intro:** Users who created accounts dropped off during KYC and profile setup. They didn't trust us enough to share sensitive information, and didn't understand what they'd gain by completing these steps.

### Slide 1: KYC Flow Doesn't Build Trust

**Ann 1: Added Intro Screen to Explain KYC Purpose**
Introduced a screen before the form that explains what KYC is, why it's required (regulatory compliance, account security), and what users unlock by completing it.

**Ann 2: Added Security and Privacy Assurances**
Added trust indicators like encryption badges, privacy policy links, and compliance statements at critical input moments to reassure users.

**Ann 3: Broke Long Form into Manageable Steps**
The original single-page form felt overwhelming. We broke it into progressive steps (Basic Info → Address → Document Upload) to make completion feel achievable.

**Ann 4: Softened Pending and Failure State Messaging**
Rewrote harsh, final language to be encouraging, added retry options, and kept users engaged during review periods with progress updates and alternative actions.

### Slide 2: Value Propositions Unclear During Onboarding

**Ann 1: No Value Demonstrated Before Sensitive Requests**
Sensitive information was requested before users experienced any product value, killing completion motivation.

**Ann 2: 'Find Circle' Buried as Final Step**
Users wanted to join circles (core value) but had to complete KYC and profiles first. This reversed order killed motivation before they experienced the product.

**Ann 3: (New) Implement Segmentation Survey**
Added a quick survey asking about financial goals. This educates users on TANDA's capabilities while letting us personalize their onboarding path.

**Ann 4: Connect Value Props Personally**
Survey responses trigger personalized value demonstrations. Select '$500 access' → See circles where members achieve that goal. This connects TANDA's features directly to individual needs.

---

## INSIGHT 3: Users Felt Aimless Without Guidance or Motivation

**Intro:** Users who completed account setup didn't know what to do next. The app provided no clear direction, no education on features, and no compelling reason to continue engaging.

### Slide 1: Carousel and Home Screen Fail to Guide Users

**Ann 1: Visually Unappealing and Not Prominent**
The carousel was easy to dismiss and lacked visual hierarchy. With no sticky behavior or compelling design, users scrolled past it immediately without engaging.

**Ann 2: Too Many Steps Create Overwhelm**
Showing all onboarding steps at once (Verify Identity, Complete Profile, Join Circle, etc.) felt daunting. Users saw a checklist of tasks rather than an exciting journey.

**Ann 3: Home Screen Has No Clear Entry Point**
After dismissing the carousel, users landed on a home screen with multiple features but no guidance on where to start or what to do first.

**Ann 4: Locked Onboarding Steps Lead to Drop-Off**
Strict sequential dependencies meant one incomplete step blocked all progress. Users waiting for KYC approval or experiencing verification delays couldn't continue onboarding or use any app features, leading to abandonment.

**Ann 5: (Solution) Streamlined, Sticky Onboarding with Clear Priority**
Redesigned carousel with progressive disclosure, sticky positioning, and visual emphasis on the most important next action: "Find Your Circle."

**Ann 6: (Solution) Unlocked Non-Critical Steps for Partial Progress**
Removed hard dependencies on non-critical steps. Users can now browse circles, explore features, and engage with the app while KYC is processing, preventing dead-end waiting periods and maintaining momentum.

### Slide 2: Pages Lack Intuitive Navigation and Education

**Ann 1: Users Don't Understand Page Purpose**
When navigating to new screens (Circles, Profile, Settings), users couldn't immediately identify what the page was for or what actions they could take.

**Ann 2: No Onboarding Education or Tooltips**
The app had zero in-app education. Users didn't understand how circles work, how to evaluate them, or what actions were available. App relied entirely on in-person onboarding.

**Ann 3: Blocking Notifications Redirected to Carousel**
When users hit restrictions (KYC required, profile incomplete), blocking alerts simply sent them back to the onboarding carousel without explanation, creating a frustrating loop.

**Ann 4: Onboarding Felt Like Disconnected Tasks**
Each step (verify identity, add profile, join circle) felt like isolated chores with no narrative thread. Users couldn't see how tasks connected or built toward a goal.

**Ann 5: (Solution) Created Cohesive Onboarding Journey**
Added narrative progression: "Build your profile → Explore circles → Join your first community → Start saving." Each step now clearly leads to the next with purpose.

**Ann 6: (Solution) Contextual Education at Key Moments**
Added first-time tooltips, feature explanations, and "What is this?" helpers on each major page. Progressive education guides users without overwhelming them.

**Ann 7: (Solution) Clear Error States with Next Steps**
Replaced generic blocking alerts with specific guidance: "Complete KYC to join circles" with direct link to KYC flow, breaking the redirect loop.

### Slide 3: No Clear Incentive or Reward Visibility

**Ann 1: Generic CTA Without Compelling Value**
The only call-to-action was "Join a Circle" with no explanation of what users would gain. No emotional hook or tangible benefit presented.

**Ann 2: In-App Incentives Completely Hidden**
Sign-up rewards and achievement incentives existed but were never surfaced during onboarding. Users only discovered them after fully joining a circle, missing the opportunity to motivate completion.

**Ann 3: No Mention of Benefits Elsewhere**
Rewards weren't referenced on home screen, carousel, or circle browsing pages. Users had no idea what they were working toward.

**Ann 4: (Solution) Surface Rewards Early and Often**
Display sign-up bonuses, achievement milestones, and unlockable benefits prominently during onboarding. Show users "Join a circle → Unlock $X reward" to create clear motivation.

**Ann 5: (Solution) Progress Indicators and Achievement Tracking**
Added visible progress bars and milestone celebrations so users see their advancement and feel rewarded for completing steps.

---

## INSIGHT 4: Friend-Referred Users Show Highest Completion Rates

**Intro:** Users invited by friends completed onboarding at significantly higher rates. They arrived with built-in trust, context, and motivation—advantages we weren't leveraging or making easy to create.

### Slide 1: Issues with Friend Code Input

**Ann 1: Friend Code Input Unclear or Missing**
Users didn't know where to enter a friend's referral code, or the input field was buried in settings. Referred users lost the connection to their friend immediately upon sign-up.

**Ann 2: No Validation or Feedback**
When users entered friend codes, there was no confirmation that it worked, no preview of whose circle they'd join, or unclear error messages when codes were invalid.

**Ann 3: Friend Context Lost After Input**
Even when friend codes were successfully entered, the connection wasn't reinforced throughout onboarding. Users didn't see "[Friend's name] invited you!" or get directed to their friend's circle.

**Ann 4: (Solution) Prominent Friend Code Input with Context**
Moved friend code input to sign-up flow with clear placement. Show friend's name and profile immediately upon valid code entry: "Join [Friend's name] on TANDA!"

**Ann 5: (Solution) Direct Path to Friend's Circle**
After entering friend code, automatically surface the friend's circle as a recommended join option, making the social connection actionable.

### Slide 2: Hard to Find Friend's Circle When In-App

**Ann 1: No Way to Search for Specific Circles or Friends**
Users couldn't search for their friend's circle by name or filter by "friends' circles." They had to scroll through all available circles hoping to stumble upon their friend.

**Ann 2: Friend Connections Not Visible**
Even if a friend was in a circle, there was no indicator showing "Your friend [Name] is in this circle," missing a powerful social proof signal.

**Ann 3: Referred Users Treated Like Cold Browsers**
Users who entered friend codes were shown the same generic circle list as everyone else, wasting the warm introduction and social motivation they arrived with.

**Ann 4: (Solution) Friend Filter and Search Functionality**
Added "Circles Your Friends Are In" filter and search by circle name, making it easy to find and join friends directly.

**Ann 5: (Solution) Social Proof Indicators**
Display "[Friend's name] is in this circle" badges throughout circle browsing, leveraging social connections to drive joins.

### Slide 3: Dilapidated Invite System

**Ann 1: No Easy Way to Invite Friends**
The app lacked a clear "Invite Friends" feature. Users had to manually copy links, explain TANDA outside the app, or figure out referral mechanics on their own.

**Ann 2: Share Flow Hidden or Broken**
If a share feature existed, it was buried in settings or had a broken user experience with unclear messaging, no pre-populated text, or technical issues.

**Ann 3: No Incentive Visibility for Referrers**
Users didn't know they could earn rewards for inviting friends. The benefit of referring was never communicated, removing motivation to share.

**Ann 4: (Solution) Prominent "Invite Friends" Feature**
Added highly visible "Invite Friends" button on home screen and profile with one-tap sharing to SMS, email, and social platforms.

**Ann 5: (Solution) Pre-Populated Referral Messages**
Created compelling, pre-written share messages that explain TANDA's value and include personalized referral codes, making sharing effortless.

**Ann 6: (Solution) Dual-Sided Reward System**
Clearly communicate "You get $X, they get $Y" when inviting friends, creating motivation for both parties and driving viral growth.

---

## Section Summary

**Total Content:**
- 4 Insights
- 7 Slides
- 38 Annotations

**Key Themes:**
1. **Technical Foundation** - Fixed critical bugs blocking account creation
2. **Trust & Value** - Built trust through transparency and demonstrated value before asking for information
3. **Guidance & Motivation** - Provided clear direction, education, and visible incentives
4. **Social Growth** - Optimized referral experience to leverage highest-performing acquisition channel

**Research Foundation:**
- User Interviews
- UXCam Session Analysis
- Comparative Analysis
- User Flow Audit

---

## Next Section: Strategy

The Strategy section will outline how these insights inform the product roadmap and design decisions.