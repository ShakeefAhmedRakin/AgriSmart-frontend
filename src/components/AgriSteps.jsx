/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const AgriSteps = () => {
  const [argiSteps, setRgiSteps] = useState();
  useEffect(() => {
    fetch("../../agristeps.json")
      .then((res) => res.json())
      .then((data) => setRgiSteps(data));
  }, []);
  return (
    <div className="w-full px-4 pt-5 ">
      <p className="text-center text-2xl mb-10 font-medium">
        10 Essential Tips for Beginner Farmers: A Beginner's Guide to Nurturing
        a Successful Farm
      </p>
      <section className="flex justify-between">
        <div className=" w-full max-w-md rounded-2xl bg-white p-2">
          {argiSteps?.map((step, index) => (
            <Disclosure key={step.id}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="mt-2 flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span>
                      {index + 1}. {step?.step}
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    {step?.answer?.map((ans) => (
                      <p className="mt-2 text-justify">• {ans}</p>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        <div className="border-2 rounded-md p-2" style={{ height: "400px" }}>
          <p className="text-center mt-3 mb-4 text-xl">
            Beginner's Guide to Growing Vegetables for Profit
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/fRlUhUWS0Hk?si=zKegGzgPR-mue3Fr"
            frameBorder="0"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default AgriSteps;
