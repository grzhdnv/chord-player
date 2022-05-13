import { Chord, ChordType } from '@tonaljs/tonal'

const startNotes = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B'
]

// console.log(Chord.getChord('o7M7', 'F4'))

const startNoteSelector = document.getElementById('start-note')
const octaveSelector = document.getElementById('octave')
const buttonsPanel = document.querySelector('.buttons')
const notesInChord = document.querySelector('.notes-in-chord')
const intervalsInChord = document.querySelector('.intervals-in-chord')

let selectedStartNote = 'C'
let selectedOctave = '1'
let selectedChord

const app = {
  init() {
    this.setupStartNotes()
    this.setupOctaves()
    this.setupButtons()
    this.setupEventListeners()
  },

  setupStartNotes() {
    startNotes.forEach(note => {
      let option = this.createElement('option', note)
      startNoteSelector.appendChild(option)
    })
  },

  setupOctaves() {
    for (let i = 1; i <= 7; i++) {
      let octaveNumber = this.createElement('option', i)
      octaveSelector.appendChild(octaveNumber)
    }
  },

  setupButtons() {
    const chordSymbols = ChordType.symbols()
    chordSymbols.forEach(chord => {
      let chordButton = this.createElement('button', chord)
      // chordButton.setAttribute('value', chord)
      buttonsPanel.appendChild(chordButton)
    })
  },

  setupEventListeners() {
    startNoteSelector.addEventListener('change', e => {
      selectedStartNote = e.target.value
      console.log(selectedStartNote)
    })
    octaveSelector.addEventListener('change', e => {
      selectedOctave = e.target.value
      console.log(selectedOctave)
    })
    buttonsPanel.addEventListener('click', e => {
      if (e.target.classList.contains('buttons')) return
      selectedChord = e.target.innerText
      this.displayChordInfo(selectedChord)
    })
  },

  displayChordInfo(selectedChord) {
    let startNoteWithOctave = selectedStartNote + selectedOctave
    let newChord = Chord.getChord(selectedChord, startNoteWithOctave)
    notesInChord.innerHTML = newChord.notes.join(' - ')

    let chordIntervals = Chord.get(selectedChord).intervals
    intervalsInChord.innerHTML = chordIntervals.join(' - ')
  },

  createElement(elementName, content) {
    let element = document.createElement(elementName)
    element.innerHTML = content
    return element
  }
}

app.init()

/* console.log(ChordType.names())
console.log(ChordType.symbols())
console.log(ChordType.all())
 */
