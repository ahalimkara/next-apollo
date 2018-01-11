import Router from 'next/router'

export default (target, { res } = {}) => {
  if (res) {
    res.writeHead(301, { Location: target })
    res.end()
    res.finished = true
  } else {
    Router.replace(target)
  }
}