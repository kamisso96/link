document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
           
            const target = event.target.getAttribute('data-target');
            
            console.log(`Navigating to: ${target}`);
            
            event.target.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            setTimeout(() => {
                event.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            }, 200);

            // Example of how you might handle navigation:
            /*
            switch(target) {
                case 'store':
                    // window.location.href = '/store';
                    break;
                case 'inspiration':
                    // window.location.href = '/inspiration';
                    break;
                // etc...
            }
            */
        });
    });
});