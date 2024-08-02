import { PropsWithChildren } from "react";

export interface IReactFC<T = {}>
  extends React.FC<T & { children?: React.ReactNode }> {}
export interface IReactFCNoChildren<T = {}> extends React.FC<T> {}
export type IPropsWithChildren = PropsWithChildren;
