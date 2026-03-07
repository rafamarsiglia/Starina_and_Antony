import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Download, 
  CheckCircle, 
  ChevronDown,
  ExternalLink,
  Heart,
  Languages,
  Hotel
} from 'lucide-react';

// --- Constants ---
const HERO_IMAGE = "http://thedominguezjerez.com/wp-content/uploads/2026/01/DSC09176-copia-scaled.webp";
const LOGO_WHITE = "http://thedominguezjerez.com/wp-content/uploads/2026/02/logo_Starina_Anthony_white.png";
const RSVP_LINK = "https://thedominguezjerez.com/#rsvp";

// --- Translations ---
const translations = {
  en: {
    hero: {
      invited: "YOU ARE INVITED",
      and: "and",
      date: "JUNE 06, 2026"
    },
    intro: "In love there are no distances, only hearts that beat at the same rhythm. We invite you to be part of our beginning.",
    locations: {
      title: "Event Locations",
      subtitle: "Where & When",
      ceremony: "Ceremony - Church",
      reception: "Reception",
      hotel: "Suggested Hotel",
      timeCeremony: "3:00 PM",
      timeReception: "Cocktail 5:00 PM / Reception 6:00 PM - 11:00 PM",
      viewMap: "View on Google Maps",
      bookNow: "BOOK UNDER THE DOMINGUEZJEREZ WEDDING",
      ceremonyIntro: "Our wedding will begin with a religious ceremony to start our marriage receiving God's blessing. Children are welcome to join us during the mass.",
      receptionIntro: "We want to celebrate the beginning of our new stage with you and we would love for you to enjoy this celebration with us. Little ones can stay at home, as there will be no children at the party."
    },
    dressCode: {
      title: "Formal Dress Code",
      subtitle: "Our Aesthetic",
      suggestions: "Suggestions: Pastel Tones",
      blocked: "Blocked Colors",
      colors: ["Mint", "Sky", "Lavender", "Apricot", "Yellow", "Lilac"],
      blockedColors: ["Pink", "White", "Black"]
    },
    invitation: {
      title: "Your Invitation",
      subtitle: "Save the Date",
      heading: "Keep the details with you",
      description: "Download the digital version of our invitation to have all location and schedule details handy on your device.",
      download: "Download Invitation",
      image: "http://thedominguezjerez.com/wp-content/uploads/2026/03/invitacion-espanol-starina_final_english-scaled.webp"
    },
    rsvp: {
      title: "Confirm Attendance",
      subtitle: "RSVP",
      deadline: "Deadline",
      deadlineDate: "April 15, 2026",
      description: "Please confirm your attendance before the indicated date so we can organize every detail of this special day.",
      confirm: "Confirm Now"
    },
    footer: "Made with love"
  },
  es: {
    hero: {
      invited: "ESTÁS INVITADO",
      and: "y",
      date: "06 DE JUNIO, 2026"
    },
    intro: "En el amor no hay distancias, solo corazones que laten al mismo ritmo. Te invitamos a ser parte de nuestro comienzo.",
    locations: {
      title: "Lugares del Evento",
      subtitle: "Dónde & Cuándo",
      ceremony: "Ceremonia - Iglesia",
      reception: "Recepción",
      hotel: "Hotel Sugerido",
      timeCeremony: "3:00 PM",
      timeReception: "Cóctel 5:00 PM / Recepción 6:00 PM - 11:00 PM",
      viewMap: "Ver en Google Maps",
      bookNow: "RESERVAR BAJO LA BODA DOMINGUEZJEREZ",
      ceremonyIntro: "Nuestra boda iniciará con una ceremonia religiosa para comenzar nuestro matrimonio recibiendo la bendición de Dios. Los niños son bienvenidos a la misa.",
      receptionIntro: "Queremos celebrar contigo el inicio de nuestra nueva etapa y nos gustaría que disfrutes junto a nosotros esta celebración. Los pequeños pueden quedarse en casa, recordando que no habrá niños en el party."
    },
    dressCode: {
      title: "Código de Vestimenta Formal",
      subtitle: "Nuestra Estética",
      suggestions: "Sugerencias: Tonos Pastel",
      blocked: "Colores Bloqueados",
      colors: ["Menta", "Cielo", "Lavanda", "Damasco", "Amarillo", "Lila"],
      blockedColors: ["Rosado", "Blanco", "Negro"]
    },
    invitation: {
      title: "Tu Invitación",
      subtitle: "Reserva la Fecha",
      heading: "Lleva los detalles contigo",
      description: "Descarga la versión digital de nuestra invitación para tener todos los detalles de locación y horarios a mano.",
      download: "Descargar Invitación",
      image: "http://thedominguezjerez.com/wp-content/uploads/2026/03/invitacion-espanol-starina_final_espanol-scaled.webp"
    },
    rsvp: {
      title: "Confirmar Asistencia",
      subtitle: "RSVP",
      deadline: "Fecha Límite",
      deadlineDate: "15 de Abril, 2026",
      description: "Por favor, confirma tu asistencia antes de la fecha indicada para poder organizar cada detalle de este día especial.",
      confirm: "Confirmar Ahora"
    },
    footer: "Hecho con amor"
  }
};

// --- Components ---

const SectionTitle = ({ title, subtitle, date }: { title: string; subtitle?: string; date?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-center mb-16"
  >
    {subtitle && <span className="serif text-wedding-gold text-2xl block mb-2 uppercase tracking-widest">{subtitle}</span>}
    {date && <span className="serif text-wedding-gold text-5xl md:text-7xl block mb-6 font-light">{date}</span>}
    <h2 className="sans text-4xl md:text-5xl font-light tracking-tight uppercase">{title}</h2>
    <div className="divider-gold" />
  </motion.div>
);

const LocationCard = ({ 
  type, 
  name, 
  address, 
  time, 
  mapSrc, 
  mapLink,
  viewMapText,
  actionLink,
  actionText,
  icon: Icon = MapPin
}: { 
  type: string; 
  name: string; 
  address: string; 
  time: string; 
  mapSrc: string; 
  mapLink: string;
  viewMapText: string;
  actionLink?: string;
  actionText?: string;
  icon?: any;
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="wedding-card p-8 rounded-2xl flex flex-col h-full"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-wedding-cream flex items-center justify-center text-wedding-gold border border-wedding-gold/20">
        <Icon size={20} />
      </div>
      <div>
        <span className="serif text-[10px] uppercase tracking-widest text-wedding-gold font-bold">{type}</span>
        <h3 className="sans text-xl md:text-2xl font-semibold tracking-tight uppercase">{name}</h3>
      </div>
    </div>
    
    <div className="space-y-4 mb-8 flex-grow">
      <p className="sans text-sm text-wedding-gray leading-relaxed font-medium">{address}</p>
      <div className="flex items-center gap-2 text-wedding-gray">
        <Clock size={16} className="text-wedding-gold" />
        <span className="sans text-sm font-semibold">{time}</span>
      </div>
    </div>

    <div className="rounded-xl overflow-hidden mb-6 h-48 bg-wedding-light-gray border border-wedding-gold/10">
      <iframe 
        src={mapSrc} 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    <div className="flex flex-col gap-3">
      <a 
        href={mapLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn-outline w-full"
      >
        {viewMapText} <ExternalLink size={14} />
      </a>
      {actionLink && actionText && (
        <a 
          href={actionLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary w-full text-[10px]"
        >
          {actionText} <ExternalLink size={14} />
        </a>
      )}
    </div>
  </motion.div>
);

const App = () => {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const t = translations[lang];

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-wedding-cream selection:bg-wedding-gold selection:text-white">
      {/* Language Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/80 backdrop-blur-md border border-wedding-gold/20 p-1 rounded-full shadow-lg flex items-center gap-1">
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${lang === 'en' ? 'bg-wedding-gold text-white' : 'text-wedding-gray hover:bg-wedding-cream'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('es')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${lang === 'es' ? 'bg-wedding-gold text-white' : 'text-wedding-gray hover:bg-wedding-cream'}`}
          >
            ES
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={HERO_IMAGE} 
            alt="Starina & Anthony" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 text-center text-white px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="sans text-xs md:text-sm uppercase tracking-[0.5em] mb-8 block font-semibold">{t.hero.invited}</span>
            
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              src={LOGO_WHITE} 
              alt="Starina & Anthony Logo" 
              className="w-64 md:w-[32rem] h-auto mb-10"
              referrerPolicy="no-referrer"
            />

            <div className="w-16 h-[1px] bg-white/40 mx-auto my-10" />
            <p className="serif text-3xl md:text-5xl tracking-[0.2em] font-light">{t.hero.date}</p>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70"
        >
          <ChevronDown size={32} strokeWidth={1} />
        </motion.div>
      </section>

      {/* Intro Text */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Heart className="text-wedding-gold mx-auto mb-10" size={32} strokeWidth={1} />
          <p className="serif text-2xl md:text-4xl leading-relaxed text-wedding-gray font-light">
            "{t.intro}"
          </p>
        </motion.div>
      </section>

      {/* Locations Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title={t.locations.title} 
            subtitle={t.locations.subtitle} 
            date={t.hero.date}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
              <p className="sans text-sm text-wedding-gray text-center font-medium leading-relaxed min-h-[4rem] flex items-center justify-center">
                {t.locations.ceremonyIntro}
              </p>
              <LocationCard 
                type={t.locations.ceremony}
                name="St. Agatha Catholic Church"
                address="1111 SW 107th Ave, Miami, FL 33174"
                time={t.locations.timeCeremony}
                mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.456671424755!2d-80.36940382375823!3d25.75545807735749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9be94f576378d%3A0x889a2729a9972740!2sSt.%20Agatha%20Catholic%20Church!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                mapLink="https://www.google.com/maps/search/?api=1&query=St.+Agatha+Catholic+Church+1111+SW+107th+Ave+Miami+FL+33174"
                viewMapText={t.locations.viewMap}
              />
            </div>
            
            <div className="flex flex-col gap-6">
              <p className="sans text-sm text-wedding-gray text-center font-medium leading-relaxed min-h-[4rem] flex items-center justify-center">
                {t.locations.receptionIntro}
              </p>
              <LocationCard 
                type={t.locations.reception}
                name="94th Aero Squadron Restaurant"
                address="1395 NW 57th Ave, Miami, FL 33126"
                time={t.locations.timeReception}
                mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.848834473852!2d-80.2831418237576!3d25.7755580773456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9c9f576378d%3A0x889a2729a9972740!2s94th+Aero+Squadron+Restaurant!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                mapLink="https://www.google.com/maps/search/?api=1&query=94th+Aero+Squadron+Restaurant+1395+NW+57th+Ave+Miami+FL+33126"
                viewMapText={t.locations.viewMap}
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="min-h-[4rem] hidden md:block" />
              <LocationCard 
                type={t.locations.hotel}
                name="Hilton Miami Airport Blue Lagoon"
                address="5101 Blue Lagoon Dr, Miami, FL 33126"
                time="The Domínguez Wedding"
                mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.848834473852!2d-80.2831418237576!3d25.7755580773456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9c9f576378d%3A0x889a2729a9972740!2sHilton%20Miami%20Airport%20Blue%20Lagoon!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                mapLink="https://www.google.com/maps/search/?api=1&query=Hilton+Miami+Airport+Blue+Lagoon+5101+Blue+Lagoon+Dr+Miami+FL+33126"
                viewMapText={t.locations.viewMap}
                actionLink="https://www.hilton.com/en/attend-my-event/miaahhh-idmg-40ea2ceb-a99c-4146-a473-339c560cd9b1/"
                actionText={t.locations.bookNow}
                icon={Hotel}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="py-24 px-6 bg-wedding-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title={t.dressCode.title} subtitle={t.dressCode.subtitle} />
          
          <div className="space-y-16">
            <div>
              <p className="serif text-sm uppercase tracking-[0.3em] mb-10 font-bold text-wedding-gold">{t.dressCode.suggestions}</p>
              <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
                {t.dressCode.colors.map((name, i) => {
                  const colors = ['#D4E2D9', '#D9E1E8', '#E8D9E1', '#ebb88c', '#eed680', '#b599bd'];
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div 
                        className="w-16 h-16 md:w-24 md:h-24 rounded-full shadow-inner border border-black/5" 
                        style={{ backgroundColor: colors[i] }}
                      />
                      <span className="sans text-[10px] uppercase tracking-widest text-wedding-gray font-semibold">{name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="pt-10">
              <p className="serif text-sm uppercase tracking-[0.3em] mb-10 font-bold text-red-800/60">{t.dressCode.blocked}</p>
              <div className="flex justify-center gap-10 md:gap-16">
                {t.dressCode.blockedColors.map((name, i) => {
                  const colors = ['#FFC0CB', '#FFFFFF', '#000000'];
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex flex-col items-center gap-4 relative"
                    >
                      <div className="relative">
                        <div 
                          className="w-16 h-16 md:w-24 md:h-24 rounded-full shadow-inner border border-black/5" 
                          style={{ backgroundColor: colors[i] }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-[2px] bg-red-600/60 rotate-45 absolute" />
                          <div className="w-full h-[2px] bg-red-600/60 -rotate-45 absolute" />
                        </div>
                      </div>
                      <span className="sans text-[10px] uppercase tracking-widest text-wedding-gray font-semibold line-through">{name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Invitation Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionTitle title={t.invitation.title} subtitle={t.invitation.subtitle} />
          
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="wedding-card p-6 rounded-2xl border-wedding-gold/20">
                <img 
                  src={t.invitation.image} 
                  alt="Invitation Preview" 
                  className="w-full h-auto rounded-lg shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 text-center md:text-left space-y-8"
            >
              <h3 className="serif text-4xl font-light">{t.invitation.heading}</h3>
              <p className="sans text-sm text-wedding-gray leading-relaxed font-medium">
                {t.invitation.description}
              </p>
              <a 
                href={t.invitation.image} 
                download={`Invitation_Starina_Anthony_${lang}.png`}
                className="btn-primary w-full md:w-auto text-xs py-4"
              >
                <Download size={18} /> {t.invitation.download}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-32 px-6 bg-wedding-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-wedding-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-gold/5 rounded-full translate-x-1/2 translate-y-1/2 blur-[100px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="wedding-card p-12 md:p-24 rounded-[3rem] border-wedding-gold/30"
          >
            <SectionTitle title={t.rsvp.title} subtitle={t.rsvp.subtitle} />
            
            <div className="space-y-10">
              <div className="flex flex-col items-center gap-3">
                <Calendar className="text-wedding-gold mb-4" size={32} strokeWidth={1} />
                <p className="serif text-sm uppercase tracking-[0.4em] font-bold text-wedding-gold">{t.rsvp.deadline}</p>
                <p className="serif text-4xl md:text-5xl text-wedding-gold font-light">{t.rsvp.deadlineDate}</p>
              </div>
              
              <p className="sans text-sm text-wedding-gray max-w-sm mx-auto font-medium">
                {t.rsvp.description}
              </p>
              
              <a 
                href={RSVP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary px-16 py-5 text-sm"
              >
                <CheckCircle size={20} /> {t.rsvp.confirm}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 text-center bg-white border-t border-wedding-gold/10">
        <p className="serif text-5xl text-wedding-gold mb-6 font-light uppercase tracking-tighter">Starina & Anthony</p>
        <div className="flex flex-col gap-4">
          <p className="sans text-[10px] uppercase tracking-[0.5em] text-wedding-gray font-bold">
            {t.footer} • 2026
          </p>
          <p className="sans text-[10px] uppercase tracking-[0.5em] text-wedding-gray font-bold">
            {lang === 'es' ? 'Diseñado por' : 'Designed by'}{' '}
            <a 
              href="https://orvit.design" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-wedding-gold hover:opacity-70 transition-opacity underline underline-offset-4"
            >
              Orvit Design
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
