// Contenido de la landing. Edita aquí los textos y datos; los componentes solo los muestran.
import cobius from '../assets/projects/cobius.png';
import iseisa from '../assets/projects/iseisa.png';
import nacar from '../assets/projects/nacar.png';
import umbra from '../assets/projects/umbra.png';

export const site = {
  name: 'Moriah Studio',
  title: 'Moriah Studio · Diseño web, automatización y software a la medida',
  description:
    'Creamos sitios web que atraen clientes, automatizamos las tareas que te quitan tiempo y desarrollamos el sistema que tu negocio necesita.',
  // Dominio final, sin "/" al final (ej. 'https://moriah.studio'). Vacío = aún no hay dominio.
  url: '',
  // Número con código de país (52 = México), sin "+" ni espacios
  whatsapp: '529141186427',
  whatsappMessage: 'Hola Moriah Studio, me interesa cotizar un proyecto.',
  email: 'roman.madrigal.dev@gmail.com',
  social: {
    facebook: 'https://www.facebook.com/share/1DXZSEi5Nx/',
    linkedin: 'https://www.linkedin.com/in/roman-madrigal',
  },
};

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const nav = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Preguntas', href: '#faq' },
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
] as const;

export const projects = [
  {
    client: 'COBIUS',
    type: 'Proyecto real',
    category: 'Sitio web institucional',
    description:
      'Sitio para una ONG de conservación ambiental en Tabasco, con secciones de proyectos, boletín, biblioteca digital y donaciones.',
    url: 'https://cobius.org/',
    image: cobius,
  },
  {
    client: 'ISEISA Power',
    type: 'Proyecto real',
    category: 'Sitio web corporativo',
    description:
      'Sitio para una empresa de ingeniería eléctrica y mantenimiento mecánico en Tabasco, con presentación de la empresa, servicios y contacto.',
    url: 'https://iseisa.mx/',
    image: iseisa,
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

export const steps = [
  { title: 'Descubrimiento', description: 'Una llamada para entender tu negocio, tus clientes y tus metas.' },
  { title: 'Propuesta', description: 'Te enviamos alcance, tiempos y precio claros. Sin sorpresas.' },
  { title: 'Diseño y desarrollo', description: 'Construimos contigo, con revisiones en cada etapa.' },
  { title: 'Lanzamiento', description: 'Publicamos, medimos y te enseñamos a sacarle provecho.' },
];

export const faqs = [
  {
    question: '¿Cuánto cuesta un proyecto?',
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
