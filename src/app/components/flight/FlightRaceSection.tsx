import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Timer, Trophy, ArrowRight, Radio, Users, Flag, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../lib/i18n';
import { useRaceResults } from '../../hooks/useRaceResults';
import type { Runner } from '../../../types/supabase';

const copy = {
  es: {
    badge: 'Evento Deportivo',
    title: 'Clasificacion en directo',
    subtitle: 'Sigue los resultados de La Gigante de Piedra en tiempo real, con actualizaciones automaticas y filtros por modalidad.',
    live: 'Actualizacion cada pocos segundos',
    ctaPrimary: 'Ver clasificacion',
    ctaSecondary: 'Abrir en nueva pestana',
    feature1: 'Resultados por modalidad',
    feature2: 'Busqueda por dorsal o nombre',
    feature3: 'Estado en carrera en directo',
  },
  en: {
    badge: 'Sport Event',
    title: 'Live classification',
    subtitle: 'Track La Gigante de Piedra results in real time with automatic refresh and modality filters.',
    live: 'Updates every few seconds',
    ctaPrimary: 'Open classification',
    ctaSecondary: 'Open in new tab',
    feature1: 'Mode-specific rankings',
    feature2: 'Search by bib or name',
    feature3: 'Live race status',
  },
} as const;

const MODALITIES = [
  { value: 'TODAS', es: 'Todas', en: 'All' },
  { value: 'CICLOTURISTA', es: 'Cicloturista', en: 'Cicloturista' },
  { value: 'CICLOTURISTAG', es: 'Cicloturista G', en: 'Cicloturista G' },
  { value: 'ESPECIAL', es: 'Especial', en: 'Special' },
  { value: 'PAREJAS', es: 'Parejas', en: 'Pairs' },
  { value: 'PAREJASG', es: 'Parejas G', en: 'Pairs G' },
] as const;

function getLiveBadgeClasses(live: boolean): string {
  if (live) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
}

function getLiveBadgeText(live: boolean, language: 'es' | 'en', liveText: string): string {
  if (live) return liveText;
  return language === 'es' ? 'Esperando datos en directo' : 'Waiting for live data';
}

export function FlightRaceSection() {
  const { language } = useLanguage();
  const t = copy[language];
  const [modalidad, setModalidad] = useState('TODAS');

  const { runners, loading, lastUpdate, totalFinishers } = useRaceResults({ modalidad });

  const topThree = useMemo(() => {
    return runners
      .filter((r) => r.estado === 'FINALIZADO' && r.puesto_general !== null)
      .sort((a, b) => (a.puesto_general ?? 99999) - (b.puesto_general ?? 99999))
      .slice(0, 3);
  }, [runners]);

  const inRace = runners.filter((r) => r.estado === 'EN_CARRERA').length;
  const live = Boolean(lastUpdate) && ((Date.now() - lastUpdate.getTime()) < 30_000);

  const giganteUrl = modalidad === 'TODAS'
    ? '/gigante'
    : `/gigante?modalidad=${encodeURIComponent(modalidad)}`;


  return (
    <section id="clasificacion" className="py-24 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-brand/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1.25fr_0.75fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand font-bold text-xs uppercase tracking-wider mb-4">
                  <Radio size={14} className="animate-pulse" />
                  {t.badge}
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-stone-900 leading-tight mb-4">
                  {t.title}
                </h2>

                <p className="text-stone-600 text-lg leading-relaxed mb-6">
                  {t.subtitle}
                </p>

                <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6 border ${getLiveBadgeClasses(live)}`}>
                  <Timer size={15} />
                  {getLiveBadgeText(live, language, t.live)}
                </div>

                <div className="mb-8">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                    {language === 'es' ? 'Modalidad' : 'Modality'}
                  </label>
                  <select
                    value={modalidad}
                    onChange={(e) => setModalidad(e.target.value)}
                    className="w-full sm:w-auto min-w-[220px] bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 focus:outline-none focus:border-brand"
                  >
                    {MODALITIES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {language === 'es' ? item.es : item.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-brand hover:bg-brand-dark text-white font-bold px-7 py-6 rounded-xl">
                    <a href={giganteUrl}>
                      {t.ctaPrimary}
                      <ArrowRight className="ml-2" size={16} />
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="border-2 border-stone-300 text-stone-800 hover:bg-stone-100 font-bold px-7 py-6 rounded-xl">
                    <a href={giganteUrl} target="_blank" rel="noreferrer">
                      {t.ctaSecondary}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="grid gap-3">
                <Feature>{t.feature1}</Feature>
                <Feature>{t.feature2}</Feature>
                <Feature>{t.feature3}</Feature>

                <div className="rounded-2xl bg-stone-900 text-white p-5 mt-2">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs text-stone-300 uppercase tracking-wider flex items-center gap-1">
                        <Users size={12} />
                        {language === 'es' ? 'Mostrando' : 'Showing'}
                      </div>
                      <div className="text-xl font-black mt-1">{loading ? '...' : runners.length}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs text-stone-300 uppercase tracking-wider flex items-center gap-1">
                        <Flag size={12} />
                        {language === 'es' ? 'Finalizados' : 'Finished'}
                      </div>
                      <div className="text-xl font-black mt-1">{loading ? '...' : totalFinishers}</div>
                    </div>
                  </div>

                  <div className="text-xs uppercase tracking-wider text-stone-400 mb-2">
                    {language === 'es' ? 'Top 3 en directo' : 'Live Top 3'}
                  </div>
                  <div className="space-y-2">
                    {topThree.length === 0 ? (
                      <div className="text-sm text-stone-300">{language === 'es' ? 'Aun sin llegadas registradas.' : 'No finishers yet.'}</div>
                    ) : (
                      topThree.map((runner, i) => (
                        <TopRunner key={runner.id} runner={runner} place={i + 1} />
                      ))
                    )}
                  </div>

                  <div className="mt-3 text-xs text-stone-400">
                    {language === 'es' ? 'En carrera' : 'In race'}: {inRace}
                  </div>

                  <a href={giganteUrl} className="mt-4 inline-flex items-center gap-1 text-brand-light hover:text-white text-sm font-semibold transition-colors">
                    {language === 'es' ? 'Ver clasificacion completa' : 'View full classification'}
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TopRunner({ runner, place }: { runner: Runner; place: number }) {
  const medal = place === 1 ? '🥇' : place === 2 ? '🥈' : '🥉';
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-white/10 px-3 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <span>{medal}</span>
        <span className="text-sm font-semibold truncate">{runner.nombre} {runner.apellidos}</span>
      </div>
      <span className="text-xs font-mono text-stone-300 shrink-0">{runner.tiempo_neto ?? '—'}</span>
    </div>
  );
}

function Feature({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
      <div className="w-8 h-8 rounded-lg bg-brand text-white grid place-items-center shrink-0">
        <Trophy size={14} />
      </div>
      <p className="text-sm font-semibold text-stone-700">{children}</p>
    </div>
  );
}
