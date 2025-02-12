import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo/DivisionGroupsDemo")
);

export default DivisionGroupsDemo;
