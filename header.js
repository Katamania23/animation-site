// Wacht tot de volledige inhoud van de DOM is geladen
document.addEventListener('DOMContentLoaded', () => {
    // Haal het canvas-element op en verkrijg de tekencontext
    const canvas = document.getElementById('headerCanvas');
    const ctx = canvas.getContext('2d');

    // Functie om de grootte van het canvas aan te passen aan het venster
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Pas de grootte van het canvas aan bij laden en bij wijzigen van de grootte van het venster
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Aantal hiërogliefen en array om ze op te slaan
    const numGlyphs = 100;
    const glyphs = [];
    const glyphChars = ['愛', '勇', '和', '夢', '友', '時', '光', '心', '月', '花',
        '夢', '友', '時', '光', '心', '月', '花', '風', '雨', '音', '空', '海', '山', '川',
        '火', '木', '土', '金', '水', '人', '天', '地', '生', '死', '太', '陽', '星', '石', '食',
        '飛', '鳥', '魚', '猫', '犬', '虎', '龍', '蛇', '馬', '牛', '羊', '猿', '熊', '狼', '獅',
        '象', '鹿', '蝶', '蜂', '蛙', '鶴', '亀', '桜', '梅', '菊', '竹', '松', '紅', '白', '青',
        '黒', '赤', '青', '緑', '黄', '紫', '桃', '橙', '葡', '萄', '苺', '梨', '柿', '椎', '桐',
        '栗', '李', '桃', '藤', '薔', '薇', '柳', '梨', '槻', '櫻', '楓', '檸', '檬', '柚', '梅', '檀', '桃', '杏'];

    // Hiëroglief object
    class Glyph {
        constructor() {
            this.reset();
        }

        // Reset de eigenschappen van het hiëroglief
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 20;
            this.speed = Math.random() * 0.25 + 0.1; // Lagere snelheid
            this.opacity = 0; // Begin met een lage opaciteit
            this.char = glyphChars[Math.floor(Math.random() * glyphChars.length)];
        }

        // Update de positie en opaciteit van het hiëroglief
        update(mouseX, mouseY) {
            const dx = mouseX - canvas.width / 2;
            const dy = mouseY - canvas.height / 2;
            this.angle = Math.atan2(dy, dx); // Bereken de hoek naar de muispositie

            const speedX = Math.cos(this.angle) * this.speed;
            const speedY = Math.sin(this.angle) * this.speed;
            this.x += speedX;
            this.y += speedY;

            // Pas de opaciteit aan afhankelijk van de afstand tot het midden van het canvas
            const distanceToCenterX = Math.abs(this.x - canvas.width / 2);
            const distanceToCenterY = Math.abs(this.y - canvas.height / 2);
            const maxDistance = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);
            this.opacity = 1 - (Math.sqrt(distanceToCenterX ** 2 + distanceToCenterY ** 2) / maxDistance);

            // Plaats het hiëroglief terug in het canvas als het buiten is
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        // Teken het hiëroglief op het canvas
        draw() {
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`; // Rode kleur met dynamische opaciteit
            ctx.fillText(this.char, this.x, this.y);
        }
    }

    // Maak de hiërogliefen aan
    function createGlyphs() {
        for (let i = 0; i < numGlyphs; i++) {
            glyphs.push(new Glyph());
        }
    }

    // Update en teken de hiërogliefen in een animatielus
    function animate(mouseX, mouseY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        glyphs.forEach(glyph => {
            glyph.update(mouseX, mouseY);
            glyph.draw();
        });
        requestAnimationFrame(() => animate(mouseX, mouseY));
    }

    // Initialiseer de hiërogliefen en start de animatie
    createGlyphs();
    animate(canvas.width / 2, canvas.height / 2); // Starten in het midden van het canvas

    // Update de animatie met de nieuwe muispositie bij het bewegen van de muis
    canvas.addEventListener('mousemove', (event) => {
        animate(event.clientX, event.clientY);
    });
});

