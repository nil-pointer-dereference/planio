import api from "@/api/config";
import type { QuestionnaireSchema } from "@/pages/questionnaire";
import { useState } from "react";

const useQuestionnaire = () => {
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const sendQuestionnaire = async (
    questionnaire: QuestionnaireSchema,
  ): Promise<boolean> => {
    try {
      setIsPosting(true);
      await api.post("/form", questionnaire);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsPosting(false);
    }
  };

  return {
    isPosting,
    sendQuestionnaire,
  };
};

export default useQuestionnaire;
