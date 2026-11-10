import SEO from '../components/SEO'
import { Experience, FinalCta, MarketPhilosophy, Outcomes, PageHeader, Stories, Story, usePageTitle } from '../components/sections'

export default function About() {
  usePageTitle('About')
  return (
    <>
      <SEO
        title="About Our Academy & Mission"
        description="Discover Theorem Academy's vision, institutional market philosophy, physical trading floors in UAE & India, and commitment to disciplined, professional capital markets education."
        keywords="about theorem academy, institutional trading institute, trading academy dubai, trading floors mumbai, farhan ahmed trader"
      />
      <PageHeader
        title="An institutional academy for modern capital markets."
        intro="We educate learners across global forex, digital assets, and equities in person and through live interactive cohorts. Small batch sizes, direct mentor accountability, and an uncompromising focus on market realities."
      />
      <MarketPhilosophy />
      <Experience />
      <Story />
      <Outcomes />
      <Stories />
      <FinalCta />
    </>
  )
}
