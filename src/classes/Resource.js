import { observable, action, computed } from 'mobx';
import * as axios from 'axios';

export class Resource {
  @observable id
  @observable title = ""
  @observable page_link = ""
  @observable description = ""
  @observable categories = []
  @observable tags = []
  @observable lm_pdf = ""
  @observable google_pdf = ""
  @observable image = ""

  constructor(id, title, link, description, categories, tags, lm_pdf, google_pdf, image) {
  	this.id = id
    this.title = title
    this.page_link = link
    this.description = description
    this.categories = categories
    this.tags = tags
    this.lm_pdf = lm_pdf
    this.google_pdf = google_pdf
    this.image = image
  }

}

export default Resource