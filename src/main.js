import count from './js/count';
import './css/index.css'
import './css/index.less'
import './css/index.scss'
import './css/index.sass'
import './css/index.styl'
import './css/iconfont.css'


document.getElementById('a').addEventListener('click', () => {
  import(/* webpackChunkName: 'sum' */'./js/sum').then(res => {
    console.log(res.default(1,2,3));
  })
})
console.log(count(1, 3));
// console.log(sum(2, 6, 7));
