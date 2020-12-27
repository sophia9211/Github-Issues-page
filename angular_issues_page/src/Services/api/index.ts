import APITable from "./apiTable";
import Request from "./request";
import { IAPIData } from "Types/api";

export const getIssues = () => {
  return Request.run(APITable.getIssues(), false, null);
};

/*
사용방법
import * as API from "Services/api";

API.getIssues()
.then((res: any) => {
})
.catch((err) => {
})
.finally(() => {});
*/
