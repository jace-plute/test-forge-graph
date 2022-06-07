import Resolver from "@forge/resolver";
import api, { route } from "@forge/api";

const resolver = new Resolver();

resolver.define("getText", (req) => {
  console.log(req);

  return "Hello world!";
});

resolver.define("fetchWorkflowSchemesByProject", async (req) => {
    console.log('does this work');
  const res = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/workflowscheme/project?projectId=10005`
    );

console.log(JSON.stringify(res));

  const data = await res.json();
  console.log(data);
  return data;
});

export const handler = resolver.getDefinitions();
