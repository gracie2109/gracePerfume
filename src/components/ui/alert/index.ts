import { type VariantProps, cva } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertTitle } from './AlertTitle.vue'
export { default as AlertDescription } from './AlertDescription.vue'

export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
          success: 'bg-custom-success text-white border-none',
          alert:'text-custom-primary text-white border-none'
      },
        size:{
          small: 'max-w-md',
            auto:''
        }
    },
    defaultVariants: {
      variant: 'default',
        size:'auto'
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
