export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
