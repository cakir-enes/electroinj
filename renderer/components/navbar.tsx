import { Alignment, Button, Navbar } from "@blueprintjs/core";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [store, setStore] = useState<{ page: string }>({ page: "Home" });
  const pageSetter = (p: string) => {
    return () => {
      console.log(p);
      setStore({ page: p });
      //   store.page = p;
    };
  };
  return (
    <div
      style={{
        color: "red",
        height: "auto",
        justifyContent: "center",
        alignContent: "center"
      }}
    >
      <Link href="/monitor">
        <Button
          className="bp3-minimal"
          icon="eye-open"
          //   text="Monitor"
          minimal
          onClick={pageSetter("Monitor")}
        />
      </Link>
      <Link href="/selection">
        <Button
          minimal
          className="bp3-minimal"
          icon="document"
          //   text="Select"
          onClick={pageSetter("Select")}
        />
      </Link>
    </div>
    // <Navbar style={{ transform: "rotate(90deg)" }}>
    //   <Navbar.Group align={Alignment.LEFT}>
    //     <Navbar.Heading>{store.page}</Navbar.Heading>
    //     <Navbar.Divider />
    //     <Link href="/monitor">
    //       <Button
    //         className="bp3-minimal"
    //         icon="document"
    //         text="Monitor"
    //         onClick={pageSetter("Monitor")}
    //       />
    //     </Link>
    //     <Link href="/selection">
    //       <Button
    //         className="bp3-minimal"
    //         icon="document"
    //         text="Select"
    //         onClick={pageSetter("Select")}
    //       />
    //     </Link>
    //   </Navbar.Group>
    // </Navbar>
  );
};
export default NavBar;
