
import { Language } from '../types';

interface TranslationSchema {
  sidebar: {
    overview: string;
    pedestrian: string;
    traffic: string;
    analytics: string;
    status: string;
    online: string;
    optimization: string;
  };
  header: {
    overview: string;
    pedestrian: string;
    traffic: string;
    analytics: string;
    hub: string;
    deploy: string;
  };
  overview: {
    commandCenter: string;
    control: string;
    adaptiveTraffic: string;
    adaptiveDesc: string;
    v2i: string;
    v2iDesc: string;
    envSensors: string;
    healthy: string;
    live: string;
  };
  pedestrian: {
    title: string;
    placeholder: string;
    quietness: string;
    greenery: string;
    air: string;
    recommended: string;
    ready: string;
    samples: string[];
    liveMap: string;
    currentPos: string;
    tracking: string;
  };
  traffic: {
    signalTitle: string;
    busTitle: string;
    v2x: string;
    v2xDesc: string;
    manage: string;
  };
  analytics: {
    trafficTitle: string;
    airTitle: string;
    co2: string;
    transit: string;
    citizen: string;
    efficiency: string;
    tons: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    sidebar: {
      overview: 'City Overview',
      pedestrian: 'Pedestrian AI',
      traffic: 'Smart Traffic',
      analytics: 'Analytics',
      status: 'System Status',
      online: 'Almaty Center Online',
      optimization: 'Optimization active'
    },
    header: {
      overview: 'Golden Square Operations',
      pedestrian: 'Pedestrian Environmental Routing',
      traffic: 'Smart Traffic Infrastructure',
      analytics: 'System Performance Analytics',
      hub: 'Almaty City Hub',
      deploy: 'Deploy Patch'
    },
    overview: {
      commandCenter: 'Real-time Command Center: Golden Square',
      control: 'AI City Control',
      adaptiveTraffic: 'Adaptive Traffic Management',
      adaptiveDesc: 'Analyzing 42 camera feeds. Adjusting green light phases for Abylai Khan Ave.',
      v2i: 'V2I Priority Protocol',
      v2iDesc: 'Priority granted at Abay/Kaldajakov intersection. Expected time save: 45s.',
      envSensors: 'Env Sensors PM2.5',
      healthy: 'Healthy',
      live: 'LIVE'
    },
    pedestrian: {
      title: 'Pedestrian Environmental AI',
      placeholder: "Try: 'Walk from Panfilov to Abylai Khan through the greenest path'",
      quietness: 'Quietness',
      greenery: 'Greenery',
      air: 'Air Quality',
      recommended: 'Recommended Intelligent Path',
      ready: 'Ready to plan your next environment-aware walk in Almaty.',
      samples: ['Quiet way to Kok Tobe', 'Greenest path to Astana Square'],
      liveMap: 'Live Eco-Map',
      currentPos: 'Current Position',
      tracking: 'GPS Active'
    },
    traffic: {
      signalTitle: 'Smart Signal Control',
      busTitle: 'Public Transport Matrix',
      v2x: 'V2X Digital Corridor',
      v2xDesc: 'Real-time synchronization with Almaty bus fleet. Automatic priority extension for late vehicles.',
      manage: 'Manage Digital Corridors'
    },
    analytics: {
      trafficTitle: 'Traffic Reduction (Wait Time)',
      airTitle: 'Air Quality Improvement',
      co2: 'CO2 Saved',
      transit: 'Public Transit Priority',
      citizen: 'Citizen Rating',
      efficiency: 'efficiency',
      tons: 'tons'
    }
  },
  ru: {
    sidebar: {
      overview: 'Обзор города',
      pedestrian: 'Пешеходный ИИ',
      traffic: 'Умный трафик',
      analytics: 'Аналитика',
      status: 'Статус системы',
      online: 'Центр Алматы онлайн',
      optimization: 'Оптимизация активна'
    },
    header: {
      overview: 'Операции "Золотого квадрата"',
      pedestrian: 'Эко-навигация пешеходов',
      traffic: 'Инфраструктура Smart Traffic',
      analytics: 'Аналитика производительности',
      hub: 'Сити-хаб Алматы',
      deploy: 'Развернуть патч'
    },
    overview: {
      commandCenter: 'Центр управления: Золотой квадрат',
      control: 'AI City Control',
      adaptiveTraffic: 'Адаптивное управление трафиком',
      adaptiveDesc: 'Анализ 42 камер. Настройка фаз светофоров на пр. Абылай хана.',
      v2i: 'Протокол приоритета V2I',
      v2iDesc: 'Приоритет на перекрестке Абая/Калдаякова. Экономия: 45с.',
      envSensors: 'Датчики среды PM2.5',
      healthy: 'В норме',
      live: 'ЭФИР'
    },
    pedestrian: {
      title: 'Пешеходный Эко-ИИ',
      placeholder: "Напр.: 'Проведи меня от Панфилова до Абая по самому зеленому пути'",
      quietness: 'Тишина',
      greenery: 'Зелень',
      air: 'Воздух',
      recommended: 'Рекомендуемый интеллектуальный путь',
      ready: 'Готов спланировать вашу следующую прогулку по Алматы.',
      samples: ['Тихий путь к Кок-Тобе', 'Самый зеленый путь к пл. Астана'],
      liveMap: 'Живая эко-карта',
      currentPos: 'Ваше местоположение',
      tracking: 'GPS Активен'
    },
    traffic: {
      signalTitle: 'Умное управление сигналами',
      busTitle: 'Матрица общественного транспорта',
      v2x: 'Цифровой коридор V2X',
      v2xDesc: 'Синхронизация с автобусным парком Алматы. Приоритет для опаздывающего транспорта.',
      manage: 'Управление коридорами'
    },
    analytics: {
      trafficTitle: 'Снижение пробок (ожидание)',
      airTitle: 'Улучшение качества воздуха',
      co2: 'Сэкономлено CO2',
      transit: 'Приоритет ОТ',
      citizen: 'Рейтинг горожан',
      efficiency: 'эффективность',
      tons: 'тонн'
    }
  },
  kk: {
    sidebar: {
      overview: 'Қала шолуы',
      pedestrian: 'Жаяу жүргінші AI',
      traffic: 'Ақылды трафик',
      analytics: 'Аналитика',
      status: 'Жүйе күйі',
      online: 'Алматы орталығы желіде',
      optimization: 'Оңтайландыру белсенді'
    },
    header: {
      overview: '"Алтын шаршы" операциялары',
      pedestrian: 'Эко-жаяу жүргінші навигациясы',
      traffic: 'Smart Traffic инфрақұрылымы',
      analytics: 'Өнімділік аналитикасы',
      hub: 'Алматы Сити-хабы',
      deploy: 'Патчты орналастыру'
    },
    overview: {
      commandCenter: 'Басқару орталығы: Алтын шаршы',
      control: 'AI City Control',
      adaptiveTraffic: 'Бейімделген трафикті басқару',
      adaptiveDesc: '42 камераны талдау. Абылай хан даңғылындағы бағдаршам фазаларын реттеу.',
      v2i: 'V2I басымдық протоколы',
      v2iDesc: 'Абай/Қалдаяқов қиылысында басымдық берілді. Үнемдеу: 45с.',
      envSensors: 'Орта датчиктері PM2.5',
      healthy: 'Қалыпты',
      live: 'ТІКЕЛЕЙ'
    },
    pedestrian: {
      title: 'Жаяу жүргінші Эко-AI',
      placeholder: "Мысалы: 'Панфиловтан Абайға дейін ең жасыл жолмен жүргізші'",
      quietness: 'Тыныштық',
      greenery: 'Көгалдандыру',
      air: 'Ауа сапасы',
      recommended: 'Ұсынылатын зияткерлік жол',
      ready: 'Алматыдағы келесі эко-серуеніңізді жоспарлауға дайынмын.',
      samples: ['Көктөбеге тыныш жол', 'Астана алаңына ең жасыл жол'],
      liveMap: 'Тірі эко-карта',
      currentPos: 'Сіздің орналасқан жеріңіз',
      tracking: 'GPS Белсенді'
    },
    traffic: {
      signalTitle: 'Ақылды сигналды басқару',
      busTitle: 'Қоғамдық көлік матрицасы',
      v2x: 'V2X цифрлық дәлізі',
      v2xDesc: 'Алматы автобус паркімен нақты уақыттағы синхрондау. Кешігіп жатқан көліктерге басымдық.',
      manage: 'Дәліздерді басқару'
    },
    analytics: {
      trafficTitle: 'Кептелісті азайту (күту уақыты)',
      airTitle: 'Ауа сапасын жақсарту',
      co2: 'Үнемделген CO2',
      transit: 'Қоғамдық көлік басымдығы',
      citizen: 'Тұрғындар рейтингі',
      efficiency: 'тиімділік',
      tons: 'тонна'
    }
  }
};
