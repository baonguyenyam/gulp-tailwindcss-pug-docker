// ====================================================
// Description: Main JS file for the Nguyen Pham Theme
// Version: 1.0.0
// Author: Nguyen Pham
// ====================================================

const NGUYEN_CONST = {
    map_API: "YOUR_API_KEY",
    map_Info: 'My Company',
    map_Address: '1234 Main St, Fort Worth, TX 76102',
    map_Loc: {
        lat: 31.7415642,
        lng: -97.350922
    },
    map_Pin: {
        icon: "/images/logo.png",
        scaledSize: [120, 40]
    },
}

//////////////////////////////////////////////////////////////

const NGUYEN_APP = {
    init: () => {
        // Load Google Maps API
        (g => {
            var h, a, k, p = "The Google Maps JavaScript API",
                c = "google",
                l = "importLibrary",
                q = "__ib__",
                m = document,
                b = window;
            b = b[c] || (b[c] = {});
            var d = b.maps || (b.maps = {}),
                r = new Set,
                e = new URLSearchParams,
                u = () => h || (h = new Promise(async (f, n) => {
                    await (a = m.createElement("script"));
                    e.set("libraries", [...r] + "");
                    for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
                    e.set("callback", c + ".maps." + q);
                    a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
                    d[q] = f;
                    a.onerror = () => h = n(Error(p + " could not load."));
                    a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                    m.head.append(a)
                }));
            d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
        })({
            key: NGUYEN_CONST.map_API,
            v: "weekly",
        });
    },
    heroSlider: () => {
        const progressCircle = document.querySelector(".autoplay-progress svg");
        const progressContent = document.querySelector(".autoplay-progress span");
        new Swiper(".homeSwiper", {
            mousewheel: true,
            slidesPerView: 1,
            spaceBetween: 30,
            keyboard: {
                enabled: true,
            },
            autoplay: {
                delay: 2500,
                // disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                clickable: true,
                el: ".swiper-pagination",
            },
            on: {
                autoplayTimeLeft(s, time, progress) {
                    progressCircle.style.setProperty("--progress", 1 - progress);
                    progressContent.textContent = `${Math.ceil(time / 1000)}s`;
                }
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            },
        });
    },
    toggleMenu: () => {
        const toggleOpen = document.querySelector("#header_toggleOpen");
        const toggleClose = document.querySelector("#header_toggleClose");
        const collapseMenu = document.querySelector("#header_collapseMenu");
        toggleOpen.addEventListener("click", () => {
            collapseMenu.classList.add("active");
            toggleClose.classList.add("active");
        });
        toggleClose.addEventListener("click", () => {
            collapseMenu.classList.remove("active");
            toggleClose.classList.remove("active");
        });
    },
    fancyBox: () => {
        Fancybox.bind("[data-fancybox]", {});
    },
    setMap: () => {
        const styles = [{
            featureType: "all",
            elementType: "all",
            stylers: [{
                    saturation: -100,
                },
                {
                    gamma: 0.5,
                },
            ],
        }, ];
        let map;
        async function initMap() {
            const {
                Map
            } = await google.maps.importLibrary("maps");
            map = new Map(document.getElementById("map"), {
                center: NGUYEN_CONST.map_Loc,
                zoom: 15,
            });
            const marker = new google.maps.Marker({
                position: NGUYEN_CONST.map_Loc,
                map: map,
            });
            // Custom Pin Icon
            const icon = {
                url: NGUYEN_CONST.map_Pin.icon,
                scaledSize: new google.maps.Size(NGUYEN_CONST.map_Pin.scaledSize[0], NGUYEN_CONST.map_Pin.scaledSize[1]),
            };
            marker.setIcon(icon);
            // const infowindow = new google.maps.InfoWindow({
            //     content: `<h3>Nguyen Pham</h3><p>111 Hampton St, Fort Worth, TX 76102</p>`,
            // });
            marker.addListener("click", () => {
                // infowindow.open(map, marker);
                // Trigger Fancybox
                Fancybox.show([{
                    src: "#mapPopup",
                    type: "inline",
                }, ]);
            });
            // Append #mapPopup to the body
            const mapPopup = document.createElement("div");
            mapPopup.id = "mapPopup";
            mapPopup.style.display = "none";
            mapPopup.innerHTML = '<h3>' + NGUYEN_CONST.map_Info + '</h3>' + NGUYEN_CONST.map_Address + `<div class="mt-2 space-x-2 flex flex-row">
					<a
                        target="_blank"
						href="https://www.google.com/maps/search/?api=1&query=${NGUYEN_CONST.map_Info}+${NGUYEN_CONST.map_Address}"
						class="font-semibold underline hover:text-black cursor-pointer flex flex-row items-center">
						<svg style="width:18px; height:18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
						<span>Google Maps</span>
					</a>
					<a
                        target="_blank"
                        href="http://maps.apple.com/?ll=${NGUYEN_CONST.map_Loc.lat},${NGUYEN_CONST.map_Loc.lng}&address=${NGUYEN_CONST.map_Address}&q=${NGUYEN_CONST.map_Info}"
						class="font-semibold underline hover:text-black cursor-pointer flex flex-row items-center">
						<svg style="width:20px; height:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
						<span>Apple Maps</span>
					</a>
				</div>`
            document.body.appendChild(mapPopup);
            map.setOptions({
                styles: styles
            });
        }
        initMap();
    }
}

// Check DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        NGUYEN_APP.init();
        NGUYEN_APP.fancyBox();
        NGUYEN_APP.heroSlider()
        NGUYEN_APP.setMap()
    });
}

// IF jQuery is available, run the following code
if (typeof jQuery != 'undefined') {
    jQuery(document).ready(function () {
        console.log("jQuery is ready");
    })
}