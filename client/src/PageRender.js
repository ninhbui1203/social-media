import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./components/NotFound";

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

function PageRender(props) {
  const { page, id } = useParams();

  let pageName = page;

  if (id) {
    pageName += `/[id]`;
  }

  return generatePage(pageName);
}

export default PageRender;
