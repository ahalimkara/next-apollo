import withViewer from '../../data/query/viewer'

export default withViewer(({ viewer }) =>
  <div>Welcome &quot;{viewer && viewer.name}&quot;</div>)
