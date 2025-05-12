import { Github, Linkedin, Mail } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/ptt3199',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/thanh-phuongtan',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:phuongtanthanh99@gmail.com',
    icon: Mail,
    label: 'Email',
  },
]

export function SocialIcons() {
  return (
    <div className="flex gap-4">
      {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-secondary transition-colors duration-200"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}
