import Resolver from "@forge/resolver";
import * as apiUtil from "./api.js";

const resolver = new Resolver();

resolver.define("getText", (req) => {
  console.log(req);

  return "Hello world!";
});

resolver.define("getAllProjects", async (req) => {
  console.log("start " + data);
  const projectData = await apiUtil.fetchAllProjects();
  console.log("end");

  return projectData;
});

resolver.define("getAllIssuesInProject", async (req) => {
  const issues = await apiUtil.fetchIssuesInProject(req.projectKey);

  return issues;
});

export const handler = resolver.getDefinitions();
