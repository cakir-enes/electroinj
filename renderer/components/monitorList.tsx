import {
  Button,
  Callout,
  Classes,
  Colors,
  Divider,
  H5,
  InputGroup
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React, { useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { useHover } from "../hooks/useHover";

type Props = { params: { name: string; val: string }[] };

const MonitorList: React.FC<Props> = ({ params }) => {
  const [open, setOpen] = useState(false);
  const paramRef = useRef(0);
  return (
    <React.Fragment>
      <Virtuoso
        style={{ flexGrow: 1, height: "100%" }}
        totalCount={params.length}
        item={idx => (
          <Item
            param={params[idx]}
            onClick={param => {
              paramRef.current = idx;
              setOpen(true);
            }}
            isOdd={idx % 2 == 0}
            showDetails={paramRef.current == idx && open}
            hideDetails={() => {
              console.log("hide");
              setOpen(f => false);
              console.log(open);
            }}
          />
        )}
      />
      {/* <Drawer isOpen={open} position="bottom" size="45px" hasBackdrop={false} onClose={() => setOpen(false)}>
				<Callout
					style={{
						display: 'flex',
						alignItems: 'baseline',
						alignContent: 'center',
						height: '100%',
						justifyContent: 'space-between'
					}}
				>
					<div style={{ display: 'flex', marginLeft: '10%' }}>
						<Info a="Path: " b={params[paramRef.current] && params[paramRef.current].name} />
						<Divider />
						<Info a="Type: " b="valval" />
						<Divider />
						<Info a="Status:" b="Normal" />
						<Divider />
						<Info a="Value: " b={params[paramRef.current] && params[paramRef.current].val} />
					</div>
					<div style={{ marginRight: '10%' }}>
						<input className={Classes.INPUT} type="text" placeholder="New Value" dir="auto" />
					</div>
				</Callout>
			</Drawer> */}
    </React.Fragment>
  );
};

const Info = ({ a, b }) => (
  <div style={{ display: "flex" }}>
    <H5 style={{ color: Colors.GRAY2, marginLeft: "2px", marginTop: "5px" }}>
      {a}
    </H5>
    <H5 style={{ marginTop: "5px" }}>{b}</H5>
  </div>
);

type ItemProps = {
  param: { name: string; val: string };
  onClick: any;
  showDetails: boolean;
  hideDetails: Function;
  isOdd: boolean;
};
const Item: React.FC<ItemProps> = ({
  param,
  onClick,
  showDetails,
  hideDetails,
  isOdd
}) => {
  const [ref, isHovered]: any = useHover();
  return (
    <div
      key={name}
      ref={ref}
      onClick={() => {
        !showDetails && onClick(param);
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: `${
          isHovered
            ? "#00e3e3"
            : isOdd
            ? Colors.LIGHT_GRAY4
            : Colors.LIGHT_GRAY1
        }`,
        borderBottom: "1px"
      }}
    >
      {showDetails ? (
        <React.Fragment>
          <H5 style={{ marginLeft: "1rem", marginTop: "5px" }}>{param.name}</H5>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Info a="Value: " b={param.val} />
            <Divider />
            <Info a="Type: " b="Enum" />
            <Divider />
            <Info a="Status:" b="Normal" />
            <InputGroup
              style={{
                marginLeft: "5px",
                marginTop: "2px",
                backgroundColor: Colors.LIGHT_GRAY4
              }}
              placeholder="New value"
              rightElement={<Button minimal text="SET" />}
            />
            <Button
              icon={IconNames.CROSS}
              minimal
              small
              onClick={() => hideDetails()}
              style={{ marginLeft: "2px", outline: "none" }}
            />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <H5 style={{ marginLeft: "1rem", marginTop: "5px" }}>{param.name}</H5>
          <div style={{ display: "flex" }}>
            <H5 style={{ marginRight: "1rem", marginTop: "5px" }}>
              {param.val}
            </H5>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const Content = () => (
  <Callout
    style={{
      display: "flex",
      alignItems: "baseline",
      alignContent: "center",
      height: "100%",
      justifyContent: "space-between"
    }}
  >
    <div style={{ display: "flex", marginLeft: "10%" }}>
      <Info a="Path: " b={"PATHOO"} />
      <Divider />
      <Info a="Type: " b="valval" />
      <Divider />
      <Info a="Status:" b="Normal" />
      <Divider />
      <Info a="Value: " b="VALVALLVA" />
    </div>
    <div>
      <input
        className={Classes.INPUT}
        type="text"
        placeholder="New Value"
        dir="auto"
      />
    </div>
  </Callout>
);
// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
export default MonitorList;
