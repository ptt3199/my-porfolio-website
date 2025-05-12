import Image from 'next/image'

export function Avatar({ src }: { src?: string }) {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/30 dark:border-primary/30 animate-spin-slow" />
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <Image
          src={src || 'https://avatars.githubusercontent.com/u/583231'}
          alt="Profile"
          fill
          className="rounded-full shadow-xl"
          priority
        />
      </div>
    </div>
  )
}
