import { Note, Chord, ChordType } from '@tonaljs/tonal'
import { Howl } from 'howler'

const sound = new Howl({
  src: ['assets/pianosprite.mp3'],
  onload() {
    console.log('Sound file has been loaded')
    soundEngine.init()
  },
  onloadError(e, msg) {
    console.log('Error', e, msg)
  }
})

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

const startNoteSelector = document.getElementById('start-note')
const octaveSelector = document.getElementById('octave')
const buttonsPanel = document.querySelector('.buttons')
const notesInChord = document.querySelector('.notes-in-chord')
const intervalsInChord = document.querySelector('.intervals-in-chord')

let selectedStartNote = 'C'
let selectedOctave = '3'
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
    for (let i = 1; i <= 5; i++) {
      let octaveNumber = this.createElement('option', i)
      octaveSelector.appendChild(octaveNumber)
      // make starting octave 3
    }
  },

  setupButtons() {
    const chordSymbols = ChordType.symbols()
    chordSymbols.forEach(chord => {
      let chordButton = this.createElement('button', chord)
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
      this.displayAndPlayChord(selectedChord)
    })
  },

  displayAndPlayChord(selectedChord) {
    let startNoteWithOctave = selectedStartNote + selectedOctave
    let newChord = Chord.getChord(selectedChord, startNoteWithOctave)
    notesInChord.innerHTML = newChord.notes.join(' - ')

    let chordIntervals = Chord.get(selectedChord).intervals
    intervalsInChord.innerHTML = chordIntervals.join(' - ')

    soundEngine.play(newChord.notes)
  },

  createElement(elementName, content) {
    let element = document.createElement(elementName)
    element.innerHTML = content
    return element
  }
}

const soundEngine = {
  init() {
    const lengthOfNote = 2400
    let timeIndex = 0
    for (let i = 24; i <= 96; i++) {
      sound['_sprite'][i] = [timeIndex, lengthOfNote]
      timeIndex += lengthOfNote
    }
  },
  play(soundSequence) {
    const soundSequenceMidiNumbers = soundSequence.map(noteName => {
      return Note.midi(noteName)
    })
    sound.volume(0.75)

    soundSequenceMidiNumbers.forEach(noteMidiNumber => {
      console.log(Note.fromMidi(noteMidiNumber))
      sound.play(noteMidiNumber.toString())
    })
  }
}

app.init()
