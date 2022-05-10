import React from 'react'

import { Col as ColImported, Row as RolImported } from 'react-grid-system'

interface ColFixed extends React.Component {}
interface RowFixed extends React.Component {}

interface ColProps {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  style: any
}

// const Col = React.createClass<ColProps, any>({
//   render: function() {
//     return <ColImported>Hello {this.props.name}</ColImported>;
//   }
// });

// export function Col ({xl, sm, md, style}: any)  {
//     return<ColImported />
// };

// type ColProp = {
//   sm?: number
//   md
//   lg
//   xl
// }

export const Row = RolImported as any as {
  new (): RowFixed
}
