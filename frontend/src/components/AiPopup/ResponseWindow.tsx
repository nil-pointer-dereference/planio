type ResponseWindowProps = {
  response: {
    message: string;
  };
};

export default function ResponseWindow({ response }: ResponseWindowProps) {
  return (
    <div className="w-full ease-in-out h-full bg-accent p-8 border-3 border-background rounded-xl flex flex-col justify-start items-center gap-7">
      <h1 className="text-left text-3xl font-bold text-accent-foreground w-full text-wrap">
        Odpowiedź na Podsumowanie
      </h1>
      <p className="text-left w-full text-wrap">{response.message}</p>
    </div>
  );
}
