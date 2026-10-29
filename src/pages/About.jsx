import { Experience, FinalCta, MarketPhilosophy, Outcomes, PageHeader, Stories, Story, usePageTitle } from '../components/sections'

export default function About() {
  usePageTitle('About')
  return (
    <>
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
