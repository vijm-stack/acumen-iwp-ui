import './StepTracker.css'

export interface Step {
  title: string
  description: string
}

export interface StepTrackerProps {
  steps: Step[]
  /** Zero-based index of the active step; earlier steps show as done */
  currentStep: number
}

export function StepTracker({ steps, currentStep }: StepTrackerProps) {
  return (
    <ol className="StepTracker">
      {steps.map((step, index) => {
        const state = index < currentStep ? 'done' : index === currentStep ? 'current' : 'upcoming'
        return (
          <li
            key={step.title}
            className={`StepTracker__step StepTracker__step--${state}`}
            style={{ flexGrow: STEP_WIDTHS[index] ?? 1 }}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className="StepTracker__number" aria-hidden="true">
              {state === 'done' ? '✓' : index + 1}
            </span>
            <span className="StepTracker__text">
              <span className="StepTracker__title">{step.title}</span>
              <span className="StepTracker__description">{step.description}</span>
            </span>
            {state === 'done' && <span className="StepTracker__srOnly">completed</span>}
          </li>
        )
      })}
    </ol>
  )
}

/** Column proportions from the Figma frame (412.66 / 413.67 / 301.67 of 1128px) */
const STEP_WIDTHS = [412.66, 413.67, 301.67]
