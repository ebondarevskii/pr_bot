import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";

import { Info as InfoIcon } from "../../icons/Info";
import { NextArrow as NextArrowIcon } from "../../icons/NextArrow";
import { useState } from "react";
import { onboardingSteps } from "./constant";
import { Button } from "../button";
import { TopUp } from "../TopUp";

export const Onboarding = () => {
  const [step, setStep] = useState(1);

  const currentStep = onboardingSteps[step - 1];

  const isLastStep = step === onboardingSteps.length;

  const onGoNextStep = () => {
    if (isLastStep) {
    }
    setStep((prev) => prev + 1);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div
          data-button="true"
          data-description="false"
          data-icon="true"
          data-title="true"
          data-variant="Default"
          className="mb-1.5 w-full self-stretch px-4 py-3 bg-base-card rounded-[10px] outline-offset-[-1px] border border-[#E5E5E5] inline-flex justify-start items-center gap-3"
        >
          <div className="flex-1 flex justify-start  gap-3">
            <div className="pt-0.5 flex justify-start items-start">
              <InfoIcon />
            </div>
            <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
              <div className="self-stretch justify-start text-base-foreground text-sm font-medium font-['Geist'] leading-tight">
                How it works?
              </div>
            </div>
          </div>

          <NextArrowIcon />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="bg-white rounded-t-[10px] pt-[16px] px-[15px]">
          <p className="self-stretch text-center justify-start text-sm font-normal font-['Geist'] leading-tight text-[#737373]">{`Step ${step} of ${onboardingSteps.length}`}</p>
          <h4 className="mb-[32px] self-stretch text-center justify-start text-[#0a0a0a] text-lg font-semibold font-['Geist'] leading-none">
            {currentStep.title}
          </h4>

          <div className="bg-[#f5f5f5] w-full h-40 bg-base-secondary rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mb-[12px]" />

          <p className="mb-[116px] text-[#737373] self-stretch text-center justify-start text-base-muted-foreground text-base font-normal font-['Geist'] leading-normal">
            {currentStep.description}
          </p>
          {isLastStep ? (
            <TopUp />
          ) : (
            <Button
              variant="default"
              onClick={onGoNextStep}
              className="w-full mb-[16px]"
            >
              Next
            </Button>
          )}
          {step === 4 && (
            <Button
              variant="outline"
              onClick={onGoNextStep}
              className="w-full mb-[16px]"
            >
              Learn more
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
