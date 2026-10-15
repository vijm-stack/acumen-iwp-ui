import './Icon.css'

export interface IconProps {
  /** Imported SVG asset, e.g. `import home from '../../assets/icons/home-line.svg'` */
  src: string
  /** Figma sizes: 12 dense, 16 default, 20 headers, 24 large */
  size?: 12 | 16 | 20 | 24
  className?: string
}

export function Icon({ src, size = 16, className }: IconProps) {
  return (
    <img
      className={['Icon', className].filter(Boolean).join(' ')}
      src={src}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  )
}
