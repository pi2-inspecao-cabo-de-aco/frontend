export function currentAnalysis (state) {
  return state.currentAnalysis
}

export function position (state) {
  let position = {
    start: (state.currentAnalysis || {}).position_start,
    end: (state.currentAnalysis || {}).position_end
  }
  return position
}

export function cable (state) {
  return (state.currentAnalysis || { cable: {} }).cable
}
