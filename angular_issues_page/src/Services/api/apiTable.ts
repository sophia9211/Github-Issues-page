/**
 * API 명세 정보
 * Documents:
 *
 */
import { TAPITable } from "Types/api";
import * as constants from "constants.js";

const apiTable = {
  /*
   * 이슈 받아오기
   * POST /api/users
   */
  getIssues: (): TAPITable => {
    return {
      method: "GET",
      url: `${constants.URL_BACK}/issues`,
    };
  },
};

export { apiTable as default };
