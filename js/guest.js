import { util } from './util.js';
import { audio } from './audio.js';
import { theme } from './theme.js';
import { session } from './session.js';
import { storage } from './storage.js';
import { confetti } from './confetti.js';

export const guest = (() => {




    const countDownDate = () => {
        // Thời gian đích là 11 giờ ngày 5 tháng 1 năm 2025
        const count = new Date("2025-01-05T11:00:00").getTime();
    
        const interval = setInterval(() => {
            const now = new Date().getTime(); // Lấy thời gian hiện tại
            const distance = count - now; // Tính toán thời gian còn lại
    
            // Nếu thời gian đếm ngược đã kết thúc
            if (distance <= 0) {
                clearInterval(interval); // Dừng việc đếm ngược
                document.getElementById('day').innerText = "0";
                document.getElementById('hour').innerText = "0";
                document.getElementById('minute').innerText = "0";
                document.getElementById('second').innerText = "0";
                document.getElementById('countdown-message').innerText = "ĐÃ ĐẾN GIỜ !"; // Thêm thông báo
                // Hiển thị phần tử #countdown-message và áp dụng transition
            document.getElementById('countdown-message').style.marginTop = "10px";
            document.getElementById('countdown-message').style.fontSize = "30px"; 
                return;
            }
    
            // Tính toán số ngày, giờ, phút và giây còn lại
            document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000); // Cập nhật mỗi giây
    };
    


    const countDownDate1 = () => {
        // Thời gian đích là 11 giờ ngày 5 tháng 1 năm 2025
        const count = new Date("2025-01-24T10:00:00").getTime();
    
        const interval = setInterval(() => {
            const now = new Date().getTime(); // Lấy thời gian hiện tại
            const distance = count - now; // Tính toán thời gian còn lại
    
            // Nếu thời gian đếm ngược đã kết thúc
            if (distance <= 0) {
                clearInterval(interval); // Dừng việc đếm ngược
                document.getElementById('day1').innerText = "0";
                document.getElementById('hour1').innerText = "0";
                document.getElementById('minute1').innerText = "0";
                document.getElementById('second1').innerText = "0";
                document.getElementById('countdown-message1').innerText = "ĐÃ ĐẾN GIỜ !"; // Thêm thông báo
                document.getElementById('countdown-message1').style.marginTop = "10px";
                document.getElementById('countdown-message1').style.fontSize = "30px"; 
                return;
            }
    
            // Tính toán số ngày, giờ, phút và giây còn lại
            document.getElementById('day1').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hour1').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minute1').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('second1').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000); // Cập nhật mỗi giây
    };
    









    const animation = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ["#FFC0CB", "#FF1493", "#C71585"];

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const name = () => {
        const name = (new URLSearchParams(window.location.search)).get('to');
        const guest = document.getElementById('guest-name');

        if (!name || !guest) {
            guest.remove();
        } else {
            const div = document.createElement('div');
            div.classList.add('m-2');
            div.innerHTML = `<p class="mt-0 mb-1 mx-0 p-0" style="font-size: 0.95rem;">${guest.getAttribute('data-message')}</p><h2>${util.escapeHtml(name)}</h2>`;
            guest.appendChild(div);
        }

        const form = document.getElementById('form-name');
        if (form) {
            form.value = storage('information').get('name') ?? name;
        }
    };

    const open = (button) => {
        button.disabled = true;
        confetti({
            origin: { y: 1 },
            zIndex: 1057
        });

        document.body.style.overflowY = 'scroll';
        document.body.scrollIntoView({ behavior: 'instant' });
        util.opacity('welcome', 0.025);

        audio.play();
        audio.showButton();

        theme.showButtonChangeTheme();
        setTimeout(animation, 1500);
    };

    const init = () => {
        countDownDate();

        if (session.isAdmin()) {
            storage('user').clear();
            storage('owns').clear();
            storage('likes').clear();
            storage('session').clear();
            storage('comment').clear();
            storage('tracker').clear();
        }

        const info = document.getElementById('information');
        if (info && storage('information').get('info')) {
            info.remove();
        }

        if ((document.body.getAttribute('data-key') ?? '').length === 0) {
            const comment = document.getElementById('comment');
            if (comment) {
                comment.remove();
            }

            const nav = document.querySelector('a.nav-link[href="#comment"]');
            if (nav) {
                const item = nav.closest('li.nav-item');
                if (item) {
                    item.remove();
                }
            }

            return;
        }

        session.guest();
    };


    const init1 = () => {
        countDownDate1();



    };



    return {
        init,
        init1,
        open,
        name,
    };
})();






function countdown(targetDate) {
    // Lấy phần tử HTML để hiển thị thời gian đếm ngược
    const countdownElement = document.getElementById("countdown1");

    // Cập nhật thời gian đếm ngược mỗi giây
    const interval = setInterval(function() {
        const now = new Date().getTime(); // Lấy thời gian hiện tại
        const timeLeft = targetDate - now; // Tính toán thời gian còn lại

        // Tính toán ngày, giờ, phút và giây
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        

        // Hiển thị thời gian đếm ngược
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Nếu đếm ngược hoàn thành
        if (timeLeft <= 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Đã đến giờ!";
        }
    }, 1000);
}

// Thiết lập ngày mục tiêu (5 tháng 1, 2025, 11:00 AM)
const targetDate = new Date("January 5, 2025 11:00:00").getTime();

// Gọi hàm đếm ngược
countdown(targetDate);
