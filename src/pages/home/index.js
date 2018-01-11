import withViewer from '../../data/query/viewer'

export default withViewer(({ viewer }) =>
  <div>Welcome "{viewer && viewer.name}"</div>
)