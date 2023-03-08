import { FC } from "react";

import Style from "./style";

const Huge: FC<JSX.IntrinsicElements["div"]> = ({ children, style }) => {
  return <Style.Huge style={style}>{children}</Style.Huge>;
};

const Big: FC<JSX.IntrinsicElements["div"]> = ({ children, style }) => {
  return <Style.Big style={style}>{children}</Style.Big>;
};

const NormalBig: FC<JSX.IntrinsicElements["div"]> = ({ children, style }) => {
  return <Style.NormalBig style={style}>{children}</Style.NormalBig>;
};

const NormalBold: FC<JSX.IntrinsicElements["div"]> = ({ children, style }) => {
  return <Style.NormalBold style={style}>{children}</Style.NormalBold>;
};

const Normal: FC<JSX.IntrinsicElements["div"]> = ({ children, style }) => {
  return <Style.Normal style={style}>{children}</Style.Normal>;
};

const NormalTitle: FC<JSX.IntrinsicElements["div"]> = ({ children, style }) => {
  return <Style.NormalTitle style={style}>{children}</Style.NormalTitle>;
};

export default { Huge, Big, NormalBig, NormalBold, Normal, NormalTitle };
