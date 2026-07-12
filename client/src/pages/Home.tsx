import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Zap, Trophy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Page d'accueil Pickleball aux 2 Alpes
 * Design: Mountain Energy - Moderne Dynamique Alpin
 * Couleurs: Bleu électrique (#0066FF), Orange chaud (#FF6B35), Vert montagne (#2D9E4A)
 */

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.interest) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success(
      "Merci ! Votre avis a été enregistré et sera transmis à la mairie."
    );
    setFormData({ name: "", email: "", interest: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            🎾 Pickleball
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
              À propos
            </a>
            <a href="#benefits" className="text-gray-700 hover:text-blue-600 font-medium">
              Avantages
            </a>
            <a href="#survey" className="text-gray-700 hover:text-blue-600 font-medium">
              Sondage
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50" />
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texte Hero */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  ⛰️ Nouveau Sport aux 2 Alpes
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Jouer, Rire,
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Partager
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Le pickleball est le sport montagne qui unit tous les âges. Fun, accessible, convivial - venez découvrir cette nouvelle animation aux 2 Alpes !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
                  onClick={() =>
                    document
                      .getElementById("survey")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Donner mon avis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  En savoir plus
                </Button>
              </div>
            </div>

            {/* Image Hero */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-2xl blur-3xl" />
              <img
                src="/manus-storage/pickleball_hero_7952e1d5.png"
                alt="Pickleball aux 2 Alpes"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Qu'est-ce que le <span className="text-blue-600">Pickleball</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un sport de raquette fun et accessible qui mélange tennis, padel, badminton et tennis de table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Facile à apprendre</h3>
                    <p className="text-gray-600">Terrain plus petit, service par le bas, peu de déplacements - parfait pour débuter !</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-orange-100">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Pour tous les âges</h3>
                    <p className="text-gray-600">Du jeune enfant au senior, chacun peut jouer et s'amuser ensemble !</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-green-100">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Bon pour la santé</h3>
                    <p className="text-gray-600">Améliore l'endurance, renforce les muscles et favorise le bien-être mental.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-100">
                      <Trophy className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Super convivial</h3>
                    <p className="text-gray-600">L'ambiance est ludique et sociale - on joue pour le plaisir !</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vidéo YouTube */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-orange-400/10 rounded-2xl blur-3xl" />
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9N8oacqJpzY?rel=0"
                  title="Pickleball Promo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages pour les 2 Alpes */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Pourquoi le Pickleball aux <span className="text-blue-600">2 Alpes</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une animation idéale pour dynamiser la station et créer du lien entre résidents et touristes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 border-gray-100 hover:border-blue-500 hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Activité Familiale</h3>
              <p className="text-gray-600">Réunit les générations dans une ambiance ludique et conviviale. Parfait pour les vacances en famille !</p>
            </Card>

            <Card className="p-8 border-2 border-gray-100 hover:border-orange-500 hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Complément Été/Hiver</h3>
              <p className="text-gray-600">Activité accessible toute l'année. Parfait pour les périodes creuses et pour diversifier l'offre.</p>
            </Card>

            <Card className="p-8 border-2 border-gray-100 hover:border-green-500 hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Faible Coût</h3>
              <p className="text-gray-600">Installation simple et économique. Peut utiliser les terrains de tennis existants !</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Galerie Photos */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              L'ambiance <span className="text-orange-600">Pickleball</span>
            </h2>
            <p className="text-xl text-gray-600">Découvrez la joie et la convivialité du pickleball</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
              <img
                src="/manus-storage/pickleball_action_29149d05.png"
                alt="Action Pickleball"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white">L'action</h3>
                <p className="text-gray-100">Dynamique et engageante</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
              <img
                src="/manus-storage/pickleball_social_ba54aa77.png"
                alt="Ambiance Sociale"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white">La convivialité</h3>
                <p className="text-gray-100">Partage et amusement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sondage Section */}
      <section id="survey" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Votre avis compte ! 🗳️
              </h2>
              <p className="text-xl text-gray-600">
                Aidez-nous à convaincre la mairie d'amener le pickleball aux 2 Alpes. Répondez à ce sondage rapide !
              </p>
            </div>

            <Card className="p-8 md:p-12 border-2 border-blue-200 shadow-xl bg-white">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Nom */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-semibold text-gray-900">
                    Votre nom *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold text-gray-900">
                    Votre email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>

                {/* Question Principale */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-900">
                    Seriez-vous intéressé(e) par le pickleball aux 2 Alpes ? *
                  </Label>
                  <RadioGroup value={formData.interest} onValueChange={(value) =>
                    setFormData({ ...formData, interest: value })
                  }>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <RadioGroupItem value="very-interested" id="very-interested" />
                      <Label htmlFor="very-interested" className="cursor-pointer flex-1 font-medium">
                        Très intéressé(e) - Je voudrais essayer !
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <RadioGroupItem value="interested" id="interested" />
                      <Label htmlFor="interested" className="cursor-pointer flex-1 font-medium">
                        Intéressé(e) - Pourquoi pas ?
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe" className="cursor-pointer flex-1 font-medium">
                        Peut-être - À voir
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <RadioGroupItem value="not-interested" id="not-interested" />
                      <Label htmlFor="not-interested" className="cursor-pointer flex-1 font-medium">
                        Pas intéressé(e)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Message Optionnel */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg font-semibold text-gray-900">
                    Commentaires (optionnel)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Partagez vos idées, suggestions ou questions..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="min-h-24 text-base border-2 border-gray-200 focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Bouton Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg h-14"
                >
                  Envoyer mon avis à la mairie 🎾
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Vos données seront transmises à la mairie des 2 Alpes pour évaluer l'intérêt du projet.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                🎾 Pickleball
              </h3>
              <p className="text-gray-400">Le sport montagne pour tous aux 2 Alpes</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#about" className="hover:text-blue-400 transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-blue-400 transition-colors">
                    Avantages
                  </a>
                </li>
                <li>
                  <a href="#survey" className="hover:text-blue-400 transition-colors">
                    Sondage
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400 mb-2">Mairie des 2 Alpes</p>
              <p className="text-gray-400 text-sm">4 Place des Deux Alpes</p>
              <p className="text-gray-400 text-sm">38860 Les Deux-Alpes</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Pickleball aux 2 Alpes. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
