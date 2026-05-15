"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Formule = { id: string; titre: string; prix: string; duree: string; desc: string; inclus: string[]; accent: boolean };
type Stat = { valeur: string; label: string };
type Temoignage = { nom: string; initiales: string; texte: string; note: number };
type FAQ = { q: string; r: string };

// ─── Données ──────────────────────────────────────────────────────────────────
const FORMULES: Formule[] = [
  {
    id: "code",
    titre: "Code seul",
    prix: "25 000",
    duree: "~2 mois",
    desc: "Préparez votre examen théorique avec nos supports pédagogiques.",
    inclus: ["Accès e-learning illimité", "Tests blancs illimités", "Suivi de progression", "Support WhatsApp"],
    accent: false,
  },
  {
    id: "permisB",
    titre: "Permis B",
    prix: "280 000",
    duree: "3–4 mois",
    desc: "Formation complète pour conduire une voiture légère au Togo.",
    inclus: ["Code inclus", "20h de conduite", "Moniteur dédié", "Accompagnement examen Baseilia", "Repassage offert"],
    accent: true,
  },
  {
    id: "moto",
    titre: "Permis A + B",
    prix: "380 000",
    duree: "4–5 mois",
    desc: "Conduisez voiture et moto avec une seule formation groupée.",
    inclus: ["Code inclus", "20h voiture + 10h moto", "2 moniteurs", "Accompagnement examens", "Repassage offert"],
    accent: false,
  },
];

const STATS: Stat[] = [
  { valeur: "94%", label: "Taux de réussite" },
  { valeur: "1 200+", label: "Candidats formés" },
  { valeur: "12", label: "Moniteurs certifiés" },
  { valeur: "8", label: "Années d'expérience" },
];

const TEMOIGNAGES: Temoignage[] = [
  { nom: "Kofi Mensah", initiales: "KM", texte: "J'ai obtenu mon permis B du premier coup ! Les moniteurs sont patients et professionnels. L'application rend tout facile.", note: 5 },
  { nom: "Ama Sedzro", initiales: "AS", texte: "Le paiement par Mobile Money est très pratique. Le suivi en ligne m'a permis de voir ma progression semaine après semaine.", note: 5 },
  { nom: "Brice Klutse", initiales: "BK", texte: "Formule A+B très complète. Je recommande à toute ma famille. Le tableau de bord candidat est vraiment bien conçu.", note: 4 },
];

const FAQS: FAQ[] = [
  { q: "Comment se déroule l'inscription ?", r: "Remplissez le formulaire en ligne, uploadez vos documents (CNI, photo) et payez par MTN MoMo ou Flooz. Votre dossier est validé dans les 24h." },
  { q: "Quels documents sont nécessaires ?", r: "Une copie de votre pièce d'identité nationale (CNI), une photo d'identité récente et votre numéro de téléphone Mobile Money." },
  { q: "Peut-on payer en plusieurs fois ?", r: "Oui, un acompte de 30% est possible à l'inscription. Le solde peut être réglé en 2 versements via Mobile Money." },
  { q: "Que se passe-t-il si je rate l'examen ?", r: "Le repassage est offert pour toutes les formules Permis B et A+B. Nous vous accompagnons jusqu'à l'obtention de votre permis." },
];

// ─── Composants utilitaires ───────────────────────────────────────────────────
function Etoiles({ n }: { n: number }) {
  return (
    <span aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < n ? "#D4A843" : "#D1C9B8", fontSize: 14 }}>★</span>
      ))}
    </span>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [ouvert, setOuvert] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #E8E2D9",
        paddingBottom: 0,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, color: "#1A1410", fontWeight: 600 }}>
          {faq.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1.5px solid #1A1410",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 300,
            color: "#1A1410",
            transition: "transform 0.25s",
            transform: ouvert ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: ouvert ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 15, color: "#5C5248", lineHeight: 1.75, paddingBottom: 20, margin: 0 }}>
          {faq.r}
        </p>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function Home() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOuvert(false);
  };

  return (
    <>
      {/* ── Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #FAF8F5; color: #1A1410; }
        ::selection { background: #D4A843; color: #1A1410; }
        :focus-visible { outline: 2px solid #D4A843; outline-offset: 3px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes carSlide {
          0%   { transform: translateX(-8px); }
          100% { transform: translateX(8px); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }

        .animate-fadeup { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-1 { animation-delay: 0.10s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.36s; }
        .delay-4 { animation-delay: 0.50s; }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #5C5248;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .nav-link:hover { color: #1A1410; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1A1410;
          color: #FAF8F5;
          border: none;
          border-radius: 4px;
          padding: 14px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .btn-primary:hover { background: #2E2520; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #1A1410;
          border: 1.5px solid #1A1410;
          border-radius: 4px;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .btn-outline:hover { background: #1A1410; color: #FAF8F5; transform: translateY(-1px); }

        .formule-card {
          border: 1px solid #E8E2D9;
          border-radius: 8px;
          padding: 32px 28px;
          background: #FFFFFF;
          transition: box-shadow 0.25s, transform 0.25s;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .formule-card:hover { box-shadow: 0 12px 40px rgba(26,20,16,0.09); transform: translateY(-3px); }
        .formule-card.accent {
          background: #1A1410;
          border-color: #1A1410;
          color: #FAF8F5;
        }

        .temoignage-card {
          background: #FFFFFF;
          border: 1px solid #E8E2D9;
          border-radius: 8px;
          padding: 28px 24px;
          transition: box-shadow 0.25s;
        }
        .temoignage-card:hover { box-shadow: 0 8px 28px rgba(26,20,16,0.07); }

        .stat-item {
          text-align: center;
          padding: 20px 0;
        }

        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-btns { flex-direction: column; gap: 12px !important; }
          .hero-h1 { font-size: clamp(36px, 10vw, 64px) !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.3s, box-shadow 0.3s, padding 0.3s",
          background: scrolled ? "rgba(250,248,245,0.95)" : "transparent",
          boxShadow: scrolled ? "0 1px 0 #E8E2D9" : "none",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: scrolled ? "14px 32px" : "22px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "padding 0.3s",
          }}
        >
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "baseline", gap: 2 }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#1A1410", letterSpacing: "-0.01em" }}>
              Auto
            </span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 500, fontStyle: "italic", color: "#D4A843" }}>
              École
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: "#8A7E75", marginLeft: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Lomé
            </span>
          </button>

          {/* Nav desktop */}
          <nav aria-label="Navigation principale" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[["formules", "Formules"], ["temoignages", "Avis"], ["faq", "FAQ"], ["contact", "Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>
            ))}
            <button onClick={() => scrollTo("formules")} className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
              S'inscrire
            </button>
          </nav>
        </div>
      </header>

      <main id="main-content">

        {/* ══════════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          ref={heroRef}
          aria-label="Bannière principale"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            background: "#FAF8F5",
          }}
        >
          {/* Motif géométrique décoratif */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {/* Cercle doré large */}
            <div style={{ position: "absolute", right: -180, top: "50%", transform: "translateY(-50%)", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(212,168,67,0.15)" }} />
            <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(212,168,67,0.12)" }} />
            {/* Grille de points */}
            <svg style={{ position: "absolute", top: 80, right: 60, opacity: 0.12 }} width="200" height="200" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={col * 30 + 15}
                    cy={row * 30 + 15}
                    r={2}
                    fill="#1A1410"
                    style={{ animation: `pulse-dot ${1.5 + (row + col) * 0.2}s ease-in-out infinite`, animationDelay: `${(row + col) * 0.1}s` }}
                  />
                ))
              )}
            </svg>
            {/* Bande diagonale dorée */}
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 340, height: 340, background: "rgba(212,168,67,0.06)", borderRadius: "50%", filter: "blur(40px)" }} />
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", width: "100%", position: "relative" }}>
            <div style={{ maxWidth: 720 }}>
              {/* Eyebrow */}
              <div className="animate-fadeup" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 32, height: 1, background: "#D4A843" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A7E75" }}>
                  Auto-école agréée Baseilia — Lomé, Togo
                </span>
              </div>

              {/* H1 */}
              <h1
                className="hero-h1 animate-fadeup delay-1"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(42px, 7vw, 80px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#1A1410",
                  marginBottom: 28,
                }}
              >
                Votre permis,{" "}
                <em style={{ fontStyle: "italic", color: "#D4A843", fontWeight: 500 }}>sereinement.</em>
              </h1>

              {/* Sous-titre */}
              <p
                className="animate-fadeup delay-2"
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: 19,
                  fontWeight: 400,
                  color: "#5C5248",
                  lineHeight: 1.7,
                  marginBottom: 44,
                  maxWidth: 540,
                }}
              >
                Formation au permis de conduire à Lomé — code de la route, conduite voiture et moto. Inscription 100% en ligne, paiement par Mobile Money.
              </p>

              {/* CTAs */}
              <div className="hero-btns animate-fadeup delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("formules")} className="btn-primary">
                  Commencer mon inscription
                  <span aria-hidden="true" style={{ fontSize: 18 }}>→</span>
                </button>
                <button onClick={() => scrollTo("temoignages")} className="btn-outline">
                  Voir les avis
                </button>
              </div>

              {/* Preuve sociale rapide */}
              <div className="animate-fadeup delay-4" style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 48 }}>
                <div style={{ display: "flex" }}>
                  {["KM", "AS", "BK", "TK"].map((init, i) => (
                    <div
                      key={init}
                      aria-hidden="true"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: i % 2 === 0 ? "#E8E2D9" : "#1A1410",
                        color: i % 2 === 0 ? "#5C5248" : "#FAF8F5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 500,
                        marginLeft: i === 0 ? 0 : -10,
                        border: "2px solid #FAF8F5",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 1 }} aria-label="4,9 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} style={{ color: "#D4A843", fontSize: 14 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5C5248", marginTop: 2 }}>
                    <strong style={{ color: "#1A1410" }}>1 200+</strong> candidats formés depuis 2016
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Chiffres clés" style={{ background: "#1A1410", padding: "56px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="grid-4"
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="stat-item"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.08)", padding: "24px 32px" }}
                >
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 44, fontWeight: 700, color: "#D4A843", letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {s.valeur}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            POURQUOI NOUS
        ══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Nos avantages" style={{ padding: "100px 32px", background: "#FAF8F5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-2">
              {/* Texte */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 24, height: 1, background: "#D4A843" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A7E75" }}>
                    Pourquoi nous choisir
                  </span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.01em", color: "#1A1410", marginBottom: 20 }}>
                  Une formation moderne,{" "}
                  <em style={{ fontStyle: "italic", fontWeight: 500 }}>à votre rythme</em>
                </h2>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, color: "#5C5248", lineHeight: 1.8, marginBottom: 36 }}>
                  Nous avons repensé l'auto-école pour vous : inscription numérique, suivi en temps réel, paiement flexible par Mobile Money et moniteurs certifiés.
                </p>
                <button onClick={() => scrollTo("formules")} className="btn-primary">
                  Voir les formules
                </button>
              </div>
              {/* Cartes avantages */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: "📱", titre: "100% en ligne", desc: "Inscription, suivi et paiement depuis votre téléphone." },
                  { icon: "💳", titre: "Mobile Money", desc: "MTN MoMo et Flooz acceptés. Paiement en plusieurs fois." },
                  { icon: "📅", titre: "Planning souple", desc: "Choisissez vos créneaux de conduite selon vos disponibilités." },
                  { icon: "🏆", titre: "94% de réussite", desc: "Nos candidats réussissent dès le premier passage." },
                ].map((a) => (
                  <div
                    key={a.titre}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E8E2D9",
                      borderRadius: 8,
                      padding: "24px 20px",
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 12 }} aria-hidden="true">{a.icon}</div>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 600, color: "#1A1410", marginBottom: 6 }}>
                      {a.titre}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5C5248", lineHeight: 1.6 }}>
                      {a.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FORMULES
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="formules" aria-label="Nos formules et tarifs" style={{ padding: "100px 32px", background: "#F3EFE9" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* En-tête */}
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A7E75" }}>Tarifs</span>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, color: "#1A1410", letterSpacing: "-0.01em" }}>
                Choisissez votre formule
              </h2>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 17, color: "#5C5248", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
                Toutes les formules incluent l'accompagnement à l'examen Baseilia.
              </p>
            </div>

            {/* Grille formules */}
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {FORMULES.map((f) => (
                <article key={f.id} className="formule-card" style={f.accent ? { background: "#1A1410", borderColor: "#1A1410", color: "#FAF8F5" } : {}}>
                  {f.accent && (
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ background: "#D4A843", color: "#1A1410", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Le plus choisi
                      </span>
                    </div>
                  )}
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: f.accent ? "rgba(255,255,255,0.45)" : "#8A7E75" }}>
                      {f.duree}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: f.accent ? "#FAF8F5" : "#1A1410", marginBottom: 16 }}>
                    {f.titre}
                  </h3>
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 700, color: f.accent ? "#D4A843" : "#1A1410" }}>
                      {f.prix}
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: f.accent ? "rgba(255,255,255,0.45)" : "#8A7E75", marginLeft: 4 }}>
                      FCFA
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 14, color: f.accent ? "rgba(255,255,255,0.65)" : "#5C5248", lineHeight: 1.65, marginBottom: 24 }}>
                    {f.desc}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 32, flexGrow: 1 }}>
                    {f.inclus.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: f.accent ? "rgba(255,255,255,0.8)" : "#3D3530" }}>
                        <span style={{ color: f.accent ? "#D4A843" : "#1A1410", flexShrink: 0, fontSize: 16 }} aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/inscription"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "14px",
                      borderRadius: 4,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "background 0.2s, color 0.2s",
                      background: f.accent ? "#D4A843" : "#1A1410",
                      color: f.accent ? "#1A1410" : "#FAF8F5",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Choisir cette formule
                  </a>
                </article>
              ))}
            </div>

            {/* Note paiement */}
            <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8A7E75", marginTop: 32 }}>
              💳 Paiement par MTN Mobile Money ou Flooz (Moov) · Acompte de 30% possible
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            COMMENT ÇA MARCHE
        ══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Processus d'inscription" style={{ padding: "100px 32px", background: "#FAF8F5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A7E75" }}>Processus</span>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, color: "#1A1410", letterSpacing: "-0.01em" }}>
                Comment ça marche ?
              </h2>
            </div>
            <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
              {/* Ligne de connexion */}
              <div aria-hidden="true" style={{ position: "absolute", top: 24, left: "12.5%", right: "12.5%", height: 1, background: "#E8E2D9", zIndex: 0 }} />
              {[
                { num: "01", titre: "Inscription en ligne", desc: "Remplissez le formulaire et uploadez vos documents depuis votre téléphone." },
                { num: "02", titre: "Paiement Mobile Money", desc: "Payez en toute sécurité par MTN MoMo ou Flooz. Reçu instantané." },
                { num: "03", titre: "Formation théorique", desc: "Accédez à nos cours en ligne et préparez votre examen de code." },
                { num: "04", titre: "Conduite & Permis", desc: "Séances avec votre moniteur, puis passage de l'examen Baseilia." },
              ].map((e, i) => (
                <div key={e.num} style={{ padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: i === 0 ? "#1A1410" : "#FAF8F5",
                      border: `1.5px solid ${i === 0 ? "#1A1410" : "#E8E2D9"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: i === 0 ? "#FAF8F5" : "#8A7E75",
                    }}
                    aria-hidden="true"
                  >
                    {e.num}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 600, color: "#1A1410", marginBottom: 10 }}>
                    {e.titre}
                  </h3>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 14, color: "#5C5248", lineHeight: 1.7 }}>
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            TÉMOIGNAGES
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="temoignages" aria-label="Témoignages de nos candidats" style={{ padding: "100px 32px", background: "#F3EFE9" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A7E75" }}>Témoignages</span>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, color: "#1A1410", letterSpacing: "-0.01em" }}>
                Ils ont réussi leur permis
              </h2>
            </div>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {TEMOIGNAGES.map((t) => (
                <article key={t.nom} className="temoignage-card">
                  <div style={{ marginBottom: 16 }}><Etoiles n={t.note} /></div>
                  <blockquote style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 15, fontStyle: "italic", color: "#3D3530", lineHeight: 1.75, marginBottom: 24 }}>
                    "{t.texte}"
                  </blockquote>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1A1410", color: "#FAF8F5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }} aria-hidden="true">
                      {t.initiales}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1410" }}>{t.nom}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8A7E75" }}>Candidat certifié</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="faq" aria-label="Questions fréquentes" style={{ padding: "100px 32px", background: "#FAF8F5" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A7E75" }}>FAQ</span>
                <div style={{ width: 24, height: 1, background: "#D4A843" }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, color: "#1A1410", letterSpacing: "-0.01em" }}>
                Questions fréquentes
              </h2>
            </div>
            <div style={{ borderTop: "1px solid #E8E2D9" }}>
              {FAQS.map((f) => <FAQItem key={f.q} faq={f} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Appel à l'action" style={{ background: "#1A1410", padding: "100px 32px", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.35)", marginBottom: 20, letterSpacing: "0.06em" }}>
              — Inscrivez-vous dès aujourd'hui —
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 44, fontWeight: 700, color: "#FAF8F5", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Prêt(e) à passer le cap ?
            </h2>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 40 }}>
              Rejoignez les 1 200+ candidats qui nous ont fait confiance. L'inscription prend moins de 5 minutes.
            </p>
            <a href="/inscription" className="btn-primary" style={{ background: "#D4A843", color: "#1A1410", fontSize: 16, padding: "16px 36px" }}>
              S'inscrire maintenant →
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            CONTACT + FOOTER
        ══════════════════════════════════════════════════════════════════════ */}
        <footer id="contact" role="contentinfo" style={{ background: "#110D0A", padding: "64px 32px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
              {/* Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#FAF8F5" }}>Auto</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, fontStyle: "italic", color: "#D4A843" }}>École</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Lomé</span>
                </div>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 280 }}>
                  Auto-école agréée par l'Baseilia. Formation professionnelle au permis de conduire à Lomé, Togo.
                </p>
              </div>
              {/* Contact */}
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>Contact</div>
                {[
                  ["📞", "+228 90 00 00 00"],
                  ["📧", "contact@autoecole-lome.tg"],
                  ["📍", "Quartier Adidogomé, Lomé"],
                ].map(([icon, val]) => (
                  <div key={val} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <span aria-hidden="true" style={{ fontSize: 14 }}>{icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{val}</span>
                  </div>
                ))}
              </div>
              {/* Liens */}
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>Liens</div>
                {["Nos formules", "Inscription", "Connexion", "FAQ"].map((l) => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                    >{l}</a>
                  </div>
                ))}
              </div>
            </div>
            {/* Bas */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                © {new Date().getFullYear()} Auto-École Lomé — Tous droits réservés
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                Agréé Baseilia · Lomé, Togo
              </span>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}