import swal from "sweetalert";

export const decodeToken = (token) => {
  try {
    if (!token) return;

    const currentTime = new Date().getTime() / 1000;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    const jwt = JSON.parse(jsonPayload);

    if (currentTime > jwt.exp) {
      return false;
    } else {
      return jwt;
    }
  } catch (err) {
    console.log(err);
  }
};

export const errFliter = (err, handleing) => {
  if (!err.response || !err.response.data || !err.response.data.errors) {
    return;
  }
  const errors = err.response.data.errors;

  if (Array.isArray(handleing)) {
    handleing.forEach((el) => {
      if (errors && Array.isArray(errors)) {
        errors.forEach((errorObj) => {
          if (errorObj.field === el.field && errorObj.message === el.message) {
            el.errFc();
          }
        });
      }
    });
  }

  if (errors && Array.isArray(errors)) {
    errors.forEach((errorObj) => {
      if (errorObj.field === handleing.field && errorObj.message === handleing.message) {
        handleing.errFc();
      }
    });
  }
};

export const warningAlert = (massage) => {
  swal({
    text: massage,
    icon: "warning",
    buttons: {
      cancel: false,
      confirm: true,
    },
  });
};

// querystring에 있는 문자열을 객체화해서 반환해주는 함수

export const getParams = (str: string) => {
  const params = {};
  const keyValPairs = str.split("?")[1] && str.split("?")[1].split("&");

  if (keyValPairs !== undefined) {
    for (let i = 0; i < keyValPairs.length; i++) {
      params[keyValPairs[i].split("=")[0]] = decodeURI(keyValPairs[i].split("=")[1]);
    }
  }
  return params;
};

// querystring에 넣고 싶은 정보를 객체 형식으로 만들어 넣어주면
// 완성된 querystring 형식을 반환해주는 함수입니다.

export const objectToQuerystring = (obj: any) => {
  return Object.keys(obj).reduce((str, key, i) => {
    const delimiter = i === 0 ? "?" : "&";
    key = encodeURIComponent(key);
    const val = encodeURIComponent(obj[key]);
    return [str, delimiter, key, "=", val].join("");
  }, "");
};

/*
이렇게 사용하시면 됩니다 예제 !!!
const errHandling = {
  field: "detail",
  message: "Authentication credentials were not provided.",
  errFc: () => {
    swal({
      text: "토큰이 존재하지 않습니다.",
      icon: "warning",
      buttons: {
        cancel: false,
        confirm: true,
      },
    });

  },
};

errFliter(err, errHandling);
 */
