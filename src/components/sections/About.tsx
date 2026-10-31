import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const experiences = [
  {
    year: '2024—2026',
    period: 'Janv. 2024 — Oct. 2026',
    company: 'CashNow',
    location: 'Boulogne-Billancourt',
    role: 'Développeuse Full-Stack · Alternance',
    description:
        "Évolution d'un logiciel SaaS de recouvrement de créances : conception de nouvelles fonctionnalités en Symfony et React, maintenance et amélioration continue de l'existant.",
    stack: ['React', 'TypeScript', 'Symfony', 'Sonata', 'MariaDB'],
    color: '#b6a2d9',
  },
  {
    year: '2022—2023',
    period: 'Sept. 2022 — Juil. 2023',
    company: 'Azgar Promotion',
    location: 'Espagne',
    role: 'Développeuse Full-Stack · Alternance',
    description:
        "Conception et développement d'un site hôtelier, avec un parcours de réservation complet : du choix de la chambre jusqu'au paiement en ligne via Stripe.",
    stack: [
      'Laravel',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'MySQL',
      'Stripe',
    ],
    color: '#f1b095',
  },
  {
    year: '2022',
    period: 'Mai — Juillet 2022',
    company: 'Normapart',
    location: 'Courbevoie',
    role: 'Développeuse Full-Stack · Stage',
    description:
        "Refonte complète du site web pour le rendre plus rapide et offrir une navigation plus fluide.",
    stack: ['WordPress', 'Elementor', 'JavaScript'],
    color: '#e98b9b',
  },
]

// Listes alignées sur le CV
const frontend = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML / CSS',
  'Tailwind CSS',
  'Bootstrap',
  'Vue.js',
  'jQuery',
  'AJAX',
  'Three.js',
  'Framer Motion',
  'React Native',
  'Cordova',
]

const design = [
  'Figma',
  'Canva',
  'Maquettage',
  'UI / UX',
  'Design systems',
  'Responsive design',
  'Accessibilité',
]

const backend = [
  'Symfony (PHP)',
  'Laravel (PHP)',
  'Django (Python)',
  'Spring Boot (Java)',
  'Node.js',
  'API REST',
]

const database = [
  'MySQL / MariaDB',
  'PostgreSQL',
  'MongoDB',
]

const data = [
  'Claude Code',
  'GitHub Copilot',
  'Codex',
  'LLM',
  'Machine Learning',
  'Reinforcement Learning',
  'TensorFlow / Keras',
  'Pandas',
  'NumPy',
  'OpenCV',
]

const tools = [
  'Git',
  'GitHub',
  'GitLab',
  'GitHub Actions',
  'CI / CD',
  'Docker',
  'Kubernetes',
  'Grafana',
  'Vite',
  'Webpack',
]

const project = [
  'Agile / Scrum',
  'Jira',
  'Confluence',
  'Trello',
  'Notion',
  'Code review',
]

const formations = [
  {
    year: '2024 – 2026',
    degree: 'MSc Pro — Expert IA / Data (Bac+5)',
    school: 'Epitech · Le Kremlin-Bicêtre',
    detail:
      'Spécialisation en intelligence artificielle appliquée : machine learning, NLP, vision par ordinateur et intégration de modèles dans des architectures back-end. Projets menés en équipe sur des problématiques réelles — de l\'ingestion de données brutes à la mise en production d\'un pipeline ML.',
    color: '#f39a62',
    tone: '#b85c2b',
  },
  {
    year: '2023 – 2024',
    degree: 'Pre-MSc (Bac+3)',
    school: 'Epitech · Le Kremlin-Bicêtre',
    detail:
      'Année dédiée à l\'architecture logicielle : conception de systèmes back-end robustes, API RESTful, patrons de conception (MVC, Repository, SOLID). Formation intensive par projets, avec des livraisons revues par des professionnels de l\'industrie — une exigence qui a structuré ma rigueur technique.',
    color: '#e98b9b',
    tone: '#b0596a',
  },
  {
    year: '2021 – 2023',
    degree: 'BTS SIO — option SLAM (Bac+2)',
    school: 'ORT Daniel Mayer · Montreuil',
    detail:
      'Fondamentaux du développement logiciel : PHP, Java, algorithmes, bases de données SQL et conception d\'applications. En deuxième année, alternance chez CashNow — première immersion dans un environnement Agile/Scrum, avec des sprints, des code reviews et une exposition directe au cycle de vie d\'un produit SaaS.',
    color: '#b6a2d9',
    tone: '#72589e',
  },
  {
    year: '2019 – 2021',
    degree: 'Baccalauréat STMG — option SIG',
    school: 'ORT Daniel Mayer · Montreuil',
    detail:
      'Baccalauréat technologique orienté systèmes d\'information : introduction à la programmation, modélisation de bases de données et analyse des processus métier. Le point de départ qui a confirmé ma direction vers l\'informatique et la conception de systèmes.',
    color: '#b9d8c4',
    tone: '#3f7a58',
  },
]

const kw = (s: string) => `<span style="color:#89b4fa">${s}</span>`
const fn = (s: string) => `<span style="color:#a6e3a1">${s}</span>`
const cl = (s: string) => `<span style="color:#f38ba8">${s}</span>`
const va = (s: string) => `<span style="color:#fab387">${s}</span>`
const st = (s: string) => `<span style="color:#f9e2af">${s}</span>`
const cm = (s: string) => `<span style="color:#6c7086">${s}</span>`
const tx = (s: string) => `<span style="color:#cdd6f4">${s}</span>`

const PHP_CODE = [
  `<span style="color:#636da6">&lt;?php</span>`,
  ``,
  `${kw('namespace')} ${tx('App\\\\Controller;')}`,
  ``,
  `${kw('class')} ${cl('DevController')}`,
  `${tx('{')}`,
  `    ${kw('private string')} ${va('$name')}  ${tx(`= '`)}${st('Liora Toledano')}${tx(`';`)}`,
  `    ${kw('private string')} ${va('$lang')}  ${tx(`= '`)}${st('PHP · Symfony · Java')}${tx(`';`)}`,
  ``,
  `    ${cm('// disponibilité &amp; type de contrat')}`,
  `    ${kw('public function')} ${fn('status')}${tx('(): array')}`,
  `    ${tx('{')}`,
  `        ${kw('return')} ${tx('[')}`,
  `            ${tx(`'`)}${fn('disponible')}${tx(`'`)}  ${tx(`=>`)} ${kw('true')}${tx(',')}`,
  `            ${tx(`'`)}${fn('type')}${tx(`'`)}       ${tx(`=> '`)}${st('CDI')}${tx(`',`)}`,
  `            ${tx(`'`)}${fn('profil')}${tx(`'`)}     ${tx(`=> '`)}${st('Full-Stack')}${tx(`',`)}`,
  `        ${tx('];')}`,
  `    ${tx('}')}`,
  `${tx('}')}`,
].join('\n')

export function About() {
  return (
      <section
          id="about"
          className="relative overflow-hidden bg-[#fffaf7] py-24 md:py-32"
      >
        <div
            className="absolute left-[-160px] top-[25%] h-[380px] w-[380px] rounded-full bg-[#b6a2d9]/10 blur-3xl"
            aria-hidden="true"
        />

        <div
            className="absolute bottom-[8%] right-[-100px] h-[320px] w-[320px] rounded-full bg-[#f1b095]/10 blur-3xl"
            aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
          <SectionIntro
              number="01"
              eyebrow="À PROPOS"
              title="Pas juste du code. Une façon de penser le produit."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border bg-white/70 p-7 lg:col-span-7 md:p-10"
                style={{ borderColor: 'var(--color-border)' }}
            >
              <p className="text-xl font-semibold leading-8 md:text-2xl">
                Développeuse Full-Stack, je conçois des applications web de
                bout en bout. Mon langage de prédilection est{' '}
                <b className="text-[#443744]">PHP</b>, avec lequel je structure
                des API robustes et des back-ends maintenables — et j'apporte
                la même rigueur à chaque couche du produit.
              </p>

              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <p
                    className="text-xl leading-7"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                  Après un{' '}
                  <b className="text-[#443744]">
                    BTS SIO option SLAM
                  </b>
                  , j'ai rejoint Epitech Paris jusqu'au Master. Près de quatre
                  années d'alternance m'ont permis de travailler sur des
                  produits réels, côté serveur comme côté interface.
                </p>

                <p
                    className="text-xl leading-7"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                  Aujourd'hui, je souhaite mettre cette{' '}
                  <b className="text-[#443744]">double compétence</b> au
                  service d'une équipe produit. Mon goût pour le design me rend
                  aussi exigeante sur l'expérience utilisateur que sur la
                  qualité du code.
                </p>
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96, rotate: 1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
                viewport={{ once: true }}
                whileHover={{ rotate: -1, y: -5 }}
                className="relative overflow-hidden rounded-[2rem] lg:col-span-5"
                style={{ background: '#1e1e2e' }}
            >
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                <span className="h-3 w-3 rounded-full bg-[#e98b9b]" />
                <span className="h-3 w-3 rounded-full bg-[#f1b095]" />
                <span className="h-3 w-3 rounded-full bg-[#b9d8c4]" />
                <span className="ml-3 text-[11px] font-mono text-white/30">DevController.php</span>
              </div>
              <pre
                className="overflow-x-auto p-6 text-[12.5px] leading-[1.85] font-mono md:p-8 md:text-[13px]"
                dangerouslySetInnerHTML={{ __html: PHP_CODE }}
              />
            </motion.div>
          </div>

          <div className="mt-28">
            <SectionIntro
                number="02"
                eyebrow="EXPÉRIENCE"
                title="Près de quatre ans sur le terrain."
            />

            <div className="relative mt-14 space-y-7">
              <div className="absolute bottom-5 left-[18px] top-5 hidden w-px bg-gradient-to-b from-[#e98b9b] via-[#f1b095] to-[#b6a2d9] md:block" />

              {experiences.map((experience, index) => (
                  <motion.article
                      key={experience.company}
                      initial={{
                        opacity: 0,
                        x: index % 2 ? 20 : -20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        margin: '-70px',
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative md:pl-14"
                  >
                <span
                    className="absolute left-[11px] top-10 hidden h-4 w-4 rounded-full border-4 border-[#fffaf7] md:block"
                    style={{
                      background: experience.color,
                    }}
                />

                    <motion.div
                        whileHover={{
                          y: -5,
                          rotate: index % 2 ? 0.35 : -0.35,
                        }}
                        className="rounded-[2rem] border bg-white/72 p-6 shadow-[0_18px_55px_rgba(68,55,68,.06)] md:p-8"
                        style={{
                          borderColor: 'var(--color-border)',
                        }}
                    >
                      <div className="grid gap-6 lg:grid-cols-[140px_1fr_260px]">
                        <div>
                          <p
                              className="text-3xl font-black"
                              style={{
                                color: experience.color,
                              }}
                          >
                            {experience.year}
                          </p>

                          <p
                              className="mt-2 text-xs leading-5"
                              style={{
                                color: 'var(--color-text-muted)',
                              }}
                          >
                            {experience.period}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-2xl font-black">
                              {experience.company}
                            </h3>

                            <span
                                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                                style={{
                                  color: experience.color,
                                  background: `${experience.color}18`,
                                }}
                            >
                          {experience.location}
                        </span>
                          </div>

                          <p
                              className="mt-2 text-sm font-semibold"
                              style={{
                                color: 'var(--color-text-muted)',
                              }}
                          >
                            {experience.role}
                          </p>

                          <p
                              className="mt-5 max-w-2xl text-sm leading-7"
                              style={{
                                color: 'var(--color-text-muted)',
                              }}
                          >
                            {experience.description}
                          </p>
                        </div>

                        <div>
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[.18em]">
                            Stack
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {experience.stack.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border bg-white px-2.5 py-1.5 text-[11px] font-medium"
                                    style={{
                                      borderColor: 'var(--color-border)',
                                    }}
                                >
                            {item}
                          </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
              ))}
            </div>
          </div>

          <div
              className="relative mt-28 overflow-hidden rounded-[2.5rem] p-6 text-white sm:p-8 md:p-14 lg:p-20"
              style={{
                background: '#443744',
              }}
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/5" />

            <div className="absolute bottom-[-130px] left-[30%] h-72 w-72 rounded-full bg-[#b6a2d9]/20 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_.65fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f1b095]">
                  FULL-STACK
                </p>

                <h3 className="mt-5 max-w-3xl text-5xl font-black leading-[.9] tracking-[-.04em] md:text-7xl">
                  Du serveur à l'écran, je construis le produit en entier.
                </h3>
              </div>

              <div>
                <p className="text-base leading-7 text-white/65">
                  Côté serveur : PHP (Symfony, Laravel), Java (Spring Boot),
                  Python (Django), API REST et bases de données. Côté interface :
                  React, TypeScript et Tailwind. Mon objectif : allier rigueur
                  technique et identité visuelle.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    'React',
                    'TypeScript',
                    'Symfony',
                    'Laravel',
                    'Java',
                    'Python',
                    'API REST',
                    'MySQL',
                  ].map((item) => (
                      <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold"
                      >
                    {item}
                  </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TOOLBOX */}
          <div className="mt-28">
            <SectionIntro
                number="03"
                eyebrow="TOOLBOX"
                title="Les outils du quotidien."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {/* Back-End et Front-End en pleine largeur */}
              <SkillCard
                  title="Back-End"
                  subtitle="Architecture"
                  skills={backend}
                  color="#b6a2d9"
                  className="lg:col-span-2"
              />

              <SkillCard
                  title="Base de données"
                  subtitle="Stockage"
                  skills={database}
                  color="#9dc9ac"
                  className="lg:col-span-1"
              />

              <SkillCard
                  title="Front-End"
                  subtitle="Interfaces"
                  skills={frontend}
                  color="#e98b9b"
                  className="lg:col-span-1"
              />

              {/* Puis 2 colonnes */}
              <SkillCard
                  title="Design & maquettes"
                  subtitle="Création visuelle"
                  skills={design}
                  color="#f39a62"
                  className="lg:col-span-1"
              />

              <SkillCard
                  title="Méthodes"
                  subtitle="Produit"
                  skills={project}
                  color="#f1b095"
                  className="lg:col-span-1"
              />

              <SkillCard
                  title="Outils & DevOps"
                  subtitle="Écosystème"
                  skills={tools}
                  color="#b9d8c4"
                  className="lg:col-span-1"
              />

              <SkillCard
                  title="IA & Data"
                  subtitle="Workflow"
                  skills={data}
                  color="#a8cce2"
                  className="lg:col-span-1"
              />
            </div>
          </div>

          <div className="mt-28">
            <SectionIntro
                number="04"
                eyebrow="FORMATION"
                title="Apprendre, comprendre, progresser."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {formations.map((formation, index) => (
                  <motion.article
                      key={formation.degree}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        y: -6,
                        rotate: index % 2 ? 0.4 : -0.4,
                      }}
                      className="relative overflow-hidden rounded-[2rem] border bg-white p-7 shadow-[0_18px_55px_rgba(68,55,68,.06)] md:p-9"
                      style={{
                        borderColor: 'var(--color-border)',
                      }}
                  >
                    <div
                        className="absolute -right-12 -top-12 h-32 w-32 rounded-full"
                        style={{
                          background: formation.color,
                          opacity: 0.22,
                        }}
                    />

                    <div className="relative flex items-start justify-between gap-5">
                  <span
                      className="rounded-full px-3.5 py-2 text-xs font-black"
                      style={{
                        color: formation.tone,
                        background: `${formation.color}20`,
                      }}
                  >
                    {formation.year}
                  </span>

                      <GraduationCap
                          className="h-6 w-6"
                          style={{
                            color: formation.color,
                          }}
                      />
                    </div>

                    <h3 className="relative mt-8 max-w-lg text-2xl font-black leading-tight md:text-3xl">
                      {formation.degree}
                    </h3>

                    <p
                        className="relative mt-2 text-sm font-bold"
                        style={{
                          color: 'var(--color-text-muted)',
                        }}
                    >
                      {formation.school}
                    </p>

                    <p
                        className="relative mt-4 max-w-lg text-sm leading-7"
                        style={{
                          color: 'var(--color-text-muted)',
                        }}
                    >
                      {formation.detail}
                    </p>
                  </motion.article>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <SectionIntro
                number="05"
                eyebrow="SAVOIR-ÊTRE"
                title="Ce que j'apporte à une équipe."
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <motion.div
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden rounded-[2.2rem] p-7 text-white md:p-10"
                  style={{
                    background:
                        'linear-gradient(135deg,#443744 0%,#5b465c 58%,#7d5d74 100%)',
                  }}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[35px] border-[#f39a62]/30" />

                <p className="relative text-xs font-black uppercase tracking-[.2em] text-[#f6b07e]">
                  Ma façon de travailler
                </p>

                <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    'Esprit d’analyse',
                    'Travail en équipe',
                    'Adaptation',
                    'Autonomie',
                    'Persévérance',
                    'Sens du détail',
                  ].map((item, index) => (
                      <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/[.07] px-4 py-4"
                      >
                    <span className="text-xs font-black text-[#f6b07e]">
                      0{index + 1}
                    </span>

                        <p className="mt-2 text-sm font-bold">
                          {item}
                        </p>
                      </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <SmallInfo
                    title="Langues"
                    text="Français courant · Anglais B1"
                    color="#f39a62"
                    number="01"
                />

                <SmallInfo
                    title="Hors écran"
                    text="Sports nautiques · Musique · Lecture"
                    color="#b6a2d9"
                    number="02"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <SmallInfo
                title="Mobilité"
                text="Paris & région parisienne · Permis B"
                color="#a8cce2"
                number="03"
            />

            <SmallInfo
                title="Disponibilité"
                text="Dès novembre 2026 · En recherche d'un poste de développeuse Full-Stack en CDI"
                color="#f39a62"
                number="04"
            />
          </div>

          <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="mt-32 text-center"
          >
            <p className="font-display text-[clamp(3rem,8vw,8rem)] font-black leading-[.82] tracking-[-.065em]">
              CODE.
              <br />
              <span className="text-gradient">DESIGN.</span> IMPACT.
            </p>

            <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-[#f1b095]" />
          </motion.div>
        </div>
      </section>
  )
}

function SectionIntro({
                        number,
                        eyebrow,
                        title,
                      }: {
  number: string
  eyebrow: string
  title: string
}) {
  return (
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#e27e43]">
            {number} / {eyebrow}
          </p>

          <h2 className="font-display max-w-4xl text-4xl font-black leading-[.95] tracking-[-.045em] md:text-6xl">
            {title}
          </h2>
        </div>

        <span
            className="hidden text-sm font-semibold md:block"
            style={{
              color: 'var(--color-text-muted)',
            }}
        >
        scroll ↘
      </span>
      </div>
  )
}


function SkillCard({
                     title,
                     subtitle,
                     skills,
                     color,
                     className,
                   }: {
  title: string
  subtitle: string
  skills: string[]
  color: string
  className: string
}) {
  return (
      <motion.div
          whileHover={{ y: -5 }}
          className={`rounded-[2rem] border bg-white/70 p-7 shadow-[0_18px_55px_rgba(68,55,68,.04)] md:p-9 ${className}`}
          style={{
            borderColor: 'var(--color-border)',
          }}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p
                className="text-[10px] font-black uppercase tracking-[.18em]"
                style={{
                  color,
                }}
            >
              {subtitle}
            </p>

            <h3 className="mt-2 text-3xl font-black">
              {title}
            </h3>
          </div>

          <span
              className="h-4 w-4 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 0 8px ${color}16`,
              }}
          />
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {skills.map((skill) => (
              <span
                  key={skill}
                  className="rounded-full border bg-white px-3.5 py-2 text-xs font-semibold transition-transform hover:-translate-y-1"
                  style={{
                    borderColor: 'var(--color-border)',
                  }}
              >
            {skill}
          </span>
          ))}
        </div>
      </motion.div>
  )
}

function SmallInfo({
                     title,
                     text,
                     color,
                     number,
                   }: {
  title: string
  text: string
  color: string
  number: string
}) {
  return (
      <motion.div
          whileHover={{
            y: -5,
            rotate: 0.25,
          }}
          className="relative overflow-hidden rounded-[1.9rem] border bg-white p-6 shadow-[0_15px_45px_rgba(68,55,68,.05)] md:p-7"
          style={{
            borderColor: 'var(--color-border)',
          }}
      >
        <div
            className="absolute -right-8 -top-8 h-24 w-24 rounded-full"
            style={{
              background: color,
              opacity: 0.14,
            }}
        />

        <div className="relative flex items-center justify-between">
        <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white"
            style={{
              background: color,
            }}
        >
          {number}
        </span>

          <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 0 7px ${color}18`,
              }}
          />
        </div>

        <p
            className="relative mt-7 text-[10px] font-black uppercase tracking-[.18em]"
            style={{
              color,
            }}
        >
          {title}
        </p>

        <p className="relative mt-3 text-sm font-bold leading-6">
          {text}
        </p>
      </motion.div>
  )
}