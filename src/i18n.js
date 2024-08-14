/* eslint-disable max-len */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import { LOCALS } from './i18n/constants';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  eng: {
    translation: {
      Home: 'Home',
      Team: 'Team',
      FAQ: 'FAQ',
      Gallery: 'Gallery',
      Support: 'Support',
      Contacts: 'Contacts',
      'Main text':
        'BOXING is not just a sport, IT’S A WAY to self-improvement.',

      'Section-1 title': 'Why is it worth trying?',
      'Section-1 text':
        'Boxing is not only a sport, but also a way of self-improvement that has many positive aspects for a person`s physical and mental health.Boxing training develops strength, endurance, reaction time and coordination.In addition to physical benefits, boxing also has a positive effect on the mental state of a person.Regular training helps to reduce stress, improve mood and increase self- esteem.The ability to control your emotions and withstand physical activity helps you develop self- discipline, self- confidence and resilience.',

      'Section-2 title': 'About work out',
      'Section-2 text-1': '1. Physical endurance',
      'Section-2 text-2': '2. Strength and muscle tone',
      'Section-2 text-3': '3. Strength and muscle tone',
      'Section-2 text-4': '4. Balance and co-ordination',
      'Section-2 text-5': '5. Flexibility and mobility',
      'Section-2 text-6': '6. Psychological stability',
      'Section-2 text-7': '7. Self-confidence',
      'Section-2 text-8': '8. Discipline and self-control',
      'Section-2 text-9': '9. Stress tolerance',
      'Section-2 text-10': '10. Social skills',

      'Section-3 title': 'Group workouts.',
      'Section-3 text':
        'Тренування з боксу в групі створюють атмосферу підтримки та спільної роботи. Учасники разом долають труднощі, мотивують один одного і досягають нових спортивних вершин.',

      'Section-4 title': 'Private',
      'Section-4 text':
        'Це індивідуальний підхід до ваших цілей. Ми пропонуємо приватні тренування з боксу, адаптовані до ваших потреб і рівня підготовки. Наші досвідчені тренери допоможуть вам досягти найкращих результатів — від покращення фізичної форми до підготовки до змагань. Ми тренуємо боксерів, які прагнуть до спортивної кар`єри. Ви отримаєте всі необхідні навички та стратегії для успішного виступу на рингу. Професійний підхід до підготовки, включаючи стратегію бою, техніку, витривалість і ментальну підготовку.',
    },
  },
  ukr: {
    translation: {
      Home: 'Головна',
      Team: 'Тренери',
      FAQ: 'Питання',
      Gallery: 'Галерея',
      Support: 'Меценати',
      Contacts: 'Кoнтакти',
      'Main text': 'Бокс — це не просто спорт, це шлях до самовдосконалення.',

      'Section-1 title': 'Чому варто спробувати?',
      'Section-1 text':
        'Бокс — це не лише вид спорту, а й спосіб самовдосконалення, який має безліч позитивних аспектів для фізичного та психологічного здоров`я людини. Тренування з боксу розвивають силу, витривалість, швидкість реакції та координацію. Крім фізичних переваг, бокс також позитивно впливає на психологічний стан людини. Регулярні тренування сприяють зниженню рівня стресу, покращенню настрою та підвищенню рівня самооцінки. Вміння контролювати свої емоції та витримувати фізичні навантаження допомагає розвивати самодисципліну, впевненість у собі та стійкість до труднощів.',

      'Section-2 title': 'Як проходять тренування.',
      'Section-2 text-1': '1. Фізична витривалість',
      'Section-2 text-2': '2. Сила і м`язовий тонус',
      'Section-2 text-3': '3. Швидкість і рефлекси',
      'Section-2 text-4': '4. Баланс і координація',
      'Section-2 text-5': '5. Гнучкість і рухливість',
      'Section-2 text-6': '6. Психологічна стійкість',
      'Section-2 text-7': '7. Упевненість у собі',
      'Section-2 text-8': '8. Дисципліна та самоконтроль',
      'Section-2 text-9': '9. Стресостійкість',
      'Section-2 text-10': '10. Соціальні навички',

      'Section-3 title': 'Групові тренування.',
      'Section-3 text':
        'Тренування з боксу в групі створюють атмосферу підтримки та спільної роботи. Учасники разом долають труднощі, мотивують один одного і досягають нових спортивних вершин.',

      'Section-4 title': 'Приватні тренування.',
      'Section-4 text':
        'Це індивідуальний підхід до ваших цілей. Ми пропонуємо приватні тренування з боксу, адаптовані до ваших потреб і рівня підготовки. Наші досвідчені тренери допоможуть вам досягти найкращих результатів — від покращення фізичної форми до підготовки до змагань. Ми тренуємо боксерів, які прагнуть до спортивної кар`єри. Ви отримаєте всі необхідні навички та стратегії для успішного виступу на рингу. Професійний підхід до підготовки, включаючи стратегію бою, техніку, витривалість і ментальну підготовку.',
    },
  },
  deu: {
    translation: {
      Home: 'Home',
      Team: 'Trainers',
      FAQ: 'FAQ',
      Gallery: 'Galerie',
      Support: 'Gönner',
      Contacts: 'Kontakte',
      'Main text':
        'Boxen ist nicht nur ein Sport, es ist ein Weg zur Selbstverbesserung.',

      'Section-1 title': 'Warum ist es einen Versuch wert?',
      'Section-1 text':
        'Boxen ist nicht nur ein Sport, sondern auch ein Weg der Selbstverbesserung, der viele positive Aspekte für die physische und psychische Gesundheit eines Menschen hat. Das Boxtraining entwickelt Kraft, Ausdauer, Reaktionszeit und Koordination. Neben den körperlichen Vorteilen wirkt sich das Boxen auch positiv auf die Psyche des Menschen aus. Regelmäßiges Training hilft, Stress abzubauen, die Stimmung zu verbessern und das Selbstwertgefühl zu steigern. Die Fähigkeit, seine Emotionen zu kontrollieren und körperliche Anstrengung auszuhalten, trägt zur Entwicklung von Selbstdisziplin, Selbstvertrauen und Widerstandsfähigkeit bei.',

      'Section-2 title': 'Wie die Ausbildung verläuft.',
      'Section-2 text-1': '1. Körperliche Ausdauer',
      'Section-2 text-2': '2. Kraft und Muskeltonus',
      'Section-2 text-3': '3. Schnelligkeit und Reflexe',
      'Section-2 text-4': '4. Gleichgewicht und Koordinierung',
      'Section-2 text-5': '5. Flexibilität und Beweglichkeit',
      'Section-2 text-6': '6. Psychische Stabilität',
      'Section-2 text-7': '7. Selbstvertrauen',
      'Section-2 text-8': '8. Disziplin und Selbstbeherrschung',
      'Section-2 text-9': '9. Stresstoleranz',
      'Section-2 text-10': '10. Soziale Fähigkeiten',

      'Section-3 title': 'Gruppentrainings.',
      'Section-3 text':
        'Тренування з боксу в групі створюють атмосферу підтримки та спільної роботи. Учасники разом долають труднощі, мотивують один одного і досягають нових спортивних вершин.',

      'Section-4 title': 'Private Trainingseinheiten.',
      'Section-4 text':
        'Це індивідуальний підхід до ваших цілей. Ми пропонуємо приватні тренування з боксу, адаптовані до ваших потреб і рівня підготовки. Наші досвідчені тренери допоможуть вам досягти найкращих результатів — від покращення фізичної форми до підготовки до змагань. Ми тренуємо боксерів, які прагнуть до спортивної кар`єри. Ви отримаєте всі необхідні навички та стратегії для успішного виступу на рингу. Професійний підхід до підготовки, включаючи стратегію бою, техніку, витривалість і ментальну підготовку.',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Languagedetector)
  .init({
    resources,
    fallbackLng: LOCALS.UK,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
