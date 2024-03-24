/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const argiSteps = [
    {
      id: 1,
      step: "Financial Planning",
      answer: [
        "Determine the budget for the farming operation, including expenses for land, equipment, seeds, fertilizers, labor, and any other inputs.",
        "Create a detailed financial plan outlining expected costs, revenue projections, and potential risks.",
        "Consider factors such as loans, grants, subsidies, and insurance to support financial sustainability."
      ]
    },
    {
      id: 2,
      step: "Selecting the Right Land",
      answer: [
        "Assess various factors such as soil quality, topography, climate, water availability, and accessibility when choosing land.",
        "Conduct soil tests to analyze fertility, pH levels, and nutrient content.",
        "Ensure the land meets the requirements for the specific crops or livestock intended for cultivation."
      ]
    },
    {
      id: 3,
      step: "Soil Preparation",
      answer: [
        "Clear the land of any debris, rocks, or unwanted vegetation.",
        "Till the soil to break up compacted layers and improve aeration.",
        "Amend the soil with organic matter, fertilizers, and other nutrients as needed based on soil test results.",
        "Level the land and create appropriate drainage systems to prevent waterlogging."
      ]
    },
    {
      id: 4,
      step: "Crop Selection",
      answer: [
        "Research and select crops suitable for the local climate, soil conditions, and market demand.",
        "Consider factors such as crop rotation, pest resistance, and yield potential.",
        "Diversify crop selection to mitigate risks and optimize returns."
      ]
    },
    {
      id: 5,
      step: "Market Research and Marketing",
      answer: [
        "Identify target markets for the produce, including local consumers, wholesalers, retailers, and export opportunities.",
        "Analyze market trends, demand-supply dynamics, and pricing strategies.",
        "Develop marketing plans to promote the farm products through various channels such as farmers' markets, online platforms, or direct sales."
      ]
    },
    {
      id: 6,
      step: "Farm Management",
      answer: [
        "Establish efficient systems for day-to-day operations, including planting, irrigation, harvesting, and storage.",
        "Schedule tasks, manage labor resources, and maintain records for monitoring progress and performance.",
        "Implement sustainable practices to conserve resources and minimize environmental impact."
      ]
    },
    {
      id: 7,
      step: "Pest and Disease Management",
      answer: [
        "Monitor crops regularly for signs of pests, diseases, and weeds.",
        "Employ integrated pest management (IPM) strategies, combining cultural, biological, and chemical control methods.",
        "Implement preventative measures such as crop rotation, sanitation, and companion planting to reduce reliance on pesticides."
      ]
    },
    {
      id: 8,
      step: "Water Management",
      answer: [
        "Optimize irrigation systems to deliver water efficiently while minimizing waste.",
        "Monitor soil moisture levels and adjust irrigation schedules accordingly.",
        "Implement water conservation techniques such as mulching, drip irrigation, and rainwater harvesting."
      ]
    },
    {
      id: 9,
      step: "Continuous Learning and Networking",
      answer: [
        "Stay updated on advancements in agricultural practices, technologies, and regulations through workshops, seminars, and online resources.",
        "Build networks with other farmers, researchers, extension agents, and industry professionals to exchange knowledge and experiences.",
        "Experiment with new techniques and innovations to improve productivity and sustainability."
      ]
    },
    {
      id: 10,
      step: "Never Give Up",
      answer: [
        "Farming can be challenging, with unpredictable weather, market fluctuations, and various other factors affecting success.",
        "Persistence, resilience, and adaptability are essential traits for farmers to overcome obstacles and continue striving for success.",
        "Learn from failures, seek support from peers, and remain committed to the long-term goals of the farming operation."
      ]
    }
  ]

const AgriSteps = () => {
//   const [argiSteps, setRgiSteps] = useState()
//   useEffect(() => {
//     fetch('../../agristeps.json')
//       .then(res => res.json())
//       .then(data => setRgiSteps(data))
//   }, [])
  console.log(argiSteps)
  return (
    <div className='w-full px-4 pt-5 '>
      <p className='text-center text-2xl mb-10 font-medium'>
        10 Essential Tips for Beginner Farmers: A Beginner's Guide to Nurturing
        a Successful Farm
      </p>
    <section className='flex justify-around'>
    <div className=' w-full max-w-md rounded-2xl bg-white p-2'>
        {argiSteps?.map((step, index) => (
          <Disclosure key={step.id}>
            {({ open }) => (
              <>
                <Disclosure.Button className='mt-2 flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
                  <span>
                    {index + 1}. {step?.step}
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm text-gray-500'>
                  {step?.answer?.map(ans => (
                    <p className='mt-2 text-justify'>• {ans}</p>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
        
      </div>
      <div className='border-2 rounded-md p-2' style={{height:'400px'}}>
    <p className='text-center mt-3 mb-4 text-xl'>Beginner's Guide to Growing Vegetables for Profit</p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/fRlUhUWS0Hk?si=zKegGzgPR-mue3Fr" frameBorder="0" allowfullscreen></iframe>
      </div>

    </section>
    </div>
  )
}

export default AgriSteps
