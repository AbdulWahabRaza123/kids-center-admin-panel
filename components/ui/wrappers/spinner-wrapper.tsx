import { Spinner } from "@/components/spinner";

export const SpinnerWrapper = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  if (loading) {
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
