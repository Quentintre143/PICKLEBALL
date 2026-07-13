document.addEventListener('DOMContentLoaded', function () {
  // ---------- Smooth scroll pour les boutons/liens avec data-scroll ----------
  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-scroll');
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Toast notification ----------
  var toastEl = document.getElementById('toast');
  var toastTimeout;

  function showToast(message, type) {
    clearTimeout(toastTimeout);
    toastEl.textContent = message;
    toastEl.className = 'toast show ' + (type || '');
    toastTimeout = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 3500);
  }

  // ---------- Base de données globale (JSONBin.io) ----------
  // 1. Créez un compte gratuit sur https://jsonbin.io
  // 2. "Create Bin" avec le contenu de départ : {"reponses": []}
  // 3. Collez ci-dessous le Bin ID et votre X-Master-Key (clé API)
  var JSONBIN_ID = '6a54d551f5f4af5e2988126a';
  var JSONBIN_API_KEY = '$2a$10$fk2GgZuEEeYklDsBI4g/n.ryjrKzEMjHdhsyiWhLk/MbgG.dd9Aji';
  var JSONBIN_READY = JSONBIN_ID !== 'VOTRE_BIN_ID' && JSONBIN_API_KEY !== 'VOTRE_API_KEY';
  var JSONBIN_BASE = 'https://api.jsonbin.io/v3/b/' + JSONBIN_ID;

  function pushToGlobalDatabase(entry) {
    if (!JSONBIN_READY) {
      console.warn(
        'JSONBin non configuré : la réponse n\'a pas été envoyée à la base de données globale. ' +
        'Voir les instructions en haut de script.js.'
      );
      return Promise.resolve();
    }

    // On lit d'abord l'état actuel du bin, on ajoute la nouvelle réponse, puis on réécrit le tout.
    return fetch(JSONBIN_BASE + '/latest', {
      headers: { 'X-Master-Key': JSONBIN_API_KEY }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Lecture JSONBin échouée : ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var current = (data && data.record && Array.isArray(data.record.reponses)) ? data.record.reponses : [];
        current.push(entry);
        return fetch(JSONBIN_BASE, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_API_KEY
          },
          body: JSON.stringify({ reponses: current })
        });
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Écriture JSONBin échouée : ' + res.status);
        console.log('Réponse enregistrée dans la base de données globale.');
      })
      .catch(function (err) {
        console.error('Erreur base de données globale (JSONBin) :', err);
      });
  }

  // ---------- Détection automatique du département à partir de la ville ----------
  var villeInput = document.getElementById('ville');
  var departementHidden = document.getElementById('departement');
  var villeHint = document.getElementById('ville-hint');
  var villeLookupTimeout;
  var villeLookupToken = 0;

  function lookupDepartement(ville) {
    var token = ++villeLookupToken;
    departementHidden.value = '';
    villeHint.textContent = 'Recherche du département...';
    villeHint.className = 'ville-hint';

    fetch('https://geo.api.gouv.fr/communes?nom=' + encodeURIComponent(ville) + '&fields=departement&boundary=municipality&limit=1')
      .then(function (res) { return res.json(); })
      .then(function (results) {
        if (token !== villeLookupToken) return; // une saisie plus récente a eu lieu entre-temps
        if (Array.isArray(results) && results.length > 0 && results[0].departement) {
          var dep = results[0].departement;
          departementHidden.value = dep.nom + ' (' + dep.code + ')';
          villeHint.textContent = 'Département : ' + dep.nom + ' (' + dep.code + ')';
          villeHint.className = 'ville-hint found';
        } else {
          villeHint.textContent = 'Ville non reconnue, département non détecté';
          villeHint.className = 'ville-hint not-found';
        }
      })
      .catch(function () {
        if (token !== villeLookupToken) return;
        villeHint.textContent = 'Impossible de vérifier le département (hors-ligne ?)';
        villeHint.className = 'ville-hint not-found';
      });
  }

  villeInput.addEventListener('input', function () {
    var ville = villeInput.value.trim();
    clearTimeout(villeLookupTimeout);
    departementHidden.value = '';

    if (ville.length < 2) {
      villeHint.textContent = '';
      villeHint.className = 'ville-hint';
      return;
    }

    villeLookupTimeout = setTimeout(function () {
      lookupDepartement(ville);
    }, 500);
  });

  // ---------- Statistiques du sondage (stockées localement, en direct) ----------
  var STATS_KEY = 'pickleball_2alpes_survey_stats_v2';
  var VOTERS_KEY = 'pickleball_2alpes_recent_voters_v3';

  function loadStats() {
    try {
      var raw = localStorage.getItem(STATS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {}
    return { 'very-interested': 0, 'interested': 0, 'maybe': 0, 'not-interested': 0 };
  }

  function saveStats(stats) {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (err) {}
  }

  function renderStats(stats) {
    var total = stats['very-interested'] + stats['interested'] + stats['maybe'] + stats['not-interested'];
    var pct = function (n) {
      return total > 0 ? Math.round((n / total) * 100) : 0;
    };

    document.getElementById('stats-total').textContent = total;

    document.getElementById('stat-pct-very').textContent = pct(stats['very-interested']) + '%';
    document.getElementById('stat-fill-very').style.width = pct(stats['very-interested']) + '%';

    document.getElementById('stat-pct-interested').textContent = pct(stats['interested']) + '%';
    document.getElementById('stat-fill-interested').style.width = pct(stats['interested']) + '%';

    document.getElementById('stat-pct-maybe').textContent = pct(stats['maybe']) + '%';
    document.getElementById('stat-fill-maybe').style.width = pct(stats['maybe']) + '%';

    document.getElementById('stat-pct-not').textContent = pct(stats['not-interested']) + '%';
    document.getElementById('stat-fill-not').style.width = pct(stats['not-interested']) + '%';
  }

  function loadVoters() {
    try {
      var raw = localStorage.getItem(VOTERS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {}
    return [];
  }

  function saveVoters(voters) {
    try {
      localStorage.setItem(VOTERS_KEY, JSON.stringify(voters));
    } catch (err) {}
  }

  function firstNameOf(fullName) {
    var trimmed = fullName.trim();
    var first = trimmed.split(/\s+/)[0] || trimmed;
    return first.charAt(0).toUpperCase() + first.slice(1);
  }

  function renderVoters(voters) {
    var wrap = document.getElementById('recent-voters-wrap');
    var list = document.getElementById('recent-voters-list');
    list.innerHTML = '';

    if (voters.length === 0) {
      wrap.hidden = true;
      return;
    }

    wrap.hidden = false;
    voters.slice(0, 5).forEach(function (voter, i) {
      var li = document.createElement('li');
      li.className = 'recent-voter-item';
      var label = i === 0 ? 'vient de répondre au sondage' : 'a répondu au sondage';
      var depSuffix = voter.departement ? ' <span class="recent-voter-dep">(' + voter.departement + ')</span>' : '';
      li.innerHTML =
        '<span class="recent-voter-dot"></span>' +
        '<span><span class="recent-voter-name">' + voter.name + '</span>' + depSuffix + ' ' + label + '</span>';
      list.appendChild(li);
    });
  }

  var currentStats = loadStats();
  var currentVoters = loadVoters();
  renderStats(currentStats);
  renderVoters(currentVoters);

  // ---------- Blocage à un seul vote par personne (par appareil/navigateur) ----------
  var VOTED_KEY = 'pickleball_2alpes_has_voted_v1';
  var surveyForm = document.getElementById('survey-form');
  var alreadyVotedEl = document.getElementById('already-voted');

  function hasAlreadyVoted() {
    try {
      return localStorage.getItem(VOTED_KEY) === 'yes';
    } catch (err) {
      return false;
    }
  }

  function markAsVoted() {
    try {
      localStorage.setItem(VOTED_KEY, 'yes');
    } catch (err) {}
  }

  function showAlreadyVotedState() {
    surveyForm.hidden = true;
    alreadyVotedEl.hidden = false;
  }

  if (hasAlreadyVoted()) {
    showAlreadyVotedState();
  }

  // ---------- Gestion du formulaire de sondage ----------
  var form = document.getElementById('survey-form');

  form.addEventListener('submit', function (e) {
    if (hasAlreadyVoted()) {
      e.preventDefault();
      showAlreadyVotedState();
      return;
    }

    var name = document.getElementById('name').value.trim();
    var ville = document.getElementById('ville').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var interestInput = form.querySelector('input[name="interest"]:checked');

    if (!name || !ville || !email || !interestInput) {
      e.preventDefault();
      showToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    // On empêche l'envoi natif immédiat : on doit d'abord laisser le temps
    // à la requête vers la base de données globale (JSONBin) de partir,
    // sinon elle serait annulée par le changement de page vers Formspree.
    e.preventDefault();

    var interest = interestInput.value;

    currentStats[interest] = (currentStats[interest] || 0) + 1;
    saveStats(currentStats);

    var entry = {
      name: firstNameOf(name),
      fullName: name,
      email: email,
      ville: ville,
      departement: departementHidden.value || null,
      interest: interest,
      message: message,
      date: new Date().toISOString()
    };

    currentVoters.unshift(entry);
    currentVoters = currentVoters.slice(0, 200);
    saveVoters(currentVoters);

    // On verrouille cet appareil pour empêcher un second vote
    markAsVoted();

    // Envoi vers la base de données globale (JSONBin), puis on soumet le
    // formulaire vers Formspree une fois que c'est fait (ou après 2.5s max,
    // pour ne jamais bloquer l'utilisateur si JSONBin est lent/hors-ligne).
    var proceedOnce = (function () {
      var done = false;
      return function () {
        if (done) return;
        done = true;
        form.submit();
      };
    })();

    pushToGlobalDatabase(entry).then(proceedOnce).catch(proceedOnce);
    setTimeout(proceedOnce, 2500);
  });

  // ---------- Effet léger sur la navbar au scroll ----------
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ---------- Animations d'apparition au scroll ----------
  var revealTargets = document.querySelectorAll(
    '.section-header, .feature, .video-wrapper, .benefit-card, .gallery-item, .survey-card'
  );
  revealTargets.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('in-view');
    });
  }
});
