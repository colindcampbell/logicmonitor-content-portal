import { observable, computed, action } from 'mobx'
import * as api from '../constants/api'
import * as axios from 'axios'

class CurrentUserStore {
  @observable id = ""
  @observable name = "User"
  @observable avatarURL = require("../assets/default_user.png")

  constructor() {
    this.id = this.getUserID()
  	this.getCurrentUser(this.id)
  }

  @action getCurrentUser() {
    let userID = document.getElementById('current-user')
    if (userID) {
      userID = userID.innerHTML
      axios.get(api.CURRENT_USER_URL + userID)
           .then(response => {
              this.handleCurrentUserResponse(response.data)
           })
           .catch(function(error){
             console.log(error)
           })
    }else{
      this.id = 0
    }
  }

  @action handleCurrentUserResponse(data) {
    this.id = data.id
    this.name = data.name
    this.avatarURL = data.avatar_urls['48']
  }

  getUserID() {
    let curUserID = document.getElementById('current-user')
    if (curUserID) {
      curUserID = document.getElementById('current-user').innerHTML
    }else{
      return ""
    }
    return curUserID
  }

}

export default new CurrentUserStore