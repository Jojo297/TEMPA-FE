// File: src/components/ui/input-otp.jsx (Pastikan dependencies sudah terinstal!)

import * as React from "react"
import { OTPInput } from "input-otp"
import { Separator } from "@radix-ui/react-separator"
import { cn } from "@/lib/utils" // Pastikan path ini benar!

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Styling dasar slot
      "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
      
      // Gaya Fokus yang Paling Penting
      "group-data-[focus]:z-10 group-data-[focus]:ring-2 group-data-[focus]:ring-ring group-data-[focus]:ring-offset-background",
      
      // Gaya Saat Diisi
      "group-data-[filled]:border-foreground",
      
      className
    )}
    {...props}
  >
    {/* props.children berisi input tersembunyi. Harus ada di sini. */}
    {props.children}
    
    {/* Div yang menampilkan karakter. Ini yang sering memblokir klik. */}
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "pointer-events-none" // <-- Jaminan bahwa div ini TIDAK akan memblokir klik
      )}
    >
      {props.char}
    </div>
  </div>
))
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Separator className="h-10 w-2 shrink-0" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }