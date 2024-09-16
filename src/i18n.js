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

      'Section-2 title': 'Group workouts.',
      'Section-2 text':
        'Boxing training in a group creates an atmosphere of support and teamwork. Participants overcome difficulties together, motivate each other and reach new sporting heights. The combination of teamwork, motivation and shared challenges drives everyone forward, helping each participant reach new heights in their sport. The group environment reinforces your efforts and accelerates your progress.',

      'Section-3 title': 'Private',
      'Section-3 text':
        'This is an individualized approach to your goals. We offer private boxing training sessions tailored to your needs and fitness level. Our experienced coaches will help you achieve the best results—from improving your fitness to preparing for competitions. We train boxers who aspire to a career in the sport, ensuring you develop all the necessary skills and strategies for a successful performance in the ring. Our professional approach to training includes fight strategy, technique, endurance, and mental preparation.',

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

      'Support-Section-1 title': 'Advantages of co-operation',
      'Support-Section-1 text':
        'Modern challenges:<br>Negative effects of the development of computerisation and mobile technologies;<br>Increase in time spent by young people on social networks, computer and mobile games;<br>Decrease in physical activity of the population;<br>Strengthening the role of sport, prevention of physical and mental illness;<br>Austria not represented in the boxing programme at the Olympic Games.<br>Planned positive effect of opening a boxing club:<br>(a) Involvement of children and young people in Klagenfurt and the surrounding towns in boxing;<br>b) Improvement of the physical and mental health of the population;<br>c) Minimum investment in financial and material terms;<br>d) Promotion of local Austrian boxing champions, increasing their status and recognition;<br>e) Development of Olympic sport in the region with further representation of Austria in the region prestigious European and world tournaments.',

      'Support-Section-2 title': 'Our results',

      'Support-Section-2 text':
        'Since January 2023 we support trainers of boxing clubs (Klagenfurt Boxing Club). <br>During this time:<br>Еrhonoured the champion of Austria 2024.<br>Increased the number of trainees in the club (from 20 people per training session to 35-40 people).<br>Has helped to bring the Klagenfurt boxing club into the TOP 3 boxing clubs in Austria (statistics on results of the Austrian Championship)',

      'Support-Section-3 title': 'What do we need',
      'Support-Section-3 text':
        'In the initial phase of the development of the Boxing Club We need the following support:<br>Payment of the cost of renting premises suitable for housing a boxing club the following properties:<br>- Main room for setting up the ring, bags, warm-up area and functional area Training <br>-250-350 m²;<br>- Two changing rooms;<br>- Two shower rooms;<br>- toilet;<br>- Coaching room for trainers - 15-20 m²;<br>- Storage room for equipment - 10 m²;<br>- Practical location in places where there are many people.<br>- Expensive equipment (approx. 6500 euros). Ring (approx. 12,000 euros).<br>All other expenses related to paying trainers, cleaning and purchasing equipment, advertising, maintaining social pages, etc. are paid by us.',

      Questions: 'HAVE QUESTIONS?',
      'Our Team': 'YOUR TRAINERS',
      'Our Training': 'OUR TRAINING',
      'Support Us': 'SUPPORT US',

      'or you can contact us via': 'or you can contact us via',
      Send: 'Send',
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

      'Contact us': 'Зв`язатись з нами',

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

      'Support-Section-1 title': 'Переваги співпраці',
      'Support-Section-1 text':
        'Сучасні виклики:<br>Негативні наслідки розвитку комп`ютеризації та мобільних технологій;<br>Збільшення часу, проведеного молоддю в соціальних мережах, комп`ютерних та мобільних іграх;<br>Зниження фізичної активності населення;<br>Посилення ролі спорту, профілактика фізичних та психічних захворювань;<br>Австрія не представлена в програмі з боксу на Олімпійських іграх.<br>Запланований позитивний ефект від відкриття боксерського клубу:<br>(a) Залучення дітей та молоді в Клагенфурті та навколишніх містах до занять боксом;<br>б) покращення фізичного та психічного здоров`я населення;<br>в) Мінімальні інвестиції у фінансовому та матеріальному плані;<br>г) Просування місцевих австрійських чемпіонів з боксу, підвищення їхнього статусу та визнання;<br>д) Розвиток олімпійського спорту в регіоні з подальшим представленням Австрії в регіоні на престижних європейських та світових турнірах.',

      'Support-Section-2 title': 'Наші досягнення',

      'Support-Section-2 text':
        'З січня 2023 року ми підтримуємо тренерів боксерських клубів (Klagenfurt Boxing Club). За цей час:<br>Виховали чемпіона Австрії 2024 року.<br>Збільшили кількість вихованців у клубі (з 20 осіб на тренуванні до 35-40 осіб).<br>Допоміг вивести боксерський клуб Клагенфурта в ТОП-3 боксерських клубів Австрії (статистика за результатами чемпіонату Австрії)',

      'Support-Section-3 title': 'Що нам потрібно',
      'Support-Section-3 text':
        'На початковому етапі розвитку боксерського клубу ми потребуємо наступної підтримки:<br>Оплата вартості оренди приміщення, придатного для розміщення боксерського клубу наступних властивостей:<br>- Основне приміщення для встановлення рингу, мішків, зони розминки та функціональної зони тренувань - 250-350 m²;<br>- Дві роздягальні;<br>- Дві душові кімнати;<br>- Туалет;<br>- Тренерська для тренерів - 15-20 м²;<br>- Комора для зберігання інвентарю - 10 м²;<br>- Практичне розташування в місцях великого скупчення людей.<br>- Дороге обладнання (близько 6500 євро). Кільце (близько 12 000 євро).<br>Всі інші витрати, пов`язані з оплатою тренерів, прибиранням та придбанням обладнанням, рекламою, веденням соціальних сторінок тощо, ми беремо на себе.',

      Questions: 'Є ПИТАННЯ?',
      'Our Team': 'ВАШІ ТРЕНЕРИ',
      'Our Training': 'НАШЕ ТРЕНУВАННЯ',
      'Support Us': 'ПІДТРИМАТИ НАС',

      'or you can contact us via': 'або ви можете зв`язатися з нами через',
      Send: 'Надіслати',
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

      'Contact us': 'Kontaktiere uns',

      'Section-1 title': 'Warum ist es einen Versuch wert?',
      'Section-1 text':
        'Boxen ist nicht nur ein Sport, sondern auch ein Weg der Selbstverbesserung, der viele positive Aspekte für die physische und psychische Gesundheit eines Menschen hat. Das Boxtraining entwickelt Kraft, Ausdauer, Reaktionszeit und Koordination. Neben den körperlichen Vorteilen wirkt sich das Boxen auch positiv auf die Psyche des Menschen aus. Regelmäßiges Training hilft, Stress abzubauen, die Stimmung zu verbessern und das Selbstwertgefühl zu steigern. Die Fähigkeit, seine Emotionen zu kontrollieren und körperliche Anstrengung auszuhalten, trägt zur Entwicklung von Selbstdisziplin, Selbstvertrauen und Widerstandsfähigkeit bei.',

      'Section-2 title': 'Gruppentrainings.',
      'Section-2 text':
        'Das Boxtraining in der Gruppe schafft eine Atmosphäre der Unterstützung und des Teamworks. Die Teilnehmer überwinden Schwierigkeiten gemeinsam, motivieren sich gegenseitig und erreichen neue sportliche Höchstleistungen. Die Kombination aus Teamwork, Motivation und gemeinsamen Herausforderungen treibt alle an und hilft jedem Teilnehmer, neue sportliche Höchstleistungen zu erzielen. Das Gruppenumfeld verstärkt Ihre Bemühungen und beschleunigt Ihre Fortschritte.',

      'Section-3 title': 'Private Trainingseinheiten.',
      'Section-3 text':
        'Це індивідуальний підхід до ваших цілей. Ми пропонуємо приватні тренування з боксу, адаптовані до ваших потреб і рівня підготовки. Наші досвідчені тренери допоможуть вам досягти найкращих результатів — від покращення фізичної форми до підготовки до змагань. Ми тренуємо боксерів, які прагнуть до спортивної кар`єри. Ви отримаєте всі необхідні навички та стратегії для успішного виступу на рингу. Професійний підхід до підготовки, включаючи стратегію бою, техніку, витривалість і ментальну підготовку.',

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

      'Support-Section-1 title': 'Vorteile der Zusammenarbeit',
      'Support-Section-1 text':
        'Moderne Herausforderungen:<br>Negative Auswirkungen der Entwicklung der Computerisierung und mobiler Technologien;<br>Erhöhung der Zeit, die junge Menschen in sozialen Netzwerken, Computer- und Handyspielen verbringen;<br>Rückgang der körperlichen Aktivität der Bevölkerung;<br>Stärkung der Rolle des Sports, Prävention physischer und psychischer Krankheiten;<br>Österreich nicht bei den Olympischen Spielen im Boxprogramm vertreten.<br>Geplanter positiver Effekt durch die Eröffnung eines Boxclubs:<br>a) Einbindung von Kindern und Jugendlichen in Klagenfurt und den umliegenden Städten in den Boxsport;<br>b) Verbesserung der körperlichen und geistigen Gesundheit der Bevölkerung;<br>c) Mindestinvestitionen in finanzieller und materieller Hinsicht;<br>d) Förderung lokaler österreichischer Boxmeister, Erhöhung des Status und der Anerkennung;<br>e) Entwicklung des olympischen Sports in der Region mit weiterer Vertretung Österreichs in der Region prestigeträchtige europäische und weltweite Turniere.',

      'Support-Section-2 title': 'Unsere Ergebnisse',

      'Support-Section-2 text':
        'Seit Januar 2023 unterstützen wir Trainer von Boxclubs (Klagenfurter Boxverein). Wahrend dieser Zeit:<br>Еrhob den Meister von Österreich 2024.<br>Erhöhung der Anzahl der Auszubildenden im Verein (von 20 Personen pro Trainingseinheit auf 35-40 Personen).<br>Hat dazu beigetragen, den Klagenfurter Boxverein unter die TOP 3 Boxvereine in Österreich zu bringen (Statistik auf Ergebnisse der Österreichischen Meisterschaft)',

      'Support-Section-3 title': 'Was brauchen wir',
      'Support-Section-3 text':
        'In der Anfangsphase der Entwicklung des Boxclubs Wir benötigen folgende Unterstützung:<br>Zahlung der Kosten für die Anmietung von Räumlichkeiten, die für die Unterbringung eines Boxclubs geeignet sind die folgenden Eigenschaften:<br>- Hauptraum zum Aufstellen des Rings, der Taschen, des Aufwärmbereichs und des Funktionsbereichs Schulung<br>- 250-350 m²;<br>- Zwei Umkleidekabinen;<br>- Zwei Duschräume;<br>- Toilette;<br>- Coachingraum für Trainer – 15-20 м²;<br>- Lagerraum für Ausrüstung – 10 м²;<br>- Praktische Lage an Orten, an denen sich viele Menschen aufhalten.- Teure Ausrüstung (ca. 6500 Euro). Ring (ca. 12.000 Euro).Alle anderen Ausgaben im Zusammenhang mit der Bezahlung von Trainern, der Reinigung und dem Kauf anderer Ausrüstung, Werbung, Pflege sozialer Seiten usw. zahlen wir.',

      Questions: 'HAVE QUESTIONS?',
      'Our Team': 'YOUR TRAINERS',
      'Our Training': 'OUR TRAINING',
      'Support Us': 'SUPPORT US',

      'or you can contact us via': 'oder Sie können uns über',
      Send: 'Abschicken',
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
