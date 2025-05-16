import { Navigate, useSearchParams } from "react-router";
import StepOne from "./step-1";
import StepTwo from "./step-2";
import StepThree from "./step-3";
import { z } from "zod";
import { useState } from "react";
import H1 from "@/components/typography/h1";
import { Progress } from "@/components/ui/progress";

const questionnaireSchema = z.object({
  age: z.number(),
  name: z.string(),
  interests: z.string(),
  doesWork: z.boolean(),
  goals: z.string(),
  freeTimeActivities: z.string(),
  rest: z.string(),
  entertainment: z.string(),
  levelOfStress: z.number(),
  dayIntensiveness: z.number(),
});

export type QuestionnaireSchema = z.infer<typeof questionnaireSchema>;

export interface StepProps {
  updateFormState: (fields: Partial<QuestionnaireSchema>) => void;
}

export default function QuestionnairePage() {
  const [form, setForm] = useState<QuestionnaireSchema>({
    age: 18,
    name: "",
    interests: "",
    doesWork: false,
    goals: "",
    freeTimeActivities: "",
    rest: "",
    entertainment: "",
    levelOfStress: 0,
    dayIntensiveness: 0,
  });

  const [searchParams, _] = useSearchParams();
  const step = searchParams.get("step")
    ? Number(searchParams.get("step"))
    : null;

  if (!step || Number.isNaN(step) || step > 3 || step < 1) {
    return <Navigate to={"/questionnaire?step=1"}></Navigate>;
  }

  const updateFormState = (fields: Partial<QuestionnaireSchema>) => {
    setForm({ ...(fields as QuestionnaireSchema) });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <H1>Kwestionariusz początkowy</H1>
      <div className="w-[450px] m-5">
        <Progress max={100} value={(step - 1) * 33}></Progress>
      </div>
      {step === 1 && <StepOne updateFormState={updateFormState}></StepOne>}
      {step === 2 && <StepTwo updateFormState={updateFormState}></StepTwo>}
      {step === 3 && <StepThree></StepThree>}
    </div>
  );
}
