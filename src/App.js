import React from "react"
import { Grid, Segment, Divider } from "semantic-ui-react"

const App = () => (
  <Grid columns={3} relaxed>
    <Grid.Row>
      <Grid.Column>
        <Segment basic>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        </Segment>
      </Grid.Column>
      <Divider vertical>Or</Divider>
      <Grid.Column>
        <Segment basic>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        </Segment>
      </Grid.Column>
      <Divider vertical>Or</Divider>
      <Grid.Column>
        <Segment basic>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default App
