class validationHelper {
  static isLetter(value) {
    let isLetterRegx =
      /^[A-Za-z\'\s\.\,\-\!\@\#\$\%\^\&\*\(\)\[\]\{\}\:\;\"\<\>\?\/\+\=\_\\\|`\~]+$/;
    return isLetterRegx.test(value);
  }

  static isEmail(value) {
    let emailRegx = /\S+@\S+\.\S+/;
    return emailRegx.test(value);
  }

  static isMobile(value) {
    let mobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
    return mobileRegx.test(value);
  }

  static isNumber(value) {
    let onlyNumberRegx = /^\d+(\.\d+)?$/;
    return onlyNumberRegx.test(value);
  }

  static isNull(value) {
    return value == null;
  }

  static isEmpty(value) {
    return value.length === 0;
  }
}

export default validationHelper;
