# Setup Tailwind the Latest version in Laravel version latest
BEST Folder Structure (Recommended)
📁 app/
app/
├── Livewire/
│   ├── Admin/
│   │   ├── Dashboard.php
│   │   ├── Users/
│   │   │   ├── UserIndex.php
│   │   │   ├── UserCreate.php
│   │   │   └── UserEdit.php
│   │   └── Products/
│   │       ├── ProductIndex.php
│   │       ├── ProductCreate.php
│   │       └── ProductEdit.php
│   │
│   ├── Auth/
│   │   ├── Login.php
│   │   ├── Register.php
│   │   └── ForgotPassword.php
│   │
│   └── Shared/
│       ├── Modal.php
│       ├── ConfirmDialog.php
│       └── Notifications.php
│
├── Models/
├── Http/
│   └── Middleware/
│       └── RoleMiddleware.php
└── Providers/

Old app.css
@import 'tailwindcss'; @import '../../vendor/livewire/flux/dist/flux.css'; @source '../views'; @source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php'; @source '../../vendor/livewire/flux-pro/stubs/**/*.blade.php'; @source '../../vendor/livewire/flux/stubs/**/*.blade.php'; @custom-variant dark (&:where(.dark, .dark *)); @theme { --font-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; --color-zinc-50: #fafafa; --color-zinc-100: #f5f5f5; --color-zinc-200: #e5e5e5; --color-zinc-300: #d4d4d4; --color-zinc-400: #a3a3a3; --color-zinc-500: #737373; --color-zinc-600: #525252; --color-zinc-700: #404040; --color-zinc-800: #262626; --color-zinc-900: #171717; --color-zinc-950: #0a0a0a; --color-accent: var(--color-neutral-800); --color-accent-content: var(--color-neutral-800); --color-accent-foreground: var(--color-white); } @layer theme { .dark { --color-accent: var(--color-white); --color-accent-content: var(--color-white); --color-accent-foreground: var(--color-neutral-800); } } @layer base { *, ::after, ::before, ::backdrop, ::file-selector-button { border-color: var(--color-gray-200, currentColor); } } [data-flux-field]:not(ui-radio, ui-checkbox) { @apply grid gap-2; } [data-flux-label] { @apply !mb-0 !leading-tight; } input:focus[data-flux-control], textarea:focus[data-flux-control], select:focus[data-flux-control] { @apply outline-hidden ring-2 ring-accent ring-offset-2 ring-offset-accent-foreground; } @plugin "flowbite/plugin"; /* \[:where(&)\]:size-4 { @apply size-4; } */

New Setup
For new Laravel 12 + Livewire + Flux + Flowbite projects:
npm remove tailwindcss
npm install -D tailwindcss@latest postcss autoprefixer
npm install flowbite alpinejs

Then compile:
npm run dev

1️⃣ package.json (essential dependencies)
{
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "alpinejs": "^3.12.0",
    "autoprefixer": "^10.4.15",
    "flowbite": "^1.8.4",
    "postcss": "^8.4.24",
    "tailwindcss": "^4.3.1",
    "vite": "^4.5.9"
  }
}

2️⃣ vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});

3️⃣ resources/css/app.css
/* Tailwind + Flux CSS */
@import 'tailwindcss';
@import '../../vendor/livewire/flux/dist/flux.css';

/* Source scanning */
@source '../views';
@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../vendor/livewire/flux-pro/stubs/**/*.blade.php';
@source '../../vendor/livewire/flux/stubs/**/*.blade.php';

/* Dark mode variant */
@custom-variant dark (&:where(.dark, .dark *));

/* Theme variables */
@theme {
    --font-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;

    --color-zinc-50: #fafafa;
    --color-zinc-100: #f5f5f5;
    --color-zinc-200: #e5e5e5;
    --color-zinc-300: #d4d4d4;
    --color-zinc-400: #a3a3a3;
    --color-zinc-500: #737373;
    --color-zinc-600: #525252;
    --color-zinc-700: #404040;
    --color-zinc-800: #262626;
    --color-zinc-900: #171717;
    --color-zinc-950: #0a0a0a;

    --color-accent: var(--color-neutral-800);
    --color-accent-content: var(--color-neutral-800);
    --color-accent-foreground: var(--color-white);
}

/* Dark mode overrides */
@layer theme {
    .dark {
        --color-accent: var(--color-white);
        --color-accent-content: var(--color-white);
        --color-accent-foreground: var(--color-neutral-800);
    }
}

/* Base styling */
@layer base {
    *,
    ::after,
    ::before,
    ::backdrop,
    ::file-selector-button {
        border-color: var(--color-gray-200, currentColor);
    }
}

/* Flux component styling */
[data-flux-field]:not(ui-radio, ui-checkbox) {
    @apply grid gap-2;
}

[data-flux-label] {
    @apply mb-0! leading-tight;
}

input:focus[data-flux-control],
textarea:focus[data-flux-control],
select:focus[data-flux-control] {
    @apply outline-hidden ring-2 ring-accent ring-offset-2 ring-offset-accent-foreground;
}

/* Flowbite plugin */
@plugin "flowbite/plugin";

4️⃣ resources/js/app.js
import Alpine from 'alpinejs'
import { initFlowbite } from 'flowbite'

window.Alpine = Alpine
Alpine.start()

// Global re-init function
window.reinitFlowbite = () => {
    initFlowbite()
}

// Re-init selepas Livewire navigate / DOM update
document.addEventListener('livewire:navigated', () => {
    window.reinitFlowbite()
})

🔍 Why initFlowbite()?
Flowbite works by:

    Scanning the DOM
    
    Finding elements with:
    
    data-modal-toggle
    
    data-dropdown-toggle
    
    etc.
    
    Livewire:
    
    Partially replacing the DOM

👉 So Flowbite needs to scan the DOM again → initFlowbite()


5️⃣ Build/Dev Steps
1. Install all dependencies:
   - npm install
2. Compile for development:
   - npm run dev
3. Compile for production:
   - npm run build
