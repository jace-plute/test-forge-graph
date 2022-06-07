import api, { route } from "@forge/api";

export const fetchAllProjects = async () => {
  let totalProjects = 51;
  let startAtIndex = 0;
  let data = { values: [] };
  let allBlocksOfData = [];

  while (startAtIndex + 50 < totalProjects) {
    const res = await api
      .asUser()
      .requestJira(route`/rest/api/3/project/search?startAt=${startAtIndex}`);

    const tempData = await res.json();

    //totalProjects = tempData.total;
    verifyDataReturnStatus(tempData);

    allBlocksOfData.push(tempData.values);
    startAtIndex += 50;
  }

  allBlocksOfData.forEach((block) => {
    block.forEach((projectMapping) => {
      data.values.push(projectMapping);
    });
  });

  return data;
};

export const fetchIssuesInProject = async (projectKey) => {
  let totalIssues = 51;
  let startAtIndex = 0;
  let allBlocksOfData = [];
  let data = { issues: [] };

  while (startAtIndex + 50 < totalIssues) {
    const res = await api
      .asUser()
      .requestJira(
        route`rest/api/3/search?jql=project=${projectKey}&startAt=${startAtIndex}`
      );

    const tempData = await res.json();

    totalIssues = tempData.total;
    verifyDataReturnStatus(tempData);

    allBlocksOfData.push(tempData.values);
    startAtIndex += 50;
  }

  allBlocksOfData.forEach((block) => {
    block.issues.forEach((issue) => {
      data.issues.push(issue);
    });
  });

  return data;
};

const verifyDataReturnStatus = (data) => {
  if (data.status && data.status !== "200") {
    throw new Error(
      `An error has occured: \n\tError: ${data.error}\n\tMessage: ${data.message}`
    );
  }
};
