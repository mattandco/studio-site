// The published work each case study leans on. Citations stay in their original language.
export type CaseSource = { title: string; href?: string };

export const CASE_SOURCES: Record<string, CaseSource[]> = {
  "collective-service": [
    {
      title: "Joint evaluation of the Risk Communication and Community Engagement Collective Service: evaluation brief, January 2024",
      href: "https://www.rcce-collective.net/wp-content/uploads/2024/01/Evaluation-of-Collective-Service-Brief.pdf",
    },
    { title: "Johnston et al., Journal of Medical Internet Research 27:e52591, 2025", href: "https://www.jmir.org/2025/1/e52591" },
    {
      title: "CLEAR Global and Translators without Borders, Navigating Global Guidance, 2021",
      href: "https://clearglobal.org/wp-content/uploads/2021/10/Navigating-Global-Guidance-Report.pdf",
    },
    {
      title: "Khalid et al., a user test of the Evidence Aid website, Health Research Policy and Systems, 2019",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6936118/",
    },
    { title: "Odlum et al., Conflict and Health 15:83, 2021", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8602975/" },
    {
      title: "Community Engagement Hub, platform survey results, 2025",
      href: "https://communityengagementhub.org/wp-content/uploads/sites/2/2025/06/CEA-Hub-Platform-Survey-2025-compressed.pdf",
    },
    {
      title: "Luffarelli, Mukesh and Mahmood, “Let the logo do the talking”, Journal of Marketing Research 56(5), 2019",
      href: "https://doi.org/10.1177/0022243719845000",
    },
    {
      title: "Rello, Pielot and Marcos, “Make it big!”, CHI 2016",
      href: "https://doi.org/10.1145/2858036.2858204",
    },
    { title: "Legge and Bigelow, “Does print size matter for reading?”, Journal of Vision 11(5):8, 2011" },
    { title: "Dyson and Haselgrove, International Journal of Human-Computer Studies 54(4), 2001" },
    { title: "Bringhurst, The Elements of Typographic Style, 4th edition, 2012" },
    { title: "Tinker, Legibility of Print, 1963" },
    { title: "Parhi, Karlson and Bederson, “Target size study for one-handed thumb use on small touchscreen devices”, MobileHCI 2006" },
    { title: "Bar and Neta, “Humans prefer curved visual objects”, Psychological Science 17(8), 2006" },
    { title: "Hick, “On the rate of gain of information”, Quarterly Journal of Experimental Psychology 4(1), 1952" },
    { title: "Card, Moran and Newell, The Psychology of Human-Computer Interaction, 1983; Nielsen, Usability Engineering, 1993" },
    { title: "Machado, Oliveira and Fernandes, “A physiologically-based model for simulation of color vision deficiency”, IEEE TVCG 15(6), 2009" },
    { title: "Ottosson, “A perceptual color space for image processing” (Oklab), 2020", href: "https://bottosson.github.io/posts/oklab/" },
    { title: "W3C, Web Content Accessibility Guidelines (WCAG) 2.2, 2023", href: "https://www.w3.org/TR/WCAG22/" },
    { title: "British Dyslexia Association, Dyslexia friendly style guide" },
    { title: "HTTP Archive, Web Almanac 2025", href: "https://almanac.httparchive.org/" },
  ],
  "global-girls-foundation": [
    { title: "Plan International, Global Brand Manual, September 2023" },
    { title: "W3C, Web Content Accessibility Guidelines (WCAG) 2.2, 2023", href: "https://www.w3.org/TR/WCAG22/" },
    { title: "Bringhurst, The Elements of Typographic Style, 4th edition, 2012" },
  ],
  "community-trust-index": [
    {
      title: "Shneiderman, The Eyes Have It: A Task by Data Type Taxonomy for Information Visualizations, IEEE Symposium on Visual Languages, 1996",
      href: "https://drum.lib.umd.edu/items/cd983adb-568a-47d3-b43a-1d8d8b8c72f4/full",
    },
    { title: "Tufte, Envisioning Information, Graphics Press, 1990" },
    {
      title: "Bar and Neta, Humans prefer curved visual objects, Psychological Science 17(8), 2006",
      href: "https://pubmed.ncbi.nlm.nih.gov/16913943/",
    },
    { title: "W3C, Web Content Accessibility Guidelines (WCAG) 2.2, 2023", href: "https://www.w3.org/TR/WCAG22/" },
  ],
  "dual-diploma-switzerland": [
    {
      title: "Swiss Federal Statistical Office figures for 2023, reported by SWI swissinfo.ch, 2025",
      href: "https://www.swissinfo.ch/eng/demographics/english-and-other-foreign-languages-on-rise-in-switzerland/88890429",
    },
    {
      title: "Cerf, Frady and Koch, Faces and text attract gaze independent of the task, Journal of Vision 9(12), 2009",
      href: "https://resolver.caltech.edu/CaltechAUTHORS:20130816-103355264",
    },
    {
      title: "Kivetz, Urminsky and Zheng, The Goal-Gradient Hypothesis Resurrected, Journal of Marketing Research 43, 2006",
      href: "https://business.columbia.edu/faculty/research/goal-gradient-hypothesis-resurrected-purchase-acceleration-illusionary-goal",
    },
    { title: "W3C, Web Content Accessibility Guidelines (WCAG) 2.2, 2023", href: "https://www.w3.org/TR/WCAG22/" },
  ],
};
