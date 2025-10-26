// --- Logic chuyển đổi Chế độ Sáng/Tối ---
const toggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Thiết lập theme khi tải trang
if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggleBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

toggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    let newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// --- Logic hiển thị Modal Xem trước Ảnh (Ảnh 2) ---
document.addEventListener('DOMContentLoaded', function () {

    // Lấy các phần tử Modal từ DOM
    const modal = document.getElementById("previewModal");

    // **********************************************
    // KHẮC PHỤC LỖI: Buộc Modal ẩn ngay khi DOMContentLoaded
    if (modal) {
        modal.style.display = "none";
    }
    // **********************************************

    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const closeBtn = document.getElementsByClassName("close-btn")[0];
    const previewBtns = document.querySelectorAll(".preview-btn");

    // Thêm chức năng kéo ảnh trong modal (cho phép người dùng cuộn/zoom ảnh kích thước thật)
    const imageContainer = document.querySelector('.image-container');
    let isDragging = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;

    if (imageContainer) {
        imageContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            imageContainer.classList.add('active');
            startX = e.pageX - imageContainer.offsetLeft;
            startY = e.pageY - imageContainer.offsetTop;
            scrollLeft = imageContainer.scrollLeft;
            scrollTop = imageContainer.scrollTop;
            e.preventDefault();
        });

        imageContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            imageContainer.classList.remove('active');
        });

        imageContainer.addEventListener('mouseup', () => {
            isDragging = false;
            imageContainer.classList.remove('active');
        });

        imageContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - imageContainer.offsetLeft;
            const y = e.pageY - imageContainer.offsetTop;
            const walkX = (x - startX) * 1.5;
            const walkY = (y - startY) * 1.5;
            imageContainer.scrollLeft = scrollLeft - walkX;
            imageContainer.scrollTop = scrollTop - walkY;
        });
    }

    // Kiểm tra và xử lý sự kiện click cho từng nút Xem trước
    previewBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('data-img-src');
            const caption = this.getAttribute('data-caption');

            if (modal && modalImage) {
                // Đặt display: flex để mở modal và căn giữa
                modal.style.display = "flex";
                modalImage.src = imgSrc;
                modalCaption.textContent = caption;

                if (imageContainer) {
                    imageContainer.scrollLeft = 0;
                    imageContainer.scrollTop = 0;
                }
            }
        });
    });

    // Xử lý đóng modal khi click vào nút (x)
    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Xử lý đóng modal khi click bên ngoài ảnh (trên nền trong suốt)
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});