export function formatTime(unix:number):string {
  const d=new Date(unix*1000)
  return d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
}