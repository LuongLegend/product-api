const returnSuccess = (data) => {
  return {
    code: 200,
    data,
  };
};

const returnError = (errCode = 500, msg = "something wrong") => {
  return {
    code: errCode,
    msg,
  };
};

module.exports = {
  returnSuccess,
  returnError,
};
