
const aday_len = 24*3.6e3*1e3;

let period_days = (days) => {
  let cursor = new Date();
  let ds = [cursor.getTime()];
  while(ds.length<days) {
    let t = cursor.getTime();
  
    ds.push(t);
    cursor.setTime(t - aday_len);
  }
  return ds.reverse();
}

let period_aggregation = (days, stepsize) => {
  let ds = period_days(days);
  let total = 0;
  return ds.map((d)=>{
    let v = Math.round(Math.random()) *stepsize;
    // let ret = {x: d, y:total+v}
    let ret = [d, total+v];
    total += v;
    return ret;
  });
}
const segways = ['A','B','C','D','E','F'].map((s)=>`seg${s}`);
let dummy_heats = (segs, stepsize) => {
  let ret = segs.map(()=>Math.round(Math.random()*stepsize*100)/100);
  return ret;
}

export default {
  dashboard: {
    topBars: [
      {name: '기간', data: [45,]},
      {name: '예산', data: [33.9,]},
      {name: '달성', data: [87.5,]}
    ],
    mediaArea: [
      {name: 'Facebook', data: period_aggregation(30, 5)},
      {name: 'Naver', data: period_aggregation(30, 3)},
      {name: 'Criteo', data: period_aggregation(30, 2)},
      {name: 'Youtube', data: period_aggregation(30, 4)},
    ],
    pfHits: [
      {name: 'Facebook', data: dummy_heats(segways, 50)},
      {name: 'Naver', data: dummy_heats(segways, 30)},
      {name: 'Criteo', data: dummy_heats(segways, 20)},
      {name: 'Youtube', data: dummy_heats(segways, 40)},
    ]
  }
}
