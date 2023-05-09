import { coordinateData } from './coordinate-data'

// 把服务器的数据传递进来
export function convertData(data: any) {
  const res = []
  // 遍历一下
  for (let i = 0; i < data.length; i++) {
    // 拿到每个数据的name 根据name去取到该城市所在的经纬度
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  console.log(res)
  return res
}
