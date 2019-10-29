import React, { useEffect, useReducer, useRef } from 'react'

export function Track ({ place: initialPlace, setPlace, num, style, ...props }) {
  const initialState = { last: initialPlace, origin: null, place: initialPlace }

  const [{ last, origin, place }, dispatch] = useReducer(reducer, initialState)

  const ref = useRef(null)

  const handleMouseMove = (event) => {
    const delta = event.clientX - origin
    console.log('delta', delta)

    const width = ref.current.offsetWidth
    console.log('width', width)
    const ratio = delta / width
    const deltaPlace = Math.round(ratio * num)
    console.log('deltaPlace', deltaPlace)
    // const place = { start: last.start + deltaPlace, end: last.end + deltaPlace }
    dispatch({ type: 'mouse_move', payload: deltaPlace })
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    console.log('up', place) // { 9, 13}
    dispatch({ type: 'mouse_up', payload: place })
    // setPlace(place)
  }

  const handleMouseDown = (event) => {
    console.log('setting origin', event.clientX)
    dispatch({ type: 'set_origin', payload: event.clientX })
  }

  useEffect(() => {
    if (origin != null) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }, [origin])

  const styles = makeStyles(num, place, last, style)

  return (
    <div style={styles.track} ref={ref} {...props}>
      <div style={styles.feature} onMouseDown={handleMouseDown}>One</div>
      <div style={styles.last}>One</div>
    </div>
  )
}

function reducer (state, { type, payload }) {
  console.log('type', type)
  switch (type) {
    case 'set_origin':
      return { ...state, origin: payload }
    case 'mouse_up':
      return { ...state, last: payload, origin: null }
    case 'mouse_move':
      const { last } = state
      const place = { start: last.start + payload, end: last.end + payload }
      return { ...state, place }
    default:
      throw new Error()
  }
}

const makeStyles = (num, place, last, style) => ({
  track: {
    display: 'grid',
    gridTemplateColumns: `repeat(${num}, 1fr)`,
    ...style
  },
  feature: {
    alignItems: 'center',
    backgroundColor: 'olive',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    gridColumn: `${place.start} / ${place.end}`,
    gridRow: '1 / 2',
  },
  last: {
    alignItems: 'center',
    backgroundColor: 'olive',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    gridColumn: `${last.start} / ${last.end}`,
    gridRow: '1 / 2',
    opacity: 0.25,
    zIndex: -1
  }
})
