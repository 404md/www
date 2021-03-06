'use strict';

const commonJs = [
  'js/libs/jquery.min.js',
  'js/libs/parallax.min.js',
  'js/libs/jquery-mailchimp.min.js',
  'js/libs/slick-1.6.0.min.js',
  'js/main.js',
  'js/footer-carousel.js'
];
const commonStyles = [
  'styles/main.scss',
  'styles/libs/materialdesignicons.min.css',
  'styles/libs/slick-1.6.0.min.css',
  'styles/libs/slick-theme-1.6.0.min.css'
];
const watcherIgnorePatterns = ['\.idea', '\.git', 'bin', 'backend', 'build'];

module.exports = {
  server: {
    port: 8000,
    ignorePatterns: watcherIgnorePatterns
  },
  routes: {
    '/': {
      view: 'en/index.twig',
      vars: {
        title: '404Moldova | Coworking Space | Local Community'
      },
      assets: {
        'js/index.min.js': commonJs,
        'css/index.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ]
      }
    },
    '/pricing': {
      view: 'en/pricing.twig',
      vars: {
        page: 'Pricing',
        title: 'Pricing | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/coworking-bg.jpg'
      },
      assets: {
        'css/pricing.min.css': [
          ...commonStyles,
          'styles/pricing.scss',
          'styles/responsive.scss'
        ],
        'js/pricing.min.js': [
          ...commonJs,
          'js/coworking.js'
        ]
      }
    },
    '/events': {
      view: 'en/events.twig',
      vars: {
        page: 'Events',
        title: 'Events | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/events.jpg'
      },
      assets: {
        'css/events.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/events.min.js': [
          ...commonJs,
          'js/events.js'
        ]
      }
    },
    '/members': {
      view: 'en/members.twig',
      vars: {
        page: 'Members',
        title: 'Members | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/members.jpg'
      },
      assets: {
        'css/members.min.css': [
          ...commonStyles,
          'styles/members.scss',
          'styles/responsive.scss'
        ],
        'js/members.min.js': [
          ...commonJs,
          'js/members.js'
        ]
      }
    },
    '/media': {
      view: 'en/media.twig',
      vars: {
        title: 'Media &amp; Press | 404Moldova | Coworking Space | Local Community'
      },
      assets: {
        'css/media.min.css': [
          ...commonStyles,
          'styles/media.scss',
          'styles/responsive.scss'
        ],
        'js/media.min.js': commonJs
      }
    },
    '/gallery': {
      view: 'en/gallery.twig',
      vars: {
        page: 'Gallery',
        title: 'Photo Gallery | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/gallery.jpg'
      },
      assets: {
        'css/gallery.min.css': [
          ...commonStyles,
          'styles/responsive.scss',
          'styles/gallery.scss'
        ],
        'js/gallery.min.js': [
          ...commonJs,
          'js/gallery.js'
        ]
      }
    },
    '/contact': {
      view: 'en/contact.twig',
      vars: {
        page: 'Contact us',
        title: 'Contact | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/contacts.jpg'
      },
      assets: {
        'css/contact.min.css': [
          ...commonStyles,
          'styles/contacts.scss',
          'styles/responsive.scss'
        ],
        'js/contact.min.js': [
          ...commonJs,
          'js/forms.js'
        ]
      }
    },
    '/tour': {
      view: 'en/tour.twig',
      vars: {
        page: 'Book a tour',
        title: 'Book a Tour | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/book.jpg'
      },
      assets: {
        'css/tour.min.css': [
          ...commonStyles,
          'styles/tour.scss',
          'styles/responsive.scss'
        ],
        'js/tour.min.js': [
          ...commonJs,
          'js/forms.js'
        ]
      }
    },
    '/thank-you': {
      view: 'en/thank-you.twig',
      vars: {
        page: 'Thank you!',
        title: 'Thank you! | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/book.jpg'
      },
      assets: {
        'css/thank-you.min.css': [
          ...commonStyles,
          'styles/thank-you.scss',
          'styles/responsive.scss'
        ],
        'js/thank-you.min.js': commonJs
      }
    },
    '/terms': {
      view: 'en/terms.twig',
      vars: {
        page: 'Terms of use',
        title: 'Terms of Use | 404Moldova | Coworking Space | Local Community',
        imagePath: 'img/terms.jpg'
      },
      assets: {
        'css/terms.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/terms.min.js': commonJs
      }
    },
    '/ru': {
      view: 'ru/index.twig',
      vars: {
        title: '404Moldova | Коворкинг | Местное сообщество'
      },
      assets: {
        'js/index.min.js': commonJs,
        'css/index.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ]
      }
    },
    '/ru/pricing': {
      view: 'ru/pricing.twig',
      vars: {
        page: 'Цены',
        title: 'Цены | 404Moldova | Коворкинг | Местное Cообщество',
        imagePath: 'img/coworking-bg.jpg'
      },
      assets: {
        'css/pricing.min.css': [
          ...commonStyles,
          'styles/pricing.scss',
          'styles/responsive.scss'
        ],
        'js/pricing.min.js': [
          ...commonJs,
          'js/coworking.js'
        ]
      }
    },
    '/ru/events': {
      view: 'ru/events.twig',
      vars: {
        page: 'События',
        title: 'События | 404Moldova | Коворкинг | Местное Сообщество',
        imagePath: 'img/events.jpg'
      },
      assets: {
        'css/events.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/events.min.js': [
          ...commonJs,
          'js/events.js'
        ]
      }
    },
    '/ru/members': {
      view: 'ru/members.twig',
      vars: {
        page: 'Участники',
        title: 'Участники | 404Moldova | Коворкинг | Местное Сообщество',
        imagePath: 'img/members.jpg'
      },
      assets: {
        'css/members.min.css': [
          ...commonStyles,
          'styles/members.scss',
          'styles/responsive.scss'
        ],
        'js/members.min.js': [
          ...commonJs,
          'js/members.js'
        ]
      }
    },
    '/ru/media': {
      view: 'ru/media.twig',
      vars: {
        title: 'Пресса | 404Moldova | Коворкинг | Местное Сообщество'
      },
      assets: {
        'css/media.min.css': [
          ...commonStyles,
          'styles/media.scss',
          'styles/responsive.scss'
        ],
        'js/media.min.js': commonJs
      }
    },
    '/ru/gallery': {
      view: 'ru/gallery.twig',
      vars: {
        page: 'Галерея',
        title: 'Галерея | 404Moldova | Коворкинг | Местное Сообщество',
        imagePath: 'img/gallery.jpg'
      },
      assets: {
        'css/gallery.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/gallery.min.js': [
          ...commonJs,
          'js/gallery.js'
        ]
      }
    },
    '/ru/contact': {
      view: 'ru/contact.twig',
      vars: {
        page: 'Свяжитесь с нами',
        title: 'Свяжитесь с нами | 404Moldova | Коворкинг | Местное Сообщество',
        imagePath: 'img/contacts.jpg'
      },
      assets: {
        'css/contact.min.css': [
          ...commonStyles,
          'styles/contacts.scss',
          'styles/responsive.scss'
        ],
        'js/contact.min.js': [
          ...commonJs,
          'js/forms.js'
        ]
      }
    },
    '/ru/tour': {
      view: 'ru/tour.twig',
      vars: {
        page: 'Забронируйте Обход',
        title: 'Забронируйте Обход | 404Moldova | Коворкинг | Местное Сообщество',
        imagePath: 'img/book.jpg'
      },
      assets: {
        'css/tour.min.css': [
          ...commonStyles,
          'styles/tour.scss',
          'styles/responsive.scss'
        ],
        'js/tour.min.js': [
          ...commonJs,
          'js/forms.js'
        ]
      }
    },
    '/ru/thank-you': {
      view: 'ru/thank-you.twig',
      vars: {
        page: 'Спасибо!',
        title: 'Спасибо! | 404Moldova | Коворкинг | Местное Сообщество',
        imagePath: 'img/book.jpg'
      },
      assets: {
        'css/thank-you.min.css': [
          ...commonStyles,
          'styles/thank-you.scss',
          'styles/responsive.scss'
        ],
        'js/thank-you.min.js': commonJs
      }
    },
    '/ru/terms': {
      view: 'ru/terms.twig',
      vars: {
        page: 'Условия использования',
        title: 'Условия Использования | 404Moldova | Коворкинг | Местное Сообщество',
        imagePath: 'img/terms.jpg'
      },
      assets: {
        'css/terms.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/terms.min.js': commonJs
      }
    },
    '/ro': {
      view: 'ro/index.twig',
      vars: {
        title: '404Moldova | Spațiu de Coworking | Comunitate Locală'
      },
      assets: {
        'js/index.min.js': commonJs,
        'css/index.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ]
      }
    },
    '/ro/pricing': {
      view: 'ro/pricing.twig',
      vars: {
        page: 'Prețuri',
        title: 'Prețuri | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/coworking-bg.jpg'
      },
      assets: {
        'css/pricing.min.css': [
          ...commonStyles,
          'styles/pricing.scss',
          'styles/responsive.scss'
        ],
        'js/pricing.min.js': [
          ...commonJs,
          'js/coworking.js'
        ]
      }
    },
    '/ro/events': {
      view: 'ro/events.twig',
      vars: {
        page: 'Evenimente',
        title: 'Evenimente | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/events.jpg'
      },
      assets: {
        'css/events.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/events.min.js': [
          ...commonJs,
          'js/events.js'
        ]
      }
    },
    '/ro/members': {
      view: 'ro/members.twig',
      vars: {
        page: 'Membri',
        title: 'Membri | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/members.jpg'
      },
      assets: {
        'css/members.min.css': [
          ...commonStyles,
          'styles/members.scss',
          'styles/responsive.scss'
        ],
        'js/members.min.js': [
          ...commonJs,
          'js/members.js'
        ]
      }
    },
    '/ro/media': {
      view: 'ro/media.twig',
      vars: {
        title: 'Media și Presa | 404Moldova | Spațiu de Coworking | Comunitate Locală'
      },
      assets: {
        'css/media.min.css': [
          ...commonStyles,
          'styles/media.scss',
          'styles/responsive.scss'
        ],
        'js/media.min.js': commonJs
      }
    },
    '/ro/gallery': {
      view: 'ro/gallery.twig',
      vars: {
        page: 'Galerie',
        title: 'Galerie | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/gallery.jpg'
      },
      assets: {
        'css/gallery.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/gallery.min.js': [
          ...commonJs,
          'js/gallery.js'
        ]
      }
    },
    '/ro/contact': {
      view: 'ro/contact.twig',
      vars: {
        page: 'Contactează-ne',
        title: 'Contactează-ne | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/contacts.jpg'
      },
      assets: {
        'css/contact.min.css': [
          ...commonStyles,
          'styles/contacts.scss',
          'styles/responsive.scss'
        ],
        'js/contact.min.js': [
          ...commonJs,
          'js/forms.js'
        ]
      }
    },
    '/ro/tour': {
      view: 'ro/tour.twig',
      vars: {
        page: 'Rezervați o vizită',
        title: 'Rezervați o vizită | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/book.jpg'
      },
      assets: {
        'css/tour.min.css': [
          ...commonStyles,
          'styles/tour.scss',
          'styles/responsive.scss'
        ],
        'js/tour.min.js': [
          ...commonJs,
          'js/forms.js'
        ]
      }
    },
    '/ro/thank-you': {
      view: 'ro/thank-you.twig',
      vars: {
        page: 'Vă mulțumim!',
        title: 'Vă mulțumim! | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/book.jpg'
      },
      assets: {
        'css/thank-you.min.css': [
          ...commonStyles,
          'styles/thank-you.scss',
          'styles/responsive.scss'
        ],
        'js/thank-you.min.js': commonJs
      }
    },
    '/ro/terms': {
      view: 'ro/terms.twig',
      vars: {
        page: 'Termeni de Utilizare',
        title: 'Termeni de Utilizare | 404Moldova | Spațiu de Coworking | Comunitate Locală',
        imagePath: 'img/terms.jpg'
      },
      assets: {
        'css/terms.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/terms.min.js': commonJs
      }
    },
    '/404': {
      view: '404.twig',
      vars: {
        title: '404 not found | 404Moldova | Coworking Space | Local Community'
      },
      assets: {
        'css/404.min.css': [
          ...commonStyles,
          'styles/responsive.scss'
        ],
        'js/404.min.js': [
          ...commonJs,
          'js/libs/bodymovin.min.js',
          'js/animations.js'
        ]
      }
    }
  }
};
