import { useEffect } from "react"

const music = new Audio("music.mp3")

export function Music() {
  useEffect(() => {
    const listener = () => {
      playMusic()
      document.removeEventListener("click", listener)
    }

    playMusic(true).catch(() => {
      document.addEventListener("click", listener)
    })

    return () => {
      document.removeEventListener("click", listener)
    }
  }, [])
  return null
}

async function playMusic(shouldThrowError = false) {
  music.loop = true
  try {
    await music.play()
  } catch (e) {
    if (shouldThrowError) {
      throw e
    }
    console.error(e)
  }
}
