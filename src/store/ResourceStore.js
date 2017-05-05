import { observable, computed, action, autorunAsync, autorun } from 'mobx';
import * as api from '../constants/api'
import * as axios from 'axios'

import dateFormat from 'dateformat'
import firebase from 'firebase/app'

require('firebase/database')
var config = {
  apiKey: "AIzaSyBtIbWsqzLhxjeSJ_MhDo8ee4IR-OPkn18",
  authDomain: "logicmonitor-content-portal.firebaseapp.com",
  databaseURL: "https://logicmonitor-content-portal.firebaseio.com",
  storageBucket: "",
};
firebase.initializeApp(config)

class Resource {
  @observable title = ""
  @observable page_link = ""
  @observable description = ""
  @observable categories = []
  @observable tags = []
  @observable sorts = []
  @observable lm_pdf = ""
  @observable google_pdf = ""
  @observable image = ""
  @observable created = ""
  @observable updated = ""
  @observable video_id = ""
  @observable comments = []

  _saveHandle

  constructor(store, id, title, link, description, categories, tags, lm_pdf, google_pdf, image, created, updated, video_id) {
    this.store = store
    this.id = id
    this.title = title
    this.page_link = link
    this.description = description
    this.categories = categories
    this.tags = tags
    this.lm_pdf = lm_pdf
    this.google_pdf = google_pdf
    this.image = image
    this.created = created
    this.updated = updated
    this.video_id = video_id

    // automatically store item in local storage, debounce each second
    this._saveHandle = autorunAsync(() => {
      window.localStorage.setItem(api.LOCAL_STORAGE_PREFIX + this.id, JSON.stringify(this.asJSON));
    }, 1000);
  }

  getComments = () => {
    this.commentsRef.on('value', (snapshot) => {
      if(snapshot.val()){
        this.handleCommentsData(snapshot.val())
      }else{
        this.comments.replace([])
      }
    })
  }

  handleCommentsData(data) {
    let dataAsArray = Object.keys(data).map(key => (
      {
        key:key,
        userID:data[key]['userID'],
        userName:data[key]['userName'],
        userAvatar:data[key]['userAvatar'],
        message:data[key]['message'],
        timestamp:data[key]['timestamp']
      }
    ))
    this.comments.replace(dataAsArray)
  }

  @action createRef = () => {
    this.commentsRef = this.store.database.ref('comments/' + this.id)
    this.getComments()
  }

  @action destroyRef = () => {
    this.commentsRef.off()
  }

  @action removeComment = (commentKey) => {
    this.commentsRef.child('/'+commentKey).remove()
  }

  @action addComment = (message) => {
    const newCommentKey = this.commentsRef.push().key
    let timestamp = dateFormat(new Date(),"mmm d, 'yy")
    let comment = 
      {
        key:newCommentKey,
        userID:this.store.current_user.id,
        userName:this.store.current_user.name,
        userAvatar:this.store.current_user.avatarURL,
        message:message,
        timestamp:timestamp
      }
    this.comments.push(comment)
    delete comment.key
    let updates = {}
    updates['/'+newCommentKey] = comment
    this.commentsRef.update(updates)
  }

  @computed get asJSON() {
    let mappedCategories = []
    this.categories.forEach(cat => {
      mappedCategories.push({name:cat})
    })
    return {
      id: this.id,
      title: {
        rendered: this.title 
      },
      link: this.page_link,
      date: this.created,
      modified: this.modified,
      acf: {
        description: this.description,
        drive_url: this.google_pdf,
        tags: this.tags,
        resource_category: mappedCategories,
        resource_image: {
          url: this.image
        },
        resource_file: {
          url: this.lm_pdf
        },
        resource_wistia_id: this.video_id
      }
    }
  }
}

export class ResourceStore {
  @observable current_user
  @observable resources
  @observable filter
  @observable filter_tags
  @observable favorites
  @observable tag_categories
  @observable all_tags
  @observable filter_categories
  @observable resource_categories
  @observable loading
  @observable showFavorites
  @observable reverseOrder
  @observable navTab
  @observable activeView
  @observable sortParam = {}
  update

  database = firebase.database()
  userFavoritesRef

  constructor(current_user) {
    this.current_user = current_user
    this.resources = []
    this.filter = ""
    this.filter_tags = []
    this.favorites = []
    this.tag_categories = []
    this.all_tags = []
    this.filter_categories = []
    this.resource_categories = []
    this.loading = false
    this.showFavorites = false
    this.reverseOrder = true
    this.navTab = ""
    this.activeView = "grid"
    this.sortParam = {
      key: "",
      reverse: true
    }
    this.sorts = [
      {
        name:"Date Created",
        value:"created",
        reverse:true
      },
      {
        name:"Title",
        value:"title",
        reverse:false
      }
    ]
    this.getResources()
    this.setTab()
    this.userFavoritesRef = this.database.ref('favorites/' + this.current_user.id);
    this.getFavorites()
  }

  getResources = (page = 1) => {
    console.log(page);
    let data = [],
        requestURL = api.PROD_RESOURCE_URL_PUBLIC + '&page=' + page;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key.indexOf(api.LOCAL_STORAGE_PREFIX) === 0) {
        const json = JSON.parse(window.localStorage.getItem(key));
        data.push(json);
      }
    }
    this.handleResourceData(data, 'local')
    if (data.length === 0) {
      this.loading = true
    }
    axios.get(requestURL)
         .then(response => {
            this.handleResourceData(response.data, page)
         })
         .catch(function(error){
           // Todo: tell user that we were unable to connect to WordPress, fetch from firebase?
           console.log(error)
         })
  }

  handleResourceData(data, page) {
    let tags = new Set(this.all_tags),
        tagCategories = new Set(this.tag_categories),
        allCategories = new Set(this.resource_categories),
        tagArray = [],
        videoID = ""
    // Loop through newly received resources
    console.log(data)
    data.forEach(resource => {
      let categories = resource.acf.resource_category,
          resourceTags = resource.acf.tags,
          fileURL = resource.acf.resource_file.url
      if (resource.acf.resource_wistia_id) {
        videoID = resource.acf.resource_wistia_id
        fileURL = "https://logicmonitor.wistia.com/medias/"+videoID
      }
      // Populate resource tags
      if ( Array.isArray(resourceTags) ) {
        resourceTags.forEach( el => {
          tagArray = el.split('+')
          if (this.filter_tags.indexOf(el) === -1) tags.add(el)
          tagCategories.add(tagArray[1])
        })
      }else{
        resourceTags = []
      }
      // Populate resource categories
      if ( Array.isArray(categories) && categories[0]["name"] !== "" ) {
        categories = categories.map(cat => cat.name)
        categories.forEach(cat => { if(cat !== "MSP" && this.filter_categories.indexOf(cat) === -1){ allCategories.add(cat) } })
        this.resource_categories.replace(Array.from(allCategories).sort())
      }else{
        categories = [""]
      }
      if (this.resources.find(localResource => resource.id === localResource.id)) {
        let index = this.resources.indexOf(this.resources.find(item => resource.id === item.id))
        if(this.resources.remove(this.resources[index])){
          this.resources.push(new Resource(
            this,
            resource.id,
            resource.title.rendered,
            resource.link,
            resource.acf.description,
            categories,
            resourceTags,
            fileURL,
            resource.acf.drive_url,
            resource.acf.resource_image.url,
            resource.date,
            resource.modified,
            videoID)
          )
        }
      }else{
        this.resources.push(new Resource(
          this,
          resource.id,
          resource.title.rendered,
          resource.link,
          resource.acf.description,
          categories,
          resourceTags,
          resource.acf.resource_file.url,
          resource.acf.drive_url,
          resource.acf.resource_image.url,
          resource.date,
          resource.modified,
          videoID)
        )
      }
      videoID = ""
    })
    this.sortResourcesByParam('title', false)
    this.sortParam.key === "title" ? this.sortParam.key = "" : null
    this.all_tags.replace(Array.from(tags).sort())
    this.tag_categories.replace(Array.from(tagCategories).sort())
    if (data.length === 100 && page !== 'local') {
      page = page + 1;
      this.getResources(page);
    }else{
      this.loading = false
    }
  }

  getFavorites = () => {
    this.userFavoritesRef.on('value', (snapshot) => {
      if(snapshot.val()){
        this.handleFavoritesData(snapshot.val())
      }else{
        this.favorites.replace([])
      }
    })
  }

  handleFavoritesData(data) {
    let dataAsArray = Object.keys(data).map(key => (
      {key:key,id:data[key]}
    ))
    this.favorites.replace(dataAsArray)
  }

  @action removeFromFavorites = (resourceID, e) => {
    e.preventDefault()
    let favorite = this.favorites.filter((fave) => (
      fave.id === resourceID
    ))
    this.userFavoritesRef.child(favorite[0].key).remove()
  }

  @action addToFavorites = (resourceID, e) => {
    e.preventDefault()
    const newPostKey = this.userFavoritesRef.push().key
    this.favorites.push({key:newPostKey,id:resourceID})
    let updates = {}
    updates['/'+newPostKey] = resourceID
    this.userFavoritesRef.update(updates)
  }

  @action toggleFavorites = () => {
    this.showFavorites = !this.showFavorites
  }

  @action toggleActiveView = () => {
    this.activeView === "grid" ? this.activeView = "table" : this.activeView = "grid"
  }

  @action setTab = (tab) => {
    if (tab || tab === "") {
      this.navTab = tab
    }else{
      const url = window.location.href
      let name = "tab".replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      this.navTab = decodeURIComponent(results[2].replace(/\+/g, " "))
    }
    // Update Categories based on Navigation Tab selected
    switch (this.navTab) {
      case "":
        this.clearFilters()
        break
      case "sales-enablement":
        this.clearFilters()
        this.swapTagList("Sales Enablement+Category", true)
        break          
      case "technology-datasheets":
        this.clearFilters()
        this.swapTagList("Technology+Category", true)
        break
      case "case-studies":
        this.clearFilters()
        this.swapCategoryList("Case study", true)
        break
      case "internal":
        this.clearFilters()
        this.swapTagList("Internal+Category", true)
        break
    }
  }

  clearFilters = () => {
    if (this.filter_categories.length > 0) {
      this.resource_categories.push(this.filter_categories[0])
      this.filter_categories.remove(this.filter_categories[0])
    }
    if (this.filter_tags.length > 0) {
      this.filter_tags.forEach((tag,i) => {
        this.all_tags.push(tag)
      })
      this.filter_tags.replace([])
    }
  }

  @action swapTagList = (tag, isTab) => {
    if (isTab === true) {
      if (this.filter_tags.length > 0) {
        this.filter_tags.filter(fTag => (
          fTag !== tag
        )).forEach(fTag => {
          this.filter_tags.remove(fTag)
          this.all_tags.push(fTag)
        })
      }
      if (this.filter_tags.indexOf(tag) === -1) {
        this.filter_tags.push(tag)
        this.all_tags.remove(tag)
      }
      return
    }else{
      if (this.all_tags.remove(tag)) {
        this.filter_tags.push(tag)
      }else{
        this.filter_tags.remove(tag)
        this.all_tags.push(tag)
      }
    }
  }

  @action swapCategoryList = (cat, isTab) => {
    if (isTab === true && this.filter_categories.indexOf(cat) !== -1) {
      return
    }
    if (this.resource_categories.remove(cat) && this.filter_categories.length === 0) {
      this.filter_categories.push(cat)
    }else if(this.filter_categories.remove(cat)){
      this.resource_categories.push(cat)
    }else{
      let removeCat = this.filter_categories[0]
      this.resource_categories.push(removeCat)
      this.filter_categories.replace([cat])
    }
  }  

  @action sortResourcesByParam(key, reverseOrder) {
    if (key !== this.sortParam["key"]) {
      this.reverseOrder = reverseOrder
    }else{
      this.reverseOrder = !this.reverseOrder
    }
    this.resources.replace(this.resources.sort( (a, b) => {
      if(this.reverseOrder){
        return +(a[key] < b[key]) || +(a[key] === b[key]) - 1;
      }else{
        return +(a[key] > b[key]) || +(a[key] === b[key]) - 1;
      }
    }));
    this.sortParam["key"] = key
    this.sortParam["reverse"] = this.reverseOrder
  }

  @computed get filteredResources() {
    var matchesFavoritesFilter = (resourceID) => {
      if (!this.showFavorites) {
        return true
      }else{
        let inFilter = this.favorites.filter(fave => (
          fave.id === resourceID
        ))
        let result = inFilter.length === 1 ? true : false
        return result
      }
    }
    var matchesCategoryFilter = (resource) => {
      if (this.filter_categories.length === 0) {
        return true
      }else{
        let resourceCats = new Set(resource.categories)        
        let inFilter = this.filter_categories
          .filter(cat => resourceCats.has(cat))
        let result = inFilter.length === 1 ? true : false
        return result
      }
    }

    var matchesTagFilter = (resource) => {
      if (this.filter_tags.length === 0) {
        return true
      }else{
        let resourceTags = new Set(resource.tags)
        let inFilter = this.filter_tags.filter(tag => resourceTags.has(tag))
        let result = inFilter.length === this.filter_tags.length ? true : false
        return result
      }
    }

    var matchesTextFilter = new RegExp(this.filter, "i")

    return this.resources.filter( (resource) => (
      (!this.filter || 
      matchesTextFilter.test(resource.title) || 
      matchesTextFilter.test(resource.description)) &&
      matchesTagFilter(resource) &&
      matchesCategoryFilter(resource) &&
      matchesFavoritesFilter(resource.id)
     )
    )
  }

}
