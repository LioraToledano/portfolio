import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#443744] text-white hover:bg-[#e98b9b]',
      secondary: 'border border-[#eadfe1] bg-white text-[#443744] hover:border-[#e98b9b] hover:text-[#e98b9b]',
      ghost: 'text-[#7d737d] hover:bg-[#f7eee8] hover:text-[#443744]',
    }
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3.5 text-sm',
    }

    return (
      <button ref={ref} className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e98b9b] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
