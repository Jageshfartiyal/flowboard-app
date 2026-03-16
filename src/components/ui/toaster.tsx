"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

const variantIcons = {
  default: <Info className="h-5 w-5 text-blue-400 shrink-0" />,
  destructive: <XCircle className="h-5 w-5 text-red-300 shrink-0" />,
  success: <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
} as const;

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant = "default", ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {variantIcons[variant]}
              <div className="grid gap-0.5 min-w-0">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
