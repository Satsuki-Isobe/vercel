exports.CMS = async (req, res) => {
  const url = "https://jam-news.microcms.io/api/v1/news"
  const params = { headers: { "X-MICROCMS-API-KEY": process.env.API_KEY}}
  const data = await fetch(url, params).then(res => res.json())
  return data
}