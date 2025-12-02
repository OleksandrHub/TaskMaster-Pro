# TaskMaster-Pro – Сучасний Task Manager на Angular 18+ Angular

🚀 Повноцінний веб-додаток для управління завданнями (особистими та командними), створений як навчальний, але з архітектурою рівня продакшн-проекту.

### Основні можливості
- Реєстрація / вхід через Firebase Authentication
- Створення, редагування, видалення завдань (CRUD)
- Kanban-дошка з drag-and-drop (To Do → In Progress → Done)
- Фільтрація за статусом, пріоритетом, тегами та виконавцем
- Призначення завдань іншим користувачам
- Коментарі до завдань
- Адаптивний дашборд з статистикою та графіками
- Темна / світла тема
- Повністю реактивні форми та реал-тайм оновлення через Firebase Firestore

### Технологічний стек
![Angular](https://img.shields.io/badge/Angular-18%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-^17-A52B8B?style=for-the-badge&logo=ngx&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-^7-B7178C?style=for-the-badge)

### Архітектура
- Standalone Components (Angular 18)
- NgRx Store + Effects для керування станом
- Lazy-loading модулів
- Firebase Auth + Firestore + Storage
- AuthGuard, Interceptors, Signals

### Демо
🔗 https://taskflow-angular.web.app (або твій Vercel/Netlify)

### Скріншоти
![Dashboard](/screenshots/dashboard-light.png)
![Kanban Dark](/screenshots/kanban-dark.png)
![Task Detail](/screenshots/task-detail.png)

### Встановлення та запуск локально
```bash
git clone https://github.com/твій-нікнейм/taskflow-angular.git
cd taskflow-angular
npm install
ng serve
