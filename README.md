# Лабораторна робота №3 — React Native

> **Тема:** Використання кастомних жестів у React Native та стилізація інтерфейсу мобільного застосунку.

**Репозиторій:** [VolodymyrShevel/MobileLabsRN2026](https://github.com/VolodymyrShevel/MobileLabsRN2026) | **Гілка:** `lab03`

---

## Інструкція запуску

```bash
git clone https://github.com/VolodymyrShevel/MobileLabsRN2026.git
cd MobileLabsRN2026
git checkout lab03
cd lab03
npm install
npx expo start
```

Відскануйте QR-код у Expo Go або натисніть `a` (Android) / `i` (iOS).

---

## Структура проєкту

```
lab03/
├── App.js
├── babel.config.js
├── package.json
└── src/
    ├── context/
    │   ├── GameContext.js       ← стан гри, лічильник, прогрес завдань
    │   └── ThemeContext.js      ← світла/темна тема
    ├── navigation/
    │   └── AppNavigator.js      ← Bottom Tab Navigator
    └── screens/
        ├── HomeScreen.js        ← головний екран з жестами
        ├── ChallengesScreen.js  ← список завдань з прогресом
        └── SettingsScreen.js    ← налаштування + статистика
```

---

## Опис реалізованого функціоналу

### 🎮 Головний екран — жести

| Жест | Обробник | Результат |
|---|---|---|
| Одинарний tap | `TapGestureHandler` | +1 очко |
| Подвійний tap | `TapGestureHandler (numberOfTaps=2)` | +2 очки |
| Довге натискання (2с) | `LongPressGestureHandler` | +5 очок |
| Перетягування | `PanGestureHandler` | Переміщення об'єкта |
| Свайп вправо | `FlingGestureHandler (RIGHT)` | +1-10 випадкових очок |
| Свайп вліво | `FlingGestureHandler (LEFT)` | +1-10 випадкових очок |
| Pinch | `PinchGestureHandler` | +3 очки, масштабування |

- Анімація натискання (`Animated.spring`)
- Плаваючий лейбл `+N` при кожній дії

### 🏆 Екран завдань

9 завдань з прогрес-барами:
- Зробити 10 кліків
- Подвійний клік 5 разів
- Утримувати об'єкт 3 секунди
- Перетягнути об'єкт
- Свайп вправо
- Свайп вліво
- Змінити розмір (pinch)
- Отримати 100 очок
- ⚡ Власне завдання: зробити 3 свайпи підряд

### ⚙️ Екран налаштувань

- Перемикач світлої / темної теми
- Загальна статистика (рахунок, виконані завдання)
- Список усіх завдань зі статусом виконання

### 🎨 Стилізація

- Власна тема через `ThemeContext` (без сторонніх бібліотек)
- Підтримка **світлої та темної теми**
- Єдина палітра кольорів по всьому застосунку

---

## Скріншоти

> *(Додайте скріншоти після запуску)*

| Головний екран | Завдання | Налаштування (темна) |
|---|---|---|
| `screenshots/home.png` | `screenshots/challenges.png` | `screenshots/settings-dark.png` |

---

## Висновки

### 1. Які типи жестів реалізовано?
У застосунку реалізовано 6 типів жестів із бібліотеки `react-native-gesture-handler`: `TapGestureHandler` (одинарний та подвійний клік), `LongPressGestureHandler`, `PanGestureHandler`, `FlingGestureHandler` та `PinchGestureHandler`. Кожен жест дає різну кількість очок і впливає на прогрес завдань.

### 2. Як реалізовано підтримку тем?
Через `ThemeContext` з `React.createContext`. Контекст зберігає поточну тему (`lightTheme` / `darkTheme`) та функцію `toggleTheme`. Всі екрани отримують тему через хук `useTheme()` і застосовують кольори динамічно через `StyleSheet`.

### 3. Як жести взаємодіють між собою?
Жести вкладені один в одного (`nested handlers`). Для одночасної роботи `PanGestureHandler` та `PinchGestureHandler` використовується `simultaneousHandlers`. Одинарний та подвійний tap розрізняються через `waitFor` — одинарний чекає, поки подвійний не спрацює або не відмовить.

### 4. Навіщо потрібен `GestureHandlerRootView`?
`GestureHandlerRootView` — обов'язковий кореневий контейнер для `react-native-gesture-handler`. Без нього жести не працюватимуть на Android. Він обгортає весь екран і забезпечує правильну обробку подій дотику.
