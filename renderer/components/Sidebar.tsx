import React, { useState } from "react";
import {
  Menu,
  Classes,
  MenuItem,
  Icon,
  Card,
  Button,
  Colors,
  ButtonGroup
} from "@blueprintjs/core";
import { IconNames, IconName } from "@blueprintjs/icons";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div
      style={{
        height: "100%",
        // justifyContent: "center",
        backgroundColor: `${Colors.LIGHT_GRAY2}`
      }}
    >
      <ButtonGroup vertical style={{ width: "100%" }}>
        <Item page="/home" icon={IconNames.HOME} />
        <Item page="/selection" icon={IconNames.SMALL_TICK} />
        <Item page="/monitor" icon={IconNames.EYE_OPEN} />
      </ButtonGroup>
    </div>
  );
};

const Item = ({ page, icon }) => (
  <Link href={page}>
    <Button fill>
      <Icon icon={icon} />
    </Button>
  </Link>
);
