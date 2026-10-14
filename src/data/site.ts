// Contenido de la landing. Edita aquí los textos y datos; los componentes solo los muestran.
// La URL pública del sitio se configura en astro.config.mjs (`site`).
import type { ImageMetadata } from 'astro';
import profile from '../assets/about/profile.jpeg';
import biblia from '../assets/projects/biblia.png';
import cobius from '../assets/projects/cobius.png';
import invitacion from '../assets/projects/invitacion.png';
import iseisa from '../assets/projects/iseisa.png';
import nacar from '../assets/projects/nacar.png';
import porlaesquina from '../assets/projects/porlaesquina.png';
import umbra from '../assets/projects/umbra.png';

export const site = {
  name: 'Moriah Studio',
  title: 'Moriah Studio · Diseño web, automatización y software a la medida',
  description:
    'Creamos sitios web que atraen clientes, automatizamos las tareas que te quitan tiempo y desarrollamos el sistema que tu negocio necesita.',
  // Número con código de país (52 = México), sin "+" ni espacios
  whatsapp: '529141186427',
  whatsappMessage: 'Hola Moriah Studio, me interesa cotizar un proyecto.',
  email: 'roman.madrigal.dev@gmail.com',
  social: {
    facebook: 'https://www.facebook.com/share/1DXZSEi5Nx/',
    linkedin: 'https://www.linkedin.com/in/roman-madrigal',
  },
};

export const whatsappLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const whatsappUrl = whatsappLink(site.whatsappMessage);

export const nav = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Sobre mí', href: '/#nosotros' },
  { label: 'Proceso', href: '/#proceso' },
  { label: 'Preguntas', href: '/#faq' },
];

// Beneficios que se muestran bajo los botones del hero
export const highlights = [
  'Diseño adaptado a celular',
  'Optimizado para Google',
  'Trato directo con quien desarrolla',
];

export const services = [
  {
    icon: 'web',
    title: 'Diseño web',
    description:
      'Landing pages y sitios rápidos, adaptados a celular y optimizados para Google, pensados para convertir visitas en clientes.',
  },
  {
    icon: 'automation',
    title: 'Automatización',
    description:
      'Conectamos tus herramientas y automatizamos tareas repetitivas: respuestas, cotizaciones, recordatorios y reportes.',
  },
  {
    icon: 'custom',
    title: 'Desarrollo a la medida',
    description:
      'Sistemas, paneles y aplicaciones web hechos para la forma en que trabaja tu negocio, no al revés.',
  },
  {
    icon: 'invitation',
    title: 'Invitaciones digitales',
    description:
      'Invitaciones web para bodas, XV años, cumpleaños o cualquier evento, con cuenta regresiva, ubicación, música y confirmación por WhatsApp.',
  },
] as const;

type Testimonial = { quote: string; author: string; role: string };

type Project = {
  client: string;
  // 'Proyecto real' va en el grupo de clientes; el resto en "Proyectos propios y demos".
  type: 'Proyecto real' | 'Proyecto personal' | 'Demo';
  category: string;
  description: string;
  url: string;
  // Texto del enlace. Por defecto "Ver sitio".
  linkLabel?: string;
  image: ImageMetadata;
  // Solo testimonios reales. Si no hay, se omite y la tarjeta no muestra nada.
  testimonial?: Testimonial;
};

export const projects: Project[] = [
  {
    client: 'COBIUS',
    type: 'Proyecto real',
    category: 'Sitio web institucional',
    description:
      'Esta organización de conservación ambiental necesitaba difundir su trabajo y conseguir apoyo. Ahora publica sus boletines y actividades en un solo lugar y recibe donaciones desde su sitio.',
    url: 'https://cobius.org/',
    image: cobius,
  },
  {
    client: 'ISEISA Power',
    type: 'Proyecto real',
    category: 'Sitio web corporativo',
    description:
      'Esta empresa de ingeniería eléctrica y mantenimiento necesitaba mostrar su experiencia a clientes potenciales. Su sitio corporativo presenta sus servicios y trabajos para generar confianza antes del primer contacto.',
    url: 'https://iseisa.mx/',
    image: iseisa,
  },
  {
    // Evento real de un menor: sin enlace al sitio ni foto del niño (decisión de privacidad).
    client: 'Invitación de cumpleaños',
    type: 'Proyecto real',
    category: 'Invitación digital',
    description:
      'Invitación web con temática de futbol: cuenta regresiva, ubicación en el mapa, música, galería y confirmación de asistencia por WhatsApp.',
    url: whatsappLink('Hola Moriah Studio, me interesa una invitación digital para mi evento.'),
    linkLabel: 'Cotiza tu invitación',
    image: invitacion,
  },
  {
    client: 'Por la Esquina',
    type: 'Proyecto personal',
    category: 'Plataforma web',
    description:
      'Directorio gratuito de negocios locales: búsqueda por categoría y municipio, negocios cerca de ti y contacto directo por WhatsApp. Se instala como app en el celular.',
    url: 'https://porlaesquina.netlify.app/',
    image: porlaesquina,
  },
  {
    client: 'Biblia',
    type: 'Proyecto personal',
    category: 'Aplicación web',
    description:
      'App para leer y estudiar la Biblia con versículo del día, planes de lectura, diario, notas y estadísticas de progreso. Funciona sin conexión.',
    url: 'https://app-bibllia.netlify.app/',
    image: biblia,
  },
  {
    client: 'Umbra',
    type: 'Demo',
    category: 'Cafetería de especialidad',
    description: 'Sitio con carta, galería, reservación de mesas y pedidos para llevar.',
    url: 'https://cafeteria-umbra.netlify.app/',
    image: umbra,
  },
  {
    client: 'Nácar',
    type: 'Demo',
    category: 'Clínica dental',
    description: 'Sitio para clínica con tratamientos, equipo médico y solicitud de citas.',
    url: 'https://clinica-nacar.netlify.app/',
    image: nacar,
  },
];

// "Quién está detrás". La sección se muestra solo cuando `bio` tiene al menos un párrafo.
// Para la foto: guárdala en src/assets/ e impórtala arriba, igual que las capturas de proyectos.
export const about: {
  name: string;
  role: string;
  location: string;
  bio: string[];
  photo?: ImageMetadata;
} = {
  name: 'Román Madrigal',
  role: 'Fundador y desarrollador',
  location: 'Cunduacán, Tabasco',
  photo: profile,
  bio: [
    'Soy desarrollador web y fundé Moriah Studio para que los negocios pequeños tengan acceso a la misma tecnología que usan las grandes empresas: sitios rápidos, automatizaciones y sistemas hechos a su medida.',
    'Trabajo desde Cunduacán, Tabasco, con clientes de cualquier parte de México. Cuando me contratas, hablas directamente con quien diseña y programa tu proyecto: sin intermediarios ni respuestas genéricas.',
    'He desarrollado sitios para organizaciones como COBIUS e ISEISA Power, y en cada proyecto busco lo mismo: que tu negocio se vea profesional, reciba más contactos y pierda menos tiempo en tareas manuales.',
  ],
};

// Precios de referencia. Se muestran en la pregunta de costos solo si hay al menos uno.
// `detail` deja claro qué cubre cada precio, para evitar malentendidos con el cliente.
export const startingPrices: { service: string; detail: string; price: string }[] = [
  {
    service: 'Landing page',
    detail: 'Una página con tus servicios, ubicación y botón de WhatsApp.',
    price: 'desde $3,500 MXN',
  },
  {
    service: 'Sitio web',
    detail: 'Varias secciones o páginas: servicios, galería, contacto y más.',
    price: 'desde $6,500 MXN',
  },
  {
    service: 'Automatizaciones',
    detail: 'Respuestas, cotizaciones, recordatorios o reportes.',
    price: 'según el proceso',
  },
  {
    service: 'Desarrollo a la medida',
    detail: 'Sistemas, paneles y aplicaciones web.',
    price: 'cotización personalizada',
  },
  {
    service: 'Invitación digital',
    detail: 'Diseño de plantilla con tus datos, fotos, ubicación y confirmación por WhatsApp.',
    price: 'desde $300 MXN',
  },
  {
    service: 'Invitación personalizada',
    detail: 'Diseño temático hecho para tu evento, con galería y música.',
    price: 'desde $800 MXN',
  },
];

// Aclaración que se muestra debajo de la lista de precios.
export const pricesNote =
  'Precios de referencia en pesos mexicanos. El precio final depende del alcance y lo acordamos por escrito en la cotización antes de empezar. El dominio (.com o .mx) se paga aparte.';

// Datos para el Aviso de Privacidad
export const legal = {
  owner: 'Román Madrigal',
  // Domicilio para oír y recibir notificaciones. Mientras esté vacío se muestra solo la ciudad.
  address: 'Cunduacán, Tabasco, México',
  city: 'Tabasco, México',
  updated: '14 de octubre de 2026',
};

export const steps = [
  { title: 'Descubrimiento', description: 'Una llamada para entender tu negocio, tus clientes y tus metas.' },
  { title: 'Propuesta', description: 'Te enviamos alcance, tiempos y precio claros. Sin sorpresas.' },
  { title: 'Diseño y desarrollo', description: 'Construimos contigo, con revisiones en cada etapa.' },
  { title: 'Lanzamiento', description: 'Publicamos, medimos y te enseñamos a sacarle provecho.' },
];

export const faqs: { question: string; answer: string; showPrices?: boolean }[] = [
  {
    question: '¿Cuánto cuesta un proyecto?',
    showPrices: true,
    answer:
      'Depende del alcance. Después de una llamada para entender lo que necesitas, te enviamos una cotización detallada antes de empezar.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'Una landing page suele estar lista en pocas semanas; los sistemas a la medida se planean por etapas. Te damos fechas concretas en la propuesta.',
  },
  {
    question: '¿Qué puedo automatizar en mi negocio?',
    answer:
      'Respuestas frecuentes por WhatsApp, envío de cotizaciones, recordatorios de citas, reportes, o conectar formularios con hojas de cálculo y otras herramientas que ya usas.',
  },
  {
    question: '¿Qué necesito tener listo?',
    answer:
      'Solo una idea clara de lo que quieres lograr. Si ya tienes logo, textos o fotos, los usamos; si no, te ayudamos a definirlos.',
  },
];
