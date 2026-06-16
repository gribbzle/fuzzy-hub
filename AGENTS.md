# AGENTS.md — Инструкции для ИИ-агентов (Fuzzy Hub)

## 📌 Обзор проекта

**Fuzzy Hub** — это мультивендорная платформа для покупки и продажи домашних питомцев (multi-vendor pet marketplace).

### Архитектура приложения

- **Портал (portal)** — клиентская часть:
  - `portal/customer` — компоненты для покупателей
  - `portal/seller` — компоненты для продавцов
  - `portal/auth` — компоненты страницы входа
  - `portal/market` — компоненты маркетплейса
  - `portal/common` — общие компоненты для всех портальных разделов
- **Администрация (admin)** — административная панель

## 🛠️ Технологии и инструменты

| Категория          | Технология                         | Версия                  |
| ------------------ | ---------------------------------- | ----------------------- |
| **Framework**      | Next.js                            | 16+ (с App Router)      |
| **UI Library**     | React                              | 19                      |
| **Язык**           | TypeScript                         | Latest                  |
| **Стилизация**     | TailwindCSS                        | v4 (CSS-first)          |
| **Тестирование**   | Playwright (e2e и component тесты) | Latest                  |
| **Линтирование**   | ESLint                             | 9                       |
| **Форматирование** | Prettier                           | Latest                  |
| **API**            | REST с fetch                       | Built-in                |
| **Состояние**      | Context API + little-state-machine | Latest                  |
| **Деплой**         | Vercel                             | Via vercel-cli (ручной) |

### Моковые данные

- Для разработки и тестирования используются мок‑данные, расположенные в директории `src/mocks/`.

### Информация о TailwindCSS v4

- **CSS-first configuration** — конфигурация через CSS, а не JavaScript
- **Глобальные переменные** находятся в `./src/app/globals.css`
- **Нет `tailwind.config.ts`** — конфигурация осуществляется через CSS
- **Темная тема не требуется**

## 🏗️ Архитектура и методология

### Atomic Design Methodology

Компоненты следуют принципам атомного дизайна и расположены в `./src/components`:

| Уровень       | Описание                                                           | Примеры                           |
| ------------- | ------------------------------------------------------------------ | --------------------------------- |
| **Atoms**     | Базовые, неделимые компоненты                                      | Button, Input, Label, Icon, Badge |
| **Molecules** | Группы атомов, простые функциональные блоки                        | SearchField (Input + Label), Card |
| **Organisms** | Сложные компоненты из молекул и атомов                             | Header, Sidebar, ProductGrid      |
| **Templates** | Макеты страниц, структура без контента                             | PortalLayout, AdminLayout         |
| **Pages**     | Конкретные страницы (управляются Next.js App Router в `./src/app`) | `src/app/(auth)/login/page.tsx`   |

### Управление состоянием

- **Context API** — для локального и средненеобходимого состояния (в `./src/contexts/`)
- **little-state-machine** — для управления сложными состояниями
- Каждый контекст находится в отдельном файле в `./src/contexts/`

### Работа с API

- **REST API** с использованием встроенного `fetch`
- Клиентский код в `./src/lib/api/`
- Типы API-ответов в `./src/lib/api/types.ts`

## 💻 Соглашения о кодировании

### Именование

| Сущность               | Соглашение                 | Примеры                              |
| ---------------------- | -------------------------- | ------------------------------------ |
| **Компоненты (React)** | PascalCase                 | `ProductCard.tsx`, `UserProfile.tsx` |
| **Файлы компонентов**  | `index.tsx`                | `./atoms/Button/index.tsx`           |
| **Типы/Интерфейсы**    | PascalCase (без префиксов) | `Product`, `UserData`                |
| **Переменные/функции** | camelCase                  | `fetchProducts`, `handleSubmit`      |
| **Константы**          | UPPER_SNAKE_CASE           | `MAX_ITEMS`, `API_BASE_URL`          |
| **CSS классы**         | kebab-case (TailwindCSS)   | `product-card`, `user-header`        |

### Правила TypeScript

- Всегда указывайте типы параметров функций и возвращаемые типы
- Используйте интерфейсы для пропсов компонентов (Props суффикс)
- Типы API-ответов храните в ./src/lib/api/types.ts
- Общие типы в ./src/models/

### Стилизация (TailwindCSS v4)

- Только Tailwind классы для базового стилирования
- CSS модули только если нужны сложные стили (очень редко)
- CSS переменные в ./src/app/globals.css для дизайн-токенов
- Адаптивные классы используйте: md:flex, lg:grid, sm:hidden

## 🔄 Правило организации компонентов

### Структура по разделам

Atoms (атомы) НЕ разделяются по разделам портала — атомы могут быть сгруппированы по функциональному назначению внутри atoms/portal:

```
data-display/ — компоненты для отображения данных (Typography, Avatar, Table, RatingStars и т.д.)
feedback/ — индикаторы состояния (Alert, Progress)
icons/ — иконки
inputs/ — элементы ввода (Button, TextInput, Checkbox, Radio, Toggle, Slider, TextArea, IconButton, CircleButton)
layout/ — layout‑компоненты (Box, Container)
navigation/ — навигационные элементы (Link, MenuLink, Tabs с Tab/TabPanel)
surfaces/ — поверхности (Paper)
```

Molecules, Organisms, Templates (молекулы, организмы, шаблоны) разделяются по разделам портала:

```
./src/components/molecules/portal/
├── customer/          # Компоненты только для портала покупателей
├── seller/            # Компоненты только для портала продавцов
├── auth/              # Компоненты только для страницы входа
├── market/            # Компоненты только для маркетплейса
└── common/            # Общие компоненты для всех портальных разделов
```

```
./src/components/organisms/portal/
├── customer/
├── seller/
├── auth/
├── market/
└── common/
```

```
./src/components/templates/portal/
├── customer/
├── seller/
├── auth/
├── market/
└── common/
```

### Правила размещения компонентов

| Сценарий                                           | Место размещения                                                                   |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Компонент используется только в customer           | molecules/portal/customer/, organisms/portal/customer/, templates/portal/customer/ |
| Компонент используется только в seller             | molecules/portal/seller/, organisms/portal/seller/, templates/portal/seller/       |
| Компонент используется только в auth               | molecules/portal/auth/, organisms/portal/auth/, templates/portal/auth/             |
| Компонент используется только в market             | molecules/portal/market/, organisms/portal/market/, templates/portal/market/       |
| Компонент используется в нескольких разделах       | molecules/portal/common/, organisms/portal/common/, templates/portal/common/       |
| Базовый неделимый компонент (Button, Input и т.д.) | atoms/portal/ (без разделения)                                                     |
| Компонент для админ-панели                         | admin/molecules/, admin/organisms/, admin/templates/                               |
