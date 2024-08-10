import { IReactFC } from "../../types";

const AppPageLoading: IReactFC = ({ children }) => {
  return (
    <div className="items-center justify-center">
      <div className="text-center text-xl uppercase md:text-2xl">{children}</div>
    </div>
  );
};

export default AppPageLoading;
