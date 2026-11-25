import { useState } from "react";
import "./App.css";

function App() {

  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState("");

  function ajouterTache() {
    if (nouvelleTache.trim() !== "") {
      setTaches([...taches, {
        id: Date.now(),
        nom: nouvelleTache,
        terminee: false
      }]);

      setNouvelleTache("");
    }
  }

  function supprimerTache(id) {
    setTaches(taches.filter(function(tache) {
      return tache.id !== id;
    }));
  }

  function terminerTache(id) {
    setTaches(taches.map(function(tache) {
      if (tache.id === id) {
        return { ...tache, terminee: !tache.terminee };
      }
      return tache;
    }));
  }

  return (
    <div className="app">

      <header>
        <h1>TaskFlow</h1>
        <p>Organise tes tâches simplement.</p>
      </header>

      <main>

        <div className="stats">
          <div>
            <h2>{taches.length}</h2>
            <p>Total</p>
          </div>

          <div>
            <h2>{taches.filter(function(t) {
              return t.terminee;
            }).length}</h2>
            <p>Terminées</p>
          </div>

          <div>
            <h2>{taches.filter(function(t) {
              return !t.terminee;
            }).length}</h2>
            <p>En cours</p>
          </div>
        </div>

        <div className="ajout">
          <input
            type="text"
            placeholder="Ajouter une tâche..."
            value={nouvelleTache}
            onChange={function(e) {
              setNouvelleTache(e.target.value);
            }}
            onKeyDown={function(e) {
              if (e.key === "Enter") {
                ajouterTache();
              }
            }}
          />

          <button onClick={ajouterTache}>
             Ajouter
          </button>
        </div>

        <div className="liste">
          <h2>Mes tâches</h2>

          {taches.length === 0 ? (
            <p className="vide">Aucune tâche pour le moment.</p>
          ) : (
            taches.map(function(tache) {
              return (
                <div className="tache" key={tache.id}>
                  <span className={tache.terminee ? "terminee" : ""}>
                    {tache.nom}
                  </span>

                  <div>
                    <button
                      className="terminer"
                      onClick={function() {
                        terminerTache(tache.id);
                      }}
                    >
                      
                    </button>

                    <button
                      className="supprimer"
                      onClick={function() {
                        supprimerTache(tache.id);
                      }}
                    >
                      
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>

      <footer>
         2026 TaskFlow - All rights reserved.
      </footer>

    </div>
  );
}

export default App;