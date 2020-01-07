import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-course-burger-buil-2ff90.firebaseio.com/'
})

export default instance