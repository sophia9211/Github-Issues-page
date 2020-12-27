// 상수들을 사용할 경우 아래를 상단에 import 해주세요.
// import * as constants from 'constants.js';

// 백엔드 주소 앞부분은 전부 `${constants.URL_BACK}` 으로 통일해주시면 됩니다!!
// 이렇게 설정한 후 constants.js 상에서의 주소를 변경해주면 자동으로 모든 곳에서 변경됩니다.

export const URL_BACK =
  (process.env.REACT_APP_ENV === 'sy' && 'https://api.github.com')

export const URL_FRONT =
  (process.env.REACT_APP_ENV === 'sy' && 'localhost') ||


// breakpoint 변수입니다. js 파일에서 직접 windowSize 를 받아와 미디어쿼리를 적용하는 경우
// constants.BREAK_PC 와 같은 형식으로 끌어다 사용하면 됩니다.

export const BREAK_PC_L = 1200;
export const BREAK_PC_M = 1046;
export const BREAK_PC_S = 992;

export const TOKENKEY = "ACTK";
