import './ProgressBar.css'

export interface ProgressBarProps {
  /** 0 to 100 */
  value: number
  className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      className={['ProgressBar', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
    >
      <div className="ProgressBar__fill" style={{ width: `${clamped}%` }} />
    </div>
  )
}
