// Script principal pour le site ClimatTech

document.addEventListener('DOMContentLoaded', function() {
    // Navigation responsive
    const header = document.querySelector('header');
    const navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    header.insertBefore(navToggle, document.querySelector('nav'));
    
    // Ajout des styles CSS directement pour le bouton toggle
    const style = document.createElement('style');
    style.textContent = `
        .nav-toggle {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 21px;
            cursor: pointer;
        }
        
        .nav-toggle span {
            display: block;
            height: 3px;
            width: 100%;
            background-color: #0077b6;
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
        
        @media screen and (max-width: 768px) {
            .nav-toggle {
                display: flex;
                z-index: 1001;
            }
            
            nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background-color: #fff;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                padding: 80px 20px 20px;
                transition: right 0.3s ease;
                z-index: 1000;
            }
            
            nav.active {
                right: 0;
            }
            
            nav ul {
                flex-direction: column;
                align-items: flex-start;
            }
            
            nav ul li {
                margin: 1rem 0;
                width: 100%;
            }
            
            nav ul li a {
                display: block;
                width: 100%;
                padding: 0.5rem 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    navToggle.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-preview-card, .benefit-card, .process-step, .testimonial, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // FAQ accordéon
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.maxHeight;
            
            // Fermer toutes les réponses
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.style.maxHeight = null;
            });
            
            // Ouvrir la réponse cliquée si elle n'était pas déjà ouverte
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            // Simuler un délai d'envoi
            setTimeout(() => {
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Afficher un message de succès
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.';
                
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Restaurer le bouton
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Supprimer le message après 5 secondes
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Slider de témoignages
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentSlide = 0;
        const slides = testimonialSlider.children;
        const slideCount = slides.length;
        
        // Cacher tous les slides sauf le premier
        for (let i = 1; i < slideCount; i++) {
            slides[i].style.display = 'none';
        }
        
        // Fonction pour changer de slide
        const nextSlide = () => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % slideCount;
            slides[currentSlide].style.display = 'block';
        };
        
        // Changer de slide toutes les 5 secondes
        setInterval(nextSlide, 5000);
    }
    
});


function initMap() {
    // Coordinates for Essonne, France (approximate center)
    const essonne = { lat: 48.5232, lng: 2.3247 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: essonne,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#444444"}]
            },
            {
                "featureType": "landscape",
                "stylers": [{"color": "#f2f2f2"}]
            }
        ]
    });
    
    // Add a marker
    new google.maps.Marker({
        position: essonne,
        map: map,
        title: "ClimaTech Location",
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
    });
}

function loadGoogleMaps() {
    if (document.getElementById('map')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
    }
}

window.addEventListener('DOMContentLoaded', loadGoogleMaps);

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 200) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

const navLinks = document.querySelectorAll('.top-nav ul li a');
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
})