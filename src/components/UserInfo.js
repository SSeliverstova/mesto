export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector}) {
    this._infoName = document.querySelector(nameSelector);
    this._infoAbout = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._infoName.textContent,
      about: this._infoAbout.textContent,
      avatar: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._infoName.textContent = userInfo.name;
    this._infoAbout.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }
}
