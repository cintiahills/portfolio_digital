
        
const headerIdsLinks = document.querySelectorAll('.header-ids a');

headerIdsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const scrollBtn = document.getElementById('scrollBtn');
const scrollBottomBtn = document.getElementById('scrollBottomBtn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }

    if (window.scrollY < document.body.scrollHeight - window.innerHeight - 300) {
        scrollBottomBtn.classList.add('visible');
    } else {
        scrollBottomBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBottomBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});
