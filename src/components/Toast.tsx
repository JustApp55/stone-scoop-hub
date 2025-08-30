import { useToast } from '@/hooks/useToast'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div 
      className="fixed top-20 right-4 z-50 space-y-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded-full text-white font-medium shadow-lg transition-all duration-300 ${
            toast.type === 'error' 
              ? 'bg-destructive' 
              : toast.type === 'success'
              ? 'bg-green-600'
              : 'bg-blue-600'
          } animate-slide-in-right`}
          role="alert"
        >
          <div className="flex items-center justify-between gap-2">
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-current rounded"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}