# 🐾 Fuzzy Hub

**Your go-to platform for buying and selling pets.**

Fuzzy Hub — это мультивендорная платформа для покупки и продажи домашних питомцев. Проект предоставляет удобный интерфейс как для покупателей, так и для продавцов, с полнофункциональной административной панелью.

## 📋 Описание проекта

Fuzzy Hub решает задачу централизованного маркетплейса для животных:

- 🛒 **Портал покупателя** — просмотр каталога, поиск и покупка питомцев
- 🏪 **Портал продавца** — управление объявлениями, профилем и заказами
- 👨‍💼 **Административная панель** — управление пользователями, моде��ация конте��та
- 🔐 **Аутентификация** — безопасная система входа и регистрации
- 📱 **Responsive дизайн** — работает на всех устройствах

## 🛠️ Технологический стек

| Категория          | Технология                         | Версия              |
| ------------------ | ---------------------------------- | ------------------- |
| **Framework**      | [Next.js](https://nextjs.org)      | 16+ (App Router)    |
| **UI Library**     | [React](https://react.dev)         | 19                  |
| **Язык**           | [TypeScript](https://www.typescriptlang.org) | Latest              |
| **Стилизация**     | [TailwindCSS](https://tailwindcss.com) | v4 (CSS-first)      |
| **Тестирование**   | [Playwright](https://playwright.dev) | Latest              |
| **Линтирование**   | [ESLint](https://eslint.org)       | 9                   |
| **Форматирование** | [Prettier](https://prettier.io)    | Latest              |
| **API**            | REST с fetch                       | Built-in            |
| **Состояние**      | Context API + little-state-machine | Latest              |
| **Деплой**         | [Vercel](https://vercel.com)       | Via vercel-cli      |

## 🏗️ Архитектура

### Структура проекта

```
src/
├── app/                    # Next.js App Router
├── components/             # React компоненты (Atomic Design)
│   ├── atoms/             # Базовые компоненты
│   ├── molecules/         # Комбинированные компоненты
│   ├── organisms/         # Сложные компоненты
│   └── templates/         # Макеты страниц
├── contexts/              # Context API
├── lib/                   # Утилиты и хелперы
│   └── api/              # REST API клиент
├── mocks/                # Моковые данные для разработки
└── styles/               # Глобальные стили
```

### Методология

- **Atomic Design** — структурированный подход к разработке компонентов
- **TypeScript** — полная типизация для надежности кода
- **TailwindCSS v4** — CSS-first конфигурация через глобальные переменные

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

> Dev-сервер запускается с HTTPS (`--experimental-https`) на [https://localhost:3000](https://localhost:3000)

### Сборка для продакшена

```bash
npm run build
npm start
```

### Тестирование

```bash
npm run test:e2e      # E2E тесты с Playwright
npm run lint          # Проверка кода
npm run format        # Форматирование кода
```

## 📚 Документация

- [AGENTS.md](./AGENTS.md) — руководство для AI-агентов
- [Next.js документация](https://nextjs.org/docs)
- [React документация](https://react.dev)
- [TailwindCSS документация](https://tailwindcss.com)

## 🌐 Деплой

Проект разворачивается на [Vercel](https://vercel.com):

```bash
vercel deploy
```

Подробнее: [Next.js deployment docs](https://nextjs.org/docs/app/building-your-production-application/deploying)

## 📄 Лицензия

MIT

---

**Разработано с ❤️ для любителей животных**
