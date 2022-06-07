import Resolver from "@forge/resolver";
import * as apiUtil from "./api.js";

const resolver = new Resolver();

resolver.define("getText", (req) => {
  console.log(req);

  return "Hello world!";
});

resolver.define("getAllProjects", async (req) => {
  const projectData = await apiUtil.fetchAllProjects();

  return projectData;
});

resolver.define("getAllIssuesInProject", async (req) => {
  const issues = await apiUtil.fetchIssuesInProject(req.projectKey);

  return issues;
});

export const handler = resolver.getDefinitions();
