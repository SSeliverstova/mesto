export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._infoName = document.querySelector(nameSelector);
    this._infoAbout = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name : this._infoName.textContent,
      about : this._infoAbout.textContent
    }
    console.log(userInfo.name);
    console.log(userInfo.about);
    return userInfo;
    
  }

  setUserInfo(userInfo) {
    this._infoName.textContent = userInfo.name;
    this._infoAbout.textContent = userInfo.description;
  }
  
}