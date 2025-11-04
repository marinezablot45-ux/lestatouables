// === Configuration ===
const placeId = "ChIJxdQjnRWvlEcRRpXxQEALOOI"; // Place ID de ton entreprise
const apiKey = "AIzaSyACf1Lc2wkc5tFZGexya-uCLfDVxS5mApE"; // Clé API Google Places

// === Fonction principale ===
export async function loadGoogleReviews() {
  const container = document.getElementById("google-reviews");
  if (!container) return console.error("❌ Élément #google-reviews introuvable.");

  const proxyUrl = "https://corsproxy.io/?";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;

  try {
    const response = await fetch(proxyUrl + url);
    const data = await response.json();

    if (data.result && data.result.reviews) {
      const r = data.result;
      container.innerHTML = `
        <div style="background:#2d2d2d;border:1px solid #333;border-radius:15px;padding:2.5rem 2rem;margin-bottom:2rem;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
          <h2 style="text-align:center;color:#ffffff;font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:1rem;">⭐ Nos Avis Google</h2>
          <p style="text-align:center;font-size:1.2rem;color:#b8b8b8;margin-bottom:0;">
            <strong style="color:#ffffff;font-size:2rem;">${r.rating}</strong> / 5
          </p>
          <p style="text-align:center;color:#b8b8b8;font-size:1rem;margin-top:0.5rem;">
            ${r.user_ratings_total} avis clients
          </p>
        </div>
        
        <div style="display:grid;gap:1.5rem;">
          ${r.reviews.slice(0, 5).map(rv => `
            <div style="background:#2d2d2d;border:1px solid #333;border-radius:15px;padding:1.5rem;box-shadow:0 10px 30px rgba(0,0,0,0.3);transition:transform 0.3s ease;" 
                 onmouseover="this.style.transform='translateY(-5px)'" 
                 onmouseout="this.style.transform='translateY(0)'">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                  <div style="width:50px;height:50px;background:#ffffff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#000;font-size:1.2rem;font-weight:600;">
                    ${rv.author_name.charAt(0)}
                  </div>
                  <div>
                    <strong style="color:#ffffff;font-size:1.1rem;display:block;margin-bottom:0.3rem;">${rv.author_name}</strong>
                    <span style="color:#FFD700;font-size:1rem;">${'★'.repeat(rv.rating)}${'☆'.repeat(5 - rv.rating)}</span>
                  </div>
                </div>
              </div>
              <p style="font-size:1rem;color:#e0e0e0;line-height:1.6;margin-bottom:0.8rem;font-style:italic;">"${rv.text || 'Aucun commentaire'}"</p>
              <small style="color:#b8b8b8;font-size:0.9rem;">${rv.relative_time_description}</small>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="text-align:center;padding:3rem;background:#2d2d2d;border-radius:15px;border:1px solid #333;">
          <p style="color:#b8b8b8;font-size:1.1rem;">Aucun avis disponible pour le moment.</p>
        </div>
      `;
    }
  } catch (error) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem;background:#2d2d2d;border-radius:15px;border:1px solid #333;">
        <p style="color:#b8b8b8;font-size:1.1rem;">Erreur lors du chargement des avis.</p>
      </div>
    `;
    console.error("Erreur API Google :", error);
  }
}

