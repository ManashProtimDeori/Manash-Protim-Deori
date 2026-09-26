export type PortraitSlot = {
  src: string;
  alt: string;
  objectPosition: string;
  label: string;
};

export type ProfessionalMoment = {
  id: string;
  enabled: boolean;
  image: string;
  aspect: 'portrait' | 'landscape' | 'wide' | 'square';
  title: string;
  date: string;
  location: string;
  context: string;
  alt: string;
};

export const personalMedia = {
  profiles: {
    main: {
      src: '/images/profile/profile-main.jpg',
      alt: 'Portrait of Manash Protim Deori',
      objectPosition: '50% 30%',
      label: 'Primary portrait',
    } satisfies PortraitSlot,
    about: {
      src: '/images/profile/profile-about.jpg',
      alt: 'Manash Protim Deori in a professional setting',
      objectPosition: '50% 35%',
      label: 'About portrait',
    } satisfies PortraitSlot,
  },
  moments: [
    {
      id: 'moment-01',
      enabled: false,
      image: '/images/events/event-01.jpg',
      aspect: 'portrait',
      title: '',
      date: '',
      location: '',
      context: '',
      alt: '',
    },
    {
      id: 'moment-02',
      enabled: false,
      image: '/images/events/event-02.jpg',
      aspect: 'wide',
      title: '',
      date: '',
      location: '',
      context: '',
      alt: '',
    },
    {
      id: 'moment-03',
      enabled: false,
      image: '/images/events/event-03.jpg',
      aspect: 'landscape',
      title: '',
      date: '',
      location: '',
      context: '',
      alt: '',
    },
    {
      id: 'moment-04',
      enabled: false,
      image: '/images/events/event-04.jpg',
      aspect: 'square',
      title: '',
      date: '',
      location: '',
      context: '',
      alt: '',
    },
    {
      id: 'moment-05',
      enabled: false,
      image: '/images/events/event-05.jpg',
      aspect: 'portrait',
      title: '',
      date: '',
      location: '',
      context: '',
      alt: '',
    },
    {
      id: 'moment-06',
      enabled: false,
      image: '/images/events/event-06.jpg',
      aspect: 'wide',
      title: '',
      date: '',
      location: '',
      context: '',
      alt: '',
    },
  ] satisfies ProfessionalMoment[],
};
