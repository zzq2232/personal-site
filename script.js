// ── Typing animation in hero ──────────────────────────────────────────────
const phrases = [
  'reliable platforms.',
  'resilient infrastructure.',
  'better developer experiences.',
  'observable systems.',
  'zero-downtime deploys.',
]

const el = document.getElementById('typed-text')
let phraseIndex = 0
let charIndex = 0
let deleting = false
const TYPING_SPEED = 80
const DELETE_SPEED = 40
const PAUSE = 2000

function type() {
  const current = phrases[phraseIndex]

  if (!deleting) {
    el.textContent = current.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      deleting = true
      setTimeout(type, PAUSE)
      return
    }
  } else {
    el.textContent = current.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      deleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
    }
  }

  setTimeout(type, deleting ? DELETE_SPEED : TYPING_SPEED)
}

type()

// ── Rakuten tenure live timer ──────────────────────────────────────────────
;(function () {
  // 2022-11-23 09:00:00 JST (UTC+9)
  const START = new Date('2022-11-23T09:00:00+09:00').getTime()

  const els = {
    years: document.getElementById('t-years'),
    days:  document.getElementById('t-days'),
    hours: document.getElementById('t-hours'),
    mins:  document.getElementById('t-mins'),
    secs:  document.getElementById('t-secs'),
  }

  function pad(n, w) { return String(n).padStart(w, '0') }

  function tick() {
    const diff = Math.floor((Date.now() - START) / 1000)

    const years = Math.floor(diff / (365.25 * 24 * 3600))
    const rem1  = diff - Math.floor(years * 365.25 * 24 * 3600)
    const days  = Math.floor(rem1 / (24 * 3600))
    const rem2  = rem1 % (24 * 3600)
    const hours = Math.floor(rem2 / 3600)
    const mins  = Math.floor((rem2 % 3600) / 60)
    const secs  = rem2 % 60

    els.years.textContent = years
    els.days.textContent  = pad(days, 3)
    els.hours.textContent = pad(hours, 2)
    els.mins.textContent  = pad(mins, 2)
    els.secs.textContent  = pad(secs, 2)
  }

  tick()
  setInterval(tick, 1000)
})()

// ── Highlight active nav link on scroll ───────────────────────────────────
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-links a')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--accent)'
            : ''
        })
      }
    })
  },
  { rootMargin: '-40% 0px -55% 0px' }
)

sections.forEach((s) => observer.observe(s))
