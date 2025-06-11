interface ScrollingTextProps {
  text: string
  repetitions?: number
  className?: string
}

export default function ScrollingText({ text, repetitions = 10, className = "" }: ScrollingTextProps) {
  return (
    <div className="scrolling-text-container py-3">
      <div className={`scrolling-text text-white text-sm md:text-base font-bold tracking-wider ${className}`}>
        {Array.from({ length: repetitions }, (_, index) => (
          <span key={index} className="px-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
