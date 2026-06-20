# Stack Tecnológico - New Portafolio

## Stack
| Tecnología | Versión | Propósito |
|---|---|---|
| **Next.js** | 16.2.9 | Framework React (App Router) |
| **TypeScript** | 5.9.3 | Tipado estático |
| **Tailwind CSS** | 4.3.1 | Estilos utility-first |
| **Framer Motion** | 12.40.0 | Animaciones declarativas |
| **shadcn/ui** | latest | Componentes base accesibles |
| **Lucide React** | 1.21.0 | Iconos SVG modernos |
| **pnpm** | 11.8.0 | Package manager rápido y eficiente |

## Dependencias clave

| Paquete | Propósito |
|---|---|
| `clsx` | Concatenación condicional de clases |
| `tailwind-merge` | Merge inteligente de clases Tailwind |
| `class-variance-authority` | Variantes tipadas para componentes |
| `@radix-ui/*` | Primitivos headless accesibles |

## Estructura del proyecto
```
src/
├── app/               # App Router (pages, layouts, loading, error)
├── components/
│   ├── ui/            # shadcn/ui (button, card, badge, etc.)
│   ├── layout/        # Navbar, Footer, Header, etc.
│   ├── sections/      # Hero, About, Projects, Experience, etc.
│   └── shared/        # Componentes reutilizables genéricos
├── data/              # Datos estáticos (proyectos, skills, etc.)
├── hooks/             # Custom hooks
├── lib/               # Utilidades (cn(), etc.)
├── styles/            # Estilos globales adicionales
└── types/             # Types/interfaces globales
```

## Comandos principales
```bash
pnpm dev         # Iniciar servidor de desarrollo
pnpm build       # Compilar para producción
pnpm start       # Iniciar servidor de producción
pnpm lint        # Ejecutar ESLint
```

## Componentes shadcn/ui disponibles
- `button` — Botón con variantes (default, secondary, outline, ghost, link)
- `card` — Contenedor tipo tarjeta (Card, CardHeader, CardTitle, CardContent, CardFooter)
- `badge` — Etiqueta/badge con variantes
- `separator` — Línea separadora horizontal/vertical
- `sheet` — Panel lateral deslizable
- `tooltip` — Tooltip al hacer hover

## Recursos
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev/icons)
