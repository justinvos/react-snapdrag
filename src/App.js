import React, { useState } from 'react'
import './App.css'

import { Track } from 'components/Track'

export function App () {
  const [place, setPlace] = useState({ start: 2, end: 6 })
  console.log('App', place)

  return (
    <div>
      app
      <div style={styles.container}>
        <Track num={52} place={place} setPlace={setPlace} style={{ height: '54px' }} />
      </div>
    </div>
  )
}

const styles = {
  container: {
    border: 'black solid 1px',
    margin: '32px'
  }
}
