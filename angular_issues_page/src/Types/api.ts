/* eslint-disable camelcase */
import { Method } from "axios";

/**
 * API Table에서 사용할 Type 정의
 */
export type TAPITable = {
  method: Method;
  url: string;
};

/**
 * API 결과값을 보내줄 Data type
 */
export type APIResult = {
  status: number;
  data: any;
  contentType?: string;
};

/**
 * API 호출에 필요한 파라미터 Interface로 정의
 */

/**
 * Request 시 Type Check를 위해 비어있는 인터페이스를 정의한 뒤
 * API요청에 필요한 Request들을 IAPIData를 상속받아 인터페이스 정의함.
 */
export interface IAPIData {}
