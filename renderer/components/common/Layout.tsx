import { PropsWithChildren } from "react";
import Nav from "./Nav";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
