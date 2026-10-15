import './TagReason.css'

export interface TagReasonProps {
  label: string
}

export function TagReason({ label }: TagReasonProps) {
  return <span className="TagReason">{label}</span>
}
