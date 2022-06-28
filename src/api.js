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
  if(!projectKey) {
    projectKey = "JAM";
  }
  console.log("proj: " + projectKey);
  
  let totalIssues = 51;
  let startAtIndex = 0;
  let allBlocksOfData = [];
  let data = { issues: [] };
  let today = getDate();
  console.log("today: " + today);
  while (startAtIndex + 50 < totalIssues) {
    const res = await api
      .asUser()
      .requestJira(
        route`rest/api/3/search?jql=project=${projectKey}&startAt=${startAtIndex}`);
        //%20AND%20resolved
        //%20%3E=%20startOfDay(-120)
        //%20AND%20status=DONE
        //%20ORDER%20BY%20sprint
        
      
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

export const getDate = () => {
  let today = Date.now();
  //let dd = String(today.getDate()).padStart(2, '0');
  //let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //let yyyy = today.getFullYear();
  return "2022-04-01";
  //return yyyy + "-" + mm + "-" + dd;
}
