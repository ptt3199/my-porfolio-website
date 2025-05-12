import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/resume', text: 'Resume' },
  { href: '/notes', text: 'Notes' },
  { href: '/contact', text: 'Ping Me' },
]

export function Navigation() {
  return (
    <nav className="flex flex-wrap gap-6">
      {NAV_ITEMS.map(({ href, text }) => (
        <Link
          key={text}
          href={href}
          className="relative text-lg font-medium hover:text-primary dark:hover:text-secondary transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary dark:after:bg-secondary after:transition-all hover:after:w-full"
        >
          {text}
        </Link>
      ))}
    </nav>
  )
}
