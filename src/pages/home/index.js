import T from '../../components/T'

import withViewer from '../../data/query/viewer'

export default withViewer(({ viewer }) =>
  <div>
    <T m="Welcome {name}" values={{ name: viewer && viewer.name }} />
  </div>
)
