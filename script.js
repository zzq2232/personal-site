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
