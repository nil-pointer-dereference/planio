import { Spinner } from "./spinner";

type LoadingScreenProps = {
  open: boolean;
};

export default function LoadingScreen({ open }: LoadingScreenProps) {
  return (
    <>
      {open ? (
        <div
          className="fixed top-0 left-o w-screen h-screen flex justify-center items-center"
          style={{ background: "rgba(0, 0, 0, .75)" }}
        >
          <Spinner></Spinner>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
