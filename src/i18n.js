/* eslint-disable max-len */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import Languagedetector from 'i18next-browser-languagedetector';
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
      'Main text-1': 'BOXING is not just a sport,',
      'Main text-2': 'IT’S A WAY',
      'Main text-3': 'to self-improvement.',

      'Contact us': 'Contact us',

      'Section-1 title': 'Why is it worth trying?',
      'Section-1 text':
        'Boxing is not only a sport, but also a way of self-improvement that has many positive aspects for a person`s physical and mental health.Boxing training develops strength, endurance, reaction time and coordination.In addition to physical benefits, boxing also has a positive effect on the mental state of a person.Regular training helps to reduce stress, improve mood and increase self- esteem.The ability to control your emotions and withstand physical activity helps you develop self- discipline, self- confidence and resilience.',

      'Section-4 title': 'About work out',
      'Section-4 text-1': '1. Physical endurance',
      'Section-4 text-2': '2. Strength and muscle tone',
      'Section-4 text-3': '3. Strength and muscle tone',
      'Section-4 text-4': '4. Balance and co-ordination',
      'Section-4 text-5': '5. Flexibility and mobility',
      'Section-4 text-6': '6. Psychological stability',
      'Section-4 text-7': '7. Self-confidence',
      'Section-4 text-8': '8. Discipline and self-control',
      'Section-4 text-9': '9. Stress tolerance',
      'Section-4 text-10': '10. Social skills',

      'Section-2 title': 'Group workouts.',
      'Section-2 text':
        'Boxing training in a group creates an atmosphere of support and teamwork. Participants overcome difficulties together, motivate each other and reach new sporting heights. The combination of teamwork, motivation and shared challenges drives everyone forward, helping each participant reach new heights in their sport. The group environment reinforces your efforts and accelerates your progress.',

      'Section-3 title': 'Private',
      'Section-3 text':
        'This is an individualized approach to your goals. We offer private boxing training sessions tailored to your needs and fitness level. Our experienced coaches will help you achieve the best results—from improving your fitness to preparing for competitions. We train boxers who aspire to a career in the sport, ensuring you develop all the necessary skills and strategies for a successful performance in the ring. Our professional approach to training includes fight strategy, technique, endurance, and mental preparation.',

      Questions: 'HAVE QUESTIONS?',
      'Our Team': 'YOUR TRAINERS',
      'Our Training': 'OUR TRAINING',
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
      'Main text-1': 'Бокс — це не просто спорт,',
      'Main text-2': 'ЦЕ ШЛЯХ',
      'Main text-3': 'до самовдосконалення.',

      'Contact us': 'Зв`язатись',

      'Section-1 title': 'Чому варто спробувати?',
      'Section-1 text':
        'Бокс — це не лише вид спорту, а й спосіб самовдосконалення, який має безліч позитивних аспектів для фізичного та психологічного здоров`я людини. Тренування з боксу розвивають силу, витривалість, швидкість реакції та координацію. Крім фізичних переваг, бокс також позитивно впливає на психологічний стан людини. Регулярні тренування сприяють зниженню рівня стресу, покращенню настрою та підвищенню рівня самооцінки. Вміння контролювати свої емоції та витримувати фізичні навантаження допомагає розвивати самодисципліну, впевненість у собі та стійкість до труднощів.',

      'Section-4 title': 'Як проходять тренування.',
      'Section-4 text-1': '1. Фізична витривалість',
      'Section-4 text-2': '2. Сила і м`язовий тонус',
      'Section-4 text-3': '3. Швидкість і рефлекси',
      'Section-4 text-4': '4. Баланс і координація',
      'Section-4 text-5': '5. Гнучкість і рухливість',
      'Section-4 text-6': '6. Психологічна стійкість',
      'Section-4 text-7': '7. Упевненість у собі',
      'Section-4 text-8': '8. Дисципліна та самоконтроль',
      'Section-4 text-9': '9. Стресостійкість',
      'Section-4 text-10': '10. Соціальні навички',

      'Section-2 title': 'Групові тренування.',
      'Section-2 text':
        'Тренування з боксу в групі створюють атмосферу підтримки та спільної роботи. Учасники разом долають труднощі, мотивують один одного і досягають нових спортивних вершин.Поєднання командної роботи, мотивації та спільних викликів рухає всіх вперед, допомагаючи кожному учаснику досягти нових спортивних висот. Групове середовище підсилює ваші зусилля і прискорює ваш прогрес.',

      'Section-3 title': 'Приватні тренування.',
      'Section-3 text':
        'Це індивідуальний підхід до ваших цілей. Ми пропонуємо приватні тренування з боксу, адаптовані до ваших потреб і рівня підготовки. Наші досвідчені тренери допоможуть вам досягти найкращих результатів — від покращення фізичної форми до підготовки до змагань. Ми тренуємо боксерів, які прагнуть до спортивної кар`єри. Ви отримаєте всі необхідні навички та стратегії для успішного виступу на рингу. Професійний підхід до підготовки, включаючи стратегію бою, техніку, витривалість і ментальну підготовку.',

      Questions: 'Є ПИТАННЯ?',
      'Our Team': 'ВАШІ ТРЕНЕРИ',
      'Our Training': 'НАШЕ ТРЕНУВАННЯ',
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
      'Main text-1': 'Boxen ist nicht nur ein Sport,',
      'Main text-2': 'es ist ein Weg',
      'Main text-3': 'zur Selbstverbesserung.',

      'Contact us': 'Contact us',

      'Section-1 title': 'Warum ist es einen Versuch wert?',
      'Section-1 text':
        'Boxen ist nicht nur ein Sport, sondern auch ein Weg der Selbstverbesserung, der viele positive Aspekte für die physische und psychische Gesundheit eines Menschen hat. Das Boxtraining entwickelt Kraft, Ausdauer, Reaktionszeit und Koordination. Neben den körperlichen Vorteilen wirkt sich das Boxen auch positiv auf die Psyche des Menschen aus. Regelmäßiges Training hilft, Stress abzubauen, die Stimmung zu verbessern und das Selbstwertgefühl zu steigern. Die Fähigkeit, seine Emotionen zu kontrollieren und körperliche Anstrengung auszuhalten, trägt zur Entwicklung von Selbstdisziplin, Selbstvertrauen und Widerstandsfähigkeit bei.',

      'Section-4 title': 'Wie die Ausbildung verläuft.',
      'Section-4 text-1': '1. Körperliche Ausdauer',
      'Section-4 text-2': '2. Kraft und Muskeltonus',
      'Section-4 text-3': '3. Schnelligkeit und Reflexe',
      'Section-4 text-4': '4. Gleichgewicht und Koordinierung',
      'Section-4 text-5': '5. Flexibilität und Beweglichkeit',
      'Section-4 text-6': '6. Psychische Stabilität',
      'Section-4 text-7': '7. Selbstvertrauen',
      'Section-4 text-8': '8. Disziplin und Selbstbeherrschung',
      'Section-4 text-9': '9. Stresstoleranz',
      'Section-4 text-10': '10. Soziale Fähigkeiten',

      'Section-2 title': 'Gruppentrainings.',
      'Section-2 text':
        'Das Boxtraining in der Gruppe schafft eine Atmosphäre der Unterstützung und des Teamworks. Die Teilnehmer überwinden Schwierigkeiten gemeinsam, motivieren sich gegenseitig und erreichen neue sportliche Höchstleistungen. Die Kombination aus Teamwork, Motivation und gemeinsamen Herausforderungen treibt alle an und hilft jedem Teilnehmer, neue sportliche Höchstleistungen zu erzielen. Das Gruppenumfeld verstärkt Ihre Bemühungen und beschleunigt Ihre Fortschritte.',

      'Section-3 title': 'Private Trainingseinheiten.',
      'Section-3 text':
        'Це індивідуальний підхід до ваших цілей. Ми пропонуємо приватні тренування з боксу, адаптовані до ваших потреб і рівня підготовки. Наші досвідчені тренери допоможуть вам досягти найкращих результатів — від покращення фізичної форми до підготовки до змагань. Ми тренуємо боксерів, які прагнуть до спортивної кар`єри. Ви отримаєте всі необхідні навички та стратегії для успішного виступу на рингу. Професійний підхід до підготовки, включаючи стратегію бою, техніку, витривалість і ментальну підготовку.',

      Questions: 'HAVE QUESTIONS?',
      'Our Team': 'YOUR TRAINERS',
      'Our Training': 'OUR TRAINING',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  // .use(Languagedetector)
  .init({
    resources,
    // fallbackLng: LOCALS.UKR,
    lng: LOCALS.ENG,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
