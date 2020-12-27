/**
 * API Request 시 에러 핸들링 및 토큰 Refresh를 위한 Wrapper Class입니다.
 */

import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

import * as constants from "constants.js";
import swal from "sweetalert";
import { TAPITable, IAPIData, APIResult } from "Types/api";

export default class Request {
  /**
   * API Timeout 시간을 디폴트 1분(60초)으로 해놓자.
   * App.tsx 에서 앱 최초 시작 시에 서버에 저장된 timeout 값을 받아와 바꿔준다.
   */
  static timeout = 60000;

  /**
   * API timeout 시간을 설정한다.
   * @params timeout timeout 시간
   */
  static setAPITimeout = (timeout: number) => {
    Request.timeout = timeout;
  };

  /**
   * Request 수행 시 사용하는 함수
   * @param request 요청을 보낼 method, URL Tuple
   * @param isAuth 인증이 필요한 API일 경우에는 true로 설정한다. true로 설정 시, Header에 토큰 추가.
   * @param data POST 요청 시 보낼 Parameters - JSON Object
   * @param isArrayBuffer Get요청을 할때 파일 요청을 할 경우 response Type을 arraybuffer로 설정함.
   */

  static run(request: TAPITable, isAuth: boolean, data: IAPIData, isArrayBuffer?: boolean) {
    const config = Request.configGenerator(request, data, isArrayBuffer);
    const req = axios.create();

    return new Promise((resolve, reject) => {
      req
        .request(config)
        .then((response) => {
          console.log("Response ==> ", response);

          // Status를 체크해 정상 요청일 경우 값을 반환한다.
          if (response.status >= 200 && response.status < 300) {
            const result: APIResult = {
              status: response.status,
              data: response.data,
            };

            // ArrayBuffer로 받았을 경우에는 헤더에 포함된 content type도 받아온다. base64 인코딩 한 뒤 값을 받아오기 위함
            if (isArrayBuffer) {
              result.contentType = response.headers["content-type"] || "";
            }

            resolve(result);
          } else {
            // 300 이상 시 에러로 간주
            // Error 발생 시 Response를 파싱해 Status code와 상세 에러 메시지가 들어간 정보를 반환함.
            // 상세메시지는 개발 시 디버깅 용도로만 사용하자. User에게 상세한 메시지 제공이 필요없음.
            const status = response.status;
            const error = {
              status: status,
              errors: response.data,
            };

            reject(error);
          }
        })
        .catch((err) => {
          console.log("axios error");
          console.log(err.response);
          reject(err);
        });
    });
  }

  private static configGenerator(request: TAPITable, data: IAPIData, isArrayBuffer?: boolean): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      method: request.method,
      url: request.url,
    };

    // Get일 경우에는 params로
    if (request.method.toLowerCase() === "get") {
      if (data) config.params = data;
    } else {
      // 나머지 요청은 data로
      if (data) config.data = JSON.stringify(data);
    }

    // Get요청을 할때 파일 요청을 할 경우 response Type을 arraybuffer로 설정함.
    if (isArrayBuffer) {
      config.responseType = "arraybuffer";
    }

    return config;
  }

  /**
   * Json object를 받아 QueryString으로 만듦
   * @param json QueryString으로 바꿀 json Object
   */
  static jsonToQueryString(json: any) {
    return (
      "?" +
      Object.keys(json)
        .map((key) => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
        })
        .join("&")
    );
  }

  static queryToObject(str: string) {
    const params: any = {};
    const keyValPairs = str.split("?")[1] && str.split("?")[1].split("&");

    if (keyValPairs !== undefined) {
      for (let i = 0; i < keyValPairs.length; i++) {
        params[keyValPairs[i].split("=")[0]] = decodeURI(keyValPairs[i].split("=")[1]);
      }
    }
    return params;
  }
}
