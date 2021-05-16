import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faCogs,
  faEuroSign,
  faFont,
  faHome,
  faImages,
  faPaperPlane,
  faPhotoVideo,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faHome,
  faTwitter,
  faInstagram,
  faChevronLeft,
  faChevronRight,
  faBars,
  faUser,
  faHome,
  faFont,
  faPhotoVideo,
  faPaperPlane,
  faEuroSign,
  faTrophy,
  faCalendar,
  faImages,
  faCogs
)

export { FontAwesomeIcon }
