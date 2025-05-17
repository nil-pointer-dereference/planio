import { Navigate, useSearchParams } from "react-router";
import StepOne from "./step-1";
import StepTwo from "./step-2";
import StepThree from "./step-3";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import useQuestionnaire from "@/hooks/use-questionnaire";
import { Link } from "react-router";
import { BotMessageSquare, ArrowLeft } from "lucide-react";
import LoadingScreen from "@/components/loading-screen";

const questionnaireSchema = z.object({
  age: z.number(),
  name: z.string(),
  interests: z.string(),
  doesWork: z.boolean(),
  workTime: z.string(),
  goals: z.string(),
  freeTimeActivities: z.string(),
  rest: z.string(),
  entertainment: z.string(),
  levelOfStress: z.number(),
  dayIntensiveness: z.number(),
  sportExperience: z.number(),
  wakeUpTime: z.string(),
  sleepHours: z.number(),
});

export type QuestionnaireSchema = z.infer<typeof questionnaireSchema>;

export interface StepProps {
  updateFormState: (fields: Partial<QuestionnaireSchema>) => void;
}

export default function QuestionnairePage() {
  const { isPosting, sendQuestionnaire } = useQuestionnaire();
  const [form, setForm] = useState<QuestionnaireSchema>({
    age: 18,
    name: "",
    interests: "",
    doesWork: false,
    workTime: "",
    goals: "",
    freeTimeActivities: "",
    rest: "",
    entertainment: "",
    levelOfStress: 1,
    dayIntensiveness: 1,
    sportExperience: 1,
    wakeUpTime: "",
    sleepHours: 4,
  });

  useEffect(() => console.log(form), [form]);

  const [searchParams, _] = useSearchParams();
  const step = searchParams.get("step")
    ? Number(searchParams.get("step"))
    : null;

//  if (!step || Number.isNaN(step) || step > 2 || step < 1) {
//    return <Navigate to={"/questionnaire?step=1"}></Navigate>;
//  }

  const updateFormState = (fields: Partial<QuestionnaireSchema>) => {
    setForm({ ...form, ...(fields as QuestionnaireSchema) });
  };

  const finishQuestionnaire = async (fields: Partial<QuestionnaireSchema>) => {
    const final = { ...form, ...fields };
    setForm(final);
    await sendQuestionnaire(final);
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Planio chce Cię poznać";
      case 2:
        return "Opowiedz nam o swoich celach i codzienności";
      case 3:
        return "Zadbajmy o Twój balans";
      default:
        return "";
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1:
        return "Podaj nam kilka podstawowych informacji o sobie, abyśmy mogli lepiej dostosować asystenta do Twoich potrzeb.";
      case 2:
        return "Jak wygląda Twój dzień? Jakie masz priorytety i czego oczekujesz od swojego planu? Dzięki temu Planio pomoże Ci skuteczniej zarządzać czasem.";
      case 3:
        return "Podziel się z nami poziomem stresu i aktywnością fizyczną — dzięki temu Planio będzie mógł zaproponować Ci zdrowe przerwy i dopasowane zadania.";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center py-16 w-full">
      <Link
        to="/"
        className="absolute left-6 top-6 flex items-center rounded-full px-6 py-5 text-lg text-foreground underline-offset-4 hover:underline hover:text-secondary-foreground group"
      >
        <ArrowLeft className="size-6 transition-transform duration-300 ease-in-out group-hover:-translate-x-2" />
        <span className="ml-2">Powrót</span>
      </Link>
      <BotMessageSquare className="inline text-primary size-[8rem] pb-2" />
      <div className="flex gap-2 items-center ">
        <h1 className="lg:text-[3rem] text-3xl text-center flex items-center gap-4 fluid-text-animation group">
          {getStepTitle(step)}!
        </h1>
      </div>
      <p className="fontbold text-muted-foreground max-w-2/4 text-md pb-8 text-center">
        {getStepDescription(step)}
      </p>
      <div className="w-[450px] relative m-5 pb-4">
        <Progress max={100} value={step * 50}></Progress>
      </div>
      {step === 1 && <StepTwo updateFormState={updateFormState}></StepTwo>}
      {step === 2 && <StepThree updateFormState={finishQuestionnaire} />}
      <LoadingScreen open={isPosting}></LoadingScreen>
    </div>
  );
}
