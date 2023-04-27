import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  header: String;
  msg: String;
}
const Headers = ({ header, msg }: Props) => {
  return (<><h3>{header}</h3> <p>{msg}</p></>);
};
export default Headers;
