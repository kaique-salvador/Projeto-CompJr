import { useState, useRef, useEffect } from "react"
import "../styles/VerificationCodeInput.css"

const VerificationCodeInput = ({ length = 6, onChange }) => {
  const [code, setCode] = useState(Array(length).fill(""))
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Foca no primeiro input quando o componente é montado
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value

    if (!/^\d*$/.test(value)) return

    const digit = value.slice(-1)

    const newCode = [...code]
    newCode[index] = digit
    setCode(newCode)

    onChange(newCode.join(""))

    // Move o foco para o próximo input se houver um valor
    if (digit && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Move o foco para o input anterior ao pressionar backspace em um campo vazio
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }

    // Move o foco para o próximo input ao pressionar a seta direita
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }

    // Move o foco para o input anterior ao pressionar a seta esquerda
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (!/^\d+$/.test(pastedData)) return

    // Preenche os inputs com os dígitos colados
    const digits = pastedData.slice(0, length).split("")
    const newCode = [...code]

    digits.forEach((digit, index) => {
      newCode[index] = digit
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit
      }
    })

    setCode(newCode)
    onChange(newCode.join(""))

    // Foca no último input preenchido ou no próximo vazio
    const focusIndex = Math.min(digits.length, length - 1)
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus()
    }
  }

  return (
    <div className="verification-code-container">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="verification-code-input"
          value={code[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          aria-label={`Dígito ${index + 1} do código de verificação`}
        />
      ))}
    </div>
  )
}

export default VerificationCodeInput
