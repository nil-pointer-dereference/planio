import { useEffect, useState } from "react";

interface ApiTask {
  Completed: boolean;
  Description: string;
  EstimatedMinutes: number;
  StartHour: number;
  Title: string;
  Type: string;
}

export interface DayplanEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
  type: string;
  completed: boolean;
}

export function useDayplanEvents() {
  const [events, setEvents] = useState<DayplanEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5173/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Session: token,
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiTask[] = await response.json();
        const tasksToProcess = data.slice(1);

        const transformedEvents: DayplanEvent[] = tasksToProcess.map(
          (task, index) => {
            const today = new Date();
            const start = new Date(today);
            start.setHours(task.StartHour, 0, 0, 0);

            const end = new Date(start);
            const endMinutes = end.getMinutes() + task.EstimatedMinutes;
            end.setMinutes(endMinutes);

            return {
              id: index + 1,
              start,
              end,
              title: task.Title,
              description: task.Description,
              type: task.Type,
              completed: task.Completed,
            };
          },
        );

        setEvents(transformedEvents);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, setEvents, loading, error };
}

