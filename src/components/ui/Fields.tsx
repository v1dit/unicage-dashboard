export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-600 mb-2">{children}</label>;
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className||""}`} />;
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className||""}`} />;
}
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700 disabled:opacity-60 ${props.className||""}`} />;
}
